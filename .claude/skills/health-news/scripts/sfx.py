#!/usr/bin/env python3
"""Synthesised sound effects and a music bed for the news/documentary style. Everything is generated from
code (numpy), so there is no licence question and a render is always reproducible.

  sfx.py lib [out_dir]           → writes every effect as <name>.wav (48 kHz stereo) to listen to
  sfx.py bed out.wav SECONDS     → documentary music bed (soft pulse + pad), loopable length

Effects (name → where it goes):
  whoosh      wipe / section transition         swish   lower third, slide-in, photo cut accent
  impact      number slam, headline landing     boom    chapter opener (deep hit with a tail)
  riser       0.9 s build into a chapter        tick    one counter tick (count-ups use a run of them)
  paper       study page sliding in             marker  highlighter stroke
  ding        ✓ verdict                         thunk   ✗ verdict (soft, not an alarm)
  pop         button / badge                    heart   one heartbeat (lub-dub)
  shutter     photo "taken" accent (use rarely)
"""
import os
import sys
import wave

import numpy as np

SR = 48000
rng = np.random.default_rng(7)


def t_(d):
    return np.arange(int(SR * d)) / SR


def env(n, a, d, curve=4.0):
    """attack a s, then exponential decay over the rest; n samples"""
    x = np.arange(n) / SR
    e = np.minimum(1, x / max(a, 1e-4))
    return e * np.exp(-curve * np.maximum(0, x - a) / max(d, 1e-4))


def onepole_lp(x, fc):
    """one-pole low-pass; fc may be an array (time-varying cutoff)"""
    fc = np.broadcast_to(fc, x.shape)
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x); s = 0.0
    for i in range(len(x)):
        s = (1 - a[i]) * x[i] + a[i] * s; y[i] = s
    return y


def bandpass(x, f, q=2.0):
    """state-variable band-pass, f may vary over time"""
    f = np.broadcast_to(f, x.shape)
    y = np.empty_like(x); lo = bp = 0.0
    for i in range(len(x)):
        g = 2 * np.sin(np.pi * min(f[i], SR / 6) / SR)
        hi = x[i] - lo - bp / q
        bp += g * hi; lo += g * bp; y[i] = bp
    return y


def reverb(x, secs=1.2, mix=0.25, damp=3000):
    n = int(SR * secs)
    ir = rng.standard_normal(n) * np.exp(-6.9 * np.arange(n) / n)
    ir = onepole_lp(onepole_lp(ir, damp), damp)
    ir /= np.sqrt((ir ** 2).sum()) * 6
    L = len(x) + n
    wet = np.fft.irfft(np.fft.rfft(x, 2 * L) * np.fft.rfft(ir, 2 * L))[:L]   # FFT convolution
    out = np.zeros(L); out[: len(x)] += x
    return out * (1 - mix) + wet * mix


def stereo(x, pan=0.0):
    """pan -1..1, may be an array"""
    pan = np.broadcast_to(pan, x.shape)
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    return np.stack([x * l, x * r], 1) * 1.41


def norm(x, peak=0.8):
    m = np.abs(x).max()
    return x * (peak / m) if m else x


# ---------------------------------------------------------------- effects
def whoosh(d=0.7):
    n = int(SR * d); x = rng.standard_normal(n)
    u = np.linspace(0, 1, n)
    f = 220 + 1900 * np.sin(np.pi * u) ** 1.5
    y = onepole_lp(bandpass(x, f, 1.4), 4000) * np.sin(np.pi * u) ** 2
    return norm(stereo(y, np.linspace(-0.8, 0.8, n)), 0.7)


def swish(d=0.32):
    n = int(SR * d); u = np.linspace(0, 1, n)
    y = onepole_lp(bandpass(rng.standard_normal(n), 1200 + 2600 * u, 1.6), 6000) * np.sin(np.pi * u) ** 1.5
    return norm(stereo(y, np.linspace(-0.3, 0.4, n)), 0.5)


def impact(d=0.9):
    t = t_(d); n = len(t)
    f = 48 + 70 * np.exp(-t * 18)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.003, 0.25, 5)
    click = onepole_lp(rng.standard_normal(n), 2500) * env(n, 0.0005, 0.02, 6)
    body = np.tanh(2.8 * body) * 0.8   # harmonics so small speakers still hear it
    y = reverb(body * 0.9 + click * 0.6, 0.9, 0.18)
    return norm(stereo(y), 0.9)


def boom(d=2.2):
    t = t_(d); n = len(t)
    f = 36 + 50 * np.exp(-t * 6)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.005, 1.1, 4)
    air = onepole_lp(rng.standard_normal(n), 900) * env(n, 0.002, 0.5, 5)
    sub = np.tanh(2.2 * sub) * 0.85
    y = reverb(sub + air * 0.5, 1.6, 0.3, 1800)
    return norm(stereo(y), 0.9)


def riser(d=0.9):
    t = t_(d); n = len(t); u = t / d
    tone = sum(np.sin(2 * np.pi * np.cumsum(f0 * (1 + 1.5 * u ** 2)) / SR) for f0 in (180, 271, 362)) / 3
    noise = onepole_lp(bandpass(rng.standard_normal(n), 300 + 3500 * u ** 2, 1.5), 6000)
    y = (tone * 0.5 + noise * 0.8) * u ** 2.2
    y[-int(SR * 0.01):] *= np.linspace(1, 0, int(SR * 0.01))
    return norm(stereo(y, 0.15 * np.sin(2 * np.pi * 3 * t)), 0.6)


def tick(d=0.04):
    n = int(SR * d)
    y = bandpass(rng.standard_normal(n), 3500, 6) * env(n, 0.0003, 0.008, 5)
    y += np.sin(2 * np.pi * 1900 * t_(d)) * env(n, 0.0003, 0.006, 5) * 0.4
    return norm(stereo(y), 0.4)


def paper(d=0.55):
    n = int(SR * d); u = np.linspace(0, 1, n)
    x = rng.standard_normal(n) * (1 + 2 * (rng.random(n) > 0.997))   # little crackles
    y = onepole_lp(bandpass(x, 2200 + 1200 * u, 0.9), 7000) * np.sin(np.pi * u ** 0.7) ** 2
    return norm(stereo(y, np.linspace(0.3, -0.1, n)), 0.45)


def marker(d=0.6):
    n = int(SR * d); t = t_(d); u = t / d
    x = onepole_lp(bandpass(rng.standard_normal(n), 2600 + 500 * np.sin(2 * np.pi * 7 * t), 4), 6000)
    squeak = np.sin(2 * np.pi * np.cumsum(1400 + 120 * np.sin(2 * np.pi * 5 * t)) / SR) * 0.08
    y = (x + squeak) * np.minimum(1, u * 12) * np.minimum(1, (1 - u) * 6)
    return norm(stereo(y, np.linspace(-0.4, 0.4, n)), 0.35)


def ding(d=1.6):
    t = t_(d); n = len(t)
    y = sum(a * np.sin(2 * np.pi * f * t) * env(n, 0.002, dd, 4) for f, a, dd in ((1046.5, 1, 1.4), (2093, 0.35, 0.6), (3140, 0.12, 0.3), (1568, 0.25, 0.9)))
    return norm(stereo(reverb(y, 1.0, 0.2)[:n]), 0.45)


def thunk(d=0.5):
    t = t_(d); n = len(t)
    y = sum(np.sign(np.sin(2 * np.pi * f * t)) for f in (196, 185)) / 2
    y = onepole_lp(y, 900) * env(n, 0.004, 0.22, 4)
    return norm(stereo(y), 0.45)


def pop(d=0.18):
    t = t_(d); n = len(t)
    y = np.sin(2 * np.pi * np.cumsum(420 + 900 * np.exp(-t * 60)) / SR) * env(n, 0.001, 0.06, 5)
    return norm(stereo(y), 0.45)


def heart(d=1.0):
    t = t_(d); n = len(t); y = np.zeros(n)
    for t0, f, a in ((0.0, 55, 1.0), (0.24, 65, 0.7)):
        k = (t >= t0)
        tt = t[k] - t0
        y[k] += a * np.sin(2 * np.pi * f * tt) * np.exp(-tt * 22) * np.minimum(1, tt / 0.004)
    return norm(stereo(onepole_lp(np.tanh(3 * y), 700)), 0.8)


def shutter(d=0.2):
    n = int(SR * d); y = np.zeros(n)
    for t0 in (0.0, 0.07):
        i = int(SR * t0); m = int(SR * 0.03)
        y[i:i + m] += bandpass(rng.standard_normal(m), 4000, 3) * env(m, 0.0003, 0.01, 5)
    return norm(stereo(y), 0.4)


LIB = {f.__name__: f for f in (whoosh, swish, impact, boom, riser, tick, paper, marker, ding, thunk, pop, heart, shutter)}


# ---------------------------------------------------------------- music bed
def bed(secs, bpm=76):
    """Calm documentary bed: slow pad chords (Am–F–C–G), a soft low pulse on each beat, sparse bell
    notes. Kept dark and low so a voice sits on top. Loudness is set later in the mix."""
    n = int(SR * secs); t = np.arange(n) / SR
    out = np.zeros((n, 2))
    bar = 4 * 60 / bpm
    chords = [(220.0, 261.6, 329.6), (174.6, 220.0, 261.6), (196.0, 261.6, 329.6), (196.0, 246.9, 293.7)]
    for k in range(int(np.ceil(secs / bar)) + 1):
        a = int(k * bar * SR); b = min(n, int((k + 1.15) * bar * SR))
        if a >= n: break
        tt = (np.arange(b - a)) / SR
        e = np.minimum(1, tt / 0.8) * np.minimum(1, (bar * 1.15 - tt) / 0.8)
        for f in chords[k % 4]:
            for det, pan in ((-0.004, -0.5), (0.004, 0.5)):
                ph = 2 * np.pi * f * (1 + det) * tt
                v = (np.sin(ph) + 0.3 * np.sin(2 * ph) + 0.1 * np.sin(3 * ph)) * e * 0.05
                out[a:b] += stereo(v, pan)
        # bass note
        f0 = chords[k % 4][0] / 2
        out[a:b] += stereo(np.sin(2 * np.pi * f0 * tt) * e * 0.08)
    # pulse: muted low thump each beat, quieter on the off-beats
    beat = 60 / bpm
    for k in range(int(secs / beat)):
        i = int(k * beat * SR); m = min(n - i, int(SR * 0.35))
        tt = np.arange(m) / SR
        v = np.sin(2 * np.pi * (52 + 30 * np.exp(-tt * 30)) * tt) * np.exp(-tt * 12) * (0.22 if k % 2 == 0 else 0.12)
        out[i:i + m] += stereo(v)
    # sparse bells (pentatonic), deterministic
    notes = [659.3, 784.0, 880.0, 1046.5, 987.8]
    for k in range(int(secs / (beat * 3))):
        if rng.random() < 0.45:
            i = int((k * 3 + 1.5) * beat * SR); m = min(n - i, int(SR * 2))
            if m <= 0: continue
            tt = np.arange(m) / SR
            out[i:i + m] += stereo(np.sin(2 * np.pi * notes[k % 5] * tt) * np.exp(-tt * 2.2) * 0.03, rng.uniform(-0.6, 0.6))
    l = onepole_lp(out[:, 0], 3500); r = onepole_lp(out[:, 1], 3500)
    out = np.stack([l, r], 1)
    fade = int(SR * 2)
    out[:fade] *= np.linspace(0, 1, fade)[:, None]; out[-fade:] *= np.linspace(1, 0, fade)[:, None]
    return norm(out, 0.7)


def write(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype('<i2').tobytes())


if __name__ == '__main__':
    cmd = sys.argv[1]
    if cmd == 'lib':
        d = sys.argv[2] if len(sys.argv) > 2 else 'sfx'
        os.makedirs(d, exist_ok=True)
        for k, f in LIB.items():
            write(os.path.join(d, k + '.wav'), f()); print(k)
    elif cmd == 'bed':
        write(sys.argv[2], bed(float(sys.argv[3])))
