// Shared pieces for "¿Por qué sigue alta tu tensión?". Needs lib.js, kit.js, sizes.js, cues.js.
// Motion kit from sueno_corazon + sound-effect events: every helper below records its SFX in window.SFX
// ([time, kind]); render_full.sh reads them and soundtrack.py mixes music + SFX under the voice.
// ONE continuous video on one voice timeline (t = seconds into audio/voice_full.mp3).
// Motion rules (owner, Oct 23): same voice-synced timing, more life inside every scene: camera drift +
// pan on every still, everything idles (bob / breathe), entrances pop or slide with overshoot,
// diagrams move (blood cells, sugar, pumping calf). Every element is registered on its scene and drawn
// from t alone, so frames stay deterministic.
// Calmer (owner, Oct 27: pictures swayed too much; there must be still moments): no idle rotation, half
// the bob, and all idle motion breathes in and out on a shared slow gate (~5 s moving, ~5 s still), so
// the whole frame regularly rests. Pans travel less and settle for the last part of each scene.
const CALM = t => { const c = Math.cos(2 * Math.PI * t / 10.5); return E.inOut(clamp(0.5 - c * 0.9)); };
const T = CUE, LEAD = 0.2;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const src = n => { if (!SZ[n]) throw new Error('missing cut ' + n); return 'cut/' + n + '.png'; };
const VEIN = '#3D6FD1', BLOOD = '#C8231B', NIGHT = '#1F2A4A', TEAL = '#2E7D7A';

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
window.SFX = [];
const sfx = (t, kind) => { if (t > 0.5 && t < 1e8) window.SFX.push([+t.toFixed(2), kind]); };
let CUR = null;
function scene(svg, a, b, build, { fade = 0.3, drift = 0.018, punch: pts = [], whoosh = true } = {}) {
  if (whoosh) sfx(a, 'whoosh');
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
      const w = (t / 3.2 + phase) * 2 * Math.PI, g = CALM(t);
      let id = '';
      if (idle === 'bob') id = `translate(0 ${(3 * amp * g * Math.sin(w)).toFixed(2)})`;
      else if (idle === 'breathe' || idle === 'shake') {
        const s = 1 + 0.01 * amp * g * Math.sin((t / 2.6 + phase) * 2 * Math.PI);
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
function Shot(svg, href, { x, y, w, h, iw, ih, r = 28, from = [0.5, 0.5], to = [0.5, 0.45], zoom = 0.09, base = 1.06 }) {
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
      const u = E.inOut(prog(t, a, a + 0.7 * (b - a)));   // travel, then hold still
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
function tile(g, n, t0, { x, y, w = 560, h = 370, label = '', t1 = 1e9, enter = 'pop', from, to, zoom = 0.07 } = {}) {
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
  sfx(t0, ok ? 'pop' : 'thud');
  const L = Live(g, { t0, t1, cx, cy, enter, idle: ok ? 'breathe' : 'shake' });
  Mark(L.g, s, ok, { cx, cy, size });
  return L;
}
function stamp(g, s, t0, { cx = 960, cy = 540, size = 80, color = C.red, rot = -8 } = {}) {
  sfx(t0, 'thud');
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
  sfx(t0, 'chime');
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
function warn(g, head, lines, t0, { y = 200, w = 1400, size = 48, cx = 960 } = {}) {
  sfx(t0, 'alarm');
  const h = 160 + lines.length * size * 1.75;
  const L = Live(g, { t0, cx, cy: y + h / 2, enter: 'up', idle: 'breathe', amp: 0.4 });
  Card(L.g, { x: cx - w / 2, y, w, h, fill: C.white });
  const hd = el('rect', { x: cx - w / 2, y, width: w, height: 110, rx: 22, fill: C.red }, L.g);
  Text(L.g, head, { x: cx, y: y + 57, size: 52, color: C.white });
  lines.forEach((s, i) => Text(L.g, s, { x: cx, y: y + 165 + i * size * 1.75, size }));
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
  sfx(t0, kind === 'sub' ? 'bell' : 'pop');
  const L = Live(g, { t0, cx: 960, cy: y + 65, enter: 'up', idle: 'breathe' });
  const w = 170 + label.length * 34, x = 960 - w / 2;
  Card(L.g, { x, y, w, h: 130, fill: kind === 'sub' ? C.red : C.white, r: 65 });
  if (kind === 'sub') Icon.bell(L.g, x + 30, y + 15, 1); else if (kind === 'like') Icon.heart(L.g, x + 30, y + 15, 1); else Icon.bubble(L.g, x + 30, y + 15, 1);
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

// ---------------------------------------------------------------- sleep & heart diagrams
// Heartbeat pulse on a Live wrapper (period s per beat; k = how much it swells).
function beating(L, cx, cy, { period = 0.85, k = 0.07 } = {}) {
  anim(t => {
    const p = typeof period === 'function' ? period(t) : period;
    const b = 1 + k * Math.pow(Math.sin(Math.PI * ((((t % p) + p) % p) / p)), 8);
    L.g.setAttribute('transform', `translate(${cx} ${cy}) scale(${b.toFixed(4)}) translate(${-cx} ${-cy})`);
  });
  return L;
}
function heart(g, t0, cx, cy, fit, o = {}) {
  return beating(obj(g, 'corazon', t0, { cx, cy, fit, idle: 'none', enter: o.enter || 'pop' }), cx, cy, o);
}

// Scrolling ECG strip on a dark monitor. bpm(t) may change over time (night → slower); irregular adds
// AF-like jitter. Shows the current rate as "NN lpm".
function ECG(g, t0, { x, y, w, h = 170, bpm = () => 72, color = '#FF5A4E', irregular = false, label = true } = {}) {
  const L = Live(g, { t0, cx: x + w / 2, cy: y + h / 2, enter: 'up', idle: 'none' });
  Card(L.g, { x, y, w, h, fill: NIGHT, r: 22 });
  for (let i = 1; i < 6; i++) el('line', { x1: x + i * w / 6, y1: y + 10, x2: x + i * w / 6, y2: y + h - 10, stroke: '#33416B', 'stroke-width': 2 }, L.g);
  const line = el('polyline', { fill: 'none', stroke: color, 'stroke-width': 6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, L.g);
  const num = label ? Text(L.g, '72 lpm', { x: x + w - 20, y: y + 36, size: 34, anchor: 'end', color: '#E8EEF7' }) : null;
  const speed = 220, win = (w - 40) / speed;   // px per s, seconds visible
  const rate = s => bpm(s) / 60 * (irregular ? 1 + 0.45 * Math.sin(s * 2.3) * Math.sin(s * 5.1 + 1) : 1);
  const wave = p => {   // p = 0..1 phase within one beat
    const bump = (c, wd, a) => a * Math.exp(-(((p - c) / wd) ** 2));
    return bump(0.12, 0.035, 0.12) - bump(0.28, 0.012, 0.15) + bump(0.3, 0.012, 1) - bump(0.32, 0.012, 0.3) + bump(0.55, 0.06, 0.25);
  };
  anim(t => {
    if (t < t0) return;
    const tStart = Math.max(t0 - 4, t - win), dt = 0.02;
    let ph = 0;
    for (let s = t0 - 4; s < tStart; s += dt) ph += rate(s) * dt;   // phase at the left edge
    let pts = '';
    for (let s = tStart; s <= t; s += dt) {
      ph += rate(s) * dt;
      const px = x + 20 + (s - (t - win)) * speed, py = y + h * 0.62 - wave(ph % 1) * h * 0.5;
      pts += px.toFixed(1) + ',' + py.toFixed(1) + ' ';
    }
    set(line, { points: pts });
    if (num) num.textContent = Math.round(bpm(t)) + ' lpm';
  });
  return L;
}

// 24-hour chart (08:00 → 08:00) with the night shaded. curve(fn, color, t0, t1) draws fn(h) (h = clock
// hour 8..32, value 0..1) progressively between t0 and t1. Returns { L, curve, X, Y }.
function Chart24(g, t0, { x = 300, y = 220, w = 1320, h = 560, label = '' } = {}) {
  const L = Live(g, { t0, cx: x + w / 2, cy: y + h / 2, enter: 'up', idle: 'none' });
  Card(L.g, { x: x - 40, y: y - 60, w: w + 80, h: h + 150, fill: C.white });
  const X = hr => x + (hr - 8) / 24 * w, Y = v => y + h - v * h;
  el('rect', { x: X(23), y, width: X(31) - X(23), height: h, fill: '#DCE3F2' }, L.g);
  Moon(L.g, X(27), y + 45, 60);
  el('circle', { cx: X(15), cy: y + 40, r: 22, fill: C.amber, stroke: C.ink, 'stroke-width': 4 }, L.g);
  el('path', { d: `M${x} ${y} L${x} ${y + h} L${x + w} ${y + h}`, fill: 'none', stroke: C.ink, 'stroke-width': 6 }, L.g);
  [8, 14, 20, 26, 32].forEach(hr => Text(L.g, String(hr % 24).padStart(2, '0') + ':00', { x: X(hr), y: y + h + 36, size: 28, weight: 800 }));
  if (label) Text(L.g, label, { x: x + 10, y: y - 25, size: 32, anchor: 'start' });
  const curve = (fn, color, a, b, { wd = 10, dash = '' } = {}) => {
    let d = '';
    for (let hr = 8; hr <= 32; hr += 0.2) d += (d ? 'L' : 'M') + X(hr).toFixed(1) + ' ' + Y(fn(hr)).toFixed(1);
    const p = el('path', { d, fill: 'none', stroke: color, 'stroke-width': wd, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, L.g);
    const len = p.getTotalLength();
    set(p, { 'stroke-dasharray': dash || len + ' ' + len });
    if (!dash) anim(t => set(p, { 'stroke-dashoffset': (len * (1 - E.inOut(prog(t, a, b)))).toFixed(1) }));
    else anim(t => set(p, { opacity: clamp(prog(t, a, a + 0.6)) }));
    return p;
  };
  return { L, curve, X, Y };
}
// Smooth step between day and night for the curves (1 inside 23:00–07:00).
const nightK = hr => { const s = (a, b, v) => clamp((v - a) / (b - a)); return E.inOut(s(22, 24.5, hr)) * (1 - E.inOut(s(29.5, 31.5, hr))); };
const BP_DIP = hr => 0.72 + 0.03 * Math.sin(hr * 1.7) - 0.26 * nightK(hr);
const BP_FLAT = hr => 0.72 + 0.03 * Math.sin(hr * 1.7) - 0.03 * nightK(hr);
const CORT = hr => { const m = ((hr - 7.5) % 24 + 24) % 24; return 0.12 + 0.78 * Math.exp(-m / 7) * (m < 20 ? 1 : 0) + 0.78 * clamp((m - 20.5) / 3.5) ** 2; };
const CORT_BAD = hr => CORT(hr) + 0.32 * nightK(hr);

// Seesaw: SIMPÁTICO (red, alert) vs PARASIMPÁTICO (blue, rest). tilt(t) in degrees, + = blue side down.
function Seesaw(g, t0, { cx = 960, cy = 600, w = 1100, tilt = () => 0 } = {}) {
  const L = Live(g, { t0, cx, cy, enter: 'up', idle: 'none' });
  el('path', { d: `M${cx - 70} ${cy + 190} L${cx} ${cy + 20} L${cx + 70} ${cy + 190} Z`, fill: C.ink }, L.g);
  const beam = el('g', {}, L.g);
  el('rect', { x: cx - w / 2, y: cy - 14, width: w, height: 28, rx: 14, fill: '#8A6A4A', stroke: C.ink, 'stroke-width': 5 }, beam);
  const pan = (dx, fill, title, sub) => {
    const p = el('g', {}, beam);
    Card(p, { x: cx + dx - 210, y: cy - 190, w: 420, h: 170, fill, r: 26 });
    Text(p, title, { x: cx + dx, y: cy - 130, size: 40, color: C.white });
    Text(p, sub, { x: cx + dx, y: cy - 75, size: 28, weight: 800, color: '#F2EEE6' });
  };
  pan(-w / 2 + 210, '#B5372E', 'SIMPÁTICO', 'alerta · acelera');
  pan(w / 2 - 210, '#2F5F9E', 'PARASIMPÁTICO', 'calma · recupera');
  anim(t => beam.setAttribute('transform', `rotate(${(tilt(t) + 0.8 * Math.sin(t * 1.3)).toFixed(2)} ${cx} ${cy})`));
  return L;
}

// Horizontal blood vessel with cells flowing. narrow(t) 0..1 squeezes the middle; speed(t) scales flow.
function Vessel(g, t0, { x = 160, y = 540, w = 1600, r = 110, narrow = () => 0, speed = () => 1, n = 14, glow = null } = {}) {
  const L = Live(g, { t0, cx: x + w / 2, cy: y, enter: 'fade', idle: 'none' });
  const wall = el('path', { fill: '#E9A79A', stroke: C.ink, 'stroke-width': 6 }, L.g);
  const lumen = el('path', { fill: '#8E1E1A' }, L.g);
  const lining = el('path', { fill: 'none', stroke: glow || '#F6C9BE', 'stroke-width': 7, opacity: 0.9 }, L.g);
  const cells = [];
  for (let i = 0; i < n; i++) cells.push(el('ellipse', { rx: 22, ry: 14, fill: BLOOD, stroke: C.ink, 'stroke-width': 3 }, L.g));
  const R = (px, k) => r * (1 - 0.55 * k * Math.exp(-(((px - x - w / 2) / (w * 0.16)) ** 2)));
  anim(t => {
    const k = clamp(narrow(t)), xs = [];
    for (let px = x; px <= x + w; px += 20) xs.push(px);
    const P = (arr, f) => arr.map((px, i) => (i ? 'L' : 'M') + px + ' ' + f(px).toFixed(1)).join(' ');
    const Q = (arr, f) => arr.map(px => 'L' + px + ' ' + f(px).toFixed(1)).join(' ');
    const rev = xs.slice().reverse();
    set(wall, { d: P(xs, px => y - R(px, k) - 40) + Q(rev, px => y + R(px, k) + 40) + 'Z' });
    set(lumen, { d: P(xs, px => y - R(px, k)) + Q(rev, px => y + R(px, k)) + 'Z' });
    set(lining, { d: P(xs, px => y - R(px, k)) + ' ' + P(xs, px => y + R(px, k)) });
    let dist = 0;
    for (let s = t0; s < t; s += 0.05) dist += 160 * speed(s) * 0.05;   // deterministic flow distance
    cells.forEach((c, i) => {
      const px = x + ((i * (w / n) + dist) % w), rr = R(px, k);
      set(c, { cx: px.toFixed(1), cy: (y + Math.sin(i * 2.7) * rr * 0.55).toFixed(1), rx: (22 * Math.min(1, rr / r + 0.2)).toFixed(1) });
    });
  });
  return L;
}

// Night bar 23:00 → 07:00 with red awakening ticks that appear one by one from tA (every gap s).
function NightBar(g, t0, { x = 260, y = 640, w = 1400, h = 90, ticks = [], tA = 1e9, gap = 0.35, label = true } = {}) {
  const L = Live(g, { t0, cx: x + w / 2, cy: y, enter: 'up', idle: 'none' });
  Card(L.g, { x, y, w, h, fill: NIGHT, r: h / 2 });
  Moon(L.g, x + 60, y + h / 2, 60);
  if (label) { Text(L.g, '23:00', { x: x + 40, y: y + h + 34, size: 28, weight: 800 }); Text(L.g, '07:00', { x: x + w - 40, y: y + h + 34, size: 28, weight: 800 }); }
  const marks = ticks.map(f => el('rect', { x: x + 110 + f * (w - 160), y: y + 12, width: 14, height: h - 24, rx: 7, fill: '#FF5A4E', opacity: 0 }, L.g));
  anim(t => marks.forEach((m, i) => { const k = clamp(prog(t, tA + i * gap, tA + i * gap + 0.2)); set(m, { opacity: k, transform: `translate(0 ${(1 - k) * -20})` }); }));
  return L;
}

// Needle gauge (green → amber → red); draw(v 0..1).
function Gauge(g, { cx, cy, r = 230, label = '' }) {
  const s = el('g', {}, g);
  const arc = (a0, a1, col) => {
    const p = a => [cx - r * Math.cos(a), cy - r * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    el('path', { d: `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`, fill: 'none', stroke: col, 'stroke-width': 50 }, s);
  };
  arc(0, Math.PI / 3, C.green); arc(Math.PI / 3, 2 * Math.PI / 3, C.amber); arc(2 * Math.PI / 3, Math.PI, C.red);
  const nd = el('line', { x1: cx, y1: cy, stroke: C.ink, 'stroke-width': 16, 'stroke-linecap': 'round' }, s);
  el('circle', { cx, cy, r: 24, fill: C.ink }, s);
  if (label) Text(s, label, { x: cx, y: cy + 80, size: 42 });
  return { g: s, draw(v) { const a = clamp(v) * Math.PI; set(nd, { x2: cx - (r - 40) * Math.cos(a), y2: cy - (r - 40) * Math.sin(a) }); } };
}
function gauge(g, t0, o, v) {
  const ga = Gauge(g, o);
  const L = Live(g, { t0, cx: o.cx, cy: o.cy - 80, enter: 'pop', idle: 'none' });
  L.g.appendChild(ga.g);
  anim(t => ga.draw(v(t) + 0.015 * Math.sin(t * 9)));
  return L;
}

// Slow-breathing loop from the pose sheet: breath_1 = in (4 s), breath_2 = out (6 s). A ring next to the
// belly grows on the in-breath and the seconds are counted. fixed = 0..3 shows one pose.
function breathing(g, t0, { cx = 700, cy = 560, h = 620, inS = 4, outS = 6, fixed = null, counter = true, enter = 'fade' } = {}) {
  const [iw, ih] = SZ.breath_0, s = h / ih, w = iw * s, x = cx - w / 2, y = cy - h / 2;
  const L = Live(g, { t0, cx, cy, enter, idle: 'none' });
  const ims = [0, 1, 2, 3].map(i => el('image', { href: src('breath_' + i), x, y, width: w, height: h, opacity: 0 }, L.g));
  const ring = el('circle', { cx: x + 0.6 * w, cy: y + 0.5 * h, r: 40, fill: '#7FB6E6', opacity: 0, style: 'mix-blend-mode:multiply' }, L.g);
  const cnt = el('g', {}, L.g);
  const cc = el('circle', { cx: x + w + 190, cy: y + 0.35 * h, r: 95, fill: C.white, stroke: C.blueDark, 'stroke-width': 10 }, cnt);
  const n = Text(cnt, '1', { x: x + w + 190, y: y + 0.35 * h - 8, size: 80, color: C.ink });
  const lb = Text(cnt, 'INSPIRA', { x: x + w + 190, y: y + 0.35 * h + 50, size: 26, color: C.blueDark });
  anim(t => {
    const fx = typeof fixed === 'function' ? fixed(t) : fixed;
    const per = inS + outS, q = (((t - t0) % per) + per) % per, inhale = q < inS;
    const i = fx != null ? fx : inhale ? 1 : 2;
    ims.forEach((im, j) => im.setAttribute('opacity', j === i ? 1 : 0));
    const k = inhale ? E.inOut(q / inS) : 1 - E.inOut((q - inS) / outS);
    set(ring, { r: (30 + 45 * k).toFixed(1), opacity: fx != null ? 0 : (0.25 + 0.25 * k).toFixed(3) });
    set(cnt, { opacity: counter && fx == null ? 1 : 0 });
    n.textContent = String(1 + Math.floor(inhale ? q : q - inS));
    lb.textContent = inhale ? 'INSPIRA' : 'SUELTA';
    set(cc, { stroke: inhale ? C.blueDark : TEAL });
  });
  return Object.assign(L, { x, y, w, h });
}

// ---------------------------------------------------------------- blood-pressure video pieces
// Home BP monitor drawn in code: the reading counts up from 0 at t0 (sys/dia, pulse optional).
// tone: 'high' red digits, 'ok' green, 'grey' neutral. Returns Live.
function Monitor(g, t0, { cx = 960, cy = 520, s = 1, sys = 155, dia = 95, pulse = null, tone = 'high', count = 1.6, t1 = 1e9 } = {}) {
  const L = Live(g, { t0, t1, cx, cy, enter: 'pop', idle: 'bob', amp: 0.4 });
  const r = el('g', { transform: `translate(${cx} ${cy}) scale(${s})` }, L.g);
  Card(r, { x: -260, y: -210, w: 520, h: 420, fill: '#F2F2F0', r: 50 });
  el('rect', { x: -200, y: -160, width: 400, height: 250, rx: 22, fill: '#C9D6C2', stroke: C.ink, 'stroke-width': 6 }, r);
  const col = tone === 'high' ? '#B5372E' : tone === 'ok' ? '#2E7D4F' : C.ink;
  const a = Text(r, '0', { x: 60, y: -95, size: 96, color: col, anchor: 'end' });
  const b = Text(r, '0', { x: 60, y: 10, size: 96, color: col, anchor: 'end' });
  Text(r, 'SYS', { x: 90, y: -95, size: 28, anchor: 'start', color: '#56604F' });
  Text(r, 'DIA', { x: 90, y: 10, size: 28, anchor: 'start', color: '#56604F' });
  const p = pulse ? Text(r, '♥ 0', { x: 0, y: 65, size: 34, color: '#56604F' }) : null;
  el('circle', { cx: 0, cy: 150, r: 34, fill: '#8A9BB0', stroke: C.ink, 'stroke-width': 5 }, r);
  sfx(t0 + count, tone === 'high' ? 'thud' : 'pop');
  anim(t => {
    const u = E.out(prog(t, t0 + 0.2, t0 + count));
    a.textContent = Math.round(sys * u); b.textContent = Math.round(dia * u);
    if (p) p.textContent = '♥ ' + Math.round(pulse * u);
    const blink = t > t0 + count && tone === 'high' ? 0.75 + 0.25 * Math.sin(t * 8) : 1;
    a.setAttribute('opacity', blink); b.setAttribute('opacity', blink);
  });
  return L;
}
// 7-day log: rows = days, two columns (mañana / noche), cells tick in one by one from t0 over dur.
function LogTable(g, t0, { x = 560, y = 230, dur = 4, rows = 7 } = {}) {
  const L = Live(g, { t0, cx: x + 400, cy: y + 300, enter: 'up', idle: 'none' });
  Card(L.g, { x, y, w: 800, h: 110 + rows * 66, fill: C.white });
  Text(L.g, 'DÍA', { x: x + 90, y: y + 52, size: 32 });
  Text(L.g, 'MAÑANA', { x: x + 340, y: y + 52, size: 32, color: '#2F5F9E' });
  Text(L.g, 'NOCHE', { x: x + 620, y: y + 52, size: 32, color: NIGHT });
  const cells = [];
  for (let r = 0; r < rows; r++) {
    Text(L.g, String(r + 1), { x: x + 90, y: y + 120 + r * 66, size: 32, weight: 800 });
    for (const cx of [x + 340, x + 620]) {
      const c = el('g', { opacity: 0 }, L.g);
      Text(c, '✓ ✓', { x: cx, y: y + 120 + r * 66, size: 34, color: C.green });
      cells.push(c);
    }
  }
  anim(t => cells.forEach((c, i) => c.setAttribute('opacity', clamp(prog(t, t0 + 0.5 + i * dur / cells.length, t0 + 0.7 + i * dur / cells.length)))));
  return L;
}
// Nutrition label (code-drawn, Spanish): highlights the salt line; threshold chip appears at tHi.
function SaltLabel(g, t0, { x = 1180, y = 200, tHi = 1e9, salt = '1,8 g' } = {}) {
  const L = Live(g, { t0, cx: x + 300, cy: y + 300, enter: 'r', idle: 'bob', amp: 0.3 });
  Card(L.g, { x, y, w: 600, h: 560, fill: C.white, r: 16 });
  Text(L.g, 'INFORMACIÓN NUTRICIONAL', { x: x + 300, y: y + 50, size: 30 });
  Text(L.g, 'por 100 g', { x: x + 300, y: y + 92, size: 24, weight: 700, color: C.grey });
  const rows = [['Valor energético', '310 kcal'], ['Grasas', '22 g'], ['Hidratos de carbono', '3 g'], ['Proteínas', '24 g'], ['Sal', salt]];
  let hi;
  rows.forEach(([k, v], i) => {
    const yy = y + 160 + i * 78;
    if (k === 'Sal') hi = el('rect', { x: x + 20, y: yy - 34, width: 560, height: 68, rx: 12, fill: C.red, opacity: 0 }, L.g);
    el('line', { x1: x + 30, y1: yy - 39, x2: x + 570, y2: yy - 39, stroke: '#D8D2C4', 'stroke-width': 3 }, L.g);
    Text(L.g, k, { x: x + 40, y: yy, size: 32, weight: 800, anchor: 'start' });
    Text(L.g, v, { x: x + 560, y: yy, size: 32, anchor: 'end' });
  });
  anim(t => set(hi, { opacity: t < tHi ? 0 : 0.25 + 0.12 * Math.sin(t * 5) }));
  return L;
}

// Code-drawn crescent moon (no cut-out needed) centred at (cx, cy), size ≈ fit px.
function Moon(g, cx, cy, fit) {
  const r = fit * 0.45, m = el('g', {}, g);
  const id = 'moon' + Math.random().toString(36).slice(2);
  const mk = el('mask', { id }, m);
  el('rect', { x: cx - r - 2, y: cy - r - 2, width: 2 * r + 4, height: 2 * r + 4, fill: 'white' }, mk);
  el('circle', { cx: cx + r * 0.45, cy: cy - r * 0.25, r: r * 0.85, fill: 'black' }, mk);
  el('circle', { cx, cy, r, fill: '#F2E6B8', stroke: C.ink, 'stroke-width': 4, mask: `url(#${id})` }, m);
  return m;
}
