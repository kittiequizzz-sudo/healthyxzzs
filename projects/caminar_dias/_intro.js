// Intro — how many days to walk? 10,000 steps myth, frequency/intensity, walking ≠ strength, 6 truths.
window.START = 0;
window.END = at('h1') - 0.3;
window.DURATION = window.END;
const svg = Stage('intro');
const c = k => () => at(k);

stillScene(svg, 'a1b', () => 0, c('pregunta0'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'CAMINAR DESPUÉS DE LOS 60', { hi: 'CAMINAR' });
  return t => show(a, t, 0.5);
}, true);
stillScene(svg, 'a1a', c('pregunta0'), c('mejor0'), { focus: [0.4, 0.4], zoom: 0.14 }, g => {
  const a = CAP(g, '¿CUÁNTOS DÍAS A LA SEMANA?', { hi: 'CUÁNTOS DÍAS' });
  const r = ChipRow(g, [['3', c('tres0')], ['5', () => at('tres0') + 0.7], ['7', () => at('tres0') + 1.5]], { cx: 1500, cy: 150, size: 64 });
  [0, 0.7, 1.5].forEach(d => sfx('pop', at('tres0') + d, 0.6));
  return t => { show(a, t, at('cuantos0')); r(t); };
}, true);
stillScene(svg, 'a1d', c('mejor0'), c('diezmil0'), { focus: [0.6, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, '¿TODOS LOS DÍAS = MEJOR?', { hi: 'MEJOR' });
  return t => show(a, t, at('mejor0') + 0.5);
}, true);
scene(svg, c('diezmil0'), c('ciencia0'), g => {
  const n = Text(g, '10.000', { x: 700, y: 440, size: 180, color: ACC });
  const l = Text(g, 'PASOS AL DÍA', { x: 700, y: 560, size: 56 });
  const w = ItemCard(g, 'reloj', 1420, 470, { w: 420, h: 460, fit: 340 });
  const b = Chip(g, '30 MINUTOS SIN PARAR', { cx: 700, cy: 720, fill: C.white, size: 46 });
  const q = Stamp(g, '¿SEGURO?', { cx: 1420, cy: 820, size: 70, color: C.red, rot: -6 });
  sfx('pop', at('diezmil0') + 2); sfx('pop', at('diezmil0') + 5); sfx('stamp', at('diezmil0') + 8);
  return t => { pop(n, t, at('diezmil0') + 2, 700, 440); show(l, t, at('diezmil0') + 2.3); pop(w, t, at('diezmil0') + 2.6, 1420, 470); pop(b, t, at('diezmil0') + 5, 700, 720); q.draw(t, at('diezmil0') + 8); };
});
scene(svg, c('ciencia0'), c('detalle0'), g => {
  const ts = [['calendar', 'FRECUENCIA'], ['speed', 'INTENSIDAD'], ['clock', 'REPARTO'], ['steps', 'DISTANCIA']].map(([ic, s], i) => [IconTile(g, ic, s, 300 + i * 440, 500, { w: 380, h: 400 }), 300 + i * 440, i]);
  const a = CAP(g, 'TAN IMPORTANTES COMO LA DISTANCIA', { hi: 'TAN IMPORTANTES', size: 52 });
  [0, 1.2, 3.6, 6].forEach(d => sfx('pop', at('ciencia0') + d, 0.5));
  return t => { ts.forEach(([tile, cx, i]) => pop(tile, t, at('ciencia0') + [0, 1.2, 3.6, 6][i], cx, 500)); show(a, t, at('ciencia0') + 6.4); };
});
stillScene(svg, 'a2b', c('detalle0'), c('seis0'), { focus: [0.6, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'CAMINAR ≠ FUERZA MUSCULAR', { hi: '≠' });
  return t => show(a, t, at('fuerza0') + 1);
});
scene(svg, c('seis0'), c('cuarta0'), g => {
  const h = Text(g, '6 VERDADES', { x: 960, y: 140, size: 100, color: ACC });
  const ts = SIGNS.map(([ic, s], i) => { const cx = 400 + (i % 3) * 560, cy = 400 + Math.floor(i / 3) * 330; return [IconTile(g, ic, s, cx, cy, { w: 360, h: 290 }), cx, cy, i]; });
  ts.forEach(([, , , i]) => sfx('pop', at('seis0') + 0.8 + i * 0.5, 0.5));
  return t => { pop(h, t, at('seis0'), 960, 140); ts.forEach(([tile, cx, cy, i]) => pop(tile, t, at('seis0') + 0.8 + i * 0.5, cx, cy)); };
});
stillScene(svg, 'a2c', c('cuarta0'), c('suscribe0'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'NO TE PIERDAS LA CUARTA', { hi: 'LA CUARTA' });
  const m = Medal(g, 'dumbbell', 1650, 220, 1.4);
  sfx('pop', at('cuarta0') + 1);
  return t => { show(a, t, at('cuarta0')); pop(m, t, at('cuarta0') + 1, 1650, 220); };
});
scene(svg, c('suscribe0'), () => END + 1, g => {
  const host = Host(g, 'waving', { cx: 420, cy: 580, fit: 700 });
  const h = Text(g, 'MOVILIDAD Y AUTONOMÍA', { x: 1260, y: 330, size: 60, color: ACC });
  const w = el('g', { transform: 'translate(300 0)' }, g); const cta = CTA(w, 'sub', 560);
  sfx('click', at('suscribe0') + 3.5);
  return t => { host(t, at('suscribe0')); show(h, t, at('suscribe0') + 1); pop(cta, t, at('suscribe0') + 3.5, 1260, 560); };
});

window.draw = t => drawScenes(t);
