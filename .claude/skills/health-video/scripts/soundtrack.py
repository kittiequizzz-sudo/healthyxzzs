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

# Soft, in-tune SFX (owner, Oct 27 2026: the first set sounded harsh and off-key). Every tonal effect is a
# mellow sine/felt-mallet tone on a note of the current section's key (pentatonic), low-passed, with a
# soft attack; no noise clicks, no pitch sweeps, no square-ish alarms.
def soft_lp(x, k=24):
    return lowpass(lowpass(x, k), k)
def mallet(m, dur=0.9, bright=0.15):
    n = int(dur * SR); t = np.arange(n) / SR; f = note_hz(m)
    x = np.sin(2 * np.pi * f * t) + bright * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 18)
    return (x * np.minimum(1, t / 0.008) * np.exp(-t / (dur / 4))).astype(np.float32)
def key_at(t):
    i = max(0, np.searchsorted(sections, t, side='right') - 1)
    return roots[i % len(roots)] + 12          # one octave above the music root (mid register)
PENTA = [0, 2, 4, 7, 9]
def whoosh(t):
    n = int(0.7 * SR); tt = np.arange(n) / SR
    x = soft_lp(noise(n), 60)
    return x * np.sin(np.pi * tt / tt[-1]) ** 3 * 0.6
def pop(t):                                    # soft marimba note, in key, cycling through the pentatonic
    k = key_at(t); return mallet(k + PENTA[int(t * 7) % 5], 0.7)
def thud(t):                                   # low felt note (root, an octave down), no click
    return mallet(key_at(t) - 12, 1.0, 0.05) * 1.2
def heart(t):
    n = int(0.6 * SR); out = np.zeros(n, np.float32)
    for off, g in ((0, 1), (int(0.22 * SR), 0.6)):
        m = int(0.18 * SR); tt = np.arange(m) / SR
        out[off:off + m] += g * np.sin(2 * np.pi * 48 * tt) * np.minimum(1, tt / 0.01) * np.exp(-tt / 0.05)
    return out
def tick(t):
    return mallet(key_at(t) + 24, 0.12, 0) * 0.4
def alarm(t):                                  # gentle two-note "attention" (5th → root), not a siren
    k = key_at(t); a = mallet(k + 7, 0.6); b = mallet(k, 0.9)
    out = np.zeros(int(1.2 * SR), np.float32); out[:len(a)] += a; o = int(0.28 * SR); out[o:o + len(b)] += b[:len(out) - o]
    return out
def chime(t):                                  # soft rolled major triad in key
    k = key_at(t); n = int(1.6 * SR); out = np.zeros(n, np.float32)
    for i, m in enumerate((k, k + 4, k + 7, k + 12)):
        o = int(i * 0.09 * SR); x = mallet(m, 1.4, 0.08); out[o:o + len(x)] += x[:n - o] * 0.5
    return out
def bell(t):
    k = key_at(t); out = mallet(k + 12, 1.2, 0.1) * 0.7; o = int(0.16 * SR); x = mallet(k + 19, 1.0, 0.1) * 0.5
    out[o:o + len(x)] += x[:len(out) - o]; return out
GEN = dict(whoosh=whoosh, pop=pop, thud=thud, heart=heart, tick=tick, alarm=alarm, chime=chime, bell=bell)
GAIN = dict(whoosh=0.06, pop=0.046, thud=0.041, heart=0.06, tick=0.08, alarm=0.044, chime=0.07, bell=0.075)   # ≈ −9…−11 dB under the voice (owner: a bit louder, still soft)
for t, kind in json.load(open(sfx_path)):
    add(int(t * SR), soft_lp(GEN[kind](t).astype(np.float32), 6), GAIN[kind])

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
