// PUNTO 5 — how many eggs a week: no perfect number for everyone; healthy adults up to one a day can fit a
// balanced diet (AHA 2020), not an obligation and more isn't better; protein for muscle, B12, choline,
// lutein; Mediterranean pattern; soluble fibre lowers LDL; easy combos; with high LDL, diabetes, FH or CVD
// individualise yolks with a professional (more whites); your tests guide; habits you repeat matter.

// 0. kicker
scene(svg, at('p5') - 0.3, at('llegamos5'), g => {
  pan(g, 'n_semana', 'full', { from: [0.45, 0.5], to: [0.55, 0.45] });
  kicker(g, 'PUNTO 5', '¿CUÁNTOS HUEVOS A LA SEMANA?', at('p5'));
});

// 1. every day, or limit them? there's no perfect number for everyone; not just counting eggs
scene(svg, at('llegamos5'), at('sanos5'), g => {
  wrapQ(g, at('llegamos5') + 0.3, 960, 170, 1.3);
  chip(g, '¿TODOS LOS DÍAS O LIMITARLOS?', at('seguro5'), { cy: 360, size: 44, fill: C.white });
  mark(g, 'UNA CIFRA PERFECTA PARA TODOS', false, at('perfecta5'), { cy: 540, size: 40 });
  chip(g, 'NO SOLO CONTAR HUEVOS', at('contar5'), { cy: 720, size: 44, fill: C.amber });
  chip(g, 'TU DIETA + TU SITUACIÓN', at('contar5') + 2.5, { cy: 860, size: 40, fill: TEAL, color: C.white });
});

// 2. healthy adults: up to one egg a day can fit a balanced, heart-healthy diet
scene(svg, at('sanos5'), at('sin_embargo5'), g => {
  chip(g, 'ADULTOS SANOS', at('sanos5') + 0.2, { cy: 110, size: 48, fill: C.ink, color: C.amber });
  for (let i = 0; i < 7; i++) {
    const cx = 330 + i * 210, L = Live(g, { t0: at('sanos5') + 1 + i * 0.25, cx, cy: 380, enter: 'pop', idle: 'none' });
    el('rect', { x: cx - 90, y: 290, width: 180, height: 180, rx: 24, fill: C.white, stroke: C.ink, 'stroke-width': 6 }, L.g);
    Cutout(L.g, src('huevo'), { cx, cy: 380, iw: SZ.huevo[0], ih: SZ.huevo[1], fit: 130 });
  }
  sfx(at('sanos5') + 1, 'pop');
  chip(g, 'HASTA 1 HUEVO AL DÍA', at('sanos5') + 2.5, { cy: 620, size: 64, fill: C.green, color: C.white });
  chip(g, 'DENTRO DE UNA DIETA EQUILIBRADA', at('equilibrada5'), { cy: 780, size: 40, fill: C.white });
  source(g, 'American Heart Association (2020) · Drouin-Chartier et al., BMJ 2020', at('sanos5') + 2.5);
}, { punch: [at('sanos5') + 2.5] });

// 3. not an obligation to eat 7 a week; more isn't automatically better; your levels and history count
scene(svg, at('sin_embargo5'), at('caracteristicas5'), g => {
  mark(g, 'NO ES OBLIGATORIO COMER 7', false, at('sin_embargo5') + 1, { cy: 200, size: 44 });
  mark(g, 'MÁS HUEVOS ≠ MÁS BENEFICIOS', false, at('adicionales5') - 1, { cy: 370, size: 44 });
  chip(g, 'TAMBIÉN CUENTAN:', at('necesidades5'), { cy: 550, size: 40, fill: C.ink, color: C.amber });
  chip(g, 'TUS NECESIDADES · TU COLESTEROL · TUS ANTECEDENTES', at('necesidades5') + 1, { cy: 690, size: 32, fill: C.white });
});

// 4. high-quality protein to keep muscle as we age
scene(svg, at('caracteristicas5'), at('b12_5'), g => {
  pan(g, 'n_musculo', 'left', { from: [0.45, 0.5], to: [0.55, 0.5] });
  chip(g, 'PROTEÍNA DE ALTA CALIDAD', at('proteinas5'), { cx: 1510, cy: 330, size: 30, fill: C.green, color: C.white });
  chip(g, 'CONSERVA LA MASA MUSCULAR', at('masa5'), { cx: 1510, cy: 480, size: 28, fill: C.white });
});

// 5. vitamin B12, choline, lutein — but no single food can make up for an unbalanced diet
scene(svg, at('b12_5'), at('mediterranea5'), g => {
  pan(g, 'n_nutrientes', 'left', { from: [0.5, 0.5], to: [0.5, 0.45] });
  chip(g, 'VITAMINA B12', at('b12_5') + 0.4, { cx: 1510, cy: 240, size: 40, fill: C.white });
  chip(g, 'COLINA', at('colina5'), { cx: 1510, cy: 370, size: 40, fill: C.white });
  chip(g, 'LUTEÍNA', at('colina5') + 0.7, { cx: 1510, cy: 500, size: 40, fill: C.white });
  mark(g, 'NO COMPENSA UNA MALA DIETA', false, at('compensar5'), { cx: 1510, cy: 680, size: 28 });
});

// 6. the Mediterranean diet: egg + vegetables, legumes, whole grains, EVOO — not cold cuts, butter, ultra-processed
scene(svg, at('mediterranea5'), at('aliado5'), g => {
  pan(g, 'n_plato', 'left', { from: [0.5, 0.5], to: [0.55, 0.45] });
  chip(g, 'DIETA MEDITERRÁNEA', at('mediterranea5') + 0.4, { cx: 1510, cy: 180, size: 36, fill: C.ink, color: C.amber });
  mark(g, 'VERDURAS', true, at('verduras5'), { cx: 1510, cy: 300, size: 32 });
  mark(g, 'LEGUMBRES', true, at('legumbres5'), { cx: 1510, cy: 410, size: 32 });
  mark(g, 'CEREALES INTEGRALES', true, at('cereales5'), { cx: 1510, cy: 520, size: 30 });
  mark(g, 'ACEITE DE OLIVA VIRGEN EXTRA', true, at('aceite5'), { cx: 1510, cy: 630, size: 26 });
  mark(g, 'EMBUTIDOS · ULTRAPROCESADOS', false, at('ultra5') + 0.5, { cx: 1510, cy: 780, size: 26 });
});

// 7. a forgotten ally: soluble fibre — oats, lentils, chickpeas, apples, some vegetables
scene(svg, at('aliado5'), at('absorcion5'), g => {
  chip(g, 'UN ALIADO OLVIDADO', at('aliado5') + 0.3, { cy: 90, size: 42, fill: C.white });
  stamp(g, 'FIBRA SOLUBLE', at('soluble5'), { cy: 230, size: 76, color: C.green, rot: -3 });
  [['avena', 'AVENA', 'avena5'], ['lentejas', 'LENTEJAS', 'lentejas5'], ['garbanzos', 'GARBANZOS', 'garbanzos5'], ['manzana', 'MANZANAS', 'manzanas5'], ['espinacas', 'VERDURAS', 'verduras5b']]
    .forEach(([n, s, k], i) => Food(g, n, at(k) - 0.3, { cx: 230 + i * 365, cy: 560, r: 140, label: s, phase: i * 0.2 }));
});

// 8. it reduces cholesterol absorption and helps remove bile acids → better LDL
scene(svg, at('absorcion5'), at('ejemplo5'), g => {
  tile(g, 'f_red', at('absorcion5'), { x: 70, y: 160, w: 570, h: 380, label: '↓ ABSORCIÓN' });
  tile(g, 'f_bilis', at('biliares5') - 0.3, { x: 675, y: 160, w: 570, h: 380, label: 'SE ELIMINAN ÁCIDOS BILIARES' });
  tile(g, 'f_tubos', at('mejorar5') - 0.3, { x: 1280, y: 160, w: 570, h: 380, label: '↓ COLESTEROL LDL' });
  source(g, 'EFSA: la fibra soluble (beta-glucano de avena) ayuda a reducir el colesterol LDL', at('mejorar5'));
});

// 9. easy combinations: spinach omelette + wholegrain toast, boiled egg + chickpea salad, poached eggs on veg
scene(svg, at('ejemplo5'), at('ahora5'), g => {
  tile(g, 't_tortilla', at('ejemplo5') + 0.5, { x: 70, y: 150, w: 570, h: 380, label: 'TORTILLA DE ESPINACAS' });
  tile(g, 't_garbanzos', at('ensalada5') - 0.5, { x: 675, y: 150, w: 570, h: 380, label: 'HUEVO + GARBANZOS' });
  tile(g, 't_escalfado', at('escalfados5') - 0.3, { x: 1280, y: 150, w: 570, h: 380, label: 'ESCALFADOS + VERDURAS' });
  chip(g, 'SACIEDAD Y VARIEDAD', at('saciedad5'), { cy: 760, size: 48, fill: C.green, color: C.white });
});

// 10. high LDL, diabetes, FH or CVD: individualise yolks with a professional; more whites, fewer yolks
scene(svg, at('ahora5'), at('recuerda5'), g => {
  chip(g, 'SI TIENES…', at('ahora5') + 0.3, { cx: 480, cy: 130, size: 44, fill: C.ink, color: C.amber });
  [['LDL ELEVADO', 'ahora5', 1.8], ['DIABETES', 'diabetes5', 0], ['HIPERCOLESTEROLEMIA FAMILIAR', 'diabetes5', 1], ['ENFERMEDAD CARDIOVASCULAR', 'antecedentes5', 0]]
    .forEach(([s, k, d], i) => chip(g, s, at(k) + d, { cx: 480, cy: 280 + i * 130, size: 30, fill: C.red, color: C.white }));
  Food(g, 'cocido', at('individualizar5') - 0.3, { cx: 1400, cy: 330, r: 150 });
  chip(g, 'LAS YEMAS, CON TU PROFESIONAL', at('individualizar5'), { cx: 1400, cy: 560, size: 32, fill: C.amber });
  chip(g, 'MÁS CLARAS, MENOS YEMAS', at('claras5'), { cx: 1400, cy: 700, size: 36, fill: C.green, color: C.white });
});

// 11. your test results beat general advice; your doctor decides when to re-check
scene(svg, at('recuerda5'), at('idea5'), g => {
  pan(g, 'z_medico', 'left', { from: [0.45, 0.45], to: [0.55, 0.5] });
  chip(g, 'TUS ANÁLISIS', at('recuerda5') + 1, { cx: 1510, cy: 300, size: 40, fill: C.white });
  chip(g, '> CONSEJOS GENERALES', at('recuerda5') + 2, { cx: 1510, cy: 420, size: 34, fill: C.amber });
  chip(g, 'TU MÉDICO DECIDE CUÁNDO REPETIRLOS', at('comprobar5') - 1, { cx: 1510, cy: 600, size: 24, fill: C.white });
});

// 12. caring for your heart isn't fearing one food but building habits you can keep for years
scene(svg, at('idea5'), at('martes5'), g => {
  pan(g, 'z_desayuno', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  cap(g, 'SIN MIEDO A UN ALIMENTO…', at('miedo5'), { hi: 'SIN MIEDO', t1: at('habitos5') });
  cap(g, '…HÁBITOS QUE PUEDAS MANTENER', at('habitos5'), { hi: 'HÁBITOS', hiColor: '#7DE08E' });
});

// 13. it's not the egg on a Tuesday, it's what you repeat every day
scene(svg, at('martes5'), at('cada_dia5') + 2.4, g => {
  for (let i = 0; i < 7; i++) {
    const cx = 330 + i * 210, L = Live(g, { t0: at('martes5') + i * 0.12, cx, cy: 400, enter: 'pop', idle: 'none' });
    el('rect', { x: cx - 90, y: 310, width: 180, height: 180, rx: 24, fill: i === 1 ? C.amber : C.white, stroke: C.ink, 'stroke-width': 6 }, L.g);
    if (i === 1) Cutout(L.g, src('huevo'), { cx, cy: 400, iw: SZ.huevo[0], ih: SZ.huevo[1], fit: 120 });
    else Icon.check(L.g, cx - 50, 350, 1);
  }
  chip(g, 'NO ES EL HUEVO DE UN MARTES…', at('martes5') + 0.5, { cy: 680, size: 44, fill: C.white });
  chip(g, '…ES LO QUE REPITES CADA DÍA', at('cada_dia5') - 1.5, { cy: 830, size: 48, fill: C.green, color: C.white });
});
