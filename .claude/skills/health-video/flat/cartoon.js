// Cartoon-panel style (Oct 2026, see references/cartoon-style.md). Needs lib.js + kit.js.
// Full-screen doodle panels from the user's image app, with hand-lettered titles and labels added here
// (never baked into the image), in Patrick Hand (OFL, flat/fonts/).
(() => {
  const base = document.currentScript.src.replace(/cartoon\.js.*$/, '');
  const st = document.createElement('style');
  st.textContent = `@font-face{font-family:'Hand';src:url('${base}fonts/PatrickHand-Regular.ttf')}`;
  document.head.appendChild(st);
})();
const K = { ink: '#16161C', paper: '#FFFDF7', purple: '#8B6FD6', slate: '#7E9FB5', mint: '#8CCFB4', peach: '#F2A98B', butter: '#F4D27A', red: '#E23B2E', frame: '#0F0F14' };

// Hand-lettered text. Bold look = same-colour stroke behind the fill (paint-order).
function Hand(g, str, { x, y, size = 64, color = K.ink, anchor = 'start', bold = 0 } = {}) {
  const t = el('text', { x, y, 'font-size': size, 'font-family': 'Hand', fill: color, 'text-anchor': anchor, 'dominant-baseline': 'middle',
    stroke: color, 'stroke-width': bold, 'stroke-linejoin': 'round', 'paint-order': 'stroke' }, g);
  t.textContent = str;
  return t;
}
// Panel title, top-left like the reference ("PIERNAS INQUIETAS"). Optional small boxed sub-label under it.
function HandTitle(g, str, { x = 70, y = 100, size = 96, sub = '' } = {}) {
  const h = el('g', {}, g);
  Hand(h, str, { x, y, size, bold: size * 0.05 });
  if (sub) {
    const box = el('rect', { x: x, y: y + size * 0.55, height: size * 0.56, fill: K.paper, stroke: K.ink, 'stroke-width': 3 }, h);
    const tx = Hand(h, sub, { x: x + 15, y: y + size * 0.84, size: size * 0.44 });
    const fit = () => box.setAttribute('width', tx.getComputedTextLength() + 30);
    fit(); document.fonts.load(`40px Hand`).then(fit);   // re-measure once the hand font is in
  }
  return h;
}
// Small handwritten label with a thin leader line to a point (to = [x, y]); text may hold '\n'.
function HandLabel(g, str, { x, y, to = null, size = 46, anchor = 'middle' } = {}) {
  const l = el('g', {}, g);
  str.split('\n').forEach((s, i, a) => Hand(l, s, { x, y: y + (i - (a.length - 1) / 2) * size * 1.0, size, anchor }));
  let line = null;
  if (to) line = el('line', { x1: x + (anchor === 'end' ? 12 : anchor === 'start' ? -12 : 0), y1: y, x2: to[0], y2: to[1], stroke: K.ink, 'stroke-width': 3.5, 'stroke-linecap': 'round' }, l);
  return { g: l, line, draw(t, t0) { show(l, t, t0, 1e9, { dy: 12, dur: 0.3 }); if (line) { const len = Math.hypot(to[0] - x, to[1] - y); set(line, { 'stroke-dasharray': len, 'stroke-dashoffset': (len * (1 - E.out(prog(t, t0, t0 + 0.4)))).toFixed(1) }); } } };
}
// Full-screen panel: the drawing fills the frame inside a thin dark border with round corners,
// with a slow push-in (Still). iw/ih = source size of the cut panel.
function Panel(g, href, { iw, ih, focus = [0.5, 0.5], zoom = 0.06 } = {}) {
  el('rect', { width: 1920, height: 1080, fill: K.frame }, g);
  return Still(g, href, { x: 22, y: 22, w: 1876, h: 1036, iw, ih, r: 40, focus, zoom });
}
// Doodle sparkle (4-point star), like the corner sparkles in the reference.
function Sparkle(g, cx, cy, r = 22, color = K.paper) {
  return el('path', { d: `M${cx} ${cy - r} Q${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy} Q${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r} Q${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy} Q${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r} Z`, fill: color, stroke: K.ink, 'stroke-width': 3 }, g);
}
