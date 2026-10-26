// PUNTO 5 — cuando el tratamiento necesita un ajuste: BP has many regulators, drug families act on
// different mechanisms, combination therapy (ESC/ESH), ageing arteries, resistant HTN only after checks,
// bring your log + medicine list, never change doses yourself.

// 0. kicker
scene(svg, at('p5') - 0.3, at('idea5'), g => {
  pan(g, 'p_dos', 'full', { from: [0.45, 0.5], to: [0.4, 0.55] });
  kicker(g, 'PUNTO 5', 'CUANDO TU TRATAMIENTO\nNECESITA UN AJUSTE', at('p5'));
});

// 1. "my body got used to it / it doesn't work anymore" — reality is different
scene(svg, at('idea5'), at('compleja5'), g => {
  pan(g, 'p_frustrada', 'left', { from: [0.45, 0.4], to: [0.5, 0.5] });
  chip(g, '«MI CUERPO SE ACOSTUMBRÓ»', at('acostumbrado') - 1, { cx: 1510, cy: 300, size: 30, fill: C.white });
  chip(g, '«YA NO ME SIRVE»', at('acostumbrado') + 1, { cx: 1510, cy: 430, size: 36, fill: C.white });
  stamp(g, 'NO ES ASÍ', at('realidad'), { cx: 1510, cy: 640, size: 72, color: C.green });
});

// 2. hypertension is complex — may need more than one pill
scene(svg, at('compleja5'), at('un_organo'), g => {
  obj(g, 'pastillero', at('compleja5'), { cx: 560, cy: 470, fit: 520 });
  chip(g, 'UNA ENFERMEDAD COMPLEJA', at('compleja5') + 0.5, { cx: 1340, cy: 380, size: 38, fill: C.ink, color: C.white });
  chip(g, 'MÁS QUE UNA PASTILLA', at('unica') - 0.5, { cx: 1340, cy: 540, size: 40, fill: C.amber });
});

// 3. BP depends on several systems: kidneys (water, sodium), arteries (contraction), hormones (RAA system)
scene(svg, at('un_organo'), at('familia'), g => {
  chip(g, 'NO DEPENDE DE UN SOLO ÓRGANO', at('un_organo'), { cy: 100, size: 42, fill: C.ink, color: C.amber });
  const nodes = [['rinon', 'RIÑONES', 'rinones5', 420, 420], ['corazon', 'ARTERIAS', 'arterias5', 960, 420], ['blister', 'HORMONAS', 'hormonas', 1500, 420]];
  nodes.forEach(([n, s, k, x, y], i) => {
    const L = Live(g, { t0: at(k) - 0.3, cx: x, cy: y, enter: 'pop', idle: 'bob', phase: i * 0.3 });
    el('circle', { cx: x, cy: y, r: 170, fill: C.white, stroke: C.ink, 'stroke-width': 7 }, L.g);
    if (n === 'blister') { for (let j = 0; j < 5; j++) el('circle', { cx: x - 80 + j * 40, cy: y + 30 * Math.sin(j * 2), r: 20, fill: '#8E5BB5', stroke: C.ink, 'stroke-width': 4 }, L.g); }
    else Cutout(L.g, src(n), { cx: x, cy: y, iw: SZ[n][0], ih: SZ[n][1], fit: 250 });
    Chip(L.g, s, { cx: x, cy: y + 210, size: 34, fill: C.amber });
    sfx(at(k) - 0.3, 'pop');
  });
  arrow(g, 590, 420, 790, 420, at('arterias5'), { color: C.ink, w: 8 });
  arrow(g, 1130, 420, 1330, 420, at('hormonas'), { color: C.ink, w: 8 });
  chip(g, 'SISTEMA RENINA-ANGIOTENSINA-ALDOSTERONA', at('renina'), { cy: 860, size: 32, fill: C.white });
});

// 4. each drug family works on a different mechanism
scene(svg, at('familia'), at('estrategia'), g => {
  chip(g, 'CADA FAMILIA, UN MECANISMO', at('familia'), { cy: 70, size: 44, fill: C.ink, color: C.amber });
  tile(g, 'k_vasodila', at('relajacion') - 0.3, { x: 70, y: 150, w: 570, h: 370, label: 'RELAJAN LOS VASOS' });
  tile(g, 'k_diuretico', at('eliminar') - 0.3, { x: 675, y: 150, w: 570, h: 370, label: 'ELIMINAN SAL Y AGUA' });
  tile(g, 'k_escudo', at('bloquean5') - 0.3, { x: 1280, y: 150, w: 570, h: 370, label: 'BLOQUEAN HORMONAS' });
  chip(g, 'UNA SOLA PUEDE FUNCIONAR…', at('por_eso5'), { cx: 960, cy: 750, size: 40, fill: C.white });
  chip(g, '…Y NO BASTAR SOLA', at('por_eso5') + 3, { cx: 960, cy: 880, size: 40, fill: C.amber });
});

// 5. combine families: two or three complementary actives often beat one high-dose drug
scene(svg, at('estrategia'), at('no_todas5'), g => {
  pan(g, 'k_equipo', 'left', { from: [0.3, 0.5], to: [0.6, 0.45] });
  chip(g, 'COMBINAR FAMILIAS', at('combinar'), { cx: 1510, cy: 260, size: 44, fill: C.green, color: C.white });
  chip(g, '2 – 3 PRINCIPIOS ACTIVOS', at('dos_tres'), { cx: 1510, cy: 420, size: 36, fill: C.white });
  mark(g, 'MEJOR QUE SUBIR MUCHO UNO SOLO', true, at('unico') - 1, { cx: 1480, cy: 580, size: 24 });
  source(g, 'Sociedad Europea de Cardiología (ESC 2024) y de Hipertensión (ESH 2023): tratamiento combinado', at('combinar') + 1);
});

// 6. not everyone needs three: depends on age, kidneys, other diseases, side effects, numbers
scene(svg, at('no_todas5'), at('anos5'), g => {
  mark(g, 'NO TODOS NECESITAN TRES', false, at('no_todas5') + 0.5, { cx: 960, cy: 140, size: 44 });
  chip(g, 'DEPENDE DE:', at('eleccion'), { cx: 960, cy: 300, size: 44, fill: C.ink, color: C.white });
  [['LA EDAD', 'edad', 0, 480, 460], ['LOS RIÑONES', 'edad', 1.3, 1440, 460], ['OTRAS ENFERMEDADES', 'edad', 2.6, 480, 620], ['EFECTOS SECUNDARIOS', 'efectos', 0, 1440, 620], ['TUS CIFRAS', 'efectos', 2, 960, 780]]
    .forEach(([s, k, d, cx, cy]) => chip(g, s, at(k) + d, { cx, cy, size: 36, fill: C.amber }));
});

// 7. arteries change with age: lose elasticity; extra weight and metabolic problems
scene(svg, at('anos5'), at('atencion5'), g => {
  const a = pan(g, 't_elastica', 'left', { from: [0.3, 0.5], to: [0.6, 0.5] });
  const b = pan(g, 't_rigida', 'left', { from: [0.3, 0.5], to: [0.6, 0.5] });
  anim(t => { const k = E.inOut(prog(t, at('elasticidad') - 0.2, at('elasticidad') + 0.6)); a.g.setAttribute('opacity', 1 - k); b.g.setAttribute('opacity', k); });
  chip(g, 'LAS ARTERIAS CAMBIAN', at('anos5'), { cx: 1510, cy: 250, size: 36, fill: C.ink, color: C.white });
  chip(g, '↓ ELASTICIDAD', at('elasticidad') + 0.5, { cx: 1510, cy: 400, size: 44, fill: C.red, color: C.white });
  chip(g, '+ EXCESO DE PESO', at('peso'), { cx: 1510, cy: 540, size: 38, fill: C.amber });
  chip(g, '+ TRASTORNOS METABÓLICOS', at('metabolicos'), { cx: 1510, cy: 680, size: 30, fill: C.amber });
});

// 8. high on medication ≠ automatically "resistant hypertension": check readings, adherence, interfering factors
scene(svg, at('atencion5'), at('herramienta'), g => {
  chip(g, 'ATENCIÓN', at('atencion5'), { cy: 90, size: 50, fill: C.red, color: C.white });
  mark(g, '¿HIPERTENSIÓN RESISTENTE? NO AUTOMÁTICAMENTE', false, at('resistente') - 1, { cx: 960, cy: 230, size: 32 });
  chip(g, 'ANTES, EL MÉDICO DEBE:', at('antes5'), { cx: 960, cy: 390, size: 40, fill: C.ink, color: C.white });
  mark(g, 'COMPROBAR LAS MEDICIONES', true, at('comprobar'), { cx: 960, cy: 540, size: 36 });
  mark(g, 'VALORAR SI TOMAS EL TRATAMIENTO', true, at('adherencia'), { cx: 960, cy: 680, size: 32 });
  mark(g, 'DESCARTAR LO QUE INTERFIERE', true, at('descartar'), { cx: 960, cy: 820, size: 34 });
});

// 9. your best tool: a reliable log + list of all medicines → adjust timing, doses, combine, secondary causes
scene(svg, at('herramienta'), at('nunca5'), g => {
  pan(g, 'p_consulta', 'left', { from: [0.4, 0.45], to: [0.5, 0.5] });
  chip(g, 'TU REGISTRO DE CIFRAS', at('herramienta') + 0.5, { cx: 1510, cy: 180, size: 32, fill: C.green, color: C.white });
  chip(g, '+ LISTA DE MEDICAMENTOS', at('lista'), { cx: 1510, cy: 290, size: 30, fill: C.green, color: C.white });
  [['HORARIOS', 'horarios5', 420], ['DOSIS', 'ajustar', 530], ['COMBINACIONES', 'combinar5', 640], ['CAUSAS SECUNDARIAS', 'secundarias', 750]]
    .forEach(([s, k, y]) => chip(g, '→ ' + s, at(k), { cx: 1510, cy: y, size: 30, fill: C.white }));
  tag(g, 'RIÑÓN · HORMONAS', at('secundarias') + 1, { x: 1300, y: 830 });
});

// 10. never raise, lower or stop medication yourself — risk of excessive drops or complications (≥ 6 s)
scene(svg, at('nunca5'), at('solucion'), g => {
  obj(g, 'pastillero', at('nunca5'), { cx: 960, cy: 360, fit: 540, amp: 0.5 });
  warn(g, 'NUNCA POR TU CUENTA', ['NI AUMENTAR · NI REDUCIR · NI SUSPENDER'], at('nunca5') + 0.4, { y: 600, w: 1300, size: 40 });
}, { punch: [at('nunca5') + 0.4] });

// 11. the answer isn't always more medicine, but the right combination and follow-up; you haven't failed
scene(svg, at('solucion'), at('idea_fund'), g => {
  pan(g, 'z_cuaderno', 'left', { from: [0.4, 0.5], to: [0.5, 0.45] });
  mark(g, 'NO SIEMPRE «MÁS PASTILLAS»', false, at('solucion') + 1, { cx: 1490, cy: 260, size: 26 });
  mark(g, 'LA COMBINACIÓN ADECUADA', true, at('combinacion'), { cx: 1510, cy: 420, size: 30 });
  chip(g, 'NO HAS FRACASADO', at('fracasado'), { cx: 1510, cy: 600, size: 44, fill: C.green, color: C.white });
});

// 12. persistently high BP deserves a medical review, not hasty decisions
scene(svg, at('idea_fund'), at('llegados') - 0.3, g => {
  pan(g, 'p_explica', 'full', { from: [0.4, 0.5], to: [0.55, 0.45] });
  cap(g, 'EVALUACIÓN MÉDICA, NO PRISAS', at('evaluacion'), { hi: 'EVALUACIÓN MÉDICA', hiColor: '#7DE08E' });
  source(g, 'Recomendaciones de la Sociedad Europea de Cardiología sobre tratamiento combinado e hipertensión resistente', at('evaluacion'));
});
