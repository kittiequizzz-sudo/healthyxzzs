// INTRO (0 → Punto 1). Hook: a heart working too hard at night → 3 a.m. awake → what a good night should do.

// 0. your heart may be working harder than it should while you try to rest
scene(svg, -1, at('inquietante'), g => {
  const glow = el('circle', { cx: 960, cy: 400, r: 250, fill: C.red, opacity: 0.12 }, g);
  anim(t => set(glow, { r: 240 + 30 * Math.pow(Math.sin(Math.PI * ((t % 0.5) / 0.5)), 8) }));
  heart(g, 0, 960, 400, 420, { period: 0.5, k: 0.09 });
  ECG(g, 0.6, { x: 560, y: 650, w: 800, h: 150, bpm: () => 112 });
  cap(g, 'TU CORAZÓN, TRABAJANDO DE MÁS', 0.4, { hi: 'DE MÁS' });
}, { punch: [2.4] });

// 1. …and you may not notice anything until the next morning
scene(svg, at('inquietante'), at('tres'), g => {
  pan(g, 's_cansado', 'full', { from: [0.45, 0.35], to: [0.5, 0.5] });
  cap(g, 'SIN NOTAR NADA… HASTA LA MAÑANA', at('inquietante') + 0.6, { size: 52, hi: 'HASTA LA MAÑANA' });
});

// 2. 3 a.m.: you open your eyes and look at the clock
scene(svg, at('tres'), at('vueltas'), g => {
  pan(g, 'n_reloj', 'full', { from: [0.35, 0.5], to: [0.2, 0.55], zoom: 0.2 });
  const ck = Clock(g, { cx: 1560, cy: 230, r: 120, night: true });
  const L = Live(g, { t0: at('tres') + 0.3, cx: 1560, cy: 230, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(2.95 + 0.05 * prog(t, at('tres'), at('vueltas') + 2)));
  chip(g, '3:00 DE LA MADRUGADA', at('tres') + 0.5, { cx: 1560, cy: 420, size: 34, fill: NIGHT, color: C.white });
});
// 3. tossing and turning
scene(svg, at('vueltas'), at('cuerpo'), g => {
  pan(g, 'n_vueltas', 'full', { from: [0.6, 0.4], to: [0.4, 0.55] });
  cap(g, 'DAS VUELTAS EN LA CAMA', at('vueltas') + 0.3, { hi: 'VUELTAS' });
});
// 4. body lying down, brain still awake
scene(svg, at('cuerpo'), at('mientras0'), g => {
  pan(g, 'n_techo', 'full', { from: [0.4, 0.5], to: [0.35, 0.35] });
  cap(g, 'CUERPO TUMBADO, CEREBRO DESPIERTO', at('cuerpo') + 0.3, { size: 50, hi: 'CEREBRO DESPIERTO' });
}, { punch: [at('cerebro0')] });

// 5. alert nervous system, raised pressure, less rest for the heart
scene(svg, at('mientras0'), at('porque0'), g => {
  pan(g, 'n_pecho', 'left', { from: [0.45, 0.35], to: [0.35, 0.5] });
  chip(g, 'SISTEMA NERVIOSO EN ALERTA', at('alerta0') - 0.6, { cx: 1510, cy: 280, size: 30, fill: C.red, color: C.white });
  chip(g, 'PRESIÓN ELEVADA', at('elevada0') - 0.6, { cx: 1510, cy: 440, size: 40, fill: C.amber });
  chip(g, 'MENOS DESCANSO', at('pierde'), { cx: 1510, cy: 600, size: 40 });
  chip(g, 'PARA TU CORAZÓN', at('pierde') + 0.4, { cx: 1510, cy: 720, size: 40 });
});

// 6. sleeping is not just closing your eyes: heart rate down, pressure regulated, recovery
scene(svg, at('porque0'), at('pero_que'), g => {
  pan(g, 'z_profundo', 'left', { from: [0.3, 0.4], to: [0.4, 0.5] });
  chip(g, 'DORMIR ≠ CERRAR LOS OJOS', at('porque0') + 0.3, { cx: 960, cy: 85, size: 42, fill: C.ink, color: C.white });
  chip(g, '↓ FRECUENCIA CARDÍACA', at('frecuencia0'), { cx: 1510, cy: 300, size: 34, fill: '#2F5F9E', color: C.white });
  chip(g, 'PRESIÓN REGULADA', at('regular0'), { cx: 1510, cy: 460, size: 38, fill: TEAL, color: C.white });
  chip(g, 'RECUPERACIÓN', at('recuperacion0'), { cx: 1510, cy: 620, size: 44, fill: C.green, color: C.white });
  ECG(g, at('noche_sana'), { x: 1230, y: 730, w: 560, h: 130, bpm: t => 72 - 14 * prog(t, at('frecuencia0'), at('frecuencia0') + 4) });
});

// 7. night after night → stress hormones, arteries, long-term risk
scene(svg, at('pero_que'), at('detalle0'), g => {
  chip(g, '¿NOCHE TRAS NOCHE?', at('pero_que') + 0.3, { cy: 140, size: 54, fill: NIGHT, color: C.white });
  NightBar(g, at('pero_que') + 0.8, { x: 260, y: 300, w: 1400, ticks: [0.1, 0.22, 0.35, 0.41, 0.58, 0.7, 0.86], tA: at('noche_tras') });
  chip(g, 'HORMONAS DEL ESTRÉS', at('hormonas0'), { cx: 460, cy: 620, size: 34, fill: C.amber });
  chip(g, 'ARTERIAS', at('arterias0'), { cx: 960, cy: 620, size: 40, fill: C.red, color: C.white });
  chip(g, 'RIESGO A LARGO PLAZO', at('riesgo0'), { cx: 1460, cy: 620, size: 34, fill: C.ink, color: C.amber });
  chip(g, 'MÁS ALLÁ DEL CANSANCIO', at('respuesta0'), { cy: 840, size: 46 });
});

// 8. some believe they sleep enough — but their heart takes interruptions they barely remember
scene(svg, at('detalle0'), at('en_este'), g => {
  pan(g, 's_horas', 'left', { from: [0.5, 0.35], to: [0.55, 0.5] });
  chip(g, 'UN DETALLE SORPRENDENTE', at('detalle0') + 0.2, { cx: 1510, cy: 220, size: 32, fill: C.ink, color: C.amber });
  chip(g, '«DUERMO SUFICIENTE»', at('creen'), { cx: 1510, cy: 380, size: 40 });
  NightBar(g, at('creen') + 2, { x: 1220, y: 520, w: 580, h: 80, ticks: [0.15, 0.3, 0.42, 0.6, 0.78], tA: at('interrupciones0'), gap: 0.25 });
  chip(g, 'INTERRUPCIONES', at('interrupciones0'), { cx: 1510, cy: 720, size: 40, fill: C.red, color: C.white });
  chip(g, 'QUE APENAS RECUERDAS', at('interrupciones0') + 0.6, { cx: 1510, cy: 840, size: 34 });
});

// 9. in this video: inside your cardiovascular system · warning signs · 3 simple changes
scene(svg, at('en_este'), at('quedate'), g => {
  chip(g, 'EN ESTE VÍDEO', at('en_este'), { cy: 110, size: 50, fill: C.ink, color: C.amber });
  heart(g, at('en_este') + 1, 560, 330, 200);
  chip(g, 'TU SISTEMA CARDIOVASCULAR', at('en_este') + 1.3, { cx: 1140, cy: 330, enter: 'r', size: 40 });
  obj(g, 'tensiometro', at('senales0') - 0.3, { cx: 560, cy: 580, fit: 210, phase: 0.3 });
  chip(g, 'SEÑALES DE ATENCIÓN', at('senales0'), { cx: 1140, cy: 580, enter: 'r', size: 40, fill: C.amber });
  obj(g, 'luna', at('tres_cambios0') - 0.3, { cx: 560, cy: 830, fit: 200, phase: 0.6 });
  chip(g, '3 CAMBIOS SENCILLOS', at('tres_cambios0'), { cx: 1140, cy: 830, enter: 'r', size: 40, fill: TEAL, color: C.white });
});

// 10. stay to the end: one change you can start tonight
scene(svg, at('quedate'), at('p1') - 0.3, g => {
  obj(g, 'almohada', at('quedate') + 0.3, { cx: 960, cy: 560, fit: 520, amp: 0.6 });
  obj(g, 'luna', at('quedate') + 0.8, { cx: 1300, cy: 300, fit: 220, phase: 0.4 });
  cap(g, 'QUÉDATE HASTA EL FINAL', at('quedate'), { cy: 120, hi: 'FINAL' });
  cap(g, 'UNO, DESDE ESTA MISMA NOCHE', at('esta_noche0') - 0.6, { cy: 900, hi: 'ESTA MISMA NOCHE', hiColor: '#8FC7FF' });
}, { punch: [at('esta_noche0')] });
