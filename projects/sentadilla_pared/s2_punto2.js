// PUNTO 2 — the science: BP depends on the heart's force AND vascular resistance (hose); arteries contract/
// relax, flexibility drops with age, inactivity, hypertension; the wall sit = sustained isometric contraction;
// over weeks, programmes can lower resting BP (vascular function, nerve regulation); nitric oxide — not an
// instant effect; BP rises during the hold → no breath-holding, don't force the knees, ask if uncontrolled HTN.

// 0. kicker
scene(svg, at('p2') - 0.3, at('solo2'), g => {
  pan(g, 'p_arterias', 'full', { from: [0.5, 0.5], to: [0.5, 0.45] });
  kicker(g, 'PUNTO 2', 'LA CIENCIA DETRÁS\nDEL EJERCICIO EN LA PARED', at('p2'));
});

// 1. BP depends on how hard the heart beats AND the resistance the blood meets
scene(svg, at('solo2'), at('manguera2'), g => {
  heart(g, at('solo2') + 0.2, 480, 420, 420);
  chip(g, 'MILES DE KILÓMETROS DE VASOS', at('kilometros2'), { cx: 480, cy: 760, size: 32, fill: C.white });
  chip(g, 'LA PRESIÓN DEPENDE DE:', at('detalle2') + 1, { cx: 1360, cy: 300, size: 38, fill: C.ink, color: C.amber });
  chip(g, '1 · LA FUERZA DEL LATIDO', at('fuerza2'), { cx: 1360, cy: 450, size: 34, fill: C.white });
  chip(g, '2 · LA RESISTENCIA DE LOS VASOS', at('resistencia2'), { cx: 1360, cy: 580, size: 30, fill: C.amber });
});

// 2. like a garden hose; arteries contract or relax; flexibility drops with years, inactivity, hypertension
scene(svg, at('manguera2'), at('apoyas2'), g => {
  tile(g, 'p_manguera', at('manguera2'), { x: 140, y: 150, w: 760, h: 500, label: 'COMO UNA MANGUERA' });
  tile(g, 'p_arterias', at('contraerse2') - 0.3, { x: 1020, y: 150, w: 760, h: 500, label: 'ARTERIAS FLEXIBLES · RÍGIDAS' });
  chip(g, 'CON LOS AÑOS: MENOS FLEXIBILIDAD', at('anos2'), { cy: 790, size: 38, fill: C.white });
  chip(g, '+ SEDENTARISMO · HIPERTENSIÓN', at('sedentarismo2'), { cy: 920, size: 34, fill: C.amber });
});

// 3. back against the wall, knees bent to a comfortable position: thighs work although you barely move
scene(svg, at('apoyas2'), at('semanas2'), g => {
  WallPoses(g, 'pared', at('apoyas2'), { wallX: 380, floorY: 990, h: 880, idx: KEYS([[0, 0], [at('apoyas2') + 1.5, 1], [at('flexionas2'), 2]]) });
  chip(g, 'LOS MUSLOS TRABAJAN', at('muslos2'), { cx: 1320, cy: 260, size: 40, fill: C.white });
  stamp(g, 'EJERCICIO ISOMÉTRICO', at('isometrico2'), { cx: 1320, cy: 430, size: 46, color: TEAL, rot: -3 });
  chip(g, 'CAMBIOS TEMPORALES EN EL FLUJO', at('cambios2'), { cx: 1320, cy: 610, size: 28, fill: C.white });
  chip(g, 'Y EN EL SISTEMA NERVIOSO', at('cambios2') + 2, { cx: 1320, cy: 720, size: 28, fill: C.white });
});

// 4. repeated over weeks: programmes can lower resting BP (vessel function, nerve regulation, vascular capacity)
scene(svg, at('semanas2'), at('oxido2') - 1, g => {
  pan(g, 'p_semanas', 'left', { from: [0.4, 0.5], to: [0.55, 0.45] });
  chip(g, 'DURANTE VARIAS SEMANAS', at('semanas2') + 0.3, { cx: 1510, cy: 200, size: 32, fill: C.ink, color: C.amber });
  chip(g, '↓ PRESIÓN EN REPOSO', at('reducir2'), { cx: 1510, cy: 340, size: 40, fill: C.green, color: C.white });
  ['MEJOR FUNCIÓN DE LOS VASOS', 'REGULACIÓN NERVIOSA', 'MÁS CAPACIDAD VASCULAR'].forEach((s, i) =>
    chip(g, s, at('mecanismos2') + 1 + i * 1.8, { cx: 1510, cy: 490 + i * 115, size: 26, fill: C.white }));
  source(g, 'Edwards et al., British Journal of Sports Medicine 2023', at('reducir2'));
});

// 5. nitric oxide relaxes vessels — but one hold doesn't drop BP; the benefit comes from regular training
scene(svg, at('oxido2') - 1, at('precaucion2'), g => {
  obj(g, 'arteria', at('oxido2') - 0.8, { cx: 500, cy: 480, fit: 560 });
  chip(g, 'ÓXIDO NÍTRICO', at('oxido2'), { cx: 1320, cy: 260, size: 44, fill: TEAL, color: C.white });
  chip(g, 'RELAJA LOS VASOS', at('oxido2') + 1.5, { cx: 1320, cy: 390, size: 36, fill: C.white });
  mark(g, 'EFECTO MILAGRO EN SEGUNDOS', false, at('incorrecto2'), { cx: 1320, cy: 560, size: 28 });
  mark(g, 'ENTRENAMIENTO REGULAR', true, at('regular2') - 0.5, { cx: 1320, cy: 710, size: 34 });
});

// 6. caution: BP rises during the hold → adapt it, don't hold your breath, don't force the knees; ask first (≥ 6 s)
scene(svg, at('precaucion2'), at('suscribete2') - 0.5, g => {
  chip(g, 'DURANTE LA POSTURA, LA TENSIÓN SUBE UN POCO', at('aumentar2') - 1, { cy: 100, size: 34, fill: C.white });
  warn(g, 'PRECAUCIÓN', ['ADAPTA EL EJERCICIO A TI', 'NO AGUANTES LA RESPIRACIÓN', 'NO FUERCES LAS RODILLAS'], at('aumentar2') + 0.5, { y: 220, w: 1200, size: 42 });
  chip(g, '¿HIPERTENSIÓN NO CONTROLADA? CONSULTA ANTES', at('consulta2') - 1.5, { cy: 900, size: 34, fill: C.red, color: C.white });
}, { punch: [at('aumentar2') + 0.5] });

// 7. subscribe — science made simple, no miracle promises, safety first
scene(svg, at('suscribete2') - 0.5, at('pantorrillas2') - 1, g => {
  tile(g, 'z_tension', at('suscribete2') - 0.3, { x: 410, y: 80, w: 1100, h: 600 });
  CTAlive(g, 'sub', 'SUSCRÍBETE AL CANAL', at('suscribete2'), { y: 730 });
  chip(g, 'SIN PROMESAS MILAGROSAS', at('milagrosas2') - 1, { cy: 950, size: 36, fill: C.amber });
}, { punch: [at('suscribete2') + 0.2] });

// 8. meanwhile the calves play a key role: "the second heart"
scene(svg, at('pantorrillas2') - 1, at('p3') - 0.3, g => {
  pan(g, 'u_bomba', 'full', { from: [0.5, 0.5], to: [0.5, 0.45] });
  cap(g, '«EL SEGUNDO CORAZÓN»', at('segundo2'), { hi: 'SEGUNDO CORAZÓN', hiColor: '#FF8A7A', size: 60 });
});
