#!/usr/bin/env python3
"""Split a long video into upload-sized parts that join cleanly (no clicks, no A/V drift).

  python3 split_parts.py video.mp4 voice.mp3 out_dir name [--target 170] [--window 25]

Why: `ffmpeg -f segment -c copy` cuts at the nearest video keyframe while the AAC audio is cut on its own
frame grid, so each part starts with a few ms of drift and the cut lands mid-word / mid-waveform (a click).
Here: (1) every cut is placed in the middle of a pause in the VOICE (silencedetect) near each target time,
(2) the video is re-encoded once with a keyframe forced exactly at every cut, so the video split is
frame-exact, (3) each part's audio is decoded from one lossless WAV and re-encoded with a 25 ms fade in and
out, so the joins are silent and sample-aligned.
"""
import argparse, re, subprocess, os

ap = argparse.ArgumentParser()
ap.add_argument('video'); ap.add_argument('voice'); ap.add_argument('out'); ap.add_argument('name')
ap.add_argument('--target', type=float, default=170); ap.add_argument('--window', type=float, default=25)
ap.add_argument('--crf', default='22')
a = ap.parse_args()
os.makedirs(a.out, exist_ok=True)
run = lambda *c: subprocess.run(c, check=True, capture_output=True, text=True)
dur = float(run('ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.video).stdout)

# 1. pauses in the voice
log = subprocess.run(['ffmpeg', '-i', a.voice, '-af', 'silencedetect=noise=-38dB:d=0.35', '-f', 'null', '-'],
                     capture_output=True, text=True).stderr
starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
pauses = [((s + e) / 2, e - s) for s, e in zip(starts, ends)]

cuts, t = [], a.target
while t < dur - a.target * 0.4:
    near = [p for p in pauses if abs(p[0] - t) <= a.window and (not cuts or p[0] > cuts[-1] + 30)]
    c = max(near, key=lambda p: p[1] - abs(p[0] - t) / a.window * 0.3)[0] if near else t
    c = round(c * 30) / 30  # frame grid (30 fps)
    cuts.append(c); t = c + a.target
print('cuts at', ', '.join(f'{c:.2f}' for c in cuts))

# 2. one re-encode with keyframes exactly at the cuts; audio kept as lossless PCM
master = os.path.join(a.out, '_master.mkv')
run('ffmpeg', '-v', 'error', '-y', '-i', a.video, '-c:v', 'libx264', '-crf', a.crf, '-preset', 'medium',
    '-pix_fmt', 'yuv420p', '-force_key_frames', ','.join(f'{c:.3f}' for c in cuts), '-c:a', 'pcm_s16le', master)

# 3. parts: video copied between keyframes, audio re-encoded with short fades
bounds = [0.0] + cuts + [dur]
for i in range(len(bounds) - 1):
    s, e = bounds[i], bounds[i + 1]; d = e - s
    out = os.path.join(a.out, f'{a.name}_parte{i}.mp4')
    run('ffmpeg', '-v', 'error', '-y', '-ss', f'{s:.3f}', '-i', master, '-t', f'{d:.3f}', '-map', '0:v', '-map', '0:a',
        '-c:v', 'copy', '-af', f'afade=in:d=0.025,afade=out:st={max(0, d - 0.025):.3f}:d=0.025',
        '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out)
    vd = float(run('ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=duration', '-of', 'csv=p=0', out).stdout)
    ad = float(run('ffprobe', '-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=duration', '-of', 'csv=p=0', out).stdout)
    print(f'{os.path.basename(out)}: {s:.2f}→{e:.2f}  video {vd:.3f}s audio {ad:.3f}s  {os.path.getsize(out)/1e6:.1f} MB')
os.remove(master)
