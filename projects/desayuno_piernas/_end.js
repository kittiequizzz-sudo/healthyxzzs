// Conclusion — best breakfast is a smart combination; recap; warnings (sudden weakness, one-leg swelling, kidney); quiz (answer not revealed); subscribe.
window.START = at('c0') - 0.5;
window.END = 1266.57;
window.DURATION = window.END;
const svg = Stage('end');
const c = k => () => at(k);

stillScene(svg, 'ha', () => START, c('r_av'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'NO HAY ALIMENTO MILAGROSO', { hi: 'MILAGROSO' });
  return t => show(a, t, at('milagroso') + 2);
}, true);
scene(svg, c('r_av'), c('elegir_c'), g => {
  const it = [['avena', 'FIBRA Y ENERGÍA', 'r_av'], ['huevos', 'PROTEÍNA COMPLETA', 'r_hu'], ['queso_fresco', 'PROTEÍNA Y CALCIO', () => at('r_hu') + 4]].map(([n, l, k], i) => [ItemCard(g, n, 420 + i * 540, 500, { w: 460, h: 480, fit: 320, label: l, size: 34 }), typeof k === 'string' ? c(k) : k, 420 + i * 540]);
  it.forEach(([, k]) => sfx('pop', k(), 0.6));
  return t => it.forEach(([cc, k, cx]) => pop(cc, t, k(), cx, 500));
});
scene(svg, c('elegir_c'), c('significa_c'), g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 680 });
  const q = Bubble(g, '¿Cuál elijo?', { cx: 1200, cy: 300, size: 60 });
  const a = Text(g, 'COMBINARLOS CON INTELIGENCIA', { x: 1200, y: 600, size: 54, color: ACC });
  sfx('ding', at('elegir_c')); sfx('pop', at('depende_c') + 3);
  return t => { host(t, at('elegir_c')); pop(q, t, at('elegir_c'), 1200, 300); show(a, t, at('depende_c') + 3); };
});
stillScene(svg, 'hb', c('significa_c'), c('advertencia'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'SILLA, ESCALERAS, INDEPENDENCIA', { hi: 'INDEPENDENCIA', size: 52 });
  return t => show(a, t, at('significa_c') + 4);
});
scene(svg, c('advertencia'), c('quiz'), g => {
  const w = Warn(g, 'NO LO ATRIBUYAS A LA EDAD NI A LA DIETA', ['PÉRDIDA RÁPIDA DE FUERZA · DEBILIDAD REPENTINA', 'DIFICULTAD CRECIENTE PARA CAMINAR', 'DOLOR INTENSO O UNA SOLA PIERNA HINCHADA'], { kind: 'red', y: 90, w: 1640 });
  const k = Chip(g, 'ENFERMEDAD RENAL: CONSULTA ANTES DE AUMENTAR PROTEÍNA', { cx: 960, cy: 640, fill: C.white, size: 34 });
  const n = Chip(g, 'NINGÚN DESAYUNO SUSTITUYE UNA EVALUACIÓN MÉDICA', { cx: 960, cy: 770, fill: C.white, size: 34 });
  const s = Source(g, 'Contenido educativo · no sustituye una valoración médica', 960);
  sfx('alert', at('urg')); sfx('pop', at('renal_c') + 4); sfx('pop', at('nosust_c'));
  return t => { pop(w, t, at('urg'), 960, 310); pop(k, t, at('renal_c') + 4, 960, 640); pop(n, t, at('nosust_c'), 960, 770); show(s, t, at('nosust_c') + 1); };
});
scene(svg, c('quiz'), c('suscribe_c'), g => {
  const h = Text(g, 'PREGUNTA DEL DÍA', { x: 960, y: 110, size: 76, color: ACC });
  const q = Text(g, 'Avena con agua: ¿qué añades para más proteína?', { x: 960, y: 210, size: 46, weight: 800 });
  const av = el('g', {}, g); cut(av, 'avena', 960, 340, 160);
  const ops = [['A', 'huevo_cocido', 'UN HUEVO'], ['B', 'manzana', 'UNA MANZANA'], ['C', 'miel', 'UNA CUCHARADA DE MIEL']].map(([L, n, s], i) => {
    const o = el('g', {}, g), cx = 480 + i * 480, cy = 640;
    Card(o, { x: cx - 210, y: cy - 190, w: 420, h: 380, fill: C.white });
    el('circle', { cx, cy: cy - 130, r: 46, fill: ACC, stroke: C.ink, 'stroke-width': 5 }, o); Text(o, L, { x: cx, y: cy - 127, size: 56, color: C.white });
    cut(o, n, cx, cy + 10, 170); Text(o, s, { x: cx, y: cy + 140, size: s.length > 12 ? 28 : 36 }); return [o, i, cx, cy];
  });
  const cta = CTA(el('g', { transform: 'translate(-200 0)' }, g), 'comment', 940);
  const host = Host(g, 'three_q', { cx: 1760, cy: 880, fit: 300 });
  sfx('ding', at('quiz')); ops.forEach(([, i]) => sfx('pop', at('opciones') + i * 1, 0.6)); sfx('click', at('escribe'));
  return t => { show(h, t, at('quiz')); show(q, t, at('quiz') + 3); pop(av, t, at('quiz') + 3.5, 960, 340); ops.forEach(([o, i, cx, cy]) => pop(o, t, at('opciones') + i * 1, cx, cy)); pop(cta, t, at('escribe'), 760, 940); host(t, at('quiz') + 1); };
});
stillScene(svg, 'hd', c('suscribe_c'), () => END + 1, { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const a = el('g', { transform: 'translate(-420 -760)' }, g); const s = CTA(a, 'sub', 900);
  const b = el('g', {}, g); Card(b, { x: 1160, y: 75, w: 440, h: 130, fill: C.white, r: 65 }); IC.share(b, 1190, 90, 1); Text(b, 'COMPARTE', { x: 1435, y: 142, size: 46 });
  const cc = CAP(g, 'FUERZA · MOVILIDAD · AUTONOMÍA', { hi: 'AUTONOMÍA', size: 52 });
  sfx('click', at('suscribe_c') + 2.5); sfx('click', at('suscribe_c') + 4); sfx('ding', at('suscribe_c') + 9);
  return t => { pop(s, t, at('suscribe_c') + 2.5, 540, 140); pop(b, t, at('suscribe_c') + 4, 1380, 140); show(cc, t, at('suscribe_c') + 8); };
});

window.draw = t => drawScenes(t);
