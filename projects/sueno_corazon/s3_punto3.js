// PUNTO 3 — inflamación silenciosa: endothelium, CRP/cytokines, nitric oxide, atherosclerosis, red flags.

// Row of endothelial "tiles" (the vessel lining) that turn red from t0 over dur seconds.
function Lining(g, t0, { x = 260, y = 520, w = 1400, n = 20, redAt = 1e9, dur = 4 } = {}) {
  const L = Live(g, { t0, cx: x + w / 2, cy: y, enter: 'up', idle: 'none' });
  const tw = w / n, tiles = [];
  el('rect', { x, y: y - 70, width: w, height: 140, rx: 20, fill: '#E9A79A', stroke: C.ink, 'stroke-width': 6 }, L.g);
  for (let i = 0; i < n; i++) tiles.push(el('rect', { x: x + i * tw + 4, y: y - 46, width: tw - 8, height: 46, rx: 12, fill: '#F6D5CC', stroke: C.ink, 'stroke-width': 3 }, L.g));
  flow(L.g, `M${x} ${y + 30} L${x + w} ${y + 30}`, t0, { n: 10, period: 4, r: 16 });
  anim(t => tiles.forEach((tl, i) => {
    const k = clamp(prog(t, redAt + (i / n) * dur, redAt + (i / n) * dur + 0.5));
    set(tl, { fill: k > 0.5 ? '#E0524A' : '#F6D5CC', transform: `translate(0 ${(-6 * k * Math.sin(t * 6 + i)).toFixed(1)})` });
  }));
  return L;
}

// 0. kicker over the healthy artery
scene(svg, at('p3') - 0.3, at('hay_algo'), g => {
  pan(g, 'r_sana', 'full', { from: [0.3, 0.5], to: [0.6, 0.45] });
  kicker(g, 'PUNTO 3', 'INFLAMACIÓN SILENCIOSA', at('p3'));
});

// 1. no pain, no noise, no signs
scene(svg, at('hay_algo'), at('es_un_proceso'), g => {
  Vessel(g, at('hay_algo'), { y: 360, r: 100, speed: () => 0.9 });
  mark(g, 'SIN DOLOR', false, at('hay_algo') + 2.5, { cx: 420, cy: 760, size: 44 });
  mark(g, 'SIN RUIDO', false, at('sin_ruido'), { cx: 960, cy: 760, size: 44 });
  mark(g, 'SIN SEÑALES', false, at('sin_senal') + 0.5, { cx: 1500, cy: 760, size: 44 });
});

// 2. slowly, over years: chronic low-grade inflammation
scene(svg, at('es_un_proceso'), at('para_comprenderlo'), g => {
  pan(g, 'r_inflamada', 'left', { from: [0.2, 0.5], to: [0.6, 0.5] });
  chip(g, 'LENTAMENTE, DURANTE AÑOS', at('es_un_proceso') + 0.5, { cx: 1510, cy: 280, size: 32, fill: C.white });
  chip(g, 'INFLAMACIÓN CRÓNICA', at('bajo_grado') - 0.5, { cx: 1510, cy: 460, size: 40, fill: C.red, color: C.white });
  chip(g, 'DE BAJO GRADO', at('bajo_grado'), { cx: 1510, cy: 580, size: 40, fill: C.red, color: C.white });
}, { punch: [at('bajo_grado')] });

// 3. the endothelium: a thin layer of cells lining every vessel
scene(svg, at('para_comprenderlo'), at('aunque_grosor'), g => {
  pan(g, 'r_sana', 'left', { from: [0.6, 0.3], to: [0.7, 0.25], zoom: 0.35 });
  chip(g, 'ENDOTELIO', at('endotelio'), { cx: 1510, cy: 330, size: 64, fill: TEAL, color: C.white });
  chip(g, 'UNA CAPA FINA DE CÉLULAS', at('fina_capa'), { cx: 1510, cy: 490, size: 32 });
  chip(g, 'DENTRO DE TODOS TUS VASOS', at('fina_capa') + 2, { cx: 1510, cy: 610, size: 32 });
});

// 4. tiny but essential: dilation, clotting control, healthy flow
scene(svg, at('aunque_grosor'), at('podriamos'), g => {
  Lining(g, at('aunque_grosor'), { y: 330 });
  chip(g, 'APENAS TIENE GROSOR…', at('aunque_grosor') + 0.3, { cy: 110, size: 44 });
  chip(g, 'DILATACIÓN', at('dilatacion'), { cx: 460, cy: 680, size: 44, fill: TEAL, color: C.white });
  chip(g, 'COAGULACIÓN', at('coagulacion'), { cx: 960, cy: 680, size: 44, fill: TEAL, color: C.white });
  chip(g, 'CIRCULACIÓN SANA', at('circulacion3'), { cx: 1460, cy: 680, size: 44, fill: TEAL, color: C.white });
});

// 5. like the inner lining of a very delicate pipe
scene(svg, at('podriamos'), at('pero_que3'), g => {
  Vessel(g, at('podriamos'), { y: 470, r: 130, speed: () => 1.1, glow: '#7FE0D4' });
  chip(g, 'COMO UNA TUBERÍA DELICADA', at('tuberia') - 0.3, { cy: 120, size: 48, fill: C.ink, color: C.white });
  mark(g, 'LA SANGRE CIRCULA BIEN', true, at('tuberia') + 2.5, { cx: 960, cy: 860, size: 40 });
});

// 6. weeks of 5-hour nights, constant waking, a different bedtime every night
scene(svg, at('pero_que3'), at('diversas'), g => {
  chip(g, '¿Y SI ACUMULAS SEMANAS…?', at('pero_que3'), { cy: 110, size: 48, fill: NIGHT, color: C.white });
  const ck = (cx, t0, f) => { const c = Clock(g, { cx, cy: 420, r: 150, night: true }); const L = Live(g, { t0, cx, cy: 420, idle: 'bob', phase: cx / 900 }); L.g.appendChild(c.g); anim(f(c)); };
  ck(400, at('cinco_horas3'), c => t => c.draw(2 + 5 * E.inOut(prog(t, at('cinco_horas3'), at('cinco_horas3') + 2))));
  ck(960, at('despertandote'), c => t => c.draw(3 + ((t * 0.7) % 3)));
  ck(1520, at('hora_diferente'), c => t => c.draw([22, 0.5, 23.2, 1.7][Math.floor((t - at('hora_diferente')) / 0.9) % 4 >>> 0]));
  chip(g, '5 HORAS', at('cinco_horas3'), { cx: 400, cy: 680, size: 40, fill: C.amber });
  chip(g, 'DESPERTARES', at('despertandote'), { cx: 960, cy: 680, size: 40, fill: C.amber });
  chip(g, 'HORARIOS DISTINTOS', at('hora_diferente'), { cx: 1520, cy: 680, size: 36, fill: C.amber });
});

// 7. research links short sleep with inflammation: CRP and some cytokines can rise
scene(svg, at('diversas'), at('el_problema3'), g => {
  chip(g, 'INVESTIGACIONES', at('diversas'), { cy: 110, size: 48, fill: C.ink, color: C.white });
  [['PROTEÍNA C REACTIVA', 'proteina', 330], ['CITOCINAS', 'citocinas', 560]].forEach(([s, k, y], i) => {
    const L = Live(g, { t0: at('diversas') + 1 + i * 0.6, cx: 960, cy: y, enter: 'l', idle: 'none' });
    Text(L.g, s, { x: 400, y: y - 60, size: 40, anchor: 'start' });
    const b = Bar(L.g, { x: 400, y: y - 20, w: 1120, h: 80, color: C.red });
    anim(t => b.draw(0.35 + 0.4 * E.out(prog(t, at(k), at(k) + 2)) + 0.02 * Math.sin(t * 4)));
  });
  chip(g, '«MENSAJEROS» DEL SISTEMA INMUNITARIO', at('citocinas') + 1.5, { cy: 780, size: 36, fill: C.amber });
  source(g, 'Irwin y col., Biological Psychiatry 2016 (metaanálisis): alteraciones del sueño y marcadores inflamatorios', at('proteina'));
});

// 8. if it persists + other risk factors → the endothelium works worse, arteries relax less
scene(svg, at('el_problema3'), at('aqui_entra'), g => {
  Lining(g, at('el_problema3'), { y: 360, redAt: at('el_problema3') + 1, dur: 5 });
  chip(g, 'SI LA INFLAMACIÓN PERSISTE', at('el_problema3') + 0.3, { cy: 110, size: 44, fill: C.red, color: C.white });
  chip(g, '+ OTROS FACTORES DE RIESGO', at('otros_factores'), { cx: 960, cy: 640, size: 40, fill: C.amber });
  chip(g, 'LAS ARTERIAS SE RELAJAN PEOR', at('relajarse') - 1, { cx: 960, cy: 820, size: 40 });
});

// 9. nitric oxide lets vessels widen; with endothelial dysfunction that response suffers
scene(svg, at('aqui_entra'), at('y_esto'), g => {
  pan(g, 'r_oxido', 'left', { from: [0.3, 0.3], to: [0.6, 0.4] });
  chip(g, 'ÓXIDO NÍTRICO', at('oxido'), { cx: 1510, cy: 280, size: 52, fill: C.blue, color: C.white });
  chip(g, '→ DILATACIÓN', at('dilatacion2'), { cx: 1510, cy: 420, size: 44, fill: C.white });
  chip(g, '→ FLUJO REGULADO', at('dilatacion2') + 1.5, { cx: 1510, cy: 540, size: 40, fill: C.white });
  stamp(g, 'COMPROMETIDO', at('comprometida'), { cx: 1510, cy: 740, size: 56, color: C.red });
});

// 10. an altered endothelium favours atherosclerosis: fat deposits in the artery walls
scene(svg, at('y_esto'), at('sin_embargo3'), g => {
  pan(g, 'r_placa', 'full', { from: [0.3, 0.5], to: [0.55, 0.45], zoom: 0.22 });
  cap(g, 'ATEROSCLEROSIS', at('aterosclerosis'), { cy: 130, size: 60, hi: 'ATEROSCLEROSIS', hiColor: '#FFB27A' });
  cap(g, 'DEPÓSITOS DE GRASA EN LAS PAREDES', at('grasa'), { size: 48, hi: 'GRASA' });
});

// 11. sleeping badly doesn't mean inevitable damage — risk depends on many factors
scene(svg, at('sin_embargo3'), at('tampoco'), g => {
  chip(g, 'CONVIENE RECORDAR', at('sin_embargo3'), { cy: 110, size: 44, fill: C.ink, color: C.amber });
  mark(g, 'DORMIR MAL ≠ DAÑO INEVITABLE', true, at('inevitablemente'), { cx: 960, cy: 280, size: 44 });
  chip(g, 'EL RIESGO DEPENDE DE:', at('muchos_factores'), { cx: 960, cy: 450, size: 40 });
  [['PRESIÓN ARTERIAL', 'muchos_factores', 1.8, 480, 600], ['COLESTEROL', 'colesterol', 0, 1440, 600], ['TABACO', 'tabaquismo', 0, 480, 760], ['PREDISPOSICIÓN', 'predisposicion', 0, 1440, 760]]
    .forEach(([s, k, d, cx, cy]) => chip(g, s, at(k) + d, { cx, cy, size: 40, fill: C.amber }));
});

// 12. tiredness alone doesn't reveal inflammation — chest discomfort, breathlessness, lower capacity → doctor
scene(svg, at('tampoco'), at('un_dolor'), g => {
  tile(g, 's_cansado', at('tampoco'), { x: 80, y: 120, w: 560, h: 370, label: 'CANSANCIO ≠ DIAGNÓSTICO' });
  tile(g, 's_pecho', at('toracicas') - 0.3, { x: 680, y: 120, w: 560, h: 370, label: 'MOLESTIAS TORÁCICAS' });
  tile(g, 's_aire', at('falta_aire') - 0.3, { x: 1280, y: 120, w: 560, h: 370, label: 'FALTA DE AIRE' });
  chip(g, 'MENOS CAPACIDAD FÍSICA', at('capacidad'), { cx: 960, cy: 670, size: 40, fill: C.amber });
  chip(g, '→ VALORACIÓN MÉDICA', at('valoracion3') - 0.4, { cx: 960, cy: 830, size: 50, fill: TEAL, color: C.white });
});

// 13. warning (≥ 6 s): intense chest pain or major breathing difficulty → emergency, 112
scene(svg, at('un_dolor'), at('y_ahora3'), g => {
  warn(g, '¡ATENCIÓN URGENTE!', ['DOLOR INTENSO EN EL PECHO', 'DIFICULTAD RESPIRATORIA IMPORTANTE'], at('un_dolor'), { y: 140 });
  chip(g, 'LLAMA AL 112', at('un_dolor') + 1.5, { cx: 960, cy: 760, size: 70, fill: C.red, color: C.white });
}, { punch: [at('un_dolor') + 1.5] });

// 14. how many hours do you sleep, how do you wake up? tell me in the comments
scene(svg, at('y_ahora3'), at('porque_todavia3'), g => {
  tile(g, 's_horas', at('y_ahora3'), { x: 410, y: 90, w: 1100, h: 620 });
  chip(g, '¿CUÁNTAS HORAS DUERMES?', at('cuantas3'), { cx: 960, cy: 70, size: 42, fill: NIGHT, color: C.white });
  CTAlive(g, 'comment', 'CUÉNTAMELO EN LOS COMENTARIOS', at('cuentamelo') - 0.3);
});

// 15. next: a problem that interrupts your breathing while you sleep
scene(svg, at('porque_todavia3'), at('p4') - 0.3, g => {
  const L = Live(g, { t0: at('porque_todavia3'), cx: 960, cy: 470, enter: 'up', idle: 'none' });
  Card(L.g, { x: 260, y: 300, w: 1400, h: 340, fill: NIGHT, r: 30 });
  const p = el('path', { fill: 'none', stroke: '#8FC7FF', 'stroke-width': 10, 'stroke-linecap': 'round' }, L.g);
  anim(t => {
    let d = '';
    for (let x = 300; x <= 1620; x += 10) {
      const s = (x - 300) / 220 - (t - at('porque_todavia3')) * 0.8, stop = x > 860 && x < 1240 && t > at('interrumpir_resp');
      d += (x === 300 ? 'M' : 'L') + x + ' ' + (470 - (stop ? 0 : 90 * Math.sin(s * Math.PI))).toFixed(1);
    }
    set(p, { d });
  });
  chip(g, 'TU RESPIRACIÓN', at('porque_todavia3') + 0.8, { cy: 180, size: 50, fill: C.ink, color: C.white });
  chip(g, 'SE INTERRUMPE… SIN QUE LO RECUERDES', at('interrumpir_resp'), { cy: 790, size: 40, fill: C.red, color: C.white });
});
