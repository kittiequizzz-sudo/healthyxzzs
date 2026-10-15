// Shared pieces for "Seis pasos ante un posible ictus". Needs lib.js, kit.js and cues.js.
// Every section file runs on the global voice timeline (t = seconds into audio/voice.mp3).
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const SZ = {
  a1: [828, 447], a2: [828, 447], a3: [828, 480], a4: [828, 480],
  r1: [828, 446], r2: [828, 446], r3: [828, 480], r4: [828, 480],
  f1: [828, 455], f2: [828, 455], f3: [828, 468], f4: [828, 468],
  l1: [827, 461], l2: [827, 461], l3: [827, 464], l4: [827, 464],
  e1: [828, 461], e2: [828, 461], e3: [828, 466], e4: [828, 466],
  brain: [318, 267], heart: [194, 270],
};
// Frames for drawn panels: FULL (hook, big moments), LEFT (still + side info on the right).
const FULL = { x: 40, y: 40, w: 1840, h: 1000, r: 30 };
const LEFT = { x: 50, y: 110, w: 1250, h: 760, r: 28 };
const still = (g, n, o) => Still(g, 'cut/' + n + '.png', { iw: SZ[n][0], ih: SZ[n][1], ...FULL, ...o });
const cut = (p, n, cx, cy, fit) => Cutout(p, 'cut/' + n + '.png', { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit });

function Stage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: C.cream }, svg);
  return svg;
}
// A scene is a group shown between two times with a draw(t) for its contents.
// hard = true → hard cut (hook), otherwise a short 0.25 s cross-fade.
const scenes = [];
function scene(svg, a, b, build, hard = false) {
  const g = el('g', {}, svg);
  const draw = build(g) || (() => {});
  scenes.push({ g, a, b, draw, hard });
}
function drawScenes(t) {
  for (const s of scenes) {
    const v = s.hard ? cutVis(s.g, t, s.a(), s.b()) : sceneVis(s.g, t, s.a(), s.b(), 0.25);
    if (v > 0) s.draw(t);
  }
}
// One still filling a scene, pushing in over the scene's span.
function stillScene(svg, n, a, b, o = {}, extra = null, hard = false) {
  scene(svg, a, b, g => {
    const st = still(g, n, o);
    const more = extra ? extra(g) : null;
    return t => { st.draw(t, a(), b()); if (more) more(t); };
  }, hard);
}

// Small grey line at the bottom (dramatisation label, sources).
function Source(g, s, y = 1050) {
  const c = el('g', {}, g);
  const w = s.length * 15 + 40;
  el('rect', { x: 960 - w / 2, y: y - 22, width: w, height: 40, rx: 20, fill: C.ink, opacity: 0.55 }, c);
  Text(c, s, { x: 960, y, size: 24, weight: 700, color: C.cream });
  return c;
}
const Drama = g => Source(g, 'Dramatización · Rafael es un personaje');

// ---------------------------------------------------------------- icons for the six steps
Icon.eye = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M6 50 C26 18 74 18 94 50 C74 82 26 82 6 50 Z', fill: C.white, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('circle', { cx: 50, cy: 50, r: 18, fill: C.blue, stroke: C.ink, 'stroke-width': 6 }, g);
  el('circle', { cx: 50, cy: 50, r: 7, fill: C.ink }, g);
  return g;
};
Icon.phone = (p, x, y, s = 1, color = C.red) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M28 10 C20 10 12 18 14 30 C20 62 38 80 70 86 C82 88 90 80 90 72 L90 64 L70 56 L60 66 C48 60 40 52 34 40 L44 30 L36 10 Z', fill: color, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  return g;
};
Icon.chair = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M22 12 H78 V56 H22 Z', fill: C.amber, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('path', { d: 'M10 40 H24 V70 H76 V40 H90 V78 H10 Z', fill: C.orange, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('path', { d: 'M18 78 V92 M82 78 V92', stroke: C.ink, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
  return g;
};
Icon.noglass = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M28 14 H72 L66 88 H34 Z', fill: C.white, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('path', { d: 'M32 44 H68 L65 86 H35 Z', fill: C.blueFar }, g);
  el('path', { d: 'M28 14 H72 L66 88 H34 Z', fill: 'none', stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('line', { x1: 12, y1: 88, x2: 88, y2: 12, stroke: C.red, 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  return g;
};
Icon.clipboard = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('rect', { x: 18, y: 12, width: 64, height: 82, rx: 8, fill: C.white, stroke: C.ink, 'stroke-width': 7 }, g);
  el('rect', { x: 36, y: 4, width: 28, height: 16, rx: 5, fill: C.amber, stroke: C.ink, 'stroke-width': 6 }, g);
  for (const yy of [40, 58, 76]) el('line', { x1: 32, y1: yy, x2: 68, y2: yy, stroke: C.blueDark, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  return g;
};
Icon.walk = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M24 70 C14 70 12 54 18 46 C26 38 38 44 38 58 C38 70 32 70 24 70 Z', fill: C.blue, stroke: C.ink, 'stroke-width': 6 }, g);
  el('path', { d: 'M66 54 C56 54 54 38 60 30 C68 22 80 28 80 42 C80 54 74 54 66 54 Z', fill: C.blue, stroke: C.ink, 'stroke-width': 6 }, g);
  el('path', { d: 'M20 84 Q50 96 84 72', fill: 'none', stroke: C.red, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-dasharray': '4 12' }, g);
  return g;
};
const STEPS = [['eye', 'SEÑALES'], ['phone', 'LLAMAR 112'], ['chair', 'POSICIÓN'], ['noglass', 'NADA POR BOCA'], ['clipboard', 'INFORMACIÓN'], ['heart', 'HÁBITOS']];
// The six steps as a strip at the top right; the current one ringed orange (idx -1 = none).
function Progress(g, idx) {
  const p = el('g', {}, g);
  STEPS.forEach(([ic], i) => {
    const x = 1380 + i * 92, on = i === idx;
    el('circle', { cx: x, cy: 80, r: 40, fill: C.white, stroke: on ? C.orange : C.ink, 'stroke-width': on ? 8 : 4, opacity: on ? 1 : 0.6 }, p);
    const c = Icon[ic](p, x - 26, 54, 0.52);
    if (!on) c.setAttribute('opacity', 0.5);
  });
  return p;
}
// Six big step tiles in a row (intro preview / conclusion recap). Returns tiles [{g, cx, cy}].
function StepRow(g, { y = 430, size = 250 } = {}) {
  return STEPS.map(([ic, s], i) => {
    const c = el('g', {}, g), x = 960 + (i - 2.5) * (size + 40);
    Card(c, { x: x - size / 2, y: y - size / 2, w: size, h: size + 70, fill: C.white, r: 30 });
    Text(c, String(i + 1), { x: x - size / 2 + 38, y: y - size / 2 + 40, size: 44, color: C.orange });
    Icon[ic](c, x - 60, y - 75, 1.2);
    Text(c, s, { x, y: y + size / 2 + 20, size: s.length > 11 ? 26 : 30 });
    return { g: c, cx: x, cy: y + 35 };
  });
}

// ---------------------------------------------------------------- 112, clock, FAST
// Red "112" badge. draw(t, t0) slams it in.
function Badge112(g, { cx, cy, size = 1 }) {
  const b = el('g', {}, g);
  const w = 300 * size, h = 190 * size;
  el('rect', { x: cx - w / 2 + 10 * size, y: cy - h / 2 + 12 * size, width: w, height: h, rx: 36 * size, fill: C.ink }, b);
  el('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 36 * size, fill: C.red, stroke: C.ink, 'stroke-width': 8 * size }, b);
  Icon.phone(b, cx - w / 2 + 22 * size, cy - 40 * size, 0.8 * size, C.white);
  Text(b, '112', { x: cx + 40 * size, y: cy + 6 * size, size: 110 * size, color: C.white });
  return { g: b, draw: (t, t0, t1 = 1e9) => pop(b, t, t0, cx, cy, t1) };
}
// Clock ring with a sweeping minute hand and a draining orange arc ("cada minuto cuenta").
function MinuteClock(g, { cx, cy, r = 150 }) {
  const c = el('g', {}, g);
  el('circle', { cx: cx + 8, cy: cy + 10, r: r + 8, fill: C.ink }, c);
  el('circle', { cx, cy, r, fill: C.white, stroke: C.ink, 'stroke-width': 10 }, c);
  const arc = el('path', { fill: C.orange, opacity: 0.85 }, c);
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6;
    el('line', { x1: cx + Math.sin(a) * r * 0.78, y1: cy - Math.cos(a) * r * 0.78, x2: cx + Math.sin(a) * r * 0.9, y2: cy - Math.cos(a) * r * 0.9, stroke: C.ink, 'stroke-width': i % 3 ? 5 : 10, 'stroke-linecap': 'round' }, c);
  }
  const hand = el('line', { x1: cx, y1: cy, stroke: C.ink, 'stroke-width': 12, 'stroke-linecap': 'round' }, c);
  el('circle', { cx, cy, r: 14, fill: C.red, stroke: C.ink, 'stroke-width': 5 }, c);
  return {
    g: c,
    draw(t, t0) {
      const u = Math.max(0, t - t0) / 6, a = u * 2 * Math.PI, rr = r * 0.74;
      set(hand, { x2: cx + Math.sin(a) * rr, y2: cy - Math.cos(a) * rr });
      const f = (u % 1) * 2 * Math.PI, big = f > Math.PI ? 1 : 0;
      set(arc, { d: f < 0.01 ? '' : `M${cx} ${cy} L${cx} ${cy - rr} A${rr} ${rr} 0 ${big} 1 ${cx + Math.sin(f) * rr} ${cy - Math.cos(f) * rr} Z` });
    },
  };
}
// F · A · S · T tiles in a column (x, y top). lit(t, i) state handled by draw(t, keys).
const FAST = [['F', 'CARA'], ['A', 'BRAZOS'], ['S', 'HABLA'], ['T', 'TIEMPO']];
function FastColumn(g, { x = 1390, y = 130, w = 470, h = 190, gap = 20 } = {}) {
  return FAST.map(([L, s], i) => {
    const c = el('g', {}, g), yy = y + i * (h + gap);
    const box = Card(c, { x, y: yy, w, h, fill: C.white, r: 28 });
    const sq = el('rect', { x: x + 18, y: yy + 18, width: h - 36, height: h - 36, rx: 22, fill: C.grey, stroke: C.ink, 'stroke-width': 6 }, c);
    Text(c, L, { x: x + h / 2, y: yy + h / 2 + 4, size: 110, color: C.white });
    const lab = Text(c, s, { x: x + h + 20, y: yy + h / 2, size: 54, anchor: 'start' });
    return { g: c, sq, lab, cx: x + w / 2, cy: yy + h / 2, i };
  });
}
// light tiles: state per tile 0 = dim, 1 = current (orange), 2 = done (ink)
function lightFast(tiles, t, keys) {
  tiles.forEach((f, i) => {
    const on = keys[i] && t >= keys[i], cur = on && (i === 3 || !keys[i + 1] || t < keys[i + 1]);
    set(f.sq, { fill: cur ? C.orange : on ? C.ink : C.grey });
    f.g.setAttribute('opacity', on ? 1 : 0.45);
    set(f.lab, { fill: cur ? C.orange : C.ink });
  });
}

// Pulsing red callout circle at (cx, cy).
function Callout(g, cx, cy, r = 70) {
  const c = el('circle', { cx, cy, r, fill: 'none', stroke: C.red, 'stroke-width': 10 }, g);
  return (t, t0, t1 = 1e9) => {
    const on = t >= t0 && t < t1;
    const k = E.back(prog(t, t0, t0 + 0.35));
    set(c, { r: (r * (0.6 + 0.4 * k) * (1 + 0.06 * Math.sin((t - t0) * 6))).toFixed(1), opacity: on ? clamp(k * 2) : 0 });
  };
}
// Pill-shaped label.
function Chip(g, s, { cx, cy, fill = C.white, color = C.ink, size = 44 }) {
  const c = el('g', {}, g);
  const w = s.length * size * 0.66 + 70;
  Card(c, { x: cx - w / 2, y: cy - size, w, h: size * 2, fill, r: size });
  Text(c, s, { x: cx, y: cy + 2, size, color });
  return c;
}
// Arrow from (x1,y1) to (x2,y2).
function Arrow(g, x1, y1, x2, y2, color = C.orange, w = 14, dash = '') {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 34;
  el('path', { d: `M${x1} ${y1} L${x2} ${y2}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-dasharray': dash }, g);
  return el('path', { d: `M${x2 - hl * Math.cos(a - 0.5)} ${y2 - hl * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - hl * Math.cos(a + 0.5)} ${y2 - hl * Math.sin(a + 0.5)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
}
// Kicker caption for a section start: "PASO n · TITLE" on an orange pill, top left.
function Kicker(g, n, title) {
  const k = el('g', {}, g);
  const s = `PASO ${n} · ${title}`, w = s.length * 34 + 90;
  Card(k, { x: 70, y: 60, w, h: 100, fill: C.orange, r: 50 });
  Text(k, s, { x: 70 + w / 2, y: 112, size: 56, color: C.white });
  return k;
}
// Bottom call-to-action pill (subscribe / share / comment).
function CTA(g, kind, cy = 900) {
  const c = el('g', {}, g);
  const label = { sub: 'SUSCRÍBETE', share: 'COMPARTE ESTE VÍDEO', comment: 'COMENTA' }[kind];
  const w = 120 + label.length * 40 + (kind === 'sub' ? 120 : 110);
  const x = 960 - w / 2;
  Card(c, { x, y: cy - 65, w, h: 130, fill: kind === 'sub' ? C.red : C.white, r: 65 });
  if (kind === 'sub') {
    el('rect', { x: x + 40, y: cy - 34, width: 92, height: 68, rx: 18, fill: C.white }, c);
    el('path', { d: `M${x + 76} ${cy - 18} L${x + 104} ${cy} L${x + 76} ${cy + 18} Z`, fill: C.red }, c);
  } else Icon.bubble(c, x + 30, cy - 50, 1);
  Text(c, label, { x: 960 + 55, y: cy + 2, size: 54, color: kind === 'sub' ? C.white : C.ink });
  return c;
}
// Screen point of image pixel (px, py) of panel n shown in frame fr with zoom 0.
function imgPt(fr, n, px, py) {
  const [iw, ih] = SZ[n], s = Math.max(fr.w / iw, fr.h / ih);
  return [fr.x + fr.w / 2 - iw * s / 2 + px * s, fr.y + fr.h / 2 - ih * s / 2 + py * s];
}
// Dark veil over a still (so a badge or CTA on top reads clearly).
const Veil = (g, o = 0.5) => el('rect', { x: FULL.x, y: FULL.y, width: FULL.w, height: FULL.h, rx: FULL.r, fill: C.ink, opacity: o }, g);
// Floating cut-out: returns a draw(t) that bobs it.
function floatCut(g, n, cx, cy, fit, phase = 0) {
  const c = cut(g, n, cx, cy, fit);
  return t => float(c, t, cx, cy, { phase });
}
// Red pulsing "damage" spot (on the brain).
function Pulse(g, cx, cy, r = 40) {
  const a = el('circle', { cx, cy, r, fill: C.red, opacity: 0.8 }, g);
  const b = el('circle', { cx, cy, r, fill: 'none', stroke: C.red, 'stroke-width': 8 }, g);
  return t => { const u = (t * 0.8) % 1; set(b, { r: r * (1 + 1.4 * u), opacity: 1 - u }); set(a, { r: r * (0.9 + 0.1 * Math.sin(t * 5)) }); };
}
// Drooping mouth corner in f1 (image px). The drawn droop is on Rafael's left; see factcheck/cues.
const MOUTH = [505, 285];
