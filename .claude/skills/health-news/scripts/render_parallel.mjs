#!/usr/bin/env node
// Render one scene page in N parallel chunks (frame-snapped), join them without re-encoding.
//
//   node render_parallel.mjs page.html out.mp4 [--jobs 4] [--fps 30] [render.mjs options: --grain 6 --crf 19 …]
//
// Each job is a separate Chromium + ffmpeg (render.mjs --from/--to); on 4 cores, 4 jobs ≈ 3.5× faster.
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const take = (k, d) => { const i = args.indexOf(k); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const jobs = Number(take('--jobs', 4)), fps = Number(take('--fps', 30));
const [page, out, ...pass] = args;
const here = path.dirname(fileURLToPath(import.meta.url));
const renderer = path.join(here, '..', '..', 'health-video', 'flat', 'render.mjs');
const { chromium } = await import(path.join(here, '..', '..', 'health-video', 'flat', 'node_modules', 'playwright-core', 'index.mjs'));

const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const pg = await b.newPage();
await pg.goto('file://' + path.resolve(page));
const [start, end] = await pg.evaluate(() => [window.START || 0, window.END || window.DURATION]);
await b.close();

const snap = t => Math.round(t * fps) / fps;
const cuts = Array.from({ length: jobs + 1 }, (_, i) => snap(start + (end - start) * i / jobs));
const dir = path.join(path.dirname(path.resolve(out)), '.chunks_' + path.basename(out, '.mp4'));
fs.mkdirSync(dir, { recursive: true });
const t0 = Date.now();
await Promise.all(cuts.slice(0, -1).map((a, i) => new Promise((res, rej) => {
  const f = path.join(dir, `c${i}.mp4`);
  const c = spawn('node', [renderer, path.resolve(page), f, '--fps', String(fps), '--from', String(a), '--to', String(cuts[i + 1]), ...pass], { stdio: ['ignore', 'ignore', 'pipe'] });
  let err = ''; c.stderr.on('data', d => { err += d; });
  c.on('close', code => code ? rej(new Error(`chunk ${i}: ${err.slice(-800)}`)) : res());
})));
fs.writeFileSync(path.join(dir, 'list.txt'), cuts.slice(0, -1).map((_, i) => `file 'c${i}.mp4'`).join('\n'));
execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(dir, 'list.txt'), '-c', 'copy', '-movflags', '+faststart', out]);
fs.rmSync(dir, { recursive: true });
console.log(`wrote ${out} (${(end - start).toFixed(1)} s of video in ${((Date.now() - t0) / 1000).toFixed(0)} s, ${jobs} jobs)`);
