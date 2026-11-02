#!/usr/bin/env python3
"""Cut separate mascots/items from a sheet on a DARK, uneven background (ink outlines blend into it).

  cut_dark.py sheet.jpg out_dir --names a,b,c [--ring 7] [--min-area 0.01]

Bright or saturated pixels (white bodies, pink brains, yellow sparks) form the core mask; small holes are
filled and the mask is grown by --ring px, and that ring is painted in the house ink, so each cut-out gets
a clean outline that reads on the light house background. Items are sorted left to right.
"""
import argparse, os, json
import cv2
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('sheet'); ap.add_argument('out'); ap.add_argument('--names', required=True)
ap.add_argument('--ring', type=int, default=7); ap.add_argument('--min-area', type=float, default=0.01)
a = ap.parse_args()
os.makedirs(a.out, exist_ok=True)
im = cv2.imread(a.sheet)
H, W = im.shape[:2]
hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
blueish = (hsv[..., 0] > 95) & (hsv[..., 0] < 130)   # the soft floor shadows are dull blue-grey
core = ((hsv[..., 2] > 140) | ((hsv[..., 1] > 90) & (hsv[..., 2] > 90) & ~blueish)).astype(np.uint8)
core = cv2.morphologyEx(core, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
# drop specks (bits of floor shadow / paper texture)
n0, l0, s0, _ = cv2.connectedComponentsWithStats(core)
for k in range(1, n0):
    if s0[k, 4] < 300:
        core[l0 == k] = 0
# fill enclosed holes (eyes, mouth, lines inside the body)
inv = (1 - core).astype(np.uint8)
n, lab, st, _ = cv2.connectedComponentsWithStats(inv, connectivity=4)
for k in range(1, n):
    x, y, w, h, ar = st[k]
    if x > 0 and y > 0 and x + w < W and y + h < H and ar < 0.0015 * W * H:   # eyes, mouths, inner lines only
        core[lab == k] = 1
full = cv2.dilate(core, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * a.ring + 1, 2 * a.ring + 1)))
n, lab, st, _ = cv2.connectedComponentsWithStats(full)
big = [k for k in range(1, n) if st[k, 4] > a.min_area * W * H]
# small islands (sparks, question marks) join the nearest big item by x-centre
cx = {k: st[k, 0] + st[k, 2] / 2 for k in range(1, n)}
owner = {k: min(big, key=lambda b: abs(cx[b] - cx[k])) for k in range(1, n)}
big.sort(key=lambda k: st[k, 0])
names = a.names.split(',')
if len(names) != len(big):
    print(f'warning: found {len(big)} items, expected {len(names)}')
boxes = {}
ink = np.array([0x22, 0x1A, 0x1B], np.uint8)   # BGR of #1B1A22
for name, b in zip(names, big):
    m = np.isin(lab, [k for k in range(1, n) if owner[k] == b]).astype(np.uint8)
    ys, xs = np.nonzero(m)
    x0, x1, y0, y1 = xs.min(), xs.max() + 1, ys.min(), ys.max() + 1
    crop = im[y0:y1, x0:x1].copy()
    mm, cc = m[y0:y1, x0:x1], core[y0:y1, x0:x1]
    ring = (mm == 1) & (cc == 0)
    crop[ring] = ink
    alpha = cv2.GaussianBlur(mm * 255, (3, 3), 0)
    cv2.imwrite(os.path.join(a.out, name + '.png'), np.dstack([crop, alpha]))
    boxes[name] = [int(x0), int(y0), int(x1 - x0), int(y1 - y0)]
json.dump(boxes, open(os.path.join(a.out, 'items.json'), 'w'))
print(json.dumps(boxes))
