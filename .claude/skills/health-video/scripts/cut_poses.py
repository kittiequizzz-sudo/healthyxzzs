#!/usr/bin/env python3
"""Cut a pose sheet (key poses side by side in one image) into aligned transparent PNGs.

  cut_poses.py sheet.webp out_dir --name situp [--count 4] [--skin 58A9E4|none] [--floor auto]

- Background colour is sampled per row from the left/right margins (handles soft gradients); poses are separated by empty columns.
- Every pose is cropped to the same canvas, aligned on its planted feet (rightmost point at the floor),
  so poses swap in place without jumping.
- Blue skin is recoloured to the house blue (keeps the shading). Use --skin none for natural-skin
  characters (e.g. Antonio), or blue clothes would be recoloured.
- Writes <name>_0.png … and <name>_poses.json (canvas size, floor y, per-pose bbox) for the scene.
"""
import argparse
import json
import os

import cv2
import numpy as np


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sheet")
    ap.add_argument("out")
    ap.add_argument("--name", required=True)
    ap.add_argument("--count", type=int, default=0, help="expected number of poses (0 = auto)")
    ap.add_argument("--skin", default="58A9E4")
    ap.add_argument("--tol", type=int, default=30)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    im = cv2.imread(a.sheet)
    H, W = im.shape[:2]
    # background per row from the left/right margins, so a soft vertical gradient (ChatGPT sheets) isn't foreground
    edges = np.concatenate([im[:, :10], im[:, -10:]], axis=1).astype(int)
    rowbg = np.median(edges, axis=1)
    k = 30  # running median over ±30 rows, so a thin floor line drawn to the edge stays foreground
    bg = np.array([np.median(rowbg[max(0, y - k):y + k + 1], axis=0) for y in range(H)])[:, None, :]
    fg = (np.abs(im.astype(int) - bg).max(axis=2) > a.tol).astype(np.uint8)
    # floor line: a row that is foreground across most of the width → remove it
    def longest_run(r):
        best = cur = 0
        for v in r:
            cur = cur + 1 if v else 0
            best = max(best, cur)
        return best
    # a floor line is one unbroken horizontal run across most of the image
    floor_rows = [y for y in range(H // 3, H) if fg[y].sum() > 0.85 * W or (fg[y].sum() > 0.6 * W and longest_run(fg[y]) > 0.6 * W)]
    floor = min(floor_rows) if floor_rows else H - 1
    fg[floor:] = 0
    # poses = large connected components (small islands like eyes/hair tufts join the nearest pose)
    n, lab, st, _ = cv2.connectedComponentsWithStats(fg)
    tot = st[1:, 4].sum()
    cores = sorted([k for k in range(1, n) if st[k, 4] > 0.03 * tot], key=lambda k: st[k, 0])
    segs = [[int(st[k, 0]), int(st[k, 0] + st[k, 2])] for k in cores]
    # merge overlapping cores (e.g. a hand drawn separate from its body)
    merged = []
    for sg in segs:
        if merged and sg[0] < merged[-1][1] - 10:
            merged[-1][1] = max(merged[-1][1], sg[1])
        else:
            merged.append(sg)
    segs = merged
    if a.count and len(segs) > a.count:   # merge the closest neighbours until the count matches
        while len(segs) > a.count:
            gaps = [segs[i + 1][0] - segs[i][1] for i in range(len(segs) - 1)]
            j = int(np.argmin(gaps)); segs[j:j + 2] = [[segs[j][0], segs[j + 1][1]]]
    # each pose window extends halfway into the gaps on both sides
    bounds = [0] + [(segs[i][1] + segs[i + 1][0]) // 2 for i in range(len(segs) - 1)] + [W]
    owner = np.zeros(n, int) - 1
    for k in range(1, n):
        cx = st[k, 0] + st[k, 2] / 2
        owner[k] = int(np.searchsorted(bounds, cx) - 1)
    pose_masks = [np.isin(lab, [k for k in range(1, n) if owner[k] == i and st[k, 4] > 40]).astype(np.uint8) for i in range(len(segs))]
    def fill_holes(m):
        # light parts (white sneakers, cream cushions) match the background; fill what the border can't reach
        f = m.copy()
        f[floor - 1:, :] = 0
        mask = np.zeros((H + 2, W + 2), np.uint8)
        cv2.floodFill(f, mask, (0, 0), 2)
        out = ((f != 2) | (m > 0)).astype(np.uint8)
        # soles touch the floor line, so their light parts leak; close small gaps in the bottom band
        band = out[max(0, floor - 40):floor]
        out[max(0, floor - 40):floor] = cv2.morphologyEx(band, cv2.MORPH_CLOSE, np.ones((11, 11), np.uint8))
        return out
    pose_masks = [fill_holes(m) for m in pose_masks]
    segs = []
    for m in pose_masks:
        xs = np.nonzero(m.any(axis=0))[0]
        segs.append((int(xs.min()), int(xs.max()) + 1))
    if a.count and len(segs) != a.count:
        print(f"warning: found {len(segs)} poses, expected {a.count}")
    # common canvas: widest pose + margin, aligned on the rightmost foot point
    widths = [b - s for s, b in segs]
    tops = [int(np.nonzero(m.any(axis=1))[0].min()) for m in pose_masks]
    cw, top = max(widths) + 40, max(0, min(tops) - 20)
    ch = floor - top + 6
    skin = None if a.skin == "none" else np.array([int(a.skin[4:6], 16), int(a.skin[2:4], 16), int(a.skin[0:2], 16)], np.float32)
    meta = {"canvas": [cw, ch], "floor_y": floor - top, "poses": []}
    for i, (s, b) in enumerate(segs):
        crop = im[top:floor + 6, s:b]
        keep = (pose_masks[i][top:floor + 6, s:b] * 255).astype(np.uint8)
        keep = cv2.morphologyEx(keep, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
        hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)
        sk = cv2.inRange(hsv, (95, 40, 60), (130, 255, 255)) > 0
        out = crop.astype(np.float32)
        if a.skin != "none" and sk.any():
            out[sk] = np.clip(out[sk] * (skin / out[sk].mean(axis=0)), 0, 255)
        rgba = np.dstack([out.astype(np.uint8), cv2.GaussianBlur(keep, (3, 3), 0)])
        canvas = np.zeros((ch, cw, 4), np.uint8)
        x0 = cw - 20 - (b - s)            # align right edge (feet) across poses
        canvas[:len(rgba[:ch]), x0:x0 + (b - s)] = rgba[:ch]
        cv2.imwrite(os.path.join(a.out, f"{a.name}_{i}.png"), canvas)
        meta["poses"].append({"file": f"{a.name}_{i}.png", "x0": x0})
    json.dump(meta, open(os.path.join(a.out, f"{a.name}_poses.json"), "w"), indent=1)
    print(f"{len(segs)} poses → {a.out} (canvas {cw}x{ch}, floor at y={meta['floor_y']})")


if __name__ == "__main__":
    main()
