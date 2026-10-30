// INTRO (0 → Punto 1). Hook: "I thought it was just age" → a heart attack doesn't always start with
// unbearable chest pain (fatigue, jaw, indigestion) → chest pain is still common, but women have quieter
// signs → 6 symptoms, watch the 5th → subscribe → educational, suspect it = call 112 now.

// 0. "I thought it was normal for my age" — one of the most dangerous mistakes
scene(svg, -1, at('insoportable0') - 0.3, g => {
  pan(g, 'a_plancha', 'full', { from: [0.5, 0.45], to: [0.45, 0.5] });
  cap(g, '«PENSÉ QUE ERA COSA DE LA EDAD»', at('pense0'), { size: 50, hi: 'COSA DE LA EDAD', t1: at('errores0') });
  cap(g, 'UN ERROR MUY PELIGROSO', at('errores0'), { hi: 'PELIGROSO', hiColor: '#FF7A6E' });
}, { whoosh: false });

// 1. not always unbearable chest pain: a strange tiredness, jaw discomfort, "indigestion"
scene(svg, at('insoportable0') - 0.3, at('preocupante0'), g => {
  mark(g, 'NO SIEMPRE UN DOLOR INSOPORTABLE', false, at('insoportable0'), { cy: 100, size: 40 });
  tile(g, 'a_plancha', at('cansancio0') - 0.2, { x: 70, y: 220, w: 570, h: 380, label: 'CANSANCIO EXTRAÑO' });
  tile(g, 'a_mandibula', at('mandibula0') - 0.2, { x: 675, y: 220, w: 570, h: 380, label: 'MOLESTIA EN LA MANDÍBULA' });
  tile(g, 'a_estomago', at('indigestion0') - 0.2, { x: 1280, y: 220, w: 570, h: 380, label: '«INDIGESTIÓN»' });
});

// 2. many women over 60 carry on with their chores without suspecting anything
scene(svg, at('preocupante0'), at('saber0'), g => {
  pan(g, 'a_fregadero', 'left', { from: [0.5, 0.45], to: [0.5, 0.5] });
  chip(g, 'MUJERES DE MÁS DE 60', at('preocupante0') + 1.5, { cx: 1510, cy: 360, size: 32, fill: C.white });
  chip(g, 'SIGUEN CON SUS TAREAS…', at('tareas0'), { cx: 1510, cy: 490, size: 32, fill: C.white });
  chip(g, '…SIN SOSPECHAR NADA', at('tareas0') + 2, { cx: 1510, cy: 620, size: 34, fill: C.red, color: C.white });
});

// 3. chest pain is still one of the most frequent symptoms — but women also have quieter signs
scene(svg, at('saber0'), at('seis0'), g => {
  obj(g, 'corazon', at('saber0') + 0.3, { cx: 520, cy: 520, fit: 560 });
  mark(g, 'EL DOLOR EN EL PECHO SIGUE SIENDO FRECUENTE', true, at('toracico0'), { cx: 1250, cy: 340, size: 26 });
  chip(g, 'PERO HAY SEÑALES', at('evidentes0') - 1, { cx: 1300, cy: 520, size: 40, fill: C.white });
  chip(g, 'MENOS EVIDENTES', at('evidentes0'), { cx: 1300, cy: 640, size: 44, fill: C.amber });
  source(g, 'American Heart Association: infarto agudo de miocardio en la mujer (2016)', at('toracico0'));
});

// 4. 6 symptoms confused with ageing, stress or digestion — watch the 5th (confused with low BP)
scene(svg, at('seis0'), at('suscribete0') - 1, g => {
  chip(g, '6 SÍNTOMAS DE INFARTO', at('seis0'), { cy: 90, size: 52, fill: C.red, color: C.white });
  const it = [['pila', 'CANSANCIO'], ['corazon', 'MANDÍBULA'], ['estomago', 'DIGESTIÓN'], ['pulmones', 'AIRE'], ['termometro', 'SUDOR FRÍO'], ['cerebro', 'ANGUSTIA']];
  it.forEach(([n, s], i) => Food(g, n, at('seis0') + 0.8 + i * 0.3, { cx: 220 + i * 296, cy: 360, r: 120, label: s, size: 24, phase: i * 0.2 }));
  const ring = el('circle', { cx: 220 + 4 * 296, cy: 360, r: 140, fill: 'none', stroke: C.amber, 'stroke-width': 12, opacity: 0 }, g);
  anim(t => set(ring, { opacity: t < at('quinto0') ? 0 : 1, r: 140 + 8 * Math.sin(t * 4) }));
  chip(g, 'SE CONFUNDEN CON LA EDAD, EL ESTRÉS O LA DIGESTIÓN', at('envejecimiento0'), { cy: 640, size: 30, fill: C.white });
  chip(g, '¡ATENCIÓN AL 5º!', at('quinto0'), { cx: 1404, cy: 790, size: 40, fill: C.amber });
  chip(g, '«UNA BAJADA DE TENSIÓN»', at('bajada0'), { cx: 1404, cy: 910, size: 30, fill: C.white });
});

// 5. subscribe
scene(svg, at('suscribete0') - 1, at('educativo0'), g => {
  tile(g, 'z_medica', at('suscribete0') - 0.8, { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE AL CANAL', at('suscribete0') - 0.3, { y: 740 });
}, { punch: [at('suscribete0')] });

// 6. educational; if you suspect a heart attack, call 112 now — don't wait for the end (≥ 6 s)
scene(svg, at('educativo0'), at('cansada0') - 1.5, g => {
  chip(g, 'CONTENIDO EDUCATIVO', at('educativo0'), { cy: 90, size: 40, fill: C.ink, color: C.white });
  call112(g, at('llama0') - 1, ['¿SOSPECHAS UN INFARTO?', 'NO ESPERES A TERMINAR EL VÍDEO'], { y: 230 });
}, { punch: [at('llama0')] });

// 7. first sign: "I'm tired because I'm getting older"
scene(svg, at('cansada0') - 1.5, at('p1') - 0.3, g => {
  pan(g, 'c_despierta', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, '«ESTOY CANSADA PORQUE ME HAGO MAYOR»', at('cansada0'), { size: 46, hi: 'ME HAGO MAYOR' });
});
