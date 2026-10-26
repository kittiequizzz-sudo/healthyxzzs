// PUNTO 2 — medicamentos que sabotean la tensión: NSAIDs, kidneys as filters, decongestants, corticoids,
// liquorice, "natural ≠ harmless", review with doctor/pharmacist.

// 0. kicker
scene(svg, at('p2') - 0.3, at('y_si'), g => {
  pan(g, 'f_ibuprofeno', 'full', { from: [0.5, 0.4], to: [0.6, 0.5] });
  kicker(g, 'PUNTO 2', 'MEDICAMENTOS QUE\nSABOTEAN TU TENSIÓN', at('p2'));
});

// 1. what if another product you take blocks your treatment?
scene(svg, at('y_si'), at('aines'), g => {
  obj(g, 'pastillero', at('y_si') + 0.5, { cx: 520, cy: 420, fit: 460 });
  obj(g, 'blister', at('otro_producto'), { cx: 1400, cy: 420, fit: 420, phase: 0.4 });
  const L = Live(g, { t0: at('otro_producto') + 0.6, cx: 960, cy: 420, enter: 'pop', idle: 'shake' });
  Text(L.g, '⚡', { x: 960, y: 420, size: 140, color: C.red });
  chip(g, 'TU TRATAMIENTO', at('y_si') + 0.8, { cx: 520, cy: 700, size: 38, fill: C.green, color: C.white });
  chip(g, 'OTRO PRODUCTO', at('otro_producto') + 0.3, { cx: 1400, cy: 700, size: 38, fill: C.red, color: C.white });
  chip(g, 'PUEDEN INTERFERIR ENTRE SÍ', at('interferir'), { cy: 900, size: 44, fill: C.amber });
});

// 2. NSAIDs: ibuprofen, naproxen — for muscle and joint pain
scene(svg, at('aines'), at('continuada'), g => {
  pan(g, 'f_ibuprofeno', 'left', { from: [0.6, 0.5], to: [0.5, 0.4] });
  chip(g, 'ANTIINFLAMATORIOS (AINE)', at('aines'), { cx: 1510, cy: 240, size: 32, fill: C.ink, color: C.white });
  chip(g, 'IBUPROFENO', at('ibuprofeno'), { cx: 1510, cy: 390, size: 48, fill: C.white });
  chip(g, 'NAPROXENO', at('naproxeno'), { cx: 1510, cy: 530, size: 48, fill: C.white });
  chip(g, 'DOLOR MUSCULAR Y ARTICULAR', at('dolores'), { cx: 1510, cy: 700, size: 30, fill: C.amber });
});

// 3. taken continuously: sodium + water retention, kidney function, harder BP control
scene(svg, at('continuada'), at('filtros'), g => {
  pan(g, 'r_retencion', 'left', { from: [0.3, 0.5], to: [0.6, 0.5] });
  chip(g, 'DE FORMA CONTINUADA:', at('continuada'), { cx: 1510, cy: 220, size: 36, fill: C.ink, color: C.amber });
  chip(g, 'RETIENEN SODIO Y AGUA', at('retencion'), { cx: 1510, cy: 380, size: 34, fill: C.blue, color: C.white });
  chip(g, 'AFECTAN AL RIÑÓN', at('renal2'), { cx: 1510, cy: 520, size: 38, fill: C.amber });
  chip(g, '↑ CUESTA CONTROLAR LA TENSIÓN', at('renal2') + 2, { cx: 1510, cy: 680, size: 26, fill: C.red, color: C.white });
});

// 4. kidneys as two filters for water and salt
scene(svg, at('filtros'), at('interferir2') - 1.5, g => {
  pan(g, 'r_filtros', 'full', { from: [0.5, 0.4], to: [0.5, 0.6] });
  cap(g, 'TUS RIÑONES: DOS FILTROS DE AGUA Y SAL', at('filtros') + 0.8, { size: 46, hi: 'DOS FILTROS' });
});

// 5. NSAIDs can block that balance → antihypertensive less effective
scene(svg, at('interferir2') - 1.5, at('ocasional'), g => {
  pan(g, 'r_bloqueo', 'full', { from: [0.3, 0.5], to: [0.6, 0.45] });
  cap(g, 'EL TRATAMIENTO PIERDE EFICACIA', at('menos_eficaz') - 1.2, { hi: 'PIERDE EFICACIA', hiColor: '#FF7A6E' });
}, { punch: [at('menos_eficaz')] });

// 6. an occasional dose isn't necessarily dangerous — depends on dose, duration, kidneys, other drugs
scene(svg, at('ocasional'), at('no_unicos'), g => {
  mark(g, 'UNA DOSIS OCASIONAL ≠ PELIGRO', true, at('ocasional') + 0.6, { cx: 960, cy: 140, size: 40 });
  chip(g, 'EL RIESGO DEPENDE DE:', at('depende2'), { cx: 960, cy: 320, size: 42, fill: C.ink, color: C.white });
  [['LA DOSIS', 0, 520, 500], ['LA DURACIÓN', 1.3, 1400, 500], ['TUS RIÑONES', 2.6, 520, 680], ['OTROS FÁRMACOS', 4, 1400, 680]]
    .forEach(([s, d, cx, cy]) => chip(g, s, at('dosis') + d, { cx, cy, size: 42, fill: C.amber }));
});

// 7. decongestants (pseudoephedrine), corticoids, liquorice
scene(svg, at('no_unicos'), at('error2'), g => {
  chip(g, 'NO SON LOS ÚNICOS', at('no_unicos'), { cy: 80, size: 44, fill: C.red, color: C.white });
  tile(g, 'f_spray', at('pseudo') - 0.5, { x: 70, y: 170, w: 570, h: 380, label: 'DESCONGESTIONANTES' });
  const C2 = Live(g, { t0: at('corticoides') - 0.4, cx: 960, cy: 360, enter: 'pop', idle: 'bob' });
  Card(C2.g, { x: 700, y: 170, w: 520, h: 380, fill: C.white });
  Cutout(C2.g, src('blister'), { cx: 960, cy: 330, iw: SZ.blister[0], ih: SZ.blister[1], fit: 360 });
  Chip(C2.g, 'CORTICOIDES', { cx: 960, cy: 560, size: 36, fill: C.ink, color: C.white });
  tile(g, 'f_regaliz', at('regaliz') - 0.5, { x: 1280, y: 170, w: 570, h: 380, label: 'REGALIZ (MUCHO)' });
  chip(g, 'PSEUDOEFEDRINA: ESTRECHA LOS VASOS', at('pseudo') + 1.5, { cx: 960, cy: 720, size: 30, fill: C.white });
  chip(g, 'RETIENEN LÍQUIDOS', at('corticoides') + 1.5, { cx: 960, cy: 830, size: 32, fill: C.blue, color: C.white });
  chip(g, '↑ TENSIÓN · ↓ POTASIO', at('potasio2') - 1, { cx: 960, cy: 940, size: 32, fill: C.red, color: C.white });
});

// 8. "without prescription / natural = safe" is a common mistake
scene(svg, at('error2'), at('que_hacer'), g => {
  pan(g, 'r_natural', 'left', { from: [0.4, 0.5], to: [0.6, 0.45] });
  chip(g, 'UN ERROR FRECUENTE', at('error2'), { cx: 1510, cy: 230, size: 38, fill: C.ink, color: C.amber });
  mark(g, '«SIN RECETA = SEGURO»', false, at('sin_receta'), { cx: 1510, cy: 400, size: 32 });
  stamp(g, 'NATURAL ≠ INOCUO', at('natural2'), { cx: 1510, cy: 620, size: 60, color: C.red });
}, { punch: [at('natural2')] });

// 9. what to do: list medicines, supplements, infusions → doctor or pharmacist
scene(svg, at('que_hacer'), at('semanas2'), g => {
  pan(g, 'f_farmacia', 'left', { from: [0.3, 0.45], to: [0.45, 0.45] });
  chip(g, '¿QUÉ PUEDES HACER?', at('que_hacer'), { cx: 1510, cy: 180, size: 40, fill: C.green, color: C.white });
  mark(g, 'REVISA LO QUE TOMAS', true, at('revisa'), { cx: 1510, cy: 330, size: 32 });
  mark(g, 'ANÓTALO', true, at('anota2'), { cx: 1510, cy: 450, size: 36 });
  mark(g, 'MÉDICO O FARMACÉUTICO', true, at('farmaceutico') - 0.5, { cx: 1510, cy: 570, size: 30 });
  chip(g, 'NO SUSPENDAS NADA POR TU CUENTA', at('no_suspendas2'), { cx: 1510, cy: 720, size: 24, fill: C.red, color: C.white });
  chip(g, 'NI AÑADAS SIN CONSULTAR', at('interacciones') - 1, { cx: 1510, cy: 820, size: 28, fill: C.amber });
});

// 10. weeks of high readings → this review may give a key clue
scene(svg, at('semanas2'), at('suscribete') - 2, g => {
  LogTable(g, at('semanas2'), { x: 160, y: 170, dur: 2 });
  obj(g, 'blister', at('semanas2') + 1.5, { cx: 1400, cy: 420, fit: 380 });
  wrapQ(g, at('semanas2') + 2.5, 1650, 260, 1.2);
  chip(g, 'UNA PISTA IMPORTANTE', at('semanas2') + 3, { cx: 1400, cy: 720, size: 42, fill: C.amber });
});

// 11. subscribe
scene(svg, at('suscribete') - 2, at('botiquin'), g => {
  tile(g, 'z_contenta', at('suscribete') - 1.8, { x: 410, y: 80, w: 1100, h: 620 });
  CTAlive(g, 'sub', 'SUSCRÍBETE', at('suscribete'));
  chip(g, 'SENCILLO · SIN ALARMISMOS', at('sencilla'), { cx: 960, cy: 60, size: 36, fill: C.amber });
}, { punch: [at('suscribete')] });

// 12. next obstacle: something you eat every day
scene(svg, at('botiquin'), at('p3') - 0.3, g => {
  obj(g, 'salero', at('botiquin') + 0.3, { cx: 560, cy: 470, fit: 420 });
  obj(g, 'jamon', at('comes') - 0.5, { cx: 1100, cy: 470, fit: 420, phase: 0.3 });
  obj(g, 'pan', at('comes'), { cx: 1550, cy: 520, fit: 320, phase: 0.6 });
  cap(g, 'ALGO QUE COMES CADA DÍA', at('comes'), { hi: 'CADA DÍA' });
});
