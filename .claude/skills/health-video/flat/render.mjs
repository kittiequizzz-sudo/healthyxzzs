#!/usr/bin/env node
// Render an HTML scene file to MP4, frame by frame (deterministic, no real-time playback).
// The page must define window.DURATION (seconds) and window.draw(t) that sets the frame for time t.
//
//   node render.mjs scene.html out.mp4 [--fps 30] [--audio voice.wav] [--from 0 --to 5] [--frames 0,2.5,4 --png out_prefix]
//                   [--crf 17] [--preset medium] [--grain 0] [--maxrate 8M]
// Frames are captured as JPEG (q 95): PNG encoding cost ~10× more time per frame than drawing it.
// --grain N adds film grain in ffmpeg (temporal noise, strength N ≈ 4–8) instead of an SVG filter.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const [scene, out] = args;
const fps = Number(opt('--fps', 30));
const audio = opt('--audio', null);
const frames = opt('--frames', null);
const crf = opt('--crf', '17'), preset = opt('--preset', 'medium'), grain = Number(opt('--grain', 0)), maxrate = opt('--maxrate', null);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', e => { console.error('page error:', e.message); process.exit(1); });
await page.goto('file://' + path.resolve(scene));
await page.evaluate(() => document.fonts.ready);
const dur = await page.evaluate(() => window.DURATION);

if (frames) {
  for (const t of frames.split(',').map(Number)) {
    await page.evaluate(t => window.draw(t), t);
    await page.evaluate(() => window.ready && window.ready());   // pages with image sequences (news.js Clip)
    await page.screenshot({ path: `${opt('--png', 'frame')}_${t}.png` });
  }
  await browser.close();
  process.exit(0);
}

const t0 = Number(opt('--from', 0));
const t1 = Number(opt('--to', dur));
const n = Math.round((t1 - t0) * fps);
const ff = ['-v', 'error', '-y', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-'];
if (audio) ff.push('-ss', String(t0), '-t', String(t1 - t0), '-i', audio);
ff.push('-c:v', 'libx264', '-crf', crf, '-preset', preset, '-pix_fmt', 'yuv420p', '-r', String(fps));
if (grain) ff.push('-vf', `noise=alls=${grain}:allf=t`, '-tune', 'grain');
if (maxrate) ff.push('-maxrate', maxrate, '-bufsize', String(parseInt(maxrate) * 2) + 'M');
if (audio) ff.push('-c:a', 'aac', '-b:a', '192k', '-af', 'loudnorm=I=-14:TP=-1.5', '-shortest');
ff.push('-movflags', '+faststart', out);
const enc = spawn('ffmpeg', ff, { stdio: ['pipe', 'inherit', 'inherit'] });
for (let i = 0; i < n; i++) {
  const t = t0 + i / fps;
  await page.evaluate(t => window.draw(t), t);
  await page.evaluate(() => window.ready && window.ready());
  const png = await page.screenshot({ type: 'jpeg', quality: 95 });
  if (!enc.stdin.write(png)) await new Promise(r => enc.stdin.once('drain', r));
  if (i % (fps * 5) === 0) process.stderr.write(`  ${t.toFixed(1)}s / ${t1}s\n`);
}
enc.stdin.end();
await new Promise(r => enc.on('close', r));
await browser.close();
console.log('wrote', out);
