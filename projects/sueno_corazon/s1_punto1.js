// PUNTO 1 — el descanso nocturno: engine metaphor, day demands, nocturnal BP dip, autonomic balance.

// 0. kicker over a peaceful sleeper
scene(svg, at('p1') - 0.3, at('cada_noche1'), g => {
  pan(g, 'z_lado', 'full', { from: [0.6, 0.45], to: [0.5, 0.4] });
  kicker(g, 'PUNTO 1', 'EL DESCANSO NOCTURNO', at('p1'));
});

// 1. deep sleep changes how the heart works — it never stops, but runs under different conditions
scene(svg, at('cada_noche1'), at('es_como'), g => {
  heart(g, at('cada_noche1'), 560, 420, 420, { period: t => 0.75 + 0.35 * prog(t, at('condiciones'), at('condiciones') + 3) });
  chip(g, 'UN CAMBIO QUE POCOS CONOCEN', at('cambio1'), { cx: 1340, cy: 250, size: 36, fill: C.ink, color: C.amber });
  mark(g, 'NO DEJA DE TRABAJAR', true, at('no_deja'), { cx: 1340, cy: 420, size: 38 });
  chip(g, 'EN OTRAS CONDICIONES', at('condiciones'), { cx: 1340, cy: 580, size: 40, fill: '#2F5F9E', color: C.white });
  ECG(g, at('cada_noche1') + 1, { x: 260, y: 780, w: 1400, h: 150, bpm: t => 76 - 18 * prog(t, at('condiciones'), at('condiciones') + 4) });
});

// 2. like an engine that lowers its revs after hundreds of kilometres
scene(svg, at('es_como'), at('ese_cambio'), g => {
  const a = pan(g, 'mo_rapido', 'left', { from: [0.4, 0.5], to: [0.5, 0.45] });
  const b = pan(g, 'mo_lento', 'left', { from: [0.5, 0.45], to: [0.5, 0.55] });
  anim(t => { const k = E.inOut(prog(t, at('motor') - 0.2, at('motor') + 0.4)); a.g.setAttribute('opacity', 1 - k); b.g.setAttribute('opacity', k); });
  gauge(g, at('es_como') + 0.5, { cx: 1510, cy: 520, r: 200, label: 'REVOLUCIONES' }, t => 0.85 - 0.6 * E.inOut(prog(t, at('motor'), at('motor') + 2.5)));
  chip(g, 'MENOS ESFUERZO', at('mismo_esfuerzo'), { cx: 1510, cy: 760, size: 40, fill: C.green, color: C.white });
});

// 3. that change protects your cardiovascular system
scene(svg, at('ese_cambio'), at('durante_dia'), g => {
  pan(g, 'mo_hamaca', 'full', { from: [0.5, 0.5], to: [0.45, 0.6] });
  cap(g, 'UNA PAUSA QUE PROTEGE TU CORAZÓN', at('ese_cambio') + 0.3, { size: 50, hi: 'PROTEGE' });
});

// 4. during the day the heart answers constant demands
scene(svg, at('durante_dia'), at('caminar1') - 0.3, g => {
  pan(g, 'mo_corazon', 'full', { from: [0.4, 0.4], to: [0.55, 0.5] });
  cap(g, 'DE DÍA: MIL EXIGENCIAS', at('durante_dia') + 0.4, { hi: 'MIL EXIGENCIAS' });
});

// 5. walking, working, stairs, arguing, worrying → pulse and pressure up
scene(svg, at('caminar1') - 0.3, at('sin_embargo1'), g => {
  [['d_compras', 'CAMINAR', 'caminar1', 90, 90], ['d_escaleras', 'ESCALERAS', 'escaleras', 980, 90], ['d_discute', 'DISCUTIR', 'discutir', 90, 520], ['d_facturas', 'PREOCUPARTE', 'preocuparte', 980, 520]]
    .forEach(([n, s, k, x, y]) => tile(g, n, at(k) - 0.3, { x, y, w: 850, h: 360, label: s, zoom: 0.14 }));
  chip(g, '↑ PULSO  ·  ↑ PRESIÓN', at('aumentar1'), { cx: 960, cy: 490, size: 46, fill: C.red, color: C.white });
}, { punch: [at('aumentar1')] });

// 6. at night, in the right sleep stages, the body can lower that activity
scene(svg, at('sin_embargo1'), at('aqui_aparece1'), g => {
  pan(g, 'z_pareja', 'full', { from: [0.6, 0.4], to: [0.45, 0.5] });
  cap(g, 'DE NOCHE: TIEMPO DE BAJAR EL RITMO', at('sin_embargo1') + 0.6, { size: 50, hi: 'BAJAR EL RITMO', hiColor: '#8FC7FF' });
});

// 7. nocturnal blood-pressure dip: about 10–20 % in many healthy people
scene(svg, at('aqui_aparece1'), at('por_que'), g => {
  chip(g, 'DESCENSO NOCTURNO DE LA PRESIÓN', at('aqui_aparece1'), { cy: 85, size: 42, fill: C.ink, color: C.white });
  const ch = Chart24(g, at('aqui_aparece1') + 0.4, { x: 300, y: 230, w: 1320, h: 520, label: 'PRESIÓN ARTERIAL' });
  ch.curve(BP_DIP, '#B5372E', at('aqui_aparece1') + 1, at('descenso1') + 4, { wd: 12 });
  const L = Live(g, { t0: at('diez'), cx: ch.X(27), cy: ch.Y(0.6), enter: 'pop', idle: 'breathe' });
  Arrow(L.g, ch.X(27), ch.Y(0.74), ch.X(27), ch.Y(0.5), '#2F5F9E', 12);
  Chip(L.g, '−10 a −20 %', { cx: ch.X(27) - 10, cy: ch.Y(0.88), size: 46, fill: C.amber });
  chip(g, 'EN MUCHAS PERSONAS SANAS', at('sanas'), { cx: 960, cy: 960, size: 36 });
  chip(g, 'NO ES IGUAL EN TODOS', at('no_ocurre'), { cx: 620, cy: 960, size: 34, fill: C.white, t1: 1e9 });
  chip(g, 'RESPUESTA FISIOLÓGICA', at('fisiologica'), { cx: 1320, cy: 960, size: 34, fill: TEAL, color: C.white });
  source(g, 'Patrón «dipper»: descenso nocturno del 10–20 % en la monitorización de 24 h (guías ESH)', at('diez') + 1);
}, { punch: [at('diez')] });

// 8. why: in deep sleep the sympathetic system quiets down, the parasympathetic gains weight, the heart slows
scene(svg, at('por_que'), at('como_consecuencia'), g => {
  chip(g, '¿POR QUÉ?', at('por_que'), { cy: 110, size: 56, fill: C.ink, color: C.amber });
  tile(g, 'a_calma', at('profundo1') - 0.5, { x: 120, y: 200, w: 520, h: 340, zoom: 0.1 });
  Seesaw(g, at('por_que') + 0.6, { cx: 1180, cy: 470, w: 940, tilt: t => -12 + 26 * E.inOut(prog(t, at('simpatico1'), at('parasimpatico') + 1)) });
  chip(g, 'SIMPÁTICO ↓', at('simpatico1') + 0.5, { cx: 860, cy: 760, size: 40, fill: '#B5372E', color: C.white });
  chip(g, 'PARASIMPÁTICO ↑', at('parasimpatico'), { cx: 1500, cy: 760, size: 40, fill: '#2F5F9E', color: C.white });
  ECG(g, at('al_mismo'), { x: 160, y: 640, w: 440, h: 150, bpm: t => 70 - 14 * prog(t, at('ritmo1') - 1, at('ritmo1') + 3) });
  chip(g, 'EL CORAZÓN SE CALMA', at('ritmo1'), { cx: 380, cy: 870, size: 34, fill: C.green, color: C.white });
});

// 9. the heart pumps against less resistance; the arteries carry less pressure
scene(svg, at('como_consecuencia'), at('pausa'), g => {
  Vessel(g, at('como_consecuencia'), { y: 430, narrow: t => 0.5 - 0.5 * E.inOut(prog(t, at('resistencia1') - 0.5, at('resistencia1') + 2)), speed: () => 0.8 });
  chip(g, 'MENOS RESISTENCIA', at('resistencia1'), { cx: 620, cy: 760, size: 44, fill: C.green, color: C.white });
  chip(g, 'MENOS PRESIÓN EN LAS ARTERIAS', at('menor_presion'), { cx: 1260, cy: 900, size: 40, fill: '#2F5F9E', color: C.white });
});

// 10. a functional pause that balances the day's effort
scene(svg, at('pausa'), at('verdadero'), g => {
  pan(g, 'mo_hamaca', 'left', { from: [0.4, 0.4], to: [0.5, 0.6] });
  chip(g, 'UNA PAUSA FUNCIONAL', at('pausa') + 0.3, { cx: 1510, cy: 380, size: 40, fill: TEAL, color: C.white });
  chip(g, 'EQUILIBRA EL ESFUERZO', at('pausa') + 2.5, { cx: 1510, cy: 540, size: 38 });
  chip(g, 'DEL DÍA', at('pausa') + 3, { cx: 1510, cy: 660, size: 38 });
});

// 11. the real problem: short, broken or fragmented sleep blunts the dip
scene(svg, at('verdadero'), at('tu_organismo'), g => {
  chip(g, 'EL VERDADERO PROBLEMA', at('verdadero'), { cy: 100, size: 50, fill: C.red, color: C.white });
  NightBar(g, at('verdadero') + 0.5, { x: 260, y: 210, w: 1400, h: 80, ticks: [0.12, 0.2, 0.33, 0.47, 0.55, 0.7, 0.82, 0.9], tA: at('repetidamente1'), gap: 0.3 });
  chip(g, 'POCAS HORAS', at('pocas_horas'), { cx: 460, cy: 400, size: 38, fill: C.amber });
  chip(g, 'DESPERTARES', at('repetidamente1'), { cx: 960, cy: 400, size: 38, fill: C.amber });
  chip(g, 'SUEÑO FRAGMENTADO', at('fragmentado'), { cx: 1460, cy: 400, size: 38, fill: C.amber });
  const ch = Chart24(g, at('fragmentado') + 0.5, { x: 520, y: 560, w: 880, h: 300 });
  ch.curve(BP_DIP, '#9AA3B5', at('fragmentado') + 0.8, at('fragmentado') + 2.3, { wd: 8 });
  ch.curve(BP_FLAT, '#B5372E', at('alterado'), at('alterado') + 2, { wd: 11 });
}, { punch: [at('alterado')] });

// 12. the body keeps reacting and can't settle into recovery
scene(svg, at('tu_organismo'), at('esto_no'), g => {
  pan(g, 'n_vueltas', 'full', { from: [0.4, 0.55], to: [0.6, 0.4] });
  cap(g, 'SIN RECUPERACIÓN ESTABLE', at('tu_organismo') + 1, { hi: 'SIN RECUPERACIÓN', hiColor: '#FF7A6E' });
});

// 13. one bad night ≠ heart disease; risk = weeks, months, years + hypertension, inactivity, stress
scene(svg, at('esto_no'), at('piensa_persona'), g => {
  mark(g, 'UNA NOCHE MALA NO CAUSA UNA ENFERMEDAD', true, at('esto_no') + 0.5, { cx: 960, cy: 120, size: 34 });
  const L = Live(g, { t0: at('semanas') - 0.4, cx: 960, cy: 430, enter: 'up', idle: 'none' });
  const cells = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 20; c++) {
    const x = 470 + c * 50, y = 290 + r * 56;
    el('circle', { cx: x, cy: y, r: 19, fill: C.ink, opacity: 0.12 }, L.g);
    cells.push(el('circle', { cx: x, cy: y, r: 19, fill: NIGHT, opacity: 0 }, L.g));
  }
  anim(t => { const n = Math.floor(cells.length * prog(t, at('semanas'), at('hipertension1'))); cells.forEach((c, i) => set(c, { opacity: i < n ? 1 : 0, fill: i % 7 === 3 ? '#FF5A4E' : NIGHT })); });
  chip(g, 'SEMANAS · MESES · AÑOS', at('semanas'), { cx: 960, cy: 620, size: 42, fill: NIGHT, color: C.white });
  chip(g, '+ HIPERTENSIÓN', at('hipertension1'), { cx: 470, cy: 800, size: 36, fill: C.amber });
  chip(g, '+ SEDENTARISMO', at('sedentarismo1'), { cx: 960, cy: 800, size: 36, fill: C.amber });
  chip(g, '+ ESTRÉS CRÓNICO', at('estres1'), { cx: 1450, cy: 800, size: 36, fill: C.amber });
});

// 14. someone who sleeps 5 h and thinks they've "got used to it"
scene(svg, at('piensa_persona'), at('todavia1'), g => {
  const ck = Clock(g, { cx: 560, cy: 470, r: 230, night: true });
  const L = Live(g, { t0: at('piensa_persona'), cx: 560, cy: 470, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(1 + 5 * E.inOut(prog(t, at('piensa_persona') + 0.5, at('piensa_persona') + 4))));
  chip(g, '5 HORAS CADA NOCHE', at('piensa_persona') + 0.6, { cx: 560, cy: 820, size: 40, fill: NIGHT, color: C.white });
  chip(g, '«YA ME ACOSTUMBRÉ»', at('acostumbrado'), { cx: 1360, cy: 300, size: 46 });
  chip(g, 'FUNCIONAL DE DÍA…', at('funcional'), { cx: 1360, cy: 460, size: 42, fill: C.white });
  stamp(g, 'NO GARANTIZA', at('no_garantiza'), { cx: 1360, cy: 650, size: 64, color: C.red });
  chip(g, 'QUE TU CORAZÓN SE RECUPERE', at('no_garantiza') + 0.8, { cx: 1360, cy: 830, size: 34 });
});

// 15. repeated interruptions trigger chemical alarm signals that act on the vessels
scene(svg, at('todavia1'), at('si_esta'), g => {
  pan(g, 'a_estrecha', 'left', { from: [0.6, 0.6], to: [0.4, 0.4] });
  chip(g, 'ALGO MÁS IMPORTANTE', at('todavia1'), { cx: 1510, cy: 260, size: 36, fill: C.ink, color: C.amber });
  chip(g, 'SEÑALES QUÍMICAS', at('quimicas') - 0.4, { cx: 1510, cy: 430, size: 42, fill: C.red, color: C.white });
  chip(g, 'DE ALERTA', at('quimicas'), { cx: 1510, cy: 550, size: 42, fill: C.red, color: C.white });
  chip(g, '→ VASOS SANGUÍNEOS', at('vasos1'), { cx: 1510, cy: 720, size: 40 });
});

// 16. like the video; next: how nocturnal stress keeps you on alert
scene(svg, at('si_esta'), at('p2') - 0.3, g => {
  tile(g, 'n_pecho', at('si_esta') + 0.3, { x: 410, y: 90, w: 1100, h: 640 });
  CTAlive(g, 'like', 'DEJA UN ME GUSTA', at('me_gusta') - 0.3);
  chip(g, 'A CONTINUACIÓN: EL ESTRÉS NOCTURNO', at('estres_nocturno') - 0.5, { cx: 960, cy: 70, size: 36, fill: C.ink, color: C.amber });
}, { punch: [at('me_gusta')] });
