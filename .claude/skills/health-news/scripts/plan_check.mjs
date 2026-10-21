// Plan QA before rendering: photo reuse and motion-accuracy frames.
//
//   node plan_check.mjs projects/<slug>/index.html projects/<slug>/qa_plan
//
// 1. Reuse report: how many shots use each photo, and photos shown in two shots in a row. A photo in more
//    than 2 shots, or two shots in a row, is flagged: replace the extra uses with a 2D animated scene
//    (news/anim.js) or a different picture.
// 2. Motion frames: for every animated shot (custom/bars/checklist/warning) one frame at each voice cue that
//    falls inside it, 0.6 s after the cue (when the change it triggers should be visible), plus the shot's
//    last frame. Contact sheet: qa_plan/motion.jpg, labelled "<shot> @ <cue>". Check each one against the
//    voice line (motion accuracy checklist in SKILL.md).
import { chromium } from '../../health-video/flat/node_modules/playwright-core/index.mjs';
import path from 'node:path'; import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const [page, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', e => console.log('PAGE ERROR', e.message));
await p.goto('file://' + path.resolve(page)); await p.evaluate(() => document.fonts.ready);
const info = await p.evaluate(() => ({
  shots: window.SHOTS.map(s => ({ at: s.at, type: s.type, src: s.src || '', t0: s.t0, t1: s.t1 })),
  cues: Object.entries(CUE),
}));
// ---- reuse
const uses = {};
info.shots.forEach((s, i) => { if (s.src) (uses[s.src] ||= []).push(s.at); });
const flagged = Object.entries(uses).filter(([, a]) => a.length > 2).sort((x, y) => y[1].length - x[1].length);
console.log('\nPHOTO REUSE (more than 2 shots):');
for (const [src, a] of flagged) console.log(`  ${src} ×${a.length}: ${a.join(', ')}`);
for (let i = 1; i < info.shots.length; i++) if (info.shots[i].src && info.shots[i].src === info.shots[i - 1].src)
  console.log(`  IN A ROW: ${info.shots[i - 1].at} → ${info.shots[i].at} (${info.shots[i].src})`);
const anim = info.shots.filter(s => ['custom', 'bars', 'checklist', 'warning'].includes(s.type));
const photo = info.shots.filter(s => ['photo', 'number', 'study', 'chapter'].includes(s.type) && s.src);
console.log(`\nMIX: ${photo.length} photo shots, ${anim.length} animated/graphic shots (aim ≥ 1 animated for every 2 photos)`);
// ---- motion frames
const frames = [];
for (const s of anim) {
  const inner = info.cues.filter(([, v]) => v - 0.2 >= s.t0 - 0.01 && v - 0.2 < s.t1).map(([k, v]) => [k, v - 0.2 + 0.6]);
  if (!inner.length) inner.push([s.at, s.t0 + 0.6]);
  inner.push(['end', s.t1 - 0.15]);
  for (const [k, t] of inner) if (t < s.t1) frames.push({ label: `${s.at} @ ${k}`, t });
}
const files = [];
for (const [i, f] of frames.entries()) {
  await p.evaluate(t => { window.draw(t - 0.1); window.draw(t); }, f.t);
  const fn = `${out}/m${String(i).padStart(3, '0')}.jpg`;
  await p.screenshot({ path: fn, type: 'jpeg', quality: 70 }); files.push([fn, `${f.label} (${f.t.toFixed(1)} s)`]);
}
await b.close();
fs.writeFileSync(`${out}/frames.json`, JSON.stringify(files));
execFileSync('python3', ['-c', `
import json, sys
from PIL import Image, ImageDraw
fs = json.load(open(sys.argv[1])); W, H, c = 640, 360, 4
for n in range(0, len(fs), 24):
    part = fs[n:n + 24]; r = (len(part) + c - 1) // c; s = Image.new('RGB', (W * c, H * r))
    for k, (f, lab) in enumerate(part):
        x, y = (k % c) * W, (k // c) * H
        s.paste(Image.open(f).resize((W, H)), (x, y)); d = ImageDraw.Draw(s)
        d.rectangle((x, y + H - 22, x + W, y + H), fill=(0, 0, 0)); d.text((x + 6, y + H - 18), lab, fill='yellow')
    s.save(sys.argv[2] + f'/motion{n // 24}.jpg', quality=80)
`, `${out}/frames.json`, out]);
console.log(`${files.length} motion frames → ${out}/motion*.jpg`);
