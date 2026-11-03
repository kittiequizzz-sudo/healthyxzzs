#!/usr/bin/env python3
# usage: cut_wall_poses.py sheet.webp NAME wall_right_x1,x2,... width bottom feet_y   (writes cut/NAME_i.png; run from the project folder)
# Cut a pose sheet where each pose stands next to a drawn wall strip: crop from the wall's right edge,
# remove background by flood from the border, remove enclosed bg-coloured gaps only above the feet.
import sys, numpy as np, cv2
from PIL import Image
src, name, walls, W, bot, feet_y = sys.argv[1], sys.argv[2], [int(v) for v in sys.argv[3].split(',')], int(sys.argv[4]), int(sys.argv[5]), int(sys.argv[6])
a = np.asarray(Image.open(src).convert('RGB')).astype(np.int16)
bg = a[10, 10]; wc = a[500, walls[0] - 15]
for i, wx in enumerate(walls):
    crop = a[0:bot, wx + 6: wx + 6 + W]
    cand = (np.abs(crop - bg).max(-1) < 18) | (np.abs(crop - wc).max(-1) < 10)
    n, lab, st, _ = cv2.connectedComponentsWithStats(cand.astype(np.uint8), 4)
    border = set(np.unique(np.concatenate([lab[0, :], lab[-1, :], lab[:, -1], lab[:, 0]]))) - {0}
    bgm = np.isin(lab, list(border))
    strict = (np.abs(crop - bg).max(-1) < 10)
    n2, lab2, st2, cen = cv2.connectedComponentsWithStats(strict.astype(np.uint8), 4)
    gaps = np.isin(lab2, [k for k in range(1, n2) if st2[k, 4] > 600 and st2[k, 1] < feet_y])
    fg = ~(bgm | gaps)
    n3, lab3, st3, _ = cv2.connectedComponentsWithStats(fg.astype(np.uint8), 8)
    keep = lab3 == (np.argmax(st3[1:, 4]) + 1)
    alpha = cv2.GaussianBlur((keep * 255).astype(np.uint8), (3, 3), 0)
    Image.fromarray(np.dstack([crop.astype(np.uint8), alpha])).save(f'cut/{name}_{i}.png')
