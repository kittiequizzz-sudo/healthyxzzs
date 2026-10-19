// News / documentary building blocks for health-news videos. Needs health-video's lib.js (el, set, E,
// prog, clamp, lerp) and kit.js (sceneVis, cutVis, punch, float, Cutout, Icon). Load news/fonts.css.
// Like everything in the flat renderer, each piece is a pure function of t: build once, draw(t) per frame.
const N = {
  bg: '#0D1420', panel: '#162133', panel2: '#1F2C42', line: '#2C3A52',
  white: '#F4F1EA', dim: '#9AA6B8', red: '#D7263D', gold: '#F2B33D', teal: '#2BB3A3', ink: '#0A0F18',
  paper: '#F7F3EA',
};
const FONT = { H: 'Oswald', S: 'Serif4', B: 'Inter' };

// Text in one of the three house fonts: H = Oswald (headlines, labels), S = Source Serif (numbers,
// quotes, study titles), B = Inter (small print).
function NT(p, str, { x = 0, y = 0, size = 48, font = 'H', weight = 700, color = N.white, anchor = 'start', italic = false, ls = 0 } = {}) {
  const t = el('text', { x, y, 'font-size': size, 'font-weight': weight, fill: color, 'text-anchor': anchor, 'font-family': FONT[font],
    'dominant-baseline': 'middle', 'letter-spacing': ls, 'font-style': italic ? 'italic' : 'normal' }, p);
  t.textContent = str;
  return t;
}
// Fade window: 0 before t0, 1 after t0+din, back to 0 by t1.
const win = (t, t0, t1 = 1e9, din = 0.35, dout = 0.3) => E.out(prog(t, t0, t0 + din)) * (1 - E.inOut(prog(t, t1 - dout, t1)));
// Width of a text element; fonts load before the first frame, so measure lazily inside draw().
const tw = e => e.getComputedTextLength();
const fmtES = (v, d = 0) => v.toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: 'always' });

// Background, film grade and grain. Call NewsStage() first and grade.draw(t) last in window.draw.
function NewsStage() {
  const svg = document.getElementById('s');
  el('rect', { width: 1920, height: 1080, fill: N.bg }, svg);
  return svg;
}
function Grade(svg, { grain = 0.07, vignette = 0.55 } = {}) {
  const defs = el('defs', {}, svg);
  const rg = el('radialGradient', { id: 'nvig', cx: '50%', cy: '50%', r: '75%' }, defs);
  el('stop', { offset: '55%', 'stop-color': '#000', 'stop-opacity': 0 }, rg);
  el('stop', { offset: '100%', 'stop-color': '#000', 'stop-opacity': vignette }, rg);
  const f = el('filter', { id: 'ngrain', x: 0, y: 0, width: '100%', height: '100%' }, defs);
  const turb = el('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.85, numOctaves: 1, seed: 1, result: 'n' }, f);
  el('feColorMatrix', { type: 'matrix', values: `0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 ${grain * 2} -${grain * 0.6}` }, f);
  const g = el('g', { 'pointer-events': 'none' }, svg);
  el('rect', { width: 1920, height: 1080, fill: 'url(#nvig)' }, g);
  el('rect', { width: 1920, height: 1080, filter: 'url(#ngrain)', opacity: 0.6 }, g);
  return { g, draw(t) { set(turb, { seed: 1 + Math.floor(t * 12) % 97 }); svg.appendChild(g); } };
}

// Full-bleed photo with a slow documentary camera move (zoom + drift), never warped.
// from/to = [zoom, fx, fy]: zoom 1 = cover the frame; (fx, fy) in 0..1 = point the camera centres on.
// dark = overlay opacity so text reads; fade = gradient at the bottom for lower thirds.
function Photo(p, href, { iw, ih, x = 0, y = 0, w = 1920, h = 1080, from = [1.0, 0.5, 0.5], to = [1.1, 0.5, 0.45], dark = 0.25, fade = true, r = 0 } = {}) {
  const id = 'pc' + Math.random().toString(36).slice(2);
  const g = el('g', {}, p);
  const cp = el('clipPath', { id }, g);
  el('rect', { x, y, width: w, height: h, rx: r }, cp);
  const inner = el('g', { 'clip-path': `url(#${id})` }, g);
  el('rect', { x, y, width: w, height: h, fill: N.ink }, inner);
  const img = el('image', { href, width: iw, height: ih, preserveAspectRatio: 'none' }, inner);
  if (dark) el('rect', { x, y, width: w, height: h, fill: N.ink, opacity: dark }, inner);
  if (fade) {
    const gid = id + 'g', lg = el('linearGradient', { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 }, g);
    el('stop', { offset: '45%', 'stop-color': N.ink, 'stop-opacity': 0 }, lg);
    el('stop', { offset: '100%', 'stop-color': N.ink, 'stop-opacity': 0.85 }, lg);
    el('rect', { x, y, width: w, height: h, fill: `url(#${gid})` }, inner);
  }
  const cover = Math.max(w / iw, h / ih);
  let cur = [x, y, iw * cover];
  return {
    g,
    draw(t, a, b) {
      const u = E.inOut(prog(t, a, b));
      const s = cover * lerp(from[0], to[0], u), dw = iw * s, dh = ih * s;
      const fx = lerp(from[1], to[1], u), fy = lerp(from[2], to[2], u);
      const ix = clamp(x + w / 2 - fx * dw, x + w - dw, x), iy = clamp(y + h / 2 - fy * dh, y + h - dh, y);
      set(img, { x: ix.toFixed(1), y: iy.toFixed(1), width: dw.toFixed(1), height: dh.toFixed(1) });
      cur = [ix, iy, dw / iw];
    },
    // screen position of image pixel (px, py) in the current frame (for callouts that follow the move)
    map(px, py) { return [cur[0] + px * cur[2], cur[1] + py * cur[2]]; },
  };
}

// Channel bug, top left: red square, channel name, section. Generic: never a real network's name or look.
function Bug(p, { name, section = '' }) {
  const g = el('g', {}, p);
  el('rect', { x: 70, y: 56, width: 14, height: 44, fill: N.red }, g);
  NT(g, name, { x: 100, y: 80, size: 34, ls: 1 });
  const sec = NT(g, section, { x: 0, y: 80, size: 30, weight: 500, color: N.dim, ls: 1 });
  const bar = el('rect', { x: 0, y: 64, width: 2, height: 32, fill: N.dim }, g);
  let placed = false;
  return {
    g,
    section(s) { sec.textContent = s; placed = false; },
    draw(t, t0 = 0) {
      if (!placed) { const x = 100 + tw(g.children[1]) + 22; set(bar, { x }); set(sec, { x: x + 20 }); placed = true; }
      g.setAttribute('opacity', win(t, t0).toFixed(3));
      bar.style.display = sec.style.display = sec.textContent ? '' : 'none';
    },
  };
}

// Lower third: red kicker block + white title bar, wiping in from the left. Two lines max.
function LowerThird(p, { kicker, title, x = 110, y = 820, size = 58 }) {
  const g = el('g', {}, p);
  const id = 'lt' + Math.random().toString(36).slice(2);
  const cp = el('clipPath', { id }, g);
  const clip = el('rect', { x, y: y - 70, width: 0, height: 250 }, cp);
  const body = el('g', { 'clip-path': `url(#${id})` }, g);
  const kb = el('rect', { x, y: y - 56, height: 56, width: 10, fill: N.red }, body);
  const kt = NT(body, kicker.toUpperCase(), { x: x + 22, y: y - 27, size: 32, ls: 2 });
  const tb = el('rect', { x, y, height: size * 1.55, width: 10, fill: N.white }, body);
  const tt = NT(body, title, { x: x + 26, y: y + size * 0.8, size, color: N.ink });
  const edge = el('rect', { x, y, width: 8, height: size * 1.55, fill: N.red }, g);
  let W = 0;
  return {
    g,
    draw(t, t0, t1 = 1e9) {
      if (!W) { set(kb, { width: tw(kt) + 44 }); W = tw(tt) + 56; set(tb, { width: W }); }
      const a = E.out(prog(t, t0, t0 + 0.45)) * (1 - E.inOut(prog(t, t1 - 0.3, t1)));
      set(clip, { width: (a * (W + 20)).toFixed(1) });
      set(edge, { x: (x + a * W - 8).toFixed(1), opacity: a > 0.02 ? 1 : 0 });
      g.style.display = a > 0.001 ? '' : 'none';
    },
  };
}

// Kinetic headline: each line rises out of a mask, staggered; a red rule sweeps under it.
// lines: ['¿QUÉ PASA SI', 'DEJA DE CENAR?'], hi = index of the line drawn in gold.
function Headline(p, lines, { x = 960, y = 470, size = 120, anchor = 'middle', hi = -1, gap = 1.05, rule = true } = {}) {
  const g = el('g', {}, p);
  const rows = lines.map((s, i) => {
    const id = 'hl' + Math.random().toString(36).slice(2), yy = y + i * size * gap;
    const cp = el('clipPath', { id }, g);
    el('rect', { x: 0, y: yy - size * 0.62, width: 1920, height: size * 1.24 }, cp);
    const w = el('g', { 'clip-path': `url(#${id})` }, g);
    const e = NT(w, s, { x, y: yy, size, anchor, color: i === hi ? N.gold : N.white });
    return { e, yy };
  });
  const ry = y + (lines.length - 0.35) * size * gap;
  const r = rule ? el('rect', { y: ry, height: 8, width: 0, fill: N.red }, g) : null;
  let wmax = 0;
  return {
    g,
    draw(t, t0, t1 = 1e9) {
      if (!wmax) wmax = Math.max(...rows.map(o => tw(o.e)));
      const out = 1 - E.inOut(prog(t, t1 - 0.3, t1));
      rows.forEach((o, i) => {
        const u = E.out(prog(t, t0 + i * 0.12, t0 + i * 0.12 + 0.5));
        set(o.e, { y: (o.yy + (1 - u) * size).toFixed(1), opacity: (out * clamp(u * 2)).toFixed(3) });
      });
      if (r) {
        const u = E.inOut(prog(t, t0 + 0.35, t0 + 0.85)), rw = Math.min(wmax, 520) * u;
        const rx = anchor === 'middle' ? x - rw / 2 : anchor === 'end' ? x - rw : x;
        set(r, { x: rx, width: rw, opacity: out });
      }
      g.style.display = out > 0.001 && t >= t0 ? '' : 'none';
    },
  };
}

// Big serif number with a count-up, gold label under a thin rule, optional source line.
function BigNumber(p, { to, from = 0, dec = 0, prefix = '', suffix = '', label = '', x = 960, y = 470, size = 230, dur = 1.1, anchor = 'middle' }) {
  const g = el('g', {}, p);
  const num = NT(g, '', { x, y, size, font: 'S', anchor });
  const rule = el('rect', { y: y + size * 0.62, height: 4, width: 0, fill: N.red }, g);
  const lab = NT(g, label.toUpperCase(), { x, y: y + size * 0.62 + 62, size: 50, color: N.gold, anchor, ls: 2 });
  return {
    g,
    draw(t, t0, t1 = 1e9) {
      const a = win(t, t0, t1, 0.25);
      const v = lerp(from, to, E.out(prog(t, t0, t0 + dur)));
      num.textContent = prefix + fmtES(v, dec) + suffix;
      const rw = 420 * E.inOut(prog(t, t0 + 0.4, t0 + 0.9));
      set(rule, { x: anchor === 'middle' ? x - rw / 2 : anchor === 'end' ? x - rw : x, width: rw });
      set(lab, { opacity: E.out(prog(t, t0 + 0.6, t0 + 0.95)) });
      g.setAttribute('opacity', a.toFixed(3));
      g.style.display = a > 0.001 ? '' : 'none';
    },
  };
}

// Chapter opener over a darkened photo: big gold serif number, title, subtitle.
function Chapter(p, { n, title, sub = '', x = 140, y = 520 }) {
  const g = el('g', {}, p);
  const num = NT(g, String(n).padStart(2, '0'), { x, y: y - 140, size: 190, font: 'S', color: N.gold });
  const rule = el('rect', { x, y: y - 30, height: 6, width: 0, fill: N.red }, g);
  const tt = NT(g, title.toUpperCase(), { x, y: y + 60, size: 110, ls: 1 });
  const st = NT(g, sub, { x, y: y + 160, size: 46, font: 'S', italic: true, color: N.dim });
  return {
    g,
    draw(t, t0, t1 = 1e9) {
      const out = 1 - E.inOut(prog(t, t1 - 0.3, t1));
      [[num, 0], [tt, 0.2], [st, 0.45]].forEach(([e, d]) => {
        const u = E.out(prog(t, t0 + d, t0 + d + 0.5));
        set(e, { opacity: (u * out).toFixed(3), transform: `translate(${((1 - u) * -40).toFixed(1)} 0)` });
      });
      set(rule, { width: 300 * E.inOut(prog(t, t0 + 0.1, t0 + 0.6)), opacity: out });
      g.style.display = out > 0.001 && t >= t0 ? '' : 'none';
    },
  };
}

// The study on screen: a paper page with the publication line, a title and one real sentence swept by a
// gold highlighter. Everything written on it must come from the actual source (no invented titles).
// lines: body sentences (1–3, short); hi = index of the highlighted line.
function StudyCard(p, { pub, title, lines, hi = 0, x = 1010, y = 170, w = 780, rot = -2.5 }) {
  const g = el('g', {}, p);
  const cx = x + w / 2, h = 700;
  const sheet = el('g', {}, g);
  el('rect', { x: x + 14, y: y + 18, width: w, height: h, fill: '#000', opacity: 0.45 }, sheet);
  el('rect', { x, y, width: w, height: h, fill: N.paper }, sheet);
  el('rect', { x, y, width: w, height: 70, fill: N.panel }, sheet);
  NT(sheet, pub.toUpperCase(), { x: x + 34, y: y + 36, size: 30, weight: 500, color: N.white, ls: 2 });
  const tl = Array.isArray(title) ? title : [title];
  tl.forEach((s, i) => NT(sheet, s, { x: x + 40, y: y + 140 + i * 58, size: 46, font: 'S', color: N.ink }));
  let yy = y + 140 + tl.length * 58 + 30;
  for (let i = 0; i < 3; i++) el('rect', { x: x + 40, y: yy + i * 30, width: w - 80 - (i === 2 ? 220 : 0), height: 12, rx: 6, fill: '#CFC8B8' }, sheet);
  yy += 130;
  const hl = [];
  lines.forEach((s, i) => {
    const ly = yy + i * 64;
    const mark = el('rect', { x: x + 32, y: ly - 26, height: 52, width: 0, fill: N.gold, opacity: 0.85 }, sheet);
    const e = NT(sheet, s, { x: x + 40, y: ly, size: 36, font: 'B', weight: 800, color: N.ink });
    if (i === hi) hl.push([mark, e]);
  });
  for (let i = 0; i < 3; i++) el('rect', { x: x + 40, y: yy + lines.length * 64 + 20 + i * 30, width: w - 80 - (i === 2 ? 300 : 0), height: 12, rx: 6, fill: '#CFC8B8' }, sheet);
  return {
    g,
    draw(t, t0, tHi, t1 = 1e9) {
      const u = E.out(prog(t, t0, t0 + 0.6)), out = 1 - E.inOut(prog(t, t1 - 0.3, t1));
      set(sheet, { transform: `translate(0 ${((1 - u) * 160).toFixed(1)}) rotate(${(rot * u).toFixed(2)} ${cx} ${y + h / 2})`, opacity: (clamp(u * 2) * out).toFixed(3) });
      for (const [m, e] of hl) set(m, { width: ((tw(e) + 20) * E.inOut(prog(t, tHi, tHi + 0.6))).toFixed(1) });
      g.style.display = out > 0.001 && t >= t0 ? '' : 'none';
    },
  };
}

// Quote card: big red quote mark, serif italic lines revealed one by one, attribution. Real quotes only,
// attributed to the organisation or document that published them (no invented experts).
function Quote(p, { lines, who, x = 960, y = 400, size = 72 }) {
  const g = el('g', {}, p);
  const q = NT(g, '“', { x, y: y - 120, size: 260, font: 'S', color: N.red, anchor: 'middle' });
  const ls = lines.map((s, i) => NT(g, s, { x, y: y + i * size * 1.25, size, font: 'S', italic: true, anchor: 'middle' }));
  const wl = NT(g, '— ' + who, { x, y: y + lines.length * size * 1.25 + 50, size: 40, color: N.gold, anchor: 'middle', ls: 1 });
  return {
    g,
    draw(t, t0, t1 = 1e9) {
      const out = 1 - E.inOut(prog(t, t1 - 0.3, t1));
      set(q, { opacity: (E.out(prog(t, t0, t0 + 0.3)) * out).toFixed(3) });
      ls.forEach((e, i) => set(e, { opacity: (E.out(prog(t, t0 + 0.2 + i * 0.5, t0 + 0.7 + i * 0.5)) * out).toFixed(3) }));
      set(wl, { opacity: (E.out(prog(t, t0 + 0.4 + ls.length * 0.5, t0 + 0.8 + ls.length * 0.5)) * out).toFixed(3) });
      g.style.display = out > 0.001 && t >= t0 ? '' : 'none';
    },
  };
}

// Horizontal bars on a dark panel. rows: [[label, value, color?], ...]; draw(t, [t0 per row]).
// The label column is measured on the first frame, so long Spanish labels never run into the bars.
function Bars(p, { rows, x = 160, y, w = 1600, max, unit = '', dec = 0, rowH = 170 }) {
  const g = el('g', {}, p);
  const M = max || Math.max(...rows.map(r => r[1]));
  const y0 = y ?? 540 - (rows.length - 1) * rowH / 2;
  let bx = 0, bw = 0;
  const items = rows.map(([label, v, col = N.dim], i) => {
    const yy = y0 + i * rowH;
    const lab = NT(g, label.toUpperCase(), { x, y: yy, size: 52, ls: 1 });
    const track = el('rect', { y: yy - 38, height: 76, fill: N.panel2 }, g);
    const bar = el('rect', { y: yy - 38, height: 76, width: 0, fill: col }, g);
    const val = NT(g, '', { y: yy + 2, size: 60, font: 'S' });
    return { lab, track, bar, val, v };
  });
  return {
    g,
    draw(t, ts) {
      if (!bx) {
        bx = x + Math.max(...items.map(o => tw(o.lab))) + 50;
        bw = x + w - bx - 280;   // room for the value after the longest bar
        items.forEach(o => { set(o.track, { x: bx, width: bw }); set(o.bar, { x: bx }); });
      }
      items.forEach((o, i) => {
        const u = E.out(prog(t, ts[i], ts[i] + 0.7)), a = clamp(prog(t, ts[i] - 0.1, ts[i] + 0.2));
        [o.lab, o.track].forEach(e => set(e, { opacity: a }));
        const bwid = bw * (o.v / M) * u;
        set(o.bar, { width: bwid.toFixed(1) });
        o.val.textContent = u > 0 ? fmtES(o.v * u, dec) + unit : '';
        set(o.val, { x: (bx + bwid + 24).toFixed(1) });
      });
    },
  };
}

// Two photos side by side with a verdict badge each (good = ✓ teal, bad = ✗ red).
function Split(p, left, right, { y = 200, h = 560 } = {}) {
  const g = el('g', {}, p);
  const sides = [[left, 90], [right, 990]].map(([o, x]) => {
    const s = el('g', {}, g);
    const ph = Photo(s, o.href, { iw: o.iw, ih: o.ih, x, y, w: 840, h, dark: 0.1, fade: false, from: [1, 0.5, 0.5], to: [1.08, 0.5, 0.45] });
    el('rect', { x, y: y + h, width: 840, height: 90, fill: o.good ? N.teal : N.red }, s);
    NT(s, o.label.toUpperCase(), { x: x + 110, y: y + h + 46, size: 48, ls: 1 });
    const b = el('g', {}, s);
    el('circle', { cx: x + 56, cy: y + h + 45, r: 32, fill: N.white }, b);
    el('path', { d: o.good ? `M${x + 40} ${y + h + 46} l12 12 l22 -24` : `M${x + 42} ${y + h + 31} l28 28 M${x + 70} ${y + h + 31} l-28 28`,
      stroke: o.good ? N.teal : N.red, 'stroke-width': 8, fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, b);
    return { s, ph, b, cx: x + 56, cy: y + h + 45 };
  });
  return {
    g,
    draw(t, a, b, tL, tR) {
      sides.forEach((o, i) => {
        const t0 = i ? tR : tL;
        o.ph.draw(t, a, b);
        set(o.s, { opacity: E.out(prog(t, t0 - 0.2, t0 + 0.2)).toFixed(3) });
        pop(o.b, t, t0 + 0.15, o.cx, o.cy);
      });
    },
  };
}

// Point at a spot on a photo: a white ring that draws itself, a leader line and a label.
function Callout(p, { x, y, r = 70, lx, ly, text }) {
  const g = el('g', {}, p);
  const C2 = 2 * Math.PI * r;
  const ring = el('circle', { cx: x, cy: y, r, fill: 'none', stroke: N.white, 'stroke-width': 6, 'stroke-dasharray': C2, 'stroke-dashoffset': C2, transform: `rotate(-90 ${x} ${y})` }, g);
  const ang = Math.atan2(ly - y, lx - x);
  let sx = x + Math.cos(ang) * r, sy = y + Math.sin(ang) * r;
  const line = el('line', { x1: sx, y1: sy, x2: sx, y2: sy, stroke: N.white, 'stroke-width': 4 }, g);
  const lab = el('g', {}, g);
  const lt = NT(lab, text.toUpperCase(), { x: lx, y: ly, size: 42, color: N.ink, anchor: lx < x ? 'end' : 'start', ls: 1 });
  const bg = el('rect', { y: ly - 34, height: 68, fill: N.gold }, lab);
  lab.insertBefore(bg, lt);
  let placed = false;
  return {
    g,
    // at = optional [x, y] to follow a moving photo (Photo.map); the label stays put
    draw(t, t0, t1 = 1e9, at = null) {
      if (!placed) { const w = tw(lt); set(bg, { x: lx < x ? lx - w - 22 : lx - 22, width: w + 44 }); placed = true; }
      if (at) { const a2 = Math.atan2(ly - at[1], lx - at[0]); x = at[0]; y = at[1]; sx = x + Math.cos(a2) * r; sy = y + Math.sin(a2) * r;
        set(ring, { cx: x, cy: y, transform: `rotate(-90 ${x} ${y})` }); set(line, { x1: sx, y1: sy }); }
      const out = 1 - E.inOut(prog(t, t1 - 0.25, t1));
      set(ring, { 'stroke-dashoffset': (C2 * (1 - E.inOut(prog(t, t0, t0 + 0.45)))).toFixed(1) });
      const u = E.out(prog(t, t0 + 0.35, t0 + 0.65));
      set(line, { x2: lerp(sx, lx, u), y2: lerp(sy, ly, u) });
      set(lab, { opacity: E.out(prog(t, t0 + 0.6, t0 + 0.85)) });
      g.setAttribute('opacity', out.toFixed(3));
      g.style.display = out > 0.001 && t >= t0 ? '' : 'none';
    },
  };
}

// Numbered checklist panel ("PREGUNTE A SU MÉDICO"); items appear on their cues and stay.
function Checklist(p, { title, items, x = 260, y = 220, w = 1400 }) {
  const g = el('g', {}, p);
  el('rect', { x, y, width: w, height: 130 + items.length * 140, fill: N.panel, opacity: 0.94 }, g);
  el('rect', { x, y, width: 12, height: 130 + items.length * 140, fill: N.red }, g);
  NT(g, title.toUpperCase(), { x: x + 60, y: y + 70, size: 52, color: N.gold, ls: 2 });
  const rows = items.map((s, i) => {
    const r = el('g', {}, g), yy = y + 190 + i * 140;
    el('circle', { cx: x + 100, cy: yy, r: 42, fill: N.red }, r);
    NT(r, String(i + 1), { x: x + 100, y: yy + 3, size: 50, font: 'S', anchor: 'middle' });
    NT(r, s, { x: x + 175, y: yy, size: 56, font: 'S' });
    return r;
  });
  return { g, draw(t, ts) { rows.forEach((r, i) => show(r, t, ts[i], 1e9, { dy: 24 })); } };
}

// Section transition: a red slab with a gold edge sweeps across; swap scenes at tMid. Draw it on top.
function Wipe(svg) {
  const g = el('g', { 'pointer-events': 'none' }, svg);
  const slab = el('polygon', { fill: N.red }, g);
  const edge = el('polygon', { fill: N.gold }, g);
  return {
    g,
    draw(t, tMid, dur = 0.55) {
      svg.appendChild(g);
      const u = prog(t, tMid - dur / 2, tMid + dur / 2);
      if (u <= 0 || u >= 1) { g.style.display = 'none'; return; }
      g.style.display = '';
      const lead = lerp(-300, 2400, E.inOut(Math.min(1, u * 1.6))), tail = lerp(-300, 2400, E.inOut(Math.max(0, u * 1.6 - 0.6)));
      const sk = 260;
      set(slab, { points: `${tail},0 ${lead},0 ${lead - sk},1080 ${tail - sk},1080` });
      set(edge, { points: `${lead},0 ${lead + 26},0 ${lead + 26 - sk},1080 ${lead - sk},1080` });
    },
  };
}

// Small print: source line (bottom left) and "Imagen ilustrativa" / "Recreación" (bottom right).
function SmallPrint(p, { source = '', note = '' } = {}) {
  const g = el('g', {}, p);
  const s = NT(g, source ? 'Fuente: ' + source : '', { x: 70, y: 1036, size: 24, font: 'B', weight: 700, color: N.dim });
  const n = NT(g, note, { x: 1850, y: 1036, size: 24, font: 'B', weight: 700, color: N.dim, anchor: 'end' });
  return { g, set(src, nt = '') { s.textContent = src ? 'Fuente: ' + src : ''; n.textContent = nt; } };
}

// Closing card: channel name, subscribe button with a bell, and the "information, not a consultation" line.
function EndCard(p, { name, line = 'Información general · consulte a su médico' }) {
  const g = el('g', {}, p);
  el('rect', { width: 1920, height: 1080, fill: N.bg }, g);
  const nm = NT(g, name, { x: 960, y: 400, size: 110, anchor: 'middle', ls: 2 });
  const btn = el('g', {}, g);
  el('rect', { x: 700, y: 520, width: 520, height: 120, rx: 60, fill: N.red }, btn);
  NT(btn, 'SUSCRÍBASE', { x: 990, y: 582, size: 58, anchor: 'middle', ls: 2 });
  el('path', { d: 'M760 610 h44 c-8 -8 -8 -18 -8 -34 c0 -16 -8 -26 -14 -28 a8 8 0 0 0 -16 0 c-6 2 -14 12 -14 28 c0 16 0 26 -8 34 z M774 616 a8 8 0 0 0 16 0', fill: N.white }, btn);
  const ln = NT(g, line, { x: 960, y: 760, size: 40, font: 'S', italic: true, color: N.dim, anchor: 'middle' });
  return {
    g,
    draw(t, t0) {
      show(nm, t, t0, 1e9, { dy: 30 });
      pop(btn, t, t0 + 0.4, 960, 580);
      show(ln, t, t0 + 0.8, 1e9, { dy: 20 });
    },
  };
}
