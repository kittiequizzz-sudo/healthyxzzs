// Shared pieces for "Lo que hace tu cerebro mientras duermes". Needs lib.js, kit.js and cues.js.
// Every section runs on the global voice timeline (t = seconds into audio/voice.mp3).
// Night look: deep-navy stage with soft stars; drawings and diagrams sit on it.
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const N = { bg: '#141A2E', bg2: '#1E2742', csf: '#7FC8F8', waste: '#9A9AA6', plaque: '#F7AD36' };
const SZ = { a1_brain: [456, 373], a2_sagittal: [420, 390], a3_neuron: [541, 370], a4_vessel: [692, 297], a5_muscle: [198, 492] };
const STILL = [829, 464];
const cut = (p, n, cx, cy, fit) => Cutout(p, 'cut/' + n + '.png', { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit });

// Stage: navy background + twinkling stars (drawn every frame by drawScenes).
let STARS = [];
function Stage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: N.bg }, svg);
  el('circle', { cx: 960, cy: 540, r: 900, fill: N.bg2, opacity: 0.55 }, svg);
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 70; i++) STARS.push([el('circle', { cx: rnd() * 1920, cy: rnd() * 1080, r: 1.5 + rnd() * 2.5, fill: '#FFFFFF' }, svg), rnd() * 6]);
  return svg;
}
const scenes = [];
function scene(svg, a, b, build, { hard = false } = {}) {
  const g = el('g', {}, svg);
  const draw = build(g) || (() => {});
  scenes.push({ g, a, b, draw, hard });
}
function drawScenes(t) {
  for (const [s, ph] of STARS) s.setAttribute('opacity', (0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.3 + ph))).toFixed(3));
  for (const s of scenes) {
    const v = s.hard ? cutVis(s.g, t, s.a(), s.b()) : sceneVis(s.g, t, s.a(), s.b() + 0.25, 0.25);   // old scene stays until the new one has faded in (no dip to empty)
    if (v > 0) s.draw(t);
  }
}

// Big still in a rounded frame (most of the screen). Returns Still object.
const BIG = { x: 150, y: 70, w: 1620, h: 907 };
function still(g, n, o = {}) {
  return Still(g, 'cut/' + n + '.png', { ...BIG, iw: STILL[0], ih: STILL[1], ...o });
}
// Caption on the picture: cream pill, ink text, one highlighted word in orange.
function Cap(g, s, o = {}) { return Caption(g, s, { cy: 960, size: 58, fill: C.cream, color: C.ink, hiColor: C.orange, ...o }); }
function Src(g, s) { return Text(g, s, { x: 40, y: 1055, size: 24, weight: 700, color: '#9FA8C6', anchor: 'start' }); }

// Row of 10 circles (the ten night processes). draw(t, {active, done, big})
function Ten(g, { cx = 960, cy = 540, r = 62, gap = 165 } = {}) {
  const items = [];
  for (let i = 0; i < 10; i++) {
    const c = el('g', {}, g), x = cx + (i - 4.5) * gap;
    const ring = el('circle', { cx: x, cy, r, fill: N.bg2, stroke: C.cream, 'stroke-width': 7 }, c);
    const tx = Text(c, String(i + 1), { x, y: cy + 3, size: r * 0.95, color: C.cream });
    items.push({ c, ring, tx, x });
  }
  return { items, cy };
}
// Small progress strip, top right: 10 dots, current one orange.
function Progress(g, idx) {
  const p = el('g', {}, g);
  el('rect', { x: 1395, y: 20, width: 500, height: 64, rx: 32, fill: C.ink, opacity: 0.85 }, p);
  for (let i = 0; i < 10; i++) {
    const x = 1430 + i * 48, on = i === idx, done = i < idx;
    el('circle', { cx: x, cy: 52, r: on ? 19 : 14, fill: on ? C.orange : done ? C.green : 'none', stroke: on ? C.cream : '#8C93AE', 'stroke-width': 4 }, p);
    if (on) Text(p, String(i + 1), { x, y: 54, size: 22, color: C.white });
  }
  return p;
}
// Section kicker: "PUNTO n" small amber + title (key phrase) — over the section's first picture.
function Kicker(g, n, title, { y = 860 } = {}) {
  const k = el('g', {}, g);
  const w = title.length * 46 + 120;
  el('rect', { x: 960 - w / 2, y: y - 70, width: w, height: 170, rx: 30, fill: C.ink, opacity: 0.92 }, k);
  Text(k, 'PUNTO ' + n, { x: 960, y: y - 22, size: 40, color: C.amber });
  Text(k, title, { x: 960, y: y + 46, size: 74, color: C.cream });
  return k;
}

// Hypnogram: a night of sleep stages (23:00 → 07:00). draw(t, u reveal 0..1, hiN3 0..1, hiREM 0..1)
const HYP = [[0, 0], [0.03, 2], [0.06, 3], [0.09, 4], [0.19, 3], [0.22, 1], [0.25, 'R'], [0.29, 2], [0.32, 4], [0.4, 3], [0.43, 2], [0.46, 'R'], [0.52, 2], [0.56, 3], [0.6, 4], [0.64, 2], [0.67, 'R'], [0.75, 2], [0.8, 3], [0.83, 2], [0.86, 'R'], [0.96, 1], [0.985, 0], [1, 0]];
function Hypnogram(g, { x = 330, y = 250, w = 1400, h = 520 } = {}) {
  const H = el('g', {}, g);
  el('rect', { x: x - 220, y: y - 60, width: w + 280, height: h + 200, rx: 30, fill: C.cream, stroke: C.ink, 'stroke-width': 6 }, H);
  const rows = ['DESPIERTO', 'REM', 'LIGERO', 'MEDIO', 'PROFUNDO'];
  const ry = i => y + i * h / 4;
  rows.forEach((s, i) => {
    el('line', { x1: x, y1: ry(i), x2: x + w, y2: ry(i), stroke: C.ink, 'stroke-width': 2, opacity: 0.15 }, H);
    Text(H, s, { x: x - 30, y: ry(i), size: 30, weight: 800, anchor: 'end', color: i === 1 ? C.red : i === 4 ? C.blueDark : C.ink });
  });
  ['23:00', '01:00', '03:00', '05:00', '07:00'].forEach((s, i) => Text(H, s, { x: x + i * w / 4, y: y + h + 60, size: 28, weight: 800, color: C.grey }));
  const lvl = v => v === 'R' ? 1 : v === 0 ? 0 : v === 1 ? 2 : v === 2 ? 2 : v === 3 ? 3 : 4;
  let d = '';
  const segs = [];
  for (let i = 0; i < HYP.length - 1; i++) {
    const [u0, v0] = HYP[i], [u1] = HYP[i + 1], yy = ry(lvl(v0));
    d += (i ? 'L' : 'M') + (x + u0 * w) + ' ' + yy + ' L' + (x + u1 * w) + ' ' + yy + ' ';
    if (v0 === 'R' || v0 === 4) segs.push([v0, el('rect', { x: x + u0 * w, y: yy - 22, width: (u1 - u0) * w, height: 44, rx: 10, fill: v0 === 'R' ? C.red : N.csf, opacity: 0 }, H)]);
  }
  const path = el('path', { d, fill: 'none', stroke: C.ink, 'stroke-width': 9, 'stroke-linejoin': 'round' }, H);
  const len = 6000;
  set(path, { 'stroke-dasharray': len, 'stroke-dashoffset': len });
  return {
    g: H,
    draw(u, n3 = 0, rem = 0) {
      set(path, { 'stroke-dashoffset': (len * (1 - clamp(u))).toFixed(0) });
      segs.forEach(([v, r]) => r.setAttribute('opacity', ((v === 'R' ? rem : n3) * 0.85).toFixed(3)));
    },
  };
}

// Little padlock (red) drawn in code.
function Lock(g, cx, cy, s = 1, color = C.red) {
  const l = el('g', {}, g);
  const i = el('g', { transform: `translate(${cx} ${cy}) scale(${s})` }, l);
  el('path', { d: 'M-34 -10 V-38 A34 34 0 0 1 34 -38 V-10', fill: 'none', stroke: C.ink, 'stroke-width': 18 }, i);
  el('path', { d: 'M-34 -10 V-38 A34 34 0 0 1 34 -38 V-10', fill: 'none', stroke: C.cream, 'stroke-width': 8 }, i);
  el('rect', { x: -56, y: -14, width: 112, height: 92, rx: 16, fill: color, stroke: C.ink, 'stroke-width': 7 }, i);
  el('circle', { cx: 0, cy: 22, r: 11, fill: C.ink }, i);
  el('rect', { x: -5, y: 22, width: 10, height: 30, fill: C.ink }, i);
  return l;
}
// Simple eye (white almond + iris). draw(t) flicks the iris left-right fast (REM).
function Eye(g, cx, cy, s = 1) {
  const e = el('g', { transform: `translate(${cx} ${cy}) scale(${s})` }, g);
  el('path', { d: 'M-90 0 Q0 -70 90 0 Q0 70 -90 0 Z', fill: C.white, stroke: C.ink, 'stroke-width': 8 }, e);
  const iris = el('g', {}, e);
  el('circle', { cx: 0, cy: 0, r: 30, fill: C.blueDark, stroke: C.ink, 'stroke-width': 5 }, iris);
  el('circle', { cx: 0, cy: 0, r: 13, fill: C.ink }, iris);
  el('circle', { cx: 8, cy: -9, r: 6, fill: C.white }, iris);
  return { g: e, draw(t, on) { const x = on ? 26 * Math.sign(Math.sin(t * 7)) * Math.min(1, Math.abs(Math.sin(t * 7)) * 3) : 0; iris.setAttribute('transform', `translate(${x.toFixed(1)} 0)`); } };
}
// Particles drifting (deterministic). n dots in a box; draw(t, k) where k moves them toward a target.
function Dots(g, n, { x, y, w, h, r = 9, fill = N.waste, seed = 3 }) {
  let sd = seed;
  const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  const d = [];
  for (let i = 0; i < n; i++) d.push({ e: el('circle', { r: r * (0.7 + rnd() * 0.6), fill, stroke: C.ink, 'stroke-width': 2.5 }, g), x: x + rnd() * w, y: y + rnd() * h, p: rnd() * 6 });
  return {
    draw(t, { appear = 1, tx = null, ty = null, k = 0, fade = 0 } = {}) {
      d.forEach((o, i) => {
        const a = clamp(appear * n - i);
        const px = o.x + 8 * Math.sin(t * 0.9 + o.p), py = o.y + 8 * Math.cos(t * 0.7 + o.p);
        const kk = E.inOut(clamp(k * 1.6 - (i / n) * 0.6));
        const fx = tx == null ? px : lerp(px, tx + (i % 5) * 6, kk), fy = ty == null ? py : lerp(py, ty, kk);
        set(o.e, { cx: fx.toFixed(1), cy: fy.toFixed(1), opacity: (a * (1 - fade) * (1 - (tx == null ? 0 : kk * kk))).toFixed(3) });
      });
    },
  };
}
// Stream of blue dots along a horizontal band (CSF flow). draw(t, on 0..1)
function Flow(g, { x1, x2, y, spread = 30, n = 26, r = 9, color = N.csf, speed = 160 }) {
  const d = [];
  for (let i = 0; i < n; i++) d.push([el('circle', { r, fill: color, stroke: C.ink, 'stroke-width': 2 }, g), i / n, ((i * 37) % 11) / 11 - 0.5]);
  return {
    draw(t, on) {
      d.forEach(([e, f, o]) => {
        const u = ((f + t * speed / (x2 - x1)) % 1);
        set(e, { cx: (x1 + u * (x2 - x1)).toFixed(1), cy: (y + o * spread * 2 + 4 * Math.sin(t * 3 + f * 9)).toFixed(1), opacity: (on * Math.min(1, u * 8, (1 - u) * 8)).toFixed(3) });
      });
    },
  };
}
// Arrow from (x1,y1) to (x2,y2) with an open head.
function Arrow(g, x1, y1, x2, y2, color = C.orange, w = 14) {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 26;
  return el('path', { d: `M${x1} ${y1} L${x2} ${y2} M${x2 - hl * Math.cos(a - 0.5)} ${y2 - hl * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - hl * Math.cos(a + 0.5)} ${y2 - hl * Math.sin(a + 0.5)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
}
// Pill label.
function Chip(g, s, { cx, cy, fill = C.white, color = C.ink, size = 44 }) {
  const c = el('g', {}, g);
  const w = s.length * size * 0.66 + 70;
  Card(c, { x: cx - w / 2, y: cy - size, w, h: size * 2, fill, r: size });
  Text(c, s, { x: cx, y: cy + 2, size, color });
  return c;
}
