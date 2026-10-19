#!/usr/bin/env python3
"""AI super-resolution for small stock photos (≈1000 px → sharp 2112 px): Real-ESRGAN x4plus (BSD-3),
run on CPU with ncnn. Much sharper than Lanczos for faces, food and textures.

  upscale.py in.jpg out.jpg [--width 2112] [--tile 200]

Model files come from the Real-ESRGAN ncnn release on GitHub and are cached in ~/.cache/health-news/.
CPU cost: about 1–2 min for a 1024×683 photo on 4 cores. Upscale only photos smaller than the target.
"""
import argparse
import io
import os
import urllib.request
import zipfile

import cv2
import numpy as np

CACHE = os.path.expanduser('~/.cache/health-news')
ZIP = 'https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-ubuntu.zip'
NAME = 'realesrgan-x4plus'


def model():
    p, b = (os.path.join(CACHE, NAME + e) for e in ('.param', '.bin'))
    if not os.path.exists(b):
        os.makedirs(CACHE, exist_ok=True)
        z = zipfile.ZipFile(io.BytesIO(urllib.request.urlopen(ZIP, timeout=300).read()))
        for e, dst in (('.param', p), ('.bin', b)):
            open(dst, 'wb').write(z.read(f'models/{NAME}{e}'))
    import ncnn
    net = ncnn.Net()
    net.opt.use_vulkan_compute = False
    net.opt.num_threads = os.cpu_count() or 4
    net.load_param(p); net.load_model(b)
    return net


def run_tile(net, rgb8):
    import ncnn
    t = np.ascontiguousarray(rgb8)
    h, w = t.shape[:2]
    m = ncnn.Mat.from_pixels(t, ncnn.Mat.PixelType.PIXEL_RGB, w, h)   # copies, so no dangling numpy memory
    m.substract_mean_normalize([], [1 / 255.0] * 3)
    ex = net.create_extractor()
    ex.input('data', m)
    _, out = ex.extract('output')
    return np.array(out, copy=True).transpose(1, 2, 0)


def upscale(img, net, tile=200, pad=12):
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    h, w = rgb.shape[:2]
    out = np.zeros((h * 4, w * 4, 3), np.float32)
    for y in range(0, h, tile):
        for x in range(0, w, tile):
            y0, x0 = max(0, y - pad), max(0, x - pad)
            y1, x1 = min(h, y + tile + pad), min(w, x + tile + pad)
            o = run_tile(net, rgb[y0:y1, x0:x1])
            ty, tx = (y - y0) * 4, (x - x0) * 4
            th, tw_ = min(tile, h - y) * 4, min(tile, w - x) * 4
            out[y * 4:y * 4 + th, x * 4:x * 4 + tw_] = o[ty:ty + th, tx:tx + tw_]
    return cv2.cvtColor((np.clip(out, 0, 1) * 255).round().astype(np.uint8), cv2.COLOR_RGB2BGR)


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('dst')
    ap.add_argument('--width', type=int, default=2112); ap.add_argument('--tile', type=int, default=200)
    a = ap.parse_args()
    img = cv2.imread(a.src)
    if img.shape[1] >= a.width:
        big = img
    else:
        big = upscale(img, model(), a.tile)
    h = round(big.shape[0] * a.width / big.shape[1])
    cv2.imwrite(a.dst, cv2.resize(big, (a.width, h), interpolation=cv2.INTER_AREA), [cv2.IMWRITE_JPEG_QUALITY, 94])
    print(a.dst, (a.width, h))
