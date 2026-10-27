// PUNTO 3 — weight shifting: balance isn't only strength; proprioception (joint/muscle position sense)
// declines after 60; the brain integrates it with vision and the inner ear; forward/back weight shifts
// behind a chair, ~1 min, small and controlled ("can help" postural control); dizziness ≠ balance → doctor.

// 0. kicker
scene(svg, at('p3') - 1.3, at('fuertes3'), g => {
  pan(g, 'q_pendulo', 'full', { from: [0.5, 0.45], to: [0.5, 0.55] });
  kicker(g, 'EJERCICIO 3', 'DESPLAZAMIENTO DE PESO\nEQUILIBRIO ANTES DE CAER', at('p3') - 1);
});

// 1. strong legs, yet unsure: uneven pavement, turning too fast, a step backwards
scene(svg, at('fuertes3'), at('porque3'), g => {
  chip(g, 'PIERNAS FUERTES… Y AUN ASÍ, INSEGURIDAD', at('fuertes3') + 0.3, { cy: 90, size: 40, fill: C.ink, color: C.amber });
  tile(g, 'i_adoquin', at('acera3') - 0.2, { x: 70, y: 200, w: 570, h: 380, label: 'ACERA IRREGULAR' });
  tile(g, 'i_gira', at('giras3') - 0.2, { x: 675, y: 200, w: 570, h: 380, label: 'GIRAR RÁPIDO' });
  tile(g, 'i_atras', at('atras3') - 0.2, { x: 1280, y: 200, w: 570, h: 380, label: 'UN PASO ATRÁS' });
});

// 2. why? balance isn't only muscle: knowing where your body is and correcting small movements
scene(svg, at('porque3'), at('nombre3'), g => {
  wrapQ(g, at('porque3'), 960, 150, 1.3);
  mark(g, 'NO SOLO FUERZA MUSCULAR', false, at('depende3'), { cx: 960, cy: 340, size: 40 });
  obj(g, 'cerebro', at('reconocer3') - 0.4, { cx: 960, cy: 620, fit: 380 });
  chip(g, 'SABER DÓNDE ESTÁ TU CUERPO', at('reconocer3'), { cx: 960, cy: 880, size: 40, fill: TEAL, color: C.white });
});

// 3. it's called proprioception: the brain knows joint positions without looking
scene(svg, at('nombre3'), at('gracias3'), g => {
  pan(g, 'q_senales', 'left', { from: [0.4, 0.5], to: [0.55, 0.45] });
  chip(g, 'UN NOMBRE CIENTÍFICO', at('nombre3') + 0.3, { cx: 1510, cy: 250, size: 34, fill: C.white });
  stamp(g, 'PROPIOCEPCIÓN', at('propio3'), { cx: 1510, cy: 430, size: 56, color: TEAL, rot: -4 });
  chip(g, 'POSICIÓN DE TUS ARTICULACIONES', at('sistema3') + 1, { cx: 1510, cy: 620, size: 28, fill: C.white });
  chip(g, 'SIN MIRARLAS', at('sin_mirar3'), { cx: 1510, cy: 740, size: 40, fill: C.amber });
});

// 4. thanks to it: walk without watching each step, stay upright when someone passes, react to the ground
scene(svg, at('gracias3'), at('sesenta3'), g => {
  chip(g, 'GRACIAS A ELLA PUEDES…', at('gracias3'), { cy: 90, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'd_calle', at('gracias3') + 1, { x: 70, y: 200, w: 570, h: 380, label: 'CAMINAR SIN MIRAR' });
  tile(g, 'i_bici', at('pasa3') - 0.2, { x: 675, y: 200, w: 570, h: 380, label: 'SEGUIR ERGUIDO' });
  tile(g, 'i_adoquin', at('suelo3') - 0.2, { x: 1280, y: 200, w: 570, h: 380, label: 'REACCIONAR AL SUELO' });
});

// 5. after 60 these sensors lose sensitivity: less precise information
scene(svg, at('sesenta3'), at('integrar3'), g => {
  pan(g, 'q_planta', 'left', { from: [0.4, 0.5], to: [0.55, 0.5] });
  chip(g, 'DESPUÉS DE LOS 60', at('sesenta3'), { cx: 1510, cy: 250, size: 40, fill: C.ink, color: C.amber });
  chip(g, '↓ SENSIBILIDAD', at('sesenta3') + 1.5, { cx: 1510, cy: 400, size: 48, fill: C.red, color: C.white });
  chip(g, 'MÚSCULOS · TENDONES · ARTICULACIONES', at('receptores3'), { cx: 1510, cy: 560, size: 22, fill: C.white });
  chip(g, 'INFORMACIÓN MENOS PRECISA', at('receptores3') + 2.5, { cx: 1510, cy: 690, size: 28, fill: C.amber });
});

// 6. the brain combines it with vision and the inner ear → more concentration needed
scene(svg, at('integrar3'), at('buena3'), g => {
  obj(g, 'cerebro', at('integrar3'), { cx: 960, cy: 470, fit: 400 });
  const src3 = [['planta', 'ARTICULACIONES', 300, 'integrar3'], ['ojo', 'VISTA', 960, 'vista3'], ['oido', 'OÍDO INTERNO', 1620, 'vestibular3']];
  src3.forEach(([n, s, x, k]) => {
    const y = x === 960 ? 860 : 760;
    obj(g, n, at(k) + (k === 'integrar3' ? 0.8 : 0), { cx: x, cy: y - 60, fit: n === 'planta' ? 220 : 260 });
    chip(g, s, at(k) + (k === 'integrar3' ? 1 : 0.2), { cx: x, cy: y + 110, size: 32, fill: C.white });
  });
  flow(g, 'M380 640 C520 560 640 520 800 500', at('integrar3') + 1, { n: 5, period: 2, color: C.amber, shape: 'dot', r: 10, line: C.amber });
  flow(g, 'M960 760 L960 620', at('vista3') + 0.3, { n: 3, period: 1.5, color: C.amber, shape: 'dot', r: 10, line: C.amber });
  flow(g, 'M1540 640 C1400 560 1280 520 1120 500', at('vestibular3') + 0.3, { n: 5, period: 2, color: C.amber, shape: 'dot', r: 10, line: C.amber });
  chip(g, 'MÁS CONCENTRACIÓN', at('automaticamente3'), { cx: 960, cy: 110, size: 44, fill: C.amber });
});

// 7. good news: it can be trained, simply, no long walks or equipment
scene(svg, at('buena3'), at('colocate3'), g => {
  pan(g, 'q_pendulo', 'left', { from: [0.5, 0.5], to: [0.5, 0.45] });
  chip(g, 'LA BUENA NOTICIA', at('buena3'), { cx: 1510, cy: 250, size: 40, fill: C.green, color: C.white });
  chip(g, 'SE PUEDE ENTRENAR', at('buena3') + 1.2, { cx: 1510, cy: 400, size: 40, fill: C.white });
  mark(g, 'SIN APARATOS', true, at('aparatos3'), { cx: 1510, cy: 560, size: 40 });
});

// 8. set-up: behind a chair against a wall, both hands, hip-width, knees soft, eyes on a fixed point
scene(svg, at('colocate3'), at('desplaza3'), g => {
  Poses(g, 'peso', at('colocate3'), { cx: 560, cy: 560, h: 800 });
  chip(g, 'DE PIE, DETRÁS DE LA SILLA', at('colocate3') + 0.3, { cx: 1350, cy: 190, size: 34, fill: C.ink, color: C.amber });
  mark(g, 'SILLA CONTRA LA PARED', true, at('colocate3') + 1.8, { cx: 1350, cy: 340, size: 32 });
  mark(g, 'AMBAS MANOS EN EL RESPALDO', true, at('respaldo3'), { cx: 1350, cy: 480, size: 28 });
  mark(g, 'RODILLAS UN POCO FLEXIONADAS', true, at('rodillas3'), { cx: 1350, cy: 620, size: 28 });
  mark(g, 'MIRADA A UN PUNTO FIJO', true, at('punto3'), { cx: 1350, cy: 760, size: 32 });
});

// 9. shift forward (heels down), feel the pressure, hold 1–2 s, then back to the heels, toes barely up
scene(svg, at('desplaza3'), at('repite3'), g => {
  Poses(g, 'peso', at('desplaza3'), { cx: 560, cy: 560, h: 800, enter: 'none', fade: 0.6,
    idx: KEYS([[0, 0], [at('desplaza3') + 0.8, 1], [at('talones3') + 0.2, 0], [at('talones3') + 1.2, 2]]) });
  chip(g, 'PESO HACIA DELANTE', at('desplaza3') + 0.5, { cx: 1350, cy: 190, size: 38, fill: C.white });
  chip(g, 'TALONES EN EL SUELO', at('desplaza3') + 2.5, { cx: 1350, cy: 300, size: 32, fill: C.amber });
  const F = Live(g, { t0: at('presion3') - 0.3, cx: 1350, cy: 560, enter: 'pop', idle: 'none' });
  Cutout(F.g, src('planta'), { cx: 1350, cy: 560, iw: SZ.planta[0], ih: SZ.planta[1], fit: 300 });
  const front = el('circle', { cx: 1350, cy: 465, r: 40, fill: '#FFC24A', stroke: C.red, 'stroke-width': 7, opacity: 0 }, F.g);
  const back = el('circle', { cx: 1350, cy: 670, r: 40, fill: '#FFC24A', stroke: C.red, 'stroke-width': 7, opacity: 0 }, F.g);
  anim(t => { const b = t > at('talones3') + 0.8; set(front, { opacity: b ? 0 : 0.75 + 0.2 * Math.sin(t * 5) }); set(back, { opacity: b ? 0.75 + 0.2 * Math.sin(t * 5) : 0 }); });
  chip(g, 'NOTA LA PRESIÓN', at('presion3'), { cx: 1350, cy: 790, size: 34, fill: C.white });
  chip(g, '1–2 SEGUNDOS', at('manten3'), { cx: 1350, cy: 900, size: 34, fill: TEAL, color: C.white, t1: at('talones3') });
  chip(g, 'PESO A LOS TALONES', at('talones3'), { cx: 1350, cy: 900, size: 34, fill: TEAL, color: C.white });
  chip(g, 'PUNTAS APENAS ARRIBA', at('puntas3'), { cx: 1350, cy: 1010, size: 30, fill: C.amber });
});

// 10. about a minute, like a slow pendulum; the smaller and more controlled, the better
scene(svg, at('repite3'), at('interesante3'), g => {
  const idx = CYCLE(at('repite3'), [[0, 1.0], [1, 2.0], [0, 1.0], [2, 2.0]]);
  Poses(g, 'peso', at('repite3'), { cx: 520, cy: 560, h: 800, enter: 'none', fade: 0.6, idx });
  const arc = el('path', { d: 'M310 120 Q520 60 730 120', fill: 'none', stroke: TEAL, 'stroke-width': 8, 'stroke-dasharray': '6 14', 'stroke-linecap': 'round' }, g);
  const dot = el('circle', { r: 16, fill: TEAL, stroke: C.ink, 'stroke-width': 4 }, g);
  anim(t => { const s = Math.sin((t - at('repite3')) * 2 * Math.PI / 6 - Math.PI / 2 * 0); const x = 520 + 170 * Math.sin((t - at('repite3') - 0.5) * 2 * Math.PI / 6); set(dot, { cx: x, cy: 120 - 60 * (1 - ((x - 520) / 210) ** 2) + 0 * s }); set(arc, { opacity: 1 }); });
  const S = Stopwatch(g, { cx: 1300, cy: 300, r: 130, total: 60 });
  const L = Live(g, { t0: at('repite3') + 0.3, cx: 1300, cy: 300, enter: 'pop', idle: 'none' });
  L.g.appendChild(S.g);
  anim(t => S.draw(60 * prog(t, at('repite3') + 0.5, at('interesante3') - 0.5)));
  chip(g, '≈ 1 MINUTO', at('repite3') + 1, { cx: 1300, cy: 500, size: 40, fill: TEAL, color: C.white });
  chip(g, 'COMO UN PÉNDULO LENTO', at('pendulo3'), { cx: 1300, cy: 650, size: 34, fill: C.white });
  mark(g, 'NO TE INCLINES MUCHO', false, at('inclinarte3'), { cx: 1300, cy: 790, size: 32 });
  mark(g, 'PEQUEÑO Y CONTROLADO', true, at('pequeno3'), { cx: 1300, cy: 920, size: 32 });
});

// 11. each shift makes the nervous system read pressure changes and switch muscles → postural control
scene(svg, at('interesante3'), at('fundamental3'), g => {
  obj(g, 'planta', at('interesante3'), { cx: 330, cy: 620, fit: 380 });
  obj(g, 'cerebro', at('interesante3') + 0.5, { cx: 960, cy: 330, fit: 380 });
  obj(g, 'pantorrilla', at('activar3') - 0.3, { cx: 1590, cy: 620, fit: 460 });
  flow(g, 'M420 520 C560 400 700 360 800 340', at('interesante3') + 0.8, { n: 5, period: 2, color: C.amber, shape: 'dot', r: 10, line: C.amber });
  flow(g, 'M1120 340 C1250 360 1400 420 1500 500', at('activar3'), { n: 5, period: 2, color: C.red, shape: 'dot', r: 10, line: C.red });
  chip(g, 'INTERPRETA LA PRESIÓN', at('interesante3') + 1.5, { cx: 560, cy: 940, size: 32, fill: C.white });
  chip(g, 'ACTIVA LOS MÚSCULOS', at('activar3'), { cx: 1360, cy: 940, size: 32, fill: C.white });
  chip(g, 'PUEDE MEJORAR EL CONTROL POSTURAL', at('postural3'), { cx: 960, cy: 620, size: 30, fill: C.green, color: C.white });
});

// 12. dizziness on standing isn't just poor balance → see a doctor, especially on BP medication
scene(svg, at('fundamental3'), at('pregunta3'), g => {
  pan(g, 'e_cama', 'left', { from: [0.45, 0.4], to: [0.5, 0.5] });
  chip(g, 'ALGO FUNDAMENTAL', at('fundamental3'), { cx: 1510, cy: 220, size: 36, fill: C.ink, color: C.amber });
  chip(g, 'MAREO ≠ FALTA DE EQUILIBRIO', at('confundir3'), { cx: 1510, cy: 380, size: 30, fill: C.white });
  chip(g, 'MAREOS FRECUENTES → MÉDICO', at('valoracion3'), { cx: 1510, cy: 540, size: 32, fill: C.red, color: C.white });
  chip(g, 'SOBRE TODO SI TOMAS', at('medicamentos3'), { cx: 1510, cy: 690, size: 30, fill: C.amber });
  chip(g, 'MEDICACIÓN PARA LA TENSIÓN', at('medicamentos3') + 0.4, { cx: 1510, cy: 790, size: 30, fill: C.amber });
});

// 13. question: more unsure getting up from a chair, or on uneven ground? Tell me in the comments
scene(svg, at('pregunta3'), at('cuarto3'), g => {
  tile(g, 'l_intenta', at('pregunta3') + 0.5, { x: 120, y: 120, w: 760, h: 480, label: 'AL LEVANTARTE' });
  tile(g, 'i_adoquin', at('terrenos3') - 0.4, { x: 1040, y: 120, w: 760, h: 480, label: 'TERRENO IRREGULAR' });
  Text(g, 'O', { x: 960, y: 370, size: 90, color: C.red });
  CTAlive(g, 'comment', 'CUÉNTAMELO EN LOS COMENTARIOS', at('cuentamelo3') - 0.3, { y: 780 });
});

// 14. next: walking without moving from the spot
scene(svg, at('cuarto3'), at('p4') - 0.3, g => {
  Poses(g, 'marcha', at('cuarto3'), { cx: 700, cy: 560, h: 760, idx: CYCLE(at('cuarto3') + 1, [[1, 1.0], [2, 0.6], [3, 1.0], [2, 0.6]]) });
  chip(g, 'AHORA: EL CUARTO', at('cuarto3') + 0.3, { cx: 1380, cy: 420, size: 44, fill: C.ink, color: C.amber });
  chip(g, 'COMO CAMINAR', at('cuarto3') + 1.5, { cx: 1380, cy: 570, size: 44, fill: C.white });
});
