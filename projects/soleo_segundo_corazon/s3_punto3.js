// PUNTO 3 — tu cerebro y tu memoria: brain energy, risk factors, myokines, possibility vs proof, Antonio.
function heartBeat(L, cx, cy, k = 0.06) {
  anim(t => { const b = 1 + k * Math.pow(Math.sin(Math.PI * ((t % 0.85) / 0.85)), 8); L.g.setAttribute('transform', `translate(${cx} ${cy}) scale(${b.toFixed(4)}) translate(${-cx} ${-cy})`); });
  return L;
}

// 0. kicker over the man reading
scene(svg, at('p3') - 0.3, at('ahora3'), g => {
  pan(g, 'c_lectura', 'full', { from: [0.4, 0.4], to: [0.55, 0.5] });
  kicker(g, 'PUNTO 3', 'TU CEREBRO\nY TU MEMORIA', at('p3'));
});

// 1. legs → metabolism → brain
scene(svg, at('ahora3'), at('porque3'), g => {
  chip(g, '¿QUÉ RELACIÓN HAY?', at('ahora3') + 0.5, { cy: 130, size: 48, fill: C.ink, color: C.amber });
  obj(g, 'pierna', at('ahora3') + 0.8, { cx: 380, cy: 520, fit: 440 });
  obj(g, 'azucar', at('relacion3') + 1.6, { cx: 960, cy: 520, fit: 300, phase: 0.3 });
  obj(g, 'cerebro', at('relacion3') + 3.2, { cx: 1540, cy: 520, fit: 360, phase: 0.6 });
  flow(g, 'M530 540 L820 540', at('relacion3') + 1.6, { n: 4, period: 1.4, shape: 'cube', r: 11 });
  flow(g, 'M1100 540 L1370 540', at('relacion3') + 3.2, { n: 4, period: 1.4, shape: 'cube', r: 11 });
  chip(g, 'PIERNAS', at('ahora3') + 1.1, { cx: 380, cy: 830, size: 40 });
  chip(g, 'METABOLISMO', at('relacion3') + 1.9, { cx: 960, cy: 830, size: 40, fill: C.amber });
  chip(g, 'CEREBRO', at('relacion3') + 3.5, { cx: 1540, cy: 830, size: 40 });
});

// 2. caring for your heart also protects a mind that works with the years
scene(svg, at('porque3'), at('peso'), g => {
  pan(g, 'c_charla', 'full', { from: [0.3, 0.45], to: [0.55, 0.4] });
  chip(g, 'NO SOLO CIRCULACIÓN', at('porque3') + 0.3, { cx: 960, cy: 130, size: 44, fill: C.ink, color: C.white, t1: at('mente') });
  cap(g, 'UNA MENTE ACTIVA CON LOS AÑOS', at('mente') - 1, { hi: 'MENTE ACTIVA' });
});

// 3. the brain: ~2 % of body weight, ~20 % of the energy at rest
scene(svg, at('peso'), at('suministro'), g => {
  const L = obj(g, 'cerebro', at('peso'), { cx: 520, cy: 520, fit: 560 });
  const glow = el('circle', { cx: 520, cy: 500, r: 300, fill: C.amber, opacity: 0 }, L.g);
  L.g.insertBefore(glow, L.g.firstChild);
  anim(t => set(glow, { opacity: 0.25 * clamp(prog(t, at('veinte'), at('veinte') + 0.5)) * (0.7 + 0.3 * Math.sin(t * 4)) }));
  const rows = [['PESO DEL CUERPO', 2, 'peso', 380, C.grey], ['ENERGÍA EN REPOSO', 20, 'veinte', 700, C.orange]];
  rows.forEach(([lab, v, k, y, col]) => {
    const R = Live(g, { t0: at(k), cx: 1350, cy: y, enter: 'r', idle: 'none' });
    Text(R.g, lab, { x: 960, y: y - 90, size: 40, anchor: 'start' });
    const b = Bar(R.g, { x: 960, y: y - 40, w: 620, h: 80, color: col });
    const n = CountUp(R.g, { x: 1700, y: y + 2, size: 76, color: col === C.grey ? C.ink : C.orange, suffix: ' %' });
    anim(t => { const u = E.out(prog(t, at(k) + 0.3, at(k) + 1.5)); b.draw(u * v / 25); n.draw(u * v); });
  });
}, { punch: [at('veinte')] });

// 4. constant oxygen + glucose: remembering a chat, focusing on reading, finding words
scene(svg, at('suministro'), at('sin_embargo3'), g => {
  chip(g, 'OXÍGENO + GLUCOSA, SIN PARAR', at('suministro'), { cy: 130, size: 46, fill: C.ink, color: C.amber });
  tile(g, 'c_charla', at('recordar'), { x: 80, y: 290, w: 560, h: 380, label: 'RECORDAR' });
  tile(g, 'c_lectura', at('lees'), { x: 680, y: 290, w: 560, h: 380, label: 'CONCENTRARTE' });
  tile(g, 'c_palabra', at('palabras'), { x: 1280, y: 290, w: 560, h: 380, label: 'ENCONTRAR PALABRAS' });
});

// 5. with age, healthy vessels and glucose control matter more for the brain
scene(svg, at('sin_embargo3'), at('diabetes'), g => {
  const L = obj(g, 'cerebro', at('sin_embargo3') + 0.3, { cx: 960, cy: 540, fit: 480 });
  const ring = el('circle', { cx: 960, cy: 530, r: 300, fill: 'none', stroke: C.orange, 'stroke-width': 8, opacity: 0 }, g);
  anim(t => { const p = ((t - at('envejecimiento')) % 2) / 2; set(ring, { r: 270 + 90 * p, opacity: t < at('envejecimiento') ? 0 : 0.7 * (1 - p) }); });
  chip(g, 'CON EL ENVEJECIMIENTO', at('envejecimiento'), { cy: 130, size: 46, fill: C.ink, color: C.amber });
  chip(g, 'VASOS SANGUÍNEOS', at('vasos'), { cx: 400, cy: 880, size: 40, fill: C.red, color: C.white });
  chip(g, 'CONTROL DE LA GLUCOSA', at('control_glucosa'), { cx: 1480, cy: 880, size: 40, fill: C.amber });
  flow(g, 'M400 820 C420 650 600 560 720 560', at('vasos'), { n: 5, period: 2 });
  flow(g, 'M1480 820 C1460 650 1320 560 1200 560', at('control_glucosa'), { n: 4, period: 2, shape: 'cube', r: 11 });
});

// 6. poorly controlled diabetes, hypertension, sustained inactivity → higher risk of cognitive decline
scene(svg, at('diabetes'), at('puntual'), g => {
  pan(g, 'c_glucosa', 'left', { from: [0.4, 0.4], to: [0.45, 0.6] });
  chip(g, 'DIABETES MAL CONTROLADA', at('diabetes'), { cx: 1510, cy: 230, size: 34, fill: C.amber });
  chip(g, 'HIPERTENSIÓN', at('hipertension'), { cx: 1510, cy: 370, size: 40, fill: C.amber, phase: 0.3 });
  chip(g, 'SEDENTARISMO', at('sedentarismo3'), { cx: 1510, cy: 510, size: 40, fill: C.amber, phase: 0.6 });
  arrow(g, 1510, 580, 1510, 650, at('riesgo') - 0.4, { color: C.red });
  chip(g, '↑ RIESGO DE DETERIORO', at('riesgo'), { cx: 1510, cy: 730, size: 36, fill: C.red, color: C.white });
  chip(g, 'COGNITIVO', at('riesgo') + 0.3, { cx: 1510, cy: 840, size: 36, fill: C.red, color: C.white });
  source(g, 'Factores de riesgo modificables de demencia · Comisión The Lancet 2024', at('riesgo'));
});

// 7. one sugar spike after dinner won't damage your memory — habits over years do count
scene(svg, at('puntual'), at('musculo3'), g => {
  const A = Live(g, { t0: at('puntual'), cx: 520, cy: 520, enter: 'l', idle: 'breathe', amp: 0.5 });
  Card(A.g, { x: 190, y: 230, w: 660, h: 520, fill: C.white });
  Text(A.g, 'UNA SUBIDA PUNTUAL', { x: 520, y: 310, size: 40 });
  Text(A.g, 'tras una cena', { x: 520, y: 370, size: 32, weight: 800, color: C.grey });
  Cutout(A.g, src('azucar'), { cx: 520, cy: 530, iw: SZ.azucar[0], ih: SZ.azucar[1], fit: 200 });
  Text(A.g, 'NO DAÑA TU MEMORIA', { x: 520, y: 700, size: 38, color: C.green });
  const B = Live(g, { t0: at('acumulados') - 0.3, cx: 1400, cy: 520, enter: 'r', idle: 'breathe', amp: 0.5 });
  Card(B.g, { x: 1070, y: 230, w: 660, h: 520, fill: C.white });
  Text(B.g, 'AÑOS DE HÁBITOS', { x: 1400, y: 310, size: 40 });
  const dots = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 10; c++) dots.push(el('circle', { cx: 1160 + c * 53, cy: 410 + r * 52, r: 18, fill: C.ink, opacity: 0.15 }, B.g));
  Text(B.g, 'SÍ CUENTAN', { x: 1400, y: 700, size: 40, color: C.orange });
  anim(t => { const n = Math.floor(dots.length * prog(t, at('acumulados'), at('acumulados') + 4)); dots.forEach((d, i) => set(d, { fill: i < n ? C.orange : C.ink, opacity: i < n ? 1 : 0.15 })); });
});

// 8. our little muscle again: contracting muscles use energy and help regulate metabolism
scene(svg, at('musculo3'), at('ademas'), g => {
  heelRaise(g, at('musculo3'), { cx: 600, floor: 1020, h: 900, period: 4.5 });
  flow(g, 'M1500 300 C1200 360 900 600 780 760', at('contracciones3'), { n: 6, period: 2.4, shape: 'cube', r: 12 });
  chip(g, 'INTERÉS CIENTÍFICO', at('musculo3') + 0.8, { cx: 1400, cy: 200, size: 44, fill: C.ink, color: C.amber });
  chip(g, 'EL MÚSCULO USA ENERGÍA', at('energia3'), { cx: 1400, cy: 820, size: 40, fill: C.green, color: C.white });
});

// 9. myokines: messages from muscle to other organs, the brain included
scene(svg, at('ademas'), at('distinguir'), g => {
  obj(g, 'pierna', at('ademas'), { cx: 420, cy: 560, fit: 560 });
  obj(g, 'cerebro', at('mioquinas') - 0.5, { cx: 1480, cy: 330, fit: 330, phase: 0.3 });
  heartBeat(obj(g, 'corazon', at('organos') - 0.4, { cx: 1480, cy: 780, fit: 260, idle: 'none' }), 1480, 780);
  flow(g, 'M560 470 C820 300 1080 260 1300 320', at('mioquinas'), { n: 6, color: C.green, r: 14, shape: 'dot', period: 2.4 });
  flow(g, 'M560 640 C820 760 1080 800 1320 780', at('organos'), { n: 6, color: C.green, r: 14, shape: 'dot', period: 2.4 });
  chip(g, 'MIOQUINAS', at('mioquinas'), { cx: 960, cy: 140, size: 56, fill: C.green, color: C.white });
  chip(g, 'MENSAJES ENTRE ÓRGANOS', at('organos'), { cx: 960, cy: 960, size: 40 });
}, { punch: [at('mioquinas')] });

// 10. a scientific possibility is not a proven benefit
scene(svg, at('distinguir'), at('aunque3'), g => {
  const A = Live(g, { t0: at('distinguir') + 0.3, cx: 520, cy: 520, enter: 'l', idle: 'bob' });
  Card(A.g, { x: 220, y: 330, w: 600, h: 380, fill: C.amber });
  Icon.question(A.g, 460, 380, 1.2);
  Text(A.g, 'POSIBILIDAD', { x: 520, y: 620, size: 54 });
  const B = Live(g, { t0: at('demostrado') - 0.3, cx: 1400, cy: 520, enter: 'r', idle: 'bob', phase: 0.5 });
  Card(B.g, { x: 1100, y: 330, w: 600, h: 380, fill: C.white });
  Icon.check(B.g, 1340, 380, 1.2);
  Text(B.g, 'BENEFICIO', { x: 1400, y: 600, size: 50 });
  Text(B.g, 'DEMOSTRADO', { x: 1400, y: 660, size: 50 });
  const ne = Live(g, { t0: at('demostrado') + 0.4, cx: 960, cy: 520, enter: 'pop', idle: 'breathe' });
  Text(ne.g, '≠', { x: 960, y: 520, size: 170, color: C.red });
}, { punch: [at('demostrado') + 0.4] });

// 11. regular exercise is linked to better brain health — but no proof heel raises prevent memory loss
scene(svg, at('aunque3'), at('antonio'), g => {
  obj(g, 'cerebro', at('aunque3'), { cx: 300, cy: 300, fit: 260 });
  mark(g, 'EJERCICIO REGULAR → MEJOR SALUD CEREBRAL', true, at('aunque3') + 1.5, { cx: 1100, cy: 300, size: 34 });
  stamp(g, 'PRUEBAS INSUFICIENTES', at('pruebas'), { cx: 960, cy: 560, size: 66, color: C.orange });
  chip(g, '¿UNOS MINUTOS DE TALONES → MEMORIA?', at('elevar3'), { cx: 960, cy: 820, size: 38 });
});

// 12–15. Antonio, 64 (dramatisation)
scene(svg, at('antonio'), at('cansado'), g => {
  pan(g, 'a_tv', 'full', { from: [0.3, 0.4], to: [0.45, 0.4] });
  tag(g, 'DRAMATIZACIÓN', at('antonio'), { x: 240, y: 90 });
  cap(g, 'ANTONIO, 64 AÑOS', at('antonio') + 0.5, { hi: '64 AÑOS' });
  chip(g, 'TODA LA NOCHE SENTADO', at('antonio') + 3.5, { cx: 1400, cy: 170, size: 36, fill: C.amber });
});
scene(svg, at('cansado'), at('lugar'), g => {
  pan(g, 'a_cansado', 'full', { from: [0.45, 0.3], to: [0.4, 0.5] });
  tag(g, 'DRAMATIZACIÓN', at('cansado') - 1, { x: 240, y: 90 });
  cap(g, 'CANSADO, LE CUESTA CONCENTRARSE', at('cansado') + 0.4, { size: 50, hi: 'CONCENTRARSE' });
});
scene(svg, at('lugar'), at('historia'), g => {
  pan(g, 'a_silla', 'left', { from: [0.35, 0.25], to: [0.38, 0.5], zoom: 0.1 });
  tag(g, 'DRAMATIZACIÓN', at('lugar') - 1, { x: 100, y: 80 });
  mark(g, 'SOLUCIÓN MILAGROSA', false, at('lugar') + 0.3, { cx: 1510, cy: 250, size: 36 });
  mark(g, 'DESCANSOS ACTIVOS', true, at('descansos'), { cx: 1510, cy: 420, size: 36 });
  mark(g, 'CAMINAR', true, at('caminar3'), { cx: 1510, cy: 590, size: 36 });
  mark(g, 'HORARIOS DE SUEÑO', true, at('sueno3'), { cx: 1510, cy: 760, size: 36 });
});
scene(svg, at('historia'), at('ensenanza'), g => {
  pan(g, 'a_dormir', 'full', { from: [0.5, 0.4], to: [0.6, 0.35] });
  tag(g, 'DRAMATIZACIÓN', at('historia') - 1, { x: 240, y: 90 });
  chip(g, 'UN EJEMPLO ILUSTRATIVO', at('historia') + 0.4, { cx: 1300, cy: 200, size: 40, fill: C.white });
  stamp(g, 'NO ES UNA GARANTÍA', at('garantia'), { cx: 1150, cy: 760, size: 64, color: C.orange });
});

// 16. brain and heart benefit from habits kept over time; moving your legs = a first, simple step
scene(svg, at('ensenanza'), at('conoces'), g => {
  chip(g, 'LA VERDADERA ENSEÑANZA', at('ensenanza'), { cy: 120, size: 46, fill: C.ink, color: C.amber });
  obj(g, 'cerebro', at('benefician') - 1.4, { cx: 650, cy: 420, fit: 380 });
  heartBeat(obj(g, 'corazon', at('benefician') - 1, { cx: 1270, cy: 420, fit: 330, idle: 'none' }), 1270, 420);
  chip(g, 'HÁBITOS QUE SE MANTIENEN', at('benefician') + 1, { cx: 960, cy: 720, size: 46, fill: C.green, color: C.white });
  chip(g, 'PRIMER PASO: MOVER LAS PIERNAS', at('primer_paso'), { cx: 960, cy: 900, size: 44, fill: C.amber });
}, { punch: [at('primer_paso')] });

// 17. share it with someone who sits a lot
scene(svg, at('conoces'), at('practico'), g => {
  tile(g, 'n_movil', at('conoces'), { x: 360, y: 90, w: 1200, h: 680 });
  CTAlive(g, 'comment', 'COMPARTE ESTE VÍDEO', at('comparte'));
});

// 18. now the practical part
scene(svg, at('practico'), at('p4') - 0.3, g => {
  const L = obj(g, 'silla', at('practico'), { cx: 960, cy: 480, fit: 560, idle: 'none' });
  anim(t => { const k = Math.abs(Math.sin((t - at('practico')) * 3.2)); L.g.setAttribute('transform', `translate(0 ${(-22 * k).toFixed(1)})`); });
  cap(g, 'AHORA, LO PRÁCTICO', at('practico') + 0.2, { cy: 880, size: 64, hi: 'PRÁCTICO' });
});
