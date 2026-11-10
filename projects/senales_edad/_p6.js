// Señal 6 — breathless with everyday tasks: gradual withdrawal (slower, avoid stairs, stop to breathe); lungs + heart; heart failure, COPD; milder causes; when to worry (distance, lying flat, pillows, ankles, cough, fatigue); red flags; share + subscribe.
window.START = at('h6') - 1.2;
window.END = at('c0') - 0.6;
window.DURATION = window.END;
const svg = Stage('p6');
const c = k => () => at(k);

TitleCard(svg, 6, 'SIN AIRE CON LO DE SIEMPRE', 'Lo que antes hacías sin esfuerzo', () => START, c('dice6'));
scene(svg, c('dice6'), c('reducir6'), g => {
  const k = Kicker(g, 6, 'SEÑAL 6 · AIRE'); Progress(g, 5);
  const q = CAP(g, 'UNA DIFERENCIA QUE DICE MUCHO', { hi: 'DICE MUCHO' });
  const v = VsCards(g, ['ESPERABLE', [['Cansarte tras subir 5 pisos', () => at('pisos6') + 0.5]]], ['MERECE ATENCIÓN', [['Sin aliento del salón a la cocina', () => at('pisos6') + 3.5]]], { y: 300, h: 360 });
  sfx('pop', at('pisos6')); sfx('pop', at('pisos6') + 3);
  return t => { slideIn(k, t, at('dice6'), 'l', 600); show(q, t, at('dice6') + 0.5, at('pisos6')); v.draw(t, at('pisos6'), at('pisos6') + 3); };
});
scene(svg, c('reducir6'), c('edad6'), g => {
  const h = Text(g, 'SIN DARTE CUENTA, HACES MENOS', { x: 960, y: 140, size: 62, color: ACC });
  const its = [['g1c', 'CAMINAS MÁS DESPACIO', 'reducir6'], ['g1b', 'EVITAS LAS ESCALERAS', 'escaleras6'], ['g1a', 'PARAS PARA RESPIRAR', 'detenerse6']].map(([n, l, k], i) => {
    const x = 70 + i * 610, st = Still(el('g', {}, g), 'cut/' + n + '.png', { x, y: 240, w: 560, h: 380, iw: SZ[n][0], ih: SZ[n][1], r: 24 });
    const b = el('g', {}, g); el('circle', { cx: x + 46, cy: 286, r: 32, fill: ACC, stroke: C.ink, 'stroke-width': 4 }, b); Text(b, String(i + 1), { x: x + 46, y: 289, size: 38, color: C.white });
    const ch = Chip(g, l, { cx: x + 280, cy: 720, fill: C.white, size: 32 }); return [st, b, ch, k, x]; });
  its.forEach(([, , , k]) => sfx('pop', at(k), 0.5));
  return t => { show(h, t, at('reducir6')); its.forEach(([st, b, ch, k, x]) => { show(st.g, t, at(k)); st.draw(t, at(k), at('edad6')); show(b, t, at(k)); pop(ch, t, at(k) + 0.3, x + 280, 720); }); };
});
scene(svg, c('edad6'), c('juntos6'), g => {
  const a = Text(g, '«SERÁ COSA DE LA EDAD»', { x: 960, y: 380, size: 90, color: C.grey });
  const s = Stamp(g, 'NO AUTOMÁTICAMENTE', { cx: 960, cy: 600, size: 72, color: C.red, rot: -5 });
  sfx('stamp', at('respirar6') + 1.5);
  return t => { show(a, t, at('edad6')); s.draw(t, at('respirar6') + 1.5); };
});
scene(svg, c('juntos6'), c('insuf6'), g => {
  const h = Text(g, 'PULMONES + CORAZÓN: UN EQUIPO', { x: 960, y: 150, size: 64, color: ACC });
  const l = el('g', {}, g); cut(l, 'pulmones', 640, 520, 400);
  const p = Text(g, '+', { x: 960, y: 540, size: 130, color: ACC });
  const h2 = el('g', {}, g); cut(h2, 'corazon', 1280, 520, 380);
  const n = Chip(g, 'SI UNO FALLA, LO SENCILLO AGOTA', { cx: 960, cy: 870, fill: C.white, size: 44 });
  sfx('pop', at('juntos6') + 1); sfx('pop', at('juntos6') + 2); sfx('pop', at('juntos6') + 7);
  return t => { show(h, t, at('juntos6')); pop(l, t, at('juntos6') + 1, 640, 520); show(p, t, at('juntos6') + 1.5); pop(h2, t, at('juntos6') + 2, 1280, 520); pop(n, t, at('juntos6') + 7, 960, 870); };
});
scene(svg, c('insuf6'), c('preocuparte6'), g => {
  const h = Text(g, 'POSIBLES CAUSAS', { x: 960, y: 140, size: 70, color: ACC });
  const a = el('g', {}, g); Card(a, { x: 110, y: 230, w: 540, h: 620, fill: C.white }); cut(a, 'corazon', 380, 430, 260); Text(a, 'INSUFICIENCIA', { x: 380, y: 620, size: 42, color: ACC }); Text(a, 'CARDÍACA', { x: 380, y: 670, size: 42, color: ACC });
  const al = [['falta de aire', 'bombear6', 2], ['cansancio', 'bombear6', 5], ['líquido en piernas', 'bombear6', 7]].map(([s, k, d], i) => [Text(a, s, { x: 380, y: 740 + i * 40, size: 30, weight: 800 }), k, d]);
  const b = el('g', {}, g); Card(b, { x: 690, y: 230, w: 540, h: 620, fill: C.white }); cut(b, 'pulmones', 960, 430, 260); Text(b, 'EPOC', { x: 960, y: 640, size: 52, color: ACC }); Text(b, 'fumadores o exfumadores', { x: 960, y: 720, size: 30, weight: 800 });
  const d = el('g', {}, g); Card(d, { x: 1270, y: 230, w: 540, h: 620, fill: C.white }); Text(d, 'CAUSAS MENOS', { x: 1540, y: 330, size: 42, color: C.green }); Text(d, 'GRAVES', { x: 1540, y: 380, size: 42, color: C.green });
  ['pérdida de forma física', 'exceso de peso', 'anemia'].forEach((s, i) => Text(d, '· ' + s, { x: 1540, y: 500 + i * 80, size: 36, weight: 800 }));
  sfx('pop', at('insuf6')); sfx('pop', at('pulmones6')); sfx('pop', at('menos6'));
  return t => { show(h, t, at('insuf6') - 0.5); pop(a, t, at('insuf6'), 380, 540); al.forEach(([x, k, dd]) => show(x, t, at(k) + dd)); pop(b, t, at('pulmones6'), 960, 540); pop(d, t, at('menos6'), 1540, 540); };
});
stillScene(svg, 'g1d', c('preocuparte6'), c('tobillos6'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const r = SideChips(g, [['PARAR EN DISTANCIAS DE SIEMPRE', () => at('distancias6') + 1], ['FALTA DE AIRE AL ACOSTARTE', () => at('distancias6') + 5], ['DORMIR CON VARIAS ALMOHADAS', () => at('distancias6') + 7.5]], { cx: 520, y0: 180, dy: 120, size: 32 });
  const a = CAP(g, '¿QUÉ DEBERÍA PREOCUPARTE?', { hi: 'PREOCUPARTE' });
  [1, 5, 7.5].forEach(d => sfx('pop', at('distancias6') + d, 0.5));
  return t => { show(a, t, at('preocuparte6')); r(t); };
});
stillScene(svg, 'g2b', c('tobillos6'), c('recuerda6'), { focus: [0.45, 0.45], zoom: 0.12 }, g => {
  const r = ChipRow(g, [['TOBILLOS HINCHADOS', c('tobillos6')], ['TOS PERSISTENTE', () => at('tobillos6') + 2.5], ['CANSANCIO CRECIENTE', () => at('tobillos6') + 4]], { cy: 120, size: 36 });
  const a = CAP(g, 'COMÉNTALO CON TU MÉDICO', { hi: 'TU MÉDICO' });
  [0, 2.5, 4].forEach(d => sfx('pop', at('tobillos6') + d, 0.5));
  return t => { r(t); show(a, t, at('tobillos6') + 5); };
});
scene(svg, c('recuerda6'), c('seis6'), g => {
  const w = el('g', {}, g); Warn(el('g', { transform: 'translate(-280 0)' }, w), 'FALTA DE AIRE INTENSA O REPENTINA', ['CON DOLOR EN EL PECHO', 'DESMAYO', 'LABIOS AZULADOS'], { kind: 'red', y: 130, w: 1100 });
  const st = Still(el('g', {}, g), 'cut/g2c.png', { x: 1260, y: 160, w: 600, h: 400, iw: SZ.g2c[0], ih: SZ.g2c[1], r: 26, focus: [0.4, 0.5] });
  const u = el('g', {}, g); Card(u, { x: 1260, y: 620, w: 600, h: 150, fill: C.red, r: 75 }); IC.phone(u, 1290, 645, 1); Text(u, 'URGENCIAS · 112', { x: 1600, y: 697, size: 48, color: C.white });
  const n = Chip(g, 'NO PRUEBES TU RESISTENCIA CON EJERCICIO INTENSO', { cx: 700, cy: 830, fill: C.white, size: 32 });
  sfx('alert', at('recuerda6') + 0.3); sfx('pop', at('nointentes6'));
  return t => { show(w, t, at('recuerda6') + 0.3); show(st.g, t, at('intensa6')); st.draw(t, at('intensa6'), at('seis6')); pop(u, t, at('intensa6') + 4, 1560, 695); pop(n, t, at('nointentes6'), 700, 830); };
}, true);
stillScene(svg, 'g2a', c('seis6'), c('comparte6'), { focus: [0.45, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'NO ES UN DIAGNÓSTICO: ES UNA OPORTUNIDAD', { hi: 'OPORTUNIDAD', size: 48 });
  return t => show(a, t, at('seis6') + 2);
});
stillScene(svg, 'g2d', c('comparte6'), c('suscribe6'), { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const b = el('g', {}, g); Card(b, { x: 740, y: 75, w: 440, h: 130, fill: C.white, r: 65 }); IC.share(b, 770, 90, 1); Text(b, 'COMPARTE', { x: 1015, y: 142, size: 46 });
  const a = CAP(g, 'CON ALGUIEN MAYOR DE TU FAMILIA', { hi: 'TU FAMILIA', size: 52 });
  sfx('click', at('comparte6') + 2);
  return t => { pop(b, t, at('comparte6') + 2, 960, 140); show(a, t, at('comparte6') + 2.5); };
});
scene(svg, c('suscribe6'), () => END + 1, g => {
  const s = CTA(el('g', {}, g), 'sub', 300);
  const a = Text(g, 'ENVEJECER NO ES RESIGNARSE', { x: 960, y: 560, size: 72, color: ACC });
  const b = Text(g, 'ES DISTINGUIR QUÉ CAMBIOS MERECEN ATENCIÓN', { x: 960, y: 680, size: 48 });
  sfx('click', at('suscribe6') + 0.5); sfx('ding', at('suscribe6') + 5);
  return t => { pop(s, t, at('suscribe6') + 0.5, 960, 300); show(a, t, at('suscribe6') + 5); show(b, t, at('suscribe6') + 8); };
});

window.draw = t => drawScenes(t);
