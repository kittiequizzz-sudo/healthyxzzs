// PUNTO 3 — digestive discomfort, burning, nausea: Teresa (69, dramatización) after dinner: upper-abdominal
// pressure, herbal tea, nausea, weakness, cold sweat → could justify calling emergencies; heart sits just above
// the stomach, nerve signals felt in the upper abdomen, nausea/vomiting; reflux/gastritis are common, but new,
// intense, or with alarm signs → not just antacids; 112; share with a woman you love.

// 0. kicker
scene(svg, at('p3') - 0.3, at('error3'), g => {
  pan(g, 't_sofa', 'full', { from: [0.5, 0.45], to: [0.5, 0.5] });
  kicker(g, 'SÍNTOMA 3', 'MALESTAR DIGESTIVO,\nARDOR Y NÁUSEAS', at('p3'));
});

// 1. the mistake: "any discomfort in the pit of the stomach is the food" — usually digestive, not always
scene(svg, at('error3'), at('teresa3'), g => {
  obj(g, 'estomago', at('error3') + 0.3, { cx: 500, cy: 500, fit: 560 });
  mark(g, '«SIEMPRE ES LA COMIDA»', false, at('estomago3'), { cx: 1320, cy: 300, size: 36 });
  chip(g, 'LA MAYORÍA DE VECES, SÍ', at('mayoria3'), { cx: 1320, cy: 460, size: 32, fill: C.white });
  chip(g, 'PERO UN INFARTO TAMBIÉN DA', at('manifestarse3') - 1, { cx: 1320, cy: 600, size: 28, fill: C.white });
  chip(g, 'NÁUSEAS · ARDOR · «INDIGESTIÓN»', at('manifestarse3'), { cx: 1320, cy: 720, size: 28, fill: C.red, color: C.white });
});

// 2. Teresa, 69: quiet dinner; an hour later pressure in the upper abdomen; she makes a herbal tea
scene(svg, at('teresa3'), at('continuan3'), g => {
  story(g, 'TERESA, 69 AÑOS', at('teresa3'));
  tile(g, 't_cena', at('cenar3') - 0.3, { x: 70, y: 180, w: 570, h: 380, label: 'CENA TRANQUILA' });
  tile(g, 't_sofa', at('hora3') - 0.3, { x: 675, y: 180, w: 570, h: 380, label: 'PRESIÓN EN LA PARTE ALTA' });
  tile(g, 't_infusion', at('infusion3') - 0.3, { x: 1280, y: 180, w: 570, h: 380, label: '«UNA INFUSIÓN Y YA»' });
});

// 3. it continues: nausea, strange weakness, cold sweat — this could justify calling emergencies
scene(svg, at('continuan3'), at('porque3'), g => {
  pan(g, 't_sudor', 'left', { from: [0.5, 0.4], to: [0.5, 0.5] });
  chip(g, 'LAS MOLESTIAS CONTINÚAN', at('continuan3') + 0.2, { cx: 1510, cy: 200, size: 28, fill: C.white });
  ['NÁUSEAS', 'DEBILIDAD EXTRAÑA', 'SUDOR FRÍO'].forEach((s, i) => chip(g, s, at('nauseas3') + i * 1.2, { cx: 1510, cy: 340 + i * 120, size: 34, fill: C.red, color: C.white }));
  chip(g, '→ LLAMADA A EMERGENCIAS', at('emergencias3') - 0.5, { cx: 1510, cy: 740, size: 28, fill: C.amber });
  tag(g, 'DRAMATIZACIÓN', at('continuan3'), { x: 1580, y: 960 });
});

// 4. why the stomach: the heart sits just above it; nerve signals felt in the upper abdomen; nausea, vomiting
scene(svg, at('porque3'), at('reconocer3'), g => {
  tile(g, 'd_torso', at('ubicacion3') - 0.3, { x: 140, y: 150, w: 760, h: 500, label: 'EL CORAZÓN, JUSTO ENCIMA' });
  tile(g, 'd_nervio', at('regiones3'), { x: 1020, y: 150, w: 760, h: 500, label: 'SEÑAL → PARTE ALTA DEL ABDOMEN' });
  chip(g, '¿POR QUÉ EL ESTÓMAGO?', at('porque3'), { cy: 80, size: 40, fill: C.ink, color: C.amber });
  chip(g, '+ NÁUSEAS E INCLUSO VÓMITOS', at('vomitos3'), { cy: 820, size: 38, fill: C.white });
});

// 5. a "different" indigestion: intense, sudden, unexplained, or with sweat/breath/weakness/chest pressure
scene(svg, at('reconocer3'), at('acidez3'), g => {
  chip(g, 'UNA «INDIGESTIÓN» DIFERENTE', at('reconocer3') + 0.5, { cy: 90, size: 44, fill: C.red, color: C.white });
  chip(g, 'INTENSA · REPENTINA · SIN EXPLICACIÓN', at('intensa3'), { cy: 220, size: 34, fill: C.white });
  [['termometro', 'SUDOR FRÍO'], ['pulmones', 'FALTA DE AIRE'], ['pila', 'DEBILIDAD'], ['corazon', 'PRESIÓN EN EL PECHO']]
    .forEach(([n, s], i) => Food(g, n, at('intensa3') + 2 + i * 0.6, { cx: 300 + i * 440, cy: 500, r: 130, label: s, phase: i * 0.2, size: 26 }));
  mark(g, 'TÓMALO MUY EN SERIO', true, at('serio3') - 0.5, { cy: 800, size: 40 });
});

// 6. not every heartburn is an emergency (reflux, gastritis) — but new/intense/with alarms → not just antacids
scene(svg, at('acidez3'), at('llama3') - 1, g => {
  pan(g, 'd_infusion', 'left', { from: [0.45, 0.5], to: [0.55, 0.5] });
  mark(g, 'NO TODA ACIDEZ ES EMERGENCIA', true, at('acidez3') + 0.5, { cx: 1520, cy: 200, size: 24 });
  chip(g, 'REFLUJO Y GASTRITIS: FRECUENTES', at('reflujo3'), { cx: 1520, cy: 340, size: 26, fill: C.white });
  chip(g, 'NUEVO, INTENSO O CON ALARMAS', at('reflujo3') + 3, { cx: 1520, cy: 480, size: 26, fill: C.amber });
  mark(g, 'SOLO ANTIÁCIDOS O INFUSIONES', false, at('antiacidos3'), { cx: 1520, cy: 620, size: 26 });
});

// 7. suspect a heart attack → 112; don't wait for the tea to work (≥ 6 s)
scene(svg, at('llama3') - 1, at('comparte3'), g => {
  call112(g, at('llama3') - 0.8, ['¿SOSPECHAS UN INFARTO?', 'NO ESPERES A QUE', 'LA INFUSIÓN HAGA EFECTO']);
}, { punch: [at('llama3')] });

// 8. share with an important woman: mother, sister, friend
scene(svg, at('comparte3'), at('p4') - 0.3, g => {
  tile(g, 'z_abrazo', at('comparte3'), { x: 410, y: 80, w: 1100, h: 600 });
  chip(g, 'COMPÁRTELO CON UNA MUJER IMPORTANTE', at('comparte3') + 0.5, { cy: 770, size: 38, fill: C.amber });
  chip(g, 'MADRE · HERMANA · AMIGA', at('madre3'), { cy: 900, size: 38, fill: C.white });
}, { punch: [at('comparte3') + 0.5] });
