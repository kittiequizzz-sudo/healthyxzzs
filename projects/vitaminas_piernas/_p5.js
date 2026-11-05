// Punto 5 — B6: neurotransmitters (GABA); not a sign of swelling; EXCESS damages nerves; food; swollen legs need a doctor; question.
window.START = at('h5') - 2.3;
window.END = at('h6') - 2.2;
window.DURATION = window.END;
const svg = Stage('p5');
const c = k => () => at(k);

TitleCard(svg, 5, 'VITAMINA B6', 'El equilibrio de nervios y músculos', () => START, c('cansadas5'));
stillScene(svg, 'p5aa', c('cansadas5'), c('b6'), { focus: [0.45, 0.6], zoom: 0.12 }, g => {
  const k = Kicker(g, 5, 'PUNTO 5 · VITAMINA B6'); Progress(g, 4);
  const r = SideChips(g, [['HORMIGUEOS', () => at('cansadas5') + 6], ['MOLESTIAS', () => at('cansadas5') + 7.5], ['DEBILIDAD', () => at('cansadas5') + 9]], { cx: 1600, y0: 230, size: 40 });
  [6, 7.5, 9].forEach(d => sfx('pop', at('cansadas5') + d, 0.5));
  return t => { slideIn(k, t, at('cansadas5'), 'l', 600); r(t); };
});
scene(svg, c('b6'), c('importa5'), g => {
  const b = VitBadge(g, 'B6', 960, 230, 2.6);
  const p = Text(g, 'PIRIDOXINA', { x: 960, y: 400, size: 60, color: ACC });
  const p2 = Text(g, 'MUCHAS REACCIONES ESENCIALES', { x: 960, y: 480, size: 44 });
  const n1 = el('g', {}, g); cut(n1, 'nervio_ok', 900, 540, 300);
  const n2 = el('g', {}, g); cut(n2, 'nervio_ok', 1480, 540, 300);
  const gap = el('g', {}, g); for (let i = 0; i < 5; i++) el('circle', { cx: 1130 + i * 30, cy: 540 + 30 * Math.sin(i), r: 12, fill: ACC, stroke: C.ink, 'stroke-width': 3 }, gap);
  const r = SideChips(g, [['METABOLIZA PROTEÍNAS', () => at('neuro5') + 0.3], ['NEUROTRANSMISORES', () => at('neuro5') + 3]], { cx: 400, y0: 600, dy: 140, size: 36 });
  const gb = Chip(g, 'GABA: CALMA LA ACTIVIDAD NERVIOSA', { cx: 1190, cy: 840, fill: C.white, size: 36 });
  sfx('pop', at('b6')); sfx('pop', at('neuro5') + 3); sfx('pop', at('gaba'));
  return t => { pop(b, t, at('b6'), 960, 230, at('neuro5') + 2.6); show(p, t, at('b6') + 3, at('neuro5') + 2.6); show(p2, t, at('reacciones'), at('neuro5') + 2.6); pop(n1, t, at('neuro5') + 3, 900, 540); pop(n2, t, at('neuro5') + 3.3, 1480, 540); show(gap, t, at('neuro5') + 4); gap.setAttribute('transform', `translate(${(10 * Math.sin(t * 3)).toFixed(1)} 0)`); r(t); pop(gb, t, at('gaba'), 1190, 840); };
});
scene(svg, c('importa5'), c('error5'), g => {
  const ts = [['brain', 'CEREBRO'], ['bolt', 'NERVIOS'], ['dumbbell', 'MÚSCULOS']].map(([ic, s], i) => [IconTile(g, ic, s, 460 + i * 500, 420, { w: 380, h: 380 }), 460 + i * 500, i]);
  const ar = [0, 1].map(i => { const a = el('g', {}, g); Arrow(a, 660 + i * 500, 420, 760 + i * 500, 420, ACC, 12); return a; });
  const a = el('g', {}, g); Card(a, { x: 260, y: 700, w: 1400, h: 150, fill: C.white }); Mark(a, false, 380, 775, 0.8); Text(a, 'PESADEZ O HINCHAZÓN ≠ FALTA DE B6', { x: 1010, y: 775, size: 46 });
  [0, 1, 2].forEach(i => sfx('pop', at('comunicacion5') + 2 + i * 1.2, 0.5)); sfx('pop', at('noespecifica'));
  return t => { ts.forEach(([tile, cx, i]) => pop(tile, t, at('comunicacion5') + 2 + i * 1.2, cx, 420)); ar.forEach((x, i) => show(x, t, at('comunicacion5') + 2.8 + i * 1.2)); pop(a, t, at('noespecifica'), 960, 775); };
});
stillScene(svg, 'p5ab', c('error5'), c('exceso'), { focus: [0.5, 0.55], zoom: 0.14 }, g => {
  const a = CAP(g, '¿MÁS CANTIDAD = MEJOR?', { hi: 'MEJOR' });
  const s = Stamp(g, 'ERROR', { cx: 1550, cy: 200, size: 90, color: C.red, rot: -6 });
  sfx('stamp', at('delicado'));
  return t => { show(a, t, at('mas5')); s.draw(t, at('delicado')); };
}, true);
// dose curve: food ok, excess → nerve damage
scene(svg, c('exceso'), c('alimentacion5'), g => {
  const ax = el('g', {}, g);
  el('path', { d: 'M260 840 H1660 M260 840 V260', stroke: C.ink, 'stroke-width': 6, fill: 'none' }, ax);
  Text(ax, 'DOSIS', { x: 1580, y: 890, size: 36 }); Text(ax, 'Y DURACIÓN', { x: 1580, y: 930, size: 28, weight: 700 });
  const zoneA = el('g', {}, g); el('rect', { x: 270, y: 270, width: 560, height: 560, fill: C.green, 'fill-opacity': 0.14 }, zoneA);
  const zoneB = el('g', {}, g); el('rect', { x: 1080, y: 270, width: 570, height: 560, fill: C.red, 'fill-opacity': 0.14 }, zoneB);
  const la = Text(g, 'CON LA COMIDA', { x: 550, y: 320, size: 40, color: C.green });
  const lb = Text(g, 'SUPLEMENTOS EN EXCESO', { x: 1365, y: 320, size: 36, color: C.red });
  const nOk = el('g', {}, g); cut(nOk, 'nervio_ok', 550, 600, 260);
  const nBad = el('g', {}, g); cut(nBad, 'nervio_mal', 1365, 600, 260);
  const r = ChipRow(g, [['HORMIGUEOS', () => at('exceso') + 6], ['MENOS SENSIBILIDAD', () => at('exceso') + 7.5], ['DIFICULTAD AL CAMINAR', () => at('exceso') + 9.5]], { cy: 990, size: 34, fill: '#FCE3DE', gap: 20 });
  const cap = Chip(g, '¡LOS MISMOS SÍNTOMAS QUE SE QUERÍAN EVITAR!', { cx: 960, cy: 180, fill: C.red, color: C.white, size: 38 });
  sfx('pop', at('exceso')); sfx('alert', at('exceso') + 3, 0.7); sfx('stamp', at('precisamente5'));
  return t => { show(ax, t, at('exceso')); show(zoneA, t, at('exceso') + 0.5); show(la, t, at('exceso') + 0.5); pop(nOk, t, at('exceso') + 0.8, 550, 600); show(zoneB, t, at('exceso') + 3); show(lb, t, at('exceso') + 3); pop(nBad, t, at('exceso') + 3.3, 1365, 600); r(t); pop(cap, t, at('precisamente5'), 960, 180); };
});
stillScene(svg, 'p5ac', c('alimentacion5'), () => at('garbanzos5') - 0.6, { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'MEJOR CON UNA DIETA VARIADA', { hi: 'DIETA VARIADA' });
  const b = Chip(g, 'SALVO INDICACIÓN PROFESIONAL', { cx: 1350, cy: 140, fill: C.white, size: 38 });
  sfx('pop', at('alimentacion5') + 4);
  return t => { show(a, t, at('alimentacion5') + 0.5); pop(b, t, at('alimentacion5') + 4, 1350, 140); };
});
scene(svg, () => at('garbanzos5') - 0.6, c('recetas'), g => {
  const h = Text(g, 'VITAMINA B6 EN TU MESA', { x: 960, y: 140, size: 70, color: ACC });
  const r = FoodRow(g, [['garbanzos', 'GARBANZOS', c('garbanzos5')], ['patatas', 'PATATAS', () => at('garbanzos5') + 1], ['sardinas', 'PESCADO', () => at('garbanzos5') + 2], ['pollo', 'POLLO', () => at('garbanzos5') + 3], ['platanos', 'PLÁTANOS', () => at('garbanzos5') + 4.2], ['nueces', 'FRUTOS SECOS', () => at('garbanzos5') + 5.4]], { w: 270, h: 340, fit: 210, gap: 26 });
  return t => { show(h, t, at('garbanzos5') - 0.6); r(t); };
});
stillScene(svg, 'p5ad', c('recetas'), () => at('plato5') + 3.3, { focus: [0.55, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'SIN RECETAS COMPLICADAS', { hi: 'SIN' });
  return t => show(a, t, at('recetas'));
});
stillScene(svg, 'p5ba', () => at('plato5') + 3.3, () => at('plato5') + 6.6, { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'PESCADO CON PATATAS', { hi: 'PESCADO' });
  return t => show(a, t, at('plato5') + 3.4);
});
stillScene(svg, 'p5bb', () => at('plato5') + 6.6, c('hinchadas5'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'O UNA COMIDA CON POLLO', { hi: 'POLLO' });
  return t => show(a, t, at('plato5') + 6.7);
});
stillScene(svg, 'p5bd', c('hinchadas5'), c('pregunta5'), { focus: [0.6, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, 'PIERNAS HINCHADAS: VALORACIÓN MÉDICA', { hi: 'VALORACIÓN', size: 50 });
  const r = SideChips(g, [['CIRCULACIÓN', () => at('hinchadas5') + 3], ['CORAZÓN', () => at('hinchadas5') + 4], ['RIÑÓN', () => at('hinchadas5') + 5]], { cx: 380, y0: 160, size: 40 });
  [3, 4, 5].forEach(d => sfx('pop', at('hinchadas5') + d, 0.5));
  return t => { show(a, t, at('hinchadas5') + 0.5); r(t); };
});
scene(svg, c('pregunta5'), c('colageno5'), g => {
  const host = Host(g, 'three_q', { cx: 400, cy: 600, fit: 720 });
  const q = Bubble(g, '¿Suplementos o alimentos?', { cx: 1180, cy: 330, size: 54 });
  const w = el('g', { transform: 'translate(220 0)' }, g); const cta = CTA(w, 'comment', 650);
  const s = el('g', { transform: 'translate(220 0)' }, g); const cs = CTA(s, 'sub', 850);
  sfx('ding', at('pregunta5') + 2); sfx('click', at('cuentamelo5')); sfx('click', at('cuentamelo5') + 2);
  return t => { host(t, at('pregunta5')); pop(q, t, at('pregunta5') + 2, 1180, 330); pop(cta, t, at('cuentamelo5'), 1180, 650); pop(cs, t, at('cuentamelo5') + 2, 1180, 850); };
});
scene(svg, c('colageno5'), () => END + 1, g => {
  const b = VitBadge(g, 'C', 640, 440, 3);
  const v = ItemCard(g, 'vena', 1300, 460, { w: 420, h: 520, fit: 420 });
  const a = Text(g, 'COLÁGENO PARA LOS VASOS', { x: 960, y: 840, size: 58 });
  sfx('pop', at('colageno5') + 0.5); sfx('pop', at('colageno5') + 2);
  return t => { pop(b, t, at('colageno5') + 0.5, 640, 440); pop(v, t, at('colageno5') + 2, 1300, 460); show(a, t, at('colageno5') + 3); };
});

window.draw = t => drawScenes(t);
