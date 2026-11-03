#!/usr/bin/env bash
# qa.sh name cue1+off cue2+off …  → renders frames at those cues and a contact sheet out/qa/<name>.jpg
cd "$(dirname "$0")"; n=$1; shift
ts=$(node -e "
const fs=require('fs');eval(fs.readFileSync('cues.js','utf8').replace('const CUE','global.CUE'));
console.log(process.argv.slice(1).map(a=>{const m=a.match(/^([a-z_0-9]+)([+-][\d.]+)?$/);return (CUE[m[1]]+(+(m[2]||1.5))).toFixed(2)}).join(','))" "$@")
rm -f out/qa/${n}_*.png
node ../../.claude/skills/health-video/flat/render.mjs video.html x --frames $ts --png out/qa/$n >/dev/null 2>&1
python3 -c "
import glob,sys
from PIL import Image
fs=sorted(glob.glob('out/qa/${n}_*.png'),key=lambda f:float(f.rsplit('_',1)[1][:-4]))
c=Image.new('RGB',(1920,540*((len(fs)+1)//2)))
for i,f in enumerate(fs): c.paste(Image.open(f).resize((960,540)),((i%2)*960,(i//2)*540))
c.save('out/qa/${n}.jpg',quality=78); print(len(fs))"
