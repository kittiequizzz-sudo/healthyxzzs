// Punto 2 — B12: myelin, red cells; slow symptoms; absorption with age; drugs; foods; injections; CTA.
window.START = at('h2') - 1.0;
window.END = at('h3') - 2.3;
window.DURATION = window.END;
const svg = Stage('p2');
const c = k => () => at(k);

TitleCard(svg, 2, 'VITAMINA B12', 'La protección de tus nervios', () => START, c('dormidos'));
stillScene(svg, 'p2aa', c('dormidos'), c('algodon'), { focus: [0.5, 0.6], zoom: 0.14 }, g => {
  const k = Kicker(g, 2, 'PUNTO 2 · VITAMINA B12'); Progress(g, 1);
  const a = CAP(g, '¿PIES DORMIDOS?', { hi: 'DORMIDOS' });
  return t => { slideIn(k, t, at('dormidos'), 'l', 600); show(a, t, at('dormidos') + 0.5); };
});
stillScene(svg, 'p2ab', c('algodon'), c('mision2'), { focus: [0.5, 0.7], zoom: 0.14 }, g => {
  const a = CAP(g, 'COMO CAMINAR SOBRE ALGODÓN', { hi: 'ALGODÓN' });
  const b = Chip(g, 'PUEDE TENER VARIAS CAUSAS', { cx: 1400, cy: 140, fill: C.white, size: 40 });
  sfx('pop', at('causas2'));
  return t => { show(a, t, at('algodon')); pop(b, t, at('causas2'), 1400, 140); };
});
// myelin + red cells
scene(svg, c('mision2'), c('lento2'), g => {
  const b = VitBadge(g, 'B12', 260, 200, 1.6);
  const rc = ItemCard(g, 'globulos', 400, 560, { w: 440, h: 440, fit: 330, label: 'GLÓBULOS ROJOS', size: 34 });
  const ok = el('g', {}, g); Card(ok, { x: 760, y: 220, w: 1020, h: 300, fill: C.white }); cut(ok, 'nervio_ok', 940, 370, 260); Text(ok, 'MIELINA: LA CUBIERTA', { x: 1390, y: 330, size: 46 }); Text(ok, 'del nervio', { x: 1390, y: 400, size: 38, weight: 700 });
  const bad = el('g', {}, g); Card(bad, { x: 760, y: 580, w: 1020, h: 300, fill: '#FCE9E6' }); cut(bad, 'nervio_mal', 940, 730, 260); Text(bad, 'SEÑALES QUE FALLAN', { x: 1390, y: 690, size: 46, color: C.red });
  const r = ChipRow(g, [['HORMIGUEOS', c('hormigueos2')], ['MENOS SENSIBILIDAD', () => at('hormigueos2') + 1.6], ['DEBILIDAD', () => at('hormigueos2') + 3.2], ['EQUILIBRIO', () => at('hormigueos2') + 4.6]], { cy: 975, size: 32, fill: C.white, gap: 20 });
  sfx('pop', at('mision2')); sfx('pop', at('globulos')); sfx('pop', at('mielina')); sfx('alert_soft', at('disminuyen2'));
  return t => { pop(b, t, at('mision2'), 260, 200); pop(rc, t, at('globulos'), 400, 560); pop(ok, t, at('mielina'), 1270, 370); pop(bad, t, at('disminuyen2'), 1270, 730); r(t); };
});
scene(svg, c('lento2'), c('edad2'), g => {
  const cal = el('g', {}, g); IC.calendar(cal, 360, 260, 3.6);
  const a = Text(g, 'SE DESARROLLA LENTAMENTE', { x: 1230, y: 400, size: 58 });
  const b = Text(g, 'meses… o incluso años', { x: 1230, y: 490, size: 46, weight: 700, color: C.grey });
  const w = Chip(g, 'TRATAR A TIEMPO IMPORTA', { cx: 1230, cy: 680, fill: C.red, color: C.white, size: 46 });
  sfx('pop', at('lento2')); sfx('alert_soft', at('persistir2'));
  return t => { pop(cal, t, at('lento2'), 540, 440); show(a, t, at('lento2') + 0.6); show(b, t, at('lento2') + 3); pop(w, t, at('persistir2'), 1230, 680); };
});
// absorption with age
scene(svg, c('edad2'), c('medicamentos2'), g => {
  const h = Text(g, '¿POR QUÉ MÁS RIESGO CON LA EDAD?', { x: 960, y: 140, size: 64, color: ACC });
  const ts = [['drop', 'MENOS ÁCIDO\nEN EL ESTÓMAGO', 'acido']].map(([ic, s, k], i) => [IconTile(g, ic, s, 960, 500, { w: 520, h: 460 }), k, 960]);
  ts.forEach(([, k]) => sfx('pop', at(k), 0.6));
  return t => { show(h, t, at('edad2')); ts.forEach(([tile, k, cx]) => pop(tile, t, at(k), 960, 500)); };
});
stillScene(svg, 'p2ac', c('medicamentos2'), c('buena2'), { focus: [0.45, 0.45], zoom: 0.12 }, g => {
  const r = SideChips(g, [['PROTECTORES DE ESTÓMAGO', () => at('medicamentos2') + 0.5], ['…DURANTE MUCHO TIEMPO', () => at('medicamentos2') + 2.5], ['METFORMINA', c('metformina')]], { cx: 1500, y0: 170, size: 36 });
  const a = CAP(g, 'COMER BIEN NO SIEMPRE BASTA', { hi: 'NO SIEMPRE' });
  [0.5, 2.5].forEach(d => sfx('pop', at('medicamentos2') + d, 0.6)); sfx('pop', at('metformina'));
  return t => { r(t); show(a, t, at('absorcion2')); };
});
// foods
stillScene(svg, 'p2ba', c('buena2'), () => at('buena2') + 3.2, { focus: [0.4, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'LA BUENA NOTICIA', { hi: 'BUENA' });
  return t => show(a, t, at('buena2'));
});
stillScene(svg, 'p2bb', () => at('buena2') + 3.2, () => at('sardinas2') - 0.4, { focus: [0.5, 0.55], zoom: 0.12 }, g => {
  const a = CAP(g, 'ALIMENTOS DE CADA DÍA', { hi: 'CADA DÍA' });
  return t => show(a, t, at('buena2') + 3.4);
});
scene(svg, () => at('sardinas2') - 0.4, c('inyecciones'), g => {
  const h = Text(g, 'B12 EN LA DIETA MEDITERRÁNEA', { x: 960, y: 140, size: 64, color: ACC });
  const r = FoodRow(g, [['sardinas', 'SARDINAS', c('sardinas2')], ['caballa', 'CABALLA', () => at('sardinas2') + 0.8], ['huevos', 'HUEVOS', () => at('sardinas2') + 1.5], ['leche', 'LECHE Y YOGUR', () => at('sardinas2') + 2.3], ['marisco', 'MARISCO', () => at('sardinas2') + 4]], { w: 320, h: 380, fit: 250 });
  return t => { show(h, t, at('sardinas2') - 0.4); r(t); };
});
  return t => show(a, t, at('sardinas2') + 6.3);
});
stillScene(svg, 'p2bc', c('inyecciones'), c('detalle2'), { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'SI NO SE ABSORBE: PASTILLAS O INYECCIONES', { hi: 'INYECCIONES', size: 46 });
  const b = Chip(g, 'CON SUPERVISIÓN MÉDICA', { cx: 1450, cy: 140, fill: C.white, size: 40 });
  sfx('pop', at('inyecciones') + 5);
  return t => { show(a, t, at('inyecciones') + 1); slideIn(b, t, at('inyecciones') + 5, 'r', 400); };
});
stillScene(svg, 'p2ad', c('detalle2'), c('noedad2'), { focus: [0.55, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'NADA DE GRANDES DOSIS "POR SI ACASO"', { hi: 'GRANDES DOSIS', size: 50 });
  const b = CAP(g, 'TU MÉDICO VALORA LA ANALÍTICA', { hi: 'ANALÍTICA' });
  return t => { show(a, t, at('grandes2'), at('analitica')); show(b, t, at('analitica')); };
});
scene(svg, c('noedad2'), c('suscribe2'), g => {
  const a = el('g', {}, g); Card(a, { x: 300, y: 260, w: 1320, h: 460, fill: C.white });
  const f = el('g', {}, a); cut(f, 'nervio_mal', 520, 490, 300);
  Text(a, 'HORMIGUEOS QUE NO SE VAN', { x: 1110, y: 420, size: 50 }); Text(a, 'O DIFICULTAD AL CAMINAR', { x: 1110, y: 500, size: 50 });
  const s = Stamp(g, 'NO ES "LA EDAD"', { cx: 1110, cy: 630, size: 60, color: C.red, rot: -3 });
  sfx('pop', at('noedad2')); sfx('stamp', at('noedad2') + 4);
  return t => { pop(a, t, at('noedad2'), 960, 490); s.draw(t, at('noedad2') + 4); };
});
stillScene(svg, 'p2bd', c('suscribe2'), () => END + 1, { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const a = el('g', { transform: 'translate(-420 -760)' }, g); const s = CTA(a, 'sub', 900);
  const b = el('g', {}, g); Card(b, { x: 1140, y: 75, w: 440, h: 130, fill: C.white, r: 65 }); IC.share(b, 1170, 90, 1); Text(b, 'COMPARTE', { x: 1415, y: 142, size: 46 });
  const nx = Chip(g, 'SIGUIENTE: MÚSCULOS QUE TE SOSTIENEN', { cx: 960, cy: 975, fill: C.ink, color: C.white, size: 40 });
  sfx('click', at('suscribe2') + 2); sfx('click', at('suscribe2') + 4);
  return t => { pop(s, t, at('suscribe2') + 2, 540, 140); pop(b, t, at('suscribe2') + 4, 1360, 140); show(nx, t, END - 7); };
});

window.draw = t => drawScenes(t);
