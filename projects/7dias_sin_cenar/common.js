// Shared pieces for the "7 días sin cenar" sections. Needs lib.js, kit.js and cues.js.
// Every section file runs on the global voice timeline (t = seconds into voice.mp3).
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const SZ = { stomach: [282, 251], intestines: [287, 291], liver: [317, 212], brain: [318, 267], heart: [194, 270], pancreas: [333, 193], calf: [111, 372], body: [242, 453],
  eggs: [445, 335], fish: [667, 354], lentils: [517, 397], dairy: [716, 461], veg: [821, 447] };
const STILL = [829, 460];   // scene panels (s_*.png) are all ≈ 829×460
const img = n => ['cut/' + n + '.png', ...SZ[n]];
const cut = (p, n, cx, cy, fit) => Cutout(p, 'cut/' + n + '.png', { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit });

function Stage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: C.cream }, svg);
  return svg;
}
// A scene is a group shown between two times with a draw(t) for its contents.
const scenes = [];
function scene(svg, a, b, build) {
  const g = el('g', {}, svg);
  const draw = build(g) || (() => {});
  scenes.push({ g, a, b, draw });
}
function drawScenes(t) {
  for (const s of scenes) if (sceneVis(s.g, t, s.a(), s.b()) > 0) s.draw(t);
}

// Dark section title card: "PUNTO n" + title + subtitle + drawings.
function SectionCard(g, n, title, sub, organs) {
  el('rect', { width: 1920, height: 1080, fill: C.ink }, g);
  const a = Text(g, 'PUNTO ' + n, { x: 960, y: 400, size: 70, color: C.amber });
  const b = Text(g, title, { x: 960, y: 540, size: title.length > 18 ? 100 : 120, color: C.cream });
  const c = Text(g, sub, { x: 960, y: 670, size: 54, weight: 700, color: C.blueFar });
  const im = el('g', {}, g);
  organs.forEach((n, i) => cut(im, n, 960 + (i - (organs.length - 1) / 2) * 420, 860, 220));
  return t0 => t => { show(a, t, t0); show(b, t, t0 + 0.2); show(c, t, t0 + 0.6); show(im, t, t0 + 0.8); };
}

// Small organ strip at the top-right showing where we are in the video (6 parts).
const ORDER6 = [['stomach', 'ESTÓMAGO'], ['liver', 'HÍGADO'], ['brain', 'CEREBRO'], ['heart', 'CORAZÓN'], ['calf', 'MÚSCULOS'], ['pancreas', 'PÁNCREAS']];
function Progress(g, idx) {
  const p = el('g', {}, g);
  ORDER6.forEach(([n], i) => {
    const x = 1270 + i * 100, on = i === idx;
    el('circle', { cx: x, cy: 70, r: 42, fill: on ? C.white : C.cream, stroke: on ? C.orange : C.ink, 'stroke-width': on ? 8 : 4, opacity: on ? 1 : 0.45 }, p);
    const c = cut(p, n, x, 70, 58);
    if (!on) c.setAttribute('opacity', 0.45);
  });
  return p;
}

// Big question card.
function Question(g, lines, { y = 400 } = {}) {
  const q = el('g', {}, g);
  Card(q, { x: 260, y: y - 140, w: 1400, h: 120 + lines.length * 100, fill: C.white });
  lines.forEach((s, i) => Text(q, s, { x: 960, y: y - 20 + i * 100, size: 70, color: i === lines.length - 1 ? C.orange : C.ink }));
  return q;
}

// Two columns: green (possible benefit) vs red (risk). items: [[text, cueKey], ...]
function TwoCols(g, left, right, { lt = 'ALGUNAS PERSONAS', rt = 'OTRAS PERSONAS' } = {}) {
  const parts = [];
  [[left, lt, C.green, 140, 'check'], [right, rt, C.red, 1000, 'cross']].forEach(([items, head, col, x, ic]) => {
    const h = el('g', {}, g);
    el('rect', { x, y: 170, width: 780, height: 90, rx: 20, fill: col }, h);
    Text(h, head, { x: x + 390, y: 217, size: 50, color: C.white });
    parts.push([h, items[0][1]]);
    items.forEach(([s, k], i) => {
      const r = el('g', {}, g);
      Card(r, { x, y: 300 + i * 160, w: 780, h: 125, fill: C.white });
      Icon[ic](r, x + 25, 300 + i * 160 + 18, 0.9);
      Text(r, s, { x: x + 135, y: 300 + i * 160 + 64, size: s.length > 20 ? 40 : 48, anchor: 'start' });
      parts.push([r, k]);
    });
  });
  return t => parts.forEach(([e, k]) => show(e, t, at(k)));
}

// Crossed-out list ("no garantiza…").
function CrossList(g, items, { x = 260, y = 330, w = 1400, head = '' } = {}) {
  const parts = [];
  if (head) parts.push([Text(g, head, { x: 960, y: 190, size: 66 }), items[0][1]]);
  items.forEach(([s, k], i) => {
    const r = el('g', {}, g), yy = y + i * 200;
    Card(r, { x, y: yy, w, h: 150, fill: C.white });
    Icon.cross(r, x + 30, yy + 25, 1);
    const tx = Text(r, s, { x: x + 170, y: yy + 77, size: 52, anchor: 'start' });
    const strike = el('line', { x1: x + 165, y1: yy + 77, x2: x + 165, y2: yy + 77, stroke: C.red, 'stroke-width': 10, 'stroke-linecap': 'round' }, r);
    parts.push([r, k, strike, tx]);
  });
  return t => parts.forEach(([e, k, strike, tx]) => {
    show(e, t, at(k));
    if (strike) set(strike, { x2: lerp(x + 165, x + 175 + tx.getComputedTextLength(), E.inOut(prog(t, at(k) + 0.5, at(k) + 0.9))) });
  });
}

// Bottom call-to-action bar (subscribe / share / comment).
function CTA(g, kind) {
  const c = el('g', {}, g);
  const label = { sub: 'SUSCRÍBETE', share: 'COMPARTE ESTE VÍDEO', comment: 'COMENTA' }[kind];
  const w = 120 + label.length * 38 + (kind === 'sub' ? 0 : 110);
  const x = 960 - w / 2;
  Card(c, { x, y: 860, w, h: 130, fill: kind === 'sub' ? C.red : C.white, r: 65 });
  const ic = kind === 'sub' ? null : Icon.bubble(c, x + 30, 875, 1);
  Text(c, label, { x: 960 + (ic ? 55 : 0), y: 927, size: 54, color: kind === 'sub' ? C.white : C.ink });
  return c;
}

// Horizontal timeline with labelled points; pts: [[x, top, bottom, color]]
function TimeBar(g, x1, x2, y, pts) {
  el('line', { x1, y1: y, x2, y2: y, stroke: C.ink, 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
  const fill = el('line', { x1, y1: y, x2: x1, y2: y, stroke: C.orange, 'stroke-width': 18, 'stroke-linecap': 'round' }, g);
  for (const [x, top, bot, col] of pts) {
    el('circle', { cx: x, cy: y, r: 22, fill: col || C.cream, stroke: C.ink, 'stroke-width': 7 }, g);
    if (top) Text(g, top, { x, y: y - 70, size: 54 });
    if (bot) Text(g, bot, { x, y: y + 70, size: 40, weight: 800, color: C.blueDark });
  }
  return u => set(fill, { x2: lerp(x1, x2, clamp(u)) });
}

// Warning card (red header + lines).
function Warn(g, head, lines, { y = 250 } = {}) {
  const w = el('g', {}, g);
  Card(w, { x: 310, y, w: 1300, h: 170 + lines.length * 95, fill: C.white });
  el('rect', { x: 310, y, width: 1300, height: 110, rx: 22, fill: C.red }, w);
  Text(w, head, { x: 960, y: y + 57, size: 58, color: C.white });
  lines.forEach((s, i) => Text(w, s, { x: 960, y: y + 175 + i * 95, size: 54 }));
  return w;
}

// Vertical battery (energy store). draw(level 0..1) — green → amber → red as it drains.
function Battery(g, { x, y, w = 180, h = 340, label = '' }) {
  const b = el('g', {}, g);
  el('rect', { x: x + w * 0.3, y: y - 26, width: w * 0.4, height: 30, rx: 8, fill: C.ink }, b);
  el('rect', { x: x + 8, y: y + 10, width: w, height: h, rx: 26, fill: C.ink }, b);
  el('rect', { x, y, width: w, height: h, rx: 26, fill: C.white, stroke: C.ink, 'stroke-width': 8 }, b);
  const lvl = el('rect', { x: x + 16, width: w - 32, rx: 14 }, b);
  const pct = Text(b, '', { x: x + w / 2, y: y + h / 2, size: 46 });
  if (label) Text(b, label, { x: x + w / 2, y: y + h + 60, size: 40 });
  return {
    g: b,
    draw(v) {
      v = clamp(v);
      const hh = (h - 32) * v;
      set(lvl, { y: y + h - 16 - hh, height: Math.max(0, hh), fill: v > 0.5 ? C.green : v > 0.25 ? C.amber : C.red });
      pct.textContent = Math.round(v * 100) + '%';
    },
  };
}
Icon.drop = (p, x, y, s = 1, color = C.amber) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M50 6 C66 32 82 50 82 66 A32 32 0 0 1 18 66 C18 50 34 32 50 6 Z', fill: color, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('ellipse', { cx: 38, cy: 64, rx: 7, ry: 12, fill: C.white, opacity: 0.6 }, g);
  return g;
};
Icon.moon = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M62 8 A44 44 0 1 0 92 70 A36 36 0 1 1 62 8 Z', fill: C.amber, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  return g;
};
Icon.gear = (p, x, y, s = 1, color = C.orange) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  let d = '';
  for (let i = 0; i < 16; i++) {
    const a = i * Math.PI / 8, r = i % 2 ? 36 : 46;
    d += (i ? 'L' : 'M') + (50 + r * Math.cos(a)).toFixed(1) + ' ' + (50 + r * Math.sin(a)).toFixed(1);
  }
  el('path', { d: d + 'Z', fill: color, stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
  el('circle', { cx: 50, cy: 50, r: 14, fill: C.cream, stroke: C.ink, 'stroke-width': 6 }, g);
  return g;
};
// Pill-shaped label.
function Chip(g, s, { cx, cy, fill = C.white, color = C.ink, size = 44 }) {
  const c = el('g', {}, g);
  const w = s.length * size * 0.66 + 70;
  Card(c, { x: cx - w / 2, y: cy - size, w, h: size * 2, fill, r: size });
  Text(c, s, { x: cx, y: cy + 2, size, color });
  return c;
}
// Arrow from (x1,y1) to (x2,y2); returns path; grow with drawArrow(p, u).
function Arrow(g, x1, y1, x2, y2, color = C.orange, w = 14) {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 34;
  const p = el('path', { d: `M${x1} ${y1} L${x2} ${y2} M${x2 - hl * Math.cos(a - 0.5)} ${y2 - hl * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - hl * Math.cos(a + 0.5)} ${y2 - hl * Math.sin(a + 0.5)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  return p;
}
