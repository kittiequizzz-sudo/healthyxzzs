// PUNTO 1 — el error silencioso después de la cena (digestion, glucose, venous return, heavy legs, DVT).

// 0. kicker over the man frozen in front of the TV
scene(svg, at('p1') - 0.3, at('cada_noche'), g => {
  pan(g, 'n_tv', 'full', { from: [0.4, 0.4], to: [0.5, 0.35] });
  kicker(g, 'PUNTO 1', 'EL ERROR SILENCIOSO\nDESPUÉS DE LA CENA', at('p1'));
});

// 1. every night, millions: dinner, sofa for one or two hours, TV, phone, tiredness
scene(svg, at('cada_noche'), at('desconocen'), g => {
  pan(g, 'n_movil', 'full', { from: [0.45, 0.55], to: [0.65, 0.35] });
  chip(g, 'CADA NOCHE, MILLONES', at('cada_noche') + 0.3, { cx: 960, cy: 130, size: 46, fill: C.ink, color: C.amber });
  const ck = Clock(g, { cx: 1560, cy: 260, r: 110 });
  const L = Live(g, { t0: at('dos_horas') - 0.5, cx: 1560, cy: 260, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(21 + 2 * E.inOut(prog(t, at('dos_horas'), at('encienden') + 2))));
  chip(g, '1 – 2 HORAS SIN MOVERSE', at('dos_horas'), { cx: 1560, cy: 420, size: 34, fill: C.amber });
  chip(g, 'TELE', at('encienden'), { cx: 470, cy: 760, size: 40 });
  chip(g, 'MÓVIL', at('movil'), { cx: 720, cy: 840, size: 40, phase: 0.3 });
  chip(g, 'CANSANCIO', at('cansancio'), { cx: 1000, cy: 760, size: 40, phase: 0.6 });
});

// 2. what few know: so much stillness can affect leg circulation and how glucose is handled
scene(svg, at('desconocen'), at('comprenderlo'), g => {
  obj(g, 'silla', at('desconocen'), { cx: 960, cy: 470, fit: 440, idle: 'none' });
  chip(g, 'INMÓVIL MUCHO TIEMPO', at('desconocen') + 0.6, { cx: 960, cy: 120, size: 46, fill: C.ink, color: C.white });
  obj(g, 'pierna', at('circ_piernas') - 0.4, { cx: 420, cy: 500, fit: 460, enter: 'l' });
  chip(g, 'CIRCULACIÓN DE LAS PIERNAS', at('circ_piernas'), { cx: 420, cy: 840, size: 34, fill: C.amber });
  obj(g, 'azucar', at('gestiona') - 0.4, { cx: 1500, cy: 480, fit: 300, enter: 'r', phase: 0.4 });
  chip(g, 'MANEJO DE LA GLUCOSA', at('gestiona'), { cx: 1500, cy: 840, size: 34, fill: C.amber });
}, { punch: [at('gestiona')] });

// 3. after dinner: the gut needs more blood
scene(svg, at('comprenderlo'), at('hidratos'), g => {
  pan(g, 'd_digestion', 'full', { from: [0.5, 0.65], to: [0.5, 0.3] });
  cap(g, 'TRAS LA CENA, ¿QUÉ PASA DENTRO?', at('comprenderlo') + 0.3, { hi: '¿QUÉ PASA DENTRO?', t1: at('mas_sangre') - 0.2 });
  cap(g, 'MÁS SANGRE PARA DIGERIR', at('mas_sangre'), { hi: 'MÁS SANGRE' });
});

// 4. carbohydrates → glucose → into the bloodstream
scene(svg, at('hidratos'), at('pancreas'), g => {
  pan(g, 'd_azucar', 'left', { from: [0.3, 0.5], to: [0.7, 0.45] });
  chip(g, 'HIDRATOS', at('hidratos'), { cx: 1510, cy: 260, size: 48, fill: C.white });
  arrow(g, 1510, 330, 1510, 410, at('glucosa1') - 0.3);
  chip(g, 'GLUCOSA', at('glucosa1'), { cx: 1510, cy: 480, size: 52, fill: C.amber });
  arrow(g, 1510, 550, 1510, 630, at('torrente') - 0.3);
  chip(g, 'A LA SANGRE', at('torrente'), { cx: 1510, cy: 700, size: 48, fill: C.red, color: C.white });
});

// 5. the pancreas releases insulin: the key that lets glucose into the cells → energy. Normal.
scene(svg, at('pancreas'), at('problema'), g => {
  pan(g, 'd_llaves', 'left', { from: [0.3, 0.4], to: [0.75, 0.55] });
  chip(g, 'INSULINA = LLAVE', at('pancreas') + 0.4, { cx: 1510, cy: 280, size: 46, fill: C.amber });
  chip(g, 'GLUCOSA → CÉLULA', at('celulas'), { cx: 1510, cy: 440, size: 42 });
  chip(g, 'ENERGÍA', at('energia1'), { cx: 1510, cy: 600, size: 52, fill: C.green, color: C.white });
  mark(g, 'PROCESO NORMAL', true, at('normal'), { cx: 1510, cy: 780, size: 42 });
});

// 6. the problem: sitting as a daily habit, more so with insulin resistance
scene(svg, at('problema'), at('detalle1'), g => {
  pan(g, 'd_cola', 'left', { from: [0.3, 0.55], to: [0.6, 0.45] });
  mark(g, 'SEDENTARISMO DIARIO', false, at('problema') + 1.2, { cx: 1510, cy: 330, size: 40 });
  chip(g, 'RESISTENCIA', at('resistencia'), { cx: 1510, cy: 540, size: 46, fill: C.amber });
  chip(g, 'A LA INSULINA', at('resistencia') + 0.3, { cx: 1510, cy: 650, size: 46, fill: C.amber });
  chip(g, 'LA GLUCOSA ESPERA', at('resistencia') + 2.5, { cx: 1510, cy: 820, size: 36, fill: C.ink, color: C.white });
});

// 7. another detail: sitting still, the calves stop helping the venous return
scene(svg, at('detalle1'), at('regresar'), g => {
  chip(g, 'OTRO DETALLE', at('detalle1'), { cx: 960, cy: 110, size: 48, fill: C.ink, color: C.amber });
  CalfPump(g, at('detalle1') + 0.4, { cx: 700, cy: 600, s: 0.78, mode: 'idle' });
  chip(g, 'PIES EN EL SUELO', at('sentado1') + 1, { cx: 1400, cy: 360, size: 42 });
  chip(g, 'PIERNAS INMÓVILES', at('sentado1') + 3, { cx: 1400, cy: 520, size: 42, phase: 0.4 });
  chip(g, 'PANTORRILLAS EN PAUSA', at('pantorrillas1'), { cx: 1400, cy: 700, size: 42, fill: C.amber });
});

// 8. blood must climb back against gravity: valves + muscle contractions
scene(svg, at('regresar'), at('mueves'), g => {
  pan(g, 'v_valvulas', 'left', { from: [0.5, 0.8], to: [0.5, 0.2], zoom: 0.2 });
  chip(g, 'DE LOS PIES AL CORAZÓN', at('regresar') + 0.5, { cx: 1510, cy: 230, size: 34, fill: C.ink, color: C.white });
  chip(g, '↑ CONTRA LA GRAVEDAD', at('gravedad1'), { cx: 1510, cy: 400, size: 40, fill: C.amber });
  chip(g, 'VÁLVULAS', at('valvulas1'), { cx: 1510, cy: 570, size: 46 });
  chip(g, '+ CONTRACCIONES', at('contracciones1'), { cx: 1510, cy: 720, size: 46, fill: C.red, color: C.white });
});

// 9. when you move, the muscles squeeze the veins and push the blood up
scene(svg, at('mueves'), at('carretera'), g => {
  pan(g, 'v_bomba', 'full', { from: [0.5, 0.7], to: [0.5, 0.3] });
  flow(g, 'M960 900 L960 150', at('comprimen1'), { n: 6, period: 1.6, r: 16 });
  cap(g, 'EL MÚSCULO EMPUJA LA SANGRE ↑', at('comprimen1'), { hi: 'EMPUJA' });
}, { punch: [at('comprimen1')] });

// 10. a road with hundreds of cars: flowing…
scene(svg, at('carretera'), at('desaparece'), g => {
  pan(g, 'v_autopista', 'full', { from: [0.3, 0.6], to: [0.7, 0.4] });
  cap(g, 'TRÁFICO FLUIDO', at('fluidez'), { hi: 'FLUIDO', hiColor: '#7DE08E' });
});
// 11. …and slower when the push is gone
scene(svg, at('desaparece'), at('parecido'), g => {
  pan(g, 'v_atasco', 'full', { from: [0.7, 0.4], to: [0.35, 0.6] });
  cap(g, 'SIN IMPULSO → MÁS LENTO', at('lenta'), { hi: 'MÁS LENTO', hiColor: '#FF7A6E' });
});

// 12. the same in the leg veins — but your heart is not failing and blood keeps flowing
scene(svg, at('parecido'), at('pesadas'), g => {
  CalfPump(g, at('parecido'), { cx: 560, cy: 600, s: 0.78, mode: 'idle' });
  chip(g, 'CIRCULACIÓN MÁS LENTA', at('parecido') + 1, { cx: 1340, cy: 220, size: 42, fill: C.amber });
  const hz = obj(g, 'corazon', at('no_fallando'), { cx: 1340, cy: 520, fit: 280, idle: 'none' });
  anim(t => { const b = 1 + 0.06 * Math.pow(Math.sin(Math.PI * ((t % 0.85) / 0.85)), 8); hz.g.setAttribute('transform', `translate(1340 520) scale(${b.toFixed(4)}) translate(-1340 -520)`); });
  mark(g, 'TU CORAZÓN NO FALLA', true, at('no_fallando') + 0.6, { cx: 1340, cy: 760, size: 40 });
  mark(g, 'LA SANGRE SIGUE CIRCULANDO', true, at('no_fallando') + 2.6, { cx: 1340, cy: 900, size: 34 });
});

// 13. heavy legs at the end of the day
scene(svg, at('pesadas'), at('no_siempre'), g => {
  pan(g, 'q_pantorrilla', 'full', { from: [0.6, 0.6], to: [0.5, 0.4] });
  cap(g, 'PIERNAS PESADAS', at('pesadas') + 0.5, { hi: 'PESADAS' });
}, { punch: [at('pesadas') + 0.5] });

// 14. not always a disease — but don't ignore persistent swelling
scene(svg, at('no_siempre'), at('dolor1'), g => {
  pan(g, 'q_tobillo', 'left', { from: [0.45, 0.4], to: [0.6, 0.7] });
  chip(g, 'NO SIEMPRE ES ENFERMEDAD', at('no_siempre'), { cx: 1510, cy: 300, size: 32 });
  chip(g, 'HINCHAZÓN PERSISTENTE', at('hinchazon1'), { cx: 1510, cy: 480, size: 36, fill: C.amber });
  chip(g, '→ NO LA IGNORES', at('hinchazon1') + 1, { cx: 1510, cy: 600, size: 42, fill: C.ink, color: C.amber });
});

// 15. warning (held ≥ 6 s): pain, redness or sudden swelling in ONE leg → see a doctor
scene(svg, at('dolor1'), at('buena'), g => {
  warn(g, '¡ATENCIÓN!', ['DOLOR · ENROJECIMIENTO', 'HINCHAZÓN REPENTINA', 'EN UNA SOLA PIERNA'], at('dolor1'), { y: 120 });
  chip(g, '→ VALORACIÓN MÉDICA', at('valoracion1') - 0.3, { cx: 960, cy: 820, size: 54, fill: C.red, color: C.white });
}, { punch: [at('valoracion1')] });

// 16. good news: very simple movements break the stillness
scene(svg, at('buena'), at('uno_activa'), g => {
  pan(g, 'q_estira', 'full', { from: [0.5, 0.6], to: [0.5, 0.35] });
  cap(g, 'LA BUENA NOTICIA: MOVIMIENTOS SENCILLOS', at('buena') + 0.3, { size: 48, hi: 'SENCILLOS', hiColor: '#7DE08E' });
});

// 17. one of them switches on a deep calf muscle…
scene(svg, at('uno_activa'), at('comentarios1'), g => {
  const L = obj(g, 'pierna', at('uno_activa'), { cx: 760, cy: 540, fit: 760 });
  const glow = el('ellipse', { cx: 790, cy: 430, rx: 70, ry: 170, fill: '#FF3B1F', opacity: 0, style: 'mix-blend-mode:multiply' }, L.g);
  anim(t => set(glow, { opacity: 0.35 * clamp(prog(t, at('uno_activa') + 1, at('uno_activa') + 1.6)) * (0.7 + 0.3 * Math.sin(t * 6)) }));
  chip(g, 'UN MÚSCULO PROFUNDO', at('uno_activa') + 1.2, { cx: 1400, cy: 400, size: 46, fill: C.amber });
  wrapQ(g, at('fascinante1'), 1400, 600);
}, { punch: [at('fascinante1')] });

// 18. tell me in the comments: sofa after dinner, or a little movement?
scene(svg, at('comentarios1'), at('p2') - 0.3, g => {
  CTAlive(g, 'comment', 'CUÉNTAME EN LOS COMENTARIOS', at('comentarios1'));
  tile(g, 'n_tv', at('comentarios1') + 0.8, { x: 180, y: 120, w: 700, h: 460, label: '¿SOFÁ?' });
  tile(g, 'q_estira', at('sueles') + 1.5, { x: 1040, y: 120, w: 700, h: 460, label: '¿MOVERTE?' });
});
