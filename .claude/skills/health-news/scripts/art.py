#!/usr/bin/env python3
"""Cut out the owner's illustrations (one object on a plain white background) for anim.js.

  python3 art.py <project> <image> <name> [<image> <name> ...]

The background is found by flood fill from the border (so white highlights inside the object stay),
the edge gets a 1–2 px feather, the result is trimmed to the object plus a small margin, capped at
1400 px and saved as <project>/assets/art/<name>.png. Run prep.py afterwards so window.ART lists it.
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter
import cv2


def cutout(path, tol=24):
    im = Image.open(path).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    bg = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)   # border colour (≈ white)
    near = (np.abs(a - bg).max(axis=2) <= tol)
    _, lab = cv2.connectedComponents(near.astype(np.uint8), connectivity=4)
    border = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
    back = np.isin(lab, border) & near
    alpha = Image.fromarray(((~back) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    out = im.convert('RGBA'); out.putalpha(alpha)
    box = alpha.point(lambda v: 255 if v > 8 else 0).getbbox()
    m = 12
    out = out.crop((max(0, box[0] - m), max(0, box[1] - m), min(im.width, box[2] + m), min(im.height, box[3] + m)))
    if max(out.size) > 1400:
        k = 1400 / max(out.size)
        out = out.resize((round(out.width * k), round(out.height * k)), Image.LANCZOS)
    return out


if __name__ == '__main__':
    proj, rest = sys.argv[1], sys.argv[2:]
    os.makedirs(os.path.join(proj, 'assets', 'art'), exist_ok=True)
    for src, name in zip(rest[::2], rest[1::2]):
        o = cutout(src)
        o.save(os.path.join(proj, 'assets', 'art', name + '.png'), optimize=True)
        print(name, o.size)
