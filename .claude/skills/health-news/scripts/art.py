#!/usr/bin/env python3
"""Cut out the owner's illustrations (one object on a plain white background) for anim.js.

  python3 art.py <project> [--keep] <image> <name> [<image> <name> ...]

--keep: don't trim (pairs that crossfade must share the same canvas). --holes: also clear large enclosed
background pockets. --tol N: background tolerance (default 24; use ~6 for white objects like a white mouse).

The background is found by flood fill from the border (so white highlights inside the object stay),
the edge gets a 1–2 px feather, the result is trimmed to the object plus a small margin, capped at
1400 px and saved as <project>/assets/art/<name>.png. Run prep.py afterwards so window.ART lists it.
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter
import cv2


def cutout(path, tol=24, trim=True, holes=False):
    im = Image.open(path).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    bg = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)   # border colour (≈ white)
    near = (np.abs(a - bg).max(axis=2) <= tol)
    _, lab = cv2.connectedComponents(near.astype(np.uint8), connectivity=4)
    border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    back = np.isin(lab, border) & near
    if holes:   # also clear big enclosed background pockets (inside a padlock shackle, between handles)
        ids, counts = np.unique(lab[near], return_counts=True)
        back |= np.isin(lab, ids[counts > near.size * 0.004]) & near
    alpha = Image.fromarray(((~back) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    out = im.convert('RGBA'); out.putalpha(alpha)
    box = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    if not trim:   # same canvas for a pair that crossfades (e.g. rusty → clean lock)
        box = (0, 0, im.width, im.height)
    m = 12
    out = out.crop((max(0, box[0] - m), max(0, box[1] - m), min(im.width, box[2] + m), min(im.height, box[3] + m)))
    if max(out.size) > 1400:
        k = 1400 / max(out.size)
        out = out.resize((round(out.width * k), round(out.height * k)), Image.LANCZOS)
    return out


if __name__ == '__main__':
    proj, rest = sys.argv[1], sys.argv[2:]
    trim, holes = '--keep' not in rest, '--holes' in rest
    tol = int(rest[rest.index('--tol') + 1]) if '--tol' in rest else 24
    if '--tol' in rest: del rest[rest.index('--tol'):rest.index('--tol') + 2]
    rest = [a for a in rest if a not in ('--keep', '--holes')]
    os.makedirs(os.path.join(proj, 'assets', 'art'), exist_ok=True)
    for src, name in zip(rest[::2], rest[1::2]):
        o = cutout(src, tol=tol, trim=trim, holes=holes)
        o.save(os.path.join(proj, 'assets', 'art', name + '.png'), optimize=True)
        print(name, o.size)
