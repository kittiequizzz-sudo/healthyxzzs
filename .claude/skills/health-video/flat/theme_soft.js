// Soft stage (owner, Nov 3 2026: new soft 2D-animation images are light and low-saturation; on the cream
// stage they sank into the background). Load AFTER common.js. Harmonious, not vivid:
//  · stage = muted dusty-slate gradient (mid-dark) with a gentle vignette, so light pictures stand out
//  · panels get a cream frame + soft drop shadow; cut-outs a faint shadow
//  · chips/cards/colours unchanged except ink-dark fills, which become a deep slate that still reads
// No colour grade on the drawings (they keep their soft colours).
window.SOFT = Object.assign({ bg0: '#56707A', bg1: '#334650', frame: '#F5ECD7' }, window.SOFT || {});
C.frame = SOFT.frame; C.frameW = 9; C.halo = ['#0B1418', 0.5, 14];

function Stage() {
  const svg = document.getElementById('s');
  const defs = el('defs', {}, svg);
  const lg = el('linearGradient', { id: 'bgGrad', x1: 0, y1: 0, x2: 0.3, y2: 1 }, defs);
  el('stop', { offset: 0, 'stop-color': SOFT.bg0 }, lg); el('stop', { offset: 1, 'stop-color': SOFT.bg1 }, lg);
  const vg = el('radialGradient', { id: 'bgVig', r: 0.8 }, defs);
  el('stop', { offset: 0.55, 'stop-color': '#000', 'stop-opacity': 0 }, vg); el('stop', { offset: 1, 'stop-color': '#000', 'stop-opacity': 0.3 }, vg);
  const pg = el('filter', { id: 'panelGlow', x: '-10%', y: '-10%', width: '120%', height: '125%' }, defs);
  el('feGaussianBlur', { stdDeviation: 16 }, pg);
  const cs = el('filter', { id: 'cutShadow', x: '-15%', y: '-15%', width: '130%', height: '140%' }, defs);
  el('feDropShadow', { dx: 0, dy: 10, stdDeviation: 10, 'flood-color': '#0B1418', 'flood-opacity': 0.35 }, cs);
  el('rect', { width: 1920, height: 1080, fill: 'url(#bgGrad)' }, svg);
  el('rect', { width: 1920, height: 1080, fill: 'url(#bgVig)' }, svg);
  return svg;
}
// panel frame: cream border + soft dark shadow (common.js Shot draws a C.frame glow and a C.frame stroke)
const _Card = Card;
Card = (g, o) => _Card(g, { ...o, fill: o.fill === C.ink ? '#22313A' : o.fill });
const _Chip = Chip;
Chip = (g, s, o = {}) => _Chip(g, s, { ...o, fill: o.fill === C.ink ? '#22313A' : (o.fill || C.white) });
const _Cutout = Cutout;
Cutout = (g, href, o) => { const c = _Cutout(g, href, o); c.setAttribute('filter', 'url(#cutShadow)'); return c; };
function source(g, s, t0, { y = 1050 } = {}) {
  const L = Live(g, { t0, enter: 'fade', idle: 'none' });
  Text(L.g, s, { x: 960, y, size: 26, weight: 700, color: '#DCE4E6' });
  return L;
}
if (typeof Sign === 'function') { const _Sign = Sign; Sign = (g, s, t0, o = {}) => _Sign(g, s, t0, { ...o, color: o.color === C.ink ? C.white : o.color }); }
if (typeof arrow === 'function') { const _arrow = arrow; arrow = (g, x1, y1, x2, y2, t0, o = {}) => _arrow(g, x1, y1, x2, y2, t0, { ...o, color: o.color === C.ink ? C.white : o.color }); }
