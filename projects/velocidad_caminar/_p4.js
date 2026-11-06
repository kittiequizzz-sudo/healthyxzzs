// Punto 4 — interval walking: 5 min usual pace, 1 min a bit faster, 2 min easy, repeat 4–5×, cool down; beginners 20–30 s bursts; stop signs; not a substitute for strength/balance; INTERVALOS comment.
window.START = at('h4') - 0.4;
window.END = at('h5') - 0.4;
window.DURATION = window.END;
const svg = Stage('p4');
const c = k => () => at(k);

TitleCard(svg, 4, 'CAMINATA POR INTERVALOS', 'Alternar velocidades sin agotarte', () => START, c('seguidos4'));
scene(svg, c('seguidos4'), c('alternativa4'), g => {
  const k = Kicker(g, 4, 'PUNTO 4 · INTERVALOS'); Progress(g, 3);
  const a = Text(g, '30 MIN RÁPIDO SEGUIDOS', { x: 960, y: 300, size: 80, color: C.ink });
  const x = el('g', {}, g); Mark(x, false, 960, 450, 1.3);
  const p = el('g', {}, g); cut(p, 'rapido', 960, 760, 380);
  const b = Chip(g, 'NO ES UNA OBLIGACIÓN', { cx: 960, cy: 980, fill: C.white, size: 40 });
  sfx('pop', at('seguidos4') + 0.5); sfx('stamp', at('seguidos4') + 2.5); sfx('pop', at('cansancio4') + 2);
  return t => { slideIn(k, t, at('seguidos4'), 'l', 600); show(a, t, at('seguidos4') + 0.5); pop(x, t, at('seguidos4') + 2.5, 960, 450); pop(b, t, at('seguidos4') + 3, 960, 980); pop(p, t, at('cansancio4') + 2, 960, 760); };
});
scene(svg, c('alternativa4'), c('sencillo4'), g => {
  const h = Text(g, 'CAMBIAR DE VELOCIDAD DURANTE EL PASEO', { x: 960, y: 170, size: 58, color: ACC });
  const st = IntervalStrip(g, [['CÓMODO', 2, 'slow'], ['+ RÁPIDO', 1, 'fast'], ['CÓMODO', 2, 'slow'], ['+ RÁPIDO', 1, 'fast'], ['CÓMODO', 2, 'slow']], { y: 420, h: 170 });
  const a = Chip(g, 'PEQUEÑOS ESFUERZOS EXTRA, SIN MANTENERLOS TODO EL RATO', { cx: 960, cy: 820, fill: C.white, size: 36 });
  st.forEach((_, i) => sfx('pop', at('alternativa4') + 2.5 + i * 0.8, 0.5)); sfx('ding', at('ventaja4') + 1);
  return t => { show(h, t, at('alternativa4') + 1); st.forEach((s, i) => show(s.c, t, at('alternativa4') + 2.5 + i * 0.8)); pop(a, t, at('ventaja4') + 1, 960, 820); };
});
// step-by-step: strip on top, still below
function stepScene(n, a, b, focus, hl, cap, capHi) {
  scene(svg, a, b, g => {
    const st = Still(g, 'cut/' + n + '.png', { x: 220, y: 300, w: 1480, h: 640, iw: SZ[n][0], ih: SZ[n][1], r: 30, focus, zoom: 0.1 });
    const strip = IntervalStrip(g, [['5 MIN NORMAL', 5, 'slow'], ['1 MIN +', 1, 'fast'], ['2 MIN SUAVE', 2, 'slow'], ['× 4–5', 2, 'fast'], ['FINAL SUAVE', 3, 'slow']], { x0: 120, x1: 1800, y: 70, h: 130 });
    const cc = CAP(g, cap, { hi: capHi, size: 52 });
    return t => { st.draw(t, a(), b()); strip.forEach((s, i) => s.c.setAttribute('opacity', hl.includes(i) ? 1 : 0.3)); show(cc, t, a() + 0.6); };
  });
}
scene(svg, c('sencillo4'), c('paso1_4'), g => {
  const a = Text(g, 'EL PROCEDIMIENTO', { x: 960, y: 520, size: 110, color: ACC });
  sfx('pop', at('sencillo4') + 0.2);
  return t => pop(a, t, at('sencillo4') + 0.2, 960, 520);
});
stepScene('e1a', c('paso1_4'), c('paso2_4'), [0.5, 0.45], [0], '1 · 5 MIN A TU PASO HABITUAL', '5 MIN');
scene(svg, () => at('hombros4') + 0.01, c('paso2_4'), g => {
  const r = SideChips(g, [['HOMBROS RELAJADOS', () => at('hombros4') + 0.5], ['MIRADA AL FRENTE', () => at('hombros4') + 2], ['BRAZOS NATURALES', () => at('hombros4') + 3.5]], { cx: 1500, y0: 360, dy: 130, size: 38 });
  [0.5, 2, 3.5].forEach(d => sfx('pop', at('hombros4') + d, 0.5));
  return r;
}, false, false);
stepScene('e1b', c('paso2_4'), c('paso3_4'), [0.5, 0.45], [1], '2 · 1 MIN UN POCO MÁS RÁPIDO', '1 MIN');
scene(svg, () => at('exagerado4') + 0.01, c('paso3_4'), g => {
  const r = SideChips(g, [['SIN ZANCADAS EXAGERADAS', c('exagerado4')], ['SIN PERSEGUIR A NADIE', () => at('exagerado4') + 2.5], ['RESPIRACIÓN CONTROLADA', () => at('exagerado4') + 6]], { cx: 1480, y0: 360, dy: 130, size: 36 });
  [0, 2.5, 6].forEach(d => sfx('pop', at('exagerado4') + d, 0.5));
  return r;
}, false, false);
stepScene('e1c', c('paso3_4'), c('repetir4'), [0.5, 0.45], [2], '3 · 2 MIN MÁS DESPACIO', '2 MIN');
stepScene('e1d', c('repetir4'), c('atencion4'), [0.55, 0.45], [3, 4], '4 · REPITE 4–5 VECES Y TERMINA SUAVE', '4–5 VECES');
scene(svg, c('atencion4'), c('adapte4'), g => {
  const h = Text(g, 'SI LLEVAS TIEMPO SIN EJERCICIO', { x: 960, y: 150, size: 62, color: ACC });
  const st = IntervalStrip(g, [['SUAVE', 3, 'slow'], ['20–30 s', 1, 'fast'], ['SUAVE, MÁS LARGO', 4, 'slow'], ['20–30 s', 1, 'fast'], ['SUAVE', 3, 'slow']], { y: 500, h: 160 });
  const n = Chip(g, 'EL EJEMPLO ANTERIOR: SI YA CAMINAS ESTABLE', { cx: 960, cy: 330, fill: C.white, size: 38 });
  const p = Still(el('g', {}, g), 'cut/e2a.png', { x: 1220, y: 760, w: 580, h: 300, iw: SZ.e2a[0], ih: SZ.e2a[1], r: 22 });
  sfx('pop', at('atencion4') + 2); st.forEach((_, i) => sfx('pop', at('principiante4') + 4 + i * 0.6, 0.4));
  return t => { show(h, t, at('atencion4') + 0.3); pop(n, t, at('atencion4') + 2, 960, 330); st.forEach((s, i) => show(s.c, t, at('principiante4') + 4 + i * 0.6)); show(p.g, t, at('principiante4') + 1); p.draw(t, at('principiante4'), at('adapte4')); };
});
scene(svg, c('adapte4'), c('semanas4'), g => {
  const a = Text(g, 'NO HACE FALTA', { x: 960, y: 330, size: 70, color: C.grey });
  const b = Text(g, 'COMPLETARLO EL PRIMER DÍA', { x: 960, y: 430, size: 70, color: C.grey });
  const p = Text(g, 'DEJA QUE TU CUERPO SE ADAPTE', { x: 960, y: 640, size: 76, color: ACC });
  sfx('pop', at('adapte4') + 4);
  return t => { show(a, t, at('adapte4')); show(b, t, at('adapte4') + 0.5); pop(p, t, at('adapte4') + 4, 960, 640); };
});
stillScene(svg, 'e2b', c('semanas4'), c('nunca4'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'SEMANAS DESPUÉS: MENOS ESFUERZO', { hi: 'MENOS ESFUERZO' });
  return t => show(a, t, at('semanas4') + 1);
});
scene(svg, c('nunca4'), c('sustituye4'), g => {
  const w = el('g', {}, g); Warn(el('g', { transform: 'translate(-330 0)' }, w), 'NO ACELERES SI APARECE…', ['MAREO', 'DOLOR EN EL PECHO', 'FALTA DE AIRE DESPROPORCIONADA', 'INESTABILIDAD'], { kind: 'red', y: 110, w: 1100 });
  const st = Still(el('g', {}, g), 'cut/e2c.png', { x: 1240, y: 300, w: 600, h: 400, iw: SZ.e2c[0], ih: SZ.e2c[1], r: 26, focus: [0.4, 0.5] });
  sfx('alert', at('nunca4') + 0.3);
  return t => { show(w, t, at('nunca4') + 0.3); show(st.g, t, at('nunca4') + 1); st.draw(t, at('nunca4'), at('sustituye4')); };
}, true);
scene(svg, c('sustituye4'), c('comenta4'), g => {
  const h = Text(g, 'LOS INTERVALOS NO SUSTITUYEN…', { x: 960, y: 170, size: 64, color: ACC });
  const a = IconTile(g, 'squat', 'FUERZA', 640, 520, { w: 460, h: 420 });
  const b = IconTile(g, 'balance', 'EQUILIBRIO', 1280, 520, { w: 460, h: 420 });
  const n = Chip(g, 'CLAVES PARA PREVENIR CAÍDAS', { cx: 960, cy: 880, fill: C.white, size: 42 });
  sfx('pop', at('sustituye4') + 1.5); sfx('pop', at('sustituye4') + 2.5); sfx('ding', at('sustituye4') + 6);
  return t => { show(h, t, at('sustituye4')); pop(a, t, at('sustituye4') + 1.5, 640, 520); pop(b, t, at('sustituye4') + 2.5, 1280, 520); pop(n, t, at('sustituye4') + 6, 960, 880); };
});
stillScene(svg, 'e2d', c('comenta4'), c('creencia4'), { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const a = el('g', {}, g); const cc = CTA(a, 'comment', 160);
  const b = CAP(g, 'ESCRIBE «INTERVALOS»', { hi: 'INTERVALOS', size: 60 });
  sfx('click', at('comenta4') + 4);
  return t => { show(b, t, at('comenta4') + 3); pop(cc, t, at('comenta4') + 4, 960, 160); };
});
scene(svg, c('creencia4'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, '¿De verdad 10.000 pasos al día?', { cx: 1220, cy: 330, size: 52 });
  const p = el('g', {}, g); cut(p, 'podometro', 1220, 680, 340);
  sfx('ding', at('creencia4') + 2);
  return t => { host(t, at('creencia4')); pop(q, t, at('creencia4') + 2, 1220, 330); pop(p, t, at('creencia4') + 4, 1220, 680); };
});

window.draw = t => drawScenes(t);
