#!/usr/bin/env python3
"""Original background music + sound effects, synthesized in code (no samples, no third-party audio),
mixed under the voice with ducking. Everything is generated from numbers here, so there is nothing to
license and no Content ID match.

  soundtrack.py voice.mp3 sfx.json out.wav [--mood calm|warm] [--seed 7] [--sections 0,101,299,...]

sfx.json: [[time_s, kind], ...] with kind in
  whoosh (scene change) · pop (chip/check appears) · thud (cross/stamp) · heart (one lub-dub)
  · tick (clock tick) · alarm (soft two-tone) · chime (positive reveal) · bell (subscribe)
Music: a slow, soft progression (piano-like plucks over a warm pad), 64 bpm, key changes per section so
it doesn't loop audibly. It sits ~22 dB under the voice and ducks a further ~6 dB while speech is present.
"""
import json
import subprocess
import sys

import numpy as np

SR = 44100
args = sys.argv[1:]
opt = lambda k, d: args[args.index(k) + 1] if k in args else d
voice_path, sfx_path, out_path = args[:3]
mood = opt('--mood', 'calm')
rng = np.random.default_rng(int(opt('--seed', 7)))

pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', voice_path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                     capture_output=True, check=True).stdout
voice = np.frombuffer(pcm, np.float32).copy()
N = len(voice) + 2 * SR
T = N / SR
sections = [float(x) for x in opt('--sections', '0').split(',')]

def env(n, a, r):
    """attack a s, exponential release r s, length n samples"""
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / r)

def note_hz(m): return 440.0 * 2 ** ((m - 69) / 12)

# ---------------------------------------------------------------- music
music = np.zeros(N, np.float32)
beat = 60 / 64
# progressions in semitones from the key root (I–vi–IV–V style, soft); one per section, rotating keys
PROGS = [[0, 9, 5, 7], [0, 5, 9, 7], [9, 5, 0, 7], [0, 4, 5, 7]]
CHORD = {0: [0, 4, 7], 9: [9, 12, 16], 5: [5, 9, 12], 7: [7, 11, 14], 4: [4, 7, 11]}
roots = [57, 60, 55, 58, 53, 56] if mood == 'calm' else [60, 62, 57, 59, 55, 58]   # A3, C4, G3 …

def pad(f, n):
    t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * k * t + rng.uniform(0, 6)) / k ** 1.6 for k in (1, 2, 3))
    x += 0.5 * np.sin(2 * np.pi * f * 1.003 * t)          # slow chorus beating
    a = np.minimum(1, t / 1.2) * np.minimum(1, (n / SR - t) / 1.2)
    return (x * a).astype(np.float32)

def pluck(f, n):
    t = np.arange(n) / SR
    x = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) + 0.12 * np.sin(6 * np.pi * f * t)
    return (x * env(n, 0.005, 0.9)).astype(np.float32)

bars = []
sec_bounds = sections + [T]
for si in range(len(sections)):
    s0, s1 = sec_bounds[si], sec_bounds[si + 1]
    root, prog = roots[si % len(roots)], PROGS[si % len(PROGS)]
    t = s0
    k = 0
    while t < s1:
        bars.append((t, root, prog[k % 4]))
        t += 4 * beat
        k += 1
for (t0, root, deg) in bars:
    i0 = int(t0 * SR)
    n = int(4 * beat * SR) + SR
    if i0 >= N: break
    n = min(n, N - i0)
    ch = [root + c - 12 for c in CHORD[deg]]
    p = sum(pad(note_hz(m), n) for m in ch) * 0.05
    music[i0:i0 + n] += p
    # gentle arpeggio: 1–2 notes per beat, varied
    for b in range(4):
        if rng.random() < 0.25: continue
        m = root + CHORD[deg][rng.integers(0, 3)] + (12 if rng.random() < 0.5 else 0)
        j = i0 + int(b * beat * SR + rng.uniform(0, 0.04) * SR)
        nn = min(int(2.2 * SR), N - j)
        if nn > 0: music[j:j + nn] += pluck(note_hz(m), nn) * 0.06
# soft low-pass by moving average (mellow tone)
k = 9
music = np.convolve(music, np.ones(k) / k, mode='same').astype(np.float32)

# ---------------------------------------------------------------- sfx
sfx = np.zeros(N, np.float32)
def add(i, x, g):
    j = min(N, i + len(x))
    if i < N: sfx[i:j] += g * x[: j - i]
def noise(n): return rng.standard_normal(n).astype(np.float32)
def lowpass(x, k): return np.convolve(x, np.ones(k) / k, mode='same').astype(np.float32)

def whoosh():
    n = int(0.55 * SR); t = np.arange(n) / SR
    x = noise(n)
    out = np.zeros(n, np.float32)
    for a, b, kk in ((0, n // 3, 40), (n // 3, 2 * n // 3, 14), (2 * n // 3, n, 6)):
        out[a:b] = lowpass(x, kk)[a:b]
    return out * np.sin(np.pi * t / t[-1]) ** 2 * 0.9
def pop():
    n = int(0.09 * SR); t = np.arange(n) / SR
    f = 900 * np.exp(-t * 18) + 420
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.03)
def thud():
    n = int(0.3 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * (110 * np.exp(-t * 6) + 45) * t) * env(n, 0.002, 0.09)
            + 0.15 * lowpass(noise(n), 30) * env(n, 0.001, 0.03))
def heart():
    n = int(0.6 * SR); out = np.zeros(n, np.float32)
    for off, g in ((0, 1), (int(0.22 * SR), 0.7)):
        m = int(0.16 * SR); t = np.arange(m) / SR
        out[off:off + m] += g * np.sin(2 * np.pi * 52 * t) * env(m, 0.004, 0.05)
    return out
def tick():
    n = int(0.03 * SR); return lowpass(noise(n), 2) * env(n, 0.0005, 0.006)
def alarm():
    n = int(1.2 * SR); t = np.arange(n) / SR
    f = np.where((t * 2.5) % 1 < 0.5, 660, 520)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.minimum(1, t / 0.05) * np.minimum(1, (t[-1] - t) / 0.2) * 0.5
def chime():
    n = int(1.4 * SR); out = np.zeros(n, np.float32)
    for i, m in enumerate((76, 79, 84)):
        o = int(i * 0.07 * SR)
        out[o:] += pluck(note_hz(m), n - o) * 0.6
    return out
def bell():
    n = int(1.2 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 880 * t) + 0.5 * np.sin(2 * np.pi * 1320 * t)) * env(n, 0.002, 0.35) * 0.6
GEN = dict(whoosh=whoosh, pop=pop, thud=thud, heart=heart, tick=tick, alarm=alarm, chime=chime, bell=bell)
GAIN = dict(whoosh=0.10, pop=0.10, thud=0.16, heart=0.18, tick=0.10, alarm=0.07, chime=0.10, bell=0.10)
cache = {}
for t, kind in json.load(open(sfx_path)):
    if kind not in cache: cache[kind] = GEN[kind]().astype(np.float32)
    add(int(t * SR), cache[kind], GAIN[kind])

# ---------------------------------------------------------------- mix: duck music under speech
v = np.zeros(N, np.float32); v[:len(voice)] = voice
win = int(0.05 * SR)
rms = np.sqrt(np.convolve(v ** 2, np.ones(win) / win, mode='same'))
speech = (rms > 0.02).astype(np.float32)
speech = np.convolve(speech, np.ones(int(0.4 * SR)) / int(0.4 * SR), mode='same')   # smooth 0.4 s
duck = 1 - 0.5 * np.clip(speech * 1.5, 0, 1)                                        # ≈ −6 dB under speech
vr = np.sqrt(np.mean(v[v != 0] ** 2)) if np.any(v) else 0.1
mr = np.sqrt(np.mean(music ** 2)) + 1e-9
music *= (vr * 10 ** (-22 / 20)) / mr                                               # ≈ 22 dB under voice
fade = np.minimum(1, np.arange(N) / (2 * SR)) * np.minimum(1, (N - np.arange(N)) / (2.5 * SR))
mix = v + music * duck * fade + sfx * vr / 0.1
mix /= max(1.0, np.max(np.abs(mix)) / 0.97)
pcm16 = (mix * 32767).astype(np.int16).tobytes()
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', out_path],
               input=pcm16, check=True)
print(f'wrote {out_path} ({N / SR:.1f}s, {len(json.load(open(sfx_path)))} sfx)')
