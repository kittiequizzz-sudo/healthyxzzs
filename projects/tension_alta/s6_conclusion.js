// CONCLUSIÓN — recap of 5 causes, patterns not single numbers, safety (≥ 180/120, 112), CTA, close.

// 0. high on medication doesn't doom your heart — it needs understanding
scene(svg, at('llegados') - 0.3, at('cinco_c'), g => {
  pan(g, 'z_contenta', 'full', { from: [0.4, 0.5], to: [0.5, 0.4] });
  cap(g, 'NO ESTÁS CONDENADO', at('condenado') - 1, { hi: 'NO', hiColor: '#7DE08E', t1: at('explicacion_c') });
  cap(g, 'BUSCA LA EXPLICACIÓN', at('explicacion_c'), { hi: 'EXPLICACIÓN' });
});

// 1. recap: 5 causes
scene(svg, at('cinco_c'), at('clave'), g => {
  chip(g, '5 POSIBLES CAUSAS', at('cinco_c'), { cy: 90, size: 52, fill: C.ink, color: C.amber });
  const it = [['tensiometro', 'MEDIR MAL', 'errores_c'], ['blister', 'OTROS FÁRMACOS', 'medicamentos_c'], ['salero', 'SAL OCULTA', 'sal_c'], ['cpap', 'APNEA', 'apnea_c'], ['pastillero', 'AJUSTAR TRATAMIENTO', 'revisar_c']];
  it.forEach(([n, s, k], i) => {
    const cx = 220 + i * 370, cy = 460;
    const L = Live(g, { t0: at(k) - 0.3, cx, cy, enter: 'pop', idle: 'bob', phase: i * 0.2 });
    el('circle', { cx, cy, r: 150, fill: i === 3 ? NIGHT : C.white, stroke: C.ink, 'stroke-width': 7 }, L.g);
    Cutout(L.g, src(n), { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit: 200 });
    Text(L.g, String(i + 1), { x: cx - 110, y: cy - 120, size: 56, color: C.red });
    Chip(L.g, s, { cx, cy: cy + 200, size: 26, fill: C.amber });
    sfx(at(k) - 0.3, 'pop');
  });
});

// 2. the key: patterns, healthy habits, work with your doctor — one reading isn't the whole story
scene(svg, at('clave'), at('advertencia'), g => {
  LogTable(g, at('clave'), { x: 140, y: 170, dur: 2 });
  mark(g, 'IDENTIFICA PATRONES', true, at('patrones'), { cx: 1400, cy: 260, size: 36 });
  mark(g, 'HÁBITOS SALUDABLES', true, at('habitos_c'), { cx: 1400, cy: 400, size: 36 });
  mark(g, 'COLABORA CON TU MÉDICO', true, at('colaborar'), { cx: 1400, cy: 540, size: 32 });
  chip(g, 'UNA CIFRA ≠ TODA LA HISTORIA', at('aislada_c'), { cx: 1400, cy: 720, size: 32, fill: C.white });
});

// 3. warning: never change medicines alone · ≥ 180/120 → repeat after 1 min, seek help · symptoms → 112 (≥ 6 s)
scene(svg, at('advertencia'), at('educativo'), g => {
  chip(g, 'NUNCA CAMBIES TU MEDICACIÓN SIN SUPERVISIÓN', at('nunca_c'), { cy: 70, size: 34, fill: C.red, color: C.white });
  Monitor(g, at('c180') - 0.3, { cx: 380, cy: 400, s: 0.75, sys: 180, dia: 120, count: 1.2 });
  chip(g, '≥ 180 / 120', at('c180') + 0.5, { cx: 380, cy: 650, size: 48, fill: C.red, color: C.white });
  chip(g, 'REPITE TRAS 1 MIN', at('repite_c'), { cx: 380, cy: 780, size: 34, fill: C.white });
  chip(g, 'SI PERSISTE → MÉDICO YA', at('repite_c') + 2.5, { cx: 380, cy: 890, size: 32, fill: C.amber });
  warn(g, '¡LLAMA AL 112!', ['DOLOR TORÁCICO', 'DIFICULTAD PARA RESPIRAR', 'DEBILIDAD REPENTINA', 'ALTERACIONES DEL HABLA'], at('ademas_c'), { y: 170, w: 1000, size: 40, cx: 1260 });
}, { punch: [at('llama')] });

// 4. educational, not personal medical advice
scene(svg, at('educativo'), at('suscribete_c') - 1, g => {
  tile(g, 'z_cuaderno', at('educativo'), { x: 410, y: 160, w: 1100, h: 620 });
  chip(g, 'CONTENIDO EDUCATIVO · NO SUSTITUYE AL MÉDICO', at('educativo') + 0.3, { cy: 90, size: 32, fill: C.ink, color: C.white });
});

// 5. subscribe, bell, share
scene(svg, at('suscribete_c') - 1, at('cuentame_c'), g => {
  tile(g, 'z_paseo', at('suscribete_c') - 0.8, { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE Y ACTIVA LA CAMPANITA', at('suscribete_c') - 0.3, { y: 730 });
  chip(g, 'COMPÁRTELO', at('comparte_c'), { cy: 950, size: 40, fill: C.amber });
}, { punch: [at('suscribete_c')] });

// 6. comments: ever had high BP while taking your pills correctly?
scene(svg, at('cuentame_c'), at('recuerda_final'), g => {
  [[560, 300, 1.8], [960, 240, 2.2], [1360, 300, 1.8]].forEach(([x, y, s], i) => {
    const B = Live(g, { t0: at('cuentame_c') + i * 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    Icon.bubble(B.g, x - 50 * s, y - 50 * s, s);
  });
  CTAlive(g, 'comment', '¿TENSIÓN ALTA CON TUS PASTILLAS?', at('alguna'), { y: 560 });
});

// 7. close: caring for your heart starts by understanding it
scene(svg, at('recuerda_final'), END + 1, g => {
  heart(g, at('recuerda_final'), 960, 400, 420);
  cap(g, 'CUIDAR TU CORAZÓN EMPIEZA POR COMPRENDERLO', at('recuerda_final') + 0.4, { cy: 820, size: 46, hi: 'COMPRENDERLO' });
}, { fade: 0.5 });
