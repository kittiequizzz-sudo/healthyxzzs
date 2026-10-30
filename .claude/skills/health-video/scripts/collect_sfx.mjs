#!/usr/bin/env node
// Collect the sound-effect cues each section page registers in window.SFX ([time, kind, vol]),
// keep the ones inside the page's START..END, and write them as JSON for mix_audio.py.
//
//   node collect_sfx.mjs <project_dir> out.json a.html b.html ...
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(path.join(here, '..', 'flat', 'node_modules', 'playwright-core', 'index.mjs'));
const [dir, out, ...pages] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const pg = await b.newPage();
let all = [];
for (const p of pages) {
  await pg.goto('file://' + path.resolve(dir, p));
  const [s, e, list] = await pg.evaluate(() => [window.START || 0, window.END, window.SFX || []]);
  const keep = list.filter(([t]) => t >= s && t < e);
  console.log(`${p}: ${keep.length} sfx`);
  all = all.concat(keep);
}
await b.close();
all.sort((a, b) => a[0] - b[0]);
fs.writeFileSync(out, JSON.stringify(all));
console.log('total', all.length);
