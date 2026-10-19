// Plan-driven video engine for the news style. A video is a list of shots in plan.js; the engine builds
// every shot from news.js components, times it to the voice cues, adds the channel bug, small print,
// wipes before chapters and the sound design (window.SFX). Needs lib.js, kit.js, news.js, cues.js.
//
//   Story({ name: 'SALUD 60+', lead: 0.2 }, [
//     { at: 'hook', type: 'photo', src: 'doc_talk', move: 'in', head: ['¿ME SIENTO BIEN…', '¿Y ESTE NÚMERO?'], hi: 1 },
//     { at: 'clave1', type: 'chapter', src: 'film_camera', n: 1, title: 'La foto y la película' },
//     …
//   ])
//
// `at` is a cue key (cues.js) or seconds; a shot lasts until the next one. Inner timings (`lt`, `ats`,
// `hiAt`, `at2`) are cue keys too. Photos: assets/<src>.jpg (2112 px wide); clips: clips/<src>/f0000.jpg…
const SFX = [];
const SHOT = {};
let STORY_T = null;

function Story(cfg, plan) {
  const { name = 'SALUD 60+', lead = 0.2, end = null } = cfg;
  const T = k => (typeof k === 'number' ? k : (k in CUE ? CUE[k] - lead : (() => { throw new Error('missing cue ' + k); })()));
  STORY_T = T;
  const svg = NewsStage();
  const sizes = window.SIZES || {};
  const shots = plan.map((p, i) => ({ ...p, t0: T(p.at), i }));
  shots.forEach((s, i) => { s.t1 = i + 1 < shots.length ? shots[i + 1].t0 : (end ?? window.VOICE_END ?? s.t0 + 6); });
  window.DURATION = shots.at(-1).t1;
  for (const s of shots) {
    const g = el('g', {}, svg);
    s.g = g;
    s.draw = (SHOT[s.type] || SHOT.photo)(g, s, sizes);
    // default sound for the shot type (sourcing-and-sound.md § Sound grammar)
    const fx = { chapter: [[-0.9, 'riser', -6], [-0.25, 'whoosh', -2], [0.2, 'boom', -4]], number: [[0, 'impact', -4]],
      study: [[0.1, 'paper', -2]], split: [[0, 'whoosh', -10]], end: [[0, 'whoosh', -6], [0.6, 'pop', -4]],
      warning: [[0, 'thunk', -10]], checklist: [[0, 'swish', -8]] }[s.type] || (s.i ? [[0, 'swish', -14]] : [[0, 'boom', -10]]);
    if (!s.quiet) for (const [dt, n, gdb] of fx) SFX.push([+(s.t0 + dt).toFixed(3), n, gdb]);
    if (s.lt || s.head) SFX.push([+(s.t0 + 0.3).toFixed(3), 'swish', -8]);
  }
  const bug = Bug(svg, { name, section: 'INFORME' });   // after the shots, so they sit on top
  const sp = SmallPrint(svg);
  const wipe = Wipe(svg);
  const grade = Grade(svg);
  window.SFX = SFX.filter(e => e[0] >= 0).sort((a, b) => a[0] - b[0]);
  window.draw = t => {
    let sec = 'INFORME', src = '', note = '';
    for (const s of shots) {
      const on = (s.type === 'chapter' || s.fade ? sceneVis : cutVis)(s.g, t, s.t0, s.t1 + (s.type === 'chapter' ? 0.3 : 0));
      if (s.t0 <= t) { if (s.sec) sec = s.sec; }
      if (on > 0) { s.draw(t); src = s.source || ''; note = s.note ?? (s.src && !s.noNote ? 'Imagen ilustrativa' : ''); }
    }
    bug.section(sec);
    bug.draw(t, 0.3);
    bug.g.style.display = shots.find(s => s.type === 'end' && t >= s.t0) ? 'none' : '';
    sp.set(src, note);
    const ch = shots.find(s => s.type === 'chapter' && Math.abs(t - s.t0) < 0.4);
    wipe.draw(t, ch ? ch.t0 : -9);
    grade.draw(t);
  };
  window.draw(0);
}

// ---------------------------------------------------------------- shot types
const tt = k => (k === undefined ? undefined : STORY_T(k));
function photoOf(g, s, sizes, o = {}) {
  const sz = sizes[s.src] || [2112, 1408];
  const mv = { in: [[1.0, 0.5, 0.5], [1.12, 0.5, 0.45]], out: [[1.14, 0.5, 0.45], [1.0, 0.5, 0.5]], left: [[1.1, 0.62, 0.5], [1.1, 0.38, 0.5]],
    right: [[1.1, 0.38, 0.5], [1.1, 0.62, 0.5]], up: [[1.1, 0.5, 0.62], [1.1, 0.5, 0.38]] }[s.move || 'in'];
  const f = s.focus ? [[mv[0][0], ...s.focus], [mv[1][0], s.focus[0], s.focus[1] - 0.04]] : mv;
  return Photo(g, 'assets/' + s.src + '.jpg', { iw: sz[0], ih: sz[1], from: f[0], to: f[1], dark: s.dark ?? 0.22, ...o });
}
function overlays(g, s) {
  const parts = [];
  if (s.head) { const h = Headline(g, s.head, { x: 110, y: s.headY || 300, size: s.headSize || 100, anchor: 'start', hi: s.hi ?? -1 }); parts.push(t => h.draw(t, s.t0 + 0.3, s.t1)); }
  if (s.lt) { const l = LowerThird(g, { kicker: s.lt[0], title: s.lt[1] }); parts.push(t => l.draw(t, tt(s.ltAt) ?? s.t0 + 0.3, s.t1)); }
  if (s.cap) { const c = Headline(g, [s.cap], { x: 960, y: 900, size: 76, anchor: 'middle', hi: 0, rule: false }); parts.push(t => c.draw(t, tt(s.capAt) ?? s.t0 + 0.3, s.t1)); }
  return t => parts.forEach(f => f(t));
}
SHOT.photo = (g, s, sizes) => {
  const ph = photoOf(g, s, sizes);
  let co = null;
  if (s.callout) co = Callout(g, { r: s.callout.r || 100, lx: s.callout.lx, ly: s.callout.ly, text: s.callout.text });
  const ov = overlays(g, s);
  return t => { ph.draw(t, s.t0, s.t1); if (co) co.draw(t, tt(s.callout.at) ?? s.t0 + 0.6, s.t1, ph.map(s.callout.px, s.callout.py)); ov(t); };
};
SHOT.clip = (g, s) => {
  const c = Clip(g, 'clips/' + s.src, { n: s.n || 180, dark: s.dark ?? 0.22 });
  const ov = overlays(g, s);
  return t => { c.draw(t, s.t0); ov(t); };
};
SHOT.number = (g, s, sizes) => {
  const ph = s.src ? photoOf(g, { ...s, dark: s.dark ?? 0.66 }, sizes, { fade: false }) : null;
  const n = BigNumber(g, { to: s.value, from: s.from || 0, dec: s.dec || 0, prefix: s.prefix || '', suffix: s.suffix || '', label: s.label || '', x: 960, y: 450, size: s.size || 230 });
  const ov = overlays(g, s);
  return t => { if (ph) ph.draw(t, s.t0, s.t1); n.draw(t, s.t0 + 0.15); ov(t); };
};
SHOT.chapter = (g, s, sizes) => {
  const ph = photoOf(g, { ...s, dark: s.dark ?? 0.62 }, sizes);
  const c = Chapter(g, { n: s.n, title: s.title, sub: s.sub || '' });
  return t => { ph.draw(t, s.t0, s.t1); c.draw(t, s.t0 + 0.25, s.t1 + 0.3); };
};
SHOT.study = (g, s, sizes) => {
  const ph = s.src ? photoOf(g, { ...s, dark: s.dark ?? 0.3 }, sizes, { x: 0, w: 1000, fade: false }) : null;
  const c = StudyCard(g, { pub: s.pub, title: s.title, lines: s.lines, hi: s.hi || 0 });
  return t => { if (ph) ph.draw(t, s.t0, s.t1); c.draw(t, s.t0 + 0.2, tt(s.hiAt) ?? s.t0 + 1.5, s.t1); };
};
SHOT.split = (g, s, sizes) => {
  const sz = n => sizes[n] || [2112, 1408];
  const sp = Split(g, { href: 'assets/' + s.left.src + '.jpg', iw: sz(s.left.src)[0], ih: sz(s.left.src)[1], label: s.left.label, good: s.left.good },
    { href: 'assets/' + s.right.src + '.jpg', iw: sz(s.right.src)[0], ih: sz(s.right.src)[1], label: s.right.label, good: s.right.good });
  return t => sp.draw(t, s.t0, s.t1, s.t0 + 0.2, tt(s.at2) ?? s.t0 + 1.2);
};
SHOT.quote = (g, s) => { const q = Quote(g, { lines: s.lines, who: s.who }); return t => q.draw(t, s.t0 + 0.2, s.t1); };
SHOT.checklist = (g, s) => {
  const c = Checklist(g, { title: s.title, items: s.items, y: s.y || 220 });
  return t => c.draw(t, s.items.map((_, i) => tt(s.ats?.[i]) ?? s.t0 + 0.3 + i * 0.5));
};
SHOT.bars = (g, s) => {
  const head = s.title ? NT(g, s.title.toUpperCase(), { x: 160, y: 180, size: 54, color: N.gold, ls: 2 }) : null;
  const b = Bars(g, { rows: s.rows, unit: s.unit || '', dec: s.dec || 0, max: s.max });
  return t => { if (head) show(head, t, s.t0); b.draw(t, s.rows.map((_, i) => tt(s.ats?.[i]) ?? s.t0 + 0.3 + i * 0.6)); };
};
SHOT.warning = (g, s, sizes) => {
  const ph = s.src ? photoOf(g, { ...s, dark: s.dark ?? 0.7 }, sizes, { fade: false }) : null;
  const c = Checklist(g, { title: s.title, items: s.items, y: s.y || 260 });
  c.g.querySelectorAll('rect')[1].setAttribute('fill', N.red);
  return t => { if (ph) ph.draw(t, s.t0, s.t1); c.draw(t, s.items.map((_, i) => tt(s.ats?.[i]) ?? s.t0 + 0.3 + i * 0.5)); };
};
SHOT.end = (g, s) => { const e = EndCard(g, { name: s.name || 'SALUD 60+' }); return t => e.draw(t, s.t0 + 0.2); };
SHOT.custom = (g, s) => s.build(g, s);   // escape hatch: build(g, s) returns draw(t)
