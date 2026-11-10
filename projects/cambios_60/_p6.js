// Señal 6 — bones and joints: fear of movement → dependence; bone density falls (esp. after menopause); arthritis ≠ osteoporosis; osteoporosis painless until fracture; fracture after minor fall, height loss → DXA; exercise, calcium, vitamin D, supplements only if indicated; inactivity hurts joints; red flags; message.
window.START = at('h6') - 3.6;
window.END = at('c0') - 0.6;
window.DURATION = window.END;
const svg = Stage('p6');
const c = k => () => at(k);

TitleCard(svg, 6, 'HUESOS Y ARTICULACIONES', 'El cambio que puede limitar tu movilidad', () => START, c('riesgo6'));
stillScene(svg, 'g1d', c('riesgo6'), c('cambios6'), { focus: [0.55, 0.5], zoom: 0.14 }, g => {
  const k = Kicker(g, 6, 'SEÑAL 6 · HUESOS'); Progress(g, 5);
  const r = SideChips(g, [['EVITAR MOVERSE POR MIEDO', () => at('miedo6') + 0.5], ['PERDER CAPACIDAD', () => at('miedo6') + 3.5], ['MÁS DEPENDENCIA', () => at('miedo6') + 6]], { cx: 480, y0: 200, dy: 120, size: 38 });
  return t => { slideIn(k, t, at('riesgo6'), 'l', 600); r(t); };
});
scene(svg, c('cambios6'), c('confunden6'), g => {
  const p = Pair(g, ['hueso_sano', 'HUESO DENSO', C.green], ['hueso_poroso', 'MENOS DENSIDAD', C.red]);
  const n = Chip(g, 'SOBRE TODO EN MUJERES TRAS LA MENOPAUSIA', { cx: 960, cy: 900, fill: C.white, size: 40 });
  sfx('pop', at('cambios6') + 1); sfx('pop', at('densidad6') + 1); sfx('pop', at('densidad6') + 4);
  return t => { pop(p.a, t, at('cambios6') + 1, 560, 500); show(p.ar, t, at('densidad6')); pop(p.b, t, at('densidad6') + 1, 1360, 500); pop(n, t, at('densidad6') + 4, 960, 900); };
});
scene(svg, c('confunden6'), c('importante6'), g => {
  const h = Text(g, 'NO CONFUNDIR', { x: 960, y: 130, size: 70, color: ACC });
  const a = el('g', {}, g); Card(a, { x: 140, y: 220, w: 800, h: 700, fill: C.white }); cut(a, 'rodilla', 540, 470, 360); Text(a, 'ARTROSIS', { x: 540, y: 710, size: 64, color: ACC });
  ['dolor · rigidez', 'dificultad para moverse'].forEach((s, i) => Text(a, s, { x: 540, y: 790 + i * 56, size: 36, weight: 800 }));
  const b = el('g', {}, g); Card(b, { x: 980, y: 220, w: 800, h: 700, fill: C.white }); cut(b, 'hueso_poroso', 1380, 470, 340); Text(b, 'OSTEOPOROSIS', { x: 1380, y: 710, size: 64, color: C.red });
  ['hueso menos resistente', 'más riesgo de fractura'].forEach((s, i) => Text(b, s, { x: 1380, y: 790 + i * 56, size: 36, weight: 800 }));
  sfx('pop', at('artrosis6')); sfx('pop', at('osteoporosis6'));
  return t => { show(h, t, at('confunden6')); pop(a, t, at('artrosis6'), 540, 570); pop(b, t, at('osteoporosis6'), 1380, 570); };
});
scene(svg, c('importante6'), c('caida6'), g => {
  const b = el('g', {}, g); cut(b, 'hueso_poroso', 960, 420, 380);
  const s = Stamp(g, 'SIN DOLOR… HASTA LA FRACTURA', { cx: 960, cy: 740, size: 64, color: C.red, rot: -3 });
  const a = CAP(g, 'NO ESPERES A QUE DUELA', { hi: 'NO ESPERES', size: 56 });
  sfx('pop', at('importante6')); sfx('stamp', at('nodolor6') + 1);
  return t => { pop(b, t, at('importante6'), 960, 420); s.draw(t, at('nodolor6') + 1); show(a, t, at('error6')); };
});
stillScene(svg, 'g1a', c('caida6'), () => at('caida6') + 3.5, { focus: [0.45, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'FRACTURA TRAS UNA CAÍDA LEVE', { hi: 'CAÍDA LEVE' });
  return t => show(a, t, at('caida6') + 0.3);
});
stillScene(svg, 'g1b', () => at('caida6') + 3.5, c('densito6'), { focus: [0.6, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'PÉRDIDA NOTABLE DE ESTATURA', { hi: 'ESTATURA' });
  return t => show(a, t, at('caida6') + 3.7);
});
stillScene(svg, 'g1c', c('densito6'), c('suplementos6'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'DENSITOMETRÍA SEGÚN TU RIESGO', { hi: 'DENSITOMETRÍA' });
  return t => show(a, t, at('densito6') + 2);
});
scene(svg, c('suplementos6'), c('ajustar6'), g => {
  const h = Text(g, 'PROTEGER LOS HUESOS: MÁS QUE SUPLEMENTOS', { x: 960, y: 130, size: 52, color: ACC });
  const st = Still(el('g', {}, g), 'cut/g2c.png', { x: 100, y: 220, w: 820, h: 460, iw: SZ.g2c[0], ih: SZ.g2c[1], r: 26 });
  const r = SideChips(g, [['FUERZA', () => at('actividad6') + 3], ['EQUILIBRIO', () => at('actividad6') + 4.5], ['CARGA DE PESO, SI ES SEGURO', () => at('actividad6') + 6]], { cx: 1400, y0: 280, dy: 130, size: 38 });
  const m = ItemCard(g, 'leche', 1180, 820, { w: 300, h: 260, fit: 170, label: 'CALCIO', size: 32 });
  const d = el('g', {}, g); Card(d, { x: 1400, y: 690, w: 300, h: 260, fill: C.white }); IC.light(d, 1505, 720, 0.9); Text(d, 'VITAMINA D', { x: 1550, y: 905, size: 32 });
  sfx('pop', at('calcio6')); sfx('pop', at('calcio6') + 3.5);
  return t => { show(h, t, at('suplementos6')); show(st.g, t, at('actividad6')); st.draw(t, at('actividad6'), at('ajustar6')); r(t); pop(m, t, at('calcio6'), 1180, 820); pop(d, t, at('calcio6') + 3.5, 1550, 820); };
});
stillScene(svg, 'g2a', c('ajustar6'), c('inactivo6'), { focus: [0.45, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'SUPLEMENTOS: SOLO SI ESTÁN INDICADOS', { hi: 'INDICADOS', size: 52 });
  return t => show(a, t, at('ajustar6') + 0.5);
});
stillScene(svg, 'g2d', c('inactivo6'), c('naturalmente6'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'QUEDARSE QUIETO DEBILITA LA ARTICULACIÓN', { hi: 'DEBILITA', size: 48 });
  const b = CAP(g, 'EJERCICIO PROGRESIVO Y ADAPTADO', { hi: 'ADAPTADO', size: 52 });
  return t => { show(a, t, at('inactivo6') + 1, at('benefician6')); show(b, t, at('benefician6') + 0.3); };
});
scene(svg, c('naturalmente6'), c('terminar6'), g => {
  const w = Warn(g, 'CONSULTA SI APARECE…', ['DOLOR INTENSO', 'HINCHAZÓN IMPORTANTE', 'FIEBRE CON UNA ARTICULACIÓN DOLOROSA', 'NO PUEDES APOYAR LA PIERNA O EL BRAZO'], { kind: 'amber', y: 140, w: 1400 });
  sfx('alert', at('naturalmente6') + 0.3);
  return t => pop(w, t, at('naturalmente6') + 0.3, 960, 420);
}, true);
stillScene(svg, 'g2b', c('terminar6'), c('prevencion6'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const r = SideChips(g, [['CAMINAR SEGURO', () => at('renunciar6') + 3], ['SUBIR ESCALERAS', () => at('renunciar6') + 5], ['TU DÍA A DÍA', () => at('renunciar6') + 6.5]], { cx: 480, y0: 200, dy: 120, size: 40 });
  const a = CAP(g, 'MÁS DE 60 ≠ RENUNCIAR', { hi: 'RENUNCIAR', size: 58 });
  return t => { show(a, t, at('renunciar6')); r(t); };
});
scene(svg, c('prevencion6'), () => END + 1, g => {
  const a = Text(g, 'LA PREVENCIÓN NO DETIENE EL TIEMPO', { x: 960, y: 300, size: 62, color: C.grey });
  const b = Text(g, 'PROTEGE TU INDEPENDENCIA', { x: 960, y: 420, size: 86, color: ACC });
  const r = ChipRow(g, [['COMPRENDER', () => at('saludable6') + 5], ['RECONOCER', () => at('saludable6') + 7], ['ACTUAR A TIEMPO', () => at('saludable6') + 9]], { cy: 720, size: 48 });
  sfx('ding', at('prevencion6') + 3);
  return t => { show(a, t, at('prevencion6')); pop(b, t, at('prevencion6') + 3, 960, 420); r(t); };
});

window.draw = t => drawScenes(t);
