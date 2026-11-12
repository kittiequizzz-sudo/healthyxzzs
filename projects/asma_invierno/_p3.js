// Punto 3 — clean smell ≠ clean air: air fresheners, scented candles, strong cleaners can irritate; tobacco (no safe level), wood smoke, incense; plain products + ventilation; damp cloth; fuel heaters → carbon monoxide → maintenance + detector.
window.START = at('h3') - 1.2;
window.END = at('h4') - 1.0;
window.DURATION = window.END;
const svg = Stage('p3');
const c = k => () => at(k);

TitleCard(svg, 3, 'HUELE BIEN ≠ AIRE SANO', 'Irritantes dentro de casa', () => START, c('limpiar3'));
scene(svg, c('limpiar3'), c('ambientadores3'), g => {
  const k = Kicker(g, 3, 'CONSEJO 3 · IRRITANTES'); Progress(g, 2);
  const a = Text(g, 'OLOR A LIMPIO', { x: 960, y: 360, size: 96, color: C.ink });
  const ne = Text(g, '≠', { x: 960, y: 500, size: 130, color: C.red });
  const b = Text(g, 'AIRE SALUDABLE', { x: 960, y: 640, size: 96, color: ACC });
  sfx('stamp', at('olor3') + 1);
  return t => { slideIn(k, t, at('limpiar3'), 'l', 600); show(a, t, at('olor3')); pop(ne, t, at('olor3') + 1, 960, 500); show(b, t, at('olor3') + 1.5); };
});
stillScene(svg, 'd1a', c('ambientadores3'), c('velas3'), { focus: [0.45, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'AMBIENTADORES', { hi: 'AMBIENTADORES' });
  return t => show(a, t, at('ambientadores3') + 0.3);
});
stillScene(svg, 'd1b', c('velas3'), c('productos3'), { focus: [0.55, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'VELAS AROMÁTICAS', { hi: 'AROMÁTICAS' });
  return t => show(a, t, at('velas3') + 0.3);
});
stillScene(svg, 'd1c', c('productos3'), c('invierno3'), { focus: [0.4, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'PRODUCTOS DE OLOR INTENSO', { hi: 'OLOR INTENSO' });
  const b = CAP(g, 'INCLUSO POCA CANTIDAD PUEDE IRRITAR', { hi: 'POCA CANTIDAD', size: 50 });
  return t => { show(a, t, at('productos3') + 0.3, at('pequenas3')); show(b, t, at('pequenas3') + 0.3); };
});
scene(svg, c('invierno3'), c('tabaco3'), g => {
  const h = el('g', {}, g); IC.house(h, 760, 260, 4);
  const a = CAP(g, 'EN INVIERNO PASAMOS MÁS TIEMPO DENTRO', { hi: 'DENTRO', size: 50 });
  const b = Chip(g, 'IDENTIFICA Y REDUCE LOS IRRITANTES', { cx: 960, cy: 160, fill: ACC, color: C.white, size: 46 });
  sfx('pop', at('invierno3')); sfx('ding', at('consejo3') + 1);
  return t => { pop(h, t, at('invierno3'), 960, 460); show(a, t, at('invierno3') + 0.5); pop(b, t, at('consejo3') + 1, 960, 160); };
});
stillScene(svg, 'd2a', c('tabaco3'), c('chimeneas3'), { focus: [0.6, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'NINGUNA CANTIDAD DE HUMO ES SEGURA', { hi: 'NINGUNA', size: 52 });
  const b = Chip(g, 'CASA 100 % SIN TABACO', { cx: 960, cy: 120, fill: C.red, color: C.white, size: 46 });
  sfx('stamp', at('segura3') + 6);
  return t => { show(a, t, at('segura3')); pop(b, t, at('segura3') + 6, 960, 120); };
});
stillScene(svg, 'd1d', c('chimeneas3'), c('aerosoles3'), { focus: [0.55, 0.5], zoom: 0.14 }, g => {
  const r = ChipRow(g, [['CHIMENEAS', () => at('chimeneas3') + 1.5], ['ESTUFAS DE LEÑA', () => at('chimeneas3') + 3], ['INCIENSO', () => at('chimeneas3') + 4.5], ['VELAS', () => at('chimeneas3') + 5.5]], { cy: 110, size: 38 });
  const a = CAP(g, 'LIMITA EL HUMO SI EMPEORAS', { hi: 'LIMITA' });
  return t => { r(t); show(a, t, at('chimeneas3') + 6.5); };
});
scene(svg, c('aerosoles3'), c('polvo3'), g => {
  const no = el('g', {}, g); Card(no, { x: 200, y: 240, w: 680, h: 560, fill: C.white }); cut(no, 'ambientador', 540, 470, 300); Mark(no, false, 790, 310, 0.9); Text(no, 'AEROSOLES MUY PERFUMADOS', { x: 540, y: 730, size: 32 });
  const yes = el('g', {}, g); Card(yes, { x: 1040, y: 240, w: 680, h: 560, fill: C.white }); IC.drop2(yes, 1290, 330, 1.8); Mark(yes, true, 1630, 310, 0.9); Text(yes, 'PRODUCTOS SENCILLOS', { x: 1380, y: 660, size: 36 }); Text(yes, '+ VENTILACIÓN', { x: 1380, y: 730, size: 36, color: ACC });
  sfx('pop', at('aerosoles3')); sfx('pop', at('sencillos3'));
  return t => { pop(no, t, at('aerosoles3'), 540, 520); pop(yes, t, at('sencillos3'), 1380, 520); };
});
stillScene(svg, 'd2b', c('polvo3'), c('detalle3'), { focus: [0.55, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'EL POLVO, CON UN PAÑO HÚMEDO', { hi: 'PAÑO HÚMEDO' });
  return t => show(a, t, at('polvo3') + 0.5);
});
scene(svg, c('detalle3'), c('aroma3'), g => {
  const st = Still(el('g', {}, g), 'cut/d2d.png', { x: 120, y: 160, w: 760, h: 460, iw: SZ.d2d[0], ih: SZ.d2d[1], r: 28 });
  const w = el('g', {}, g); Warn(el('g', { transform: 'translate(400 0)' }, w), 'MONÓXIDO DE CARBONO', ['CALEFACTORES DE COMBUSTIBLE', 'MAL MANTENIDOS', 'GAS SIN OLOR · INTOXICACIÓN GRAVE'], { kind: 'red', y: 140, w: 920 });
  const d = el('g', {}, g); const dst = Still(d, 'cut/d2c.png', { x: 260, y: 700, w: 480, h: 300, iw: SZ.d2c[0], ih: SZ.d2c[1], r: 22 });
  const m = Chip(g, 'MANTENIMIENTO CORRECTO', { cx: 1360, cy: 840, fill: C.white, size: 40 });
  sfx('alert', at('co3')); sfx('pop', at('detectores3')); sfx('pop', at('detectores3') + 3);
  return t => { show(st.g, t, at('calefactores3')); st.draw(t, at('calefactores3'), at('aroma3')); show(w, t, at('co3')); pop(m, t, at('detectores3'), 1360, 840); pop(d, t, at('detectores3') + 3, 500, 850); dst.draw(t, at('detectores3'), at('aroma3')); };
}, true);
scene(svg, c('aroma3'), c('motivo3'), g => {
  const a = Text(g, 'UNA CASA SANA', { x: 960, y: 360, size: 96, color: ACC });
  const b = Text(g, 'NO NECESITA OLER A PERFUME', { x: 960, y: 480, size: 64 });
  const cc = Chip(g, 'NECESITA MENOS IRRITANTES', { cx: 960, cy: 680, fill: C.green, color: C.white, size: 50 });
  sfx('ding', at('saludable3') + 4);
  return t => { show(a, t, at('aroma3') + 0.5); show(b, t, at('saludable3')); pop(cc, t, at('saludable3') + 4, 960, 680); };
});
scene(svg, c('motivo3'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, 'El consejo más importante…', { cx: 1220, cy: 300, size: 52 });
  const i = el('g', {}, g); cut(i, 'inhalador', 1220, 650, 300);
  sfx('ding', at('motivo3') + 1); sfx('pop', at('importante3'));
  return t => { host(t, at('motivo3')); pop(q, t, at('importante3'), 1220, 300); pop(i, t, at('importante3') + 1, 1220, 650); };
});

window.draw = t => drawScenes(t);
