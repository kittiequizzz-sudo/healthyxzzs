#!/usr/bin/env node
// Word-level timestamps for a voice-over, fully offline (Whisper small, q8).
//
//   node transcribe.mjs voice.mp3 out_dir [--lang english]
//
// Writes:
//   out_dir/words.json   [{ i, w, s, e }]  absolute seconds
//   out_dir/words.txt    one word per line: "i  start  end  word"  (easy to scan when timing cues)
//   out_dir/lines.txt    sentence-level lines with start/end, for matching the script
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('usage: transcribe.mjs <voice audio/video> <out_dir> [--lang english]');
  process.exit(1);
}
const [input, outDir] = args;
const lang = args.includes('--lang') ? args[args.indexOf('--lang') + 1] : 'english';
const asrDir = process.env.HV_ASR_DIR || path.join(os.homedir(), '.cache/health-video/asr');
const tf = path.join(asrDir, 'node_modules/@huggingface/transformers/dist/transformers.node.mjs');
if (!fs.existsSync(tf)) {
  console.error(`ASR not installed at ${asrDir}; run scripts/setup.sh first`);
  process.exit(1);
}
const { pipeline, env } = await import(tf);
env.allowRemoteModels = false;
env.localModelPath = path.join(asrDir, 'node_modules/sts-whisper-small/models/');

const pcm = execFileSync('ffmpeg', ['-v', 'error', '-i', input, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'],
  { maxBuffer: 2 ** 31 });
const audio = new Float32Array(new Uint8Array(pcm).buffer);

const asr = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small', { dtype: 'q8' });
const out = await asr(audio, {
  return_timestamps: 'word', chunk_length_s: 30, stride_length_s: 5, language: lang, task: 'transcribe',
});

const dur = audio.length / 16000;
const words = out.chunks.map((c, i) => ({
  i,
  w: c.text.trim(),
  s: +c.timestamp[0].toFixed(2),
  e: +Math.min(c.timestamp[1] ?? dur, dur).toFixed(2),
}));

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'words.json'), JSON.stringify(words, null, 1));
fs.writeFileSync(path.join(outDir, 'words.txt'),
  words.map(w => `${String(w.i).padStart(4)}  ${w.s.toFixed(2).padStart(7)}  ${w.e.toFixed(2).padStart(7)}  ${w.w}`).join('\n') + '\n');

const lines = [];
let cur = [];
for (const w of words) {
  cur.push(w);
  if (/[.!?]["')\]]?$/.test(w.w)) { lines.push(cur); cur = []; }
}
if (cur.length) lines.push(cur);
fs.writeFileSync(path.join(outDir, 'lines.txt'),
  lines.map(l => `[${l[0].s.toFixed(2)} - ${l.at(-1).e.toFixed(2)}] (w${l[0].i}-${l.at(-1).i}) ${l.map(w => w.w).join(' ')}`).join('\n') + '\n');
console.log(`${words.length} words, ${dur.toFixed(1)}s -> ${outDir}`);
