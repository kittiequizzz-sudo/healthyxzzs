// PUNTO 3 — sal oculta: sodium → water → volume → pressure, hose analogy, hidden Spanish sources,
// labels (≥ 1,25 g/100 g in Spain; 1,5 g in other guides), herbs, potassium caution.

// 0. kicker
scene(svg, at('p3') - 0.3, at('puedes3'), g => {
  pan(g, 's_rechaza', 'full', { from: [0.3, 0.5], to: [0.45, 0.45] });
  kicker(g, 'PUNTO 3', 'LA SAL OCULTA', at('p3'));
});

// 1. you take your medicine, avoid salty food… and still too much sodium — a silent enemy
scene(svg, at('puedes3'), at('comprender3'), g => {
  mark(g, 'TOMAS TU MEDICACIÓN', true, at('puedes3') + 0.3, { cx: 520, cy: 220, size: 36 });
  mark(g, 'EVITAS LO MUY SALADO', true, at('puedes3') + 2.5, { cx: 520, cy: 360, size: 36 });
  chip(g, '…Y AÚN ASÍ, MUCHO SODIO', at('mas_sodio') - 0.5, { cx: 520, cy: 540, size: 40, fill: C.red, color: C.white });
  obj(g, 'pan', at('desayuno') - 0.5, { cx: 1300, cy: 300, fit: 360 });
  obj(g, 'queso', at('desayuno'), { cx: 1600, cy: 520, fit: 300, phase: 0.3 });
  obj(g, 'lata', at('desayuno') + 0.5, { cx: 1250, cy: 640, fit: 260, phase: 0.6 });
  chip(g, 'UN ENEMIGO SILENCIOSO', at('enemigo'), { cx: 1400, cy: 880, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'SEMANAS SIN MEJORAR', at('preocupante3') + 1, { cx: 520, cy: 720, size: 36, fill: C.amber });
});

// 2. sodium is needed, but in excess the kidneys can't remove it → water retained → more volume → pressure
scene(svg, at('comprender3'), at('manguera'), g => {
  pan(g, 'g_agua', 'left', { from: [0.3, 0.5], to: [0.65, 0.5] });
  chip(g, 'SODIO: NECESARIO…', at('sodio3'), { cx: 1510, cy: 180, size: 36, fill: C.white });
  chip(g, '…PERO EN EXCESO', at('excesivas'), { cx: 1510, cy: 300, size: 36, fill: C.red, color: C.white });
  chip(g, 'LOS RIÑONES NO DAN ABASTO', at('rinones3'), { cx: 1510, cy: 420, size: 28, fill: C.amber });
  chip(g, '→ RETIENES AGUA', at('favorece3'), { cx: 1510, cy: 540, size: 36, fill: C.blue, color: C.white });
  chip(g, '→ MÁS VOLUMEN DE SANGRE', at('volumen'), { cx: 1510, cy: 660, size: 30, fill: C.blue, color: C.white });
  chip(g, '→ MÁS PRESIÓN', at('paredes') - 0.5, { cx: 1510, cy: 780, size: 38, fill: C.red, color: C.white });
});

// 3. hose on a tap: more water → more pressure (regulation is more complex)
scene(svg, at('manguera'), at('por_eso3'), g => {
  const a = pan(g, 'g_grifo', 'full', { from: [0.4, 0.5], to: [0.5, 0.5] });
  const b = pan(g, 'g_presion', 'full', { from: [0.5, 0.5], to: [0.6, 0.45] });
  anim(t => { const k = E.inOut(prog(t, at('aumenta3') - 0.2, at('aumenta3') + 0.4)); a.g.setAttribute('opacity', 1 - k); b.g.setAttribute('opacity', k); });
  cap(g, 'MÁS AGUA → MÁS PRESIÓN', at('aumenta3') + 0.6, { hi: 'MÁS PRESIÓN', hiColor: '#FF7A6E', t1: at('compleja') - 0.3 });
  cap(g, '(EN EL CUERPO ES MÁS COMPLEJO)', at('compleja') - 0.3, { size: 44 });
}, { punch: [at('aumenta3') + 0.6] });

// 4. so a very salty diet makes BP harder to control even on medication
scene(svg, at('por_eso3'), at('sorprenda'), g => {
  pan(g, 'g_rinon', 'left', { from: [0.4, 0.4], to: [0.6, 0.6] });
  chip(g, 'MUCHA SAL', at('por_eso3') + 1, { cx: 1510, cy: 300, size: 50, fill: C.red, color: C.white });
  chip(g, '= PEOR CONTROL', at('por_eso3') + 2.5, { cx: 1510, cy: 440, size: 44, fill: C.white });
  chip(g, 'AUNQUE TOMES MEDICACIÓN', at('por_eso3') + 5, { cx: 1510, cy: 580, size: 30, fill: C.amber });
});

// 5. the biggest problem isn't the salt shaker…
scene(svg, at('sorprenda'), at('espana'), g => {
  const L = obj(g, 'salero', at('sorprenda') + 0.3, { cx: 960, cy: 460, fit: 520, idle: 'none' });
  anim(t => L.g.setAttribute('transform', `rotate(${(8 * Math.sin((t - at('sorprenda')) * 3)).toFixed(2)} 960 700)`));
  mark(g, 'NO SOLO EL SALERO', false, at('salero'), { cx: 960, cy: 850, size: 48 });
});

// 6. hidden salt in Spain: cured ham, chorizo, cheeses, tins, some breads, industrial sauces
scene(svg, at('espana'), at('que_hacer3'), g => {
  chip(g, 'LA SAL ESCONDIDA', at('espana'), { cy: 90, size: 50, fill: C.ink, color: C.amber });
  const items = [['jamon', 'JAMÓN CURADO', 'jamon'], ['chorizo', 'CHORIZO', 'chorizo'], ['queso', 'QUESOS', 'quesos'], ['lata', 'CONSERVAS', 'conservas'], ['pan', 'ALGUNOS PANES', 'panes']];
  items.forEach(([n, s, k], i) => {
    const cx = 220 + i * 370, cy = 430;
    const L = Live(g, { t0: at(k) - 0.3, cx, cy, enter: 'pop', idle: 'bob', phase: i * 0.2 });
    el('circle', { cx, cy, r: 160, fill: C.white, stroke: C.ink, 'stroke-width': 7 }, L.g);
    Cutout(L.g, src(n), { cx, cy, iw: SZ[n][0], ih: SZ[n][1], fit: 230 });
    Chip(L.g, s, { cx, cy: cy + 200, size: 28, fill: C.amber });
    sfx(at(k) - 0.3, 'pop');
  });
  chip(g, '+ SALSAS INDUSTRIALES', at('salsas'), { cx: 960, cy: 780, size: 40, fill: C.red, color: C.white });
  chip(g, 'AUNQUE NO AÑADAS SAL', at('cocinar'), { cx: 960, cy: 920, size: 38, fill: C.white });
});

// 7. read nutrition labels: ≥ 1,25 g salt / 100 g = high (Spain); 1,5 g in other guides
scene(svg, at('que_hacer3'), at('frescos'), g => {
  tile(g, 's_etiqueta', at('que_hacer3') + 0.2, { x: 80, y: 180, w: 900, h: 600 });
  SaltLabel(g, at('etiquetas'), { x: 1100, y: 140, tHi: at('referencia') + 1 });
  chip(g, 'LEE LAS ETIQUETAS', at('etiquetas'), { cx: 530, cy: 100, size: 44, fill: C.green, color: C.white });
  chip(g, 'ALTO EN SAL: ≥ 1,25 g / 100 g', at('referencia') + 1, { cx: 1400, cy: 800, size: 34, fill: C.red, color: C.white });
  source(g, 'Criterio habitual en España (AESAN): ≥ 1,25 g de sal por 100 g · otras guías usan 1,5 g', at('referencia') + 1.5);
}, { punch: [at('referencia') + 1] });

// 8. fresh food, aromatic herbs, gradually fewer processed products
scene(svg, at('frescos'), at('potasio3'), g => {
  pan(g, 's_hierbas', 'left', { from: [0.3, 0.4], to: [0.45, 0.5] });
  mark(g, 'ALIMENTOS FRESCOS', true, at('frescos') + 0.3, { cx: 1510, cy: 300, size: 36 });
  mark(g, 'HIERBAS AROMÁTICAS', true, at('hierbas'), { cx: 1510, cy: 460, size: 36 });
  mark(g, 'MENOS PROCESADOS', true, at('procesados') - 0.8, { cx: 1510, cy: 620, size: 36 });
});

// 9. potassium helps (vegetables, legumes, fruit) — but with kidney disease / some drugs → ask first
scene(svg, at('potasio3'), at('no_necesitas3'), g => {
  chip(g, 'POTASIO', at('potasio3'), { cx: 560, cy: 140, size: 60, fill: C.green, color: C.white });
  obj(g, 'platano', at('verduras'), { cx: 380, cy: 420, fit: 320 });
  obj(g, 'hierbas', at('verduras') + 0.6, { cx: 740, cy: 420, fit: 300, phase: 0.4 });
  chip(g, 'VERDURAS · LEGUMBRES · FRUTA', at('verduras') + 1, { cx: 560, cy: 660, size: 30, fill: C.white });
  warn(g, '¡CUIDADO!', ['ENFERMEDAD RENAL', 'CIERTOS ANTIHIPERTENSIVOS', 'SUSTITUTOS DE SAL CON POTASIO'], at('renal3'), { y: 140, w: 820, size: 34, cx: 1400 });
  chip(g, 'CONSULTA ANTES CON TU MÉDICO', at('consulta3'), { cx: 1400, cy: 760, size: 32, fill: C.red, color: C.white });
});

// 10. no need to change everything at once — small sustained changes complement treatment
scene(svg, at('no_necesitas3'), at('otra_exp'), g => {
  pan(g, 's_jamon', 'full', { from: [0.3, 0.4], to: [0.45, 0.45] });
  cap(g, 'PEQUEÑOS CAMBIOS, MANTENIDOS', at('pequenos3') - 0.5, { hi: 'MANTENIDOS', hiColor: '#7DE08E' });
});

// 11. next: something that happens every night while you sleep
scene(svg, at('otra_exp'), at('p4') - 0.3, g => {
  pan(g, 'n_corazon', 'full', { from: [0.5, 0.5], to: [0.6, 0.4] });
  cap(g, 'NI EN TU PLATO NI EN TU BOTIQUÍN', at('otra_exp') + 1, { size: 46, t1: at('noche3') });
  cap(g, 'CADA NOCHE, MIENTRAS DUERMES', at('noche3'), { hi: 'MIENTRAS DUERMES', hiColor: '#8FC7FF' });
});
