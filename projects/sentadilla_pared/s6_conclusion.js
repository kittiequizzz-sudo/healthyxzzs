// CONCLUSIÓN — after 60 it's not about exhausting yourself but small consistent stimuli; recap (wall as a
// complement, isometric squats can help BP long-term, calves = second heart); walking and strength aren't
// rivals; small challenge; quiz (which calf muscle? → soleus); like/subscribe/share; final warning (≥ 6 s); close.

// 0. not walking to exhaustion or proving you're 30 — small stimuli, repeated with consistency
scene(svg, at('despues_c') - 0.3, at('hoy_c'), g => {
  pan(g, 'z_grupo', 'full', { from: [0.5, 0.45], to: [0.55, 0.5] });
  cap(g, 'NO SE TRATA DE AGOTARSE', at('agotamiento_c'), { hi: 'AGOTARSE', hiColor: '#FF8A7A', t1: at('estimulos_c') });
  cap(g, 'PEQUEÑOS ESTÍMULOS, CON CONSTANCIA', at('estimulos_c'), { hi: 'CONSTANCIA', hiColor: '#7DE08E', size: 50 });
});

// 1. recap: a wall to complement your walks; isometric squats for BP long term; calves = second heart
scene(svg, at('hoy_c'), at('rivales_c'), g => {
  chip(g, 'HOY HEMOS DESCUBIERTO', at('hoy_c'), { cy: 90, size: 46, fill: C.ink, color: C.amber });
  Food(g, 'pared', at('herramienta_c') - 0.3, { cx: 420, cy: 420, r: 160, label: 'LA PARED COMPLEMENTA' });
  Food(g, 'tensiometro', at('sentadillas_c') - 0.3, { cx: 960, cy: 420, r: 160, label: 'AYUDA A LA TENSIÓN', phase: 0.3 });
  Food(g, 'pantorrilla', at('pantorrillas_c') - 0.3, { cx: 1500, cy: 420, r: 160, label: 'EL SEGUNDO CORAZÓN', phase: 0.6 });
});

// 2. walking and strengthening aren't rivals — combine them
scene(svg, at('rivales_c'), at('reto_c'), g => {
  tile(g, 'c_amigas', at('rivales_c'), { x: 140, y: 170, w: 760, h: 500 });
  tile(g, 'c_pared', at('rivales_c') + 0.4, { x: 1020, y: 170, w: 760, h: 500 });
  Sign(g, '+', at('rivales_c') + 0.8, { cx: 960, cy: 420, size: 140, color: C.white });
  chip(g, 'NO SON RIVALES: COMBÍNALOS', at('rivales_c') + 1, { cy: 820, size: 46, fill: C.green, color: C.white });
});

// 3. small challenge: notice how your legs respond walking, standing up, on stairs; progress within your limits
scene(svg, at('reto_c'), at('pregunta_c'), g => {
  pan(g, 'z_antonio', 'left', { from: [0.45, 0.5], to: [0.5, 0.45] });
  chip(g, 'UN PEQUEÑO RETO', at('reto_c'), { cx: 1510, cy: 200, size: 40, fill: C.amber });
  chip(g, 'OBSERVA TUS PIERNAS AL:', at('reto_c') + 2, { cx: 1510, cy: 330, size: 30, fill: C.white });
  chip(g, 'CAMINAR · LEVANTARTE · SUBIR', at('reto_c') + 4, { cx: 1510, cy: 450, size: 28, fill: C.white });
  chip(g, 'PROGRESA DENTRO DE TUS POSIBILIDADES', at('observa_c'), { cx: 1510, cy: 600, size: 24, fill: C.green, color: C.white });
});

// 4. quiz: which calf muscle is key to venous return, part of the "second heart"? write it in the comments
scene(svg, at('pregunta_c'), at('util_c'), g => {
  obj(g, 'pantorrilla', at('pregunta_c'), { cx: 520, cy: 520, fit: 700 });
  wrapQ(g, at('musculo_c') - 0.5, 920, 300, 1.6);
  chip(g, '¿QUÉ MÚSCULO DE LA PANTORRILLA', at('musculo_c'), { cx: 1350, cy: 470, size: 32, fill: C.white });
  chip(g, 'ES EL «SEGUNDO CORAZÓN»?', at('musculo_c') + 1.5, { cx: 1350, cy: 580, size: 32, fill: C.white });
  CTAlive(g, 'comment', 'ESCRIBE TU RESPUESTA', at('escribe_c') - 0.3, { y: 750 });
});

// 5. like, subscribe, share
scene(svg, at('util_c'), at('advertencia_c'), g => {
  tile(g, 'z_nieto', at('util_c'), { x: 560, y: 60, w: 800, h: 440 });
  CTAlive(g, 'like', 'ME GUSTA', at('util_c') + 1, { y: 560 });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y COMPÁRTELO', at('suscribete_c') - 0.3, { y: 740 });
}, { punch: [at('suscribete_c')] });

// 6. final warning: educational; uncontrolled BP, heart disease, joint problems or symptoms → consult first (≥ 6 s)
scene(svg, at('advertencia_c'), at('porque_c'), g => {
  chip(g, 'CONTENIDO EDUCATIVO · NO SUSTITUYE AL MÉDICO', at('advertencia_c') + 0.5, { cy: 90, size: 34, fill: C.ink, color: C.white });
  warn(g, 'CONSULTA ANTES DE EMPEZAR SI TIENES', ['HIPERTENSIÓN NO CONTROLADA', 'ENFERMEDAD CARDÍACA', 'PROBLEMAS ARTICULARES · SÍNTOMAS AL ENTRENAR'], at('advertencia_c') + 3, { y: 230, w: 1400, size: 40 });
}, { punch: [at('advertencia_c') + 3] });

// 7. close: not doing more, but moving better — safely and consistently
scene(svg, at('porque_c'), END + 1, g => {
  pan(g, 'z_antonio', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, 'MUÉVETE MEJOR, CON SEGURIDAD', at('mejor_c') - 0.3, { hi: 'MEJOR', hiColor: '#7DE08E', size: 54 });
});
