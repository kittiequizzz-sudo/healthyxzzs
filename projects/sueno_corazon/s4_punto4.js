// PUNTO 4 — apnea del sueño: airway collapse, oxygen drop, alarm cascade, symptoms, diagnosis, CPAP.

// Breathing trace on a dark strip that flattens while stopped(t) is true; returns the Live wrapper.
function BreathTrace(g, t0, { x = 260, y = 300, w = 1400, h = 260, stopped = () => false } = {}) {
  const L = Live(g, { t0, cx: x + w / 2, cy: y + h / 2, enter: 'up', idle: 'none' });
  Card(L.g, { x, y, w, h, fill: NIGHT, r: 30 });
  const p = el('path', { fill: 'none', stroke: '#8FC7FF', 'stroke-width': 10, 'stroke-linecap': 'round' }, L.g);
  anim(t => {
    let d = '';
    for (let px = x + 40; px <= x + w - 40; px += 8) {
      const age = (x + w - 40 - px) / 260, s = t - age;   // the right edge is "now"
      const amp = stopped(s) ? 4 : h * 0.32;
      d += (px === x + 40 ? 'M' : 'L') + px + ' ' + (y + h / 2 - amp * Math.sin(s * 1.6)).toFixed(1);
    }
    set(p, { d });
  });
  return L;
}

// 0. kicker over the snoring man
scene(svg, at('p4') - 0.3, at('existe4'), g => {
  pan(g, 'p_ronca', 'full', { from: [0.3, 0.4], to: [0.45, 0.45] });
  kicker(g, 'PUNTO 4', 'APNEA DEL SUEÑO', at('p4'));
});

// 1. a problem that may hit your heart every night without you knowing
scene(svg, at('existe4'), at('acostarte'), g => {
  heart(g, at('existe4'), 760, 470, 380, { period: 0.6 });
  obj(g, 'luna', at('existe4') + 0.5, { cx: 1220, cy: 320, fit: 240, phase: 0.3 });
  chip(g, 'CADA NOCHE…', at('existe4') + 0.4, { cx: 1300, cy: 600, size: 48, fill: NIGHT, color: C.white });
  chip(g, '…SIN QUE LO SEPAS', at('existe4') + 2.5, { cx: 1300, cy: 730, size: 44, fill: C.red, color: C.white });
});

// 2. eight hours in bed and you still wake up exhausted
scene(svg, at('acostarte'), at('la_explicacion'), g => {
  const ck = Clock(g, { cx: 560, cy: 470, r: 230, night: true });
  const L = Live(g, { t0: at('acostarte'), cx: 560, cy: 470, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(23 + 8 * E.inOut(prog(t, at('acostarte') + 0.3, at('ocho') + 2))));
  chip(g, 'TE ACUESTAS TEMPRANO', at('acostarte') + 0.3, { cx: 1340, cy: 300, size: 40 });
  chip(g, '8 HORAS EN LA CAMA', at('ocho'), { cx: 1340, cy: 460, size: 44, fill: NIGHT, color: C.white });
  chip(g, 'Y DESPIERTAS AGOTADO', at('agotado') - 0.3, { cx: 1340, cy: 620, size: 44, fill: C.red, color: C.white });
}, { punch: [at('agotado')] });

// 3. not how long you sleep, but how you breathe
scene(svg, at('la_explicacion'), at('hablamos'), g => {
  pan(g, 'v_abierta', 'left', { from: [0.3, 0.3], to: [0.45, 0.55] });
  chip(g, 'NO CUÁNTO DUERMES…', at('la_explicacion') + 1.5, { cx: 1510, cy: 380, size: 40 });
  chip(g, '…SINO CÓMO RESPIRAS', at('respiracion4') - 0.5, { cx: 1510, cy: 540, size: 40, fill: C.blue, color: C.white });
});

// 4. obstructive sleep apnoea: the airway narrows or blocks again and again
scene(svg, at('hablamos'), at('cuando_ocurre'), g => {
  pan(g, 'v_cerrada', 'full', { from: [0.3, 0.3], to: [0.45, 0.45], zoom: 0.22 });
  cap(g, 'APNEA OBSTRUCTIVA DEL SUEÑO', at('hablamos') + 0.4, { cy: 130, hi: 'APNEA' });
  cap(g, 'LA VÍA AÉREA SE CIERRA', at('estrechan'), { hi: 'SE CIERRA', hiColor: '#FF7A6E' });
});

// 5. air stops for several seconds while the breathing muscles keep trying
scene(svg, at('cuando_ocurre'), at('y_aqui4'), g => {
  const stopA = at('segundos4') - 0.5;
  BreathTrace(g, at('cuando_ocurre'), { y: 240, stopped: s => s > stopA && s < stopA + 8 });
  const sw = Stopwatch(g, { cx: 960, cy: 720, r: 110, total: 10 });
  const L = Live(g, { t0: stopA, cx: 960, cy: 720, idle: 'bob' });
  L.g.appendChild(sw.g);
  anim(t => sw.draw(clamp(t - stopA, 0, 10)));
  chip(g, 'EL AIRE NO PASA', at('segundos4'), { cx: 460, cy: 720, size: 42, fill: C.red, color: C.white });
  chip(g, 'LOS MÚSCULOS SIGUEN INTENTANDO', at('musculos4'), { cx: 1460, cy: 720, size: 30, fill: C.amber });
});

// 6. here starts a reaction that matters for your heart
scene(svg, at('y_aqui4'), at('cuando_resp'), g => {
  heart(g, at('y_aqui4'), 960, 450, 420, { period: 0.7 });
  const ring = el('circle', { cx: 960, cy: 440, r: 260, fill: 'none', stroke: C.red, 'stroke-width': 10 }, g);
  anim(t => { const p = (((t - at('y_aqui4')) % 1.1) + 1.1) % 1.1 / 1.1; set(ring, { r: 250 + 100 * p, opacity: 0.8 * (1 - p) }); });
  cap(g, 'UNA REACCIÓN EN TU CORAZÓN', at('y_aqui4') + 0.6, { hi: 'TU CORAZÓN' });
});

// 7. breathing stops → blood oxygen can fall
scene(svg, at('cuando_resp'), at('el_cerebro'), g => {
  pan(g, 'v_oxigeno', 'left', { from: [0.2, 0.5], to: [0.7, 0.5] });
  const L = Live(g, { t0: at('oxigeno4') - 0.3, cx: 1510, cy: 420, enter: 'r', idle: 'none' });
  Text(L.g, 'OXÍGENO EN SANGRE', { x: 1510, y: 300, size: 34 });
  const b = Bar(L.g, { x: 1270, y: 340, w: 480, h: 80, color: C.blue });
  anim(t => b.draw(0.95 - 0.45 * E.inOut(prog(t, at('oxigeno4'), at('oxigeno4') + 3))));
  chip(g, '↓ OXÍGENO', at('oxigeno4') + 1, { cx: 1510, cy: 540, size: 52, fill: C.red, color: C.white });
});

// 8. the brain sets off emergency mechanisms
scene(svg, at('el_cerebro'), at('como_resp'), g => {
  pan(g, 'v_alarma', 'full', { from: [0.4, 0.5], to: [0.55, 0.45] });
  cap(g, 'EL CEREBRO ACTIVA LA EMERGENCIA', at('el_cerebro') + 0.4, { hi: 'EMERGENCIA', hiColor: '#FF7A6E' });
}, { punch: [at('el_cerebro') + 0.4] });

// 9. sympathetic surge, sudden pressure spikes, faster heartbeat
scene(svg, at('como_resp'), at('lo_mas_preoc'), g => {
  Seesaw(g, at('como_resp'), { cx: 560, cy: 520, w: 820, tilt: t => -16 * E.inOut(prog(t, at('como_resp') + 0.5, at('como_resp') + 2)) });
  gauge(g, at('subidas') - 0.5, { cx: 1420, cy: 470, r: 180, label: 'PRESIÓN' }, t => 0.35 + 0.55 * E.out(prog(t, at('subidas'), at('subidas') + 0.8)) - 0.15 * prog(t, at('subidas') + 1.5, at('subidas') + 4));
  ECG(g, at('acelerar4') - 0.6, { x: 1130, y: 640, w: 580, h: 150, bpm: t => 66 + 50 * prog(t, at('acelerar4'), at('acelerar4') + 1.5) });
  chip(g, 'SUBIDAS BRUSCAS', at('subidas'), { cx: 1420, cy: 160, size: 40, fill: C.red, color: C.white });
});

// 10. repeated dozens of times a night, each with a micro-awakening you won't remember
scene(svg, at('lo_mas_preoc'), at('por_eso4'), g => {
  NightBar(g, at('lo_mas_preoc'), { x: 160, y: 330, w: 1600, h: 110, ticks: Array.from({ length: 34 }, (_, i) => (i + 0.5 * Math.sin(i * 7)) / 34), tA: at('decenas') - 1, gap: 0.12 });
  const cnt = CountUp(g, { x: 960, y: 640, size: 150, color: C.red, suffix: '' });
  const L = Live(g, { t0: at('decenas') - 1, cx: 960, cy: 640, enter: 'pop', idle: 'breathe' });
  L.g.appendChild(cnt.g);
  anim(t => cnt.draw(34 * clamp(prog(t, at('decenas') - 1, at('decenas') - 1 + 34 * 0.12))));
  chip(g, 'EPISODIOS EN UNA NOCHE', at('decenas') + 0.5, { cx: 960, cy: 780, size: 40, fill: C.ink, color: C.white });
  chip(g, 'MICRODESPERTARES QUE NO RECUERDAS', at('cada_episodio'), { cx: 960, cy: 920, size: 38, fill: C.amber });
  source(g, 'Cifra ilustrativa: en la apnea moderada o grave puede haber más de 15 episodios por hora', at('decenas') + 2);
});

// 11. so some people believe they sleep deeply
scene(svg, at('por_eso4'), at('con_el_tiempo'), g => {
  pan(g, 'z_profundo', 'full', { from: [0.3, 0.4], to: [0.4, 0.5] });
  cap(g, '«DUERMO PROFUNDAMENTE»…', at('por_eso4') + 0.6, { hi: 'PROFUNDAMENTE', t1: at('por_eso4') + 4.5 });
  cap(g, '…PERO SU DESCANSO SE INTERRUMPE', at('por_eso4') + 4.5, { size: 50, hi: 'SE INTERRUMPE', hiColor: '#FF7A6E' });
});

// 12. over time: less oxygen + fragmented sleep + nervous activation → hypertension
scene(svg, at('con_el_tiempo'), at('ademas4'), g => {
  chip(g, 'CON EL TIEMPO', at('con_el_tiempo'), { cy: 110, size: 48, fill: C.ink, color: C.amber });
  chip(g, '↓ OXÍGENO', at('con_el_tiempo') + 2, { cx: 420, cy: 340, size: 42, fill: C.blue, color: C.white });
  chip(g, 'SUEÑO FRAGMENTADO', at('fragmentacion4'), { cx: 960, cy: 340, size: 38, fill: NIGHT, color: C.white });
  chip(g, 'ACTIVACIÓN NERVIOSA', at('activacion4'), { cx: 1500, cy: 340, size: 38, fill: '#B5372E', color: C.white });
  [420, 960, 1500].forEach((x, i) => arrow(g, x, 410, 960 + (x - 960) * 0.2, 560, at('hipertension4') - 0.8 + i * 0.15, { color: C.ink, w: 10 }));
  obj(g, 'tensiometro', at('hipertension4') - 0.3, { cx: 760, cy: 720, fit: 260 });
  chip(g, 'HIPERTENSIÓN', at('hipertension4'), { cx: 1150, cy: 720, size: 56, fill: C.red, color: C.white });
}, { punch: [at('hipertension4')] });

// 13. higher risk of rhythm problems, especially atrial fibrillation
scene(svg, at('ademas4'), at('pero_como'), g => {
  heart(g, at('ademas4'), 520, 460, 400, { period: t => 0.55 + 0.35 * Math.abs(Math.sin(t * 2.3)) });
  ECG(g, at('ademas4') + 1, { x: 860, y: 300, w: 900, h: 200, bpm: () => 96, irregular: true });
  chip(g, 'RITMO IRREGULAR', at('ademas4') + 2, { cx: 1310, cy: 600, size: 44, fill: C.amber });
  chip(g, 'FIBRILACIÓN AURICULAR', at('fibrilacion'), { cx: 1310, cy: 740, size: 44, fill: C.red, color: C.white });
  source(g, 'Apnea obstructiva, hipertensión y fibrilación auricular: Peppard, NEJM 2000 · Gami, Circulation 2004', at('fibrilacion'));
});

// 14. how to suspect it: loud habitual snoring, pauses seen by someone else, gasping
scene(svg, at('pero_como'), at('tambien4'), g => {
  const a = pan(g, 'p_ronca', 'left', { from: [0.25, 0.4], to: [0.6, 0.4] });
  const b = pan(g, 'p_jadeo', 'left', { from: [0.45, 0.35], to: [0.5, 0.4] });
  anim(t => { const k = E.inOut(prog(t, at('jadeos') - 0.3, at('jadeos') + 0.3)); a.g.setAttribute('opacity', 1 - k); b.g.setAttribute('opacity', k); });
  chip(g, '¿CÓMO SOSPECHARLO?', at('pero_como'), { cx: 1510, cy: 220, size: 36, fill: C.ink, color: C.amber });
  chip(g, 'RONQUIDOS FUERTES', at('ronquidos'), { cx: 1510, cy: 380, size: 38, fill: C.amber });
  chip(g, 'PAUSAS AL RESPIRAR', at('pausas_resp'), { cx: 1510, cy: 530, size: 38, fill: C.amber });
  chip(g, 'JADEOS, AHOGO', at('jadeos'), { cx: 1510, cy: 680, size: 38, fill: C.red, color: C.white });
});

// 15. daytime sleepiness, morning headache, poor concentration, waking up choking
scene(svg, at('tambien4'), at('sin_embargo4'), g => {
  [['p_siesta', 'SOMNOLENCIA DE DÍA', 'somnolencia', 90, 90], ['p_cabeza', 'DOLOR DE CABEZA', 'cabeza', 980, 90], ['d_facturas', 'CONCENTRACIÓN', 'concentracion', 90, 520], ['p_jadeo', 'SENSACIÓN DE ASFIXIA', 'asfixia', 980, 520]]
    .forEach(([n, s, k, x, y]) => tile(g, n, at(k) - 0.4, { x, y, w: 850, h: 360, label: s, zoom: 0.14 }));
});

// 16. not every snorer has apnoea, and some with apnoea barely snore
scene(svg, at('sin_embargo4'), at('si_reconoces'), g => {
  chip(g, 'OJO', at('sin_embargo4'), { cy: 140, size: 56, fill: C.amber });
  mark(g, 'NO TODOS LOS QUE RONCAN TIENEN APNEA', false, at('sin_embargo4') + 0.6, { cx: 960, cy: 400, size: 38 });
  mark(g, 'ALGUNOS CON APNEA APENAS RONCAN', false, at('apenas_roncan') + 0.5, { cx: 960, cy: 620, size: 38 });
});

// 17. several signs → see your doctor; sleep study; effective treatments such as CPAP
scene(svg, at('si_reconoces'), at('y_recuerda4'), g => {
  const a = pan(g, 'm_estudio', 'left', { from: [0.3, 0.4], to: [0.45, 0.5] });
  const b = pan(g, 'm_cpap', 'left', { from: [0.3, 0.45], to: [0.4, 0.5] });
  anim(t => { const k = E.inOut(prog(t, at('cpap') - 0.6, at('cpap'))); a.g.setAttribute('opacity', 1 - k); b.g.setAttribute('opacity', k); });
  chip(g, 'CONSULTA A TU MÉDICO', at('si_reconoces') + 1.5, { cx: 1510, cy: 260, size: 36, fill: TEAL, color: C.white });
  chip(g, 'ESTUDIO DEL SUEÑO', at('estudio'), { cx: 1510, cy: 420, size: 40 });
  chip(g, 'TRATAMIENTOS EFICACES', at('estudio') + 2.5, { cx: 1510, cy: 580, size: 36, fill: C.green, color: C.white });
  chip(g, 'CPAP', at('cpap'), { cx: 1510, cy: 740, size: 60, fill: C.blue, color: C.white });
});

// 18. apnoea isn't necessarily solved by going to bed earlier or breathing exercises
scene(svg, at('y_recuerda4'), at('la_buena'), g => {
  chip(g, 'LA APNEA NO SE SOLUCIONA NECESARIAMENTE…', at('no_soluciona'), { cy: 200, size: 40, fill: C.ink, color: C.white });
  mark(g, 'ACOSTÁNDOTE ANTES', false, at('antes4'), { cx: 960, cy: 450, size: 48 });
  mark(g, 'CON EJERCICIOS RESPIRATORIOS', false, at('ejercicios_resp'), { cx: 960, cy: 660, size: 44 });
});

// 19. good news: other habits can improve from tonight
scene(svg, at('la_buena'), at('p5') - 0.3, g => {
  obj(g, 'luna', at('la_buena'), { cx: 960, cy: 330, fit: 300 });
  cap(g, 'LA BUENA NOTICIA', at('la_buena') + 0.3, { cy: 620, hi: 'BUENA NOTICIA', hiColor: '#7DE08E' });
  chip(g, 'HÁBITOS QUE PUEDES CAMBIAR DESDE HOY', at('habitos4') - 0.5, { cy: 820, size: 40, fill: TEAL, color: C.white });
});
