#!/usr/bin/env python3
"""Synthesize a calm, wordless background loop (royalty-free: generated here, no samples).

  make_music.py out.wav --seconds 600 [--bpm 68] [--seed 1]

Soft pad chords (Cmaj7 → Am7 → Fmaj7 → G6) with a slow attack, a gentle music-box arpeggio and a
warm low note, faded in/out (mix_music.sh low-passes it). Mix it well under the voice with mix_music.sh.
"""
import argparse
import wave

import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('out')
ap.add_argument('--seconds', type=float, required=True)
ap.add_argument('--bpm', type=float, default=68)
ap.add_argument('--seed', type=int, default=1)
a = ap.parse_args()
SR = 44100
rng = np.random.default_rng(a.seed)
n = int(a.seconds * SR)
out = np.zeros((n, 2))
beat = 60 / a.bpm
bar = 4 * beat
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
# chords as MIDI notes (pad voicing, arpeggio notes, bass)
CH = [([60, 64, 67, 71], [72, 76, 79, 83, 79, 76], 48),   # Cmaj7
      ([57, 60, 64, 67], [69, 72, 76, 79, 76, 72], 45),   # Am7
      ([53, 57, 60, 64], [69, 72, 77, 81, 77, 72], 41),   # Fmaj7
      ([55, 59, 62, 64], [71, 74, 79, 83, 79, 74], 43)]   # G6


def env(len_s, att, rel):
    t = np.arange(int(len_s * SR)) / SR
    e = np.minimum(1, t / att) * np.minimum(1, (len_s - t) / rel)
    return np.clip(e, 0, 1)


def add(sig, start, pan=0.0):
    i = int(start * SR)
    if i >= n:
        return
    sig = sig[: n - i]
    out[i:i + len(sig), 0] += sig * (1 - pan) * 0.5
    out[i:i + len(sig), 1] += sig * (1 + pan) * 0.5


t0 = 0.0
k = 0
while t0 < a.seconds:
    pad, arp, bass = CH[k % 4]
    L = bar * 2                                   # each chord lasts two bars
    t = np.arange(int((L + 1.5) * SR)) / SR
    e = env(L + 1.5, 1.8, 1.8)
    for j, m in enumerate(pad):                   # pad: two slightly detuned sines per note
        f = hz(m)
        s = np.sin(2 * np.pi * f * t) + 0.6 * np.sin(2 * np.pi * f * 1.003 * t + j)
        add(0.045 * s * e, t0, pan=(j - 1.5) * 0.3)
    fb = hz(bass)                                 # warm bass
    add(0.07 * np.sin(2 * np.pi * fb * t) * e, t0)
    for i in range(8):                            # music-box arpeggio, eighth notes, a few skipped
        if rng.random() < 0.25:
            continue
        m = arp[i % len(arp)]
        d = 1.6
        tt = np.arange(int(d * SR)) / SR
        ee = np.exp(-tt * 3.2) * np.minimum(1, tt / 0.01)
        s = np.sin(2 * np.pi * hz(m) * tt) + 0.25 * np.sin(2 * np.pi * hz(m) * 2 * tt)
        add(0.05 * s * ee, t0 + i * beat, pan=rng.uniform(-0.4, 0.4))
    t0 += L
    k += 1

# (the low-pass is applied by ffmpeg in mix_music.sh)
fade = np.minimum(1, np.minimum(np.arange(n) / (3 * SR), (n - np.arange(n)) / (4 * SR)))
out *= fade[:, None]
out /= np.max(np.abs(out)) + 1e-9
out *= 0.8
with wave.open(a.out, 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes((out * 32767).astype(np.int16).tobytes())
print('wrote', a.out, f'{a.seconds:.1f}s')
