#!/usr/bin/env node
// Fast renderer for news pages: two layers.
//  1. Graphics: the page is opened with ?layered on a transparent background; a frame is captured (fast PNG)
//     only when the SVG changed since the previous frame, so static stretches cost almost nothing.
//  2. Pictures: Photo/Clip push their placement per frame to window.BG; compose.py warps the photos with
//     OpenCV, lays the graphics on top and pipes the frames to ffmpeg (grain added there).
// Chunks run in parallel (one Chromium + one compositor each) and are joined without re-encoding.
//
//   node render_layers.mjs page.html out.mp4 [--jobs 4] [--fps 30] [--grain 6] [--crf 20] [--preset veryfast]
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const take = (k, d) => { const i = args.indexOf(k); if (i < 0) return d; const v = args[i + 1]; args.splice(i, 2); return v; };
const jobs = Number(take('--jobs', 4)), fps = Number(take('--fps', 30)), chunk = take('--chunk', null);
const grain = take('--grain', '6'), crf = take('--crf', '20'), preset = take('--preset', 'veryfast'), maxrate = take('--maxrate', '');
const from = Number(take('--from', NaN)), to = Number(take('--to', NaN));
const [page, out] = args;
const here = path.dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(path.join(here, '..', '..', 'health-video', 'flat', 'node_modules', 'playwright-core', 'index.mjs'));
const url = 'file://' + path.resolve(page) + '?layered';

async function open() {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => { console.error('page error:', e.message); process.exit(1); });
  await p.goto(url);
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => { for (const e of [document.documentElement, document.body]) e.style.background = 'transparent'; });
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  return { b, p, cdp };
}

if (chunk !== null) {
  // one chunk: capture graphics + per-frame layers, then composite
  const dir = path.join(path.dirname(path.resolve(out)), `.layers_${path.basename(out, '.mp4')}`);
  fs.mkdirSync(dir, { recursive: true });
  const { b, p, cdp } = await open();
  const n0 = Math.round(from * fps), n1 = Math.round(to * fps);
  const frames = []; let last = null, k = 0, cur = null;
  for (let i = n0; i < n1; i++) {
    const t = i / fps;
    const [key, bg] = await p.evaluate(async t => {
      window.BG = []; window.draw(t); if (window.ready) await window.ready();
      const s = document.getElementById('s').innerHTML; let h = 0;
      for (let j = 0; j < s.length; j++) h = (h * 31 + s.charCodeAt(j)) | 0;
      return [h + ':' + s.length, window.BG];
    }, t);
    if (key !== last) {
      const r = await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true });
      cur = path.join(dir, `o${String(k++).padStart(5, '0')}.png`);
      fs.writeFileSync(cur, Buffer.from(r.data, 'base64'));
      last = key;
    }
    frames.push({ o: cur, bg });
  }
  await b.close();
  const spec = path.join(dir, 'frames.json');
  fs.writeFileSync(spec, JSON.stringify({ base: path.dirname(path.resolve(page)), fps, frames }));
  execFileSync('python3', [path.join(here, 'compose.py'), spec, out, '--grain', grain, '--crf', crf, '--preset', preset, ...(maxrate ? ['--maxrate', maxrate] : [])], { stdio: 'inherit' });
  fs.rmSync(dir, { recursive: true });
  console.error(`chunk ${chunk}: ${n1 - n0} frames, ${k} graphics captures`);
  process.exit(0);
}

// orchestrator
const { b, p } = await open();
const [start, end] = await p.evaluate(() => [window.START || 0, window.END || window.DURATION]);
await b.close();
const snap = t => Math.round(t * fps) / fps;
const cuts = Array.from({ length: jobs + 1 }, (_, i) => snap(start + (end - start) * i / jobs));
const dir = path.join(path.dirname(path.resolve(out)), `.chunks_${path.basename(out, '.mp4')}_${process.pid}`);
fs.mkdirSync(dir, { recursive: true });
const t0 = Date.now();
await Promise.all(cuts.slice(0, -1).map((a, i) => new Promise((res, rej) => {
  const f = path.join(dir, `c${i}.mp4`);
  const c = spawn('node', [fileURLToPath(import.meta.url), page, f, '--chunk', String(i), '--from', String(a), '--to', String(cuts[i + 1]),
    '--fps', String(fps), '--grain', grain, '--crf', crf, '--preset', preset, ...(maxrate ? ['--maxrate', maxrate] : [])], { stdio: ['ignore', 'ignore', 'pipe'] });
  let err = ''; c.stderr.on('data', d => { err += d; });
  c.on('close', code => code ? rej(new Error(`chunk ${i}: ${err.slice(-1500)}`)) : (process.stderr.write(err.split('\n').filter(l => l.startsWith('chunk')).join('\n') + '\n'), res()));
})));
fs.writeFileSync(path.join(dir, 'list.txt'), cuts.slice(0, -1).map((_, i) => `file 'c${i}.mp4'`).join('\n'));
execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(dir, 'list.txt'), '-c', 'copy', '-movflags', '+faststart', out]);
fs.rmSync(dir, { recursive: true });
console.log(`wrote ${out} (${(end - start).toFixed(1)} s of video in ${((Date.now() - t0) / 1000).toFixed(0)} s, ${jobs} jobs)`);
