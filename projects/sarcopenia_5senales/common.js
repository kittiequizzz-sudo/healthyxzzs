// Shared pieces for "5 señales de que estás perdiendo músculo" — warm pastel adult-cartoon style.
// Needs lib.js, kit.js, sizes.js and cues.js. Every section runs on the global voice timeline.
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };

// ---------------------------------------------------------------- pastel theme
Object.assign(C, { cream: '#FCEDCE', ink: '#4A3428', white: '#FFFDF7', orange: '#F4A340', amber: '#FBB533',
  red: '#E8735F', green: '#5FAE7B', blue: '#8EC5E8', blueDark: '#4F8DBF', grey: '#B3A08B', violet: '#9A7CC8' });
const SHADOW = '#E6CDA0';
// one tint (background) + accent per section
const TINTS = {
  intro: ['#FCEDCE', '#FBB533'], s1: ['#FCE3D3', '#E8735F'], s2: ['#E1F1E4', '#5FAE7B'], s3: ['#E0EEF8', '#4F8DBF'],
  s4: ['#ECE4F5', '#9A7CC8'], s5: ['#FDE6CC', '#F4A340'], end: ['#FCEDCE', '#E8735F'],
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
const CAP = (g, s, o = {}) => Caption(g, s, { cy: 975, size: 60, fill: C.ink, color: C.white, hiColor: C.amber, ...o });
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
  const s = `SEÑAL ${n} · ${title}`, w = s.length * 33 + 90;
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
const icon = (g, name, x, y, s = 1) => { const w = el('g', {}, g); IC[name](w, x, y, s); return w; };
// icon tile with a label (cx, cy = centre of the card)
function IconTile(g, name, label, cx, cy, { w = 300, h = 300, fill = C.white } = {}) {
  const c = el('g', {}, g);
  Card(c, { x: cx - w / 2, y: cy - h / 2, w, h, fill });
  IC[name](c, cx - 70, cy - h / 2 + 30, 1.4);
  label.split('\n').forEach((l, i, a) => Text(c, l, { x: cx, y: cy + h / 2 - 50 - (a.length - 1 - i) * 44, size: l.length > 11 ? 34 : 40 }));
  return c;
}
// the five signs as a progress strip (top right); idx = current
const SIGNS = [['hand', 'MANOS'], ['chair', 'SILLA'], ['feet', 'PASOS'], ['scale', 'BÁSCULA'], ['stairs', 'ESCALERAS']];
function Progress(g, idx) {
  const p = el('g', {}, g);
  SIGNS.forEach(([ic], i) => {
    const x = 1460 + i * 92, on = i === idx;
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
