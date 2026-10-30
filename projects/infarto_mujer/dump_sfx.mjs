// Load video.html once and write the SFX events the scenes registered (window.SFX) to out/sfx.json.
import { chromium } from '../../.claude/skills/health-video/flat/node_modules/playwright-core/index.mjs';
import fs from 'node:fs'; import path from 'node:path';
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const p = await b.newPage();
await p.goto('file://' + path.resolve('video.html'));
const ev = await p.evaluate(() => { const s = window.SFX.slice().sort((a, b) => a[0] - b[0]); const out = []; for (const e of s) if (!out.length || e[0] - out.at(-1)[0] > 0.25 || e[1] !== out.at(-1)[1]) out.push(e); return out; });
const cue = await p.evaluate(() => ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'hoy_c'].map(k => CUE[k]));
fs.mkdirSync('out', { recursive: true });
fs.writeFileSync('out/sfx.json', JSON.stringify(ev));
fs.writeFileSync('out/sections.txt', [0, ...cue].join(','));
console.log(ev.length, 'sfx;', 'sections', [0, ...cue].join(','));
await b.close();
