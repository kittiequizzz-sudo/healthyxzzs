// Vivid look (owner, Oct 30 2026: the videos looked too neutral and flat; wants colour that "breaks
// through" and grabs attention). Load AFTER common.js; it only re-skins, the scenes stay the same.
//  · deep navy stage with a soft glow whose colour changes per section (p1, p2, … cues) instead of cream
//  · electric accents (crimson, coral, emerald, cobalt, bright teal); dark heading chips turn cobalt
//  · every drawing gets a light colour grade (more saturation + contrast) and panels a white frame + glow
// Still no yellow/golden cast: the grade boosts saturation, it doesn't warm the image.
Object.assign(C, {
  red: '#F0263F', orange: '#FF5A1F', amber: '#FFB21A', green: '#12B76A', blueDark: '#2F6BFF',
  deep: '#1F4FD8', frame: '#FFFFFF', bg0: '#0A1633', bg1: '#162E66',
});
const GLOWS = ['#2F6BFF', '#F0263F', '#0BB3A6', '#FF5A1F', '#8B5CF6', '#12B76A', '#E83E8C'];

function Stage() {
  const svg = document.getElementById('s');
  const defs = el('defs', {}, svg);
  const lg = el('linearGradient', { id: 'bgGrad', x1: 0, y1: 0, x2: 0.35, y2: 1 }, defs);
  el('stop', { offset: 0, 'stop-color': C.bg0 }, lg); el('stop', { offset: 1, 'stop-color': C.bg1 }, lg);
  const rg = el('radialGradient', { id: 'bgGlow' }, defs);
  const s0 = el('stop', { offset: 0, 'stop-color': GLOWS[0], 'stop-opacity': 0.55 }, rg);
  el('stop', { offset: 1, 'stop-color': GLOWS[0], 'stop-opacity': 0 }, rg);
  const vg = el('radialGradient', { id: 'bgVig', r: 0.75 }, defs);
  el('stop', { offset: 0.6, 'stop-color': '#000', 'stop-opacity': 0 }, vg); el('stop', { offset: 1, 'stop-color': '#000', 'stop-opacity': 0.45 }, vg);
  // colour grade for every drawing: +25 % saturation, +10 % contrast (no warm shift)
  const f = el('filter', { id: 'grade', 'color-interpolation-filters': 'sRGB' }, defs);
  el('feColorMatrix', { type: 'saturate', values: 1.25 }, f);
  const ct = el('feComponentTransfer', {}, f);
  for (const ch of ['feFuncR', 'feFuncG', 'feFuncB']) el(ch, { type: 'linear', slope: 1.1, intercept: -0.04 }, ct);
  const pg = el('filter', { id: 'panelGlow', x: '-10%', y: '-10%', width: '120%', height: '120%' }, defs);
  el('feGaussianBlur', { stdDeviation: 14 }, pg);
  el('rect', { width: 1920, height: 1080, fill: 'url(#bgGrad)' }, svg);
  const glowA = el('circle', { r: 760, fill: 'url(#bgGlow)' }, svg);
  const glowB = el('circle', { r: 560, fill: 'url(#bgGlow)', opacity: 0.6 }, svg);
  el('rect', { width: 1920, height: 1080, fill: 'url(#bgVig)' }, svg);
  const secs = Object.keys(CUE).filter(k => /^p\d$/.test(k)).map(k => CUE[k]).sort((a, b) => a - b);
  Stage.tick = t => {
    const i = secs.filter(s => t >= s - 0.6).length;
    s0.parentNode.querySelectorAll('stop').forEach(s => s.setAttribute('stop-color', GLOWS[i % GLOWS.length]));
    set(glowA, { cx: 1500 + 120 * Math.sin(t / 9), cy: 260 + 80 * Math.cos(t / 11) });
    set(glowB, { cx: 300 + 100 * Math.cos(t / 10), cy: 900 + 60 * Math.sin(t / 8) });
  };
  return svg;
}
const _drawScenes = drawScenes;
drawScenes = t => { if (Stage.tick) Stage.tick(t); _drawScenes(t); };

// dark cards/chips would vanish on navy: they become cobalt
const _Card = Card;
Card = (g, o) => _Card(g, { ...o, fill: o.fill === C.ink ? C.deep : o.fill });
const _Chip = Chip;
Chip = (g, s, o = {}) => _Chip(g, s, { ...o, fill: o.fill === C.ink ? C.deep : (o.fill || C.white) });
// drawings get the colour grade
const _Cutout = Cutout;
Cutout = (g, href, o) => { const c = _Cutout(g, href, o); c.setAttribute('filter', 'url(#grade)'); return c; };
// source line readable on navy
function source(g, s, t0, { y = 1050 } = {}) {
  const L = Live(g, { t0, enter: 'fade', idle: 'none' });
  Text(L.g, s, { x: 960, y, size: 26, weight: 700, color: '#B9C6E6' });
  return L;
}
// ink-coloured signs/arrows/lone text drawn straight on the stage would vanish on navy → white
if (typeof Sign === 'function') { const _Sign = Sign; Sign = (g, s, t0, o = {}) => _Sign(g, s, t0, { ...o, color: o.color === C.ink ? C.white : o.color }); }
if (typeof arrow === 'function') { const _arrow = arrow; arrow = (g, x1, y1, x2, y2, t0, o = {}) => _arrow(g, x1, y1, x2, y2, t0, { ...o, color: o.color === C.ink ? C.white : o.color }); }
