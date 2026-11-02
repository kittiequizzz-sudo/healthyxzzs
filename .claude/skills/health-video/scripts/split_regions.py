#!/usr/bin/env python3
"""Split a flat-coloured diagram cut-out (e.g. a brain with each lobe in its own colour) into
one PNG per colour region plus a "dim" version where every region is repainted in a neutral tint.
Outlines (dark pixels) stay in both, so a region PNG laid over the dim PNG lines up exactly.

  split_regions.py cut/brain_color.png cut --prefix lobe --regions frontal:22,parietal:45,temporal:125,occipital:270,cerebellum:340,stem:175 [--dim EAD9D6] [--minsat 0.35]

Each region is `name:hue` (degrees, 0-360) or `name:hue:value` (value 0-1) when two regions share a hue
and differ only in brightness. Saturated pixels go to the nearest region (hue distance + 100 × value distance).
Writes <prefix>_<name>.png (only that region, outlines dropped) and <prefix>_dim.png.
"""
import argparse, os
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('out')
ap.add_argument('--prefix', required=True); ap.add_argument('--regions', required=True)
ap.add_argument('--dim', default='EAD9D6'); ap.add_argument('--minsat', type=float, default=0.35)
a = ap.parse_args()
im = np.array(Image.open(a.src).convert('RGBA')).astype(np.float32)
rgb, al = im[..., :3] / 255, im[..., 3]
mx, mn = rgb.max(-1), rgb.min(-1)
sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
d = np.maximum(mx - mn, 1e-6)
h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
regs = [(x.split(':')[0], float(x.split(':')[1]), float(x.split(':')[2]) if x.count(':') > 1 else None) for x in a.regions.split(',')]
col = (sat > a.minsat) & (mx > 0.35) & (al > 0)
dist = np.stack([np.minimum(abs(h - v), 360 - abs(h - v)) + (100 * abs(mx - val) if val is not None else 0) for _, v, val in regs])
lab = np.argmin(dist, 0)
dim = np.array([int(a.dim[i:i + 2], 16) for i in (0, 2, 4)], np.float32)
out = im.copy()
# repaint coloured pixels in the dim tint, keeping their brightness relative to the region's typical value
for k, (n, _, _) in enumerate(regs):
    m = col & (lab == k)
    reg = np.zeros_like(im); reg[m] = im[m]
    Image.fromarray(reg.astype(np.uint8)).save(os.path.join(a.out, f'{a.prefix}_{n}.png'))
    out[m, :3] = dim
    print(n, int(m.sum()), 'px')
Image.fromarray(out.astype(np.uint8)).save(os.path.join(a.out, f'{a.prefix}_dim.png'))
