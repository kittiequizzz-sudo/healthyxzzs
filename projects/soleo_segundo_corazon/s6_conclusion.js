// CONCLUSIÓN — recap, no miracle exercise, tonight on the sofa, comments, like/share/subscribe, disclaimer.

// 0. caring for your heart doesn't always need big efforts
scene(svg, at('concl') - 0.3, at('primer_paso2'), g => {
  pan(g, 'f_parque', 'full', { from: [0.3, 0.5], to: [0.6, 0.4] });
  chip(g, 'UNA IDEA IMPORTANTE', at('concl') + 0.5, { cx: 960, cy: 130, size: 46, fill: C.ink, color: C.amber, t1: at('esfuerzos') - 1 });
  cap(g, 'SIN GRANDES ESFUERZOS', at('esfuerzos') - 1, { hi: 'SIN GRANDES ESFUERZOS', hiColor: '#7DE08E' });
});

// 1. the first step: stop staying still for so many hours
scene(svg, at('primer_paso2'), at('ese'), g => {
  pan(g, 'q_pies', 'full', { from: [0.6, 0.6], to: [0.45, 0.45] });
  cap(g, 'PRIMER PASO: NO QUEDARTE INMÓVIL', at('primer_paso2') + 0.3, { size: 50, hi: 'PRIMER PASO' });
});

// 2. the soleus helps the blood come back from your legs to your heart
scene(svg, at('ese'), at('activar_c') - 0.8, g => {
  CalfPump(g, at('ese'), { cx: 640, cy: 590, s: 0.82, mode: 'active' });
  chip(g, 'EL SÓLEO', at('ese') + 1.5, { cx: 1380, cy: 330, size: 60, fill: C.amber });
  chip(g, 'CADA DÍA', at('ese') + 4, { cx: 1380, cy: 490, size: 46 });
  chip(g, 'LA SANGRE VUELVE AL CORAZÓN', at('regrese'), { cx: 1380, cy: 680, size: 34, fill: C.red, color: C.white });
});

// 3. seated heel raises: a simple way to break up sitting
scene(svg, at('activar_c') - 0.8, at('milagroso'), g => {
  heelRaise(g, at('activar_c') - 0.8, { cx: 560, floor: 1020, h: 900, period: 4.6 });
  chip(g, 'ELEVACIONES DE TALÓN', at('activar_c'), { cx: 1360, cy: 320, size: 46, fill: C.amber });
  chip(g, 'SENTADO', at('activar_c') + 0.5, { cx: 1360, cy: 460, size: 46 });
  chip(g, 'MENOS SEDENTARISMO', at('activar_c') + 3, { cx: 1360, cy: 640, size: 42, fill: C.green, color: C.white });
});

// 4. no miracle exercise protects your heart or memory on its own
scene(svg, at('milagroso'), at('diferencia'), g => {
  obj(g, 'corazon', at('milagroso'), { cx: 560, cy: 640, fit: 320 });
  obj(g, 'cerebro', at('milagroso') + 0.4, { cx: 1360, cy: 640, fit: 360, phase: 0.4 });
  stamp(g, 'NINGÚN EJERCICIO MILAGROSO', at('milagroso') + 0.8, { cx: 960, cy: 280, size: 62, color: C.red });
}, { punch: [at('milagroso') + 0.8] });

// 5. the real difference: small daily moves + balanced food + rest + regular activity
scene(svg, at('diferencia'), at('esta_noche'), g => {
  chip(g, 'LA VERDADERA DIFERENCIA', at('diferencia'), { cy: 130, size: 48, fill: C.ink, color: C.amber });
  const items = [['PEQUEÑOS MOVIMIENTOS', 'diferencia', 1.6, c => Cutout(c, src('pierna'), { cx: 0, cy: 0, iw: SZ.pierna[0], ih: SZ.pierna[1], fit: 210 })],
    ['ALIMENTACIÓN', 'alimentacion', 0, c => Icon.plate(c, -75, -75, 1.5)],
    ['DESCANSO', 'descanso_c', 0, c => Cutout(c, src('reloj'), { cx: 0, cy: 0, iw: SZ.reloj[0], ih: SZ.reloj[1], fit: 190 })],
    ['ACTIVIDAD FÍSICA', 'actividad_c', 0, c => Icon.heart(c, -75, -75, 1.5)]];
  items.forEach(([s, k, d, f], i) => {
    const cx = 330 + i * 420, L = Live(g, { t0: at(k) + d, cx, cy: 540, enter: 'pop', idle: 'bob', phase: i * 0.25 });
    Card(L.g, { x: cx - 180, y: 330, w: 360, h: 420, fill: C.white });
    const c = el('g', { transform: `translate(${cx} 500)` }, L.g);
    f(c);
    Text(L.g, s, { x: cx, y: 700, size: s.length > 14 ? 26 : 34 });
  });
  [0, 1, 2].forEach(i => {
    const P = Live(g, { t0: at(['alimentacion', 'descanso_c', 'actividad_c'][i]) - 0.2, cx: 540 + i * 420, cy: 540, enter: 'pop', idle: 'breathe' });
    Text(P.g, '+', { x: 540 + i * 420, y: 540, size: 90, color: C.green });
  });
});

// 6. tonight on the sofa, remember: your legs can stay active while you rest
scene(svg, at('esta_noche'), at('preguntarte'), g => {
  pan(g, 'f_sofa', 'full', { from: [0.35, 0.4], to: [0.45, 0.6] });
  cap(g, 'ESTA NOCHE, EN EL SOFÁ…', at('esta_noche') + 0.3, { t1: at('activas') });
  cap(g, 'PIERNAS ACTIVAS, AUN DESCANSANDO', at('activas'), { size: 50, hi: 'PIERNAS ACTIVAS', hiColor: '#7DE08E' });
}, { punch: [at('activas')] });

// 7. how old are you, where are you watching from? write it in the comments
scene(svg, at('preguntarte'), at('megusta') - 2.6, g => {
  [[520, 300, 1.6], [960, 250, 2], [1400, 300, 1.6]].forEach(([x, y, s], i) => {
    const B = Live(g, { t0: at('preguntarte') + i * 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    Icon.bubble(B.g, x - 50 * s, y - 50 * s, s);
  });
  chip(g, '¿CUÁNTOS AÑOS TIENES?', at('anos'), { cx: 960, cy: 480, size: 54, fill: C.amber });
  chip(g, '¿DESDE QUÉ CIUDAD?', at('ciudad'), { cx: 960, cy: 640, size: 54, fill: C.white, phase: 0.4 });
  CTAlive(g, 'comment', 'ESCRÍBELO EN LOS COMENTARIOS', at('escribelo'));
});

// 8. like, share with someone who sits a lot, subscribe
scene(svg, at('megusta') - 2.6, at('advertencia'), g => {
  tile(g, 'e_silla', at('megusta') - 2.4, { x: 460, y: 80, w: 1000, h: 560 });
  const lk = Live(g, { t0: at('megusta'), cx: 600, cy: 740, enter: 'pop', idle: 'breathe' });
  Card(lk.g, { x: 400, y: 680, w: 400, h: 120, fill: C.white, r: 60 });
  Icon.heart(lk.g, 420, 690, 1);
  Text(lk.g, 'ME GUSTA', { x: 650, y: 742, size: 44 });
  chip(g, 'COMPÁRTELO', at('compartelo'), { cx: 1300, cy: 740, size: 50, fill: C.amber });
  CTAlive(g, 'sub', 'SUSCRÍBETE', at('suscribete_c') - 0.3, { y: 880 });
}, { punch: [at('suscribete_c')] });

// 9. disclaimer: educational content, not medical advice; check before starting a new routine
scene(svg, at('advertencia'), at('recuerda_final'), g => {
  warn(g, 'UNA ÚLTIMA ADVERTENCIA', ['CONTENIDO EDUCATIVO · NO SUSTITUYE EL CONSEJO MÉDICO'], at('advertencia'), { y: 60, w: 1600, size: 40 });
  tile(g, 'f_medico', at('padeces') - 0.5, { x: 100, y: 380, w: 860, h: 560 });
  chip(g, 'ENFERMEDAD CARDÍACA', at('padeces'), { cx: 1430, cy: 450, size: 38 });
  chip(g, 'PROBLEMAS CIRCULATORIOS', at('padeces') + 1.6, { cx: 1430, cy: 580, size: 34 });
  chip(g, 'MOVILIDAD LIMITADA', at('padeces') + 3.2, { cx: 1430, cy: 710, size: 38 });
  chip(g, '→ CONSULTA ANTES DE EMPEZAR', at('padeces') + 5, { cx: 1430, cy: 870, size: 34, fill: C.amber });
});

// 10. every small movement counts
scene(svg, at('recuerda_final'), END + 1, g => {
  heelRaise(g, at('recuerda_final'), { cx: 960, floor: 860, h: 780, period: 4, start: 0.6 });
  cap(g, 'CADA PEQUEÑO MOVIMIENTO CUENTA', at('recuerda_final') + 0.2, { cy: 950, size: 62, hi: 'CUENTA' });
}, { fade: 0.4 });
