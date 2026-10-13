#!/usr/bin/env python3
"""Cut a sheet of separate items (organs, foods, icons) on a flat background into transparent PNGs,
or split a grid sheet (2x2 panels with thin white gaps) into stills.

  cut_items.py sheet.webp out_dir --names stomach,intestines,liver,...   # items in reading order
  cut_items.py sheet.webp out_dir --grid 2x2 --names s1,s2,s3,s4        # panels

Items: background is sampled from the corners; foreground is closed so each item becomes one blob;
blobs are sorted top-to-bottom in rows, then left-to-right. Small islands (highlights, a tear of
the outline) join the nearest item. Alpha is feathered 1.5 px so edges look drawn, not cut.
Writes <name>.png and items.json {name: [x, y, w, h] in sheet pixels}.
"""
import argparse
import json
import os

import cv2
import numpy as np


def split_grid(im, cols, rows):
    H, W = im.shape[:2]
    g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    white = g > 235

    def gaps(frac_axis, n, size):
        cuts = []
        for k in range(1, n):
            c = size * k // n
            lo, hi = c - size // 10, c + size // 10
            idx = [i for i in range(lo, hi) if frac_axis[i] > 0.85]
            cuts.append((min(idx), max(idx) + 1) if idx else (c, c))
        return cuts
    cx = gaps(white.mean(0), cols, W)
    cy = gaps(white.mean(1), rows, H)
    xs = [0] + [v for c in cx for v in c] + [W]
    ys = [0] + [v for c in cy for v in c] + [H]
    out = []
    for r in range(rows):
        for c in range(cols):
            x0, x1 = xs[2 * c], xs[2 * c + 1]
            y0, y1 = ys[2 * r], ys[2 * r + 1]
            out.append(((x0 + 2, y0 + 2, x1 - x0 - 4, y1 - y0 - 4)))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sheet")
    ap.add_argument("out")
    ap.add_argument("--names", required=True)
    ap.add_argument("--grid", default="")
    ap.add_argument("--tol", type=int, default=28)
    ap.add_argument("--pad", type=int, default=6)
    ap.add_argument("--close", type=int, default=9, help="gap-closing kernel; lower it if two items touch")
    a = ap.parse_args()
    names = a.names.split(",")
    os.makedirs(a.out, exist_ok=True)
    im = cv2.imread(a.sheet)
    H, W = im.shape[:2]
    meta = {}
    if a.grid:
        cols, rows = map(int, a.grid.lower().split("x"))
        for name, (x, y, w, h) in zip(names, split_grid(im, cols, rows)):
            cv2.imwrite(os.path.join(a.out, name + ".png"), im[y:y + h, x:x + w])
            meta[name] = [x, y, w, h]
    else:
        corners = np.concatenate([im[:20, :20].reshape(-1, 3), im[:20, -20:].reshape(-1, 3),
                                  im[-20:, :20].reshape(-1, 3), im[-20:, -20:].reshape(-1, 3)])
        bg = np.median(corners, axis=0)
        diff = np.abs(im.astype(int) - bg).max(axis=2)
        fg = (diff > a.tol).astype(np.uint8)
        # fill interiors: anything not reachable from the border through background is foreground
        closed = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, np.ones((a.close, a.close), np.uint8))
        flood = closed.copy()
        mask = np.zeros((H + 2, W + 2), np.uint8)
        cv2.floodFill(flood, mask, (0, 0), 2)
        solid = (flood != 2).astype(np.uint8)
        n, lab, st, cen = cv2.connectedComponentsWithStats(solid)
        tot = st[1:, 4].sum()
        big = [k for k in range(1, n) if st[k, 4] > 0.01 * tot]
        if len(big) < len(names):
            raise SystemExit(f"found {len(big)} items, expected {len(names)}")
        big = sorted(big, key=lambda k: -st[k, 4])[:len(names)]
        # reading order: group into rows by vertical centre
        big.sort(key=lambda k: cen[k][1])
        rows, cur = [], [big[0]]
        for k in big[1:]:
            if abs(cen[k][1] - np.mean([cen[j][1] for j in cur])) < 0.18 * H:
                cur.append(k)
            else:
                rows.append(cur)
                cur = [k]
        rows.append(cur)
        order = [k for r in rows for k in sorted(r, key=lambda k: cen[k][0])]
        # small islands → nearest big item
        owner = np.zeros(n, int)
        for k in range(1, n):
            if k in order:
                owner[k] = k
            else:
                owner[k] = min(order, key=lambda j: np.hypot(*(cen[k] - cen[j])))
        for name, k in zip(names, order):
            m = np.isin(lab, [j for j in range(1, n) if owner[j] == k]).astype(np.uint8) * 255
            alpha = cv2.GaussianBlur(cv2.erode(m, np.ones((2, 2), np.uint8)), (0, 0), 1.0)
            ys, xs = np.nonzero(m)
            x0, x1 = max(xs.min() - a.pad, 0), min(xs.max() + a.pad, W)
            y0, y1 = max(ys.min() - a.pad, 0), min(ys.max() + a.pad, H)
            rgba = np.dstack([im, alpha])[y0:y1, x0:x1]
            cv2.imwrite(os.path.join(a.out, name + ".png"), rgba)
            meta[name] = [int(x0), int(y0), int(x1 - x0), int(y1 - y0)]
    with open(os.path.join(a.out, "items.json"), "w") as f:
        json.dump(meta, f, indent=1)
    print(json.dumps(meta))


if __name__ == "__main__":
    main()
