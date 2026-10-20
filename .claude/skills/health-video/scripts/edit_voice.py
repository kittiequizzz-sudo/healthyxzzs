#!/usr/bin/env python3
"""Cut and re-join pieces of a voice-over without re-recording, and carry the word timestamps along.

  edit_voice.py voice.mp3 transcript/words.json edit.json out.mp3 out_words.json

edit.json: a list of pieces in output order, each [start, end] in seconds of the source voice, or
{"silence": seconds}. Every cut point is moved to the quietest 20 ms within ±0.05 s (so cuts land in
pauses, not inside a word), and each piece gets 15 ms fades against clicks. Words whose start falls
inside a kept piece are written to out_words.json with their new times, so cues.mjs works on the result.
"""
import json
import subprocess
import sys

import numpy as np

src, words_path, edit_path, out_audio, out_words = sys.argv[1:6]
SR = 24000
pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'],
                     capture_output=True, check=True).stdout
x = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768


def quiet(t, win=0.05):
    """Time of the quietest 20 ms window centred within ±win of t."""
    a, b = max(0, int((t - win) * SR)), min(len(x), int((t + win) * SR))
    hop, n = int(0.005 * SR), int(0.02 * SR)
    best, bt = 1e9, t
    for i in range(a, max(a + 1, b - n), hop):
        e = float(np.sqrt(np.mean(x[i:i + n] ** 2)))
        if e < best:
            best, bt = e, (i + n / 2) / SR
    return bt


edit = json.load(open(edit_path))
words = json.load(open(words_path))
pieces, out, t_out = [], [], 0.0
fade = int(0.015 * SR)
for p in edit:
    if isinstance(p, dict):
        n = int(p['silence'] * SR)
        out.append(np.zeros(n, np.float32))
        t_out += n / SR
        continue
    a, b = quiet(p[0]), quiet(p[1])
    seg = x[int(a * SR):int(b * SR)].copy()
    ramp = np.linspace(0, 1, fade, dtype=np.float32)
    seg[:fade] *= ramp
    seg[-fade:] *= ramp[::-1]
    for w in words:
        if a <= w['s'] < b:
            pieces.append({**w, 's': round(w['s'] - a + t_out, 3), 'e': round(min(w['e'], b) - a + t_out, 3)})
    out.append(seg)
    print(f'piece {p[0]:.2f}-{p[1]:.2f} → cut {a:.3f}-{b:.3f} at {t_out:.2f}s')
    t_out += len(seg) / SR

y = (np.concatenate(out) * 32767).clip(-32768, 32767).astype(np.int16)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-',
                '-c:a', 'libmp3lame', '-b:a', '160k', out_audio], input=y.tobytes(), check=True)
for i, w in enumerate(pieces):
    w['i'] = i
json.dump(pieces, open(out_words, 'w'), ensure_ascii=False, indent=1)
print(f'wrote {out_audio} ({t_out:.2f}s, {len(pieces)} words)')
