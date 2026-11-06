// Punto 2 — oats: energy, beta-glucans, minerals; 40 g ≈ 5–6 g protein; add yoghurt/milk/egg; no food replaces strength work; question.
window.START = at('h2') - 0.4;
window.END = at('h3') - 0.3;
window.DURATION = window.END;
const svg = Stage('p2');
const c = k => () => at(k);

TitleCard(svg, 2, 'LA AVENA', 'Energía sí… ¿y para tus músculos?', () => START, c('reputacion'));
stillScene(svg, 'p2aa', c('reputacion'), c('interesante2'), { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const k = Kicker(g, 2, 'PUNTO 2 · AVENA'); Progress(g, 1);
  const r = SideChips(g, [['CORAZÓN', c('corazon2')], ['ALIMENTACIÓN', () => at('corazon2') + 1.6], ['ENERGÍA', () => at('corazon2') + 3.4]], { cx: 1600, y0: 280, size: 40 });
  const a = CAP(g, '¿BASTA UN PLATO DE AVENA?', { hi: '¿BASTA' });
  [0, 1.6, 3.4].forEach(d => sfx('pop', at('corazon2') + d, 0.5));
  return t => { slideIn(k, t, at('reputacion'), 'l', 600); r(t); show(a, t, at('pregunta2') + 7); };
});
scene(svg, c('interesante2'), c('limitacion'), g => {
  const av = ItemCard(g, 'avena', 480, 500, { w: 480, h: 500, fit: 380 });
  const L = [['bowl', 'HIDRATOS COMPLEJOS → ENERGÍA', 'hidratos'], ['heart', 'BETAGLUCANOS → COLESTEROL', 'betaglucanos'], ['drop', 'MAGNESIO · HIERRO · FÓSFORO', 'minerales']].map(([ic, s, k], i) => { const w = el('g', {}, g), y = 260 + i * 200; Card(w, { x: 860, y, w: 900, h: 160, fill: C.white }); IC[ic](w, 890, y + 30, 1); Text(w, s, { x: 1350, y: y + 80, size: 38 }); return [w, k, y]; });
  const ok = Chip(g, 'HASTA AQUÍ, TODO BIEN', { cx: 1300, cy: 930, fill: C.green, color: C.white, size: 40 });
  sfx('pop', at('interesante2') + 1); L.forEach(([, k]) => sfx('pop', at(k), 0.6)); sfx('ding', at('favorable'));
  return t => { pop(av, t, at('interesante2') + 1, 480, 500); L.forEach(([w, k, y]) => pop(w, t, at(k), 1310, y + 80)); pop(ok, t, at('favorable'), 1300, 930); };
});
scene(svg, c('limitacion'), c('detalle2'), g => {
  const s = Stamp(g, 'UNA LIMITACIÓN', { cx: 960, cy: 170, size: 70, color: C.red, rot: -4 });
  const av = ItemCard(g, 'avena_seca', 420, 520, { w: 440, h: 440, fit: 340, label: '40 g DE AVENA SECA', size: 34 });
  const pb = ProteinBar(g, 'PROTEÍNA', 5, 6, 1220, 520, { w: 760, ic: 'bowl' });
  const n = Chip(g, 'ÚTIL, PERO POCA PARA UN DESAYUNO', { cx: 1220, cy: 760, fill: C.white, size: 38 });
  sfx('stamp', at('limitacion')); sfx('pop', at('cuarenta')); sfx('pop', at('util2'));
  return t => { s.draw(t, at('limitacion')); pop(av, t, at('cuarenta'), 420, 520); show(pb.g, t, at('cuarenta') + 2); pb.draw(t, at('cuarenta') + 3); pop(n, t, at('util2'), 1220, 760); };
});
stillScene(svg, 'p2ab', c('detalle2'), c('abandonar'), { focus: [0.5, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'SOLO AVENA CON AGUA: POCA PROTEÍNA', { hi: 'POCA PROTEÍNA', size: 50 });
  return t => show(a, t, at('agua2'));
});
stillScene(svg, 'p2ac', c('abandonar'), c('yogur2'), { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'NO LA DEJES: ACOMPÁÑALA', { hi: 'ACOMPÁÑALA' });
  return t => show(a, t, at('abandonar') + 1);
});
scene(svg, c('yogur2'), c('clave2'), g => {
  const h = Text(g, 'AVENA +', { x: 960, y: 150, size: 80, color: ACC });
  const cs = [['yogur', 'YOGUR RICO EN PROTEÍNA', 'yogur2'], ['leche', 'LECHE', 'leche2'], ['huevo_cocido', 'UN HUEVO COCIDO', () => at('leche2') + 2]].map(([n, l, k], i) => [ItemCard(g, n, 420 + i * 540, 520, { w: 460, h: 460, fit: 300, label: l, size: 32 }), typeof k === 'string' ? c(k) : k, 420 + i * 540]);
  cs.forEach(([, k]) => sfx('pop', k(), 0.6));
  return t => { show(h, t, at('yogur2')); cs.forEach(([cc, k, cx]) => pop(cc, t, k(), cx, 520)); };
});
stillScene(svg, 'p2ba', c('clave2'), c('fuerza2'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'UNA PARTE, NO TODO', { hi: 'UNA PARTE' });
  return t => show(a, t, at('clave2') + 1);
});
scene(svg, c('fuerza2'), c('anos2'), g => {
  const a = ItemCard(g, 'avena', 520, 480, { w: 400, h: 420, fit: 300, label: 'ALIMENTACIÓN', size: 40 });
  const p = Text(g, '+', { x: 960, y: 480, size: 140, color: ACC });
  const b = ItemCard(g, 'silla', 1400, 480, { w: 400, h: 420, fit: 300, label: 'EJERCICIOS DE FUERZA', size: 34 });
  const n = CAP(g, 'NINGÚN ALIMENTO SUSTITUYE EL EJERCICIO', { hi: 'NINGÚN', size: 50 });
  sfx('pop', at('fuerza2')); sfx('pop', at('fuerza2') + 2);
  return t => { pop(a, t, at('estimulos2'), 520, 480); show(p, t, at('estimulos2') + 1); pop(b, t, at('fuerza2') + 2, 1400, 480); show(n, t, at('fuerza2') + 0.5); };
});
stillScene(svg, 'p2bb', c('anos2'), c('pregunta2b'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'BASTA CON AÑADIR EL ALIMENTO ADECUADO', { hi: 'AÑADIR', size: 50 });
  return t => show(a, t, at('anos2') + 1);
});
stillScene(svg, 'p2bd', c('pregunta2b'), c('siguiente2'), { focus: [0.55, 0.45], zoom: 0.1 }, g => {
  const q = Bubble(g, '¿Avena, huevos o queso?', { cx: 600, cy: 170, size: 46 });
  const cta = CTA(el('g', {}, g), 'comment', 960);
  sfx('ding', at('pregunta2b') + 1.5); sfx('click', at('escribelo2'));
  return t => { pop(q, t, at('pregunta2b') + 1.5, 600, 170); pop(cta, t, at('escribelo2'), 960, 960); };
});
scene(svg, c('siguiente2'), () => END + 1, g => {
  const e = ItemCard(g, 'huevos', 640, 500, { w: 500, h: 500, fit: 380 });
  const a = Text(g, 'PROTEÍNA COMPLETA', { x: 1300, y: 420, size: 60, color: ACC });
  const b = Text(g, 'en poca cantidad', { x: 1300, y: 510, size: 48 });
  const q = Chip(g, '¿YA ESTÁ EN TU NEVERA?', { cx: 1300, cy: 660, fill: C.white, size: 42 });
  sfx('pop', at('siguiente2') + 4); sfx('pop', at('siguiente2') + 12);
  return t => { pop(e, t, at('siguiente2') + 4, 640, 500); show(a, t, at('siguiente2') + 8.5); show(b, t, at('siguiente2') + 10); pop(q, t, at('siguiente2') + 12.8, 1300, 660); };
});

window.draw = t => drawScenes(t);
