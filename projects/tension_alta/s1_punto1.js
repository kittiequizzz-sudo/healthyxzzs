// PUNTO 1 — ¿estás midiendo bien tu tensión? Alert response, white coat, anxiety loop, errors, protocol.

// 0. kicker
scene(svg, at('p1') - 0.3, at('preocupandote'), g => {
  pan(g, 'm_manguito', 'full', { from: [0.5, 0.45], to: [0.6, 0.5] });
  kicker(g, 'PUNTO 1', '¿ESTÁS MIDIENDO BIEN\nTU TENSIÓN?', at('p1'));
});

// 1. maybe the number isn't real: not your heart, arteries, or the medicine — small details
scene(svg, at('preocupandote'), at('sencillo'), g => {
  Monitor(g, at('preocupandote') + 0.3, { cx: 560, cy: 470, s: 1, sys: 155, dia: 95, tone: 'grey' });
  wrapQ(g, at('preocupandote') + 2, 820, 260, 1.2);
  mark(g, 'TU CORAZÓN', false, at('curioso') + 1, { cx: 1380, cy: 260, size: 38 });
  mark(g, 'TUS ARTERIAS', false, at('ni_corazon'), { cx: 1380, cy: 390, size: 38 });
  mark(g, 'LA MEDICACIÓN', false, at('ni_corazon') + 1.2, { cx: 1380, cy: 520, size: 38 });
  chip(g, '¿PEQUEÑOS DETALLES?', at('detalles'), { cx: 1380, cy: 700, size: 44, fill: C.amber });
});

// 2. measuring looks simple — but the body is very sensitive
scene(svg, at('sencillo'), at('nervioso'), g => {
  pan(g, 'm_manguito', 'left', { from: [0.6, 0.5], to: [0.7, 0.55], zoom: 0.22 });
  chip(g, 'MANGUITO + BOTÓN…', at('sencillo') + 0.5, { cx: 1510, cy: 340, size: 40 });
  chip(g, '…PERO EL CUERPO', at('sensible') - 0.6, { cx: 1510, cy: 500, size: 40, fill: C.ink, color: C.white });
  chip(g, 'ES MUY SENSIBLE', at('sensible'), { cx: 1510, cy: 620, size: 40, fill: C.amber });
});

// 3. nerves → sympathetic → stronger beat, vessels contract, pressure up (temporarily)
scene(svg, at('nervioso'), at('problema1'), g => {
  ECG(g, at('nervioso') + 0.5, { x: 120, y: 160, w: 760, h: 170, bpm: t => 70 + 30 * prog(t, at('latir'), at('latir') + 2) });
  Vessel(g, at('simpatico') - 0.3, { x: 120, y: 560, w: 760, r: 90, n: 9, narrow: t => 0.8 * E.inOut(prog(t, at('contraen') - 0.3, at('contraen') + 1.5)) });
  gauge(g, at('aumenta') - 1, { cx: 1420, cy: 520, r: 210, label: 'PRESIÓN' }, t => 0.35 + 0.4 * E.inOut(prog(t, at('aumenta') - 0.5, at('aumenta') + 1.5)));
  chip(g, 'NERVIOS → ALERTA', at('nervioso') + 0.4, { cx: 1420, cy: 160, size: 40, fill: C.red, color: C.white });
  chip(g, 'SUBIDA TEMPORAL', at('aumenta'), { cx: 1420, cy: 760, size: 40, fill: C.amber });
  chip(g, 'RESPUESTA NATURAL', at('natural1'), { cx: 500, cy: 860, size: 38, fill: C.white });
});

// 4. …exactly while you check if your treatment works
scene(svg, at('problema1'), at('bata'), g => {
  pan(g, 'x_repite', 'full', { from: [0.4, 0.4], to: [0.6, 0.55] });
  cap(g, 'LA ALERTA… JUSTO AL MEDIRTE', at('problema1') + 1, { hi: 'JUSTO AL MEDIRTE', hiColor: '#FF7A6E' });
});

// 5. white-coat hypertension: high at the clinic, lower outside
scene(svg, at('bata'), at('casa'), g => {
  pan(g, 'b_bata', 'left', { from: [0.3, 0.35], to: [0.45, 0.45] });
  chip(g, 'HIPERTENSIÓN', at('bata'), { cx: 1510, cy: 210, size: 44, fill: C.ink, color: C.white });
  chip(g, 'DE BATA BLANCA', at('bata') + 0.4, { cx: 1510, cy: 320, size: 44, fill: C.white });
  Monitor(g, at('consulta1'), { cx: 1350, cy: 640, s: 0.5, sys: 152, dia: 92, count: 1 });
  Monitor(g, at('fuera'), { cx: 1680, cy: 640, s: 0.5, sys: 128, dia: 80, tone: 'ok', count: 1 });
  chip(g, 'CONSULTA', at('consulta1') + 0.3, { cx: 1350, cy: 820, size: 30, fill: C.red, color: C.white });
  chip(g, 'FUERA', at('fuera') + 0.3, { cx: 1680, cy: 820, size: 30, fill: C.green, color: C.white });
});

// 6. at home too: fear of the monitor → anxiety loop (see high → worry → repeat → stays high)
scene(svg, at('casa'), at('emociones'), g => {
  chip(g, 'MIEDO AL TENSIÓMETRO', at('casa') + 0.5, { cy: 100, size: 44, fill: C.ink, color: C.amber });
  const pts = [[960, 300, 'x_susto', 'VES UNA CIFRA ALTA', 'ves'], [1420, 640, 'x_pecho', 'TE PREOCUPAS', 'ves'], [960, 900, 'x_repite', 'REPITES YA', 'repites'], [500, 640, 'x_susto', 'SIGUE ALTA', 'repites']];
  const ring = el('circle', { cx: 960, cy: 600, r: 300, fill: 'none', stroke: C.red, 'stroke-width': 10, 'stroke-dasharray': '30 22', opacity: 0 }, g);
  anim(t => set(ring, { opacity: t < at('ves') ? 0 : 0.6, transform: `rotate(${((t - at('ves')) * 40) % 360} 960 600)` }));
  pts.forEach(([x, y, n, s, k], i) => {
    const L = Live(g, { t0: at(k) + i * 1.1, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.25 });
    const r = 110;
    const id = 'cc' + i;
    const cp = el('clipPath', { id }, L.g); el('circle', { cx: x, cy: y, r }, cp);
    el('circle', { cx: x + 6, cy: y + 8, r: r + 6, fill: C.ink }, L.g);
    el('image', { href: src(n), x: x - r * 1.5, y: y - r * 1.05, width: r * 3, height: r * 2.1, 'clip-path': `url(#${id})`, preserveAspectRatio: 'xMidYMid slice' }, L.g);
    el('circle', { cx: x, cy: y, r, fill: 'none', stroke: C.ink, 'stroke-width': 7 }, L.g);
    Chip(L.g, s, { cx: x, cy: y + r + 24, size: 26, fill: C.white });
  });
  chip(g, 'CÍRCULO DE ANSIEDAD', at('circulo'), { cx: 960, cy: 600, size: 34, fill: C.red, color: C.white });
});

// 7. not only emotions: stairs, crossed legs, talking, arm low
scene(svg, at('emociones'), at('manguito'), g => {
  chip(g, 'ERRORES AL MEDIR', at('emociones') + 0.3, { cy: 70, size: 44, fill: C.red, color: C.white });
  [['e_escaleras', 'TRAS LAS ESCALERAS', 'escaleras', 90, 140], ['e_piernas', 'PIERNAS CRUZADAS', 'piernas', 980, 140], ['e_piernas', 'HABLANDO', 'hablar', 90, 590], ['e_brazo', 'BRAZO BAJO', 'brazo', 980, 590]]
    .forEach(([n, s, k, x, y], i) => {
      tile(g, n, at(k) - 0.3, { x, y, w: 850, h: 360, zoom: 0.14, from: i === 2 ? [0.4, 0.2] : [0.5, 0.5], to: i === 2 ? [0.4, 0.25] : [0.5, 0.42] });
      mark(g, s, false, at(k), { cx: x + 425, cy: y + 380, size: 28 });
    });
});

// 8. small cuff, full bladder, coffee
scene(svg, at('manguito'), at('por_eso1'), g => {
  const cuff = Live(g, { t0: at('manguito'), cx: 400, cy: 460, enter: 'pop', idle: 'bob' });
  Cutout(cuff.g, src('tensiometro'), { cx: 400, cy: 440, iw: SZ.tensiometro[0], ih: SZ.tensiometro[1], fit: 420 });
  mark(g, 'MANGUITO PEQUEÑO', false, at('manguito') + 0.8, { cx: 400, cy: 760, size: 32 });
  chip(g, 'VEJIGA LLENA', at('vejiga'), { cx: 960, cy: 760, size: 40, fill: C.amber });
  tile(g, 'e_cafe', at('cafe1') - 0.4, { x: 1180, y: 200, w: 640, h: 430 });
  mark(g, 'CAFÉ JUSTO ANTES', false, at('cafe1'), { cx: 1500, cy: 760, size: 32 });
});

// 9. so first check HOW you measure: sit 5 min, back supported, feet flat, arm at heart level
scene(svg, at('por_eso1'), at('evita'), g => {
  pan(g, 'b_postura', 'left', { from: [0.4, 0.5], to: [0.45, 0.5] });
  chip(g, 'CÓMO MEDIRTE BIEN', at('por_eso1') + 1, { cx: 1510, cy: 150, size: 40, fill: C.green, color: C.white });
  const sw = Stopwatch(g, { cx: 1340, cy: 340, r: 90, total: 5, unit: 'min' });
  const L = Live(g, { t0: at('cinco_min') - 0.3, cx: 1340, cy: 340, idle: 'bob' });
  L.g.appendChild(sw.g);
  anim(t => sw.draw(5 * E.inOut(prog(t, at('cinco_min'), at('cinco_min') + 2.5))));
  mark(g, 'ESPALDA APOYADA', true, at('espalda'), { cx: 1560, cy: 500, size: 32 });
  mark(g, 'PIES EN EL SUELO', true, at('pies'), { cx: 1560, cy: 620, size: 32 });
  mark(g, 'BRAZO A LA ALTURA DEL CORAZÓN', true, at('altura'), { cx: 1500, cy: 740, size: 26 });
});

// 10. 30 min before: no exercise, tobacco, caffeine · validated upper-arm device, right cuff size
scene(svg, at('evita'), at('dos'), g => {
  const ck = Clock(g, { cx: 400, cy: 380, r: 180 });
  const L = Live(g, { t0: at('evita'), cx: 400, cy: 380, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(8 + 0.5 * E.inOut(prog(t, at('treinta') - 0.5, at('treinta') + 2))));
  chip(g, '30 MIN ANTES, SIN:', at('treinta'), { cx: 400, cy: 640, size: 38, fill: C.ink, color: C.white });
  mark(g, 'EJERCICIO', false, at('evita') + 0.4, { cx: 400, cy: 760, size: 32 });
  mark(g, 'TABACO · CAFEÍNA', false, at('evita') + 1.4, { cx: 400, cy: 880, size: 30 });
  obj(g, 'tensiometro', at('validado') - 0.5, { cx: 1340, cy: 420, fit: 520, phase: 0.3 });
  mark(g, 'TENSIÓMETRO DE BRAZO VALIDADO', true, at('validado'), { cx: 1340, cy: 720, size: 28 });
  mark(g, 'MANGUITO A TU MEDIDA', true, at('validado') + 2.5, { cx: 1340, cy: 840, size: 32 });
});

// 11. two readings 1 min apart, write them down · morning & evening for 7 days
scene(svg, at('dos'), at('registro'), g => {
  pan(g, 'b_registro', 'left', { from: [0.4, 0.45], to: [0.45, 0.6], b: at('manana_noche') });
  LogTable(g, at('manana_noche') - 0.5, { x: 1100, y: 170, dur: 4.5 });
  chip(g, '2 MEDICIONES · 1 MIN', at('dos'), { cx: 1510, cy: 200, size: 34, fill: C.white, t1: at('manana_noche') - 0.6 });
  chip(g, 'ANÓTALAS', at('anota'), { cx: 1510, cy: 340, size: 40, fill: C.amber, t1: at('manana_noche') - 0.6 });
  chip(g, 'MAÑANA Y NOCHE · 7 DÍAS', at('siete'), { cx: 1500, cy: 920, size: 32, fill: C.green, color: C.white });
});

// 12. that log tells more than one isolated number
scene(svg, at('registro'), at('recuerda1'), g => {
  LogTable(g, at('registro') - 0.2, { x: 160, y: 190, dur: 0.1 });
  Monitor(g, at('aislada') - 0.5, { cx: 1420, cy: 470, s: 0.75, sys: 148, dia: 92, tone: 'grey' });
  chip(g, 'UN REGISTRO', at('registro'), { cx: 560, cy: 840, size: 44, fill: C.green, color: C.white });
  chip(g, '> UNA CIFRA AISLADA', at('aislada'), { cx: 1420, cy: 840, size: 38 });
});

// 13. a high reading shouldn't be ignored, especially if repeated · worrying symptoms → doctor
scene(svg, at('recuerda1'), at('ahora_bien'), g => {
  pan(g, 'b_bata', 'left', { from: [0.6, 0.4], to: [0.5, 0.5] });
  chip(g, 'CIFRAS ALTAS REPETIDAS', at('recuerda1') + 0.5, { cx: 1510, cy: 300, size: 32, fill: C.red, color: C.white });
  chip(g, '→ NO LAS IGNORES', at('recuerda1') + 2, { cx: 1510, cy: 420, size: 38, fill: C.white });
  chip(g, 'SÍNTOMAS → ATENCIÓN MÉDICA', at('sintomas1'), { cx: 1510, cy: 600, size: 30, fill: C.amber });
});

// 14. measured right and still high? → some everyday medicines
scene(svg, at('ahora_bien'), at('conocias'), g => {
  obj(g, 'blister', at('ahora_bien') + 1, { cx: 560, cy: 470, fit: 480 });
  obj(g, 'spray', at('medicamentos1') - 0.3, { cx: 1000, cy: 470, fit: 300, phase: 0.3 });
  obj(g, 'regaliz', at('medicamentos1') + 0.3, { cx: 1400, cy: 470, fit: 380, phase: 0.6 });
  cap(g, 'MEDICAMENTOS COTIDIANOS', at('medicamentos1'), { hi: 'MEDICAMENTOS' });
});

// 15. which mistake surprised you? comments
scene(svg, at('conocias'), at('p2') - 0.3, g => {
  [[560, 330, 1.8], [960, 270, 2.2], [1360, 330, 1.8]].forEach(([x, y, s], i) => {
    const B = Live(g, { t0: at('conocias') + i * 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    Icon.bubble(B.g, x - 50 * s, y - 50 * s, s);
  });
  chip(g, '¿CONOCÍAS ESTOS ERRORES?', at('conocias'), { cy: 560, size: 48, fill: C.amber });
  CTAlive(g, 'comment', '¿CUÁL TE SORPRENDIÓ MÁS?', at('cuentame1'), { y: 700 });
});
