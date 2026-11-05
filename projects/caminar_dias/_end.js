// Conclusion — walk better > walk more; recap; red flags; consult; quiz (answer not revealed); share + subscribe.
window.START = at('c0') - 0.6;
window.END = 1296.07;
window.DURATION = window.END;
const svg = Stage('end');
const c = k => () => at(k);

stillScene(svg, 'ha', () => START, c('nodiezmil'), { focus: [0.45, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'CAMINAR MEJOR > CAMINAR MÁS', { hi: 'MEJOR' });
  return t => show(a, t, START + 1);
}, true);
scene(svg, c('nodiezmil'), () => at('fuerza_c') + 5, g => {
  const h = Text(g, 'LO QUE HEMOS APRENDIDO', { x: 960, y: 120, size: 70, color: ACC });
  const L = [['steps', 'NO HACEN FALTA 10.000 PASOS', c('nodiezmil')], ['clock', 'NI UNA HORA SEGUIDA', () => at('nodiezmil') + 3.5], ['speed', 'TU PROPIO RITMO', () => at('nodiezmil') + 6.5], ['calendar', 'AUMENTA POCO A POCO', () => at('frecuencia_c') + 3], ['moon2', 'ESCUCHA A TU CUERPO', () => at('frecuencia_c') + 6], ['dumbbell', '+ FUERZA Y EQUILIBRIO', c('fuerza_c')]].map(([ic, s, t0], i) => {
    const w = el('g', {}, g), x = 180 + (i % 2) * 800, y = 230 + Math.floor(i / 2) * 230; Card(w, { x, y, w: 760, h: 190, fill: C.white }); IC[ic](w, x + 30, y + 45, 1); Text(w, s, { x: x + 440, y: y + 95, size: 40 }); return [w, t0, x + 380, y + 95];
  });
  L.forEach(([, t0]) => sfx('pop', t0(), 0.5));
  return t => { show(h, t, at('nodiezmil')); L.forEach(([w, t0, cx, cy]) => pop(w, t, t0(), cx, cy)); };
});
stillScene(svg, 'hc', () => at('fuerza_c') + 5, c('advertencia'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'PIERNAS FUERTES PARA TU DÍA A DÍA', { hi: 'PIERNAS FUERTES', size: 52 });
  return t => show(a, t, at('fuerza_c') + 5.2);
});
stillScene(svg, 'hb', c('advertencia'), c('pecho'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'UNA ADVERTENCIA IMPORTANTE', { hi: 'ADVERTENCIA' });
  return t => show(a, t, at('advertencia'));
}, true);
scene(svg, c('pecho'), c('quiz'), g => {
  const w = Warn(g, 'PARA Y PIDE AYUDA URGENTE', ['DOLOR EN EL PECHO', 'MUCHA DIFICULTAD PARA RESPIRAR', 'MAREO FUERTE O SENSACIÓN DE DESMAYO'], { kind: 'red', y: 90, w: 1500 });
  const n = Chip(g, 'NO LO ATRIBUYAS A LA EDAD NI AL CANSANCIO', { cx: 960, cy: 600, fill: C.white, size: 38 });
  const d = Chip(g, 'CORAZÓN, ARTICULACIONES O CAÍDAS RECIENTES: CONSULTA ANTES', { cx: 960, cy: 740, fill: C.white, size: 32 });
  const s = Source(g, 'Contenido educativo · no sustituye una valoración médica', 960);
  sfx('alert', at('pecho') + 0.1); sfx('pop', at('noedad_c')); sfx('pop', at('consulta_c'));
  return t => { pop(w, t, at('pecho') + 0.1, 960, 310); pop(n, t, at('noedad_c'), 960, 600); pop(d, t, at('consulta_c'), 960, 740); show(s, t, at('educativo')); };
});
scene(svg, c('quiz'), c('comparte_c'), g => {
  const h = Text(g, 'PREGUNTA DEL DÍA', { x: 960, y: 110, size: 76, color: ACC });
  const q = Text(g, '¿Qué es más recomendable después de los 60?', { x: 960, y: 210, size: 50, weight: 800 });
  const A = el('g', {}, g); Card(A, { x: 160, y: 300, w: 760, h: 420, fill: C.white }); el('circle', { cx: 540, cy: 370, r: 50, fill: ACC, stroke: C.ink, 'stroke-width': 5 }, A); Text(A, 'A', { x: 540, y: 373, size: 60, color: C.white }); IC.steps(A, 490, 450, 1); Text(A, '10.000 PASOS', { x: 540, y: 600, size: 48 }); Text(A, 'OBLIGATORIOS CADA DÍA', { x: 540, y: 660, size: 34, weight: 800 });
  const B = el('g', {}, g); Card(B, { x: 1000, y: 300, w: 760, h: 420, fill: C.white }); el('circle', { cx: 1380, cy: 370, r: 50, fill: ACC, stroke: C.ink, 'stroke-width': 5 }, B); Text(B, 'B', { x: 1380, y: 373, size: 60, color: C.white }); IC.dumbbell(B, 1330, 450, 1); Text(B, 'ADAPTAR A TU CAPACIDAD', { x: 1380, y: 600, size: 42 }); Text(B, '+ EJERCICIOS DE FUERZA', { x: 1380, y: 660, size: 34, weight: 800 });
  const cta = CTA(el('g', { transform: 'translate(-200 0)' }, g), 'comment', 880);
  const m = Bubble(g, '¿Cuántos minutos caminas?', { cx: 1300, cy: 1000, size: 40 });
  const host = Host(g, 'three_q', { cx: 1780, cy: 900, fit: 260 });
  sfx('ding', at('quiz')); sfx('pop', at('qa')); sfx('pop', at('qb')); sfx('click', at('escribe')); sfx('pop', at('minutos_c'));
  return t => { show(h, t, at('quiz')); show(q, t, at('quiz') + 5); pop(A, t, at('qa'), 540, 510); pop(B, t, at('qb'), 1380, 510); pop(cta, t, at('escribe'), 760, 880); pop(m, t, at('minutos_c'), 1300, 1000); host(t, at('escribe') - 0.5); };
});
stillScene(svg, 'hd', c('comparte_c'), () => END + 1, { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const b = el('g', {}, g); Card(b, { x: 300, y: 75, w: 440, h: 130, fill: C.white, r: 65 }); IC.share(b, 330, 90, 1); Text(b, 'COMPARTE', { x: 575, y: 142, size: 46 });
  const a = el('g', { transform: 'translate(420 -760)' }, g); const s = CTA(a, 'sub', 900);
  const cc = CAP(g, 'SEGUIR CAMINANDO MUCHOS AÑOS', { hi: 'MUCHOS AÑOS', size: 52 });
  sfx('click', at('comparte_c') + 2); sfx('click', at('comparte_c') + 4.5); sfx('ding', at('recuerda_c') + 4);
  return t => { pop(b, t, at('comparte_c') + 2, 520, 140); pop(s, t, at('comparte_c') + 4.5, 1380, 140); show(cc, t, at('recuerda_c') + 1); };
});

window.draw = t => drawScenes(t);
