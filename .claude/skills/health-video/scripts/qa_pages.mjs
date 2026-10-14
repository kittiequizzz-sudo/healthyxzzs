// Contact sheet per section page: frames every <step> s between window.START and window.END.
//
//   node qa_pages.mjs projects/<slug> 3 intro.html clave1.html …   → projects/<slug>/qa/<page>_contact.png
//
// Look at every sheet before rendering (overflow, overlaps, timing); see references/qa-checklist.md.
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
const here = path.dirname(fileURLToPath(import.meta.url));
const { chromium } = await import(path.join(here, '..', 'flat', 'node_modules', 'playwright-core', 'index.mjs'));
const [dir, step, ...pages] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 1920, height: 1080 } });
pg.on('pageerror', e => console.log('PAGE ERROR', e.message));
fs.mkdirSync(path.join(dir, 'qa'), { recursive: true });
for (const p of pages) {
  await pg.goto('file://' + path.resolve(dir, p));
  await pg.evaluate(() => document.fonts.ready);
  const [s, e] = await pg.evaluate(() => [window.START || 0, window.END]);
  const files = [];
  for (let t = s + 1; t < e; t += +step) {
    await pg.evaluate(t => window.draw(t), t);
    const f = `${dir}/qa/${p}_${t.toFixed(1)}.png`; await pg.screenshot({ path: f }); files.push(f);
  }
  execFileSync('python3', ['-c', `
import sys
from PIL import Image, ImageDraw
fs=sys.argv[1:]; W,H=480,270; c=4; r=(len(fs)+c-1)//c; s=Image.new('RGB',(W*c,H*r),'white')
for k,f in enumerate(fs):
    im=Image.open(f).resize((W,H)); ImageDraw.Draw(im).text((6,4),f.split('_')[-1][:-4],fill='red'); s.paste(im,((k%c)*W,(k//c)*H))
s.save('${dir}/qa/${p}_contact.png')`, ...files]);
  console.log(p, s.toFixed(1), e.toFixed(1), files.length);
}
await b.close();
