// Punto 5 — who wins: side-by-side protein bars; cheese? not so fast; serving sizes, salt, calories; quality vs energy; smart combinations; no breakfast replaces exercise.
window.START = at('h5') - 0.3;
window.END = at('h6') - 0.3;
window.DURATION = window.END;
const svg = Stage('p5');
const c = k => () => at(k);

TitleCard(svg, 5, '¿CUÁL GANA?', 'Avena, huevos o queso', () => START, c('momento5'));
stillScene(svg, 'p5aa', c('momento5'), c('av5'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const k = Kicker(g, 5, 'PUNTO 5 · COMPARACIÓN'); Progress(g, 4);
  const a = CAP(g, 'NO LA FAMA: LO QUE APORTA', { hi: 'LO QUE APORTA' });
  return t => { slideIn(k, t, at('momento5'), 'l', 600); show(a, t, at('popularidad')); };
});
scene(svg, c('av5'), c('ganador5'), g => {
  const h = Text(g, 'PROTEÍNA POR RACIÓN', { x: 960, y: 130, size: 64, color: ACC });
  const A = ProteinBar(g, 'AVENA · 40 g', 5, 6, 960, 320, { w: 1100, ic: 'bowl', col: '#A07A4E' });
  const B = ProteinBar(g, 'HUEVOS · 2 unidades', 12, 14, 960, 540, { w: 1100, ic: 'egg', col: '#B5694E' });
  const Cc = ProteinBar(g, 'QUESO FRESCO PROTEICO · 150 g', 12, 20, 960, 760, { w: 1100, ic: 'cheese', col: '#3E8080' });
  const na = Chip(g, 'SU FUERTE: ENERGÍA Y FIBRA', { cx: 960, cy: 415, fill: C.white, size: 30 });
  const nb = Chip(g, 'PROTEÍNA COMPLETA · LEUCINA', { cx: 960, cy: 635, fill: C.white, size: 30 });
  const nc = Chip(g, 'DEPENDE DEL PRODUCTO', { cx: 960, cy: 855, fill: C.white, size: 30 });
  sfx('pop', at('av5g')); sfx('pop', at('hu5g')); sfx('pop', at('qu5g'));
  return t => { show(h, t, at('av5')); show(A.g, t, at('av5g')); A.draw(t, at('av5g') + 0.5); pop(na, t, at('av5g') + 6, 960, 415); show(B.g, t, at('hu5g')); B.draw(t, at('hu5g') + 0.5); pop(nb, t, at('hu5g') + 6, 960, 635); show(Cc.g, t, at('qu5g')); Cc.draw(t, at('qu5g') + 0.5); pop(nc, t, at('qu5g') + 8, 960, 855); };
});
stillScene(svg, 'p5ab', c('ganador5'), c('raciones'), { focus: [0.5, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, '¿GANA EL QUESO?', { hi: 'QUESO' });
  const s = Stamp(g, 'NO TAN DEPRISA', { cx: 1450, cy: 200, size: 64, color: C.red, rot: -5 });
  sfx('stamp', at('deprisa'));
  return t => { show(a, t, at('ganador5')); s.draw(t, at('deprisa')); };
});
scene(svg, c('raciones'), c('calidad5'), g => {
  const h = Text(g, 'TAMBIÉN IMPORTAN…', { x: 960, y: 160, size: 70, color: ACC });
  const ts = [['scale', 'TAMAÑO DE\nLA RACIÓN', () => at('raciones') + 0.5], ['drop', 'CALORÍAS', () => at('raciones') + 2], ['cross', 'SAL', () => at('raciones') + 3.5], ['plate', 'GRASAS', () => at('calorias5') + 3.4], ['heart', 'TUS\nNECESIDADES', () => at('calorias5') + 4.6]].map(([ic, l, k], i) => [IconTile(g, ic, l, 240 + i * 360, 520, { w: 320, h: 360 }), k, 240 + i * 360]);
  ts.forEach(([, k]) => sfx('pop', k(), 0.5));
  return t => { show(h, t, at('raciones')); ts.forEach(([tile, k, cx]) => pop(tile, t, k(), cx, 520)); };
});
stillScene(svg, 'p5ac', c('calidad5'), c('verdadero5'), { focus: [0.5, 0.55], zoom: 0.12 }, g => {
  const r = SideChips(g, [['CALIDAD PROTEICA: HUEVOS Y QUESO', () => at('calidad5') + 2], ['ENERGÍA Y FIBRA: AVENA', c('energia5')]], { cx: 1220, y0: 150, dy: 120, size: 34 });
  sfx('pop', at('calidad5') + 2); sfx('pop', at('energia5'));
  return t => r(t);
});
stillScene(svg, 'p5ad', c('verdadero5'), c('c1'), { focus: [0.6, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, 'EL GANADOR: UNA COMBINACIÓN', { hi: 'COMBINACIÓN' });
  return t => show(a, t, at('combinacion5'));
});
stillScene(svg, 'p5ba', c('c1'), c('c2'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'AVENA + YOGUR PROTEICO', { hi: 'YOGUR' });
  return t => show(a, t, at('c1') + 0.3);
});
stillScene(svg, 'p5bb', c('c2'), c('c3'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'HUEVOS + PAN INTEGRAL + TOMATE', { hi: 'HUEVOS', size: 52 });
  return t => show(a, t, at('c2') + 0.3);
});
stillScene(svg, 'p5bc', c('c3'), c('sedentaria'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'TOSTADA CON QUESO FRESCO', { hi: 'QUESO FRESCO' });
  const b = Chip(g, 'SIN OLVIDAR EL RESTO DE COMIDAS', { cx: 960, cy: 140, fill: C.white, size: 40 });
  sfx('pop', at('cubrir5') + 2);
  return t => { show(a, t, at('c3') + 0.3); pop(b, t, at('cubrir5') + 2, 960, 140); };
});
stillScene(svg, 'p5bd', c('sedentaria'), c('util5'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'ALIMENTACIÓN + EJERCICIO, JUNTOS', { hi: 'JUNTOS', size: 52 });
  return t => show(a, t, at('sedentaria') + 1);
});
scene(svg, c('util5'), () => END + 1, g => {
  const host = Host(g, 'face_happy', { cx: 1450, cy: 560, fit: 620 });
  const a = Text(g, '3 DESAYUNOS', { x: 680, y: 400, size: 96, color: ACC });
  const r = SideChips(g, [['SENCILLOS', () => at('util5') + 4], ['ECONÓMICOS', () => at('util5') + 5], ['FÁCILES', () => at('util5') + 6]], { cx: 680, y0: 520, dy: 120, size: 44, fill: C.white });
  [4, 5, 6].forEach(d => sfx('pop', at('util5') + d, 0.5));
  return t => { host(t, at('util5')); show(a, t, at('util5') + 1.5); r(t); };
});

window.draw = t => drawScenes(t);
