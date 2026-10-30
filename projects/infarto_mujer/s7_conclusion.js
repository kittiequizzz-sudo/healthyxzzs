// CONCLUSIÓN — a heart attack doesn't always start with intense chest pain: recap of the 6 signs; many causes
// — what matters is sudden, intense, different; never ignore them "because I'm over 60"; comment question;
// subscribe/like/share; final warning: informative, suspect it → 112, don't drive or wait (≥ 6 s); close.

// 0. recap of the six signs
scene(svg, at('hoy_c') - 0.3, at('causas_c'), g => {
  mark(g, 'NO SIEMPRE EMPIEZA CON DOLOR EN EL PECHO', false, at('dolor_c'), { cy: 90, size: 34 });
  const it = [['pila', 'CANSANCIO', 'cansancio_c'], ['corazon', 'MANDÍBULA', 'mandibula_c'], ['estomago', 'NÁUSEAS', 'nauseas_c'], ['pulmones', 'FALTA DE AIRE', 'nauseas_c'], ['termometro', 'SUDOR FRÍO', 'sudor_c'], ['cerebro', 'ANGUSTIA', 'sudor_c']];
  it.forEach(([n, s, k], i) => Food(g, n, at(k) + (i === 3 ? 0.9 : i === 5 ? 1 : 0), { cx: 220 + i * 296, cy: 450, r: 120, label: s, size: 24, phase: i * 0.2 }));
});

// 1. many possible causes: what matters is sudden, intense, different; never ignore them because of age
scene(svg, at('causas_c'), at('pregunta_c'), g => {
  pan(g, 'z_medica', 'left', { from: [0.5, 0.45], to: [0.55, 0.5] });
  chip(g, 'MUCHAS CAUSAS POSIBLES', at('causas_c'), { cx: 1510, cy: 220, size: 30, fill: C.white });
  chip(g, 'INESPERADO · INTENSO · DIFERENTE', at('inesperada_c'), { cx: 1510, cy: 360, size: 24, fill: C.red, color: C.white });
  mark(g, '«ES POR LA EDAD»', false, at('ignorarlos_c'), { cx: 1510, cy: 510, size: 34 });
});

// 2. which of the six surprised you most? write it in the comments
scene(svg, at('pregunta_c'), at('util_c'), g => {
  [[560, 250, 1.8], [960, 190, 2.2], [1360, 250, 1.8]].forEach(([x, y, s], i) => {
    const B = Live(g, { t0: at('pregunta_c') + i * 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    Icon.bubble(B.g, x - 50 * s, y - 50 * s, s);
  });
  CTAlive(g, 'comment', '¿QUÉ SEÑAL TE SORPRENDIÓ MÁS?', at('pregunta_c') + 1.5, { y: 470 });
  chip(g, 'ESCRÍBELA EN LOS COMENTARIOS', at('escribela_c'), { cy: 760, size: 40, fill: C.amber });
});

// 3. subscribe, like, share with family and friends
scene(svg, at('util_c'), at('advertencia_c'), g => {
  tile(g, 'z_abrazo', at('util_c'), { x: 560, y: 60, w: 800, h: 440 });
  CTAlive(g, 'sub', 'SUSCRÍBETE', at('suscribete_c') - 0.3, { y: 560 });
  CTAlive(g, 'like', 'ME GUSTA', at('suscribete_c') + 1.2, { y: 720 });
  chip(g, 'COMPÁRTELO CON FAMILIARES Y AMIGAS', at('comparte_c'), { cy: 960, size: 36, fill: C.amber });
}, { punch: [at('suscribete_c')] });

// 4. final warning: informative only; suspect a heart attack → 112; don't drive, don't wait (≥ 6 s)
scene(svg, at('advertencia_c'), at('tiempo_c'), g => {
  chip(g, 'INFORMATIVO · NO SUSTITUYE AL MÉDICO', at('advertencia_c') + 0.5, { cy: 90, size: 38, fill: C.ink, color: C.white });
  call112(g, at('llama_c') - 1, ['¿SOSPECHAS UN INFARTO?', 'NO CONDUZCAS', 'NO ESPERES A QUE PASE'], { y: 230 });
}, { punch: [at('llama_c')] });

// 5. close: knowing your heart's signals helps you act in time
scene(svg, at('tiempo_c'), END + 1, g => {
  pan(g, 'z_paseo', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, 'ACTÚA A TIEMPO', at('tiempo_c') + 1, { size: 60, hi: 'A TIEMPO', hiColor: '#7DE08E' });
}, { fade: 0.5 });
