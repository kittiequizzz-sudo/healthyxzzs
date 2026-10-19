#!/usr/bin/env python3
"""Build the soundtrack of a scene: voice + music bed (ducked under the voice) + sound effects placed at
the times the scene lists in window.SFX = [[t, 'name', gainDb], …]. Then mux it onto the video.

  mix.py <scene.html|events.json> <video.mp4> <out.mp4> [--voice voice.mp3] [--music bed.wav|auto]
         [--sfx-db -4] [--music-db -20] [--duck-db -10]

--music auto generates the synthesised bed (sfx.py bed). Without a voice the bed plays at --music-db + 8.
Loudness: the final mix is normalised to −14 LUFS, −1.5 dBTP (YouTube).
For long videos rendered in sections, list the events of every section page: pass several pages
separated by commas; each page's window.SFX is already on the shared voice timeline.
"""
import argparse, json, os, subprocess, sys, tempfile, wave
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import sfx  # noqa: E402

SR = sfx.SR


def events_from(spec):
    if spec.endswith('.json'):
        return json.load(open(spec))
    pw = os.path.join(HERE, '..', '..', 'health-video', 'flat', 'node_modules', 'playwright-core', 'index.mjs')
    js = f"""
import {{ chromium }} from '{pw}';
const b = await chromium.launch({{ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' }});
const p = await b.newPage(); let all = [];
for (const f of {json.dumps([os.path.abspath(s) for s in spec.split(',')])}) {{
  await p.goto('file://' + f); all = all.concat(await p.evaluate(() => window.SFX || []));
}}
console.log(JSON.stringify(all)); await b.close();"""
    out = subprocess.run(['node', '--input-type=module', '-e', js], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


def read_audio(path):
    """any format → float stereo at SR (via ffmpeg)"""
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).astype(np.float64)


def db(x):
    return 10 ** (x / 20)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('events'); ap.add_argument('video'); ap.add_argument('out')
    ap.add_argument('--voice'); ap.add_argument('--music', default='auto')
    ap.add_argument('--sfx-db', type=float, default=-4); ap.add_argument('--music-db', type=float, default=-20)
    ap.add_argument('--duck-db', type=float, default=-10)
    a = ap.parse_args()

    dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', a.video], capture_output=True, text=True).stdout)
    n = int(dur * SR) + SR
    mix = np.zeros((n, 2))

    voice = None
    if a.voice:
        voice = read_audio(a.voice)[:n]
        mix[:len(voice)] += voice

    if a.music != 'none':
        bed = sfx.bed(dur + 1) if a.music == 'auto' else read_audio(a.music)
        if len(bed) < n:
            bed = np.tile(bed, (n // len(bed) + 1, 1))
        bed = bed[:n] * db(a.music_db + (0 if voice is not None else 8))
        if voice is not None:
            # duck: follow the voice envelope (50 ms window), smooth 300 ms
            e = np.sqrt(np.convolve((voice ** 2).mean(1), np.ones(2400) / 2400, 'same'))
            on = (e > db(-40)).astype(float)
            k = int(SR * 0.3); on = np.convolve(on, np.ones(k) / k, 'same')
            g = np.ones(n); g[:len(on)] = 1 - on * (1 - db(a.duck_db))
            bed *= g[:, None]
        mix += bed

    cache = {}
    for t, name, *g in events_from(a.events):
        if name not in cache:
            cache[name] = sfx.LIB[name]()
        s = cache[name] * db(a.sfx_db + (g[0] if g else 0))
        i = int(t * SR)
        if 0 <= i < n:
            m = min(len(s), n - i); mix[i:i + m] += s[:m]

    peak = np.abs(mix).max()
    if peak > 0.98:
        mix *= 0.98 / peak
    tmp = tempfile.mktemp(suffix='.wav')
    sfx.write(tmp, mix)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a.video, '-i', tmp, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
                    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest',
                    '-movflags', '+faststart', a.out], check=True)
    os.remove(tmp)
    print('wrote', a.out)


if __name__ == '__main__':
    main()
