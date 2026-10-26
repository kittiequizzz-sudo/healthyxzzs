// CONCLUSIÓN — tonight, recap, never too late, comments, subscribe/share, disclaimer + red flags, close.

// 0. tonight, when you switch off the light: your heart keeps working for you
scene(svg, at('concl') - 0.3, at('pero_calidad'), g => {
  pan(g, 'z_lado', 'full', { from: [0.55, 0.45], to: [0.45, 0.4] });
  cap(g, 'ESTA NOCHE, AL APAGAR LA LUZ…', at('concl') + 0.3, { t1: at('mientras_tu') });
  cap(g, 'TU CORAZÓN SIGUE TRABAJANDO', at('mientras_tu'), { hi: 'SIGUE TRABAJANDO', hiColor: '#FF8A7E' });
});

// 1. the quality of your sleep changes how hard it has to work
scene(svg, at('pero_calidad'), at('hoy'), g => {
  const a = pan(g, 'mo_corazon', 'left', { from: [0.4, 0.4], to: [0.5, 0.45] });
  const b = pan(g, 'mo_hamaca', 'left', { from: [0.4, 0.5], to: [0.5, 0.55] });
  anim(t => { const k = E.inOut(prog(t, at('pero_calidad') + 2.5, at('pero_calidad') + 3.1)); a.g.setAttribute('opacity', 1 - k); b.g.setAttribute('opacity', k); });
  chip(g, 'LA CALIDAD DE TU SUEÑO', at('pero_calidad') + 0.3, { cx: 1510, cy: 380, size: 34, fill: NIGHT, color: C.white });
  chip(g, 'MARCA LA DIFERENCIA', at('pero_calidad') + 1.8, { cx: 1510, cy: 520, size: 38, fill: C.green, color: C.white });
});

// 2. recap — good sleep: pressure falls, alert lowers, recovery mechanisms
scene(svg, at('hoy'), at('tambien_c'), g => {
  chip(g, 'DORMIR BIEN ≠ SOLO ACUMULAR HORAS', at('hoy') + 0.5, { cy: 110, size: 42, fill: C.ink, color: C.white });
  const ch = Chart24(g, at('durante_c') - 0.5, { x: 220, y: 280, w: 820, h: 400, label: 'PRESIÓN' });
  ch.curve(BP_DIP, '#2F5F9E', at('presion_c') - 0.5, at('presion_c') + 2.5, { wd: 10 });
  mark(g, 'LA PRESIÓN BAJA', true, at('presion_c'), { cx: 1460, cy: 360, size: 38 });
  mark(g, 'MENOS ALERTA', true, at('nervioso_c'), { cx: 1460, cy: 520, size: 38 });
  mark(g, 'RECUPERACIÓN', true, at('mecanismos_c'), { cx: 1460, cy: 680, size: 38 });
});

// 3. recap — sleeping badly: stress hormones, inflammation, arteries; apnoea interrupts breathing
scene(svg, at('tambien_c'), at('pero_quiero'), g => {
  tile(g, 'c_noche', at('hormonas_c') - 0.3, { x: 80, y: 150, w: 560, h: 370, label: 'HORMONAS DEL ESTRÉS' });
  tile(g, 'r_inflamada', at('inflamatorios_c') - 0.3, { x: 680, y: 150, w: 560, h: 370, label: 'INFLAMACIÓN' });
  tile(g, 'a_estrecha', at('arterias_c') - 0.3, { x: 1280, y: 150, w: 560, h: 370, label: 'ARTERIAS' });
  tile(g, 'v_cerrada', at('y_que') + 0.5, { x: 580, y: 630, w: 760, h: 380, label: 'APNEA DEL SUEÑO' });
});

// 4. never too late; no perfect night needed; build habits and keep them
scene(svg, at('pero_quiero'), at('ahora_c'), g => {
  pan(g, 'z_despierta', 'full', { from: [0.45, 0.5], to: [0.5, 0.35] });
  cap(g, 'NUNCA ES DEMASIADO TARDE', at('nunca'), { cy: 120, hi: 'NUNCA', hiColor: '#7DE08E' });
  cap(g, 'HÁBITOS + CONSTANCIA', at('perfecta') + 1, { hi: 'CONSTANCIA' });
}, { punch: [at('nunca')] });

// 5. how many hours do you sleep? rested or not? write it in the comments
scene(svg, at('ahora_c'), at('si_este'), g => {
  [[520, 300, 1.6], [960, 250, 2], [1400, 300, 1.6]].forEach(([x, y, s], i) => {
    const B = Live(g, { t0: at('ahora_c') + i * 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    Icon.bubble(B.g, x - 50 * s, y - 50 * s, s);
  });
  chip(g, '¿CUÁNTAS HORAS DUERMES?', at('cuantas_c'), { cx: 960, cy: 480, size: 52, fill: NIGHT, color: C.white });
  chip(g, '¿TE DESPIERTAS DESCANSADO?', at('descansado'), { cx: 960, cy: 630, size: 46, fill: C.white });
  CTAlive(g, 'comment', 'ESCRÍBELO EN LOS COMENTARIOS', at('escribelo') - 0.3);
});

// 6. subscribe, bell, share with someone who sleeps little
scene(svg, at('si_este'), at('recuerda_c'), g => {
  tile(g, 'n_techo', at('si_este') + 0.2, { x: 460, y: 80, w: 1000, h: 560 });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y ACTIVA LA CAMPANITA', at('suscribete_c') - 0.3, { y: 700 });
  chip(g, 'COMPÁRTELO CON QUIEN DUERME POCO', at('compartelo'), { cy: 950, size: 40, fill: C.amber });
}, { punch: [at('suscribete_c')] });

// 7. disclaimer + when to see a professional (≥ 6 s) + emergency (112)
scene(svg, at('recuerda_c'), at('porque_c'), g => {
  warn(g, 'INFORMACIÓN EDUCATIVA', ['NO SUSTITUYE UNA VALORACIÓN MÉDICA'], at('recuerda_c'), { y: 50, w: 1500, size: 40 });
  tile(g, 'm_charla', at('recuerda_c') + 1.2, { x: 90, y: 360, w: 760, h: 470 });
  chip(g, 'PALPITACIONES PERSISTENTES', at('palpitaciones'), { cx: 1380, cy: 400, size: 32 });
  chip(g, '¿SOSPECHAS APNEA?', at('apnea_c'), { cx: 1380, cy: 510, size: 36 });
  chip(g, 'CANSANCIO INEXPLICABLE', at('cansancio_c'), { cx: 1380, cy: 620, size: 34 });
  chip(g, '→ PROFESIONAL SANITARIO', at('cansancio_c') + 1.5, { cx: 1380, cy: 730, size: 36, fill: TEAL, color: C.white });
  chip(g, 'DOLOR TORÁCICO INTENSO · AHOGO → 112', at('ante_c'), { cx: 960, cy: 940, size: 44, fill: C.red, color: C.white });
});

// 8. protecting your heart also starts every night
scene(svg, at('porque_c'), END + 1, g => {
  pan(g, 'z_pareja', 'full', { from: [0.4, 0.45], to: [0.5, 0.35] });
  obj(g, 'luna', at('tambien_noche') - 0.5, { cx: 1560, cy: 190, fit: 200, phase: 0.2 });
  cap(g, 'TAMBIÉN COMIENZA CADA NOCHE', at('tambien_noche'), { size: 60, hi: 'CADA NOCHE', hiColor: '#8FC7FF' });
}, { fade: 0.5 });
