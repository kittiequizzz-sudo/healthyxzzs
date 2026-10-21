// Shared pieces for "7 alimentos para cuidar tu corazón" (3 videos), adapted from levantarse_silla. Needs lib.js, kit.js, sizes.js and the video's cues_vN.js.
// Every section file runs on its video's voice timeline (t = seconds into audio/voice_vN.mp3).
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const src = n => 'cut/' + n + '.png';

function Stage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: C.cream }, svg);
  return svg;
}
// A scene is a group shown between two cue times; hard = hard cut (hook), else a short cross-fade.
const scenes = [];
function scene(svg, a, b, build, { hard = false, fade = 0.25 } = {}) {
  const g = el('g', {}, svg);
  const inner = el('g', {}, g);
  const draw = build(inner) || (() => {});
  scenes.push({ g, inner, a, b, draw, hard, fade });
}
function drawScenes(t) {
  for (const s of scenes) {
    const a = s.a(), b = s.b();
    const v = s.hard ? cutVis(s.g, t, a, b) : sceneVis(s.g, t, a, b, s.fade);
    if (v > 0) s.draw(t, a, b);
  }
}

// Drawn panel as a framed still with push-in. Layouts: 'full' (big, centred), 'left', 'right'.
const BOX = {
  full: { x: 210, y: 60, w: 1500, h: 900 },
  left: { x: 70, y: 150, w: 1110, h: 700 },
  right: { x: 740, y: 150, w: 1110, h: 700 },
  wide: { x: 60, y: 60, w: 1800, h: 960 },
  tall: { x: 410, y: 60, w: 1100, h: 896 },   // for the taller bottom-row panels (a_salon, a_victoria)
};
function panel(g, n, layout = 'full', o = {}) {
  const b = typeof layout === 'string' ? BOX[layout] : layout;
  return Still(g, src(n), { ...b, iw: SZ[n][0], ih: SZ[n][1], ...o });
}
// Cut-out centred at (cx, cy) fitted in a box of size fit; returns the group (use float/pop on it).
const cut = (g, n, cx, cy, fit) => Cutout(g, src(n), { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit });

// Pose sequence: the poses of one sheet stacked in place; draw(t, i) shows pose i (float allowed).
function Poses(g, name, n, { cx = 960, floor = 900, h = 760 } = {}) {
  const [iw, ih] = SZ[name + '_0'];
  const s = h / ih, w = iw * s;
  const ims = [];
  for (let i = 0; i < n; i++) ims.push(el('image', { href: src(name + '_' + i), x: cx - w / 2, y: floor - h, width: w, height: h, opacity: 0 }, g));
  return {
    w, h, x: cx - w / 2, y: floor - h,
    draw(pose) {   // pose may be fractional: a quick cross-fade only over the last 12 % (no ghosting)
      const i = Math.floor(pose), f = pose - i, k = clamp((f - 0.88) / 0.12);
      ims.forEach((im, j) => im.setAttribute('opacity', j === i % n ? 1 - k : j === (i + 1) % n ? k : 0));
    },
  };
}
// Sit-to-stand reps: pose index as a function of time (up 0→3, hold, down 3→0, rest). period in s.
function repPose(t, t0, { up = 1.6, hold = 0.5, down = 2.0, rest = 0.5 } = {}) {
  const per = up + hold + down + rest, x = Math.max(0, t - t0) % per;
  if (x < up) return 3 * x / up;
  if (x < up + hold) return 3;
  if (x < up + hold + down) return 3 - 3 * (x - up - hold) / down;
  return 0;
}
const repCount = (t, t0, o = {}) => {
  const { up = 1.6, hold = 0.5, down = 2.0, rest = 0.5 } = o;
  const per = up + hold + down + rest;
  return t < t0 + up ? 0 : Math.floor((t - t0 - up) / per) + 1;
};

// Kicker for a section start: small amber tag + title, over the section's first picture.
function Kicker(g, tag, title, { y = 860 } = {}) {
  const k = el('g', {}, g);
  const w = Math.max(tag.length * 30 + 80, title.length * 44 + 100);
  Card(k, { x: 960 - w / 2, y: y - 70, w, h: 180, fill: C.ink, r: 30 });
  Text(k, tag, { x: 960, y: y - 15, size: 40, color: C.amber });
  Text(k, title, { x: 960, y: y + 55, size: 64, color: C.cream });
  return k;
}
// Pill chip.
function Chip(g, s, { cx, cy, fill = C.white, color = C.ink, size = 44 }) {
  const c = el('g', {}, g);
  const w = s.length * size * 0.64 + 70;
  Card(c, { x: cx - w / 2, y: cy - size, w, h: size * 2, fill, r: size });
  Text(c, s, { x: cx, y: cy + 2, size, color });
  return c;
}
// Chip with a check or cross badge on the left.
function Mark(g, s, ok, { cx, cy, size = 44 }) {
  const c = el('g', {}, g);
  const w = s.length * size * 0.64 + 160;
  Card(c, { x: cx - w / 2, y: cy - size, w, h: size * 2, fill: C.white, r: size });
  (ok ? Icon.check : Icon.cross)(c, cx - w / 2 + 14, cy - size + 8, (size * 2 - 16) / 100);
  Text(c, s, { x: cx + 45, y: cy + 2, size });
  return c;
}
function Source(g, s) { return Text(g, s, { x: 960, y: 1050, size: 26, weight: 700, color: '#7A7468' }); }

// Arrow from (x1,y1) to (x2,y2).
function Arrow(g, x1, y1, x2, y2, color = C.orange, w = 14) {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 34;
  return el('path', { d: `M${x1} ${y1} L${x2} ${y2} M${x2 - hl * Math.cos(a - 0.5)} ${y2 - hl * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - hl * Math.cos(a + 0.5)} ${y2 - hl * Math.sin(a + 0.5)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
}
// Icons carry their own transform, so wrap them before pop()/show().
const wrap = (g, f, ...a) => { const w = el('g', {}, g); f(w, ...a); return w; };
// Pulsing callout ring.
function Ring(g, cx, cy, r, color = C.red) {
  const c = el('circle', { cx, cy, r, fill: 'none', stroke: color, 'stroke-width': 9 }, g);
  return { g: c, draw(t, t0) { const k = clamp((t - t0) / 0.3); set(c, { r: r * (0.6 + 0.4 * E.out(k)) + 6 * Math.sin(t * 5), opacity: k }); } };
}

// Stopwatch (code-drawn): draw(sec) fills the ring for 0..30 s and shows the number.
function Stopwatch(g, { cx, cy, r = 170, total = 30 }) {
  const s = el('g', {}, g);
  el('rect', { x: cx - 30, y: cy - r - 62, width: 60, height: 40, rx: 10, fill: C.ink }, s);
  el('circle', { cx: cx + 8, cy: cy + 10, r: r + 10, fill: C.ink }, s);
  el('circle', { cx, cy, r, fill: C.white, stroke: C.ink, 'stroke-width': 10 }, s);
  const arc = el('path', { fill: 'none', stroke: C.orange, 'stroke-width': 26, 'stroke-linecap': 'round' }, s);
  const num = Text(s, '0', { x: cx, y: cy + 4, size: r * 0.62 });
  Text(s, 'seg', { x: cx, y: cy + r * 0.5, size: r * 0.18, weight: 800, color: C.grey });
  return {
    g: s,
    draw(sec) {
      const u = clamp(sec / total), a = u * 2 * Math.PI - 1e-4, rr = r - 30;
      const x = cx + rr * Math.sin(a), y = cy - rr * Math.cos(a);
      set(arc, { d: u <= 0 ? '' : `M${cx} ${cy - rr} A${rr} ${rr} 0 ${u > 0.5 ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)}` });
      num.textContent = String(Math.min(total, Math.floor(sec)));
    },
  };
}
// Semicircle gauge with a needle: draw(v 0..1). Zones green→amber→red, labels under.
function Gauge(g, { cx, cy, r = 220, label = '' }) {
  const s = el('g', {}, g);
  const arc = (a0, a1, col) => {
    const p = a => [cx - r * Math.cos(a), cy - r * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    el('path', { d: `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`, fill: 'none', stroke: col, 'stroke-width': 46 }, s);
  };
  arc(0, Math.PI / 3, C.green); arc(Math.PI / 3, 2 * Math.PI / 3, C.amber); arc(2 * Math.PI / 3, Math.PI, C.red);
  el('path', { d: `M${cx - r - 23} ${cy} A${r + 23} ${r + 23} 0 0 1 ${cx + r + 23} ${cy}`, fill: 'none', stroke: C.ink, 'stroke-width': 6 }, s);
  const nd = el('line', { x1: cx, y1: cy, stroke: C.ink, 'stroke-width': 14, 'stroke-linecap': 'round' }, s);
  el('circle', { cx, cy, r: 22, fill: C.ink }, s);
  if (label) Text(s, label, { x: cx, y: cy + 70, size: 44 });
  return { g: s, draw(v) { const a = clamp(v) * Math.PI; set(nd, { x2: cx - (r - 40) * Math.cos(a), y2: cy - (r - 40) * Math.sin(a) }); } };
}
// Big number that counts up: draw(u) → value*u formatted with a thin-space thousands dot.
function CountUp(g, { x, y, size = 200, color = C.ink, suffix = '' }) {
  const n = Text(g, '0', { x, y, size, color });
  return { g: n, draw(v) { n.textContent = Math.round(v).toLocaleString('es-ES') + suffix; } };
}
// Bottom call-to-action pill (subscribe / comment).
function CTA(g, kind, label) {
  const c = el('g', {}, g);
  label = label || { sub: 'SUSCRÍBETE', comment: 'COMENTA' }[kind];
  const w = 160 + label.length * 38;
  const x = 960 - w / 2;
  Card(c, { x, y: 870, w, h: 130, fill: kind === 'sub' ? C.red : C.white, r: 65 });
  if (kind === 'comment') Icon.bubble(c, x + 30, 885, 1);
  else Icon.bell(c, x + 30, 885, 1);
  Text(c, label, { x: 960 + 55, y: 937, size: 54, color: kind === 'sub' ? C.white : C.ink });
  return c;
}
Icon.bell = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M50 10 C30 10 22 28 22 46 L22 64 L12 76 L88 76 L78 64 L78 46 C78 28 70 10 50 10 Z', fill: C.amber, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('circle', { cx: 50, cy: 86, r: 9, fill: C.amber, stroke: C.ink, 'stroke-width': 6 }, g);
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
// Warning card (red header + short lines), held for reading.
function Warn(g, head, lines, { y = 230, w = 1300 } = {}) {
  const c = el('g', {}, g), x = 960 - w / 2;
  Card(c, { x, y, w, h: 170 + lines.length * 92, fill: C.white });
  el('rect', { x, y, width: w, height: 110, rx: 22, fill: C.red }, c);
  Text(c, head, { x: 960, y: y + 57, size: 56, color: C.white });
  lines.forEach((s, i) => Text(c, s, { x: 960, y: y + 172 + i * 92, size: 50 }));
  return c;
}
// Tile with a drawn panel inside (for a row of 2–3 pictures), label under it.
function PanelTile(g, n, { x, y, w = 540, h = 360, label = '' }) {
  const c = el('g', {}, g);
  const st = Still(c, src(n), { x, y, w, h, iw: SZ[n][0], ih: SZ[n][1], zoom: 0.05 });
  if (label) Chip(c, label, { cx: x + w / 2, cy: y + h + 10, size: 36, fill: C.ink, color: C.white });
  return { g: c, st };
}
// Series tag shown in a corner ("PARTE 1 DE 3").
function SeriesTag(g, s) {
  const c = el('g', {}, g);
  Card(c, { x: 1560, y: 40, w: 320, h: 70, fill: C.ink, r: 35 });
  Text(c, s, { x: 1720, y: 77, size: 32, color: C.amber });
  return c;
}

// The 7 foods as a strip at the top right; idx = current food (ringed orange), -1 = none lit.
const FOODS = [['aove', 'AOVE'], ['nueces', 'NUECES'], ['sardinas', 'PESCADO AZUL'], ['lentejas', 'LEGUMBRES'], ['tomates', 'TOMATE'], ['ajo', 'AJO Y CEBOLLA'], ['espinacas', 'HOJA VERDE']];
function FoodStrip(g, idx) {
  const p = el('g', {}, g);
  FOODS.forEach(([n], i) => {
    const x = 1210 + i * 98, on = i === idx;
    el('circle', { cx: x, cy: 62, r: 42, fill: on ? C.white : C.cream, stroke: on ? C.orange : C.ink, 'stroke-width': on ? 8 : 4, opacity: on ? 1 : 0.55 }, p);
    const c = cut(p, n, x, 62, 58);
    if (!on) c.setAttribute('opacity', 0.5);
  });
  return p;
}
// Big good/bad comparison: two cut-outs with ✓/✗ and labels.
function VsPair(g, [a, la], [b, lb], { y = 520, fit = 360 } = {}) {
  const A = el('g', {}, g), B = el('g', {}, g);
  cut(A, a, 560, y, fit); Mark(A, la, true, { cx: 560, cy: y + fit / 2 + 70, size: 42 });
  cut(B, b, 1360, y, fit); Mark(B, lb, false, { cx: 1360, cy: y + fit / 2 + 70, size: 42 });
  return [A, B];
}
// Chain of labelled steps with arrows: items [[label, color]]; returns groups for show().
function Chain(g, items, { y = 540, x0 = 260, x1 = 1660, size = 40 } = {}) {
  const n = items.length, step = (x1 - x0) / (n - 1);
  return items.map(([s, col], i) => {
    const c = el('g', {}, g), cx = x0 + i * step;
    Chip(c, s, { cx, cy: y, size, fill: col || C.white, color: col && col !== C.white && col !== C.amber ? C.white : C.ink });
    if (i < n - 1) Arrow(c, cx + 110, y + 80, cx + step - 110, y + 80, C.orange, 10);
    return c;
  });
}
