// Building blocks for explainer videos made of real drawings + code infographics. Needs lib.js.
// Every function returns an object with a draw(t, ...) or is a pure helper; nothing animates on its own.

// Scene group visibility: fade + tiny settle between a and b (seconds).
function sceneVis(g, t, a, b, fade = 0.35) {
  const k = E.inOut(prog(t, a, a + fade)) * (1 - E.inOut(prog(t, b - fade, b)));
  g.style.display = k > 0.001 ? '' : 'none';
  g.setAttribute('opacity', k.toFixed(3));
  return k;
}

// A drawn still (scene panel) in a rounded frame with a slow push-in (Ken Burns), never warped.
// focus = [fx, fy] in 0..1 of the image: the point the camera drifts toward.
function Still(svg, href, { x, y, w, h, iw, ih, r = 28, focus = [0.5, 0.45], zoom = 0.08 }) {
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
    g,
    draw(t, a, b) {
      const u = E.inOut(prog(t, a, b));
      const s = s0 * (1 + zoom * u);
      const dw = iw * s, dh = ih * s;
      // keep the focus point drifting toward the frame centre, clamped so no edge shows
      const cx = x + w / 2 - (focus[0] - 0.5) * (dw - w) * u, cy = y + h / 2 - (focus[1] - 0.5) * (dh - h) * u;
      const ix = clamp(cx - dw / 2, x + w - dw, x), iy = clamp(cy - dh / 2, y + h - dh, y);
      set(img, { x: ix.toFixed(1), y: iy.toFixed(1), width: dw.toFixed(1), height: dh.toFixed(1) });
    },
  };
}

// Cut-out drawing (transparent PNG) centred at (cx, cy), fitted inside a box of size fit.
function Cutout(svg, href, { cx, cy, iw, ih, fit = 200 }) {
  const g = el('g', {}, svg);
  const s = fit / Math.max(iw, ih);
  el('image', { href, x: cx - iw * s / 2, y: cy - ih * s / 2, width: iw * s, height: ih * s }, g);
  return g;
}

// Organ tile: white rounded card, drawing, label underneath. hi(t-state) highlights it.
function Tile(svg, { x, y, w = 300, h = 250, imgs, label, size = 34 }) {
  const g = el('g', {}, svg);
  const ring = el('rect', { x: x - 12, y: y - 12, width: w + 24, height: h + 24, rx: 34, fill: 'none', stroke: C.red, 'stroke-width': 9, opacity: 0 }, g);
  Card(g, { x, y, w, h, fill: C.white, r: 26 });
  const n = imgs.length, foot = label.includes('\n') ? 84 : 54;   // room for one or two label lines
  imgs.forEach(([href, iw, ih], i) => Cutout(g, href, { cx: x + w * (i + 0.5) / n, cy: y + (h - foot) / 2 + 6, iw, ih, fit: Math.min((w - 40) / n * 1.05, h - foot - 30) }));
  const lines = label.split('\n');   // '\n' in a label → two lines, smaller
  const ls = lines.length > 1 ? size * 0.8 : size;
  const lab = lines.map((s, i) => Text(g, s, { x: x + w / 2, y: y + h - 32 - (lines.length - 1 - i) * ls * 1.05, size: ls, weight: 900 }));
  return { g, ring, lab, cx: x + w / 2, cy: y + h / 2 };
}

// Rubber stamp that slams in at t0 (scale 1.7 → 1 with a small overshoot) and stays.
function Stamp(svg, str, { cx, cy, size = 96, color = C.red, rot = -8 }) {
  const g = el('g', {}, svg);
  const inner = el('g', { transform: `rotate(${rot} ${cx} ${cy})` }, g);
  const w = str.length * size * 0.66 + 70, h = size * 1.5;
  el('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 18, fill: C.cream, stroke: color, 'stroke-width': 12, opacity: 0.96 }, inner);
  Text(inner, str, { x: cx, y: cy + size * 0.04, size, color });
  return {
    g,
    draw(t, t0) {
      const u = prog(t, t0, t0 + 0.28);
      const s = u < 1 ? lerp(1.7, 1, E.out(u)) : 1 + 0.04 * Math.sin(prog(t, t0 + 0.28, t0 + 0.5) * Math.PI);
      g.setAttribute('transform', `translate(${cx} ${cy}) scale(${s.toFixed(3)}) translate(${-cx} ${-cy})`);
      g.setAttribute('opacity', clamp(u * 3).toFixed(3));
    },
  };
}

// Analogue clock; draw(t, hours) with hours as a float (20.5 = 8:30).
function Clock(svg, { cx, cy, r = 90, face = C.white, night = false }) {
  const g = el('g', {}, svg);
  el('circle', { cx: cx + 6, cy: cy + 8, r: r + 6, fill: C.ink }, g);
  el('circle', { cx, cy, r, fill: night ? '#22305A' : face, stroke: C.ink, 'stroke-width': 8 }, g);
  for (let i = 0; i < 12; i++) {
    const a = i * 30 * Math.PI / 180, l = i % 3 ? 0.1 : 0.18;
    el('line', { x1: cx + Math.sin(a) * r * (0.86 - l), y1: cy - Math.cos(a) * r * (0.86 - l), x2: cx + Math.sin(a) * r * 0.86, y2: cy - Math.cos(a) * r * 0.86, stroke: night ? C.cream : C.ink, 'stroke-width': i % 3 ? 4 : 8, 'stroke-linecap': 'round' }, g);
  }
  const hh = el('line', { x1: cx, y1: cy, stroke: night ? C.cream : C.ink, 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
  const mm = el('line', { x1: cx, y1: cy, stroke: C.orange, 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
  el('circle', { cx, cy, r: 10, fill: C.orange, stroke: C.ink, 'stroke-width': 4 }, g);
  return {
    g,
    draw(hours) {
      const ah = (hours % 12) / 12 * 2 * Math.PI, am = (hours % 1) * 2 * Math.PI;
      set(hh, { x2: cx + Math.sin(ah) * r * 0.5, y2: cy - Math.cos(ah) * r * 0.5 });
      set(mm, { x2: cx + Math.sin(am) * r * 0.74, y2: cy - Math.cos(am) * r * 0.74 });
    },
  };
}

// Simple bold icons drawn in a 100x100 box at (x, y) scaled by s. Ink outline, flat fill.
const Icon = {
  check(p, x, y, s = 1, color = C.green) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 50, cy: 50, r: 46, fill: color, stroke: C.ink, 'stroke-width': 7 }, g);
    el('path', { d: 'M28 52 L44 67 L73 35', fill: 'none', stroke: C.white, 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return g;
  },
  cross(p, x, y, s = 1, color = C.red) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 50, cy: 50, r: 46, fill: color, stroke: C.ink, 'stroke-width': 7 }, g);
    el('path', { d: 'M33 33 L67 67 M67 33 L33 67', fill: 'none', stroke: C.white, 'stroke-width': 12, 'stroke-linecap': 'round' }, g);
    return g;
  },
  question(p, x, y, s = 1, color = C.amber) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 50, cy: 50, r: 46, fill: color, stroke: C.ink, 'stroke-width': 7 }, g);
    Text(g, '?', { x: 50, y: 54, size: 70, color: C.ink });
    return g;
  },
  heart(p, x, y, s = 1) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M50 88 C20 66 6 48 10 30 C14 12 38 8 50 26 C62 8 86 12 90 30 C94 48 80 66 50 88 Z', fill: C.red, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
    el('path', { d: 'M18 46 L36 46 L44 32 L54 60 L62 46 L82 46', fill: 'none', stroke: C.white, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return g;
  },
  pill(p, x, y, s = 1) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s}) rotate(-35 50 50)` }, p);
    el('rect', { x: 8, y: 32, width: 84, height: 36, rx: 18, fill: C.white, stroke: C.ink, 'stroke-width': 7 }, g);
    el('path', { d: 'M50 32 L32 32 A18 18 0 0 0 32 68 L50 68 Z', fill: C.orange }, g);
    el('rect', { x: 8, y: 32, width: 84, height: 36, rx: 18, fill: 'none', stroke: C.ink, 'stroke-width': 7 }, g);
    el('line', { x1: 50, y1: 32, x2: 50, y2: 68, stroke: C.ink, 'stroke-width': 6 }, g);
    return g;
  },
  plate(p, x, y, s = 1) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('circle', { cx: 50, cy: 52, r: 40, fill: C.white, stroke: C.ink, 'stroke-width': 7 }, g);
    el('circle', { cx: 50, cy: 52, r: 25, fill: 'none', stroke: C.grey, 'stroke-width': 5 }, g);
    el('path', { d: 'M4 14 L4 40 M0 14 L0 30 M8 14 L8 30 M4 40 L4 92', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none', transform: 'translate(-6 0)' }, g);
    el('path', { d: 'M100 14 C92 26 92 42 100 46 L100 92', stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round', fill: 'none', transform: 'translate(4 0)' }, g);
    return g;
  },
  bubble(p, x, y, s = 1) {
    const g = el('g', { transform: `translate(${x} ${y}) scale(${s})` }, p);
    el('path', { d: 'M14 14 H86 A10 10 0 0 1 96 24 V64 A10 10 0 0 1 86 74 H44 L24 92 L28 74 H14 A10 10 0 0 1 4 64 V24 A10 10 0 0 1 14 14 Z', fill: C.white, stroke: C.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
    for (const cx of [30, 50, 70]) el('circle', { cx, cy: 44, r: 7, fill: C.ink }, g);
    return g;
  },
};

// Day counter chip: "DÍA n" with 7 dots, n = 1 + floor(u * 6.999) as u goes 0..1.
function DayCounter(svg, { x, y, days = 7, label = 'DÍA' }) {
  const g = el('g', {}, svg);
  Card(g, { x, y, w: 470, h: 130, fill: C.white, r: 24 });
  const txt = Text(g, label + ' 1', { x: x + 34, y: y + 52, size: 56, anchor: 'start' });
  const dots = [];
  for (let i = 0; i < days; i++) dots.push(el('circle', { cx: x + 48 + i * 62, cy: y + 103, r: 13, fill: C.ink, opacity: 0.2 }, g));
  return {
    g,
    draw(u) {
      const n = Math.min(days, 1 + Math.floor(clamp(u) * days * 0.9999));
      txt.textContent = `${label} ${n}`;
      dots.forEach((d, i) => set(d, { opacity: i < n ? 1 : 0.2, fill: i < n ? C.orange : C.ink }));
    },
  };
}

// ---------------------------------------------------------------- YouTube motion helpers
// (see references/youtube-style.md). All are pure functions of t, like everything else.

// Hard cut: a scene is fully on between a and b (no fade). Use instead of sceneVis inside the hook.
function cutVis(g, t, a, b) {
  const on = t >= a && t < b;
  g.style.display = on ? '' : 'none';
  g.setAttribute('opacity', on ? 1 : 0);
  return on ? 1 : 0;
}
// Idle life for a cut-out: slow bob + tiny tilt, so nothing on screen is ever frozen.
function float(e, t, cx, cy, { amp = 6, period = 3.2, tilt = 1.2, phase = 0, base = '' } = {}) {
  const w = (t / period + phase) * 2 * Math.PI;
  e.setAttribute('transform', `${base} translate(0 ${(amp * Math.sin(w)).toFixed(2)}) rotate(${(tilt * Math.sin(w * 0.7)).toFixed(2)} ${cx} ${cy})`);
}
// Zoom punch on a key word: whole group scales 1 → 1+k → settles at 1+k/3 (camera "leans in").
function punch(g, t, t0, cx = 960, cy = 540, k = 0.08) {
  const u = prog(t, t0, t0 + 0.18), v = prog(t, t0 + 0.18, t0 + 0.6);
  const s = t < t0 ? 1 : 1 + k * E.out(u) - (k * 2 / 3) * E.inOut(v);
  g.setAttribute('transform', `translate(${cx} ${cy}) scale(${s.toFixed(4)}) translate(${-cx} ${-cy})`);
}
// Slide in from a side (dir 'l','r','u','d') with overshoot; optional exit at t1.
function slideIn(e, t, t0, dir = 'r', dist = 420, t1 = 1e9) {
  const u = E.back(prog(t, t0, t0 + 0.4)), x = 1 - E.inOut(prog(t, t1 - 0.25, t1));
  const d = (1 - u) * dist + (1 - x) * dist;
  const [dx, dy] = { l: [-d, 0], r: [d, 0], u: [0, -d], d: [0, d] }[dir];
  e.setAttribute('transform', `translate(${dx.toFixed(1)} ${dy.toFixed(1)})`);
  e.setAttribute('opacity', clamp(prog(t, t0, t0 + 0.15)) * x);
}
// Key phrase as a caption ON the picture: dark pill, 1–6 words, optional highlighted word.
function Caption(svg, str, { cx = 960, cy = 960, size = 56, hi = '', fill = C.ink, color = C.white, hiColor = C.amber } = {}) {
  const g = el('g', {}, svg);
  const w = str.length * size * 0.62 + 80, h = size * 1.6;
  el('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: h / 2, fill, opacity: 0.92 }, g);
  const t = el('text', { x: cx, y: cy + 2, 'font-size': size, 'font-weight': 900, 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-family': 'Inter', fill: color }, g);
  if (hi && str.includes(hi)) {
    const [a, b] = str.split(hi);
    for (const [s, c] of [[a, color], [hi, hiColor], [b, color]]) if (s) { const sp = el('tspan', { fill: c }, t); sp.textContent = s; }
  } else t.textContent = str;
  return g;
}
