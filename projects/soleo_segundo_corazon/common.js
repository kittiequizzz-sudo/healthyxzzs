// Shared pieces for "El «segundo corazón» de tus piernas". Needs lib.js, kit.js, sizes.js, cues.js.
// ONE continuous video on one voice timeline (t = seconds into audio/voice_full.mp3).
// Motion rules (owner, Oct 23): same voice-synced timing, more life inside every scene: camera drift +
// pan on every still, everything idles (bob / breathe), entrances pop or slide with overshoot,
// diagrams move (blood cells, sugar, pumping calf). Every element is registered on its scene and drawn
// from t alone, so frames stay deterministic.
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const src = n => { if (!SZ[n]) throw new Error('missing cut ' + n); return 'cut/' + n + '.png'; };
const SKIN = '#F2C9A5', MUSCLE = '#D9574A', VEIN = '#3D6FD1', BLOOD = '#C8231B';

function Stage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: C.cream }, svg);
  return svg;
}

// ---------------------------------------------------------------- scenes
// A scene shows between a and b (seconds) with a short cross-fade. Its whole content sits in a camera
// group that drifts in slowly (drift) and leans in on the punch times. Items made with Live() during
// build are drawn automatically; build may also return an extra draw(t, a, b).
const scenes = [];
let CUR = null;
function scene(svg, a, b, build, { fade = 0.3, drift = 0.03, punch: pts = [] } = {}) {
  const g = el('g', {}, svg), cam = el('g', {}, g);
  const items = [];
  CUR = items;
  const extra = build(cam, a, b);
  CUR = null;
  scenes.push({ g, cam, a, b, items, extra, fade, drift, pts });
}
function drawScenes(t) {
  for (const s of scenes) {
    if (sceneVis(s.g, t, s.a, s.b, s.fade) <= 0) continue;
    let k = 1 + s.drift * E.inOut(prog(t, s.a, s.b));
    for (const p of s.pts) {
      const u = prog(t, p, p + 0.2), v = prog(t, p + 0.2, p + 0.7);
      if (t >= p) k += 0.05 * E.out(u) - 0.033 * E.inOut(v);
    }
    s.cam.setAttribute('transform', `translate(960 540) scale(${k.toFixed(4)}) translate(-960 -540)`);
    for (const it of s.items) it.draw(t, s.a, s.b);
    if (typeof s.extra === 'function') s.extra(t, s.a, s.b);
  }
}

// ---------------------------------------------------------------- living elements
// Live(): an element with an entrance at t0, an optional exit at t1 and idle motion.
//   enter: pop | up | l | r | d | fade | none     idle: bob | breathe | shake | none
function Live(parent, { t0 = -1e9, t1 = 1e9, cx = 960, cy = 540, enter = 'pop', idle = 'bob', phase = 0, amp = 1, draw = null } = {}) {
  const outer = el('g', {}, parent), inner = el('g', {}, outer);
  const it = {
    g: inner, outer, t0, t1,
    draw(t, a, b) {
      if (t < t0 || t > t1) { outer.style.display = 'none'; return; }
      outer.style.display = '';
      let tf = '', op = clamp(prog(t, t0, t0 + 0.18));
      const u = prog(t, t0, t0 + 0.45), bk = E.back(u);
      if (enter === 'pop') { const s = Math.max(0, E.back(prog(t, t0, t0 + 0.4))); tf = `translate(${cx} ${cy}) scale(${s.toFixed(3)}) translate(${-cx} ${-cy})`; }
      else if (enter === 'up') tf = `translate(0 ${((1 - bk) * 70).toFixed(1)})`;
      else if (enter === 'd') tf = `translate(0 ${(-(1 - bk) * 70).toFixed(1)})`;
      else if (enter === 'l') tf = `translate(${(-(1 - bk) * 360).toFixed(1)} 0)`;
      else if (enter === 'r') tf = `translate(${((1 - bk) * 360).toFixed(1)} 0)`;
      else if (enter === 'fade') op = E.inOut(prog(t, t0, t0 + 0.5));
      else op = 1;
      op *= 1 - E.inOut(prog(t, t1 - 0.3, t1));
      outer.setAttribute('transform', tf);
      outer.setAttribute('opacity', op.toFixed(3));
      const w = (t / 3.2 + phase) * 2 * Math.PI;
      let id = '';
      if (idle === 'bob') id = `translate(0 ${(6 * amp * Math.sin(w)).toFixed(2)}) rotate(${(1.2 * amp * Math.sin(w * 0.7)).toFixed(2)} ${cx} ${cy})`;
      else if (idle === 'breathe' || idle === 'shake') {
        const s = 1 + 0.018 * amp * Math.sin((t / 2.6 + phase) * 2 * Math.PI);
        let r = 0;
        if (idle === 'shake' && t > t0 + 0.3) r = 6 * Math.sin((t - t0) * 38) * Math.exp(-(t - t0 - 0.3) * 4);
        id = `translate(${cx} ${cy}) rotate(${r.toFixed(2)}) scale(${s.toFixed(4)}) translate(${-cx} ${-cy})`;
      }
      inner.setAttribute('transform', id);
      if (draw) draw(t, a, b);
    },
  };
  if (CUR) CUR.push(it);
  return it;
}
// Register a plain draw function on the current scene.
const anim = f => { if (CUR) CUR.push({ draw: f }); };

// A drawn still in a rounded frame: push-in AND pan from `from` to `to` (fractions of the image) over
// the scene, so the camera visibly travels. base > 1 leaves room to pan from the first frame.
function Shot(svg, href, { x, y, w, h, iw, ih, r = 28, from = [0.5, 0.5], to = [0.5, 0.45], zoom = 0.16, base = 1.06 }) {
  const id = 'clip' + Math.random().toString(36).slice(2);
  const g = el('g', {}, svg);
  el('rect', { x: x + 12, y: y + 14, width: w, height: h, rx: r, fill: C.ink }, g);
  const cp = el('clipPath', { id }, g);
  el('rect', { x, y, width: w, height: h, rx: r }, cp);
  const inner = el('g', { 'clip-path': `url(#${id})` }, g);
  const s0 = Math.max(w / iw, h / ih);
  const img = el('image', { href, width: iw, height: ih, preserveAspectRatio: 'none' }, inner);
  el('rect', { x, y, width: w, height: h, rx: r, fill: 'none', stroke: C.ink, 'stroke-width': 7 }, g);
  return {
    g, inner,
    draw(t, a, b) {
      const u = E.inOut(prog(t, a, b));
      const s = s0 * (base + zoom * u), dw = iw * s, dh = ih * s;
      const fx = lerp(from[0], to[0], u), fy = lerp(from[1], to[1], u);
      const ix = clamp(x + w / 2 - fx * dw, x + w - dw, x), iy = clamp(y + h / 2 - fy * dh, y + h - dh, y);
      set(img, { x: ix.toFixed(1), y: iy.toFixed(1), width: dw.toFixed(1), height: dh.toFixed(1) });
    },
  };
}
const BOX = {
  full: { x: 210, y: 60, w: 1500, h: 900 },
  left: { x: 70, y: 150, w: 1110, h: 700 },
  right: { x: 740, y: 150, w: 1110, h: 700 },
  wide: { x: 60, y: 50, w: 1800, h: 980 },
};
// Scene panel as the scene's main picture (pans over the scene's own a..b).
function pan(g, n, layout = 'full', o = {}) {
  const b = typeof layout === 'string' ? BOX[layout] : layout;
  const st = Shot(g, src(n), { ...b, iw: SZ[n][0], ih: SZ[n][1], ...o });
  if (CUR) CUR.push({ draw: (t, a, bb) => st.draw(t, o.a ?? a, o.b ?? bb) });
  return st;
}
// Smaller framed panel that pops in at t0 (and keeps panning).
function tile(g, n, t0, { x, y, w = 560, h = 370, label = '', t1 = 1e9, enter = 'pop', from, to, zoom = 0.12 } = {}) {
  const L = Live(g, { t0, t1, cx: x + w / 2, cy: y + h / 2, enter, idle: 'none' });
  const st = Shot(L.g, src(n), { x, y, w, h, iw: SZ[n][0], ih: SZ[n][1], zoom, from: from || [0.5, 0.5], to: to || [0.5, 0.42] });
  if (label) Chip(L.g, label, { cx: x + w / 2, cy: y + h + 8, size: 34, fill: C.ink, color: C.white });
  if (CUR) CUR.push({ draw: (t, a, b) => st.draw(t, t0, Math.max(b, t0 + 6)) });
  return L;
}
// Cut-out drawing that pops in at t0 and bobs.
function obj(g, n, t0, { cx, cy, fit = 300, enter = 'pop', idle = 'bob', t1 = 1e9, phase = 0, amp = 1 } = {}) {
  const L = Live(g, { t0, t1, cx, cy, enter, idle, phase, amp });
  Cutout(L.g, src(n), { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit });
  return L;
}
// Captions, chips and check/cross marks with entrance + idle.
function cap(g, s, t0, { cy = 965, size = 56, hi = '', hiColor, t1 = 1e9, cx = 960, fill } = {}) {
  const L = Live(g, { t0, t1, cx, cy, enter: 'up', idle: 'breathe' });
  Caption(L.g, s, { cx, cy, size, hi, hiColor: hiColor || C.amber, fill: fill || C.ink });
  return L;
}
function chip(g, s, t0, { cx = 960, cy = 540, size = 44, fill = C.white, color = C.ink, t1 = 1e9, enter = 'pop', phase = 0 } = {}) {
  const L = Live(g, { t0, t1, cx, cy, enter, idle: 'breathe', phase });
  Chip(L.g, s, { cx, cy, size, fill, color });
  return L;
}
function mark(g, s, ok, t0, { cx = 960, cy = 540, size = 44, t1 = 1e9, enter = 'pop' } = {}) {
  const L = Live(g, { t0, t1, cx, cy, enter, idle: ok ? 'breathe' : 'shake' });
  Mark(L.g, s, ok, { cx, cy, size });
  return L;
}
function stamp(g, s, t0, { cx = 960, cy = 540, size = 80, color = C.red, rot = -8 } = {}) {
  const L = Live(g, { t0, cx, cy, enter: 'none', idle: 'shake' });
  const st = Stamp(L.g, s, { cx, cy, size, color, rot });
  anim(t => st.draw(t, t0));
  return L;
}
function source(g, s, t0, { y = 1050 } = {}) {
  const L = Live(g, { t0, enter: 'fade', idle: 'none' });
  Text(L.g, s, { x: 960, y, size: 26, weight: 700, color: '#7A7468' });
  return L;
}
// Small tag in the top-left corner ("DRAMATIZACIÓN").
function tag(g, s, t0, { x = 60, y = 40 } = {}) {
  const L = Live(g, { t0, cx: x + 150, cy: y + 30, enter: 'l', idle: 'none' });
  const w = s.length * 19 + 50;
  Card(L.g, { x, y, w, h: 62, fill: C.ink, r: 31 });
  Text(L.g, s, { x: x + w / 2, y: y + 33, size: 30, color: C.amber });
  return L;
}

// Section kicker: amber tag + one or two title lines, slides up.
function kicker(g, tagText, title, t0, { y = 860 } = {}) {
  const lines = title.split('\n');
  const w = Math.max(tagText.length * 30 + 80, ...lines.map(s => s.length * 40 + 110));
  const h = 120 + lines.length * 66, top = y - h / 2 - (lines.length - 1) * 30;
  const L = Live(g, { t0, cx: 960, cy: top + h / 2, enter: 'up', idle: 'breathe', amp: 0.5 });
  Card(L.g, { x: 960 - w / 2, y: top, w, h, fill: C.ink, r: 30 });
  Text(L.g, tagText, { x: 960, y: top + 52, size: 40, color: C.amber });
  lines.forEach((s, i) => Text(L.g, s, { x: 960, y: top + 120 + i * 66, size: 58, color: C.cream }));
  return L;
}
// Warning card (red header + lines), slides up and its header pulses gently.
function warn(g, head, lines, t0, { y = 200, w = 1400, size = 48 } = {}) {
  const h = 160 + lines.length * size * 1.75;
  const L = Live(g, { t0, cx: 960, cy: y + h / 2, enter: 'up', idle: 'breathe', amp: 0.4 });
  Card(L.g, { x: 960 - w / 2, y, w, h, fill: C.white });
  const hd = el('rect', { x: 960 - w / 2, y, width: w, height: 110, rx: 22, fill: C.red }, L.g);
  Text(L.g, head, { x: 960, y: y + 57, size: 52, color: C.white });
  lines.forEach((s, i) => Text(L.g, s, { x: 960, y: y + 165 + i * size * 1.75, size }));
  anim(t => set(hd, { opacity: 0.85 + 0.15 * Math.sin(t * 4) }));
  return L;
}
// Pill chip (static drawing; animate through Live).
function Chip(g, s, { cx, cy, fill = C.white, color = C.ink, size = 44 }) {
  const c = el('g', {}, g);
  const w = s.length * size * 0.64 + 70;
  Card(c, { x: cx - w / 2, y: cy - size, w, h: size * 2, fill, r: size });
  Text(c, s, { x: cx, y: cy + 2, size, color });
  return c;
}
function Mark(g, s, ok, { cx, cy, size = 44 }) {
  const c = el('g', {}, g);
  const tw = s.length * size * 0.7, w = tw + size * 2 + 60;
  Card(c, { x: cx - w / 2, y: cy - size, w, h: size * 2, fill: C.white, r: size });
  (ok ? Icon.check : Icon.cross)(c, cx - w / 2 + 14, cy - size + 8, (size * 2 - 16) / 100);
  Text(c, s, { x: cx - w / 2 + size * 2 + 20 + tw / 2, y: cy + 2, size });
  return c;
}
function Arrow(g, x1, y1, x2, y2, color = C.orange, w = 14) {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 34;
  return el('path', { d: `M${x1} ${y1} L${x2} ${y2} M${x2 - hl * Math.cos(a - 0.5)} ${y2 - hl * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - hl * Math.cos(a + 0.5)} ${y2 - hl * Math.sin(a + 0.5)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
}
// Arrow that draws itself from t0 (dash animation) and then pulses.
function arrow(g, x1, y1, x2, y2, t0, { color = C.orange, w = 14, t1 = 1e9 } = {}) {
  const L = Live(g, { t0, t1, cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, enter: 'none', idle: 'breathe' });
  const p = Arrow(L.g, x1, y1, x2, y2, color, w);
  const len = Math.hypot(x2 - x1, y2 - y1) + 80;
  set(p, { 'stroke-dasharray': len + ' ' + len });
  anim(t => set(p, { 'stroke-dashoffset': (len * (1 - E.out(prog(t, t0, t0 + 0.5)))).toFixed(1) }));
  return L;
}
// Dots travelling along a path d (blood cells, sugar, signals). shape: 'cell' | 'dot' | 'cube'.
function flow(g, d, t0, { n = 8, color = BLOOD, r = 13, period = 3, t1 = 1e9, shape = 'cell', line = null } = {}) {
  const L = Live(g, { t0, t1, enter: 'fade', idle: 'none' });
  const p = el('path', { d, fill: 'none', stroke: line || 'none', 'stroke-width': 10, 'stroke-dasharray': '4 22', 'stroke-linecap': 'round', opacity: 0.45 }, L.g);
  const len = p.getTotalLength();
  const dots = [];
  for (let i = 0; i < n; i++) {
    const e = shape === 'cube'
      ? el('rect', { width: r * 2, height: r * 2, rx: 4, fill: C.amber, stroke: C.ink, 'stroke-width': 4 }, L.g)
      : el('ellipse', { rx: r, ry: shape === 'cell' ? r * 0.7 : r, fill: color, stroke: C.ink, 'stroke-width': shape === 'cell' ? 3 : 0 }, L.g);
    dots.push(e);
  }
  const it = { speed: 1 };
  anim(t => {
    dots.forEach((e, i) => {
      const f = (((t - t0) * it.speed / period + i / n) % 1 + 1) % 1, q = p.getPointAtLength(f * len);
      const fadeEnds = Math.min(1, f * 8, (1 - f) * 8);
      if (shape === 'cube') set(e, { x: q.x - r, y: q.y - r, opacity: fadeEnds, transform: `rotate(${(t * 40 + i * 30) % 360} ${q.x} ${q.y})` });
      else set(e, { cx: q.x, cy: q.y, opacity: fadeEnds });
    });
  });
  return Object.assign(L, it);
}

// ---------------------------------------------------------------- seated heel raise (pose sheet)
// pose_0 sitting · pose_1 heels rising · pose_2 heels up (hold) · pose_3 lowered, relaxed.
// One rep: rest → rise → hold → lower → rest (period s). Calf glows while the heels are up; a small
// arrow at the heel shows up / down. Returns the Live wrapper.
const POSE = { arrow: [395, 655], calf: [290, 600] };   // pixel spots in the pose crops (409x773)
function heelRaise(g, t0, { cx = 960, floor = 1000, h = 860, t1 = 1e9, period = 5, start = 0, glow = true, arrows = true, fixed = null, enter = 'fade' } = {}) {
  const [iw, ih] = SZ.pose_0, s = h / ih, w = iw * s, x = cx - w / 2, y = floor - h;
  const L = Live(g, { t0, t1, cx, cy: floor - h / 2, enter, idle: 'none' });
  const ims = [0, 1, 2, 3].map(i => el('image', { href: src('pose_' + i), x, y, width: w, height: h, opacity: 0 }, L.g));
  const gl = el('ellipse', { cx: x + POSE.calf[0] * s, cy: y + POSE.calf[1] * s, rx: 32 * s, ry: 72 * s, fill: '#FF3B1F', opacity: 0, style: 'mix-blend-mode:multiply' }, L.g);
  const ar = el('g', {}, L.g);
  Arrow(ar, 0, 40, 0, -40, C.orange, 12);
  const hx = x + POSE.arrow[0] * s, hy = y + POSE.arrow[1] * s;
  const it = { phase: 0 };
  anim(t => {
    const fx = typeof fixed === 'function' ? fixed(t) : fixed;
    const r = fx != null ? fx : ((t - t0 + start) % period + period) % period / period;
    // 0–.18 rest, .18–.34 rise, .34–.62 hold, .62–.80 lower, .80–1 rest (relaxed face)
    let i = 0, up = 0, dir = 0;
    if (fx != null && fx >= 10) { i = fx - 10; up = i === 1 || i === 2 ? 1 : 0; }
    else if (r < 0.18) i = 0;
    else if (r < 0.34) { i = 1; up = (r - 0.18) / 0.16; dir = 1; }
    else if (r < 0.62) { i = 2; up = 1; }
    else if (r < 0.80) { i = 1; up = 1 - (r - 0.62) / 0.18; dir = -1; }
    else i = 3;
    ims.forEach((im, j) => im.setAttribute('opacity', j === i ? 1 : 0));
    it.phase = i;
    if (glow) set(gl, { opacity: (0.45 * up * (0.75 + 0.25 * Math.sin(t * 9))).toFixed(3) });
    const show = arrows && dir !== 0;
    set(ar, { opacity: show ? 1 : 0, transform: `translate(${hx} ${hy - (dir > 0 ? up : 1 - up) * 30 * dir}) rotate(${dir < 0 ? 180 : 0}) scale(${s * 1.6})` });
  });
  return Object.assign(L, it, { x, y, w, h, s });
}

// ---------------------------------------------------------------- calf muscle pump (code diagram)
// A lower leg in cut-away: deep vein in the middle with two one-way valves, a calf muscle on each side.
// mode 'active': the muscles squeeze every `beat` s, the vein narrows, valves open, cells jump up.
// mode 'idle': nothing squeezes, cells barely drift. setMode(t, mode) can switch at a time.
function CalfPump(g, t0, { cx = 960, cy = 540, s = 1, mode = 'active', switchAt = 1e9, switchTo = 'active', beat = 1.8, label = true } = {}) {
  const L = Live(g, { t0, cx, cy, enter: 'pop', idle: 'none' });
  const root = el('g', { transform: `translate(${cx} ${cy}) scale(${s})` }, L.g);
  el('path', { d: 'M-150 -400 C-185 -200 -205 -60 -175 120 C-150 260 -105 340 -95 420 L95 420 C105 340 150 260 175 120 C205 -60 185 -200 150 -400 Z', fill: SKIN, stroke: C.ink, 'stroke-width': 8 }, root);
  const mL = el('ellipse', { cx: -82, cy: -20, rx: 62, ry: 230, fill: MUSCLE, stroke: C.ink, 'stroke-width': 6 }, root);
  const mR = el('ellipse', { cx: 82, cy: -20, rx: 62, ry: 230, fill: MUSCLE, stroke: C.ink, 'stroke-width': 6 }, root);
  const fib = el('g', { stroke: '#A93A30', 'stroke-width': 3, opacity: 0.6 }, root);
  for (const sx of [-1, 1]) for (let k = -2; k <= 2; k++) el('path', { d: `M${sx * 82 + k * 14} -210 Q${sx * 82 + k * 20} -20 ${sx * 82 + k * 14} 170`, fill: 'none' }, fib);
  const vein = el('path', { fill: '#6E8FE0', stroke: C.ink, 'stroke-width': 6 }, root);
  const valves = [-170, 120].map(vy => {
    const a = el('path', { fill: 'none', stroke: C.white, 'stroke-width': 7, 'stroke-linecap': 'round' }, root);
    return { vy, a };
  });
  const cells = [];
  for (let i = 0; i < 9; i++) cells.push(el('ellipse', { rx: 15, ry: 10, fill: BLOOD, stroke: C.ink, 'stroke-width': 3 }, root));
  const arrs = el('g', { opacity: 0 }, root);
  Arrow(arrs, -235, 120, -235, -180, C.orange, 12); Arrow(arrs, 235, 120, 235, -180, C.orange, 12);
  const heart = el('g', {}, root);
  Icon.heart(heart, -45, -540, 0.9);
  const lab = el('g', {}, root);
  if (label) {
    Chip(lab, 'VENA', { cx: 0, cy: 480, size: 30, fill: C.white });
  }
  const it = {
    squeeze: 0,
    draw(t) {
      const m = t >= switchAt ? switchTo : mode;
      const active = m === 'active';
      const ph = ((t - t0) % beat + beat) % beat / beat;
      const q = active ? Math.pow(Math.sin(Math.PI * clamp(ph / 0.55)), 2) : 0;   // contraction 0..1
      it.squeeze = q;
      set(mL, { rx: 62 + 18 * q, cx: -82 + 6 * q }); set(mR, { rx: 62 + 18 * q, cx: 82 - 6 * q });
      // vein: width narrows in the middle while the muscles squeeze
      const W = y => 30 * (1 - 0.5 * q * Math.exp(-(((y + 20) / 170) ** 2)));
      let dl = '', dr = '';
      for (let y = -400; y <= 420; y += 20) { dl += (y === -400 ? 'M' : 'L') + (-W(y)).toFixed(1) + ' ' + y; }
      for (let y = 420; y >= -400; y -= 20) { dr += 'L' + W(y).toFixed(1) + ' ' + y; }
      set(vein, { d: dl + dr + 'Z' });
      // valves: open (flaps up, apart) while blood moves up, closed (V meeting in the middle) otherwise
      const open = active ? clamp(q * 1.6) : 0;
      for (const v of valves) {
        const w = W(v.vy), gap = 4 + 18 * open, tip = v.vy - 26 - 10 * open;
        set(v.a, { d: `M${-w + 2} ${v.vy} L${-gap / 2} ${tip} M${w - 2} ${v.vy} L${gap / 2} ${tip}` });
      }
      // cells: cumulative upward travel, pulsed with each squeeze (idle = slow drift)
      const k = Math.floor((t - t0) / beat);
      const d = active ? 150 * (k + E.inOut(clamp(ph / 0.6))) : 8 * (t - t0);
      cells.forEach((c, i) => {
        const y = 420 - ((i * 92 + d) % 820 + 820) % 820;
        const x = 8 * Math.sin(i * 2.1 + t);
        set(c, { cx: x.toFixed(1), cy: y.toFixed(1), opacity: Math.min(1, (420 - y) / 60, (y + 400) / 60) });
      });
      set(arrs, { opacity: active ? 0.4 + 0.6 * q : 0 });
      const hb = 1 + 0.08 * Math.pow(Math.sin(Math.PI * (((t - t0) % 0.9) / 0.9)), 6);
      heart.setAttribute('transform', `translate(0 -495) scale(${hb.toFixed(3)}) translate(0 495)`);
    },
  };
  if (CUR) CUR.push(it);
  return Object.assign(L, it);
}

// Simple wall timeline bar that fills from 0 to u (for minutes); returns {draw(u)}.
function Bar(g, { x, y, w, h = 56, color = C.green, bg = C.white }) {
  Card(g, { x, y, w, h, fill: bg, r: h / 2 });
  const f = el('rect', { x: x + 6, y: y + 6, height: h - 12, rx: (h - 12) / 2, fill: color }, g);
  return { draw(u) { set(f, { width: Math.max(0, (w - 12) * clamp(u)).toFixed(1) }); } };
}
// Breathing ring: grows on the in-breath, shrinks on the out-breath (period s, in-part ratio).
function Breath(g, t0, { cx, cy, r = 150, period = 8, inPart = 0.4 } = {}) {
  const L = Live(g, { t0, cx, cy, enter: 'pop', idle: 'none' });
  const ring = el('circle', { cx, cy, r, fill: '#BFE3F5', stroke: C.blueDark, 'stroke-width': 10 }, L.g);
  const txt = Text(L.g, 'INSPIRA', { x: cx, y: cy, size: 44, color: C.ink });
  anim(t => {
    const p = ((t - t0) % period + period) % period / period;
    const k = p < inPart ? E.inOut(p / inPart) : 1 - E.inOut((p - inPart) / (1 - inPart));
    set(ring, { r: (r * (0.7 + 0.35 * k)).toFixed(1) });
    txt.textContent = p < inPart ? 'INSPIRA' : 'SUELTA';
  });
  return L;
}

// Question badge that pops in and bobs.
function wrapQ(g, t0, cx, cy, s = 1.4) {
  const L = Live(g, { t0, cx, cy, enter: 'pop', idle: 'bob' });
  Icon.question(L.g, cx - 50 * s, cy - 50 * s, s);
  return L;
}
// Bottom call-to-action pill (subscribe / comment / share), slides up and breathes.
Icon.bell = (p, x, y, s = 1) => {
  const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
  el('path', { d: 'M50 10 C30 10 22 28 22 46 L22 64 L12 76 L88 76 L78 64 L78 46 C78 28 70 10 50 10 Z', fill: C.amber, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('circle', { cx: 50, cy: 86, r: 9, fill: C.amber, stroke: C.ink, 'stroke-width': 6 }, g);
  return g;
};
function CTAlive(g, kind, label, t0, { y = 870 } = {}) {
  const L = Live(g, { t0, cx: 960, cy: y + 65, enter: 'up', idle: 'breathe' });
  const w = 170 + label.length * 34, x = 960 - w / 2;
  Card(L.g, { x, y, w, h: 130, fill: kind === 'sub' ? C.red : C.white, r: 65 });
  if (kind === 'sub') Icon.bell(L.g, x + 30, y + 15, 1); else Icon.bubble(L.g, x + 30, y + 15, 1);
  Text(L.g, label, { x: 960 + 50, y: y + 67, size: 50, color: kind === 'sub' ? C.white : C.ink });
  return L;
}
// Big number that counts up: draw(v) shows v rounded, with an optional suffix.
function CountUp(g, { x, y, size = 200, color = C.ink, suffix = '' }) {
  const n = Text(g, '0', { x, y, size, color });
  return { g: n, draw(v) { n.textContent = Math.round(v).toLocaleString('es-ES') + suffix; } };
}
// Stopwatch ring around a number: draw(sec) fills the ring over `total` seconds.
function Stopwatch(g, { cx, cy, r = 120, total = 2, unit = 's' }) {
  const s = el('g', {}, g);
  el('circle', { cx: cx + 8, cy: cy + 10, r: r + 10, fill: C.ink }, s);
  el('circle', { cx, cy, r, fill: C.white, stroke: C.ink, 'stroke-width': 10 }, s);
  const arc = el('path', { fill: 'none', stroke: C.orange, 'stroke-width': 24, 'stroke-linecap': 'round' }, s);
  const num = Text(s, '0', { x: cx, y: cy, size: r * 0.8 });
  Text(s, unit, { x: cx, y: cy + r * 0.55, size: r * 0.22, weight: 800, color: C.grey });
  return {
    g: s,
    draw(sec) {
      const u = clamp(sec / total), a = u * 2 * Math.PI - 1e-4, rr = r - 28;
      const x = cx + rr * Math.sin(a), y = cy - rr * Math.cos(a);
      set(arc, { d: u <= 0 ? '' : `M${cx} ${cy - rr} A${rr} ${rr} 0 ${u > 0.5 ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)}` });
      num.textContent = String(Math.min(total, Math.floor(sec)));
    },
  };
}
