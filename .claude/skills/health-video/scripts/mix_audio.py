#!/usr/bin/env python3
"""Make a royalty-free soundtrack in code and mix it under the voice.

  python3 mix_audio.py voice.mp3 sfx.json out_dir [--music-vol 0.16] [--sfx-vol 0.45] [--seed 3]

Writes out_dir/music.wav (soft pastel pad + plucked arpeggio + bass, F-Dm-Bb-C, ~72 bpm, fades),
out_dir/sfx.wav (pop, swish, cut, ding, stamp, click, tick, squeeze, alert, alert_soft placed at the
times in sfx.json = [[t, kind, vol], ...]) and out_dir/mix.m4a: voice + music ducked under the voice
(sidechain) + sfx, loudness-normalised to -14 LUFS. Everything is synthesised: no samples, no licences.
"""
import json, subprocess, sys, argparse
import numpy as np

SR = 48000
ap = argparse.ArgumentParser()
ap.add_argument('voice'); ap.add_argument('sfx'); ap.add_argument('out')
ap.add_argument('--music-vol', type=float, default=0.16)
ap.add_argument('--sfx-vol', type=float, default=0.45)
ap.add_argument('--seed', type=int, default=3)
a = ap.parse_args()
rng = np.random.default_rng(a.seed)

dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.voice]).decode()) + 1.5
N = int(dur * SR)
t_ = lambda d: np.arange(int(d * SR)) / SR

def env(n, att, rel):
    e = np.ones(n); A = max(1, int(att * SR)); R = max(1, int(rel * SR))
    e[:A] = np.linspace(0, 1, A); e[-R:] *= np.linspace(1, 0, R); return e

def lowpass(x, k):  # moving-average low-pass, k samples
    if k < 2: return x
    c = np.cumsum(np.insert(x, 0, 0.0)); y = (c[k:] - c[:-k]) / k
    return np.concatenate([y, np.zeros(k - 1)])

# ---------------------------------------------------------------- sound effects
def s_pop():
    t = t_(0.09); f = np.linspace(950, 480, t.size)
    return 0.8 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 38)
def s_swish(d=0.32, amp=0.5):
    t = t_(d); n = rng.standard_normal(t.size)
    lo = lowpass(n, 18); hi = n - lowpass(n, 6)
    mix = lo * (1 - t / d) + 0.4 * hi * (t / d)
    return amp * mix * np.sin(np.pi * t / d) ** 2 / (np.abs(mix).max() + 1e-9)
def s_cut(): return s_swish(0.16, 0.35)
def s_ding():
    t = t_(1.1)
    return 0.45 * (np.sin(2 * np.pi * 1318.5 * t) + 0.5 * np.sin(2 * np.pi * 2637 * t) + 0.3 * np.sin(2 * np.pi * 1975.5 * t)) * np.exp(-t * 4.5)
def s_stamp():
    t = t_(0.35); n = rng.standard_normal(t.size)
    return 0.9 * np.sin(2 * np.pi * 70 * t) * np.exp(-t * 16) + 0.25 * lowpass(n, 8) * np.exp(-t * 40)
def s_click():
    t = t_(0.04); return 0.6 * np.sin(2 * np.pi * 2200 * t) * np.exp(-t * 120)
def s_tick():
    t = t_(0.03); return 0.4 * np.sin(2 * np.pi * 1600 * t) * np.exp(-t * 160)
def s_squeeze():
    t = t_(0.18); f = np.linspace(520, 900, t.size)
    return 0.35 * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / 0.18)
def s_two(f1, f2, amp):
    t = t_(0.22); a1 = amp * np.sin(2 * np.pi * f1 * t) * np.exp(-t * 7); a2 = amp * np.sin(2 * np.pi * f2 * t) * np.exp(-t * 7)
    return np.concatenate([a1, a2])
SFX = {'pop': s_pop, 'swish': s_swish, 'cut': s_cut, 'ding': s_ding, 'stamp': s_stamp, 'click': s_click,
       'tick': s_tick, 'squeeze': s_squeeze, 'alert': lambda: s_two(659, 880, 0.5), 'alert_soft': lambda: s_two(523, 659, 0.35)}

cues = json.load(open(a.sfx))
fx = np.zeros(N); last = {}
for t0, kind, vol in cues:
    if kind not in SFX: continue
    # thin out: at most one sound every 0.3 s, and the same swish not twice within 1.2 s
    if any(abs(t0 - v) < 0.3 for v in last.values()): continue
    if kind in ('swish', 'cut') and abs(t0 - last.get(kind, -9)) < 1.2: continue
    s = SFX[kind]() * vol; i = int(t0 * SR)
    if i < 0 or i >= N: continue
    s = s[:N - i]; fx[i:i + s.size] += s; last[kind] = t0
fx = np.tanh(fx * 1.2) / 1.2

# ---------------------------------------------------------------- music: warm pastel pad, F major
bpm = 72; beat = 60 / bpm; bar = 4 * beat
def midi(m): return 440 * 2 ** ((m - 69) / 12)
chords = [[53, 57, 60, 65], [50, 53, 57, 62], [46, 50, 53, 58], [48, 52, 55, 60]]  # F, Dm, Bb, C
arps = [[65, 69, 72, 69], [62, 65, 69, 65], [58, 62, 65, 70], [60, 64, 67, 64]]
music = np.zeros(N + int(bar * SR) * 2)
nbars = int(dur / bar) + 2
for b in range(nbars):
    c = b % 4; i0 = int(b * bar * SR); tt = t_(bar)
    pad = sum(np.sin(2 * np.pi * midi(m) * tt + rng.uniform(0, 6)) * (0.9 if k else 0.6) for k, m in enumerate(chords[c]))
    pad += 0.25 * sum(np.sin(2 * np.pi * midi(m) * 2.003 * tt) for m in chords[c][1:])
    pad *= env(tt.size, 0.8, 0.9) * 0.10
    bass = 0.22 * np.sin(2 * np.pi * midi(chords[c][0] - 12) * tt) * env(tt.size, 0.05, 0.6) * np.exp(-tt * 0.5)
    music[i0:i0 + tt.size] += pad + bass
    for k in range(8):  # eighth-note pluck, slightly humanised, rests in some bars for breathing room
        if b % 8 in (3, 7) and k % 2: continue
        m = arps[c][k % 4] + (12 if (b // 4) % 2 and k == 6 else 0)
        tp = t_(1.2); j = i0 + int((k * beat / 2 + rng.uniform(-0.01, 0.01)) * SR)
        pl = 0.13 * (np.sin(2 * np.pi * midi(m) * tp) + 0.3 * np.sin(4 * np.pi * midi(m) * tp)) * np.exp(-tp * 3.2) * env(tp.size, 0.004, 0.2)
        music[j:j + pl.size] += pl[:max(0, music.size - j)]
music = music[:N]
music = lowpass(music, 3)
music *= env(N, 3.0, 4.0)
music /= np.abs(music).max() + 1e-9

def wav(path, x):
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2').tobytes()
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', path], input=pcm, check=True)
wav(f'{a.out}/music.wav', music * 0.9)
wav(f'{a.out}/sfx.wav', fx)

# ---------------------------------------------------------------- mix: voice + ducked music + sfx
fc = (f"[0:a]aresample={SR},aformat=channel_layouts=mono,asplit=2[v][vk];"
      f"[1:a]volume={a.music_vol}[m];[m][vk]sidechaincompress=threshold=0.03:ratio=4:attack=60:release=600[md];"
      f"[2:a]volume={a.sfx_vol}[f];[v][md][f]amix=inputs=3:normalize=0:duration=first,"
      f"loudnorm=I=-14:TP=-1.5,aformat=channel_layouts=stereo[out]")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.voice, '-i', f'{a.out}/music.wav', '-i', f'{a.out}/sfx.wav',
                '-filter_complex', fc, '-map', '[out]', '-c:a', 'aac', '-b:a', '192k', f'{a.out}/mix.m4a'], check=True)
print('wrote', f'{a.out}/mix.m4a', f'({dur:.1f} s, {len(cues)} sfx cues)')
