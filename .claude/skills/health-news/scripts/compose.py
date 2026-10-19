#!/usr/bin/env python3
"""Compositor for render_layers.mjs: navy background, photo/clip layers warped with OpenCV, graphics PNG on top,
frames piped to ffmpeg. One process per chunk.

  compose.py frames.json out.mp4 [--grain 6] [--crf 20] [--preset veryfast] [--maxrate 8M]
"""
import argparse, json, os, subprocess
import cv2
import numpy as np

W, H = 1920, 1080
BG = (0x20, 0x14, 0x0D)        # news.js N.bg #0D1420 in BGR


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('spec'); ap.add_argument('out')
    ap.add_argument('--grain', default='6'); ap.add_argument('--crf', default='20'); ap.add_argument('--preset', default='veryfast')
    ap.add_argument('--maxrate', default='')
    a = ap.parse_args()
    d = json.load(open(a.spec)); base = d['base']
    vf = [f'noise=alls={a.grain}:allf=t'] if float(a.grain) > 0 else []
    cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(d['fps']), '-i', '-']
    if vf: cmd += ['-vf', ','.join(vf), '-tune', 'grain']
    cmd += ['-c:v', 'libx264', '-crf', a.crf, '-preset', a.preset, '-pix_fmt', 'yuv420p']
    if a.maxrate: cmd += ['-maxrate', a.maxrate, '-bufsize', str(int(a.maxrate.rstrip('M')) * 2) + 'M']
    cmd += [a.out]
    enc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    imgs, ov_path, ov = {}, None, None
    canvas = np.empty((H, W, 3), np.uint8)
    for f in d['frames']:
        canvas[:] = BG
        for L in f['bg']:
            src = os.path.join(base, L['src'])
            if src not in imgs:
                if len(imgs) > 40: imgs.pop(next(iter(imgs)))       # small LRU-ish cache (clip frames come once)
                imgs[src] = cv2.imread(src)
            im = imgs[src]
            cx, cy, cw, ch = [int(round(v)) for v in L['clip']]
            px, py, pw, ph = L['place']
            sx, sy = pw / im.shape[1], ph / im.shape[0]
            M = np.float32([[sx, 0, px - cx], [0, sy, py - cy]])
            x0, y0, x1, y1 = max(cx, 0), max(cy, 0), min(cx + cw, W), min(cy + ch, H)
            if x1 <= x0 or y1 <= y0: continue
            interp = cv2.INTER_AREA if sx < 0.7 else cv2.INTER_LINEAR
            if abs(sx - 1) < 1e-3 and abs(sy - 1) < 1e-3 and px == cx and py == cy and im.shape[1] == cw and im.shape[0] == ch:
                warped = im
            else:
                warped = cv2.warpAffine(im, M, (cw, ch), flags=interp, borderMode=cv2.BORDER_REPLICATE)
            roi = warped[y0 - cy:y1 - cy, x0 - cx:x1 - cx]
            if L['a'] >= 0.999: canvas[y0:y1, x0:x1] = roi
            else: canvas[y0:y1, x0:x1] = cv2.addWeighted(roi, L['a'], canvas[y0:y1, x0:x1], 1 - L['a'], 0)
        if f['o'] != ov_path:
            ov_path = f['o']
            o = cv2.imread(ov_path, cv2.IMREAD_UNCHANGED)
            if o.ndim == 2: o = cv2.cvtColor(o, cv2.COLOR_GRAY2BGR)
            if o.shape[2] == 3: o = np.dstack([o, np.full(o.shape[:2], 255, np.uint8)])   # fully opaque frame
            alpha = o[:, :, 3:4].astype(np.float32) / 255
            ov = ((o[:, :, :3].astype(np.float32) * alpha), 1 - alpha, alpha.max() > 0)
        if ov[2]:
            out = canvas.astype(np.float32); out *= ov[1]; out += ov[0]
            frame = out.astype(np.uint8)
        else:
            frame = canvas
        enc.stdin.write(frame.tobytes())
    enc.stdin.close(); enc.wait()


if __name__ == '__main__':
    main()
