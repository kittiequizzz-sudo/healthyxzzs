// Punto 1 — muscles need more than a big breakfast: sarcopenia, anabolic resistance, leucine, 1–1.2 g/kg, skewed protein distribution.
window.START = at('h1') - 1.5;
window.END = at('h2') - 0.4;
window.DURATION = window.END;
const svg = Stage('p1');
const c = k => () => at(k);

TitleCard(svg, 1, 'ALGO MÁS QUE UN DESAYUNO ABUNDANTE', 'Después de los 60', () => START, c('hambre'));
scene(svg, c('hambre'), c('cafe1'), g => {
  const k = Kicker(g, 1, 'PUNTO 1 · MÚSCULO'); Progress(g, 0);
  const a = el('g', {}, g); Card(a, { x: 200, y: 280, w: 700, h: 440, fill: C.white }); cut(a, 'cafe', 550, 450, 280); Text(a, 'QUITAR EL HAMBRE', { x: 550, y: 650, size: 46 });
  const vs = Text(g, '≠', { x: 960, y: 500, size: 150, color: C.red });
  const b = el('g', {}, g); Card(b, { x: 1020, y: 280, w: 700, h: 440, fill: C.white }); cut(b, 'muslo_fuerte', 1370, 450, 300); Text(b, 'ALIMENTAR EL MÚSCULO', { x: 1370, y: 650, size: 46, color: ACC });
  sfx('pop', at('hambre') + 1); sfx('pop', at('hambre') + 4);
  return t => { slideIn(k, t, at('hambre'), 'l', 600); pop(a, t, at('hambre') + 1, 550, 500); show(vs, t, at('hambre') + 3); pop(b, t, at('hambre') + 4, 1370, 500); };
});
stillScene(svg, 'p1ac', c('cafe1'), c('menos1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'CAFÉ Y TOSTADAS: SATISFECHO…', { hi: 'SATISFECHO' });
  return t => show(a, t, at('cafe1') + 0.5);
});
stillScene(svg, 'p1aa', c('menos1'), c('cambios1'), { focus: [0.5, 0.6], zoom: 0.14 }, g => {
  const a = CAP(g, '…PERO POCA PROTEÍNA', { hi: 'POCA PROTEÍNA' });
  return t => show(a, t, at('menos1') + 0.5);
});
scene(svg, c('cambios1'), c('piernas1'), g => {
  const a = ItemCard(g, 'muslo_fuerte', 480, 480, { w: 400, h: 500, fit: 400 });
  const ar = el('g', {}, g); Arrow(ar, 720, 480, 860, 480, C.ink, 14);
  const b = ItemCard(g, 'muslo_debil', 1100, 480, { w: 400, h: 500, fit: 400 });
  const s = Stamp(g, 'SARCOPENIA', { cx: 1550, cy: 260, size: 64, color: C.red, rot: -6 });
  sfx('pop', at('cambios1')); sfx('pop', at('cambios1') + 3); sfx('stamp', at('sarcopenia') + 1);
  return t => { pop(a, t, at('cambios1'), 480, 480); show(ar, t, at('cambios1') + 2.5); pop(b, t, at('cambios1') + 3, 1100, 480); s.draw(t, at('sarcopenia') + 1); };
});
stillScene(svg, 'p1ad', c('piernas1'), c('detalle1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const r = SideChips(g, [['LEVANTARSE', () => at('piernas1') + 4], ['CAMINAR', () => at('piernas1') + 5], ['ESCALERAS', () => at('piernas1') + 6], ['EQUILIBRIO', () => at('piernas1') + 7.5]], { cx: 380, y0: 160, dy: 110, size: 36 });
  [4, 5, 6, 7.5].forEach(d => sfx('pop', at('piernas1') + d, 0.5));
  return t => r(t);
});
stillScene(svg, 'p1ab', c('detalle1'), () => at('estimulo') + 1, { focus: [0.6, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'UN DETALLE QUE POCOS CONOCEN', { hi: 'POCOS' });
  return t => show(a, t, at('detalle1') + 0.3);
});
// anabolic resistance: bigger signal
scene(svg, () => at('estimulo') + 1, c('leucina'), g => {
  const h = Text(g, 'CON LOS AÑOS, HACE FALTA UNA SEÑAL MÁS FUERTE', { x: 960, y: 140, size: 50, color: ACC });
  const lab = (x, s) => Text(g, s, { x, y: 860, size: 44 });
  const yb = el('g', {}, g), ob = el('g', {}, g);
  const yr = el('rect', { x: 460, y: 780, width: 200, height: 0, rx: 16, fill: C.green, stroke: C.ink, 'stroke-width': 5 }, yb); lab(560, 'JOVEN');
  const orr = el('rect', { x: 1260, y: 780, width: 200, height: 0, rx: 16, fill: ACC, stroke: C.ink, 'stroke-width': 5 }, ob); lab(1360, 'MAYOR');
  const th = el('path', { d: 'M360 480 H1560', stroke: C.red, 'stroke-width': 6, 'stroke-dasharray': '16 12' }, g); const tl = Text(g, 'UMBRAL', { x: 1640, y: 480, size: 34, color: C.red });
  const fib = el('g', {}, g); cut(fib, 'fibra', 960, 420, 260);
  sfx('pop', at('estimulo')); sfx('ding', at('senal1') + 3);
  return t => { show(h, t, at('estimulo') + 1); const u = E.out(prog(t, at('estimulo') + 1, at('estimulo') + 3)); set(yr, { y: 780 - 340 * u, height: 340 * u }); const v = E.out(prog(t, at('estimulo') + 3, at('senal1') + 3)); set(orr, { y: 780 - 420 * v, height: 420 * v }); show(th, t, at('estimulo') + 1); show(tl, t, at('estimulo') + 1); pop(fib, t, at('senal1') + 3, 960, 420); };
});
scene(svg, c('leucina'), c('gkg'), g => {
  const m = ItemCard(g, 'leucina', 520, 480, { w: 480, h: 520, fit: 380, label: 'LEUCINA', size: 48 });
  const it = [['huevos', 'HUEVOS'], ['yogur', 'LÁCTEOS']].map(([n, l], i) => [ItemCard(g, n, 1150 + i * 380, 360, { w: 320, h: 320, fit: 220, label: l, size: 34 }), 1150 + i * 380]);
  const ar = el('g', {}, g); Arrow(ar, 780, 640, 1180, 640, ACC, 14); const f = el('g', {}, g); cut(f, 'fibra', 1400, 680, 220);
  const r = ChipRow(g, [['PROTEÍNA COMPLETA', () => at('nobasta') + 3], ['ENERGÍA', () => at('nobasta') + 5.5], ['ACTIVIDAD FÍSICA', () => at('nobasta') + 6.8]], { cy: 920, size: 36, fill: C.white });
  sfx('pop', at('leucina') + 2); it.forEach((x, i) => sfx('pop', at('leucina') + 5 + i, 0.6)); sfx('pop', at('sintesis') + 2);
  return t => { pop(m, t, at('leucina') + 2, 520, 480); it.forEach(([cc, cx], i) => pop(cc, t, at('leucina') + 5 + i, cx, 360, at('sintesis') + 1.5)); show(ar, t, at('sintesis') + 2); pop(f, t, at('sintesis') + 2.5, 1400, 680); r(t); };
});
scene(svg, c('gkg'), () => at('gkg') + 12.5, g => {
  const a = Text(g, '1 – 1,2 g', { x: 960, y: 400, size: 160, color: ACC });
  const b = Text(g, 'DE PROTEÍNA POR KILO DE PESO, AL DÍA', { x: 960, y: 520, size: 48 });
  const ex = Chip(g, 'EJEMPLO: 70 kg ≈ 70–84 g / día', { cx: 960, cy: 680, fill: C.white, size: 46 });
  const n = Chip(g, 'ADULTOS MAYORES SANOS · SE ADAPTA A CADA PERSONA', { cx: 960, cy: 820, fill: '#E5D9D6', size: 32 });
  const src = Source(g, 'PROT-AGE 2013 · ESPEN 2014');
  sfx('pop', at('gkg') + 0.3); sfx('pop', at('gkg') + 6); sfx('pop', at('gkg') + 10);
  return t => { pop(a, t, at('gkg') + 0.3, 960, 400); show(b, t, at('gkg') + 1); pop(ex, t, at('gkg') + 6, 960, 680); pop(n, t, at('gkg') + 10, 960, 820); show(src, t, at('gkg') + 3); };
});
stillScene(svg, 'p1bb', () => at('gkg') + 12.5, c('problema1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'SE ADAPTA A CADA PERSONA', { hi: 'CADA PERSONA' });
  return t => show(a, t, at('gkg') + 12.7);
});
stillScene(svg, 'p1ba', c('problema1'), c('concentran'), { focus: [0.5, 0.5], zoom: 0.08 }, g => {
  const a = CAP(g, 'OTRO PROBLEMA', { hi: 'PROBLEMA' });
  return t => show(a, t, at('problema1') + 0.2);
});
// protein distribution
scene(svg, c('concentran'), c('revisar1'), g => {
  const meals = [['DESAYUNO', 0.2, C.red], ['COMIDA', 0.85, C.green], ['CENA', 0.7, C.green]].map(([l, v, col], i) => { const w = el('g', {}, g), x = 420 + i * 420; const r = el('rect', { x: x - 100, y: 780, width: 200, height: 0, rx: 16, fill: col, stroke: C.ink, 'stroke-width': 5 }, w); Text(w, l, { x, y: 850, size: 42 }); return [w, r, v, i]; });
  const h = Text(g, 'PROTEÍNA A LO LARGO DEL DÍA', { x: 960, y: 150, size: 64, color: ACC });
  const arr = el('g', {}, g); Arrow(arr, 420, 300, 420, 440, C.red, 14);
  sfx('pop', at('concentran') + 1);
  return t => { show(h, t, at('concentran')); meals.forEach(([w, r, v, i]) => { const order = [2, 0, 1][i]; const u = E.out(prog(t, at('concentran') + 1 + order * 0.8, at('concentran') + 2 + order * 0.8)); set(r, { y: 780 - 420 * v * u, height: 420 * v * u }); }); show(arr, t, at('concentran') + 5); };
});
stillScene(svg, 'p1bc', c('revisar1'), c('avena1'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'REVISA TU PLATO DE LA MAÑANA', { hi: 'MAÑANA' });
  return t => show(a, t, at('revisar1') + 0.2);
});
scene(svg, c('avena1'), c('candidato1'), g => {
  const it = [['avena', 'ENERGÍA Y FIBRA', 'avena1'], ['huevos', 'PROTEÍNA DE CALIDAD', 'huevos1'], ['queso_fresco', 'PROTEÍNA Y CALCIO', () => at('huevos1') + 3]].map(([n, l, k], i) => [ItemCard(g, n, 420 + i * 540, 470, { w: 460, h: 480, fit: 320, label: l, size: 32 }), typeof k === 'string' ? c(k) : k, 420 + i * 540]);
  const q = CAP(g, '¿CUÁL ES LA MEJOR ELECCIÓN?', { hi: 'MEJOR' });
  it.forEach(([, k]) => sfx('pop', k(), 0.6));
  return t => { it.forEach(([cc, k, cx]) => pop(cc, t, k(), cx, 470)); show(q, t, at('cual1')); };
});
stillScene(svg, 'p1bd', c('candidato1'), () => END + 1, { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const a = CAP(g, 'PRIMER CANDIDATO…', { hi: 'PRIMER' });
  return t => show(a, t, at('candidato1') + 0.5);
});

window.draw = t => drawScenes(t);
