// PUNTO 2 — la trampa del cortisol: sympathetic alarm, adrenaline, cortisol rhythm, vasoconstriction,
// Javier (dramatisation), non-dipping.

// 0. kicker over the alarmed brain
scene(svg, at('p2') - 0.3, at('lo_mas'), g => {
  pan(g, 'a_alarma', 'full', { from: [0.5, 0.35], to: [0.5, 0.5] });
  kicker(g, 'PUNTO 2', 'LA TRAMPA DEL CORTISOL', at('p2'));
});

// 1. the danger is what happens inside while you try to rest
scene(svg, at('lo_mas'), at('interpretar') - 1.5, g => {
  pan(g, 'c_noche', 'full', { from: [0.4, 0.5], to: [0.5, 0.4] });
  cap(g, 'LO QUE PASA MIENTRAS DESCANSAS', at('lo_mas') + 1, { size: 52, hi: 'MIENTRAS DESCANSAS', hiColor: '#8FC7FF' });
});

// 2. the brain reads the interruptions as alarm signals
scene(svg, at('interpretar') - 1.5, at('uno_prot'), g => {
  obj(g, 'cerebro', at('interpretar') - 1.3, { cx: 640, cy: 470, fit: 520, idle: 'shake' });
  const ring = el('circle', { cx: 640, cy: 460, r: 300, fill: 'none', stroke: C.red, 'stroke-width': 10 }, g);
  anim(t => { const p = (((t - at('interpretar')) % 1.2) + 1.2) % 1.2 / 1.2; set(ring, { r: 280 + 120 * p, opacity: t < at('interpretar') ? 0 : 0.8 * (1 - p) }); });
  NightBar(g, at('interpretar') - 1, { x: 1060, y: 300, w: 700, h: 80, ticks: [0.2, 0.45, 0.6, 0.85], tA: at('interpretar'), gap: 0.4 });
  chip(g, 'INTERRUPCIONES', at('interpretar'), { cx: 1410, cy: 500, size: 42, fill: C.amber });
  chip(g, '= SEÑALES DE ALERTA', at('interpretar') + 1.5, { cx: 1410, cy: 640, size: 42, fill: C.red, color: C.white });
});

// 3. the sympathetic nervous system: gets you ready for stress
scene(svg, at('uno_prot'), at('cuando_activa'), g => {
  Seesaw(g, at('uno_prot'), { cx: 960, cy: 520, w: 1000, tilt: t => 4 - 18 * E.inOut(prog(t, at('uno_prot') + 1, at('uno_prot') + 3)) });
  chip(g, 'EL PROTAGONISTA: EL SIMPÁTICO', at('uno_prot') + 0.5, { cy: 120, size: 44, fill: '#B5372E', color: C.white });
  chip(g, 'PREPARA AL CUERPO PARA EL ESTRÉS', at('uno_prot') + 4, { cy: 880, size: 40 });
});

// 4. adrenaline → faster heart, higher pressure
scene(svg, at('cuando_activa'), at('ademas2'), g => {
  pan(g, 'a_adrenalina', 'left', { from: [0.5, 0.35], to: [0.5, 0.6] });
  chip(g, 'ADRENALINA', at('adrenalina'), { cx: 1510, cy: 250, size: 56, fill: C.red, color: C.white });
  ECG(g, at('acelerar') - 0.5, { x: 1240, y: 360, w: 540, h: 140, bpm: t => 68 + 40 * prog(t, at('acelerar'), at('acelerar') + 2) });
  chip(g, '↑ PULSO', at('acelerar'), { cx: 1400, cy: 620, size: 44, fill: C.amber });
  chip(g, '↑ PRESIÓN', at('acelerar') + 1.4, { cx: 1620, cy: 740, size: 44, fill: C.amber });
}, { punch: [at('adrenalina')] });

// 5. lack of sleep can disturb cortisol, the stress hormone
scene(svg, at('ademas2'), at('el_cortisol'), g => {
  obj(g, 'rinon', at('ademas2'), { cx: 620, cy: 520, fit: 520 });
  const gl = el('circle', { cx: 640, cy: 330, r: 110, fill: C.amber, opacity: 0, style: 'mix-blend-mode:multiply' }, g);
  anim(t => set(gl, { opacity: t < at('cortisol2') ? 0 : 0.35 + 0.15 * Math.sin(t * 5), r: 110 + 10 * Math.sin(t * 5) }));
  chip(g, 'CORTISOL', at('cortisol2'), { cx: 1340, cy: 380, size: 70, fill: TEAL, color: C.white });
  chip(g, 'LA HORMONA DEL ESTRÉS', at('cortisol2') + 1.5, { cx: 1340, cy: 560, size: 40 });
  chip(g, 'SE DESREGULA SI DUERMES MAL', at('cortisol2') + 3.5, { cx: 1340, cy: 710, size: 34, fill: C.amber });
});

// 6. cortisol isn't bad: it's essential
scene(svg, at('el_cortisol'), at('normalmente'), g => {
  pan(g, 'c_amanecer', 'left', { from: [0.3, 0.5], to: [0.45, 0.4] });
  mark(g, 'NO ES PERJUDICIAL', true, at('el_cortisol') + 0.5, { cx: 1510, cy: 380, size: 40 });
  mark(g, 'ES IMPRESCINDIBLE', true, at('imprescindible'), { cx: 1510, cy: 560, size: 40 });
});

// 7. daily rhythm: rises before waking, falls at night — and drifts up at night when sleep is short
scene(svg, at('normalmente'), at('piensa2'), g => {
  chip(g, 'EL RITMO DIARIO DEL CORTISOL', at('normalmente'), { cy: 85, size: 42, fill: TEAL, color: C.white });
  const ch = Chart24(g, at('normalmente') + 0.3, { x: 300, y: 230, w: 1320, h: 520, label: 'CORTISOL' });
  ch.curve(CORT, TEAL, at('normalmente') + 0.8, at('disminuir_noche') + 1.5, { wd: 12 });
  ch.curve(CORT_BAD, '#B5372E', at('alterarse') - 0.5, at('alterarse') + 2, { wd: 10 });
  chip(g, 'SUBE ANTES DE DESPERTAR', at('despertarnos'), { cx: 1340, cy: 300, size: 32, fill: C.white });
  chip(g, 'BAJA POR LA NOCHE', at('disminuir_noche'), { cx: 1000, cy: 700, size: 32, fill: '#2F5F9E', color: C.white });
  chip(g, 'SI DUERMES MAL: SE DESEQUILIBRA', at('alterarse'), { cx: 960, cy: 960, size: 40, fill: C.red, color: C.white });
}, { punch: [at('alterarse')] });

// 8. alarm system too active → vessels constrict → more resistance
scene(svg, at('piensa2'), at('como_consec2'), g => {
  Vessel(g, at('piensa2'), { y: 470, narrow: t => 0.85 * E.inOut(prog(t, at('contraerse') - 0.3, at('contraerse') + 1.8)), speed: t => 1 - 0.55 * prog(t, at('contraerse'), at('contraerse') + 2) });
  chip(g, 'LAS ARTERIAS SE ADAPTAN', at('piensa2') + 1, { cy: 120, size: 44 });
  chip(g, 'ALERTA → SE CONTRAEN', at('contraerse') - 0.3, { cx: 600, cy: 830, size: 42, fill: C.red, color: C.white });
  chip(g, 'MÁS RESISTENCIA', at('mayor_resistencia'), { cx: 1350, cy: 830, size: 42, fill: C.amber });
});

// 9. the heart has to push harder
scene(svg, at('como_consec2'), at('javier'), g => {
  pan(g, 'a_estrecha', 'full', { from: [0.3, 0.4], to: [0.5, 0.5] });
  cap(g, 'EL CORAZÓN EMPUJA MÁS FUERTE', at('como_consec2') + 0.5, { hi: 'MÁS FUERTE', hiColor: '#FF7A6E' });
});

// 10–14. Javier, 52 (dramatisation)
scene(svg, at('javier'), at('sin_embargo_j'), g => {
  const a = pan(g, 'j_camina', 'left', { from: [0.45, 0.35], to: [0.5, 0.45] });
  const b = pan(g, 'j_cocina', 'left', { from: [0.4, 0.4], to: [0.55, 0.5] });
  anim(t => { const k = E.inOut(prog(t, at('ultraprocesados') - 0.3, at('ultraprocesados') + 0.3)); a.g.setAttribute('opacity', 1 - k); b.g.setAttribute('opacity', k); });
  tag(g, 'DRAMATIZACIÓN', at('javier'), { x: 100, y: 80 });
  chip(g, 'JAVIER, 52 AÑOS', at('javier') + 0.4, { cx: 1510, cy: 230, size: 48, fill: C.ink, color: C.white });
  mark(g, 'CAMINA A DIARIO', true, at('camina2'), { cx: 1510, cy: 400, size: 34 });
  mark(g, 'SIN ULTRAPROCESADOS', true, at('ultraprocesados'), { cx: 1510, cy: 540, size: 34 });
  mark(g, 'PESO SALUDABLE', true, at('peso'), { cx: 1510, cy: 680, size: 34 });
});
scene(svg, at('sin_embargo_j'), at('algunas_mananas'), g => {
  pan(g, 'j_noche', 'full', { from: [0.4, 0.4], to: [0.35, 0.3] });
  tag(g, 'DRAMATIZACIÓN', at('sin_embargo_j') - 1, { x: 240, y: 90 });
  cap(g, 'MESES DESPERTÁNDOSE DE MADRUGADA', at('sin_embargo_j') + 0.4, { size: 50, hi: 'DE MADRUGADA', hiColor: '#8FC7FF' });
});
scene(svg, at('algunas_mananas'), at('javier_piensa'), g => {
  pan(g, 'j_pulso', 'left', { from: [0.5, 0.35], to: [0.45, 0.6] });
  tag(g, 'DRAMATIZACIÓN', at('algunas_mananas') - 1, { x: 100, y: 80 });
  ECG(g, at('pulso') - 0.4, { x: 1240, y: 270, w: 540, h: 150, bpm: () => 98 });
  chip(g, 'PULSO ACELERADO', at('pulso'), { cx: 1510, cy: 520, size: 40, fill: C.red, color: C.white });
  chip(g, 'AGOTAMIENTO', at('agotamiento'), { cx: 1510, cy: 660, size: 44, fill: C.amber });
});
scene(svg, at('javier_piensa'), at('sus_sintomas'), g => {
  tile(g, 'd_facturas', at('javier_piensa') + 0.2, { x: 120, y: 160, w: 680, h: 440, label: '¿EL TRABAJO?' });
  NightBar(g, at('fragmentacion2') - 1, { x: 900, y: 230, w: 880, h: 80, ticks: [0.12, 0.3, 0.44, 0.62, 0.8], tA: at('fragmentacion2'), gap: 0.3 });
  chip(g, 'SUEÑO FRAGMENTADO', at('fragmentacion2'), { cx: 1340, cy: 450, size: 40, fill: C.amber });
  arrow(g, 1340, 520, 1340, 600, at('fragmentacion2') + 1.5, { color: C.red });
  chip(g, 'SISTEMA NERVIOSO DEMASIADO ACTIVO', at('fragmentacion2') + 2, { cx: 1340, cy: 690, size: 32, fill: C.red, color: C.white });
  chip(g, 'EL ESTRÉS INFLUYE…', at('trabajo') + 1, { cx: 460, cy: 760, size: 36 });
});
scene(svg, at('sus_sintomas'), at('aqui_aparece2'), g => {
  pan(g, 'c_medica', 'full', { from: [0.35, 0.4], to: [0.5, 0.5] });
  chip(g, 'NO ES UN DIAGNÓSTICO', at('sus_sintomas') + 0.5, { cx: 960, cy: 130, size: 40, fill: C.white });
  cap(g, 'CONSULTA SI SE REPITE', at('consultar2') - 0.5, { hi: 'CONSULTA' });
});

// 15. some people don't dip at night: "non-dipping", seen on 24-h ambulatory monitoring → higher risk
scene(svg, at('aqui_aparece2'), at('este_patron') + 2.5, g => {
  chip(g, 'SIN DESCENSO NOCTURNO', at('aqui_aparece2') + 0.3, { cy: 85, size: 44, fill: C.red, color: C.white });
  const ch = Chart24(g, at('aqui_aparece2') + 0.6, { x: 300, y: 230, w: 1320, h: 520, label: 'PRESIÓN ARTERIAL' });
  ch.curve(BP_DIP, '#9AA3B5', at('aqui_aparece2') + 1, at('aqui_aparece2') + 2.5, { wd: 8 });
  ch.curve(BP_FLAT, '#B5372E', at('algunas_personas2') + 1, at('algunas_personas2') + 4, { wd: 12 });
  chip(g, 'NORMAL: BAJA', at('aqui_aparece2') + 2.4, { cx: 680, cy: 960, size: 34, fill: '#9AA3B5', color: C.white });
  chip(g, '«NON-DIPPING»: NO BAJA', at('este_patron'), { cx: 1250, cy: 960, size: 34, fill: '#B5372E', color: C.white });
}, { punch: [at('este_patron')] });
scene(svg, at('este_patron') + 2.5, at('pero_todavia'), g => {
  pan(g, 'c_mapa', 'left', { from: [0.3, 0.5], to: [0.2, 0.6] });
  chip(g, 'HOLTER DE PRESIÓN 24 H', at('monitorizacion'), { cx: 1510, cy: 300, size: 34, fill: C.white });
  chip(g, '(MAPA)', at('monitorizacion') + 0.5, { cx: 1510, cy: 410, size: 34 });
  chip(g, '↑ RIESGO', at('mayor_riesgo2'), { cx: 1510, cy: 580, size: 52, fill: C.red, color: C.white });
  chip(g, 'CARDIOVASCULAR', at('mayor_riesgo2') + 0.4, { cx: 1510, cy: 700, size: 40, fill: C.red, color: C.white });
});

// 16. less visible: inflammation of the arteries' delicate lining — a story worth attention
scene(svg, at('pero_todavia'), at('si_quieres'), g => {
  pan(g, 'r_inflamada', 'full', { from: [0.3, 0.5], to: [0.7, 0.45] });
  chip(g, 'UNA CONSECUENCIA MENOS VISIBLE', at('pero_todavia') + 0.3, { cx: 960, cy: 130, size: 40, fill: C.ink, color: C.amber, t1: at('inflamatorios2') });
  cap(g, 'INFLAMACIÓN EN EL INTERIOR DE LAS ARTERIAS', at('inflamatorios2'), { size: 46, hi: 'INFLAMACIÓN', hiColor: '#FF7A6E' });
});

// 17. subscribe + bell
scene(svg, at('si_quieres'), at('p3') - 0.3, g => {
  tile(g, 'm_escucha', at('si_quieres') + 0.2, { x: 410, y: 90, w: 1100, h: 640 });
  chip(g, 'CIENCIA EXPLICADA FÁCIL', at('si_quieres') + 0.8, { cx: 960, cy: 70, size: 38, fill: C.amber });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y ACTIVA LA CAMPANITA', at('suscribete') - 0.4);
}, { punch: [at('campanita')] });
