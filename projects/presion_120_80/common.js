// Shared pieces for "¿Sigue siendo 120/80 la cifra perfecta?". Needs lib.js, kit.js and cues.js.
// Every section runs on the global voice timeline (t = seconds into audio/voice.mp3).
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const SZ = { a_clinica: [829, 462], a_revista: [826, 463], a_sofa: [829, 463], a_telefono: [826, 462], arteria_flexible: [290, 261], arteria_rigida: [251, 252], brain: [318, 267], heart: [194, 270], libreta: [246, 286], manguito: [275, 284], manguito_pequeno: [145, 198], monitor: [386, 285], monitor_24h: [355, 321], pastillero: [398, 226], rinones: [370, 325], s_cama: [828, 463], s_comoda: [828, 462], s_mareo: [828, 463], s_pasillo: [828, 462], silueta: [176, 426], vaso_agua: [161, 238] };
const still = (g, n, o) => Still(g, 'cut/' + n + '.png', { iw: SZ[n][0], ih: SZ[n][1], ...o });
const img = n => ['cut/' + n + '.png', ...SZ[n]];
const cut = (p, n, cx, cy, fit) => Cutout(p, 'cut/' + n + '.png', { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit });
// big still that fills most of the frame (picture first)
const BIG = { x: 70, y: 60, w: 1780, h: 960 };

function Stage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: C.cream }, svg);
  return svg;
}
// scenes: fade (body) or hard cut (hook)
const scenes = [];
function scene(svg, a, b, build, { hard = false } = {}) {
  const g = el('g', {}, svg);
  const inner = el('g', {}, g);
  const draw = build(inner) || (() => {});
  scenes.push({ g, inner, a, b, draw, hard });
}
function drawScenes(t) {
  for (const s of scenes) {
    const v = s.hard ? cutVis(s.g, t, s.a(), s.b()) : sceneVis(s.g, t, s.a(), s.b(), 0.25);
    if (v > 0) s.draw(t, s.inner);
  }
}
const Source = (g, s) => Text(g, s, { x: 960, y: 1052, size: 24, weight: 700, color: C.grey });
const Ejemplo = (g, x = 1690, y = 100) => Chip(g, 'EJEMPLO', { cx: x, cy: y, fill: C.ink, color: C.amber, size: 30 });

// Blood-pressure readout: two stacked numbers. draw(sys, dia, {sysCol, diaCol})
function Readout(g, { cx, cy, size = 150, card = true, w = 430 }) {
  const r = el('g', {}, g);
  const h = size * 2.4;
  if (card) Card(r, { x: cx - w / 2, y: cy - h / 2, w, h, fill: C.white, r: 30 });
  const s = Text(r, '', { x: cx, y: cy - size * 0.55, size });
  el('line', { x1: cx - w * 0.32, y1: cy + size * 0.06, x2: cx + w * 0.32, y2: cy + size * 0.06, stroke: C.ink, 'stroke-width': 8, 'stroke-linecap': 'round' }, r);
  const d = Text(r, '', { x: cx, y: cy + size * 0.62, size });
  const u = Text(r, 'mmHg', { x: cx, y: cy + size * 1.08, size: size * 0.2, weight: 800, color: C.grey });
  return {
    g: r, s, d,
    draw(sys, dia, { sysCol = C.ink, diaCol = C.ink } = {}) {
      s.textContent = Math.round(sys); d.textContent = Math.round(dia);
      s.setAttribute('fill', sysCol); d.setAttribute('fill', diaCol);
    },
  };
}
// count-up helper: value from a→b between t0 and t0+dur
const count = (t, t0, a, b, dur = 0.6) => lerp(a, b, E.out(prog(t, t0, t0 + dur)));

// Monitor cut-out with digits written on its blank screen.
function MonitorDigits(g, { cx, cy, fit = 700 }) {
  const m = el('g', {}, g);
  const [iw, ih] = SZ.monitor, s = fit / iw;
  cut(m, 'monitor', cx, cy, fit);
  const x0 = cx - iw * s / 2, y0 = cy - ih * s / 2;
  // screen box in the cut-out ≈ x 0.47–0.86, y 0.15–0.54
  const sx = x0 + iw * s * 0.665, sy = y0 + ih * s * 0.345, fs = ih * s * 0.15;
  const a = Text(m, '', { x: sx, y: sy - fs * 0.55, size: fs });
  const b = Text(m, '', { x: sx, y: sy + fs * 0.55, size: fs });
  return {
    g: m, sx, sy, fs,
    draw(sys, dia, { sysCol = C.ink, diaCol = C.ink } = {}) {
      a.textContent = sys === '' ? '' : Math.round(sys); b.textContent = dia === '' ? '' : Math.round(dia);
      a.setAttribute('fill', sysCol); b.setAttribute('fill', diaCol);
    },
  };
}

// Systolic target gauge: 100–180 mmHg scale, green band 120–129, red line 140.
function Gauge(g, { x = 260, y = 520, w = 1400 } = {}) {
  const gg = el('g', {}, g);
  const X = v => x + (v - 100) / 80 * w;
  Card(gg, { x: x - 40, y: y - 60, w: w + 80, h: 120, fill: C.white, r: 60 });
  const band = el('rect', { x: X(120), y: y - 44, width: 0, height: 88, rx: 16, fill: C.green }, gg);
  const red = el('rect', { x: X(140), y: y - 44, width: X(180) - X(140), height: 88, rx: 16, fill: C.red, opacity: 0.18 }, gg);
  for (const v of [100, 120, 130, 140, 160, 180]) Text(gg, String(v), { x: X(v), y: y + 110, size: 40, weight: 800, color: C.grey });
  const line = el('line', { x1: X(140), y1: y - 80, x2: X(140), y2: y + 70, stroke: C.red, 'stroke-width': 10, 'stroke-linecap': 'round' }, gg);
  const hide = el('g', {}, gg);
  el('rect', { x: X(112), y: y - 70, width: X(137) - X(112), height: 140, rx: 24, fill: C.amber, stroke: C.ink, 'stroke-width': 7 }, hide);
  Text(hide, '?', { x: X(124.5), y: y + 4, size: 100 });
  return {
    g: gg, X,
    draw(t, { band: bt = null, hidden = false } = {}) {
      set(band, { width: bt === null ? 0 : (X(129.5) - X(120)) * E.out(prog(t, bt, bt + 0.6)) });
      hide.setAttribute('opacity', hidden ? 1 : 0);
    },
  };
}
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
Icon.walk = (p, x, y, s = 1) => {   // walking pictogram icon (an icon, not a figure)
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('circle', { cx: 50, cy: 50, r: 46, fill: C.blue, stroke: C.ink, 'stroke-width': 7 }, g);
  el('circle', { cx: 54, cy: 22, r: 8, fill: C.white }, g);
  el('path', { d: 'M52 34 L46 56 L34 78 M46 56 L60 76 M50 40 L34 50 M52 40 L66 52', fill: 'none', stroke: C.white, 'stroke-width': 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  return g;
};
Icon.dizzy = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('circle', { cx: 50, cy: 50, r: 46, fill: C.amber, stroke: C.ink, 'stroke-width': 7 }, g);
  el('path', { d: 'M50 50 m-4 0 a4 4 0 1 1 8 0 a10 10 0 1 1 -18 0 a16 16 0 1 1 30 0 a22 22 0 1 1 -40 0', fill: 'none', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
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
function Arrow(g, x1, y1, x2, y2, color = C.orange, w = 14) {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 34;
  return el('path', { d: `M${x1} ${y1} L${x2} ${y2} M${x2 - hl * Math.cos(a - 0.5)} ${y2 - hl * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - hl * Math.cos(a + 0.5)} ${y2 - hl * Math.sin(a + 0.5)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
}
// gentle heartbeat scale for a cut-out group
const beat = (t, period = 0.9) => 1 + 0.06 * Math.pow(Math.max(0, Math.sin(t / period * 2 * Math.PI)), 6);
const scaleAbout = (e, cx, cy, s) => e.setAttribute('transform', `translate(${cx} ${cy}) scale(${s.toFixed(4)}) translate(${-cx} ${-cy})`);
