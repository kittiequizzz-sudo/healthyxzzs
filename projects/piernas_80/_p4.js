// Punto 4 — stiff knees: old door, cartilage + synovial fluid; Rosario (=Pilar); heel slides; warning; question.
window.START = at('h4') - 0.3;
window.END = at('h5') - 0.3;
window.DURATION = window.END;
const svg = Stage('p4');
const c = k => () => at(k);

TitleCard(svg, 4, 'RODILLAS "OXIDADAS"', 'La rigidez de la mañana', () => START, c('puerta'));
stillScene(svg, 'e1a', c('puerta'), c('sabanas'), { focus: [0.55, 0.45], zoom: 0.14 }, g => {
  const k = Kicker(g, 4, 'RIGIDEZ'); Progress(g, 3);
  const a = CAP(g, 'UNA PUERTA ANTIGUA', { hi: 'ANTIGUA' });
  const b = CAP(g, 'CON MOVIMIENTO, SE ABRE MEJOR', { hi: 'SE ABRE', size: 52 });
  const d = Chip(g, 'TUS RODILLAS: PARECIDO, PERO MÁS COMPLEJO', { cx: 1150, cy: 260, fill: C.white, size: 34 });
  sfx('squeeze', at('bisagras'), 0.6); sfx('pop', at('parecido4'));
  return t => { slideIn(k, t, at('puerta'), 'l', 600); show(a, t, at('puerta') + 0.5, at('deslizarse')); show(b, t, at('deslizarse')); pop(d, t, at('parecido4'), 1150, 260); };
});
stillScene(svg, 'e1b', c('sabanas'), c('sentado4'), { focus: [0.45, 0.55], zoom: 0.12 }, g => {
  const a = CAP(g, 'AL DESPERTAR: RODILLAS RÍGIDAS', { hi: 'RÍGIDAS' });
  return t => show(a, t, at('sabanas') + 2);
});
stillScene(svg, 'e1c', c('sentado4'), c('disminuir4'), { focus: [0.5, 0.6], zoom: 0.12 }, g => {
  const a = CAP(g, 'SENTADO, MUEVE LOS PIES PRIMERO', { hi: 'MUEVE LOS PIES', size: 52 });
  return t => show(a, t, at('sentado4') + 0.5);
});
stillScene(svg, 'e1d', c('disminuir4'), c('porque4'), { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const a = CAP(g, 'CAMINANDO, LA RIGIDEZ BAJA', { hi: 'BAJA' });
  return t => show(a, t, at('disminuir4') + 1);
});
// cartilage + synovial fluid
scene(svg, c('porque4'), c('rosario'), g => {
  const h = Text(g, '¿POR QUÉ SUCEDE?', { x: 960, y: 130, size: 72, color: ACC });
  const k = ItemCard(g, 'rodilla', 520, 560, { w: 520, h: 700, fit: 600 });
  const ring = Callout(g, 560, 560, 120);
  const r = SideChips(g, [['CARTÍLAGO: DESLIZA Y REPARTE LA CARGA', c('funcion4')], ['LÍQUIDO SINOVIAL: MENOS ROCE, NUTRIENTES', c('sinovial')], ['CON LOS AÑOS PUEDE CAMBIAR', c('estructura')]], { cx: 1300, y0: 300, dy: 150, size: 30 });
  const a = el('g', {}, g); Card(a, { x: 900, y: 760, w: 840, h: 130, fill: '#FCE3D3' }); Text(a, 'ARTROSIS: DOLOR, RIGIDEZ, DIFICULTAD', { x: 1320, y: 826, size: 36 });
  const s = Stamp(g, 'NO ES INEVITABLE', { cx: 1320, cy: 826, size: 64, color: C.green, rot: -4 });
  const d = CAP(g, 'CADA PERSONA ENVEJECE DISTINTO', { hi: 'DISTINTO', size: 52 });
  sfx('pop', at('cartilago')); ['funcion4', 'sinovial', 'estructura'].forEach(x => sfx('pop', at(x), 0.5)); sfx('pop', at('artrosis4')); sfx('stamp', at('inevitable4') + 1);
  return t => {
    show(h, t, at('porque4')); pop(k, t, at('cartilago'), 520, 560); ring(t, at('cartilago') + 1, at('estructura')); r(t);
    pop(a, t, at('artrosis4'), 1320, 826, at('inevitable4') + 1); s.draw(t, at('inevitable4') + 1); show(d, t, at('diferente4'));
  };
});
// Rosario (= Pilar)
stillScene(svg, 'e2a', c('rosario'), c('abandonar'), { focus: [0.45, 0.45], zoom: 0.12 }, g => {
  const a = Drama2(g, 'ROSARIO · 83 · TOLEDO');
  const b = CAP(g, 'MERCADOS, MACETAS, JARDÍN', { hi: 'MACETAS' });
  sfx('pop', at('rosario') + 0.5);
  return t => { pop(a, t, at('rosario') + 0.5, 1640, 150); show(b, t, at('macetas')); };
});
stillScene(svg, 'e2b', c('abandonar'), c('inesperado4'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'DEJA SUS PASEOS', { hi: 'DEJA' });
  const b = Chip(g, '"DESCANSAR ME PROTEGERÁ"', { cx: 600, cy: 140, fill: C.white, size: 42 });
  sfx('pop', at('descansar4')); Drama(g);
  return t => { show(a, t, at('abandonar') + 3); pop(b, t, at('descansar4'), 600, 140); };
});
stillScene(svg, 'e2c', c('inesperado4'), c('fisio4'), { focus: [0.5, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'LEVANTARSE, AÚN MÁS DIFÍCIL', { hi: 'MÁS DIFÍCIL' });
  Drama(g);
  return t => show(a, t, at('inesperado4') + 2);
});
stillScene(svg, 'e2d', c('fisio4'), c('cama4'), { focus: [0.55, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'LA INACTIVIDAD DEBILITA', { hi: 'DEBILITA' });
  const b = Chip(g, 'RECUPERAR EL MOVIMIENTO POCO A POCO', { cx: 1150, cy: 140, fill: C.green, color: C.white, size: 38 });
  sfx('pop', at('solucion4') + 2);
  return t => { show(a, t, at('fisio4') + 3); pop(b, t, at('solucion4') + 2, 1150, 140); };
});
// exercise: heel slides in bed
scene(svg, c('cama4'), c('paseos4'), g => {
  const h = Chip(g, 'EJERCICIO · DESLIZAR EL TALÓN', { cx: 960, cy: 95, fill: ACC, color: C.white, size: 44 });
  const row = PoseRow(g, ['tr1', 'tr2', 'tr3'], [], { y: 260, h: 400, x0: 60, x1: 1860, gap: 20 });
  const steps = [['ANTES DE LEVANTARTE', 'cama4'], ['BOCA ARRIBA, DESLIZA EL TALÓN', 'desliza'], ['ESTIRA DE NUEVO LA PIERNA', 'estira4'], ['8–10 VECES CADA LADO', 'repite4'], ['MOVILIZA SUAVE TRAS LA NOCHE', 'movilizar']].map(([s, k]) => [CAP(g, s, { cy: 900, size: 50 }), k]);
  const cnt = Counter(g, { cx: 960, cy: 770, label: 'CADA LADO' }); cnt.set('8–10 ×');
  const ok = Chip(g, 'RECORRIDO CÓMODO', { cx: 1500, cy: 770, fill: C.green, color: C.white, size: 36 });
  ['desliza', 'estira4', 'repite4', 'movilizar'].forEach(k => sfx('pop', at(k), 0.6));
  return t => {
    show(h, t, at('cama4'));
    if (t < at('repite4')) lightRow(row, t, [at('cama4') + 1, at('desliza') + 1.5, at('estira4')]);
    else { const i = Math.floor((t - at('repite4')) / 1.2) % 2; row.forEach(({ c, st }, j) => { c.setAttribute('opacity', j === [0, 1][i] ? 1 : 0.35); st.draw(t, 0, 1); }); }
    steps.forEach(([cap, k], i) => show(cap, t, at(k), i < steps.length - 1 ? at(steps[i + 1][1]) : 1e9));
    show(cnt.g, t, at('repite4')); show(ok, t, at('repite4') + 2);
  };
});
scene(svg, c('paseos4'), c('hinchazon4'), g => {
  const h = Text(g, 'PASEOS CORTOS, REPARTIDOS', { x: 960, y: 170, size: 72, color: ACC });
  const ts = [['MAÑANA', 0], ['MEDIODÍA', 1], ['TARDE', 2]].map(([s, i]) => [IconTile(g, 'walk', s, 520 + i * 440, 520, { w: 360, h: 360 }), i]);
  const a = CAP(g, 'A TU MEDIDA', { hi: 'TU MEDIDA' });
  [0, 1, 2].forEach(i => sfx('pop', at('paseos4') + 1 + i * 0.7, 0.5));
  return t => { show(h, t, at('paseos4')); ts.forEach(([tile, i]) => pop(tile, t, at('paseos4') + 1 + i * 0.7, 520 + i * 440, 520)); show(a, t, at('paseos4') + 4); };
});
scene(svg, c('hinchazon4'), c('pregunta4'), g => {
  const w = Warn(g, 'CONSULTA ANTES DE SEGUIR SI HAY…', ['HINCHAZÓN IMPORTANTE O CALOR', 'DOLOR INTENSO', 'RIGIDEZ QUE NO SE VA'], { kind: 'amber', y: 220, w: 1400 });
  sfx('alert_soft', at('hinchazon4') + 0.2);
  return t => pop(w, t, at('hinchazon4') + 0.2, 960, 440);
});
scene(svg, c('pregunta4'), c('quinto'), g => {
  const host = Host(g, 'three_q', { cx: 400, cy: 600, fit: 720 });
  const q = Bubble(g, '¿Más rígidas al despertar o tras estar sentado?', { cx: 1180, cy: 300, size: 40 });
  const w = el('g', { transform: 'translate(220 0)' }, g); const cta = CTA(w, 'comment', 700);
  sfx('ding', at('pregunta4') + 2.3); sfx('click', at('dejamelo'));
  return t => { host(t, at('pregunta4')); pop(q, t, at('pregunta4') + 2.3, 1180, 300); pop(cta, t, at('dejamelo'), 1180, 700); };
});
scene(svg, c('quinto'), () => END + 1, g => {
  const f = ItemCard(g, 'pie_nervio', 620, 540, { w: 560, h: 620, fit: 520 });
  const a = Text(g, 'EL QUINTO CAMBIO', { x: 1320, y: 440, size: 70, color: ACC });
  const b = Text(g, 'inseguridad… sin dolor', { x: 1320, y: 560, size: 56 });
  sfx('pop', at('quinto') + 4);
  return t => { pop(f, t, at('quinto') + 4, 620, 540); show(a, t, at('quinto') + 6); show(b, t, at('quinto') + 9); };
});

window.draw = t => drawScenes(t);
