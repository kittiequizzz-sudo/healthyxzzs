// PUNTO 2 — el «segundo corazón» oculto en tus piernas: soleus, muscle pump, slow fibres, iScience 2022.

// 0. kicker over the happy calf pump
scene(svg, at('p2') - 0.3, at('ahora2'), g => {
  pan(g, 's_bomba', 'full', { from: [0.5, 0.65], to: [0.5, 0.4] });
  kicker(g, 'PUNTO 2', 'EL «SEGUNDO CORAZÓN»\nOCULTO EN TUS PIERNAS', at('p2'));
});

// 1. just under the visible calf muscles: the soleus
scene(svg, at('ahora2'), at('desapercibido'), g => {
  pan(g, 's_anatomia', 'full', { from: [0.5, 0.25], to: [0.55, 0.6], zoom: 0.24 });
  chip(g, 'UNA PARTE SORPRENDENTE', at('ahora2') + 0.3, { cx: 960, cy: 130, size: 44, fill: C.ink, color: C.white, t1: at('debajo') });
  chip(g, 'GEMELOS: LOS QUE SE VEN', at('debajo') + 0.8, { cx: 960, cy: 130, size: 44 });
  chip(g, 'DEBAJO: EL SÓLEO', at('soleo2'), { cx: 960, cy: 880, size: 60, fill: C.amber });
}, { punch: [at('soleo2')] });

// 2. it works all the time: standing, walking, moving the feet
scene(svg, at('desapercibido'), at('funcion2'), g => {
  const L = obj(g, 'pierna', at('desapercibido'), { cx: 620, cy: 540, fit: 760, idle: 'none' });
  anim(t => { const a = 5 * Math.sin((t - at('desapercibido')) * 2.4); L.g.setAttribute('transform', `rotate(${a.toFixed(2)} 640 880)`); });
  chip(g, 'TRABAJA SIN PARAR', at('desapercibido') + 0.5, { cx: 1340, cy: 200, size: 48, fill: C.ink, color: C.amber });
  chip(g, 'DE PIE', at('de_pie'), { cx: 1340, cy: 400, size: 48 });
  chip(g, 'CAMINANDO', at('caminas'), { cx: 1340, cy: 560, size: 48, phase: 0.3 });
  chip(g, 'MOVIENDO LOS PIES', at('pies2') - 0.6, { cx: 1340, cy: 720, size: 48, phase: 0.6 });
});

// 3. key for circulation and metabolic health
scene(svg, at('funcion2'), at('recorrido'), g => {
  const H = obj(g, 'corazon', at('funcion2') + 0.5, { cx: 620, cy: 460, fit: 400, idle: 'none' });
  anim(t => { const b = 1 + 0.06 * Math.pow(Math.sin(Math.PI * ((t % 0.85) / 0.85)), 8); H.g.setAttribute('transform', `translate(620 460) scale(${b.toFixed(4)}) translate(-620 -460)`); });
  obj(g, 'azucar', at('metabolica2') - 0.8, { cx: 1300, cy: 460, fit: 340 });
  chip(g, 'CIRCULACIÓN', at('circ2'), { cx: 620, cy: 800, size: 48, fill: C.red, color: C.white });
  chip(g, 'SALUD METABÓLICA', at('metabolica2'), { cx: 1300, cy: 800, size: 48, fill: C.amber });
});

// 4. the blood's round trip: the heart pushes it down, it must come back up against gravity
scene(svg, at('recorrido'), at('afortunadamente'), g => {
  const H = obj(g, 'corazon', at('recorrido'), { cx: 960, cy: 220, fit: 260, idle: 'none' });
  anim(t => { const b = 1 + 0.07 * Math.pow(Math.sin(Math.PI * ((t % 0.85) / 0.85)), 8); H.g.setAttribute('transform', `translate(960 220) scale(${b.toFixed(4)}) translate(-960 -220)`); });
  obj(g, 'pierna', at('recorrido') + 0.4, { cx: 960, cy: 770, fit: 520, amp: 0.4 });
  flow(g, 'M900 330 C700 420 700 640 880 720', at('impulsa'), { n: 8, period: 2.2, line: C.red });
  const up = flow(g, 'M1040 720 C1220 640 1220 420 1020 330', at('regresar2'), { n: 8, period: 3.2, color: '#7A1E18', line: VEIN });
  anim(t => { up.speed = t < at('gravedad2') ? 1 : 0.45; });
  chip(g, 'EL CORAZÓN IMPULSA', at('impulsa'), { cx: 420, cy: 470, size: 38, fill: C.red, color: C.white });
  chip(g, 'Y LA SANGRE DEBE VOLVER', at('regresar2'), { cx: 1500, cy: 470, size: 34, fill: C.white });
  const gv = Live(g, { t0: at('gravedad2') - 0.4, cx: 1500, cy: 720, enter: 'd', idle: 'bob' });
  Chip(gv.g, 'GRAVEDAD', { cx: 1500, cy: 680, size: 46, fill: C.amber });
  Arrow(gv.g, 1500, 750, 1500, 880, C.ink, 16);
  chip(g, 'UN DESAFÍO', at('desafio'), { cx: 420, cy: 720, size: 44, fill: C.ink, color: C.amber });
}, { punch: [at('gravedad2')] });

// 5. the help: calves contract, squeeze the deep veins, valves stop the backflow
scene(svg, at('afortunadamente'), at('por_eso'), g => {
  CalfPump(g, at('afortunadamente'), { cx: 640, cy: 590, s: 0.82, mode: 'active' });
  chip(g, 'UN MECANISMO DE AYUDA', at('afortunadamente') + 0.3, { cx: 1380, cy: 230, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'SE CONTRAEN', at('contraen'), { cx: 1380, cy: 400, size: 46, fill: C.red, color: C.white });
  chip(g, 'COMPRIMEN LAS VENAS', at('comprimen2'), { cx: 1380, cy: 560, size: 42 });
  chip(g, 'LA SANGRE SUBE ↑', at('comprimen2') + 2.5, { cx: 1380, cy: 720, size: 42, fill: C.green, color: C.white });
  chip(g, 'VÁLVULAS: NO VUELVE ATRÁS', at('valvulas2'), { cx: 1380, cy: 880, size: 34, fill: C.amber });
});

// 6. that's why the calf is called the "second heart"
scene(svg, at('por_eso'), at('no_porque'), g => {
  pan(g, 's_bomba', 'left', { from: [0.5, 0.3], to: [0.5, 0.6], zoom: 0.2 });
  stamp(g, '«SEGUNDO', at('segundo2'), { cx: 1510, cy: 400, size: 70, color: C.red, rot: -6 });
  stamp(g, 'CORAZÓN»', at('segundo2') + 0.35, { cx: 1510, cy: 580, size: 70, color: C.red, rot: -6 });
}, { punch: [at('segundo2')] });

// 7. not a replacement for the heart: an auxiliary muscle pump for venous return
scene(svg, at('no_porque'), at('participa'), g => {
  const H = obj(g, 'corazon', at('no_porque'), { cx: 520, cy: 380, fit: 300, idle: 'none' });
  anim(t => { const b = 1 + 0.06 * Math.pow(Math.sin(Math.PI * ((t % 0.85) / 0.85)), 8); H.g.setAttribute('transform', `translate(520 380) scale(${b.toFixed(4)}) translate(-520 -380)`); });
  mark(g, 'NO SUSTITUYE AL CORAZÓN', false, at('no_porque') + 0.3, { cx: 520, cy: 720, size: 38 });
  tile(g, 'v_bomba', at('bomba') - 0.6, { x: 1020, y: 190, w: 720, h: 470 });
  mark(g, 'BOMBA MUSCULAR AUXILIAR', true, at('bomba'), { cx: 1380, cy: 760, size: 38 });
});

// 8. the soleus works especially in repeated, gentle ankle movements
scene(svg, at('participa'), at('capacidad'), g => {
  heelRaise(g, at('participa'), { cx: 620, floor: 1020, h: 900, period: 4.2 });
  chip(g, 'EL SÓLEO PARTICIPA', at('participa') + 0.3, { cx: 1380, cy: 360, size: 50, fill: C.amber });
  chip(g, 'MOVIMIENTOS SUAVES', at('tobillo2') - 2, { cx: 1380, cy: 540, size: 46 });
  chip(g, 'DEL TOBILLO', at('tobillo2'), { cx: 1380, cy: 680, size: 46, phase: 0.4 });
});

// 9. slow-twitch, type 1 fibres
scene(svg, at('capacidad'), at('oxigeno'), g => {
  pan(g, 's_fibras', 'full', { from: [0.25, 0.5], to: [0.6, 0.45] });
  chip(g, 'SU CAPACIDAD NO TERMINA AQUÍ', at('capacidad'), { cx: 960, cy: 130, size: 42, fill: C.ink, color: C.white, t1: at('fibras') });
  cap(g, 'FIBRAS LENTAS · TIPO 1', at('fibras'), { hi: 'TIPO 1' });
}, { punch: [at('tipo1')] });

// 10. they run on oxygen and last without tiring (fast fibres drain)
scene(svg, at('oxigeno'), at('cientificos'), g => {
  const rows = [['FIBRAS LENTAS · SÓLEO', C.green, 360], ['FIBRAS RÁPIDAS', C.red, 640]];
  const bars = rows.map(([s, col, y], i) => {
    const L = Live(g, { t0: at('oxigeno') + i * 0.6, cx: 1100, cy: y, enter: 'l', idle: 'none' });
    Text(L.g, s, { x: 420, y: y - 80, size: 40, anchor: 'start' });
    return Bar(L.g, { x: 420, y, w: 1080, h: 90, color: col });
  });
  anim(t => {
    bars[0].draw(0.96 + 0.03 * Math.sin(t * 3));
    bars[1].draw(1 - 0.8 * E.inOut(prog(t, at('fatigarse') - 0.5, at('cientificos'))));
  });
  flow(g, 'M240 200 C300 300 330 360 400 400', at('oxigeno'), { n: 5, color: C.blue, r: 14, shape: 'dot', period: 1.6 });
  chip(g, 'O₂', at('oxigeno'), { cx: 220, cy: 170, size: 46, fill: C.blue, color: C.white });
  chip(g, 'USAN OXÍGENO', at('oxigeno') + 0.6, { cx: 960, cy: 140, size: 46 });
  chip(g, 'AGUANTAN SIN FATIGARSE', at('fatigarse'), { cx: 960, cy: 880, size: 46, fill: C.green, color: C.white });
});

// 11. scientists started looking at energy metabolism
scene(svg, at('cientificos'), at('estudio'), g => {
  pan(g, 's_cientifica', 'left', { from: [0.6, 0.4], to: [0.3, 0.5] });
  chip(g, 'LOS CIENTÍFICOS', at('cientificos') + 0.3, { cx: 1510, cy: 380, size: 46, fill: C.ink, color: C.white });
  chip(g, 'METABOLISMO ENERGÉTICO', at('cientificos') + 3, { cx: 1510, cy: 540, size: 36, fill: C.amber });
});

// 12. the 2022 iScience study: a specific technique, lab conditions → better post-meal glucose
scene(svg, at('estudio'), at('aclarar'), g => {
  chip(g, 'ESTUDIO 2022 · iSCIENCE', at('estudio'), { cx: 960, cy: 100, size: 46, fill: C.ink, color: C.amber });
  const L = Live(g, { t0: at('estudio') + 0.6, cx: 800, cy: 560, enter: 'up', idle: 'none' });
  Card(L.g, { x: 260, y: 210, w: 1080, h: 680, fill: C.white });
  el('path', { d: 'M360 270 L360 800 L1280 800', fill: 'none', stroke: C.ink, 'stroke-width': 8, 'stroke-linecap': 'round' }, L.g);
  Text(L.g, 'GLUCOSA', { x: 330, y: 250, size: 32, anchor: 'start' });
  Text(L.g, 'DESPUÉS DE COMER →', { x: 1270, y: 850, size: 32, anchor: 'end' });
  const curve = (h) => { let d = ''; for (let i = 0; i <= 60; i++) { const x = 380 + i * 14.5, u = i / 60; const y = 760 - h * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.25)), 2) * Math.exp(-u * 0.6); d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); } return d; };
  const a = el('path', { d: curve(430), fill: 'none', stroke: C.grey, 'stroke-width': 12, 'stroke-linecap': 'round' }, L.g);
  const b = el('path', { d: curve(210), fill: 'none', stroke: C.green, 'stroke-width': 14, 'stroke-linecap': 'round' }, L.g);
  const la = a.getTotalLength(), lb = b.getTotalLength();
  set(a, { 'stroke-dasharray': la + ' ' + la }); set(b, { 'stroke-dasharray': lb + ' ' + lb });
  anim(t => {
    set(a, { 'stroke-dashoffset': la * (1 - E.inOut(prog(t, at('estudio') + 1, at('tecnica') + 1))) });
    set(b, { 'stroke-dashoffset': lb * (1 - E.inOut(prog(t, at('mejorar') - 0.5, at('mejorar') + 3))) });
  });
  chip(g, 'SIN ACTIVAR', at('estudio') + 2, { cx: 1010, cy: 340, size: 32, fill: C.grey, color: C.white });
  chip(g, 'SÓLEO ACTIVADO', at('mejorar'), { cx: 1080, cy: 600, size: 32, fill: C.green, color: C.white });
  chip(g, 'TÉCNICA ESPECÍFICA', at('tecnica'), { cx: 1620, cy: 380, size: 34, fill: C.amber });
  chip(g, 'EN LABORATORIO', at('controladas'), { cx: 1620, cy: 520, size: 34, fill: C.amber, phase: 0.4 });
  chip(g, 'POCAS PERSONAS', at('controladas') + 1.2, { cx: 1620, cy: 660, size: 34, fill: C.amber, phase: 0.8 });
  source(g, 'Hamilton y col. · iScience 2022 · técnica específica, en laboratorio, pocos participantes · curvas ilustrativas', at('iscience'));
});

// 13. important: not any heel raise automatically gives the same result
scene(svg, at('aclarar'), at('aun_asi'), g => {
  chip(g, 'ACLARACIÓN IMPORTANTE', at('aclarar'), { cx: 960, cy: 140, size: 48, fill: C.ink, color: C.amber });
  heelRaise(g, at('aclarar') + 0.3, { cx: 520, floor: 1010, h: 760, period: 4 });
  stamp(g, 'NO ES AUTOMÁTICO', at('cualquier'), { cx: 1260, cy: 470, size: 70, color: C.orange });
  chip(g, 'CUALQUIER ELEVACIÓN ≠ MISMO RESULTADO', at('cualquier') + 2, { cx: 1260, cy: 720, size: 30 });
}, { punch: [at('cualquier')] });

// 14. still: even seated, small contractions break the stillness
scene(svg, at('aun_asi'), at('pesas'), g => {
  pan(g, 'e_tv', 'full', { from: [0.45, 0.4], to: [0.5, 0.75], zoom: 0.2 });
  chip(g, 'UNA IDEA FASCINANTE', at('aun_asi'), { cx: 960, cy: 130, size: 44, fill: C.ink, color: C.amber, t1: at('pequenas') });
  cap(g, 'PEQUEÑAS CONTRACCIONES, SENTADO', at('pequenas'), { hi: 'SENTADO' });
});

// 15. no weights, no machines, no jerky moves
scene(svg, at('pesas'), at('basta'), g => {
  mark(g, 'PESAS', false, at('pesas') + 0.3, { cx: 960, cy: 300, size: 56, enter: 'l' });
  mark(g, 'MÁQUINAS', false, at('maquinas'), { cx: 960, cy: 520, size: 56, enter: 'r' });
  mark(g, 'MOVIMIENTOS BRUSCOS', false, at('bruscos'), { cx: 960, cy: 740, size: 56, enter: 'l' });
});

// 16. it's been working silently for you all your life
scene(svg, at('basta'), at('pregunta2'), g => {
  pan(g, 'e_musica', 'full', { from: [0.3, 0.4], to: [0.4, 0.7] });
  cap(g, 'TRABAJA EN SILENCIO POR TI', at('silencio') - 1, { hi: 'EN SILENCIO' });
});

// 17. the question: small movements · blood sugar · your brain?
scene(svg, at('pregunta2'), at('respuesta') + 4.4, g => {
  chip(g, 'UNA PREGUNTA', at('pregunta2'), { cx: 960, cy: 130, size: 50, fill: C.ink, color: C.amber });
  obj(g, 'pierna', at('pregunta2') + 2, { cx: 380, cy: 520, fit: 420 });
  obj(g, 'azucar', at('azucar2') - 0.3, { cx: 960, cy: 520, fit: 280, phase: 0.3 });
  obj(g, 'cerebro', at('cerebro2') - 0.3, { cx: 1540, cy: 520, fit: 340, phase: 0.6 });
  flow(g, 'M520 540 L820 540', at('azucar2'), { n: 4, period: 1.4, shape: 'cube', r: 11 });
  flow(g, 'M1100 540 L1380 540', at('cerebro2'), { n: 4, period: 1.4, shape: 'cube', r: 11 });
  chip(g, 'PEQUEÑOS MOVIMIENTOS', at('pregunta2') + 2.4, { cx: 380, cy: 820, size: 30 });
  chip(g, 'AZÚCAR EN SANGRE', at('azucar2'), { cx: 960, cy: 820, size: 30, fill: C.amber });
  chip(g, 'TU CEREBRO', at('cerebro2'), { cx: 1540, cy: 820, size: 30, fill: C.white });
  wrapQ(g, at('cerebro2') + 1.5, 1540, 300, 1.1);
  chip(g, 'LA RESPUESTA, EN EL PUNTO 3', at('respuesta'), { cx: 960, cy: 960, size: 40, fill: C.ink, color: C.white });
});

// 18. subscribe: simple, science-based, after 50
scene(svg, at('respuesta') + 4.4, at('p3') - 0.3, g => {
  tile(g, 'e_pareja', at('respuesta') + 4.6, { x: 360, y: 90, w: 1200, h: 680 });
  chip(g, 'CIENCIA, EXPLICADA FÁCIL', at('respuesta') + 5.2, { cx: 960, cy: 70, size: 40, fill: C.amber });
  CTAlive(g, 'sub', 'SUSCRÍBETE', at('suscribete') - 0.4);
}, { punch: [at('suscribete')] });
