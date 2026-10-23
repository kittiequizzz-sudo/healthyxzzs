// 2D animated explainers for the news style: organs, icons and small diagrams that keep moving while the
// voice explains (GLP-1 leaving the gut, insulin keys leaving the pancreas, a bell that rings, meters,
// calendars, curves). Needs lib.js, kit.js and news.js. Each scene is a pure function of t like the rest.
//
// Organs come from the owner's illustrations when they exist (assets/art/<name>.png, cut out by
// scripts/art.py, listed in window.ART by prep.py); otherwise a simple vector stand-in is drawn, so a scene
// renders either way. Scenes take their inner times as arguments (cue times from the plan).
const A = {
  pink: '#E8857A', pinkDark: '#B8554D', pinkHi: '#F7B3A6', liver: '#8E2F36', liverHi: '#B9464E',
  peach: '#F2A86B', peachDark: '#C9783F', lilac: '#D99AB4', lilacDark: '#A9668A', kidney: '#A33A3A',
  fat: '#F2C14E', muscle: '#C8443C', sugar: '#FFFFFF', blood: '#B3202E', steel: '#9AA3AE',
};
let AUID = 0;
const auid = p => `${p}${++AUID}`;
const defs = () => { const s = document.querySelector('svg'); return s.querySelector('defs') || el('defs', {}, s); };
const frac = x => x - Math.floor(x);
const hash = i => frac(Math.sin(i * 127.1 + 311.7) * 43758.5453);   // deterministic "random" in [0, 1)
const tr = (e, x, y, s = 1, r = 0) => e.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r.toFixed(2)}) scale(${s.toFixed(4)})`);

// ---------------------------------------------------------------- stage pieces
// Navy stage with a slow moving glow and a drifting dot grid, so a diagram never sits on a dead background.
function AnimBG(p, { tint = N.teal, x = 960, y = 560 } = {}) {
  const g = el('g', {}, p), id = auid('abg'), pid = auid('adot');
  el('rect', { width: 1920, height: 1080, fill: N.bg }, g);
  const rg = el('radialGradient', { id }, defs());
  el('stop', { offset: '0%', 'stop-color': tint, 'stop-opacity': 0.24 }, rg);
  el('stop', { offset: '100%', 'stop-color': tint, 'stop-opacity': 0 }, rg);
  const glow = el('ellipse', { cx: x, cy: y, rx: 900, ry: 620, fill: `url(#${id})` }, g);
  const pat = el('pattern', { id: pid, width: 48, height: 48, patternUnits: 'userSpaceOnUse' }, defs());
  el('circle', { cx: 24, cy: 24, r: 2, fill: N.white, opacity: 0.09 }, pat);
  const grid = el('rect', { x: -48, width: 2016, height: 1080, fill: `url(#${pid})` }, g);
  return { g, draw(t) { set(glow, { cx: (x + 140 * Math.sin(t * 0.21)).toFixed(1), cy: (y + 60 * Math.cos(t * 0.17)).toFixed(1) }); set(grid, { transform: `translate(${((t * 8) % 48).toFixed(2)} 0)` }); } };
}
// Gold kicker on top with a red rule that draws itself.
function Kicker(p, text, { y = 130, x = 960, anchor = 'middle', color = N.gold, size = 54 } = {}) {
  const g = el('g', {}, p), inner = el('g', {}, g);
  NT(inner, text.toUpperCase(), { x, y, size, anchor, color, ls: 3 });
  const bar = el('rect', { x, y: y + 46, width: 0, height: 8, fill: N.red }, inner);
  return {
    g,
    draw(t, t0, t1 = 1e9) {
      show(inner, t, t0, t1, { dy: 24 });
      const w = 140 * E.out(prog(t, t0 + 0.15, t0 + 0.6));
      set(bar, { width: w.toFixed(1), x: (anchor === 'middle' ? x - w / 2 : x).toFixed(1) });
    },
  };
}
// Rounded label; the box is measured from the text once the fonts are in.
function Pill(p, text, { x, y, size = 46, color = N.white, fill = N.panel, stroke = null, anchor = 'middle', font = 'H', italic = false } = {}) {
  const g = el('g', {}, p);
  const box = el('rect', { rx: size * 0.5, fill, stroke: stroke || 'none', 'stroke-width': 5 }, g);
  const tx = NT(g, text, { x, y, size, color, anchor, font, italic, ls: font === 'H' ? 1 : 0 });
  let ok = false;
  const fit = () => {
    if (ok) return;
    const w = tw(tx) + size * 1.1, h = size * 1.55;
    const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w + size * 0.55 : x - size * 0.55;
    set(box, { x: x0.toFixed(1), y: (y - h / 2).toFixed(1), width: w.toFixed(1), height: h.toFixed(1) });
    ok = fontsOK();
  };
  return { g, text: tx, draw(t, t0, t1 = 1e9) { fit(); pop(g, t, t0, x, y, t1); } };
}

// ---------------------------------------------------------------- art (owner illustration or stand-in)
// Centered at (x, y), w wide. `fallback(g)` draws the stand-in in a 400-wide box centered on 0,0.
function Art(p, name, { x, y, w = 400, hmax = 1e9 }, fallback) {
  const g = el('g', {}, p), inner = el('g', {}, g);
  const art = (window.ART || {})[name];
  if (art) {
    w = Math.min(w, hmax * art[0] / art[1]);   // tall drawings (vial, phone) fit their slot by height
    const h = w * art[1] / art[0];
    el('image', { href: 'assets/art/' + name + '.png', x: -w / 2, y: -h / 2, width: w, height: h }, inner);
  } else {
    const s = el('g', { transform: `scale(${(w / 400).toFixed(4)})` }, inner);
    fallback(s);
  }
  // breathe: a slow 1.5 % pulse, phase per organ, so the drawing is alive even when nothing else moves
  const ph = hash(name.length * 7.3) * 6;
  return {
    g, x, y, w,
    draw(t, t0, { k = 0.015, rate = 1.3, rot = 0 } = {}) {
      const a = E.back(prog(t, t0, t0 + 0.5));
      tr(g, x, y, Math.max(0.001, a * (1 + k * Math.sin(t * rate + ph))), rot);
      g.setAttribute('opacity', clamp(a * 2).toFixed(3));
    },
  };
}
const organPath = (g, d, fill, dark, hi) => {
  el('path', { d, fill: dark, transform: 'translate(0 10)' }, g);
  el('path', { d, fill }, g);
  if (hi) el('path', { d, fill: 'none', stroke: hi, 'stroke-width': 10, opacity: 0.45, 'stroke-dasharray': '120 900', 'stroke-linecap': 'round' }, g);
};
const ORG = {
  heart: g => {
    el('path', { d: 'M-30 -150 q-10 -60 40 -60 q50 0 40 60', fill: 'none', stroke: A.pinkDark, 'stroke-width': 40 }, g);
    el('path', { d: 'M40 -150 q60 -40 110 -10', fill: 'none', stroke: '#7E8FB8', 'stroke-width': 34, 'stroke-linecap': 'round' }, g);
    organPath(g, 'M0 170 C-160 70 -200 -40 -150 -110 C-110 -165 -30 -160 0 -100 C30 -160 110 -165 150 -110 C200 -40 160 70 0 170 Z', '#D9443F', '#9E2A2A', '#FF8A80');
    el('path', { d: 'M-20 -80 C-40 0 -10 80 20 140', fill: 'none', stroke: '#9E2A2A', 'stroke-width': 8, opacity: 0.6 }, g);
  },
  kidneys: g => {
    for (const s of [-1, 1]) {
      const k = el('g', { transform: `translate(${s * 105} 0) scale(${s} 1)` }, g);
      organPath(k, 'M40 -150 C-60 -150 -90 -60 -80 10 C-70 90 -20 160 50 150 C110 140 120 90 90 60 C60 30 60 -20 90 -60 C120 -110 100 -150 40 -150 Z', A.kidney, '#6E2222', '#E07A6E');
      el('path', { d: 'M85 0 C120 40 110 120 90 180', fill: 'none', stroke: '#E8C9A0', 'stroke-width': 14, 'stroke-linecap': 'round' }, k);
    }
  },
  gut: g => {
    el('path', { d: 'M-170 160 L-170 -140 Q-170 -175 -135 -175 L135 -175 Q170 -175 170 -140 L170 160', fill: 'none', stroke: '#C46A5E', 'stroke-width': 54, 'stroke-linecap': 'round' }, g);
    const d = 'M-100 -110 H100 A30 30 0 0 1 100 -50 H-100 A30 30 0 0 0 -100 10 H100 A30 30 0 0 1 100 70 H-100 A30 30 0 0 0 -100 130 H60';
    el('path', { d, fill: 'none', stroke: A.pinkDark, 'stroke-width': 44, 'stroke-linecap': 'round', transform: 'translate(0 6)' }, g);
    el('path', { d, fill: 'none', stroke: A.pink, 'stroke-width': 38, 'stroke-linecap': 'round' }, g);
    el('path', { d, fill: 'none', stroke: A.pinkHi, 'stroke-width': 8, 'stroke-linecap': 'round', opacity: 0.5, transform: 'translate(0 -9)' }, g);
  },
  pancreas: g => {
    organPath(g, 'M-190 30 C-200 -40 -120 -70 -40 -50 C40 -30 110 -70 170 -80 C205 -86 215 -50 190 -30 C130 20 60 40 -10 50 C-80 60 -120 110 -160 100 C-185 94 -188 60 -190 30 Z', A.peach, A.peachDark, '#FFD3A8');
    for (let i = 0; i < 14; i++) el('circle', { cx: -150 + i * 24, cy: -10 + Math.sin(i * 1.7) * 18 + (i < 6 ? 20 : -i * 2), r: 9, fill: A.peachDark, opacity: 0.35 }, g);
  },
  liver: g => {
    organPath(g, 'M-190 -60 C-120 -130 80 -140 190 -100 C215 -90 210 -60 185 -45 C100 10 0 90 -90 110 C-150 122 -200 70 -205 0 C-207 -30 -205 -45 -190 -60 Z', A.liver, '#5E1C22', A.liverHi);
    el('path', { d: 'M-20 -125 C-10 -60 -30 20 -60 100', fill: 'none', stroke: '#5E1C22', 'stroke-width': 7, opacity: 0.6 }, g);
    el('ellipse', { cx: -40, cy: 95, rx: 22, ry: 34, fill: '#6F9A4A' }, g);
  },
  stomach: g => {
    el('path', { d: 'M-40 -200 C-40 -150 -35 -130 -30 -110', fill: 'none', stroke: A.pinkDark, 'stroke-width': 46, 'stroke-linecap': 'round' }, g);
    organPath(g, 'M-60 -120 C-110 -110 -120 -40 -100 20 C-80 90 -60 150 20 165 C110 180 175 120 170 40 C165 -20 120 -40 90 -10 C60 20 20 10 10 -40 C0 -90 -10 -125 -60 -120 Z', A.pink, A.pinkDark, A.pinkHi);
    el('path', { d: 'M150 120 C175 140 190 160 190 190', fill: 'none', stroke: A.pinkDark, 'stroke-width': 30, 'stroke-linecap': 'round' }, g);
  },
  brain: g => {
    const pts = [];
    for (let i = 0; i <= 72; i++) { const a = i / 72 * Math.PI * 2, r = 1 + 0.05 * Math.sin(a * 9); pts.push([Math.cos(a) * 190 * r, -10 + Math.sin(a) * 135 * r * (a > 0.2 && a < 2.6 ? 0.95 : 1)]); }
    organPath(g, 'M' + pts.map(q => q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' L') + ' Z', A.lilac, A.lilacDark, '#F6CFE0');
    for (let i = 0; i < 7; i++) {
      const y0 = -100 + i * 30, d = [];
      for (let k = 0; k <= 12; k++) d.push(`${(-150 + k * 25).toFixed(0)} ${(y0 + Math.sin(k * 1.9 + i) * 12).toFixed(1)}`);
      el('path', { d: 'M' + d.join(' L'), fill: 'none', stroke: A.lilacDark, 'stroke-width': 7, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0.55 }, g);
    }
    el('ellipse', { cx: 110, cy: 125, rx: 70, ry: 42, fill: '#C985A3' }, g);
    el('path', { d: 'M40 120 C45 160 50 190 45 215', fill: 'none', stroke: '#C985A3', 'stroke-width': 36, 'stroke-linecap': 'round' }, g);
  },
  thyroid: g => {
    el('rect', { x: -55, y: -200, width: 110, height: 400, rx: 40, fill: '#E9D6B8' }, g);
    for (let i = 0; i < 9; i++) el('rect', { x: -55, y: -185 + i * 44, width: 110, height: 16, rx: 8, fill: '#D2B98F' }, g);
    for (const s of [-1, 1]) organPath(g, `M${s * 20} -10 C${s * 70} -150 ${s * 170} -120 ${s * 165} 0 C${s * 160} 110 ${s * 90} 130 ${s * 30} 60 Z`, '#D96A6A', '#A8403F', '#FFA59A');
    el('rect', { x: -40, y: 20, width: 80, height: 40, rx: 18, fill: '#D96A6A' }, g);
  },
  eye: g => {
    el('circle', { cx: 0, cy: 0, r: 170, fill: '#F7F1EA', stroke: '#D8CFC4', 'stroke-width': 8 }, g);
    el('path', { d: 'M-170 -60 Q-215 0 -170 60', fill: '#BFE3F2', stroke: '#9CCBE0', 'stroke-width': 6 }, g);
    el('ellipse', { cx: -128, cy: 0, rx: 28, ry: 62, fill: '#D7ECF5', stroke: '#9CCBE0', 'stroke-width': 5 }, g);
    el('rect', { x: -168, y: -72, width: 20, height: 40, fill: '#4F7FA8' }, g);
    el('rect', { x: -168, y: 32, width: 20, height: 40, fill: '#4F7FA8' }, g);
    el('path', { d: 'M40 -160 A170 170 0 0 1 40 160', fill: 'none', stroke: '#E0703C', 'stroke-width': 18 }, g);
    el('path', { d: 'M160 -30 L250 -40 L250 40 L160 30 Z', fill: '#F2D27A' }, g);
  },
  mouse: g => {
    el('path', { d: 'M-130 60 C-200 70 -220 20 -190 -10', fill: 'none', stroke: '#E7B8B8', 'stroke-width': 10, 'stroke-linecap': 'round' }, g);
    el('ellipse', { cx: -20, cy: 20, rx: 130, ry: 80, fill: '#F2F0EC' }, g);
    el('ellipse', { cx: 110, cy: 0, rx: 70, ry: 55, fill: '#F2F0EC' }, g);
    el('circle', { cx: 85, cy: -55, r: 32, fill: '#F2C6C6', stroke: '#F2F0EC', 'stroke-width': 10 }, g);
    el('circle', { cx: 140, cy: -10, r: 9, fill: '#3A2A2A' }, g);
    el('circle', { cx: 180, cy: 10, r: 10, fill: '#E79A9A' }, g);
  },
  bell: g => {
    el('path', { d: 'M-120 40 C-120 -110 -60 -150 0 -150 C60 -150 120 -110 120 40 L150 80 L-150 80 Z', fill: '#E0A030' }, g);
    el('path', { d: 'M-110 40 C-110 -100 -55 -140 0 -140 C55 -140 110 -100 110 40 L135 72 L-135 72 Z', fill: N.gold }, g);
    el('rect', { x: -170, y: 80, width: 340, height: 30, rx: 15, fill: '#E0A030' }, g);
    el('circle', { cx: 0, cy: 135, r: 30, fill: '#E0A030' }, g);
    el('rect', { x: -22, y: -195, width: 44, height: 55, rx: 16, fill: '#E0A030' }, g);
    el('path', { d: 'M-70 -60 C-60 -100 -35 -120 -10 -125', fill: 'none', stroke: '#FFF4D6', 'stroke-width': 16, 'stroke-linecap': 'round', opacity: 0.6 }, g);
  },
  lock: (rust = 1) => g => {
    el('path', { d: 'M-95 -20 V-110 A95 95 0 0 1 95 -110 V-20', fill: 'none', stroke: '#8D96A0', 'stroke-width': 42 }, g);
    el('rect', { x: -160, y: -40, width: 320, height: 240, rx: 34, fill: A.steel }, g);
    el('rect', { x: -160, y: -40, width: 320, height: 40, rx: 20, fill: '#B5BDC6' }, g);
    el('circle', { cx: 0, cy: 60, r: 28, fill: '#3B4048' }, g);
    el('rect', { x: -12, y: 70, width: 24, height: 70, rx: 8, fill: '#3B4048' }, g);
    for (let i = 0; i < 9 * rust; i++) el('ellipse', { cx: -130 + hash(i) * 260, cy: -20 + hash(i + 9) * 200, rx: 18 + hash(i + 3) * 30, ry: 12 + hash(i + 5) * 20, fill: i % 2 ? '#B5602A' : '#8C4520', opacity: 0.85 }, g);
  },
  muscle: g => {
    for (let i = 0; i < 6; i++) {
      const y = -120 + i * 48;
      el('rect', { x: -190, y: y - 22, width: 380, height: 44, rx: 22, fill: i % 2 ? '#B83A34' : A.muscle }, g);
      el('ellipse', { cx: -190, cy: y, rx: 14, ry: 22, fill: '#E58A80' }, g);
      for (let k = 0; k < 10; k++) el('rect', { x: -160 + k * 36, y: y - 18, width: 4, height: 36, fill: '#8E2A26', opacity: 0.45 }, g);
    }
  },
};

// ---------------------------------------------------------------- small animated props
// The GLP-1 "bell": swings and sends sound rings while amp > 0. Uses the owner's bell art when present.
function Bell(p, { x, y, w = 220, name = 'a_campana' }) {
  const g = el('g', {}, p);
  const waves = el('g', {}, g);
  const rings = [];
  for (const side of [-1, 1]) for (let k = 0; k < 3; k++) {
    const r = w * (0.62 + k * 0.2), a0 = rad(38);
    const d = `M${(side * r * Math.cos(a0)).toFixed(1)} ${(-r * Math.sin(a0)).toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 0 ${side > 0 ? 1 : 0} ${(side * r * Math.cos(a0)).toFixed(1)} ${(r * Math.sin(a0)).toFixed(1)}`;
    rings.push({ e: el('path', { d, fill: 'none', stroke: N.gold, 'stroke-width': w * 0.045, 'stroke-linecap': 'round', opacity: 0 }, waves), k });
  }
  const art = Art(g, name, { x: 0, y: 0, w }, ORG.bell);
  const own = (window.ART || {})[name], top = own ? w * own[1] / own[0] / 2 : w * 0.45;   // swing from the handle
  return {
    g,
    draw(t, t0, amp = 1) {
      const a = E.back(prog(t, t0, t0 + 0.5));
      tr(g, x, y, Math.max(0.001, a));
      g.setAttribute('opacity', clamp(a * 2).toFixed(3));
      art.draw(t, -1, { k: 0 });
      tr(art.g, 0, -top, 1, amp * 9 * Math.sin(t * 15));
      art.g.firstChild.setAttribute('transform', `translate(0 ${top.toFixed(1)})`);
      for (const o of rings) {
        const ph = frac(t * 1.6 - o.k * 0.33);
        set(o.e, { opacity: (amp * Math.sin(ph * Math.PI) * 0.9).toFixed(3) });
      }
    },
  };
}
// Insulin key: bow ring, shaft and two teeth, pointing right from the origin.
function keyShape(p, { s = 1, color = N.gold } = {}) {
  const g = el('g', {}, p);
  el('circle', { cx: 0, cy: 0, r: 20 * s, fill: 'none', stroke: color, 'stroke-width': 11 * s }, g);
  el('rect', { x: 18 * s, y: -6 * s, width: 70 * s, height: 12 * s, rx: 4 * s, fill: color }, g);
  el('rect', { x: 62 * s, y: 4 * s, width: 10 * s, height: 18 * s, fill: color }, g);
  el('rect', { x: 78 * s, y: 4 * s, width: 10 * s, height: 13 * s, fill: color }, g);
  return g;
}
function cubeShape(p, { s = 1 } = {}) {
  const g = el('g', {}, p);
  el('rect', { x: -17 * s, y: -17 * s, width: 34 * s, height: 34 * s, rx: 6 * s, fill: '#DCD6CC' }, g);
  el('rect', { x: -17 * s, y: -17 * s, width: 30 * s, height: 30 * s, rx: 6 * s, fill: A.sugar }, g);
  return g;
}
// Things that travel along a path again and again (keys, sugar, GLP-1 dots). A traveller is shown only if
// the stream was "on" when it set off, so a stream starts and stops cleanly. on(t) → true/false.
function Stream(p, { d, n = 8, period = 2.2, make, spin = 0 }) {
  const g = el('g', {}, p);
  const path = el('path', { d, fill: 'none', stroke: 'none' }, g);
  const L = () => path.getTotalLength();
  const items = Array.from({ length: n }, (_, i) => make(g, i));
  return {
    g,
    draw(t, on) {
      const len = L();
      items.forEach((it, i) => {
        const ph = frac(t / period + i / n), born = t - ph * period;
        if (!on(born)) { it.setAttribute('opacity', 0); return; }
        const q = path.getPointAtLength(ph * len);
        tr(it, q.x, q.y, 1, spin * (t + i));
        it.setAttribute('opacity', (Math.min(1, ph * 8, (1 - ph) * 8)).toFixed(3));
      });
    },
  };
}
// Vertical meter: v in 0..1, colour by level (marks at lo/hi).
function Meter(p, { x, y, h = 420, w = 90, label = '', lo = 0.33, hi = 0.7 }) {
  const g = el('g', {}, p);
  el('rect', { x: x - w / 2 - 10, y: y - h - 10, width: w + 20, height: h + 20, rx: (w + 20) / 2, fill: N.panel, stroke: N.line, 'stroke-width': 4 }, g);
  const fill = el('rect', { x: x - w / 2, width: w, rx: w / 2, fill: N.teal }, g);
  for (const m of [lo, hi]) el('rect', { x: x + w / 2 + 16, y: y - m * h - 3, width: 30, height: 6, fill: N.dim }, g);
  if (label) NT(g, label, { x, y: y + 70, size: 44, anchor: 'middle', ls: 2 });
  return {
    g,
    draw(t, v) {
      const hh = Math.max(w, v * h);
      set(fill, { y: (y - hh).toFixed(1), height: hh.toFixed(1), fill: v > hi ? N.red : v < lo * 0.8 ? N.gold : N.teal });
    },
  };
}
// Line that draws itself (pathLength = 1).
function DrawLine(p, d, { color = N.gold, width = 10, dash = null } = {}) {
  const e = el('path', { d, fill: 'none', stroke: color, 'stroke-width': width, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1 }, p);
  return { e, draw(u) { e.setAttribute('stroke-dashoffset', (1 - clamp(u)).toFixed(4)); } };
}
// Icons, all centred on 0,0 about 120 px wide.
const ICON = {
  syringe: g => {
    el('rect', { x: -70, y: -16, width: 110, height: 32, rx: 8, fill: '#E8EEF4', stroke: '#9FB3C8', 'stroke-width': 4 }, g);
    el('rect', { x: -60, y: -10, width: 60, height: 20, fill: N.teal }, g);
    el('rect', { x: 40, y: -6, width: 20, height: 12, fill: '#9FB3C8' }, g);
    el('rect', { x: 60, y: -2, width: 34, height: 4, fill: '#C9D3DD' }, g);
    el('rect', { x: -86, y: -24, width: 16, height: 48, rx: 4, fill: '#9FB3C8' }, g);
  },
  pill: g => {
    el('rect', { x: -48, y: -22, width: 96, height: 44, rx: 22, fill: N.white }, g);
    el('path', { d: 'M0 -22 H26 A22 22 0 0 1 26 22 H0 Z', fill: N.gold }, g);
  },
  plate: g => {
    el('circle', { r: 58, fill: '#E9E4DA' }, g); el('circle', { r: 42, fill: N.white }, g);
    el('circle', { cx: -14, cy: -8, r: 14, fill: '#6FAF5A' }, g); el('circle', { cx: 14, cy: 6, r: 12, fill: '#D9884A' }, g);
    el('rect', { x: -86, y: -40, width: 8, height: 80, rx: 4, fill: '#C9D3DD' }, g); el('rect', { x: 78, y: -40, width: 8, height: 80, rx: 4, fill: '#C9D3DD' }, g);
  },
  dumbbell: g => {
    el('rect', { x: -50, y: -8, width: 100, height: 16, rx: 6, fill: '#9AA3AE' }, g);
    for (const s of [-1, 1]) { el('rect', { x: s * 50 - 14, y: -40, width: 28, height: 80, rx: 8, fill: N.teal }, g); el('rect', { x: s * 74 - 9, y: -28, width: 18, height: 56, rx: 6, fill: '#1F8E82' }, g); }
  },
  scale: g => {
    el('rect', { x: -66, y: -56, width: 132, height: 112, rx: 22, fill: '#E8EEF4' }, g);
    el('path', { d: 'M-36 -24 A40 40 0 0 1 36 -24', fill: 'none', stroke: N.ink, 'stroke-width': 6 }, g);
    el('line', { x1: 0, y1: -6, x2: 18, y2: -40, stroke: N.red, 'stroke-width': 6, 'stroke-linecap': 'round' }, g);
  },
  drop: g => { el('path', { d: 'M0 -60 C30 -20 48 6 48 24 A48 48 0 0 1 -48 24 C-48 6 -30 -20 0 -60 Z', fill: N.red }, g); el('path', { d: 'M-20 18 A22 22 0 0 0 -4 40', fill: 'none', stroke: '#fff', 'stroke-width': 7, opacity: 0.6, 'stroke-linecap': 'round' }, g); },
  doc: g => {
    el('rect', { x: -48, y: -62, width: 96, height: 124, rx: 8, fill: N.paper }, g);
    for (let i = 0; i < 5; i++) el('rect', { x: -32, y: -40 + i * 20, width: i === 4 ? 40 : 64, height: 8, rx: 4, fill: '#B9B2A4' }, g);
    el('rect', { x: -34, y: 20, width: 68, height: 12, fill: N.gold, opacity: 0.8 }, g);
  },
  bars: g => { [[-40, 60], [-6, 95], [28, 40]].forEach(([x, h], i) => el('rect', { x, y: 50 - h, width: 26, height: h, rx: 4, fill: [N.dim, N.gold, N.teal][i] }, g)); el('rect', { x: -56, y: 50, width: 112, height: 6, fill: N.white }, g); },
  organs: g => { el('path', { d: 'M0 50 C-60 10 -70 -30 -50 -50 C-30 -66 -8 -60 0 -40 C8 -60 30 -66 50 -50 C70 -30 60 10 0 50 Z', fill: '#D9443F' }, g); },
  warn: g => { el('path', { d: 'M0 -62 L66 52 H-66 Z', fill: N.gold, 'stroke-linejoin': 'round', stroke: N.gold, 'stroke-width': 10 }, g); el('rect', { x: -6, y: -22, width: 12, height: 44, rx: 5, fill: N.ink }, g); el('circle', { cy: 36, r: 7, fill: N.ink }, g); },
  no: g => { el('circle', { r: 58, fill: 'none', stroke: N.red, 'stroke-width': 14 }, g); el('line', { x1: -40, y1: 40, x2: 40, y2: -40, stroke: N.red, 'stroke-width': 14, 'stroke-linecap': 'round' }, g); },
  clock: g => { el('circle', { r: 56, fill: N.panel2, stroke: N.white, 'stroke-width': 8 }, g); el('line', { x1: 0, y1: 0, x2: 0, y2: -36, stroke: N.white, 'stroke-width': 8, 'stroke-linecap': 'round' }, g); el('line', { x1: 0, y1: 0, x2: 26, y2: 12, stroke: N.gold, 'stroke-width': 8, 'stroke-linecap': 'round' }, g); },
  eye: g => { el('path', { d: 'M-64 0 Q0 -56 64 0 Q0 56 -64 0 Z', fill: N.white }, g); el('circle', { r: 24, fill: N.teal }, g); el('circle', { r: 11, fill: N.ink }, g); },
};
// pop() writes a transform about (0,0); keep the icon's own position by nesting.
function Placed(p, x, y) { const o = el('g', { transform: `translate(${x} ${y})` }, p); return el('g', {}, o); }
function popAt(e, t, t0, t1 = 1e9) { pop(e, t, t0, 0, 0, t1); }

// ---------------------------------------------------------------- scenes
// Hook agenda: three cards (inside the body · the big studies · clear numbers) on their words.
function Agenda(p, { items }) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.gold });
  const k = Kicker(g, 'Hoy en este informe', { y: 170 });
  const cards = items.map((it, i) => {
    const x = 380 + i * 580, o = Placed(g, x, 560);
    el('rect', { x: -250, y: -230, width: 500, height: 460, rx: 26, fill: N.panel, stroke: N.line, 'stroke-width': 4 }, o);
    el('rect', { x: -250, y: -230, width: 500, height: 12, rx: 6, fill: [N.teal, N.gold, N.red][i] }, o);
    NT(o, String(i + 1), { x: -200, y: -160, size: 70, font: 'S', color: [N.teal, N.gold, N.red][i] });
    const ic = el('g', { transform: 'translate(0 -40) scale(1.5)' }, o); ICON[it.icon](ic);
    NT(o, it.label[0], { x: 0, y: 110, size: 48, anchor: 'middle', ls: 1 });
    NT(o, it.label[1], { x: 0, y: 170, size: 48, anchor: 'middle', ls: 1, color: N.gold });
    return { o, ic };
  });
  return {
    g,
    draw(t, t0, ts) {
      bg.draw(t); k.draw(t, t0);
      cards.forEach((c, i) => { popAt(c.o, t, ts[i]); c.ic.setAttribute('transform', `translate(0 ${(-40 + 6 * Math.sin(t * 2 + i)).toFixed(1)}) scale(1.5)`); });
    },
  };
}
// Two meters that fall on their words: sugar and weight.
function TwoDown(p, { title = '¿Qué tienen de cierto?', left = 'AZÚCAR', right = 'PESO' } = {}) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.teal });
  const k = Kicker(g, title, { y: 150 });
  const mk = (x, label, icon) => {
    const o = el('g', {}, g);
    const m = Meter(o, { x, y: 860, h: 520, w: 110, label, lo: 0.3, hi: 0.66 });
    const ic = Placed(o, x - 230, 520); ICON[icon](ic);
    const arrow = Placed(o, x + 220, 560);
    el('path', { d: 'M-34 -90 H34 V20 H70 L0 100 L-70 20 H-34 Z', fill: N.teal }, arrow);
    return { o, m, ic, arrow };
  };
  const L = mk(620, left, 'drop'), R = mk(1300, right, 'scale');
  const pot = Pill(g, 'SÍ SON POTENTES', { x: 960, y: 270, size: 46, fill: N.red });
  return {
    g,
    draw(t, t0, tPot, tL, tR) {
      bg.draw(t); k.draw(t, t0); pot.draw(t, tPot);
      for (const [o, t1] of [[L, tL], [R, tR]]) {
        o.o.setAttribute('opacity', clamp(prog(t, t0 + 0.2, t0 + 0.6)));
        o.m.draw(t, lerp(0.86, 0.42, E.inOut(prog(t, t1, t1 + 1.6))) + 0.01 * Math.sin(t * 3));
        popAt(o.ic, t, t0 + 0.4);
        const u = prog(t, t1, t1 + 0.4);
        o.arrow.setAttribute('opacity', u.toFixed(3));
        o.arrow.setAttribute('transform', `translate(0 ${(-40 * (1 - E.out(u)) + 12 * Math.sin(t * 4)).toFixed(1)})`);
      }
    },
  };
}
// The gut releases GLP-1: food travels the coils, gold dots rise out of the wall and gather into a bell.
function GutGLP1(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.gold, x: 760 });
  const k = Kicker(g, 'Cuando usted come', { y: 130 });
  const gut = Art(g, 'a_intestino', { x: 700, y: 600, w: 640 }, ORG.gut);
  const food = Stream(g, { d: 'M520 420 C700 420 880 470 880 560 C880 650 520 640 520 720 C520 800 880 790 880 850', n: 7, period: 3.4,
    make: (gg, i) => { const c = el('circle', { r: 16, fill: ['#6FAF5A', '#D9884A', '#F2D27A'][i % 3], stroke: '#00000033', 'stroke-width': 3 }, gg); return c; } });
  const dots = Stream(g, { d: 'M760 560 C900 520 1060 420 1300 420', n: 14, period: 2.4,
    make: gg => { const d = el('g', {}, gg); el('circle', { r: 26, fill: N.gold, opacity: 0.25 }, d); el('circle', { r: 13, fill: N.gold }, d); return d; } });
  const bell = Bell(g, { x: 1400, y: 470, w: 230 });
  const lab = Pill(g, 'GLP-1', { x: 1400, y: 700, size: 64, fill: N.panel, stroke: N.gold, color: N.gold });
  return {
    g,
    draw(t, t0, tG) {
      bg.draw(t); k.draw(t, t0); gut.draw(t, t0 + 0.1);
      food.draw(t, b => b > t0 - 4);
      dots.draw(t, b => b > tG - 0.6);
      bell.draw(t, tG + 0.6, clamp(prog(t, tG + 0.8, tG + 1.4)));
      lab.draw(t, tG + 0.3);
    },
  };
}
// The bell tells the pancreas ("key factory") that sugar went up; keys stream out.
function PancreasKeys(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.gold, x: 900 });
  const k = Kicker(g, 'Páncreas · la fábrica de llaves', { y: 130 });
  const panc = Art(g, 'a_pancreas', { x: 900, y: 560, w: 640 }, ORG.pancreas);
  const bell = Bell(g, { x: 290, y: 480, w: 200 });
  const sig = DrawLine(g, 'M400 480 C520 430 600 470 640 520', { color: N.gold, width: 8 });
  sig.e.setAttribute('stroke-dasharray', '0.04 0.03');
  const meter = Meter(g, { x: 1700, y: 860, h: 560, w: 100, label: 'AZÚCAR' });
  const keys = Stream(g, { d: 'M1080 560 C1250 520 1380 640 1560 600', n: 9, period: 2.0, make: gg => keyShape(gg, { s: 0.8 }) });
  const insu = Pill(g, 'INSULINA', { x: 1320, y: 760, size: 48, color: N.gold, stroke: N.gold });
  return {
    g,
    draw(t, t0, tBell, tUp) {
      bg.draw(t); k.draw(t, t0); panc.draw(t, t0 + 0.1);
      bell.draw(t, t0 + 0.3, clamp(prog(t, tBell, tBell + 0.4)));
      sig.e.setAttribute('opacity', clamp(prog(t, tBell, tBell + 0.3)));
      sig.e.setAttribute('stroke-dashoffset', (-t * 0.25).toFixed(3));
      meter.g.setAttribute('opacity', clamp(prog(t, t0 + 0.3, t0 + 0.7)));
      meter.draw(t, lerp(0.45, 0.85, E.inOut(prog(t, tUp - 0.3, tUp + 1.0))));
      keys.draw(t, b => b > tUp + 0.2);
      insu.draw(t, tUp + 0.6);
    },
  };
}
// Only when sugar is high: meter high → bell rings and keys flow; meter drops → the bell goes quiet.
function OnlyWhenHigh(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.teal });
  const k = Kicker(g, 'Solo cuando el azúcar está alta', { y: 130 });
  const meter = Meter(g, { x: 330, y: 880, h: 600, w: 110, label: 'AZÚCAR' });
  const bell = Bell(g, { x: 900, y: 470, w: 260 });
  const keys = Stream(g, { d: 'M1040 520 C1200 470 1350 600 1720 560', n: 10, period: 2.0, make: gg => keyShape(gg, { s: 0.85 }) });
  const on = Pill(g, 'ALTA → SUENA', { x: 900, y: 790, size: 52, color: N.red, stroke: N.red });
  const off = Pill(g, 'BAJA → SE CALLA', { x: 900, y: 790, size: 52, color: N.teal, stroke: N.teal });
  return {
    g,
    draw(t, t0, tLow) {
      bg.draw(t); k.draw(t, t0);
      const v = lerp(0.84, 0.46, E.inOut(prog(t, tLow, tLow + 1.4)));
      meter.draw(t, v + 0.008 * Math.sin(t * 3));
      const amp = clamp((v - 0.55) / 0.2);
      bell.draw(t, t0 + 0.2, amp);
      keys.draw(t, b => b > t0 - 2 && b < tLow + 0.6);
      on.draw(t, t0 + 0.6, tLow + 0.6);
      off.draw(t, tLow + 0.8);
    },
  };
}
// Less glucagon: the liver's tap pours fewer sugar cubes.
function LiverTap(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red, x: 760 });
  const k = Kicker(g, 'Dos · menos glucagón', { y: 130 });
  const liver = Art(g, 'a_higado', { x: 720, y: 470, w: 640 }, ORG.liver);
  const tap = Placed(g, 1060, 560);
  el('rect', { x: -10, y: -30, width: 120, height: 44, rx: 12, fill: A.steel }, tap);
  el('rect', { x: 80, y: 10, width: 40, height: 60, rx: 10, fill: A.steel }, tap);
  const handle = el('rect', { x: 30, y: -80, width: 24, height: 60, rx: 10, fill: N.red }, tap);
  const cubes = Stream(g, { d: 'M1160 640 L1160 940', n: 10, period: 1.1, make: gg => cubeShape(gg, { s: 0.9 }) });
  const glu = Pill(g, 'GLUCAGÓN', { x: 1420, y: 390, size: 50, color: N.red, stroke: N.red });
  const msg = Pill(g, 'EL HÍGADO SACA MENOS AZÚCAR', { x: 960, y: 980, size: 44 });
  return {
    g,
    draw(t, t0, tLiver) {
      bg.draw(t); k.draw(t, t0); liver.draw(t, t0 + 0.1);
      popAt(tap, t, t0 + 0.4);
      const slow = E.inOut(prog(t, tLiver + 0.8, tLiver + 2.4));
      handle.setAttribute('transform', `rotate(${(-60 * slow).toFixed(1)} 42 -20)`);
      cubes.draw(t, b => b > t0 && hash(Math.floor(b * 10)) > slow * 0.8);
      glu.draw(t, t0 + 0.6);
      msg.draw(t, tLiver + 1.2);
    },
  };
}
// The brain gets the message "ya estoy lleno": a fullness bar fills.
function BrainFull(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: '#B07AD9', x: 760 });
  const k = Kicker(g, 'Cuatro · le avisa al cerebro', { y: 130 });
  const brain = Art(g, 'a_cerebro', { x: 720, y: 560, w: 640 }, ORG.brain);
  const bar = Placed(g, 1420, 560);
  el('rect', { x: -60, y: -260, width: 120, height: 520, rx: 60, fill: N.panel, stroke: N.line, 'stroke-width': 4 }, bar);
  const fill = el('rect', { x: -46, width: 92, rx: 46, fill: N.teal }, bar);
  NT(bar, 'LLENO', { x: 0, y: -300, size: 46, anchor: 'middle', ls: 2, color: N.teal });
  NT(bar, 'HAMBRE', { x: 0, y: 310, size: 46, anchor: 'middle', ls: 2, color: N.dim });
  const ic = Placed(g, 1700, 560); ICON.plate(ic);
  const q = Pill(g, '“YA ESTOY LLENO”', { x: 720, y: 930, size: 56, font: 'S', italic: true, color: N.gold });
  const pulses = [0, 1, 2].map(() => el('circle', { cx: 720, cy: 560, r: 300, fill: 'none', stroke: N.teal, 'stroke-width': 6, opacity: 0 }, g));
  return {
    g,
    draw(t, t0) {
      bg.draw(t); k.draw(t, t0); brain.draw(t, t0 + 0.1);
      popAt(bar, t, t0 + 0.4); popAt(ic, t, t0 + 0.6);
      const v = E.inOut(prog(t, t0 + 0.8, t0 + 3.2)), hh = Math.max(92, v * 492);
      set(fill, { y: (246 - hh).toFixed(1), height: hh.toFixed(1) });
      pulses.forEach((c, i) => { const ph = frac((t - t0) * 0.7 + i / 3); set(c, { r: (300 + ph * 160).toFixed(1), opacity: (t > t0 + 0.8 ? (1 - ph) * 0.5 : 0).toFixed(3) }); });
      q.draw(t, t0 + 2.0);
    },
  };
}
// Type 2 diabetes: the bell is quiet (volume 2/5); the medicines are long-lasting copies that ring loud.
function QuietBell(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.gold });
  const k = Kicker(g, 'En la diabetes tipo 2', { y: 130 });
  const b1 = Bell(g, { x: 520, y: 470, w: 230 });
  const vol = Array.from({ length: 5 }, (_, i) => el('rect', { x: 420 + i * 44, y: 720 - i * 22, width: 30, height: 40 + i * 22, rx: 6, fill: N.dim }, g));
  const t1 = Pill(g, 'SUENA MÁS BAJITO', { x: 520, y: 840, size: 46 });
  const b2 = Bell(g, { x: 1400, y: 470, w: 260 });
  const t2 = Pill(g, 'COPIA QUE DURA MÁS', { x: 1400, y: 760, size: 46, color: N.gold, stroke: N.gold });
  const n1 = NT(g, 'semaglutida', { x: 1400, y: 860, size: 50, font: 'S', italic: true, anchor: 'middle' });
  const n2 = NT(g, 'dulaglutida', { x: 1400, y: 930, size: 50, font: 'S', italic: true, anchor: 'middle' });
  const clock = Placed(g, 1640, 300); ICON.clock(clock);
  return {
    g,
    draw(t, t0, tCopy, tDula) {
      bg.draw(t); k.draw(t, t0);
      b1.draw(t, t0 + 0.1, 0.28);
      vol.forEach((r, i) => set(r, { fill: i < 2 ? N.gold : N.panel2, opacity: clamp(prog(t, t0 + 0.4 + i * 0.1, t0 + 0.6 + i * 0.1)) }));
      t1.draw(t, t0 + 0.9);
      b2.draw(t, tCopy + 0.2, clamp(prog(t, tCopy + 0.5, tCopy + 1)));
      t2.draw(t, tCopy + 0.6); show(n1, t, tCopy + 1.0); show(n2, t, tDula + 0.2);
      popAt(clock, t, tCopy + 1.2);
      clock.setAttribute('transform', (clock.getAttribute('transform') || '') + ` rotate(${((t * 40) % 360).toFixed(1)})`);
    },
  };
}
// Weekly injection vs daily pill, as a calendar.
function WeekCalendar(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.teal });
  const k = Kicker(g, '¿Cada cuánto?', { y: 130 });
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const row = (y, label, color) => {
    const o = el('g', {}, g);
    NT(o, label, { x: 160, y: y - 120, size: 48, color, ls: 2 });
    const cells = days.map((d, i) => {
      const c = Placed(o, 290 + i * 225, y);
      el('rect', { x: -95, y: -80, width: 190, height: 160, rx: 18, fill: N.panel, stroke: N.line, 'stroke-width': 4 }, c);
      NT(c, d, { x: 0, y: -48, size: 40, anchor: 'middle', color: N.dim });
      return c;
    });
    return { o, cells };
  };
  const A1 = row(430, 'INYECCIÓN · 1 VEZ POR SEMANA', N.teal), B1 = row(800, 'PASTILLA · TODOS LOS DÍAS', N.gold);
  const inj = Placed(A1.cells[0], 0, 22); ICON.syringe(inj);
  const pills = B1.cells.map(c => { const q = Placed(c, 0, 22); ICON.pill(q); return q; });
  const hl = el('rect', { x: 290 - 95, y: 430 - 80, width: 190, height: 160, rx: 18, fill: 'none', stroke: N.teal, 'stroke-width': 8 }, g);
  return {
    g,
    draw(t, t0, tPill) {
      bg.draw(t); k.draw(t, t0);
      A1.o.setAttribute('opacity', clamp(prog(t, t0 + 0.2, t0 + 0.5)));
      A1.cells.forEach((c, i) => popAt(c, t, t0 + 0.2 + i * 0.06));
      popAt(inj, t, t0 + 0.9);
      hl.setAttribute('opacity', (t > t0 + 0.9 ? 0.5 + 0.5 * Math.sin(t * 4) : 0).toFixed(3));
      B1.o.setAttribute('opacity', clamp(prog(t, tPill - 0.2, tPill + 0.2)));
      B1.cells.forEach((c, i) => popAt(c, t, tPill + i * 0.05));
      pills.forEach((q, i) => popAt(q, t, tPill + 0.5 + i * 0.12));
    },
  };
}
// Tirzepatide: one striker hits two bells (GLP-1 + GIP).
function TwoBells(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.gold });
  const k = Kicker(g, 'Tirzepatida · dos timbres a la vez', { y: 130 });
  const b1 = Bell(g, { x: 640, y: 500, w: 250 }), b2 = Bell(g, { x: 1280, y: 500, w: 250, name: 'a_campana' });
  const l1 = Pill(g, 'GLP-1', { x: 640, y: 790, size: 60, color: N.gold, stroke: N.gold });
  const l2 = Pill(g, 'GIP', { x: 1280, y: 790, size: 60, color: N.teal, stroke: N.teal });
  const plus = NT(g, '+', { x: 960, y: 500, size: 140, font: 'S', anchor: 'middle', color: N.white });
  const m = Pill(g, 'Mounjaro', { x: 960, y: 940, size: 46, font: 'S', italic: true, fill: 'none' });
  return {
    g,
    draw(t, t0, tGip) {
      bg.draw(t); k.draw(t, t0);
      b1.draw(t, t0 + 0.2, clamp(prog(t, t0 + 0.6, t0 + 1)));
      l1.draw(t, t0 + 0.5);
      b2.draw(t, tGip - 0.2, clamp(prog(t, tGip, tGip + 0.4)));
      l2.draw(t, tGip + 0.1);
      show(plus, t, tGip - 0.1, 1e9, { dy: 0 });
      m.draw(t, t0 + 1.2);
    },
  };
}
// The rusty lock: the medicine does not remove the rust; losing weight helps it work a bit better.
function RustyLock(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: '#C9783F' });
  const k = Kicker(g, 'Un detalle honesto', { y: 130 });
  const LW = (window.ART || {}).a_candado_oxido ? 900 : 520;   // the owner's locks keep their full canvas
  const rusty = Art(g, 'a_candado_oxido', { x: 820, y: 560, w: LW }, ORG.lock(1));
  const clean = Art(g, 'a_candado_limpio', { x: 820, y: 560, w: LW }, ORG.lock(0.35));
  const key = keyShape(el('g', {}, g), { s: 2.2 });
  const t1 = Pill(g, 'LA CERRADURA SIGUE CON ÓXIDO', { x: 820, y: 930, size: 46 });
  const sc = Placed(g, 1520, 470); ICON.scale(sc);
  const arrow = Placed(g, 1520, 680); el('path', { d: 'M-30 -60 H30 V10 H62 L0 80 L-62 10 H-30 Z', fill: N.teal }, arrow);
  const t2 = Pill(g, 'BAJAR DE PESO AYUDA UN POCO', { x: 1300, y: 930, size: 46, color: N.teal, stroke: N.teal });
  return {
    g,
    draw(t, t0, tW, tB) {
      bg.draw(t); k.draw(t, t0);
      const c = E.inOut(prog(t, tB, tB + 1.2));
      rusty.draw(t, t0 + 0.1); clean.draw(t, t0 + 0.1);
      rusty.g.setAttribute('opacity', (clamp(prog(t, t0 + 0.1, t0 + 0.5)) * (1 - c)).toFixed(3));
      clean.g.setAttribute('opacity', (clamp(prog(t, t0 + 0.1, t0 + 0.5)) * c).toFixed(3));
      // the key tries again and again (jiggles at the keyhole)
      const kx = lerp(260, (window.ART || {}).a_candado_oxido ? 610 : 560, E.out(prog(t, t0 + 0.6, t0 + 1.4))) + 6 * Math.sin(t * 18) * (1 - c);
      tr(key.parentNode, kx, LW > 520 ? 690 : 620, 1, 4 * Math.sin(t * 9) * (1 - c));
      key.parentNode.setAttribute('opacity', clamp(prog(t, t0 + 0.6, t0 + 0.9)).toFixed(3));
      t1.draw(t, t0 + 1.4, tW);
      popAt(sc, t, tW); arrow.setAttribute('opacity', clamp(prog(t, tW + 0.3, tW + 0.6)).toFixed(3));
      arrow.setAttribute('transform', `translate(0 ${(10 * Math.sin(t * 4)).toFixed(1)})`);
      t2.draw(t, tB + 0.3);
    },
  };
}
// Not only the number: the A1C tag gives way to the heart and the kidneys.
function HeartKidneys(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red });
  const tag = Placed(g, 960, 520);
  el('rect', { x: -230, y: -110, width: 460, height: 220, rx: 30, fill: N.panel, stroke: N.gold, 'stroke-width': 6 }, tag);
  NT(tag, 'A1C', { x: 0, y: 0, size: 130, font: 'S', anchor: 'middle', color: N.gold });
  const heart = Art(g, 'a_corazon', { x: 620, y: 520, w: (window.ART || {}).a_corazon ? 340 : 460 }, ORG.heart);
  const kid = Art(g, 'a_rinones', { x: 1300, y: 520, w: 520 }, ORG.kidneys);
  const l1 = Pill(g, 'CORAZÓN', { x: 620, y: 860, size: 56, color: N.red, stroke: N.red });
  const l2 = Pill(g, 'RIÑONES', { x: 1300, y: 860, size: 56, color: N.gold, stroke: N.gold });
  const ecg = DrawLine(g, 'M120 1000 H520 l30 -60 l30 120 l30 -150 l30 90 H1000 l30 -60 l30 120 l30 -150 l30 90 H1800', { color: N.red, width: 6 });
  const k = Kicker(g, 'Lo que más importa', { y: 130 });
  return {
    g,
    draw(t, t0, tNum, tOrg) {
      bg.draw(t); k.draw(t, t0);
      const away = E.inOut(prog(t, tNum + 0.4, tOrg + 0.2));
      popAt(tag, t, t0 + 0.2);
      tag.parentNode.setAttribute('transform', `translate(960 ${(520 - 120 * away).toFixed(1)}) scale(${(1 - 0.5 * away).toFixed(3)})`);
      tag.setAttribute('opacity', (clamp(prog(t, t0 + 0.2, t0 + 0.5)) * (1 - away)).toFixed(3));
      const beat = 0.04 * Math.max(0, Math.sin(t * 7.5)) ** 8;
      heart.draw(t, tOrg, { k: 0 }); heart.g.setAttribute('transform', heart.g.getAttribute('transform').replace(/scale\(([\d.]+)\)/, (m, s) => `scale(${(+s * (1 + beat)).toFixed(4)})`));
      kid.draw(t, tOrg + 0.3);
      l1.draw(t, tOrg + 0.4); l2.draw(t, tOrg + 0.7);
      ecg.draw(prog(t, tOrg, tOrg + 2.5));
    },
  };
}
// Stomach side effects: four tags pop around a churning stomach.
function StomachSymptoms(p, { items = ['NÁUSEAS', 'VÓMITO', 'DIARREA', 'ESTREÑIMIENTO'] } = {}) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red, x: 960 });
  const k = Kicker(g, 'Lo más común: el estómago', { y: 130 });
  const st = Art(g, 'a_estomago', { x: 960, y: 580, w: 520 }, ORG.stomach);
  const pos = [[480, 420], [1440, 420], [480, 760], [1440, 760]];
  const tags = items.map((s, i) => Pill(g, s, { x: pos[i][0], y: pos[i][1], size: 56, color: N.white, stroke: N.red }));
  const waves = [0, 1, 2].map(i => el('path', { d: `M${820 + i * 50} 560 q20 -20 40 0 t40 0`, fill: 'none', stroke: N.gold, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0 }, g));
  return {
    g,
    draw(t, t0, ts) {
      bg.draw(t); k.draw(t, t0);
      st.draw(t, t0 + 0.1, { k: 0.03, rate: 3.1, rot: 3 * Math.sin(t * 2.3) });
      tags.forEach((x, i) => x.draw(t, ts[i]));
      waves.forEach((w, i) => { const ph = frac(t * 0.8 + i / 3); set(w, { opacity: (Math.sin(ph * Math.PI) * 0.8).toFixed(3), transform: `translate(0 ${(-ph * 40).toFixed(1)})` }); });
    },
  };
}
// Thyroid: tumours in lab animals; in people it is not known; not for a family history of medullary cancer.
function ThyroidWarn(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red, x: 700 });
  const k = Kicker(g, 'La tiroides', { y: 130 });
  const thy = Art(g, 'a_tiroides', { x: 640, y: 580, w: 480 }, ORG.thyroid);
  const spot = el('circle', { cx: 560, cy: 560, r: 30, fill: N.red, opacity: 0 }, g);
  const mouse = Art(g, 'a_raton', { x: 1340, y: 380, w: 340 }, ORG.mouse);
  const l1 = Pill(g, 'EN ANIMALES: TUMORES', { x: 1340, y: 560, size: 48, stroke: N.red });
  const l2 = Pill(g, '¿EN PERSONAS? NO SE SABE', { x: 1340, y: 680, size: 48, color: N.gold, stroke: N.gold });
  const card = Placed(g, 1340, 860);
  el('rect', { x: -470, y: -80, width: 940, height: 160, rx: 22, fill: N.red }, card);
  const w = Placed(card, -390, 0); ICON.warn(w);
  NT(card, 'NO SE RECOMIENDA si usted o su familia', { x: -300, y: -28, size: 42 });
  NT(card, 'tuvo cáncer medular de tiroides', { x: -300, y: 30, size: 42 });
  return {
    g,
    draw(t, t0, tNo, tMed) {
      bg.draw(t); k.draw(t, t0); thy.draw(t, t0 + 0.1);
      mouse.draw(t, t0 + 0.5, { k: 0.02, rate: 5 });
      set(spot, { opacity: (t > t0 + 1.2 ? 0.55 + 0.35 * Math.sin(t * 5) : 0).toFixed(3), r: (26 + 6 * Math.sin(t * 5)).toFixed(1) });
      l1.draw(t, t0 + 1.0); l2.draw(t, tNo + 0.2);
      popAt(card, t, tMed);
    },
  };
}
// Eye: the retina at the back lights up; 3 of 100 vs 2 of 100.
function EyeRetina(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: '#E0703C', x: 640 });
  const k = Kicker(g, 'Los ojos · la retina', { y: 130 });
  const eye = Art(g, 'a_ojo', { x: 620, y: 580, w: 640 }, ORG.eye);
  const ret = el('path', { d: (window.ART || {}).a_ojo ? 'M650 394 A215 215 0 0 1 650 766' : 'M713 324 A272 272 0 0 1 713 836', fill: 'none', stroke: N.gold, 'stroke-width': 26, 'stroke-linecap': 'round', opacity: 0 }, g);
  const grid = (x, y, n, col, label) => {
    const o = el('g', {}, g), dots = [];
    for (let i = 0; i < 100; i++) dots.push(el('circle', { cx: x + (i % 10) * 34, cy: y + Math.floor(i / 10) * 34, r: 12, fill: N.panel2 }, o));
    const num = NT(o, `${n} de 100`, { x: x + 153, y: y + 380, size: 64, font: 'S', anchor: 'middle', color: col });
    NT(o, label, { x: x + 153, y: y + 440, size: 40, anchor: 'middle', ls: 1 });
    return { o, dots, n, col };
  };
  const G1 = grid(1130, 260, 3, N.gold, 'SEMAGLUTIDA'), G2 = grid(1510, 260, 2, N.white, 'PLACEBO');
  return {
    g,
    draw(t, t0, tRet, t3, t2) {
      bg.draw(t); k.draw(t, t0); eye.draw(t, t0 + 0.1, { k: 0.01 });
      ret.setAttribute('opacity', (clamp(prog(t, tRet, tRet + 0.4)) * (0.6 + 0.4 * Math.sin(t * 4))).toFixed(3));
      for (const [G, ts] of [[G1, t3], [G2, t2]]) {
        G.o.setAttribute('opacity', clamp(prog(t, ts - 0.2, ts + 0.2)).toFixed(3));
        G.dots.forEach((d, i) => d.setAttribute('fill', i < G.n && t > ts + 0.4 + i * 0.15 ? G.col : N.panel2));
      }
    },
  };
}
// Weight loss is not only fat: blocks leave the scale, mostly gold (fat) but some red (muscle).
function FatMuscleBlocks(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.gold });
  const k = Kicker(g, 'Cuando uno baja de peso…', { y: 130 });
  const cols = 8, rows = 5, bw = 120, bh = 70, x0 = 960 - cols * bw / 2, y0 = 820;
  const blocks = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const muscle = hash(r * 8 + c + 3) < 0.3;
    const b = el('rect', { x: 0, y: 0, width: bw - 8, height: bh - 8, rx: 10, fill: muscle ? A.muscle : A.fat }, g);
    blocks.push({ b, x: x0 + c * bw + 4, y: y0 - (r + 1) * bh + 4, muscle, i: r * cols + c });
  }
  // which ones leave: the top two rows (mostly fat) plus a few muscle blocks
  const leave = blocks.filter(o => o.y < y0 - 3 * bh || (o.muscle && o.y < y0 - 2 * bh));
  leave.forEach((o, j) => { o.d = j * 0.09; });
  el('rect', { x: x0 - 30, y: y0, width: cols * bw + 60, height: 24, rx: 10, fill: '#9FB3C8' }, g);
  const l1 = Pill(g, 'GRASA', { x: 420, y: 520, size: 52, color: A.fat, stroke: A.fat });
  const l2 = Pill(g, 'MÚSCULO', { x: 1500, y: 520, size: 52, color: A.muscle, stroke: A.muscle });
  const msg = Pill(g, 'NO SOLO SE PIERDE GRASA', { x: 960, y: 950, size: 52, fill: N.red });
  return {
    g,
    draw(t, t0) {
      bg.draw(t); k.draw(t, t0);
      blocks.forEach(o => {
        const a = clamp(prog(t, t0 + 0.2 + o.i * 0.012, t0 + 0.4 + o.i * 0.012));
        let x = o.x, y = o.y, op = a;
        if (o.d !== undefined) { const u = E.inOut(prog(t, t0 + 1.6 + o.d, t0 + 2.6 + o.d)); x += (o.muscle ? 1 : -1) * 360 * u; y -= 120 * u; op *= 1 - u; }
        set(o.b, { x: x.toFixed(1), y: y.toFixed(1), opacity: op.toFixed(3) });
      });
      l1.draw(t, t0 + 2.2); l2.draw(t, t0 + 2.8); msg.draw(t, t0 + 3.6);
    },
  };
}
// Muscle over the years (illustrative curve, no numbers): there is reserve when young, it falls after 60.
function MuscleCurve(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red });
  const k = Kicker(g, 'El músculo con los años', { y: 130 });
  const X = a => 260 + (a - 20) / 70 * 1400, Y = v => 860 - v * 560;
  el('line', { x1: 240, x2: 1700, y1: 860, y2: 860, stroke: N.white, 'stroke-width': 4 }, g);
  [20, 40, 60, 80].forEach(a => NT(g, a + ' años', { x: X(a), y: 910, size: 40, anchor: 'middle', color: N.dim }));
  NT(g, 'MÚSCULO', { x: 240, y: 270, size: 44, color: N.dim, ls: 2 });
  const zone = el('rect', { x: X(60), y: 260, width: X(90) - X(60), height: 600, fill: N.red, opacity: 0 }, g);
  const pts = []; for (let a = 20; a <= 90; a += 2) { const v = a < 40 ? 0.9 : a < 60 ? 0.9 - (a - 40) * 0.006 : 0.78 - (a - 60) * 0.016 - ((a - 60) / 30) ** 2 * 0.06; pts.push(`${X(a).toFixed(1)} ${Y(v).toFixed(1)}`); }
  const line = DrawLine(g, 'M' + pts.join(' L'), { color: N.gold, width: 12 });
  const dot = el('circle', { cx: X(30), cy: Y(0.9), r: 20, fill: N.teal, opacity: 0 }, g);
  const l1 = Pill(g, 'JOVEN: HAY RESERVA', { x: X(30) + 120, y: Y(0.9) + 90, size: 46, color: N.teal, stroke: N.teal });
  const l2 = Pill(g, 'DESPUÉS DE LOS 60: SE PIERDE MÁS', { x: X(75), y: 330, size: 46, color: N.white, stroke: N.red });
  const nt = NT(g, 'Curva ilustrativa', { x: 1680, y: 970, size: 26, font: 'B', anchor: 'end', color: N.dim });
  return {
    g,
    draw(t, t0, t60) {
      bg.draw(t); k.draw(t, t0);
      line.draw(t < t60 ? 0.55 * E.out(prog(t, t0 + 0.3, t0 + 2.5)) : lerp(0.55, 1, E.inOut(prog(t, t60, t60 + 1.5))));
      dot.setAttribute('opacity', clamp(prog(t, t0 + 0.8, t0 + 1.1)).toFixed(3));
      l1.draw(t, t0 + 1.0);
      zone.setAttribute('opacity', (0.18 * clamp(prog(t, t60, t60 + 0.5))).toFixed(3));
      l2.draw(t, t60 + 0.5);
      nt.setAttribute('opacity', 1);
    },
  };
}
// Less muscle, fewer doors for sugar: doors in a muscle fiber close one by one; then "más caídas".
function MuscleDoors(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red, x: 760 });
  const k = Kicker(g, 'Menos músculo…', { y: 130 });
  const mus = Art(g, 'a_musculo', { x: 760, y: 560, w: 760 }, ORG.muscle);
  const doors = [0, 1, 2, 3, 4, 5].map(i => {
    const d = Placed(g, 480 + i * 112, 360);
    el('rect', { x: -32, y: -50, width: 64, height: 100, rx: 10, fill: N.bg, stroke: N.gold, 'stroke-width': 6 }, d);
    const leaf = el('rect', { x: -26, y: -44, width: 52, height: 88, rx: 6, fill: N.gold, opacity: 0 }, d);
    return { d, leaf, x: 480 + i * 112 };
  });
  const cubes = doors.map((o, i) => { const c = el('g', {}, g); cubeShape(c, { s: 0.9 }); return c; });
  const l1 = Pill(g, 'MENOS PUERTAS PARA EL AZÚCAR', { x: 760, y: 900, size: 48 });
  const warn = Placed(g, 1550, 520); ICON.warn(warn);
  const l2 = Pill(g, 'MÁS CAÍDAS', { x: 1550, y: 700, size: 60, color: N.gold, stroke: N.gold });
  return {
    g,
    draw(t, t0, tFall) {
      bg.draw(t); k.draw(t, t0); mus.draw(t, t0 + 0.1, { k: 0.01 });
      doors.forEach((o, i) => {
        popAt(o.d, t, t0 + 0.3 + i * 0.08);
        const closed = i >= 2 && t > t0 + 1.4 + (i - 2) * 0.35;
        set(o.leaf, { opacity: closed ? 1 : 0 });
        const ph = frac(t * 0.6 + i * 0.37);
        const y = closed ? 230 + Math.min(ph, 0.45) * 120 : 220 + ph * 200;
        tr(cubes[i], o.x + (closed ? 40 * Math.sin(t * 3 + i) : 0), y, 1);
        cubes[i].setAttribute('opacity', (clamp(prog(t, t0 + 0.6, t0 + 0.9)) * (closed ? 0.9 : Math.sin(ph * Math.PI))).toFixed(3));
      });
      l1.draw(t, t0 + 1.8);
      popAt(warn, t, tFall); l2.draw(t, tFall + 0.2);
    },
  };
}
// Three "no" badges: no empiece · no deje · no cambie.
function ThreeNo(p, { items = ['NO EMPIECE', 'NO DEJE', 'NO CAMBIE'], foot = 'ninguna medicina sin hablar con su equipo médico' } = {}) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red });
  const k = Kicker(g, 'Información, no una consulta', { y: 150 });
  const its = items.map((s, i) => {
    const o = Placed(g, 420 + i * 540, 520);
    el('circle', { r: 170, fill: N.panel, stroke: N.line, 'stroke-width': 4 }, o);
    const ic = el('g', { transform: 'scale(2)' }, o); ICON.no(ic);
    NT(o, s, { x: 0, y: 250, size: 60, anchor: 'middle', ls: 2 });
    return o;
  });
  const f = NT(g, foot, { x: 960, y: 930, size: 52, font: 'S', italic: true, anchor: 'middle', color: N.gold });
  return { g, draw(t, t0, ts) { bg.draw(t); k.draw(t, t0); its.forEach((o, i) => popAt(o, t, ts[i])); show(f, t, ts[2] + 0.8); } };
}
// Sugar over a day (illustrative): with insulin/sulfonylurea plus a GLP-1 medicine it can drop below 70.
function SugarDrop(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red });
  const k = Kicker(g, 'Una advertencia importante', { y: 130 });
  const X = h => 260 + h / 24 * 1400, Y = v => 880 - (v - 30) / 220 * 600;
  el('rect', { x: X(0), y: Y(180), width: 1400, height: Y(70) - Y(180), fill: N.teal, opacity: 0.12 }, g);
  el('rect', { x: X(0), y: Y(70), width: 1400, height: Y(30) - Y(70), fill: N.red, opacity: 0.22 }, g);
  el('line', { x1: X(0), x2: X(24), y1: Y(70), y2: Y(70), stroke: N.red, 'stroke-width': 5, 'stroke-dasharray': '18 10' }, g);
  NT(g, '70', { x: X(24) + 20, y: Y(70), size: 48, font: 'S', color: N.red });
  NT(g, 'mg/dL', { x: X(24) + 20, y: Y(70) + 50, size: 30, color: N.dim });
  const curve = (f, col) => { const d = []; for (let h = 0; h <= 24; h += 0.5) d.push(`${X(h).toFixed(1)} ${Y(f(h)).toFixed(1)}`); return DrawLine(g, 'M' + d.join(' L'), { color: col, width: 10 }); };
  const base = curve(h => 140 + 30 * Math.sin(h / 24 * Math.PI * 4), N.dim);
  const drop = curve(h => 140 + 30 * Math.sin(h / 24 * Math.PI * 4) - 95 * E.inOut(clamp((h - 6) / 10)), N.gold);
  const l1 = Pill(g, 'INSULINA · GLIBENCLAMIDA · GLIMEPIRIDA', { x: 960, y: 260, size: 44 });
  const l2 = Pill(g, '+ UNA DE ESTAS MEDICINAS', { x: 960, y: 360, size: 44, color: N.gold, stroke: N.gold });
  const alarm = el('circle', { cx: X(16), cy: Y(45), r: 40, fill: 'none', stroke: N.red, 'stroke-width': 8, opacity: 0 }, g);
  const l3 = Pill(g, 'AZÚCAR DEMASIADO BAJA', { x: X(16), y: Y(45) + 100, size: 48, fill: N.red });
  const nt = NT(g, 'Curva ilustrativa', { x: 1680, y: 1000, size: 26, font: 'B', anchor: 'end', color: N.dim });
  return {
    g,
    draw(t, t0, tIns, tAdd, tLow) {
      bg.draw(t); k.draw(t, t0);
      base.draw(prog(t, tIns, tIns + 1.6)); l1.draw(t, tIns + 0.1);
      l2.draw(t, tAdd);
      drop.draw(prog(t, tAdd + 0.4, tLow + 0.6));
      base.e.setAttribute('opacity', (1 - 0.6 * clamp(prog(t, tAdd + 0.4, tAdd + 1))).toFixed(3));
      const ph = frac(t * 1.2);
      set(alarm, { r: (30 + ph * 60).toFixed(1), opacity: (t > tLow + 0.6 ? 1 - ph : 0).toFixed(3) });
      l3.draw(t, tLow + 0.7);
      nt.setAttribute('opacity', clamp(prog(t, tIns, tIns + 0.5)).toFixed(3));
    },
  };
}
// Three things to watch: food, strength, weight.
function WatchThree(p, { items = [['plate', 'LA COMIDA'], ['dumbbell', 'LA FUERZA'], ['scale', 'EL PESO']] } = {}) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.teal });
  const k = Kicker(g, 'Vigilar de cerca', { y: 150 });
  const its = items.map(([ic, s], i) => {
    const o = Placed(g, 420 + i * 540, 540);
    el('rect', { x: -220, y: -220, width: 440, height: 440, rx: 30, fill: N.panel, stroke: N.line, 'stroke-width': 4 }, o);
    const icg = el('g', { transform: 'translate(0 -40) scale(1.9)' }, o); ICON[ic](icg);
    NT(o, s, { x: 0, y: 150, size: 56, anchor: 'middle', ls: 2 });
    const eye = Placed(o, 170, -170); ICON.eye(eye);
    return { o, icg, eye };
  });
  return {
    g,
    draw(t, t0, ts) {
      bg.draw(t); k.draw(t, t0);
      its.forEach((q, i) => { popAt(q.o, t, ts[i]); popAt(q.eye, t, ts[i] + 0.35); q.icg.setAttribute('transform', `translate(0 ${(-40 + 6 * Math.sin(t * 2.2 + i)).toFixed(1)}) scale(1.9)`); });
    },
  };
}

// ================================================================ objects for access / fake-medicine stories
// Stand-ins for the owner's object illustrations (a_celular, a_pluma, a_caja…), 400-wide box on 0,0.
const OBJ = {
  phone: g => {
    el('rect', { x: -120, y: -230, width: 240, height: 460, rx: 34, fill: '#1B2230', stroke: '#3A4558', 'stroke-width': 8 }, g);
    el('rect', { x: -104, y: -206, width: 208, height: 412, rx: 18, fill: '#0B0F16' }, g);
    el('rect', { x: -30, y: -220, width: 60, height: 8, rx: 4, fill: '#3A4558' }, g);
  },
  pen: (body = '#F1F3F6', cap = '#8EC5E8') => g => {
    el('rect', { x: -190, y: -26, width: 300, height: 52, rx: 24, fill: body, stroke: '#C9D0DA', 'stroke-width': 4 }, g);
    el('rect', { x: -200, y: -30, width: 90, height: 60, rx: 26, fill: cap }, g);
    el('rect', { x: -40, y: -14, width: 80, height: 28, rx: 8, fill: '#D6ECF7', stroke: '#9FB3C8', 'stroke-width': 3 }, g);
    el('rect', { x: 110, y: -20, width: 60, height: 40, rx: 12, fill: '#C9D0DA' }, g);
    el('rect', { x: 170, y: -14, width: 22, height: 28, rx: 6, fill: '#9FB3C8' }, g);
  },
  box: g => {
    el('path', { d: 'M-120 -140 L60 -170 L150 -130 L-30 -100 Z', fill: '#F7F7F4' }, g);
    el('path', { d: 'M-120 -140 L-30 -100 L-30 180 L-120 140 Z', fill: '#DADDE2' }, g);
    el('path', { d: 'M-30 -100 L150 -130 L150 150 L-30 180 Z', fill: '#FFFFFF' }, g);
  },
  vial: g => {
    el('rect', { x: -60, y: -110, width: 120, height: 230, rx: 26, fill: '#DDEFF7', stroke: '#B9D3E0', 'stroke-width': 6, opacity: 0.95 }, g);
    el('rect', { x: -52, y: -20, width: 104, height: 132, rx: 20, fill: '#BFE3F2' }, g);
    el('rect', { x: -48, y: -170, width: 96, height: 70, rx: 12, fill: '#9AA3AE' }, g);
    el('rect', { x: -40, y: -150, width: 80, height: 30, rx: 6, fill: '#6F7884' }, g);
  },
  lupa: g => {
    el('line', { x1: 60, y1: 60, x2: 170, y2: 170, stroke: '#3B2F2A', 'stroke-width': 40, 'stroke-linecap': 'round' }, g);
    el('circle', { cx: -20, cy: -20, r: 120, fill: '#CFE8F5', 'fill-opacity': 0.35, stroke: '#B8C0CA', 'stroke-width': 22 }, g);
  },
  receta: g => {
    el('rect', { x: -140, y: -180, width: 280, height: 360, rx: 10, fill: '#FFFFFF', stroke: '#D9DEE5', 'stroke-width': 4 }, g);
    for (let i = 0; i < 7; i++) el('rect', { x: -110, y: -120 + i * 40, width: i === 6 ? 120 : 220, height: 6, rx: 3, fill: '#D6DCE4' }, g);
    el('rect', { x: 20, y: 90, width: 170, height: 20, rx: 10, fill: '#2E5C8A', transform: 'rotate(-35 100 100)' }, g);
  },
  parcel: g => {
    el('path', { d: 'M-160 -60 L0 -130 L160 -60 L0 10 Z', fill: '#D9A86C' }, g);
    el('path', { d: 'M-160 -60 L0 10 L0 170 L-160 100 Z', fill: '#B9844B' }, g);
    el('path', { d: 'M0 10 L160 -60 L160 100 L0 170 Z', fill: '#C99456' }, g);
    el('path', { d: 'M-80 -95 L80 -25', stroke: '#EAD3A8', 'stroke-width': 24 }, g);
  },
  plane: g => {
    el('path', { d: 'M-180 0 Q-170 -26 -120 -26 L150 -26 Q190 -24 196 0 Q190 24 150 26 L-120 26 Q-170 26 -180 0 Z', fill: '#F4F6F9' }, g);
    el('path', { d: 'M-20 -20 L-80 -140 L-40 -140 L60 -20 Z', fill: '#DDE3EA' }, g);
    el('path', { d: 'M-20 20 L-80 140 L-40 140 L60 20 Z', fill: '#C9D0DA' }, g);
    el('path', { d: 'M-150 -20 L-180 -90 L-150 -90 L-110 -20 Z', fill: '#DDE3EA' }, g);
    for (let i = 0; i < 6; i++) el('circle', { cx: -60 + i * 34, cy: -6, r: 6, fill: '#7FA6C9' }, g);
  },
  meter: g => {
    el('rect', { x: -110, y: -170, width: 220, height: 320, rx: 50, fill: '#E8EEF4', stroke: '#B9C4D0', 'stroke-width': 6 }, g);
    el('rect', { x: -80, y: -130, width: 160, height: 120, rx: 14, fill: '#CFD8C9' }, g);
    el('circle', { cx: 0, cy: 70, r: 34, fill: '#B9C4D0' }, g);
    el('rect', { x: -18, y: -230, width: 36, height: 70, rx: 4, fill: '#F2F2F2', stroke: '#C9D0DA', 'stroke-width': 3 }, g);
  },
  pharmacy: g => {
    el('rect', { x: -170, y: -90, width: 340, height: 250, fill: '#F4EFE6' }, g);
    el('rect', { x: -190, y: -120, width: 380, height: 40, rx: 8, fill: N.teal }, g);
    el('rect', { x: -60, y: 0, width: 120, height: 160, fill: '#BFE3F2', stroke: '#9AA3AE', 'stroke-width': 6 }, g);
    el('rect', { x: -150, y: 0, width: 70, height: 90, fill: '#BFE3F2' }, g); el('rect', { x: 80, y: 0, width: 70, height: 90, fill: '#BFE3F2' }, g);
    const c = el('g', { transform: 'translate(0 -200)' }, g);
    el('rect', { x: -60, y: -60, width: 120, height: 120, rx: 14, fill: '#2FA84F' }, c);
    el('rect', { x: -14, y: -44, width: 28, height: 88, fill: '#fff' }, c); el('rect', { x: -44, y: -14, width: 88, height: 28, fill: '#fff' }, c);
  },
  factory: g => {
    el('rect', { x: -180, y: -20, width: 360, height: 180, fill: '#DDE3EA' }, g);
    el('path', { d: 'M-180 -20 L-120 -80 L-60 -20 L0 -80 L60 -20 L120 -80 L180 -20 Z', fill: '#C9D0DA' }, g);
    el('rect', { x: 110, y: -190, width: 40, height: 130, fill: '#9AA3AE' }, g); el('rect', { x: 50, y: -160, width: 34, height: 100, fill: '#9AA3AE' }, g);
    for (let i = 0; i < 4; i++) el('rect', { x: -150 + i * 85, y: 30, width: 50, height: 50, fill: '#8EC5E8' }, g);
  },
  coins: g => {
    for (let i = 0; i < 6; i++) { el('ellipse', { cx: -40, cy: 120 - i * 34, rx: 110, ry: 34, fill: i % 2 ? '#D9A030' : N.gold, stroke: '#B57F1E', 'stroke-width': 4 }, g); }
    for (let i = 0; i < 3; i++) { el('ellipse', { cx: 100, cy: 140 - i * 34, rx: 90, ry: 28, fill: '#C9D0DA', stroke: '#9AA3AE', 'stroke-width': 4 }, g); }
  },
  envelope: g => {
    el('rect', { x: -170, y: -110, width: 340, height: 220, rx: 14, fill: '#FFFFFF', stroke: '#D9DEE5', 'stroke-width': 5 }, g);
    el('path', { d: 'M-170 -100 L0 20 L170 -100', fill: 'none', stroke: '#D9DEE5', 'stroke-width': 8 }, g);
    el('circle', { cx: 150, cy: -100, r: 44, fill: N.red }, g); el('rect', { x: 144, y: -126, width: 12, height: 34, rx: 5, fill: '#fff' }, g); el('circle', { cx: 150, cy: -78, r: 7, fill: '#fff' }, g);
  },
};
// A screen area of the owner's phone art (fraction of the art box) where code draws chat bubbles.
const PHONE_SCREEN = { x: -0.44, y: -0.46, w: 0.88, h: 0.92 };

// Phone with a mock chat: bubbles pop in on their cues. Label it "Mensaje de ejemplo" in the plan.
function PhoneChat(p, { msgs, x = 620, y = 590, w = 560, title = '' }) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: '#25D366', x });
  const k = title ? Kicker(g, title, { y: 130 }) : null;
  const ph = Art(g, 'a_celular', { x, y, w, hmax: 800 }, OBJ.phone);
  if ((window.ART || {}).a_celular) w = ph.w;
  // screen rectangle: the owner's phone art (PHONE_SCREEN fractions) or the stand-in's screen
  const own = (window.ART || {}).a_celular;
  const h = own ? w * own[1] / own[0] : 0;
  const scr = own ? { x: x + PHONE_SCREEN.x * w, y: y + PHONE_SCREEN.y * h, w: PHONE_SCREEN.w * w, h: PHONE_SCREEN.h * h }
                  : { x: x - 104 * w / 400, y: y - 206 * w / 400, w: 208 * w / 400, h: 412 * w / 400 };
  const gap = Math.min(110, (scr.h - 60) / msgs.length);
  const bubbles = msgs.map((m, i) => {
    const b = el('g', {}, g), by = scr.y + 70 + i * gap, bw = scr.w - 36;
    el('rect', { x: scr.x + 14, y: by - gap * 0.38, width: bw, height: gap * 0.76, rx: 16, fill: m.me ? '#D9FDD3' : '#FFFFFF' }, b);
    const tx = NT(b, m.text, { x: scr.x + 32, y: by, size: Math.min(40, gap * 0.36), font: 'B', weight: 700, color: '#1B1A22' });
    return { b, tx, bw, cx: scr.x + scr.w / 2, by };
  });
  // the latest message, big, beside the phone
  const big = msgs.map(m => NT(g, '“' + m.text + '”', { x: 1360, y: 560, size: 84, font: 'S', italic: true, anchor: 'middle', color: N.gold }));
  let fitted = false;
  return {
    g,
    draw(t, t0, ts) {
      bg.draw(t); if (k) k.draw(t, t0);
      ph.draw(t, t0, { k: 0.006 });
      if (!fitted) {   // one text size for all bubbles: the size the longest one fits at (re-measured until fonts are in)
        bubbles.forEach(o => o.tx.setAttribute('font-size', o.base ??= +o.tx.getAttribute('font-size')));
        const k2 = Math.min(1, ...bubbles.map(o => (o.bw - 36) / tw(o.tx)));
        bubbles.forEach(o => o.tx.setAttribute('font-size', (o.base * k2).toFixed(1)));
        big.forEach(e => { e.setAttribute('font-size', 84); const L = tw(e); if (L > 1000) e.setAttribute('font-size', (84 * 1000 / L).toFixed(1)); });
        fitted = fontsOK() && document.fonts.check('700 30px Inter');
      }
      const at = bubbles.map((o, i) => ts[i] ?? t0 + 0.6 + i * 0.6);
      bubbles.forEach((o, i) => pop(o.b, t, at[i], o.cx, o.by));
      const cur = at.reduce((c, a, i) => (t >= a ? i : c), -1);
      big.forEach((e, i) => { e.setAttribute('opacity', i === cur ? clamp(prog(t, at[i], at[i] + 0.25)).toFixed(3) : 0); });
    },
  };
}
// Genuine generic vs compounded vs fake: three objects with stamps, revealed on their cues.
function ThreeKinds(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.gold });
  const k = Kicker(g, 'No es lo mismo', { y: 130 });
  const cols = [
    { x: 400, art: 'a_caja', fb: OBJ.box, label: ['GENÉRICO', 'CON REGISTRO'], col: N.teal, mark: 'ok' },
    { x: 960, art: 'a_vial', fb: OBJ.vial, label: ['“COMPUESTO”', 'O MAGISTRAL'], col: N.gold, mark: 'q' },
    { x: 1520, art: 'a_caja', fb: OBJ.box, label: ['FALSO', ''], col: N.red, mark: 'x' },
  ].map(c => {
    const o = el('g', {}, g);
    const a = Art(o, c.art, { x: c.x, y: 520, w: 300, hmax: 380 }, c.fb);
    NT(o, c.label[0], { x: c.x, y: 790, size: 56, anchor: 'middle', color: c.col, ls: 2 });
    if (c.label[1]) NT(o, c.label[1], { x: c.x, y: 850, size: 44, anchor: 'middle', ls: 2 });
    const m = Placed(o, c.x + 110, 380);
    el('circle', { r: 56, fill: c.col }, m);
    if (c.mark === 'ok') el('path', { d: 'M-24 2 L-6 22 L28 -18', fill: 'none', stroke: '#fff', 'stroke-width': 14, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, m);
    else if (c.mark === 'x') { el('path', { d: 'M-20 -20 L20 20 M20 -20 L-20 20', stroke: '#fff', 'stroke-width': 14, 'stroke-linecap': 'round' }, m); }
    else NT(m, '?', { x: 0, y: 4, size: 76, font: 'S', anchor: 'middle', color: N.ink });
    return { o, a, m };
  });
  return {
    g,
    draw(t, t0, ts) {
      bg.draw(t); k.draw(t, t0);
      cols.forEach((c, i) => {
        const intro = clamp(prog(t, t0 + 0.2 + i * 0.15, t0 + 0.5 + i * 0.15)), on = clamp(prog(t, ts[i], ts[i] + 0.3));
        c.o.setAttribute('opacity', (intro * (0.3 + 0.7 * on)).toFixed(3));
        c.a.draw(t, t0 + 0.2 + i * 0.15, { k: on ? 0.01 : 0 });
        popAt(c.m, t, ts[i] + 0.5);
        // a fake box shakes a little
        if (i === 2) c.a.g.setAttribute('transform', c.a.g.getAttribute('transform') + ` rotate(${(2 * Math.sin(t * 9)).toFixed(2)})`);
      });
    },
  };
}
// Real map: countries light up one by one, each with a dated status card. Needs maps.js (map_paths.mjs).
function MapStatus(p, { view = 'latam', inset = 'iberia', items, insetBox = [1260, 330, 1820, 780] }) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.teal, x: 700 });
  const draw = (M, clipBox) => {
    const mg = el('g', {}, g), paths = {};
    if (clipBox) {
      const id = auid('mclip'), cp = el('clipPath', { id }, defs());
      el('rect', { x: clipBox[0], y: clipBox[1], width: clipBox[2] - clipBox[0], height: clipBox[3] - clipBox[1], rx: 18 }, cp);
      el('rect', { x: clipBox[0], y: clipBox[1], width: clipBox[2] - clipBox[0], height: clipBox[3] - clipBox[1], rx: 18, fill: '#0A1019', stroke: N.line, 'stroke-width': 4 }, mg);
      mg.setAttribute('clip-path', `url(#${id})`);
    }
    for (const [n, d] of Object.entries(M.paths)) paths[n] = el('path', { d, fill: N.panel2, stroke: N.bg, 'stroke-width': 1.5 }, mg);
    return { mg, paths, M };
  };
  const A1 = draw(window.MAPS[view]), B1 = inset ? draw(window.MAPS[inset], insetBox) : null;
  // fade the top edge where the US is cut off
  const fid = auid('mfade'), lg = el('linearGradient', { id: fid, x1: 0, y1: 0, x2: 0, y2: 1 }, defs());
  el('stop', { offset: '0', 'stop-color': N.bg, 'stop-opacity': 1 }, lg); el('stop', { offset: '1', 'stop-color': N.bg, 'stop-opacity': 0 }, lg);
  el('rect', { x: 0, y: 0, width: 1240, height: 260, fill: `url(#${fid})` }, g);
  const cards = items.map(it => {
    const src = (B1 && B1.M.paths[it.country]) ? B1 : A1;
    const c = src.M.centroid[it.country];
    const o = el('g', {}, g);
    const dot = el('circle', { cx: c[0], cy: c[1], r: 12, fill: '#fff' }, o);
    const cx = it.cx ?? c[0], cy = it.cy ?? c[1] - 120;
    const line = el('line', { x1: c[0], y1: c[1], x2: cx, y2: cy, stroke: '#fff', 'stroke-width': 3 }, o);
    const card = Placed(o, cx, cy);
    const w = it.w || 420;
    el('rect', { x: -w / 2, y: -70, width: w, height: 140, rx: 16, fill: N.panel, stroke: it.color, 'stroke-width': 5 }, card);
    NT(card, it.name.toUpperCase(), { x: 0, y: -28, size: 44, anchor: 'middle', color: it.color, ls: 2 });
    NT(card, it.status, { x: 0, y: 28, size: 34, font: 'S', italic: true, anchor: 'middle' });
    return { o, card, src, it };
  });
  return {
    g,
    draw(t, t0, ts, t1 = 1e9) {
      bg.draw(t);
      A1.mg.setAttribute('opacity', clamp(prog(t, t0, t0 + 0.5)).toFixed(3));
      if (B1) B1.mg.setAttribute('opacity', clamp(prog(t, t0 + 0.2, t0 + 0.7)).toFixed(3));
      cards.forEach((c, i) => {
        const on = clamp(prog(t, ts[i], ts[i] + 0.4));
        const p0 = c.src.paths[c.it.country];
        const active = t >= ts[i] && (i === cards.length - 1 || t < (ts[i + 1] ?? 1e9) + 99);
        p0.setAttribute('fill', on > 0 ? c.it.color : N.panel2);
        p0.setAttribute('opacity', (on > 0 ? 0.55 + 0.45 * on : 1).toFixed(3));
        c.o.setAttribute('opacity', on.toFixed(3));
        popAt(c.card, t, ts[i] + 0.15);
      });
    },
  };
}
// Pen contents: original window full; fake pens may have nothing… or something else.
// lens[i] = false: no contents window on that row (the alert only says the pen looks different).
function PenContents(p, { title = 'Lo que pueden traer', labels = ['ORIGINAL', 'SIN MEDICAMENTO', '¿OTRA COSA?'], lens: showLens = [true, true, true] } = {}) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red });
  const k = Kicker(g, title, { y: 130 });
  const rows = [0, 1, 2].map(i => {
    const y = 330 + i * 230, o = el('g', {}, g);
    const a = Art(o, i === 0 ? 'a_pluma' : 'a_pluma_rara', { x: 700, y, w: 620 }, i === 0 ? OBJ.pen() : OBJ.pen('#D9DCE1', '#F2A86B'));
    const lens = Placed(o, 700, y);
    el('rect', { x: -70, y: -40, width: 140, height: 80, rx: 18, fill: N.bg, stroke: '#fff', 'stroke-width': 5 }, lens);
    const liquid = el('rect', { x: -60, y: -30, width: 120, height: 60, rx: 12, fill: [N.teal, 'none', N.red][i] }, lens);
    const q = NT(lens, i === 1 ? '∅' : i === 2 ? '?' : '', { x: 0, y: 4, size: 60, font: 'S', anchor: 'middle', color: i === 1 ? N.dim : '#fff' });
    const lab = NT(o, labels[i], { x: 1110, y, size: 52, color: [N.teal, N.dim, N.red][i], ls: 2 });
    return { o, a, lens, liquid, lab, y };
  });
  return {
    g,
    draw(t, t0, ts) {
      bg.draw(t); k.draw(t, t0);
      rows.forEach((r, i) => {
        r.o.setAttribute('opacity', clamp(prog(t, ts[i], ts[i] + 0.3)).toFixed(3));
        r.a.draw(t, ts[i], { k: 0 });
        if (showLens[i]) popAt(r.lens, t, ts[i] + 0.4); else r.lens.setAttribute('opacity', 0);
        if (i === 2) r.liquid.setAttribute('opacity', (0.6 + 0.4 * Math.sin(t * 5)).toFixed(3));
      });
    },
  };
}
// Five signs: a row of five icons, each lit on its cue; the current one is big.
const SIGN_ART = [['a_receta', OBJ.receta, 'RECETA'], ['a_lupa', OBJ.lupa, 'REGISTRO'], ['a_caja', OBJ.box, 'EMPAQUE'], ['a_pluma', OBJ.pen(), 'LOTE'], ['a_celular', OBJ.phone, 'PRECIO']];
function FiveSigns(p, { notes = [] } = {}) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.teal });
  const k = Kicker(g, '5 señales para no caer', { y: 120 });
  const items = SIGN_ART.map(([art, fb, label], i) => {
    const x = 260 + i * 350, o = el('g', {}, g);
    el('circle', { cx: x, cy: 770, r: 110, fill: N.panel, stroke: N.line, 'stroke-width': 4 }, o);
    const a = Art(o, art, { x, y: 770, w: 140 }, fb);
    NT(o, String(i + 1), { x: x - 96, y: 676, size: 56, font: 'S', color: N.gold });
    const lab = NT(o, label, { x, y: 935, size: 46, anchor: 'middle', ls: 2 });
    return { o, a, lab, x };
  });
  const big = items.map(({ x }, i) => {
    const o = el('g', {}, g);
    const a = Art(o, SIGN_ART[i][0], { x: 660, y: 430, w: 360 }, SIGN_ART[i][1]);
    NT(o, SIGN_ART[i][2], { x: 1000, y: 360, size: 96, color: N.gold, ls: 3 });
    if (notes[i]) NT(o, notes[i], { x: 1000, y: 470, size: 46, font: 'S', italic: true });
    return { o, a };
  });
  return {
    g,
    draw(t, t0, ts) {
      bg.draw(t); k.draw(t, t0);
      items.forEach((it, i) => {
        const on = t >= ts[i];
        it.o.setAttribute('opacity', (clamp(prog(t, t0 + 0.2 + i * 0.08, t0 + 0.5 + i * 0.08)) * (on ? 1 : 0.35)).toFixed(3));
        it.a.draw(t, t0 + 0.2 + i * 0.08, { k: on ? 0.03 : 0, rate: 4 });
        it.lab.setAttribute('fill', on ? N.gold : N.white);
      });
      big.forEach((b, i) => {
        const a = ts[i], z = ts[i + 1] ?? 1e9;
        const v = clamp(prog(t, a, a + 0.35)) * (1 - clamp(prog(t, z - 0.25, z)));
        b.o.setAttribute('opacity', v.toFixed(3));
        b.a.draw(t, a, { k: 0.015 });
      });
    },
  };
}
// Buying online from abroad: laptop → plane → parcel, crossed out; then the local pharmacy, ticked.
function AbroadNo(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red });
  const k = Kicker(g, 'Ayudar desde lejos', { y: 130 });
  const pl = Art(g, 'a_avion', { x: 700, y: 360, w: 320 }, OBJ.plane);
  const pk = Art(g, 'a_paquete', { x: 1150, y: 560, w: 260 }, OBJ.parcel);
  const path = el('path', { d: 'M300 600 C500 300 900 280 1150 480', fill: 'none', stroke: N.dim, 'stroke-width': 6, 'stroke-dasharray': '16 14' }, g);
  const lap = Placed(g, 300, 600); el('rect', { x: -110, y: -80, width: 220, height: 140, rx: 10, fill: '#1B2230', stroke: '#3A4558', 'stroke-width': 6 }, lap); el('rect', { x: -140, y: 60, width: 280, height: 20, rx: 8, fill: '#3A4558' }, lap);
  const cross = Placed(g, 760, 560); el('path', { d: 'M-90 -90 L90 90 M90 -90 L-90 90', stroke: N.red, 'stroke-width': 26, 'stroke-linecap': 'round' }, cross);
  const l1 = Pill(g, 'COMPRAR POR INTERNET: NO', { x: 760, y: 820, size: 50, fill: N.red });
  const ph = Art(g, 'a_farmacia', { x: 1600, y: 520, w: 340 }, OBJ.pharmacy);
  const ok = Placed(g, 1720, 360); el('circle', { r: 50, fill: N.teal }, ok); el('path', { d: 'M-22 2 L-6 20 L24 -16', fill: 'none', stroke: '#fff', 'stroke-width': 12, 'stroke-linecap': 'round' }, ok);
  const l2 = Pill(g, 'CON RECETA, EN SU PAÍS', { x: 1600, y: 820, size: 46, color: N.teal, stroke: N.teal });
  return {
    g,
    draw(t, t0, tNo, tYes) {
      bg.draw(t); k.draw(t, t0);
      popAt(lap, t, t0 + 0.2);
      path.setAttribute('opacity', clamp(prog(t, t0 + 0.4, t0 + 0.8)).toFixed(3));
      path.setAttribute('stroke-dashoffset', (-t * 40).toFixed(1));
      pl.draw(t, t0 + 0.5, { k: 0 }); tr(pl.g, lerp(450, 950, E.inOut(prog(t, t0 + 0.5, t0 + 3))), 380 - 60 * Math.sin(prog(t, t0 + 0.5, t0 + 3) * Math.PI), 1, -4);
      pk.draw(t, t0 + 2.4, { k: 0.01 });
      popAt(cross, t, tNo); l1.draw(t, tNo + 0.2);
      ph.draw(t, tYes, { k: 0.01 }); popAt(ok, t, tYes + 0.5); l2.draw(t, tYes + 0.4);
    },
  };
}
// Glucose meter reading below 70 + the threshold line.
function MeterLow(p, { value = 64 } = {}) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.red });
  const k = Kicker(g, 'Si tiene glucómetro, mídase', { y: 130 });
  const m = Art(g, 'a_glucometro', { x: 700, y: 560, w: 420 }, OBJ.meter);
  const own = (window.ART || {}).a_glucometro;
  const scr = Placed(g, 700, own ? 470 : 470);
  const num = NT(scr, '', { x: 0, y: 0, size: 110, font: 'S', anchor: 'middle', color: N.ink });
  NT(scr, 'mg/dL', { x: 0, y: 70, size: 34, anchor: 'middle', color: '#3B4048' });
  const big = NT(g, 'MENOS DE 70', { x: 1360, y: 470, size: 100, anchor: 'middle', color: N.red, ls: 2 });
  const sub = NT(g, '= azúcar baja', { x: 1360, y: 580, size: 64, font: 'S', italic: true, anchor: 'middle' });
  return {
    g,
    draw(t, t0) {
      bg.draw(t); k.draw(t, t0); m.draw(t, t0 + 0.1, { k: 0 });
      const v = Math.round(lerp(98, value, E.inOut(prog(t, t0 + 0.8, t0 + 2.4))));
      num.textContent = t > t0 + 0.6 ? String(v) : '';
      num.setAttribute('fill', v < 70 ? N.red : N.ink);
      show(big, t, t0 + 2.4); show(sub, t, t0 + 2.8);
    },
  };
}
// Cost to make vs price: factory → coins, with the honest notes.
function MakeCost(p) {
  const g = el('g', {}, p), bg = AnimBG(g, { tint: N.gold });
  const k = Kicker(g, 'Cuánto cuesta fabricarla', { y: 130 });
  const f = Art(g, 'a_fabrica', { x: 480, y: 520, w: 460 }, OBJ.factory);
  const c = Art(g, 'a_monedas', { x: 1440, y: 560, w: 360 }, OBJ.coins);
  const arrow = DrawLine(g, 'M760 520 L1200 520', { color: N.gold, width: 12 });
  const num = NT(g, 'US$ 28 – 140', { x: 980, y: 420, size: 96, font: 'S', anchor: 'middle', color: N.gold });
  const per = NT(g, 'al año (estimación)', { x: 980, y: 620, size: 46, font: 'S', italic: true, anchor: 'middle' });
  const n1 = Pill(g, 'COSTO DE FABRICAR, NO PRECIO EN FARMACIA', { x: 960, y: 820, size: 42, stroke: N.red });
  const n2 = Pill(g, 'ESTUDIO AÚN NO PUBLICADO EN REVISTA', { x: 960, y: 930, size: 38, color: N.dim });
  return {
    g,
    draw(t, t0, tNote, tPub, tNum = t0 + 1.0) {
      bg.draw(t); k.draw(t, t0); f.draw(t, t0 + 0.1); c.draw(t, tNum - 0.1);
      arrow.draw(prog(t, tNum - 0.5, tNum + 0.2)); show(num, t, tNum); show(per, t, tNum + 1.8);
      n1.draw(t, tNote); n2.draw(t, tPub);
    },
  };
}
