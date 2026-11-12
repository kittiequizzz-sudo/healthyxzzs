// Shared pieces for "Asma en invierno: 6 consejos" (Castilla, frosty mornings) — MUTED theme (owner, 5 Nov: no yellow, not too bright) — warm pastel adult-cartoon style.
// Needs lib.js, kit.js, sizes.js and cues.js. Every section runs on the global voice timeline.
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };

// ---------------------------------------------------------------- pastel theme
Object.assign(C, { cream: '#E4E6E9', ink: '#33363D', white: '#F4F5F6', orange: '#D8875F', amber: '#D9A84E',
  red: '#C9574A', green: '#4F8F68', blue: '#6E9FC4', blueDark: '#3D6E96', grey: '#9097A2', violet: '#7D6AAE' });
const SHADOW = '#BFC4CC';
// one tint (background) + accent per section
const TINTS = {
  intro: ['#DCE2E8', '#4E6F8F'], p1: ['#DDE5DE', '#4F8668'], p2: ['#E8E2D8', '#A07A4E'], p3: ['#EBDDD6', '#B5694E'],
  p4: ['#E2DEEA', '#7462A0'], p5: ['#D8E4E4', '#3E8080'], p6: ['#EADADD', '#B05C6E'], end: ['#E2E4E8', '#C9574A'],
};
let BG = TINTS.intro[0], ACC = TINTS.intro[1];
Card = function (svg, { x, y, w, h, fill = C.white, r = 36, stroke = C.ink }) {
  const g = el('g', {}, svg);
  el('rect', { x: x + 6, y: y + 10, width: w, height: h, rx: r, fill: SHADOW, opacity: 0.85 }, g);
  el('rect', { x, y, width: w, height: h, rx: r, fill, stroke, 'stroke-width': 4 }, g);
  return g;
};

// ---------------------------------------------------------------- sound effects (collected, mixed after render)
const SFX = [];
const sfx = (kind, t, vol = 1) => { if (isFinite(t)) SFX.push([+t.toFixed(3), kind, vol]); };
window.SFX = SFX;

// ---------------------------------------------------------------- frames and drawings
const FULL = { x: 40, y: 40, w: 1840, h: 1000, r: 34 };
const LEFT = { x: 50, y: 120, w: 1220, h: 740, r: 32 };
const still = (g, n, o) => Still(g, 'cut/' + n + '.png', { iw: SZ[n][0], ih: SZ[n][1], ...FULL, ...o });
const cut = (p, n, cx, cy, fit) => Cutout(p, 'cut/' + n + '.png', { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit });
// soft frame override: brown outline, warm shadow
Still = (function (orig) {
  return function (svg, href, o) {
    const s = orig(svg, href, o);
    const rects = s.g.querySelectorAll(':scope > rect');
    if (rects[0]) set(rects[0], { fill: SHADOW, x: o.x + 8, y: o.y + 12 });
    if (rects[1]) set(rects[1], { stroke: C.ink, 'stroke-width': 5 });
    return s;
  };
})(Still);

function Stage(tint) {
  [BG, ACC] = TINTS[tint];
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: BG }, svg);
  // soft pastel blobs, slowly drifting
  const b = el('g', { opacity: 0.55 }, svg);
  const blobs = [[230, 220, 150], [1700, 880, 190], [1650, 160, 90], [300, 900, 110]].map(([x, y, r], i) =>
    [el('circle', { cx: x, cy: y, r, fill: i % 2 ? '#FFFFFF' : ACC, opacity: i % 2 ? 0.5 : 0.18 }, b), x, y, i]);
  window._blobs = t => blobs.forEach(([c, x, y, i]) => set(c, { cx: x + 18 * Math.sin(t / 5 + i), cy: y + 14 * Math.cos(t / 6 + i) }));
  return svg;
}
const scenes = [];
// scene(svg, a, b, build, hard): hard = hard cut (hook), else 0.25 s cross-fade. A soft whoosh plays on each start.
function scene(svg, a, b, build, hard = false, swish = true) {
  const g = el('g', {}, svg);
  const draw = build(g) || (() => {});
  scenes.push({ g, a, b, draw, hard });
  if (swish) sfx(hard ? 'cut' : 'swish', a(), 0.6);
}
function drawScenes(t) {
  if (window._blobs) window._blobs(t);
  for (const s of scenes) {
    const v = s.hard ? cutVis(s.g, t, s.a(), s.b()) : sceneVis(s.g, t, s.a(), s.b(), 0.25);
    if (v > 0) s.draw(t);
  }
}
function stillScene(svg, n, a, b, o = {}, extra = null, hard = false) {
  scene(svg, a, b, g => {
    const st = still(g, n, o);
    const more = extra ? extra(g) : null;
    return t => { st.draw(t, a(), b()); if (more) more(t); };
  }, hard);
}

// ---------------------------------------------------------------- text pieces
const CAP = (g, s, o = {}) => Caption(g, s, { cy: 975, size: 60, fill: C.ink, color: C.white, hiColor: '#9FD3E6', ...o });
function Chip(g, s, { cx, cy, fill = C.white, color = C.ink, size = 44 }) {
  const c = el('g', {}, g);
  const w = s.length * size * 0.64 + 70;
  Card(c, { x: cx - w / 2, y: cy - size, w, h: size * 2, fill, r: size });
  Text(c, s, { x: cx, y: cy + 2, size, color });
  return c;
}
function Source(g, s, y = 1052) {
  const c = el('g', {}, g);
  const w = s.length * 14.5 + 40;
  el('rect', { x: 960 - w / 2, y: y - 20, width: w, height: 38, rx: 19, fill: C.ink, opacity: 0.55 }, c);
  Text(c, s, { x: 960, y, size: 23, weight: 700, color: C.white });
  return c;
}
const Drama = g => Source(g, 'Dramatización');
// "SEÑAL n · TÍTULO" pill, top left
function Kicker(g, n, title) {
  const k = el('g', {}, g);
  const s = title, w = s.length * 33 + 90;
  Card(k, { x: 70, y: 60, w, h: 100, fill: ACC, r: 50 });
  Text(k, s, { x: 70 + w / 2, y: 112, size: 54, color: C.white });
  return k;
}
// big warning card. kind: 'amber' (consulta) or 'red' (urgente)
function Warn(g, head, lines, { kind = 'amber', y = 230, w = 1360 } = {}) {
  const c = el('g', {}, g), x = 960 - w / 2, col = kind === 'red' ? C.red : C.amber;
  Card(c, { x, y, w, h: 150 + lines.length * 92, fill: C.white });
  el('rect', { x, y, width: w, height: 110, rx: 36, fill: col }, c);
  el('rect', { x, y: y + 60, width: w, height: 50, fill: col }, c);
  Text(c, head, { x: 960, y: y + 57, size: 54, color: kind === 'red' ? C.white : C.ink });
  lines.forEach((s, i) => Text(c, s, { x: 960, y: y + 165 + i * 92, size: 50 }));
  return c;
}
function Bubble(g, s, { cx, cy, size = 50, fill = C.white }) {
  const c = el('g', {}, g);
  const w = s.length * size * 0.6 + 80, h = size * 2.2;
  el('path', { d: `M${cx - 40} ${cy + h / 2 - 4} L${cx - 70} ${cy + h / 2 + 50} L${cx + 10} ${cy + h / 2 - 4} Z`, fill, stroke: C.ink, 'stroke-width': 4, 'stroke-linejoin': 'round' }, c);
  Card(c, { x: cx - w / 2, y: cy - h / 2, w, h, fill, r: h / 2 });
  el('rect', { x: cx - 52, y: cy + h / 2 - 8, width: 60, height: 10, fill }, c);
  Text(c, s, { x: cx, y: cy + 2, size, weight: 800, family: 'Inter' });
  return c;
}

// ---------------------------------------------------------------- icons (100x100 box at x,y scaled by s)
const ink = { stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };
const IC = {
  hand(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M30 92 L26 50 Q24 40 32 40 Q38 40 38 50 L38 20 Q38 12 45 12 Q52 12 52 20 L52 14 Q52 6 59 6 Q66 6 66 14 L66 22 Q66 14 73 14 Q80 14 80 22 L80 64 Q80 92 56 92 Z', fill: '#F6C9A6', ...ink }, g); return g; },
  chair(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M24 8 H44 V54 H80 V68 H24 Z', fill: '#C98A55', ...ink }, g);
    el('path', { d: 'M28 68 V94 M76 68 V94', ...ink, 'stroke-width': 8 }, g); return g; },
  feet(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('ellipse', { cx: 34, cy: 62, rx: 14, ry: 24, fill: '#F6C9A6', ...ink }, g);
    el('ellipse', { cx: 66, cy: 38, rx: 14, ry: 24, fill: '#F6C9A6', ...ink }, g); return g; },
  scale(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('rect', { x: 10, y: 14, width: 80, height: 78, rx: 16, fill: C.white, ...ink }, g);
    el('rect', { x: 30, y: 26, width: 40, height: 18, rx: 4, fill: C.blue, ...ink, 'stroke-width': 4 }, g); return g; },
  stairs(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M8 92 V72 H30 V52 H52 V32 H74 V12 H94 V92 Z', fill: C.orange, ...ink }, g); return g; },
  walk(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 56, cy: 14, r: 10, fill: C.ink }, g);
    el('path', { d: 'M54 28 L46 56 L30 92 M46 56 L64 92 M52 34 L32 50 M54 32 L74 48', fill: 'none', stroke: C.ink, 'stroke-width': 10, 'stroke-linecap': 'round' }, g); return g; },
  dumbbell(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s}) rotate(-20 50 50)` }, p);
    el('rect', { x: 10, y: 30, width: 18, height: 40, rx: 6, fill: '#5FA3A8', ...ink }, g);
    el('rect', { x: 72, y: 30, width: 18, height: 40, rx: 6, fill: '#5FA3A8', ...ink }, g);
    el('rect', { x: 28, y: 44, width: 44, height: 12, fill: C.grey, ...ink }, g); return g; },
  check(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 50, cy: 50, r: 46, fill: C.green, ...ink }, g);
    el('path', { d: 'M28 52 L44 67 L73 35', fill: 'none', stroke: C.white, 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); return g; },
  cross(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 50, cy: 50, r: 46, fill: C.red, ...ink }, g);
    el('path', { d: 'M33 33 L67 67 M67 33 L33 67', fill: 'none', stroke: C.white, 'stroke-width': 12, 'stroke-linecap': 'round' }, g); return g; },
  question(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 50, cy: 50, r: 46, fill: C.amber, ...ink }, g);
    Text(g, '?', { x: 50, y: 55, size: 70 }); return g; },
  heart(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M50 88 C20 66 6 48 10 30 C14 12 38 8 50 26 C62 8 86 12 90 30 C94 48 80 66 50 88 Z', fill: C.red, ...ink }, g); return g; },
  lungs(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M44 20 V44 Q30 30 20 46 Q8 70 14 86 Q30 92 44 80 Z M56 20 V44 Q70 30 80 46 Q92 70 86 86 Q70 92 56 80 Z', fill: '#F2A7A0', ...ink }, g); return g; },
  drop(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M50 6 C66 32 82 50 82 66 A32 32 0 0 1 18 66 C18 50 34 32 50 6 Z', fill: C.red, ...ink }, g); return g; },
  brain(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M20 60 Q6 50 16 34 Q18 16 38 16 Q50 4 64 14 Q86 12 88 34 Q98 50 84 64 Q82 84 60 82 Q50 92 38 82 Q18 84 20 60 Z', fill: '#F3B7C2', ...ink }, g); return g; },
  pill(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s}) rotate(-35 50 50)` }, p);
    el('rect', { x: 8, y: 32, width: 84, height: 36, rx: 18, fill: C.white, ...ink }, g);
    el('path', { d: 'M50 34 L30 34 A16 16 0 0 0 30 66 L50 66 Z', fill: C.orange }, g); return g; },
  bubble(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M14 14 H86 A10 10 0 0 1 96 24 V64 A10 10 0 0 1 86 74 H44 L24 92 L28 74 H14 A10 10 0 0 1 4 64 V24 A10 10 0 0 1 14 14 Z', fill: C.white, ...ink }, g);
    for (const cx of [30, 50, 70]) el('circle', { cx, cy: 44, r: 7, fill: C.ink }, g); return g; },
  plate(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 50, cy: 50, r: 42, fill: C.white, ...ink }, g);
    el('circle', { cx: 50, cy: 50, r: 26, fill: '#F6D9B0', stroke: C.grey, 'stroke-width': 4 }, g); return g; },
  mirror(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('ellipse', { cx: 50, cy: 44, rx: 30, ry: 38, fill: '#CFE6F3', ...ink }, g);
    el('path', { d: 'M50 82 V96 M34 96 H66', ...ink }, g);
    el('path', { d: 'M36 30 L48 18', stroke: C.white, 'stroke-width': 6, 'stroke-linecap': 'round' }, g); return g; },
  calendar(p, x, y, s = 1) { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('rect', { x: 10, y: 16, width: 80, height: 76, rx: 10, fill: C.white, ...ink }, g);
    el('rect', { x: 10, y: 16, width: 80, height: 20, rx: 8, fill: C.red, ...ink }, g);
    for (let i = 0; i < 6; i++) el('path', { d: `M${24 + (i % 3) * 24} ${50 + Math.floor(i / 3) * 22} l6 6 l10 -12`, fill: 'none', stroke: C.green, 'stroke-width': 5, 'stroke-linecap': 'round' }, g); return g; },
};
IC.bone = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M30 20 a12 12 0 1 1 18 -6 L70 68 a12 12 0 1 1 6 18 a12 12 0 1 1 -18 6 L34 38 a12 12 0 1 1 -4 -18 Z', fill: '#FFF6E3', stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g); return g; };
IC.knee = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M34 6 L58 6 L60 44 Q76 52 66 66 L64 94 L40 94 L40 66 Q24 54 36 44 Z', fill: '#F6C9A6', stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
  el('circle', { cx: 56, cy: 52, r: 9, fill: C.red, opacity: 0.8 }, g); return g; };
IC.sugar = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  for (const [cx, cy] of [[30, 60], [58, 46], [70, 74], [40, 30]]) el('circle', { cx, cy, r: 14, fill: C.amber, stroke: C.ink, 'stroke-width': 5 }, g); return g; };
const icon = (g, name, x, y, s = 1) => { const w = el('g', {}, g); IC[name](w, x, y, s); return w; };
// icon tile with a label (cx, cy = centre of the card)
function IconTile(g, name, label, cx, cy, { w = 300, h = 300, fill = C.white } = {}) {
  const c = el('g', {}, g);
  Card(c, { x: cx - w / 2, y: cy - h / 2, w, h, fill });
  const lines = label.split('\n').length, ks = Math.min(w * 0.55, h - 90 - lines * 44) / 100;
  IC[name](c, cx - 50 * ks, cy - h / 2 + 24, ks);
  label.split('\n').forEach((l, i, a) => Text(c, l, { x: cx, y: cy + h / 2 - 50 - (a.length - 1 - i) * 44, size: l.length > 11 ? 34 : 40 }));
  return c;
}
// the five signs as a progress strip (top right); idx = current
IC.steps = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  [[30, 70, -15], [62, 34, 15]].forEach(([cx, cy, r]) => { el('ellipse', { cx, cy, rx: 13, ry: 22, transform: `rotate(${r} ${cx} ${cy})`, fill: '#C9A58A', stroke: C.ink, 'stroke-width': 6 }, g); }); return g; };
IC.clock = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('circle', { cx: 50, cy: 50, r: 42, fill: C.white, stroke: C.ink, 'stroke-width': 6 }, g); el('path', { d: 'M50 50 V24 M50 50 L68 60', stroke: C.ink, 'stroke-width': 7, 'stroke-linecap': 'round' }, g); return g; };
IC.speed = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M10 72 A40 40 0 0 1 90 72', fill: 'none', stroke: C.ink, 'stroke-width': 8, 'stroke-linecap': 'round' }, g); el('path', { d: 'M50 72 L72 40', stroke: C.red, 'stroke-width': 8, 'stroke-linecap': 'round' }, g); el('circle', { cx: 50, cy: 72, r: 8, fill: C.ink }, g); return g; };
IC.moon2 = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M62 8 A42 42 0 1 0 92 70 A34 34 0 1 1 62 8 Z', fill: '#D9C98E', stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g); return g; };
IC.route = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M18 86 C18 50 82 60 82 20', fill: 'none', stroke: C.ink, 'stroke-width': 8, 'stroke-dasharray': '12 10', 'stroke-linecap': 'round' }, g); el('circle', { cx: 82, cy: 18, r: 12, fill: C.red, stroke: C.ink, 'stroke-width': 5 }, g); return g; };
IC.bowl = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M8 44 H92 A42 42 0 0 1 8 44 Z', fill: '#E9DCC4', stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
  for (const [cx, cy] of [[30, 38], [46, 34], [62, 37], [76, 40]]) el('ellipse', { cx, cy, rx: 8, ry: 5, fill: '#D8C29C', stroke: C.ink, 'stroke-width': 3 }, g); return g; };
IC.egg = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M50 8 C76 8 88 50 84 66 A34 30 0 0 1 16 66 C12 50 24 8 50 8 Z', fill: '#FFFFFF', stroke: C.ink, 'stroke-width': 6 }, g); el('circle', { cx: 50, cy: 62, r: 16, fill: '#E9B23E', stroke: C.ink, 'stroke-width': 4 }, g); return g; };
IC.cheese = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M8 40 L84 20 L92 40 V78 H8 Z', fill: '#EBD58E', stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
  for (const [cx, cy, r] of [[28, 56, 7], [56, 62, 5], [72, 50, 6]]) el('circle', { cx, cy, r, fill: '#D3B864' }, g); return g; };
IC.trophy = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M28 10 H72 V40 A22 22 0 0 1 28 40 Z M40 62 H60 V76 H40 Z M30 86 H70', fill: '#D9B45A', stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g); return g; };
const SIGNS = [['snow', 'FRÍO'], ['moon2', 'DORMITORIO'], ['flame', 'IRRITANTES'], ['inhaler', 'INHALADOR'], ['virus', 'RESFRIADOS'], ['walk', 'MOVIMIENTO']];
function Progress(g, idx) {
  const p = el('g', {}, g);
  SIGNS.forEach(([ic], i) => {
    const x = 1400 + i * 88, on = i === idx;
    el('circle', { cx: x, cy: 104, r: 40, fill: on ? ACC : C.white, stroke: C.ink, 'stroke-width': on ? 5 : 3, opacity: on ? 1 : 0.75 }, p);
    const c = IC[ic](p, x - 26, 78, 0.52);
    if (!on) c.setAttribute('opacity', 0.55);
  });
  return p;
}
// exercise step sequence from equal-width pose crops (stills in a row); step k lights at keys[k]
function PoseRow(g, names, keys, { y = 180, h = 560, gap = 24, x0 = 70, x1 = 1850 } = {}) {
  const n = names.length, w = (x1 - x0 - gap * (n - 1)) / n;
  return names.map((nm, i) => {
    const c = el('g', {}, g), x = x0 + i * (w + gap);
    const st = Still(c, 'cut/' + nm + '.png', { x, y, w, h, iw: SZ[nm][0], ih: SZ[nm][1], r: 28, zoom: 0.03 });
    const badge = el('g', {}, c);
    el('circle', { cx: x + 46, cy: y + 46, r: 32, fill: ACC, stroke: C.ink, 'stroke-width': 4 }, badge);
    Text(badge, String(i + 1), { x: x + 46, y: y + 49, size: 38, color: C.white });
    return { c, st, x, w, i };
  });
}
function lightRow(row, t, keys) {
  row.forEach(({ c, st }, i) => {
    const on = t >= keys[i], cur = on && (i === row.length - 1 || t < keys[i + 1]);
    c.setAttribute('opacity', on ? (cur ? 1 : 0.55) : 0.18);
    st.draw(t, keys[i], keys[i] + 4);
  });
}
// timer ring that fills over `dur` seconds from t0 (repeats)
function TimerRing(g, { cx, cy, r = 90, dur = 5, label = '' }) {
  const c = el('g', {}, g);
  el('circle', { cx, cy, r, fill: C.white, stroke: C.ink, 'stroke-width': 5 }, c);
  const arc = el('path', { fill: ACC, opacity: 0.9 }, c);
  const tx = Text(c, '', { x: cx, y: cy + 4, size: 64 });
  if (label) Text(c, label, { x: cx, y: cy + r + 40, size: 34 });
  return { g: c, draw(t, t0) {
    const e = Math.max(0, t - t0), u = (e % (dur + 1)) / dur, f = Math.min(1, u) * 2 * Math.PI, rr = r - 12;
    set(arc, { d: f < 0.02 ? '' : f > 6.27 ? `M${cx} ${cy - rr} A${rr} ${rr} 0 1 1 ${cx - 0.01} ${cy - rr} Z` : `M${cx} ${cy} L${cx} ${cy - rr} A${rr} ${rr} 0 ${f > Math.PI ? 1 : 0} 1 ${cx + rr * Math.sin(f)} ${cy - rr * Math.cos(f)} Z` });
    tx.textContent = Math.min(dur, Math.floor(e % (dur + 1)) + 1);
  } };
}
// rep counter "n ×"
function Counter(g, { cx, cy, label = 'REPETICIONES' }) {
  const c = el('g', {}, g);
  Card(c, { x: cx - 150, y: cy - 90, w: 300, h: 180, fill: C.white });
  const tx = Text(c, '', { x: cx, y: cy - 10, size: 76, color: ACC });
  Text(c, label, { x: cx, y: cy + 58, size: 28 });
  return { g: c, set: s => { tx.textContent = s; } };
}
// pulsing callout ring
function Callout(g, cx, cy, r = 70) {
  const c = el('circle', { cx, cy, r, fill: 'none', stroke: C.red, 'stroke-width': 9 }, g);
  return (t, t0, t1 = 1e9) => {
    const on = t >= t0 && t < t1, k = E.back(prog(t, t0, t0 + 0.35));
    set(c, { r: (r * (0.6 + 0.4 * k) * (1 + 0.06 * Math.sin((t - t0) * 6))).toFixed(1), opacity: on ? clamp(k * 2) : 0 });
  };
}
// host = the owner's original mascot, popping in at a corner with a soft bob
function Host(g, pose, { cx = 1700, cy = 760, fit = 520 } = {}) {
  const h = el('g', {}, g);
  const c = cut(h, 'host_' + pose, cx, cy, fit);
  return (t, t0, t1 = 1e9) => { slideIn(h, t, t0, 'r', 500, t1); float(c, t, cx, cy, { amp: 6, period: 2.8 }); };
}
function CTA(g, kind, cy = 900) {
  const c = el('g', {}, g);
  const label = { sub: 'SUSCRÍBETE', like: 'ME GUSTA', comment: 'COMENTA', bell: 'ACTIVA LA CAMPANITA' }[kind];
  const w = 140 + label.length * 40 + 110, x = 960 - w / 2;
  Card(c, { x, y: cy - 65, w, h: 130, fill: kind === 'sub' ? C.red : C.white, r: 65 });
  if (kind === 'sub') { el('rect', { x: x + 40, y: cy - 34, width: 92, height: 68, rx: 18, fill: C.white }, c); el('path', { d: `M${x + 76} ${cy - 18} L${x + 104} ${cy} L${x + 76} ${cy + 18} Z`, fill: C.red }, c); }
  else if (kind === 'like') { const t = el('g', { transform: `translate(${x + 40} ${cy - 46})` }, c); el('path', { d: 'M10 44 H28 V88 H10 Z M32 44 L50 10 Q62 10 60 26 L56 40 H84 Q94 42 90 54 L80 84 Q76 90 68 90 H32 Z', fill: C.blue, ...ink, 'stroke-width': 5 }, t); }
  else IC.bubble(c, x + 30, cy - 50, 1);
  Text(c, label, { x: 960 + 55, y: cy + 2, size: 52, color: kind === 'sub' ? C.white : C.ink });
  return c;
}
// Arrow from (x1,y1) to (x2,y2)
function Arrow(g, x1, y1, x2, y2, color = C.ink, w = 12, dash = '') {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 32;
  el('path', { d: `M${x1} ${y1} L${x2} ${y2}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-dasharray': dash }, g);
  return el('path', { d: `M${x2 - hl * Math.cos(a - 0.5)} ${y2 - hl * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - hl * Math.cos(a + 0.5)} ${y2 - hl * Math.sin(a + 0.5)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
}

IC.flame = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M50 6 C58 30 82 40 80 66 A30 30 0 0 1 20 66 C18 50 32 42 34 26 C42 36 46 40 50 6 Z', fill: C.orange, ...ink }, g);
  el('path', { d: 'M50 54 C56 64 64 68 62 78 A12 12 0 0 1 38 78 C38 70 46 66 50 54 Z', fill: C.amber }, g); return g; };
IC.squat = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('circle', { cx: 56, cy: 14, r: 10, fill: C.ink }, g);
  el('path', { d: 'M54 28 L38 56 L62 66 L58 92 M50 36 L84 40', fill: 'none', stroke: C.ink, 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  el('path', { d: 'M8 60 H32 V92 M8 60 V92', fill: 'none', stroke: '#C98A55', 'stroke-width': 7, 'stroke-linecap': 'round' }, g); return g; };
IC.hip = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M14 20 Q30 10 42 26 L50 40 L58 26 Q70 10 86 20 Q94 44 78 60 L70 62 L66 80 L34 80 L30 62 L22 60 Q6 44 14 20 Z', fill: '#FFF6E3', ...ink }, g);
  el('circle', { cx: 30, cy: 66, r: 9, fill: '#F2A7A0', stroke: C.ink, 'stroke-width': 4 }, g);
  el('circle', { cx: 70, cy: 66, r: 9, fill: '#F2A7A0', stroke: C.ink, 'stroke-width': 4 }, g); return g; };
IC.gear = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  let d = ''; for (let i = 0; i < 16; i++) { const a = i * Math.PI / 8, r = i % 2 ? 34 : 46; d += (i ? 'L' : 'M') + (50 + r * Math.cos(a)).toFixed(1) + ' ' + (50 + r * Math.sin(a)).toFixed(1); }
  el('path', { d: d + 'Z', fill: C.grey, ...ink }, g); el('circle', { cx: 50, cy: 50, r: 14, fill: C.white, ...ink }, g); return g; };
IC.share = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M30 50 L70 24 M30 50 L70 76', stroke: C.ink, 'stroke-width': 7 }, g);
  for (const [cx, cy] of [[28, 50], [72, 22], [72, 78]]) el('circle', { cx, cy, r: 15, fill: C.blue, ...ink }, g); return g; };
// section title card: big number + title + subtitle, with the section icon
function TitleCard(svg, n, title, sub, a, b) {
  scene(svg, a, b, g => {
    const c = el('g', {}, g);
    el('circle', { cx: 960, cy: 330, r: 150, fill: ACC, stroke: C.ink, 'stroke-width': 6 }, c);
    Text(c, String(n), { x: 960, y: 342, size: 190, color: C.white });
    const ic = el('g', {}, g); IC[SIGNS[n - 1][0]](ic, 1080, 200, 1.1);
    const tt = Text(g, title, { x: 960, y: 610, size: title.length > 22 ? 84 : 100, color: C.ink });
    const st = Text(g, sub, { x: 960, y: 720, size: 50, color: ACC });
    const pr = Progress(g, n - 1);
    sfx('stamp', a() + 0.1, 0.8);
    return t => { pop(c, t, a() + 0.1, 960, 330); pop(ic, t, a() + 0.5, 1135, 255); show(tt, t, a() + 0.4); show(st, t, a() + 1); show(pr, t, a() + 0.6); };
  }, true);
}
// a row of chips that appear one by one (cx positions auto); items: [text, t0]
function ChipRow(g, items, { cy = 900, size = 40, fill = C.white, color = C.ink, gap = 40, cx = 960 } = {}) {
  const ws = items.map(([s]) => s.length * size * 0.64 + 70), tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = cx - tot / 2;
  const cs = items.map(([s, t0], i) => { const c = Chip(g, s, { cx: x + ws[i] / 2, cy, fill, color, size }); const px = x + ws[i] / 2; x += ws[i] + gap; return [c, t0, px]; });
  return t => cs.forEach(([c, t0, px]) => pop(c, t, t0(), px, cy));
}
// vertical chips down the right side
function SideChips(g, items, { cx = 1580, y0 = 220, dy = 130, size = 42, fill = C.white, color = C.ink } = {}) {
  const cs = items.map(([s, t0], i) => [Chip(g, s, { cx, cy: y0 + i * dy, fill, color, size }), t0]);
  return t => cs.forEach(([c, t0]) => slideIn(c, t, t0(), 'r', 400));
}
// white card with a cut-out item centred inside
function ItemCard(g, n, cx, cy, { w = 360, h = 360, fit = 280, label = '', size = 36, fill = C.white } = {}) {
  const c = el('g', {}, g);
  Card(c, { x: cx - w / 2, y: cy - h / 2, w, h, fill });
  cut(c, n, cx, cy - (label ? 24 : 0), fit);
  if (label) Text(c, label, { x: cx, y: cy + h / 2 - 38, size });
  return c;
}
// round check / cross badge
const Mark = (g, ok, cx, cy, s = 1) => icon(g, ok ? 'check' : 'cross', cx - 50 * s, cy - 50 * s, s);

IC.bolt = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M58 4 L20 56 H46 L38 96 L80 40 H54 Z', fill: C.amber, ...ink }, g); return g; };
IC.moon = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M62 8 A42 42 0 1 0 92 70 A34 34 0 1 1 62 8 Z', fill: '#F7E3A1', ...ink }, g); return g; };
IC.drop2 = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M50 6 C66 32 82 50 82 66 A32 32 0 0 1 18 66 C18 50 34 32 50 6 Z', fill: C.blue, ...ink }, g); return g; };
IC.light = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('circle', { cx: 50, cy: 40, r: 28, fill: '#FFE9A8', ...ink }, g); el('rect', { x: 38, y: 68, width: 24, height: 20, rx: 4, fill: C.grey, ...ink }, g); return g; };
const Drama2 = (g, s) => { const c = Chip(g, s, { cx: 1640, cy: 150, fill: ACC, color: C.white, size: 40 }); Drama(g); return c; };
// big vitamin badge for section openers

// big icon medallion
function Medal(g, ic, cx, cy, s = 2.4, fill = C.white) { const b = el('g', {}, g); el('circle', { cx: cx + 6, cy: cy + 8, r: 62 * s, fill: SHADOW }, b); el('circle', { cx, cy, r: 62 * s, fill, stroke: C.ink, 'stroke-width': 6 }, b); IC[ic](b, cx - 50 * s * 0.8, cy - 50 * s * 0.8, s * 0.8); return b; }
// warn helper for medical caution card
const Caution = (g, head, lines, kind = 'amber', y = 200, w = 1500) => Warn(g, head, lines, { kind, y, w });

// intensity gauge: three zones, needle at v (0..1)
function Gauge(g, cx, cy, r = 260, { labels = ['LIGERA', 'MODERADA', 'INTENSA'] } = {}) {
  const c = el('g', {}, g), cols = [C.green, '#C99A4E', C.red];
  el('path', { d: `M${cx - r - 40} ${cy + 30} H${cx + r + 40}`, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }, c);
  const arc = (a0, a1, col) => { const p = a => [cx - r * Math.cos(a), cy - r * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    el('path', { d: `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`, fill: 'none', stroke: col, 'stroke-width': 70 }, c); };
  [0, 1, 2].forEach(i => arc(i * Math.PI / 3 + 0.02, (i + 1) * Math.PI / 3 - 0.02, cols[i]));
  el('path', { d: `M${cx - r - 35} ${cy} A${r + 35} ${r + 35} 0 0 1 ${cx + r + 35} ${cy}`, fill: 'none', stroke: C.ink, 'stroke-width': 5 }, c);
  const ls = labels.map((s, i) => { const a = (i + 0.5) * Math.PI / 3, rr = r + 95; return Text(c, s, { x: cx - rr * Math.cos(a), y: cy - rr * Math.sin(a) + 10, size: 36, color: cols[i] }); });
  const nd = el('g', {}, c);
  el('path', { d: `M${cx} ${cy} L${cx} ${cy - r + 30}`, stroke: C.ink, 'stroke-width': 14, 'stroke-linecap': 'round' }, nd);
  el('circle', { cx, cy, r: 26, fill: C.ink }, nd);
  let cur = 0;
  return { g: c, ls, set(v) { cur = v; nd.setAttribute('transform', `rotate(${(-90 + 180 * v).toFixed(2)} ${cx} ${cy})`); } };
}
// eased needle move between keyframes [[t, v], ...]
const needle = (keys, t) => { let v = keys[0][1]; for (let i = 1; i < keys.length; i++) { const [t0, v0] = keys[i - 1], [t1, v1] = keys[i]; if (t >= t0) v = v0 + (v1 - v0) * E.inOut(prog(t, t0, t1)); } return v + 0.012 * Math.sin(t * 7); };
// interval strip: segs [[label, minutes, kind]] kind 'slow' | 'fast'; blocks appear at their cue
function IntervalStrip(g, segs, { x0 = 120, x1 = 1800, y = 560, h = 150 } = {}) {
  const tot = segs.reduce((a, s) => a + s[1], 0), W = x1 - x0;
  let x = x0;
  return segs.map(([lab, m, kind]) => {
    const w = W * m / tot, c = el('g', {}, g);
    el('rect', { x: x + 4, y, width: w - 8, height: h, rx: 22, fill: kind === 'fast' ? ACC : '#BFD3C6', stroke: C.ink, 'stroke-width': 4 }, c);
    if (lab) Text(c, lab, { x: x + w / 2, y: y + h / 2 + 4, size: w > 200 ? 40 : 30, color: kind === 'fast' ? C.white : C.ink });
    const o = { c, x, w }; x += w; return o;
  });
}
// day card for the week plan
function DayCard(g, d, ic, label, cx, cy, { w = 230, h = 300, fill = C.white } = {}) {
  const c = el('g', {}, g);
  Card(c, { x: cx - w / 2, y: cy - h / 2, w, h, fill });
  el('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: 70, rx: 30, fill: ACC }, c); el('rect', { x: cx - w / 2, y: cy - h / 2 + 40, width: w, height: 30, fill: ACC }, c);
  Text(c, d, { x: cx, y: cy - h / 2 + 40, size: 40, color: C.white });
  IC[ic](c, cx - 45, cy - 45, 0.9);
  label.split('\n').forEach((l, i, a) => Text(c, l, { x: cx, y: cy + h / 2 - 34 - (a.length - 1 - i) * 36, size: 30 }));
  return c;
}
IC.balance = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('circle', { cx: 50, cy: 14, r: 10, fill: C.ink }, g);
  el('path', { d: 'M50 28 V62 L50 92 M50 62 L70 74 M14 38 H86', fill: 'none', stroke: C.ink, 'stroke-width': 10, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g); return g; };
IC.park = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M50 92 V54', stroke: '#8A6A4E', 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
  el('circle', { cx: 50, cy: 38, r: 30, fill: C.green, ...ink }, g); return g; };

IC.battery = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('rect', { x: 8, y: 26, width: 76, height: 48, rx: 10, fill: C.white, ...ink }, g); el('rect', { x: 86, y: 40, width: 8, height: 20, rx: 3, fill: C.ink }, g);
  el('rect', { x: 16, y: 34, width: 18, height: 32, rx: 4, fill: C.red }, g); return g; };
IC.phone = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M28 14 Q20 14 18 24 Q16 50 40 74 Q64 94 82 84 Q90 80 88 72 L80 60 Q76 54 70 58 L62 64 Q48 56 40 40 L46 32 Q50 26 44 22 Z', fill: C.red, ...ink }, g); return g; };
IC.eye = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M6 50 Q50 6 94 50 Q50 94 6 50 Z', fill: C.white, ...ink }, g); el('circle', { cx: 50, cy: 50, r: 16, fill: C.blueDark, stroke: C.ink, 'stroke-width': 5 }, g); return g; };
// "normal" vs "merece atención" two-column card; items [[text, cueFn]]
function VsCards(g, left, right, { y = 210, h = 620 } = {}) {
  const col = (x, title, fill, items, ok) => { const c = el('g', {}, g); Card(c, { x, y, w: 820, h, fill: C.white });
    el('rect', { x, y, width: 820, height: 110, rx: 22, fill }, c); el('rect', { x, y: y + 60, width: 820, height: 50, fill }, c);
    Text(c, title, { x: x + 410, y: y + 58, size: 50, color: C.white });
    const its = items.map(([s, k], i) => { const r = el('g', {}, c), cy = y + 190 + i * 110; if (ok) Mark(r, true, x + 70, cy, 0.5); else { el('circle', { cx: x + 70, cy, r: 24, fill: '#D9A84E', stroke: C.ink, 'stroke-width': 4 }, r); Text(r, '!', { x: x + 70, y: cy + 3, size: 36 }); } Text(r, s, { x: x + 120, y: cy + 2, size: s.length > 26 ? 32 : 38, anchor: 'start' }); return [r, k]; });
    return [c, its]; };
  const [a, ai] = col(120, left[0], C.green, left[1], true), [b, bi] = col(980, right[0], '#B8873E', right[1], false);
  return { a, b, draw(t, ta, tb) { pop(a, t, ta, 530, y + h / 2); pop(b, t, tb, 1390, y + h / 2); [...ai, ...bi].forEach(([r, k]) => show(r, t, k())); } };
}

// before/after pair of cut-outs with labels: [name, label, colour]
function Pair(g, a, b, { cy = 500, fit = 340, w = 560, h = 560 } = {}) {
  const mk = ([n, l, col], cx) => { const c = el('g', {}, g); Card(c, { x: cx - w / 2, y: cy - h / 2, w, h, fill: C.white }); cut(c, n, cx, cy - 40, fit); Text(c, l, { x: cx, y: cy + h / 2 - 50, size: l.length > 16 ? 34 : 42, color: col }); return c; };
  return { a: mk(a, 560), b: mk(b, 1360), ar: (() => { const x = el('g', {}, g); Arrow(x, 880, cy, 1040, cy, ACC, 14); return x; })() };
}

IC.snow = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  for (let k = 0; k < 3; k++) { const a = k * 60; el('path', { d: 'M50 8 V92 M38 18 L50 30 L62 18 M38 82 L50 70 L62 82', fill: 'none', stroke: C.blueDark, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', transform: `rotate(${a} 50 50)` }, g); } return g; };
IC.inhaler = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('rect', { x: 46, y: 6, width: 26, height: 60, rx: 8, fill: '#E8E6EF', stroke: C.ink, 'stroke-width': 6 }, g);
  el('path', { d: 'M40 40 H76 V80 H18 Q12 80 12 72 V62 Q12 56 20 56 H40 Z', fill: C.blue, stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g); return g; };
IC.virus = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; el('path', { d: `M${50 + 30 * Math.cos(a)} ${50 + 30 * Math.sin(a)} L${50 + 44 * Math.cos(a)} ${50 + 44 * Math.sin(a)}`, stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }, g); el('circle', { cx: 50 + 44 * Math.cos(a), cy: 50 + 44 * Math.sin(a), r: 6, fill: C.green, stroke: C.ink, 'stroke-width': 3 }, g); }
  el('circle', { cx: 50, cy: 50, r: 30, fill: '#9CC9A0', stroke: C.ink, 'stroke-width': 6 }, g); return g; };
IC.house = (p, x, y, s = 1) => { const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M10 50 L50 12 L90 50 V92 H10 Z', fill: '#E6D9C6', stroke: C.ink, 'stroke-width': 6, 'stroke-linejoin': 'round' }, g); el('rect', { x: 40, y: 62, width: 20, height: 30, fill: '#9C7350', stroke: C.ink, 'stroke-width': 4 }, g); return g; };
// humidity gauge 0–100 %, green band 30–50
function HumidityBar(g, cx, y, w = 1200) {
  const c = el('g', {}, g), x0 = cx - w / 2, sx = v => x0 + w * v / 100;
  el('rect', { x: x0, y, width: w, height: 70, rx: 35, fill: '#D5D9DE', stroke: C.ink, 'stroke-width': 5 }, c);
  el('rect', { x: sx(30), y, width: sx(50) - sx(30), height: 70, fill: C.green, opacity: 0.85 }, c);
  el('rect', { x: sx(65), y, width: sx(100) - sx(65) - 4, height: 70, rx: 30, fill: '#9DB8C9', opacity: 0.9 }, c);
  el('rect', { x: x0 + 4, y, width: sx(20) - x0, height: 70, rx: 30, fill: '#E3C9A0', opacity: 0.9 }, c);
  [0, 30, 50, 100].forEach(v => Text(c, v + ' %', { x: sx(v), y: y + 110, size: 34 }));
  Text(c, 'DEMASIADO SECO', { x: sx(10), y: y - 40, size: 30, color: '#A0784E' });
  Text(c, '30–50 %', { x: sx(40), y: y - 40, size: 40, color: C.green });
  Text(c, 'ÁCAROS Y MOHO', { x: sx(83), y: y - 40, size: 30, color: C.blueDark });
  const nd = el('path', { d: `M0 -20 L-16 -46 H16 Z`, fill: C.ink }, c);
  return { g: c, set(v) { nd.setAttribute('transform', `translate(${sx(v).toFixed(1)} ${y})`); } };
}
