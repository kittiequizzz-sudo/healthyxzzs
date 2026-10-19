#!/usr/bin/env python3
"""Write <project>/assets.js for the engine: photo sizes (window.SIZES) and the voice length (window.VOICE_END).
Run after adding or replacing photos:  python3 prep.py projects/<slug>
"""
import glob, json, os, subprocess, sys
from PIL import Image

d = sys.argv[1]
sizes = {os.path.basename(f)[:-4]: list(Image.open(f).size) for f in sorted(glob.glob(os.path.join(d, 'assets', '*.jpg')))}
voice = next(iter(sorted(glob.glob(os.path.join(d, 'audio', 'voice.*')))), None)
end = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', voice],
                           capture_output=True, text=True).stdout) if voice else None
open(os.path.join(d, 'assets.js'), 'w').write(f'window.SIZES = {json.dumps(sizes)};\nwindow.VOICE_END = {json.dumps(end)};\n')
print(len(sizes), 'photos; voice', end, 's')
