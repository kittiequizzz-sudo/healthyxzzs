// PUNTO 5 — tres cambios antes de dormir: dinner & bedroom, phone & melatonin, 4–6 slow breathing.

// 0. kicker over the dark, quiet bedroom
scene(svg, at('p5') - 0.3, at('despues5'), g => {
  pan(g, 'e_oscuro', 'full', { from: [0.6, 0.4], to: [0.5, 0.5] });
  kicker(g, 'PUNTO 5', '3 CAMBIOS ANTES DE DORMIR', at('p5'));
});

// 1. what can I do tonight for my heart?
scene(svg, at('despues5'), at('la_buena5'), g => {
  heart(g, at('despues5'), 700, 470, 360);
  obj(g, 'luna', at('despues5') + 0.6, { cx: 1180, cy: 330, fit: 240, phase: 0.3 });
  chip(g, '¿QUÉ PUEDO HACER ESTA NOCHE?', at('que_puedo') - 0.3, { cy: 820, size: 48, fill: NIGHT, color: C.white });
});

// 2. no special devices, no total life overhaul — simple, regular changes
scene(svg, at('la_buena5'), at('el_primer'), g => {
  chip(g, 'LA BUENA NOTICIA', at('la_buena5'), { cy: 130, size: 50, fill: C.green, color: C.white });
  mark(g, 'DISPOSITIVOS ESPECIALES', false, at('dispositivos'), { cx: 960, cy: 340, size: 44 });
  mark(g, 'CAMBIAR TODA TU VIDA', false, at('transformar'), { cx: 960, cy: 520, size: 44 });
  mark(g, 'CAMBIOS SENCILLOS Y REGULARES', true, at('algunos_cambios'), { cx: 960, cy: 720, size: 44 });
}, { punch: [at('algunos_cambios')] });

// 3. change 1: dinner and bedroom temperature
scene(svg, at('el_primer'), at('comer'), g => {
  pan(g, 'e_cena', 'full', { from: [0.4, 0.4], to: [0.5, 0.5] });
  kicker(g, 'CAMBIO 1', 'LA CENA Y TU DORMITORIO', at('el_primer') + 0.3);
});

// 4. eating too much, fatty or heavy food right before bed → digestive discomfort, worse sleep
scene(svg, at('comer'), at('ademas5'), g => {
  obj(g, 'plato', at('comer'), { cx: 600, cy: 480, fit: 640 });
  const X = Live(g, { t0: at('comer') + 1.2, cx: 880, cy: 300, enter: 'pop', idle: 'shake' });
  Icon.cross(X.g, 810, 230, 1.4);
  chip(g, 'DEMASIADO, GRASO', at('comer') + 1, { cx: 1380, cy: 300, size: 42, fill: C.amber });
  chip(g, 'JUSTO ANTES DE ACOSTARTE', at('comer') + 3, { cx: 1380, cy: 440, size: 34 });
  chip(g, 'MOLESTIAS DIGESTIVAS', at('digestivas'), { cx: 1380, cy: 600, size: 38, fill: C.red, color: C.white });
  chip(g, 'PEOR DESCANSO', at('digestivas') + 1.5, { cx: 1380, cy: 740, size: 40, fill: C.red, color: C.white });
});

// 5. too much salt can raise blood pressure, especially in salt-sensitive people
scene(svg, at('ademas5'), at('procura'), g => {
  pan(g, 'e_sal', 'left', { from: [0.3, 0.6], to: [0.4, 0.45] });
  chip(g, 'MENOS SAL', at('ademas5') + 0.5, { cx: 1510, cy: 300, size: 60, fill: C.amber });
  chip(g, '↑ PRESIÓN ARTERIAL', at('ademas5') + 2.5, { cx: 1510, cy: 460, size: 40, fill: C.red, color: C.white });
  chip(g, 'SOBRE TODO SI ERES', at('sodio') - 0.8, { cx: 1510, cy: 600, size: 32 });
  chip(g, 'SENSIBLE AL SODIO', at('sodio'), { cx: 1510, cy: 700, size: 36 });
});

// 6. dinner early, easy to digest, moderate portions
scene(svg, at('procura'), at('despues5b'), g => {
  pan(g, 'e_cena', 'left', { from: [0.5, 0.6], to: [0.4, 0.4] });
  const ck = Clock(g, { cx: 1510, cy: 330, r: 150 });
  const L = Live(g, { t0: at('procura'), cx: 1510, cy: 330, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(19.5 + 0.8 * prog(t, at('procura'), at('despues5b'))));
  chip(g, 'CENA CON ANTELACIÓN', at('procura') + 0.3, { cx: 1510, cy: 560, size: 34, fill: C.green, color: C.white });
  chip(g, 'LIGERA Y MODERADA', at('moderadas') - 0.8, { cx: 1510, cy: 690, size: 38 });
});

// 7. bedroom: dark, quiet, slightly cool
scene(svg, at('despues5b'), at('no_frio'), g => {
  pan(g, 'e_oscuro', 'left', { from: [0.5, 0.5], to: [0.6, 0.6] });
  chip(g, 'OSCURO', at('oscuro'), { cx: 1510, cy: 280, size: 52, fill: NIGHT, color: C.white });
  chip(g, 'SILENCIOSO', at('silencioso'), { cx: 1510, cy: 420, size: 52, fill: TEAL, color: C.white });
  chip(g, 'FRESCO', at('fresco'), { cx: 1510, cy: 560, size: 52, fill: C.blue, color: C.white });
  chip(g, 'AYUDA A REGULAR EL SUEÑO', at('estas_condiciones'), { cx: 1510, cy: 720, size: 32 });
});

// 8. no need to be cold — just avoid an overly warm room
scene(svg, at('no_frio'), at('segundo_cambio'), g => {
  pan(g, 'e_ventana', 'full', { from: [0.3, 0.4], to: [0.45, 0.45] });
  cap(g, 'NI FRÍO NI DEMASIADO CALOR', at('no_frio') + 0.3, { hi: 'NI FRÍO', hiColor: '#8FC7FF' });
});

// 9. change 2: the phone
scene(svg, at('segundo_cambio'), at('revisar'), g => {
  pan(g, 't_movil', 'full', { from: [0.3, 0.4], to: [0.4, 0.45] });
  kicker(g, 'CAMBIO 2', 'EL TELÉFONO MÓVIL', at('segundo_cambio') + 0.3);
});

// 10. news, messages, endless scrolling keep the brain stimulated
scene(svg, at('revisar'), at('ademas_luz'), g => {
  obj(g, 'movil', at('revisar'), { cx: 560, cy: 520, fit: 520, amp: 0.6 });
  const screen = el('rect', { x: 430, y: 330, width: 260, height: 380, rx: 30, fill: '#8FC7FF', opacity: 0 }, g);
  anim(t => set(screen, { opacity: t < at('revisar') + 0.5 ? 0 : 0.18 + 0.1 * Math.sin(t * 7) }));
  chip(g, 'NOTICIAS', at('revisar') + 0.3, { cx: 1100, cy: 280, size: 42 });
  chip(g, 'MENSAJES', at('mensajes'), { cx: 1400, cy: 400, size: 42, phase: 0.3 });
  chip(g, 'REDES SOCIALES', at('redes'), { cx: 1150, cy: 520, size: 42, phase: 0.6 });
  obj(g, 'cerebro', at('estimulado') - 0.5, { cx: 1400, cy: 740, fit: 260, idle: 'shake' });
  chip(g, 'CEREBRO ESTIMULADO', at('estimulado'), { cx: 1050, cy: 820, size: 40, fill: C.red, color: C.white });
});

// 11. screen light at night can delay melatonin, the hormone that regulates the sleep cycle
scene(svg, at('ademas_luz'), at('prueba'), g => {
  pan(g, 't_movil', 'left', { from: [0.6, 0.4], to: [0.45, 0.35], zoom: 0.22 });
  const L = Live(g, { t0: at('melatonina') - 0.5, cx: 1510, cy: 420, enter: 'r', idle: 'none' });
  Text(L.g, 'MELATONINA', { x: 1510, y: 310, size: 40, color: '#2F5F9E' });
  const b = Bar(L.g, { x: 1270, y: 350, w: 480, h: 80, color: '#2F5F9E' });
  anim(t => b.draw(0.85 - 0.5 * E.inOut(prog(t, at('melatonina'), at('melatonina') + 2.5))));
  chip(g, 'LUZ DE LA PANTALLA', at('ademas_luz') + 0.6, { cx: 1510, cy: 200, size: 36, fill: C.blue, color: C.white });
  chip(g, 'SE RETRASA', at('melatonina') + 1, { cx: 1510, cy: 540, size: 44, fill: C.red, color: C.white });
  chip(g, 'LA HORMONA DEL SUEÑO', at('melatonina') + 2.5, { cx: 1510, cy: 680, size: 32 });
});

// 12. cut screens 30–60 minutes before bed
scene(svg, at('prueba'), at('puede_sustituir'), g => {
  pan(g, 't_cajon', 'left', { from: [0.6, 0.6], to: [0.5, 0.4] });
  const ck = Clock(g, { cx: 1510, cy: 360, r: 170, night: true });
  const L = Live(g, { t0: at('prueba'), cx: 1510, cy: 360, idle: 'bob' });
  L.g.appendChild(ck.g);
  anim(t => ck.draw(22 + 1 * E.inOut(prog(t, at('treinta'), at('treinta') + 3))));
  chip(g, '30 – 60 MIN SIN PANTALLAS', at('treinta'), { cx: 1510, cy: 640, size: 34, fill: TEAL, color: C.white });
});

// 13. swap it for a calm read, soft music, a relaxed chat
scene(svg, at('puede_sustituir'), at('tercer'), g => {
  tile(g, 't_libro', at('lectura') - 0.3, { x: 120, y: 200, w: 800, h: 520, label: 'LECTURA TRANQUILA' });
  tile(g, 't_musica', at('musica') - 0.3, { x: 1000, y: 200, w: 800, h: 520, label: 'MÚSICA SUAVE' });
  chip(g, 'O UNA CONVERSACIÓN RELAJADA', at('conversacion'), { cy: 900, size: 40, fill: C.green, color: C.white });
});

// 14. change 3: breathe slowly for 5 minutes, without getting out of bed
scene(svg, at('tercer'), at('coloca'), g => {
  breathing(g, at('tercer'), { cx: 760, cy: 470, h: 620, fixed: 3, counter: false });
  kicker(g, 'CAMBIO 3', 'RESPIRAR DESPACIO 5 MINUTOS', at('tercer') + 0.3);
  chip(g, 'SIN LEVANTARTE DE LA CAMA', at('sin_levantarte'), { cx: 1460, cy: 300, size: 34, fill: NIGHT, color: C.white });
});

// 15. hand on the belly, in through the nose 4 s, out 6 s — gently
scene(svg, at('coloca'), at('la_resp'), g => {
  breathing(g, at('inspira'), { cx: 640, cy: 520, h: 680, fixed: t => t < at('inspira') ? 1 : null });
  chip(g, 'MANO SOBRE EL ABDOMEN', at('coloca'), { cx: 1460, cy: 200, size: 36, fill: C.white });
  chip(g, 'INSPIRA POR LA NARIZ · 4 s', at('inspira'), { cx: 1460, cy: 760, size: 36, fill: C.blue, color: C.white });
  chip(g, 'SUELTA EL AIRE · 6 s', at('seis'), { cx: 1460, cy: 880, size: 36, fill: TEAL, color: C.white });
  chip(g, 'SIN FORZAR', at('repite'), { cx: 1460, cy: 1000, size: 34 });
});

// 16. slow breathing helps relaxation and temporarily lowers stress activation
scene(svg, at('la_resp'), at('no_es_necesario'), g => {
  breathing(g, at('inspira'), { cx: 640, cy: 520, h: 680, enter: 'none' });
  chip(g, 'RELAJACIÓN', at('relajacion'), { cx: 1460, cy: 760, size: 46, fill: C.green, color: C.white });
  chip(g, 'MENOS ACTIVACIÓN POR ESTRÉS', at('estres5') - 0.8, { cx: 1460, cy: 890, size: 32, fill: C.white });
});

// 17. no breath-holding, no instant results; dizzy → breathe normally
scene(svg, at('no_es_necesario'), at('y_recuerda5'), g => {
  mark(g, 'AGUANTAR LA RESPIRACIÓN', false, at('no_es_necesario') + 0.4, { cx: 960, cy: 260, size: 44 });
  mark(g, 'RESULTADOS INMEDIATOS', false, at('inmediatos'), { cx: 960, cy: 460, size: 44 });
  chip(g, '¿MAREO O INCOMODIDAD?', at('mareo'), { cx: 960, cy: 670, size: 44, fill: C.amber });
  chip(g, '→ RESPIRA NORMAL', at('mareo') + 1.5, { cx: 960, cy: 810, size: 44, fill: C.white });
});

// 18. it doesn't replace treatment for hypertension, arrhythmias or apnoea
scene(svg, at('y_recuerda5'), at('ahora_te'), g => {
  stamp(g, 'NO SUSTITUYE TRATAMIENTOS', at('tratamientos'), { cx: 960, cy: 330, size: 66, color: C.red });
  chip(g, 'HIPERTENSIÓN', at('tratamientos') + 1.5, { cx: 480, cy: 640, size: 42, fill: C.white });
  chip(g, 'ARRITMIAS', at('tratamientos') + 2.3, { cx: 960, cy: 640, size: 42, fill: C.white });
  chip(g, 'APNEA DEL SUEÑO', at('tratamientos') + 3.1, { cx: 1440, cy: 640, size: 42, fill: C.white });
});

// 19. challenge: pick one of the three habits for the next 7 days
scene(svg, at('ahora_te'), at('cuentame5'), g => {
  ['LA CENA', 'EL MÓVIL', 'RESPIRAR'].forEach((s, i) => {
    const cx = 520 + i * 440, L = Live(g, { t0: at('ahora_te') + 1 + i * 0.4, cx, cy: 300, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    el('circle', { cx: cx + 8, cy: 310, r: 120, fill: C.ink }, L.g);
    el('circle', { cx, cy: 300, r: 120, fill: [C.amber, C.blue, TEAL][i], stroke: C.ink, 'stroke-width': 8 }, L.g);
    Text(L.g, String(i + 1), { x: cx, y: 290, size: 110, color: C.white });
    Chip(L.g, s, { cx, cy: 470, size: 34 });
  });
  const dc = DayCounter(g, { x: 725, y: 640, days: 7 });
  const L = Live(g, { t0: at('siete') - 0.3, cx: 960, cy: 705, enter: 'pop', idle: 'breathe' });
  L.g.appendChild(dc.g);
  anim(t => dc.draw(prog(t, at('siete') + 0.3, at('cuentame5') - 0.3)));
  chip(g, 'RETO: 7 DÍAS', at('siete'), { cx: 960, cy: 880, size: 48, fill: C.red, color: C.white });
});

// 20. tell me if you noticed a difference
scene(svg, at('cuentame5'), at('porque5'), g => {
  [[560, 360, 1.8], [960, 300, 2.2], [1360, 360, 1.8]].forEach(([x, y, s], i) => {
    const B = Live(g, { t0: at('cuentame5') + i * 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    Icon.bubble(B.g, x - 50 * s, y - 50 * s, s);
  });
  CTAlive(g, 'comment', '¿NOTASTE ALGUNA DIFERENCIA?', at('cuentame5') + 0.3, { y: 640 });
});

// 21. caring for your heart also means preparing your body to recover each night
scene(svg, at('porque5'), at('concl') - 0.3, g => {
  pan(g, 'z_pareja', 'full', { from: [0.45, 0.5], to: [0.5, 0.4] });
  cap(g, 'TU CUERPO SE RECUPERA CADA NOCHE', at('porque5') + 3, { size: 50, hi: 'CADA NOCHE', hiColor: '#8FC7FF' });
});
