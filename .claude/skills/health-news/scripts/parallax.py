#!/usr/bin/env python3
"""Turn a still photo into a short 2.5D camera move (pseudo-footage): estimate depth with Depth Anything V2
(small, ONNX, CPU), then warp the photo so near things move more than far things.

  parallax.py <photo.jpg> <out_dir> [--move push|pull|left|right|rise|orbit] [--secs 4] [--fps 30]
              [--amount 1.0] [--preview out.mp4]

Writes <out_dir>/f0000.jpg … at 1920×1080 plus depth.png. Show it in a scene with Clip() (news.js).
Keep moves small: amount 1.0 is a gentle documentary drift; above 1.5 the stretching at edges shows.
Model: Depth Anything V2 Small (Apache-2.0), downloaded once from its GitHub release into
~/.cache/health-news/.
"""
import argparse
import os
import urllib.request

import cv2
import numpy as np

MODEL_URL = 'https://github.com/fabio-sim/Depth-Anything-ONNX/releases/download/v2.0.0/depth_anything_v2_vits.onnx'
MODEL = os.path.expanduser('~/.cache/health-news/depth_anything_v2_vits.onnx')
W, H = 1920, 1080


def depth(img):
    import onnxruntime as ort
    if not os.path.exists(MODEL):
        os.makedirs(os.path.dirname(MODEL), exist_ok=True)
        urllib.request.urlretrieve(MODEL_URL, MODEL)
    x = cv2.resize(cv2.cvtColor(img, cv2.COLOR_BGR2RGB), (518, 518), interpolation=cv2.INTER_CUBIC).astype(np.float32) / 255
    x = (x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    s = ort.InferenceSession(MODEL, providers=['CPUExecutionProvider'])
    d = s.run(None, {s.get_inputs()[0].name: x.transpose(2, 0, 1)[None].astype(np.float32)})[0][0]
    d = cv2.resize(d, (img.shape[1], img.shape[0]), interpolation=cv2.INTER_CUBIC)
    d = (d - d.min()) / (d.max() - d.min() + 1e-6)          # 1 = near, 0 = far
    # grow near regions a little and smooth, so foreground edges stretch the background, not themselves
    k = max(3, img.shape[1] // 200) | 1
    d = cv2.dilate(d, np.ones((k, k), np.uint8))
    return cv2.GaussianBlur(d, (0, 0), img.shape[1] / 300)


def ease(u):
    return u * u * (3 - 2 * u)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('photo'); ap.add_argument('out')
    ap.add_argument('--move', default='push'); ap.add_argument('--secs', type=float, default=4)
    ap.add_argument('--fps', type=int, default=30); ap.add_argument('--amount', type=float, default=1.0)
    ap.add_argument('--focus', type=float, nargs=2, default=[0.5, 0.5], help='point to keep centred (0..1)')
    ap.add_argument('--preview')
    a = ap.parse_args()

    img = cv2.imread(a.photo)
    d = depth(img)
    os.makedirs(a.out, exist_ok=True)
    cv2.imwrite(os.path.join(a.out, 'depth.png'), (d * 255).astype(np.uint8))
    ih, iw = img.shape[:2]
    cover = max(W / iw, H / ih) * 1.06                       # 6 % margin so edges never show
    gy, gx = np.mgrid[0:H, 0:W].astype(np.float32)
    cx, cy = a.focus[0] * iw, a.focus[1] * ih
    n = int(a.secs * a.fps)
    A = a.amount
    for i in range(n):
        u = ease(i / max(1, n - 1))
        # base camera: output pixel → source pixel
        zoom = cover * {'push': 1 + 0.05 * A * u, 'pull': 1 + 0.05 * A * (1 - u)}.get(a.move, 1.02)
        sx = cx + (gx - W / 2) / zoom
        sy = cy + (gy - H / 2) / zoom
        dd = cv2.remap(d, sx, sy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
        rel = dd - 0.5
        # parallax: near pixels shift / scale more than far ones
        if a.move in ('push', 'pull'):
            k = 0.06 * A * (u if a.move == 'push' else 1 - u)
            sx = cx + (sx - cx) / (1 + k * rel)
            sy = cy + (sy - cy) / (1 + k * rel)
        else:
            m = (u - 0.5) * 2                                  # −1 … 1
            dx = {'left': -1, 'right': 1, 'orbit': 1}.get(a.move, 0) * m
            dy = {'rise': -1}.get(a.move, 0) * m
            base = 0.025 * A * iw
            sx = sx - dx * base * rel - dx * base * 0.3
            sy = sy - dy * base * rel - dy * base * 0.3
            if a.move == 'orbit':
                sx = cx + (sx - cx) / (1 + 0.03 * A * u * rel)
        f = cv2.remap(img, sx, sy, cv2.INTER_CUBIC, borderMode=cv2.BORDER_REFLECT)
        cv2.imwrite(os.path.join(a.out, f'f{i:04d}.jpg'), f, [cv2.IMWRITE_JPEG_QUALITY, 90])
    if a.preview:
        os.system(f"ffmpeg -v error -y -framerate {a.fps} -i {a.out}/f%04d.jpg -c:v libx264 -crf 22 -pix_fmt yuv420p {a.preview}")
    print(f'{n} frames → {a.out}')


if __name__ == '__main__':
    main()
