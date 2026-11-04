// Shared pieces for "7 ejercicios mentales" (brain-mascot style). Needs lib.js, kit.js, cues.js, sizes.js.
// Every section runs on the global voice timeline (t = seconds into voice.mp3). A section is a list of
// beats; each beat starts on its cue word and lasts until the next beat's cue (or END).
const T = CUE, LEAD = 0.15;
const at = k => { if (!(k in T)) throw new Error('missing cue ' + k); return T[k] - LEAD; };
const K = { bg: '#F7F6F2', ink: '#1B1A22', pink: '#E0707A', pinkL: '#F9D3D3', yellow: '#F7C531', green: '#3FAE5A',
  red: '#E23B2E', amber: '#F2A33A', grey: '#8A8794', blue: '#4A7BC0', white: '#FFFFFF' };
const IMG = n => 'cut/' + n + '.png';
let HOOK_END = 45;            // hard cuts before this time, short cross-fades after (a series part sets its own)

function Stage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: K.bg }, svg);
  return svg;
}

// ------------------------------------------------------------------ beats
const BEATS = [];
function beat(k, build) { BEATS.push({ k, build }); }
function initBeats(svg, end) {
  BEATS.forEach((b, i) => {
    b.a = tt(b.k);
    b.b = i < BEATS.length - 1 ? tt(BEATS[i + 1].k) : end;
    b.g = el('g', {}, svg);
    el('rect', { width: 1920, height: 1080, fill: K.bg }, b.g);
    b.draw = b.build(b.g, b) || (() => {});
  });
}
function drawBeats(t) {
  // Transitions: before HOOK_END a hard cut with a quick zoom settle; after it the new beat pushes in from the
  // right (slide + slight scale + fade) while the old one stays drawn and drifts left underneath.
  const X = 0.45;
  for (const b of BEATS) {
    const hook = b.a < HOOK_END, tail = b.b < HOOK_END ? 0 : X;
    const on = t >= b.a && t < b.b + tail;
    if (!on) { b.g.style.display = 'none'; continue; }
    b.g.style.display = '';
    const k = E.out(prog(t, b.a, b.a + (hook ? 0.3 : X)));
    let dx = hook ? 0 : (1 - k) * 560, sc = 1 + (hook ? 0.07 : 0.04) * (1 - k);
    if (t > b.b) { const ex = E.inOut(prog(t, b.b, b.b + X)); dx -= ex * 240; sc -= ex * 0.03; }
    b.g.setAttribute('transform', `translate(${(960 + dx).toFixed(1)} 540) scale(${sc.toFixed(4)}) translate(-960 -540)`);
    b.g.setAttribute('opacity', hook ? 1 : clamp(prog(t, b.a, b.a + 0.12)).toFixed(3));
    b.draw(t, b.a, b.b);
  }
}
// cue or number → time
const tt = (x, d) => x === undefined ? d : typeof x === 'number' ? x : at(x);

// ------------------------------------------------------------------ drawing helpers (ink style)
function txt(p, str, { x, y, size = 60, color = K.ink, weight = 900, anchor = 'middle' } = {}) {
  return Text(p, str, { x, y, size, color, weight, anchor });
}
function hiText(p, str, hi, { x, y, size, color = K.ink, hiColor = K.pink, anchor = 'middle' }) {
  const t = el('text', { x, y, 'font-size': size, 'font-weight': 900, 'text-anchor': anchor, 'dominant-baseline': 'middle', fill: color }, p);
  if (hi && str.includes(hi)) {
    const [a, b] = str.split(hi);
    for (const [s, c] of [[a, color], [hi, hiColor], [b, color]]) if (s) { const sp = el('tspan', { fill: c }, t); sp.textContent = s; }
  } else t.textContent = str;
  return t;
}
// Speech-bubble caption: white pill, thick ink outline, optional tail ('l', 'r' or '').
function Bubble(p, str, { cx = 960, cy = 975, size = 62, hi = '', tail = '' } = {}) {
  const g = el('g', {}, p), back = el('g', {}, g);
  const t = hiText(g, str, hi, { x: cx, y: cy + 3, size });
  const w = t.getComputedTextLength() + size * 1.3, h = size * 1.85;
  if (tail) {
    const tx = tail === 'l' ? cx - w / 2 + 80 : cx + w / 2 - 80, dir = tail === 'l' ? -1 : 1;
    el('path', { d: `M${tx - 24} ${cy - h / 2 + 4} L${tx + dir * 36} ${cy - h / 2 - 44} L${tx + 26} ${cy - h / 2 + 4} Z`, fill: K.white, stroke: K.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, back);
  }
  el('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: h / 2, fill: K.white, stroke: K.ink, 'stroke-width': 7 }, back);
  if (tail) { const tx = tail === 'l' ? cx - w / 2 + 80 : cx + w / 2 - 80; el('rect', { x: tx - 22, y: cy - h / 2 + 2, width: 44, height: 12, fill: K.white }, back); }
  g.cx = cx; g.cy = cy;
  return g;
}
// Pill chip with ink outline.
function Chip(p, str, { cx, cy, size = 44, fill = K.white, color = K.ink }) {
  const g = el('g', {}, p);
  const t = txt(g, str, { x: cx, y: cy + 2, size, color });
  const w = t.getComputedTextLength() + size * 1.2, h = size * 1.8;
  const r = el('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: h / 2, fill, stroke: K.ink, 'stroke-width': 6 }, g);
  g.insertBefore(r, t);
  g.cx = cx; g.cy = cy;
  return g;
}
// Cut-out image fitted in a box (fit = longest side), centred.
function Img(p, n, cx, cy, fit) {
  const [iw, ih] = SZ[n], s = fit / Math.max(iw, ih), g = el('g', {}, p);
  el('image', { href: IMG(n), x: cx - iw * s / 2, y: cy - ih * s / 2, width: iw * s, height: ih * s }, g);
  g.cx = cx; g.cy = cy; g.s = s;
  return g;
}
// Mascot standing on a floor line (h = height in px).
function Mascot(p, n, { cx, floor = 900, h = 560 }) {
  const [iw, ih] = SZ[n], s = h / ih, g = el('g', {}, p);
  el('image', { href: IMG(n), x: cx - iw * s / 2, y: floor - h, width: iw * s, height: h }, g);
  g.cx = cx; g.cy = floor - h / 2;
  return g;
}
const enter = (e, t, t0, dir = 'u') => {   // pop for small things, slide for mascots
  if (dir === 'pop') return pop(e, t, t0, e.cx, e.cy);
  slideIn(e, t, t0, dir, 260);
};
function live(e, t, t0, opts = {}) {      // enter, then idle float
  if (t < t0 + 0.42) enter(e, t, t0, opts.dir || 'pop');
  else { e.setAttribute('opacity', 1); float(e, t, e.cx, e.cy, { amp: opts.amp ?? 10, tilt: opts.tilt ?? 2.2, period: 2.6, phase: opts.phase || 0 }); }
}
function hide(e) { e.setAttribute('opacity', 0); }
// small corner tag (dramatisation / source)
function Tag(p, str, { x = 1880, y = 1050, anchor = 'end' } = {}) { return txt(p, str, { x, y, size: 28, weight: 700, color: K.grey, anchor }); }
// series badge top-left
function Badge(p, str) { return Chip(p, str, { cx: 0, cy: 70, size: 30, fill: K.yellow }); }

// ------------------------------------------------------------------ brain maps (flat colours split by region)
// prefix 'lobe' (lateral brain), 'limb' (hippocampus/amygdala) or 'cor' (coronal slice).
const MAPS = { lobe: 'brain_color', sag: 'sag_color' };
function BrainMap(p, prefix, { cx, cy, w }) {
  const [iw, ih] = SZ[MAPS[prefix]], s = w / iw, x = cx - w / 2, y = cy - ih * s / 2;
  const g = el('g', {}, p);
  el('image', { href: IMG(prefix + '_dim'), x, y, width: w, height: ih * s }, g);
  const regs = {};
  for (const n in CEN) if (n.startsWith(prefix + '_')) {
    const r = n.slice(prefix.length + 1);
    regs[r] = el('image', { href: IMG(n), x, y, width: w, height: ih * s, opacity: 0 }, g);
  }
  const pt = r => [x + CEN[prefix + '_' + r][0] * s, y + CEN[prefix + '_' + r][1] * s];
  return {
    g, pt, x, y, w, h: ih * s,
    // on: [[region, cue|time], ...] — each region fades in at its time (and pulses gently)
    draw(t, on) {
      for (const r in regs) {
        const e = on.find(o => o[0] === r);
        const k = e ? E.out(prog(t, tt(e[1], -1), tt(e[1], -1) + 0.35)) * (e[2] !== undefined ? 1 - prog(t, tt(e[2]), tt(e[2]) + 0.3) : 1) : 0;
        regs[r].setAttribute('opacity', (k * (0.88 + 0.12 * Math.sin(t * 4))).toFixed(3));
      }
    },
  };
}
// label pill with a short ink leader to a point
function Label(p, str, [px, py], { dx = 0, dy = -150, size = 46, fill = K.white } = {}) {
  const g = el('g', {}, p);
  el('line', { x1: px, y1: py, x2: px + dx, y2: py + dy, stroke: K.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }, g);
  el('circle', { cx: px, cy: py, r: 11, fill: K.white, stroke: K.ink, 'stroke-width': 5 }, g);
  Chip(g, str, { cx: px + dx, cy: py + dy, size, fill });
  g.cx = px + dx; g.cy = py + dy;
  return g;
}

// ------------------------------------------------------------------ beat builders
// Full panel still with push-in + caption bubble.
function still(n, o = {}) {
  return (g, b) => {
    const S = Still(g, IMG(n), { x: 200, y: 40, w: 1520, h: 850, iw: SZ[n][0], ih: SZ[n][1], r: 34, focus: o.focus || [0.5, 0.45], zoom: o.zoom ?? 0.2 });
    const cap = o.cap ? Bubble(g, o.cap, { cy: 965, hi: o.hi, size: o.size || 62 }) : null;
    const tag = o.tag ? Tag(g, o.tag, { x: 1700, y: 80 }) : null;
    const chips = (o.chips || []).map(([s, k, fill], i) => [Chip(g, s, { cx: 1500, cy: 150 + i * 120, size: 46, fill: fill || K.white }), k]);
    const stamp = o.stamp ? [Stamp(g, o.stamp[0], { cx: 960, cy: 440, size: 110, color: o.stamp[2] || K.red }), o.stamp[1]] : null;
    return t => {
      S.draw(t, b.a, b.b);
      if (o.punch) punch(S.g, t, tt(o.punch), 960, 465, 0.06);
      if (cap) pop(cap, t, tt(o.capAt, b.a + 0.25), 960, 965);
      if (tag) show(tag, t, b.a);
      chips.forEach(([c, k]) => pop(c, t, tt(k), c.cx, c.cy));
      if (stamp) stamp[0].draw ? stamp[0].draw(t, tt(stamp[1])) : pop(stamp[0], t, tt(stamp[1]), 960, 440);
    };
  };
}
// Brain map beat. o.map: 'lobe'|'limb'|'cor'; o.on: [[region, cue]]; o.labels: [[text, region|[x,y], cue, dx, dy]];
// o.mascot: [name, cue]; o.items: [[cut, label, cue]] shown on the right; o.extra(g, B) → draw(t) for custom bits.
function brain(o = {}) {
  return (g, b) => {
    const right = o.mascot || o.items || o.side;
    const B = BrainMap(g, o.map || 'lobe', { cx: right ? 690 : 960, cy: o.cy || 480, w: o.w || (right ? 940 : 940) });
    if (o.full) el('image', { href: IMG(MAPS[o.map || 'lobe']), x: B.x, y: B.y, width: B.w, height: B.h }, B.g);
    const labs = (o.labels || []).map(([s, r, k, dx = 0, dy = -170]) => [Label(g, s, typeof r === 'string' ? B.pt(r) : r, { dx, dy }), k]);
    const m = o.mascot ? Mascot(g, o.mascot[0], { cx: 1560, floor: 880, h: 640 }) : null;
    const items = (o.items || []).map(([n, s, k], i, a) => {
      const three = a.length > 2, y = 430 + (i - (a.length - 1) / 2) * (three ? 290 : 390);
      const it = el('g', {}, g);
      if (n.startsWith('m_')) Mascot(it, n, { cx: 1480, floor: y + (three ? 80 : 110), h: three ? 190 : 250 }); else Img(it, n, 1480, y, three ? 160 : 230);
      Chip(it, s, { cx: 1480, cy: y + (three ? 125 : 160), size: three ? 38 : 42 });
      it.cx = 1480; it.cy = y;
      return [it, k];
    });
    const cap = o.cap ? Bubble(g, o.cap, { cy: 975, hi: o.hi, size: o.size || 60 }) : null;
    const ex = o.extra ? o.extra(g, B) : null;
    return t => {
      B.draw(t, o.on || []);
      if (o.punch) punch(B.g, t, tt(o.punch), B.x + B.w / 2, B.y + B.h / 2, 0.06);
      labs.forEach(([l, k]) => pop(l, t, tt(k, b.a + 0.2), l.cx, l.cy));
      if (m) live(m, t, tt(o.mascot[1], b.a + 0.1), { dir: 'r' });
      items.forEach(([it, k]) => pop(it, t, tt(k, b.a + 0.2), it.cx, it.cy));
      if (cap) pop(cap, t, tt(o.capAt, b.a + 0.3), 960, 975);
      if (ex) ex(t);
    };
  };
}
// Mascot beat: one or two mascots + caption + chips/stamp/cut-outs.
function mascot(n, o = {}) {
  return (g, b) => {
    const two = o.with;
    const m1 = Mascot(g, n, { cx: two ? 700 : (o.cx || 960), floor: o.floor || 860, h: o.h || 640 });
    const m2 = two ? Mascot(g, two[0], { cx: 1220, floor: o.floor || 860, h: o.h || 640 }) : null;
    const cap = o.cap ? Bubble(g, o.cap, { cy: o.capY || 975, hi: o.hi, size: o.size || 62 }) : null;
    const chips = (o.chips || []).map(([s, k, fill], i, a) => {
      const side = i % 2 ? 1 : -1, row = Math.floor(i / 2);
      const c = Chip(g, s, { cx: 960 + side * 520, cy: 320 + row * 230, size: 54, fill: fill || K.white });
      return [c, k];
    });
    const extras = (o.extra || []).map(([cn, k, x, y, fit]) => [Img(g, cn, x, y, fit), k]);
    const stamp = o.stamp ? Chip(g, o.stamp[0], { cx: 960, cy: 200, size: 80, fill: o.stamp[2] || K.white, color: o.stamp[3] || K.ink }) : null;
    const ex = o.custom ? o.custom(g) : null;
    return t => {
      live(m1, t, tt(o.at, b.a), { dir: two ? 'l' : 'pop' });
      if (m2) live(m2, t, tt(two[1], b.a + 0.2), { dir: 'r', phase: 0.4 });
      if (cap) pop(cap, t, tt(o.capAt, b.a + 0.3), 960, o.capY || 975);
      chips.forEach(([c, k]) => pop(c, t, tt(k, b.a + 0.4), c.cx, c.cy));
      extras.forEach(([e, k]) => live(e, t, tt(k, b.a + 0.3), { amp: 4 }));
      if (stamp) pop(stamp, t, tt(o.stamp[1]), 960, 200);
      if (ex) ex(t);
    };
  };
}
// Row of pictures with labels, popping one per cue.
function row(list, o = {}) {
  return (g, b) => {
    const n = list.length, gap = Math.min(520, 1700 / n);
    const its = list.map(([cn, s, k, fill], i) => {
      const x = 960 + (i - (n - 1) / 2) * gap, it = el('g', {}, g);
      if (cn.startsWith('m_')) Mascot(it, cn, { cx: x, floor: 700, h: 470 }); else Img(it, cn, x, 470, 330);
      Chip(it, s, { cx: x, cy: 800, size: n > 3 ? 38 : 46, fill: fill || K.white });
      it.cx = x; it.cy = 560;
      return [it, k];
    });
    const head = o.head ? hiText(g, o.head, o.hi, { x: 960, y: 120, size: 74 }) : null;
    const cap = o.cap ? Bubble(g, o.cap, { cy: 975, hi: o.capHi, size: 56 }) : null;
    return t => {
      its.forEach(([it, k], i) => live(it, t, tt(k, b.a + 0.15 * i), { amp: 4, phase: i * 0.3 }));
      if (head) show(head, t, b.a);
      if (cap) pop(cap, t, tt(o.capAt, b.a + 0.4), 960, 975);
    };
  };
}
// Big statement (1–2 lines) with optional picture under it.
function big(lines, o = {}) {
  return (g, b) => {
    const ls = lines.map(([s, hi, color], i) => hiText(g, s, hi, { x: 960, y: (o.y || 330) + i * 150, size: o.size || 120, color: color || K.ink }));
    const pic = o.pic ? (o.pic.startsWith('m_') ? Mascot(g, o.pic, { cx: o.px || 960, floor: 1010, h: 470 }) : Img(g, o.pic, o.px || 960, 780, 360)) : null;
    const ex = o.custom ? o.custom(g) : null;
    return t => {
      ls.forEach((l, i) => show(l, t, tt(o.at && o.at[i], b.a + i * 0.35), 1e9, { dy: 50 }));
      if (pic) live(pic, t, b.a + 0.3);
      if (ex) ex(t);
    };
  };
}
// Section opener: "PUNTO n" chip + title over a picture (≤ 1.5 s of pure title, then the picture keeps going).
function kicker(n, title, o = {}) {
  return (g, b) => {
    const pic = o.map ? BrainMap(g, o.map, { cx: 960, cy: 600, w: 760 }) : null;
    if (pic && o.full) el('image', { href: IMG(MAPS[o.map]), x: pic.x, y: pic.y, width: pic.w, height: pic.h }, pic.g);
    const c = Chip(g, 'PUNTO ' + n, { cx: 960, cy: 110, size: 54, fill: K.yellow });
    const h = hiText(g, title, o.hi, { x: 960, y: 230, size: 92 });
    const sub = o.sub ? txt(g, o.sub, { x: 960, y: 1010, size: 46, weight: 800, color: K.grey }) : null;
    return t => {
      pop(c, t, b.a, 960, 110); show(h, t, b.a + 0.2);
      if (pic) { pic.draw(t, o.on || []); pop(pic.g, t, b.a + 0.1, 960, 600); }
      if (sub) show(sub, t, b.a + 0.6);
    };
  };
}
// Call to action: subscribe / comment, with a mascot.
function cta(kind, o = {}) {
  return (g, b) => {
    const m = Mascot(g, o.m || 'm_waving', { cx: 620, floor: 900, h: 640 });
    const label = { sub: 'SUSCRÍBETE', comment: 'COMENTA' }[kind];
    const pill = el('g', {}, g);
    const red = kind === 'sub';
    const pt = txt(pill, label, { x: 1250, y: 470, size: 80, color: red ? K.white : K.ink });
    const w = pt.getComputedTextLength() + 140;
    pill.insertBefore(el('rect', { x: 1250 - w / 2, y: 400, width: w, height: 140, rx: 70, fill: red ? K.red : K.white, stroke: K.ink, 'stroke-width': 8 }), pt);
    pill.cx = 1250; pill.cy = 470;
    const sub = o.sub ? txt(g, o.sub, { x: 1250, y: 640, size: 46, weight: 800, color: K.grey }) : null;
    // bell icon
    const bell = el('g', {}, g);
    el('path', { d: 'M1250 700 c-60 0 -80 50 -80 100 v40 l-30 40 h220 l-30 -40 v-40 c0 -50 -20 -100 -80 -100 z', fill: K.yellow, stroke: K.ink, 'stroke-width': 8, 'stroke-linejoin': 'round' }, bell);
    el('circle', { cx: 1250, cy: 905, r: 22, fill: K.yellow, stroke: K.ink, 'stroke-width': 8 }, bell);
    if (kind !== 'sub') bell.style.display = 'none';
    return t => {
      live(m, t, b.a, { dir: 'l' });
      pop(pill, t, b.a + 0.3, 1250, 470);
      if (sub) show(sub, t, b.a + 0.6);
      set(bell, { transform: `rotate(${(Math.sin(t * 9) * 12 * clamp(prog(t, b.a + 0.8, b.a + 1))).toFixed(1)} 1250 700)`, opacity: clamp(prog(t, b.a + 0.7, b.a + 0.9)) });
    };
  };
}
// Red stroke card. icons: [[cut|null, label, cue]]
function strokeCard(head, icons, o = {}) {
  return (g, b) => {
    el('rect', { x: 120, y: 90, width: 1680, height: 900, rx: 40, fill: K.white, stroke: K.ink, 'stroke-width': 9 }, g);
    el('rect', { x: 120, y: 90, width: 1680, height: 170, rx: 40, fill: K.red, stroke: K.ink, 'stroke-width': 9 }, g);
    el('rect', { x: 125, y: 200, width: 1670, height: 56, fill: K.red }, g);
    txt(g, head, { x: 960, y: 178, size: 76, color: K.white });
    const n = icons.length;
    const its = icons.map(([cn, s, k], i) => {
      const x = 960 + (i - (n - 1) / 2) * 1500 / n, it = el('g', {}, g);
      if (cn) (cn.startsWith('m_') ? Mascot(it, cn, { cx: x, floor: 650, h: 380 }) : Img(it, cn, x, 470, 300));
      txt(it, s, { x, y: 710, size: n > 4 ? 40 : n > 3 ? 42 : 48 });
      it.cx = x; it.cy = 520;
      return [it, k];
    });
    const go = el('g', {}, g);
    const gt = txt(go, o.go || 'URGENCIAS · ICTUS (ACV)', { x: 960, y: 862, size: 60, color: K.white });
    const gw = gt.getComputedTextLength() + 140;
    go.insertBefore(el('rect', { x: 960 - gw / 2, y: 790, width: gw, height: 140, rx: 70, fill: K.red, stroke: K.ink, 'stroke-width': 8 }), gt);
    go.cx = 960; go.cy = 860;
    return t => {
      its.forEach(([it, k], i) => pop(it, t, tt(k, b.a + 0.3 + i * 0.3), it.cx, it.cy));
      pop(go, t, tt(o.goAt, b.a + 1.2), 960, 860);
    };
  };
}
// Amber advice card (hold, calm).
function adviceCard(head, lines, o = {}) {
  return (g, b) => {
    el('rect', { x: 260, y: 150, width: 1400, height: 160 + lines.length * 120 + 40, rx: 40, fill: K.white, stroke: K.ink, 'stroke-width': 9 }, g);
    el('rect', { x: 260, y: 150, width: 1400, height: 140, rx: 40, fill: o.color || K.amber, stroke: K.ink, 'stroke-width': 9 }, g);
    el('rect', { x: 265, y: 240, width: 1390, height: 46, fill: o.color || K.amber }, g);
    txt(g, head, { x: 960, y: 222, size: 66, color: K.ink });
    const ls = lines.map(([s, k], i) => [hiText(g, s, '', { x: 960, y: 380 + i * 120, size: 60 }), k]);
    const m = o.m ? Mascot(g, o.m, { cx: 1700, floor: 1040, h: 420 }) : null;
    return t => {
      ls.forEach(([l, k], i) => show(l, t, tt(k, b.a + 0.4 + i * 0.5)));
      if (m) live(m, t, b.a + 0.3, { dir: 'r' });
    };
  };
}
// Count-up number with picture.
function countUp(to, label, o = {}) {
  return (g, b) => {
    const pic = o.pic ? Img(g, o.pic, 960, 760, 520) : null;
    const num = txt(g, '0', { x: 960, y: 260, size: 200 });
    const lab = txt(g, label, { x: 960, y: 410, size: 64, color: K.pink });
    const src = o.src ? Tag(g, o.src) : null;
    return t => {
      const t0 = b.a + 0.2, t1 = o.until ? tt(o.until) + 0.6 : t0 + 1.6;
      num.textContent = Math.round(to * E.out(prog(t, t0, t1))).toLocaleString('es-ES');
      show(num, t, b.a); show(lab, t, t0 + 0.2); if (src) show(src, t, t0 + 0.4);
      if (pic) live(pic, t, b.a, { amp: 5 });
    };
  };
}
// Ending card for a series part.
function endCard(o) {
  return (g, b) => {
    const m = Mascot(g, 'm_pointing', { cx: 520, floor: 900, h: 640 });
    const h = txt(g, o.next, { x: 1220, y: 330, size: 76 });
    const c = Chip(g, o.chip, { cx: 1220, cy: 480, size: 64, fill: K.yellow });
    const topics = txt(g, o.topics, { x: 1220, y: 620, size: 44, weight: 800, color: K.grey });
    const disc = txt(g, 'Contenido educativo: no sustituye una valoración médica.', { x: 960, y: 1020, size: 34, weight: 700, color: K.grey });
    const arrow = el('path', { d: 'M1520 470 l70 0 m-30 -34 l34 34 l-34 34', fill: 'none', stroke: K.ink, 'stroke-width': 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return t => {
      live(m, t, b.a, { dir: 'l' });
      show(h, t, b.a + 0.2); pop(c, t, b.a + 0.5, 1220, 480); show(topics, t, b.a + 0.8); show(disc, t, b.a + 1.0);
      set(arrow, { transform: `translate(${(10 * Math.sin(t * 5)).toFixed(1)} 0)`, opacity: clamp(prog(t, b.a + 0.6, b.a + 0.9)) });
    };
  };
}
// Dashed connection lines between points (city roads / networks).
function Network(p, pts, { color = K.ink, w = 7 } = {}) {
  const g = el('g', {}, p), lines = [];
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const [a, c] = [pts[i], pts[j]];
    lines.push(el('line', { x1: a[0], y1: a[1], x2: c[0], y2: c[1], stroke: color, 'stroke-width': w, 'stroke-dasharray': '14 14', 'stroke-linecap': 'round', opacity: 0 }, g));
  }
  pts.forEach(q => el('circle', { cx: q[0], cy: q[1], r: 16, fill: K.white, stroke: K.ink, 'stroke-width': 6 }, g));
  return { g, draw(t, t0) { lines.forEach((l, i) => set(l, { opacity: clamp(prog(t, t0 + i * 0.08, t0 + i * 0.08 + 0.3)), 'stroke-dashoffset': (-t * 40).toFixed(1) })); g.setAttribute('opacity', clamp(prog(t, t0, t0 + 0.2))); } };
}
// Big ✓ / ✗ mark.
function Mark(p, ok, cx, cy, s = 1) {
  const g = el('g', { }, p);
  el('circle', { cx, cy, r: 60 * s, fill: ok ? K.green : K.red, stroke: K.ink, 'stroke-width': 7 }, g);
  el('path', { d: ok ? `M${cx - 28 * s} ${cy} l${20 * s} ${22 * s} l${38 * s} ${-44 * s}` : `M${cx - 26 * s} ${cy - 26 * s} l${52 * s} ${52 * s} M${cx + 26 * s} ${cy - 26 * s} l${-52 * s} ${52 * s}`, fill: 'none', stroke: K.white, 'stroke-width': 14 * s, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  g.cx = cx; g.cy = cy;
  return g;
}
// Water drop icon (path in a 100×100 box).
function Drop(p, color = '#7FC4F0') {
  const g = el('g', {}, p);
  el('path', { d: 'M50 6 C66 32 82 50 82 66 A32 32 0 0 1 18 66 C18 50 34 32 50 6 Z', fill: color, stroke: K.ink, 'stroke-width': 7, 'stroke-linejoin': 'round' }, g);
  el('ellipse', { cx: 38, cy: 64, rx: 7, ry: 12, fill: K.white, opacity: 0.6 }, g);
  return g;
}
// Arrow from (x1,y1) to (x2,y2).
function Arrow(p, x1, y1, x2, y2, color = K.pink, w = 12) {
  const a = Math.atan2(y2 - y1, x2 - x1), hl = 30;
  return el('path', { d: `M${x1} ${y1} L${x2} ${y2} M${x2 - hl * Math.cos(a - 0.5)} ${y2 - hl * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - hl * Math.cos(a + 0.5)} ${y2 - hl * Math.sin(a + 0.5)}`, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, p);
}

// ------------------------------------------------------------------ "7 ejercicios" pieces
const EX_COL = ['#CFE6F7', '#FFF1B8', '#F9D3D3', '#CDEFD0', '#E5DAF5', '#FFE0C2', '#D6F0EE'];
// Exercise card: "EJERCICIO n" disc, 7 progress dots, the exercise's name, a mascot.
function ejercicio(n, title, o = {}) {
  return (g, b) => {
    const disc = el('g', {}, g);
    el('circle', { cx: 960, cy: 230, r: 130, fill: K.yellow, stroke: K.ink, 'stroke-width': 9 }, disc);
    txt(disc, 'EJERCICIO', { x: 960, y: 180, size: 36 });
    txt(disc, String(n), { x: 960, y: 262, size: 130 });
    disc.cx = 960; disc.cy = 230;
    const dots = Array.from({ length: 7 }, (_, i) => el('circle', { cx: 960 + (i - 3) * 70, cy: 415, r: 21, fill: i < n ? K.pink : K.white, stroke: K.ink, 'stroke-width': 5 }, g));
    const h = hiText(g, title, o.hi || title, { x: 960, y: 525, size: title.length > 24 ? 72 : 88 });
    const sub = o.sub ? hiText(g, o.sub, o.subHi, { x: 960, y: 615, size: 50, color: K.grey }) : null;
    const m = o.m ? Mascot(g, o.m, { cx: 960, floor: 1050, h: 380 }) : null;
    return t => {
      pop(disc, t, b.a, 960, 230);
      dots.forEach((d, i) => set(d, { opacity: clamp(prog(t, b.a + 0.2 + i * 0.06, b.a + 0.35 + i * 0.06)), r: i === n - 1 ? 21 + 5 * Math.sin(t * 5) : 21 }));
      show(h, t, b.a + 0.4, 1e9, { dy: 40 });
      if (sub) show(sub, t, tt(o.subAt, b.a + 1.0));
      if (m) live(m, t, b.a + 0.7);
    };
  };
}
// "EJERCICIO n / 7" chip top-left (call inside custom builders).
function ExTag(p, n) { return Chip(p, `EJERCICIO ${n} / 7`, { cx: 200, cy: 62, size: 30, fill: K.yellow }); }
// Rounded box with a big value (number / ? / answer).
function Box(p, str, cx, cy, { w = 190, h = 170, size = 96, fill = K.white, color = K.ink } = {}) {
  const g = el('g', {}, p);
  const r = el('rect', { x: cx - w / 2, y: cy - h / 2, width: w, height: h, rx: 30, fill, stroke: K.ink, 'stroke-width': 8 }, g);
  const t = txt(g, str, { x: cx, y: cy + 4, size, color });
  g.cx = cx; g.cy = cy; g.r = r; g.t = t;
  return g;
}
// "¡PIÉNSALO!" countdown: a ring that empties between t0 and t1, with 3-2-1.
function Think(p, cx, cy) {
  const g = el('g', {}, p);
  el('circle', { cx, cy, r: 78, fill: K.white, stroke: K.ink, 'stroke-width': 8 }, g);
  const arc = el('circle', { cx, cy, r: 62, fill: 'none', stroke: K.pink, 'stroke-width': 18, 'stroke-linecap': 'round', transform: `rotate(-90 ${cx} ${cy})` }, g);
  const n = txt(g, '3', { x: cx, y: cy + 4, size: 72 });
  const lab = txt(g, '¡PIÉNSALO!', { x: cx, y: cy + 130, size: 54, color: K.pink });
  g.cx = cx; g.cy = cy;
  const C = 2 * Math.PI * 62;
  return { g, draw(t, t0, t1) {
    if (t < t0 || t > t1 + 0.3) { g.setAttribute('opacity', 0); return; }
    pop(g, t, t0, cx, cy);
    if (t > t1) g.setAttribute('opacity', (1 - prog(t, t1, t1 + 0.3)).toFixed(3));
    const k = clamp(prog(t, t0, t1));
    set(arc, { 'stroke-dasharray': `${(C * (1 - k)).toFixed(1)} ${C.toFixed(1)}` });
    n.textContent = String(Math.max(1, 3 - Math.floor(k * 3)));
  } };
}
// Number sequence puzzle. nums: [[str, cue]]; o.q: cue for "?"; o.think: [t0, t1]; o.diffs: [[label, cue]] (arcs
// over the gaps, the last one may point at the "?"); o.answer: [str, cue]; o.cap/hi/capAt; o.m: [mascot, cue]; o.ex: n.
function seq(nums, o = {}) {
  return (g, b) => {
    const N = nums.length + 1, gap = Math.min(300, 1700 / N), y = o.y || 440;
    const xs = Array.from({ length: N }, (_, i) => 960 + (i - (N - 1) / 2) * gap);
    const bw = Math.min(240, gap - 40);
    const boxes = nums.map(([s, k], i) => [Box(g, s, xs[i], y, { w: bw, h: 190, size: bw > 200 ? 110 : 96 }), k]);
    const q = Box(g, '?', xs[N - 1], y, { w: bw, h: 190, fill: K.yellow, size: 120 });
    const ans = o.answer ? Box(g, o.answer[0], xs[N - 1], y, { w: bw, h: 190, fill: '#CDEFD0', size: bw > 200 ? 110 : 96 }) : null;
    const arcs = (o.diffs || []).map(([s, k], i) => {
      const a = el('g', {}, g), x1 = xs[i] + 20, x2 = xs[i + 1] - 20, top = y - 150;
      el('path', { d: `M${x1} ${y - 95} Q${(x1 + x2) / 2} ${top - 60} ${x2} ${y - 95}`, fill: 'none', stroke: K.pink, 'stroke-width': 9, 'stroke-linecap': 'round' }, a);
      el('path', { d: `M${x2 - 22} ${y - 120} L${x2} ${y - 95} L${x2 + 8} ${y - 126}`, fill: 'none', stroke: K.pink, 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, a);
      Chip(a, s, { cx: (x1 + x2) / 2, cy: top - 40, size: 44, fill: K.white });
      a.cx = (x1 + x2) / 2; a.cy = top - 40;
      return [a, k];
    });
    const head = o.head ? hiText(g, o.head, o.headHi, { x: 960, y: o.diffs ? 90 : 160, size: 64 }) : null;
    const th = o.think ? Think(g, 1660, 760) : null;
    const m = o.m ? Mascot(g, o.m[0], { cx: o.think ? 300 : 960, floor: 1050, h: 360 }) : null;
    const cap = o.cap ? Bubble(g, o.cap, { cy: o.think ? 975 : 975, hi: o.hi, size: 58 }) : null;
    const tag = o.ex ? ExTag(g, o.ex) : null;
    const src = o.tag ? Tag(g, o.tag) : null;
    return t => {
      boxes.forEach(([bx, k], i) => pop(bx, t, tt(k, b.a + 0.15 * i), bx.cx, bx.cy));
      const ta = ans ? tt(o.answer[1]) : 1e9;
      if (t < ta) pop(q, t, tt(o.q, b.a + 0.15 * nums.length), q.cx, q.cy); else hide(q);
      if (ans) { if (t >= ta) pop(ans, t, ta, ans.cx, ans.cy); else hide(ans); }
      arcs.forEach(([a, k]) => pop(a, t, tt(k), a.cx, a.cy));
      if (head) show(head, t, b.a);
      if (th) th.draw(t, tt(o.think[0]), tt(o.think[1]));
      if (m) live(m, t, tt(o.m[1], b.a + 0.3));
      if (cap) pop(cap, t, tt(o.capAt, b.a + 0.4), 960, 975);
      if (tag) show(tag, t, b.a);
      if (src) show(src, t, b.a + 0.5);
    };
  };
}
// Question card for exercise 1: big coloured "?" disc + the question.
function qcard(n, q, color, o = {}) {
  return (g, b) => {
    const d = el('g', {}, g);
    el('circle', { cx: 960, cy: 330, r: 170, fill: color, stroke: K.ink, 'stroke-width': 10 }, d);
    txt(d, '?', { x: 960, y: 345, size: 230 });
    d.cx = 960; d.cy = 330;
    const c = Chip(g, `PREGUNTA ${n}`, { cx: 960, cy: 110, size: 44, fill: K.white });
    const h = hiText(g, q, o.hi, { x: 960, y: 620, size: 92 });
    const m = Mascot(g, o.m || 'm_ask', { cx: 1600, floor: 1050, h: 420 });
    const tag = ExTag(g, 1);
    return t => {
      pop(c, t, b.a, 960, 110); pop(d, t, b.a + 0.1, 960, 330);
      show(h, t, tt(o.at, b.a + 0.4), 1e9, { dy: 40 }); live(m, t, b.a + 0.5, { dir: 'r' }); show(tag, t, b.a);
    };
  };
}
