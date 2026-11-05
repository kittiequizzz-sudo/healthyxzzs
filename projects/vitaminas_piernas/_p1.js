// Punto 1 — B1 (thiamine): energy + nerves; deficiency signs; other causes; risks; foods; diuretics warning.
window.START = at('h1') - 0.6;
window.END = at('h2') - 1.0;
window.DURATION = window.END;
const svg = Stage('p1');
const c = k => () => at(k);

TitleCard(svg, 1, 'VITAMINA B1', 'La energía invisible de tus piernas', () => START, c('musculos1'));
stillScene(svg, 'p1aa', c('musculos1'), c('juego1'), { focus: [0.45, 0.6], zoom: 0.12 }, g => {
  const k = Kicker(g, 1, 'PUNTO 1 · VITAMINA B1'); Progress(g, 0);
  const a = CAP(g, 'SIN NERVIOS SANOS, CADA PASO PESA', { hi: 'PESA', size: 52 });
  return t => { slideIn(k, t, at('musculos1') + 0.2, 'l', 600); show(a, t, at('musculos1') + 4); };
});
scene(svg, c('juego1'), c('deficiencia1'), g => {
  const b = VitBadge(g, 'B1', 960, 260, 2.6);
  const t1 = Text(g, 'TIAMINA', { x: 960, y: 420, size: 64, color: ACC });
  const f = el('g', {}, g); ['lentejas', 'pan', 'cerdo'].forEach((n, i) => cut(f, n, 360 + i * 150, 680, 150));
  const ar = el('g', {}, g); Arrow(ar, 800, 680, 940, 680, C.ink, 14);
  const e = el('g', {}, g); IC.bolt(e, 990, 600, 1.6);
  const et = Text(g, 'ENERGÍA', { x: 1070, y: 800, size: 46 });
  const nv = el('g', {}, g); cut(nv, 'nervio_ok', 1500, 660, 300);
  const nt = Text(g, 'NERVIOS QUE FUNCIONAN', { x: 1500, y: 860, size: 36 });
  const ns = NerveSignal(g, 1380, 900, 1640);
  const a = CAP(g, 'UNA PIEZA INDISPENSABLE', { hi: 'INDISPENSABLE' });
  sfx('pop', at('juego1') + 4); sfx('ding', at('tiamina')); sfx('pop', at('energia1')); sfx('pop', at('energia1') + 3);
  return t => { pop(b, t, at('juego1') + 4, 960, 260); show(t1, t, at('tiamina')); show(f, t, at('energia1')); show(ar, t, at('energia1') + 1); pop(e, t, at('energia1') + 1.6, 1070, 680); show(et, t, at('energia1') + 1.8); pop(nv, t, at('energia1') + 3.5, 1500, 660); show(nt, t, at('energia1') + 3.8); show(a, t, at('pieza1')); };
});
stillScene(svg, 'p1ab', c('deficiencia1'), c('atencion1'), { focus: [0.5, 0.6], zoom: 0.14 }, g => {
  const a = CAP(g, 'DÉFICIT IMPORTANTE → NERVIOS AFECTADOS', { hi: 'NERVIOS', size: 48 });
  const r = SideChips(g, [['HORMIGUEOS', c('hormigueos1')], ['MENOS SENSIBILIDAD', () => at('hormigueos1') + 1.4], ['DEBILIDAD', () => at('hormigueos1') + 3.2], ['DIFICULTAD AL CAMINAR', () => at('hormigueos1') + 5]], { cx: 1560, y0: 170, dy: 120, size: 36 });
  [0, 1.4, 3.2, 5].forEach(d => sfx('pop', at('hormigueos1') + d, 0.5));
  return t => { show(a, t, at('deficiencia1') + 1, at('hormigueos1')); r(t); };
});
stillScene(svg, 'p1ac', c('atencion1'), c('porque1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'PIERNAS CANSADAS ≠ FALTA DE B1', { hi: '≠' });
  const r = SideChips(g, [['MALA CIRCULACIÓN', c('causas1')], ['MEDICAMENTOS', () => at('causas1') + 1.6], ['PROBLEMAS NEUROLÓGICOS', () => at('causas1') + 3], ['OTRAS ENFERMEDADES', () => at('causas1') + 4.8]], { cx: 1530, y0: 160, dy: 120, size: 34 });
  [0, 1.6, 3, 4.8].forEach(d => sfx('pop', at('causas1') + d, 0.5));
  return t => { show(a, t, at('atencion1') + 0.5); r(t); };
});
scene(svg, c('porque1'), c('suplementos1'), g => {
  const h = Text(g, '¿QUIÉN TIENE MÁS RIESGO?', { x: 960, y: 150, size: 70, color: ACC });
  const ts = [['plate', 'DIETA POCO\nVARIADA', 'variada1'], ['drop', 'MALA\nABSORCIÓN', 'absorber1'], ['cross', 'EXCESO DE\nALCOHOL', 'alcohol1'], ['pill', 'ALGUNOS\nDIURÉTICOS', 'diureticos1']].map(([ic, s, k], i) => [IconTile(g, ic, s, 300 + i * 440, 520, { w: 380, h: 420 }), k, 300 + i * 440]);
  ts.forEach(([, k]) => sfx('pop', at(k), 0.6));
  return t => { show(h, t, at('porque1')); ts.forEach(([tile, k, cx]) => pop(tile, t, at(k), cx, 520)); };
});
// foods
scene(svg, c('suplementos1'), c('ejemplo1'), g => {
  const h = Text(g, 'PRIMERO, EN EL PLATO', { x: 960, y: 140, size: 70, color: ACC });
  const r = FoodRow(g, [['lentejas', 'LENTEJAS', c('lentejas1')], ['garbanzos', 'GARBANZOS', c('garbanzos1')], ['pan', 'INTEGRALES', c('cereales1')], ['pipas', 'PIPAS DE GIRASOL', c('pipas1')], ['cerdo', 'CERDO', c('cerdo1')]], { w: 320, h: 380, fit: 240 });
  const a = CAP(g, 'DIETA EQUILIBRADA', { hi: 'EQUILIBRADA' });
  return t => { show(h, t, at('suplementos1')); r(t); show(a, t, at('cerdo1') + 3); };
});
stillScene(svg, 'p1ad', c('ejemplo1'), c('legumbres1'), { focus: [0.6, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'PAN INTEGRAL EN VEZ DE BLANCO', { hi: 'INTEGRAL' });
  return t => show(a, t, at('ejemplo1') + 1);
});
stillScene(svg, 'p1ba', c('legumbres1'), c('semillas1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'LEGUMBRES VARIAS VECES POR SEMANA', { hi: 'LEGUMBRES', size: 50 });
  return t => show(a, t, at('legumbres1'));
});
stillScene(svg, 'p1bb', c('semillas1'), c('sencillos1'), { focus: [0.4, 0.5], zoom: 0.14 }, g => {
  const a = CAP(g, 'UN PUÑADO DE SEMILLAS SIN SAL', { hi: 'SIN SAL' });
  return t => show(a, t, at('semillas1'));
});
stillScene(svg, 'p1bc', c('sencillos1'), c('advertencia1'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'CAMBIOS SENCILLOS', { hi: 'SENCILLOS' });
  return t => show(a, t, at('sencillos1'));
});
scene(svg, c('advertencia1'), c('recuerda1'), g => {
  const w = Warn(g, 'SI TOMAS DIURÉTICOS', ['NUNCA SUSPENDAS TU TRATAMIENTO', 'POR TU CUENTA', 'CONSULTA CON TU MÉDICO'], { kind: 'amber', y: 160, w: 1300 });
  const p = el('g', {}, g); cut(p, 'botes', 1640, 830, 260);
  sfx('alert_soft', at('advertencia1') + 0.2);
  return t => { pop(w, t, at('advertencia1') + 0.2, 960, 380); pop(p, t, at('diureticos1b'), 1640, 830); };
});
stillScene(svg, 'p1bd', c('recuerda1'), c('pregunta1'), { focus: [0.5, 0.5], zoom: 0.1 }, g => {
  const a = CAP(g, 'NO DEPENDE DE UNA SOLA VITAMINA', { hi: 'UNA SOLA', size: 52 });
  const r = SideChips(g, [['MOVIMIENTO', c('movimiento1')], ['PROTEÍNA', () => at('movimiento1') + 1.6], ['VALORACIÓN MÉDICA', () => at('movimiento1') + 3.2]], { cx: 380, y0: 160, size: 40, fill: C.green, color: C.white });
  [0, 1.6, 3.2].forEach(d => sfx('pop', at('movimiento1') + d, 0.6));
  return t => { show(a, t, at('recuerda1') + 1); r(t); };
});
scene(svg, c('pregunta1'), c('siguiente1'), g => {
  const host = Host(g, 'three_q', { cx: 400, cy: 600, fit: 720 });
  const q = Bubble(g, '¿Comes legumbres cada semana?', { cx: 1180, cy: 330, size: 50 });
  const w = el('g', { transform: 'translate(220 0)' }, g); const cta = CTA(w, 'comment', 700);
  sfx('ding', at('pregunta1') + 2.4); sfx('click', at('cuentamelo1'));
  return t => { host(t, at('pregunta1')); pop(q, t, at('pregunta1') + 2.4, 1180, 330); pop(cta, t, at('cuentamelo1'), 1180, 700); };
});
scene(svg, c('siguiente1'), () => END + 1, g => {
  const f = el('g', {}, g); cut(f, 'nervio_ok', 640, 520, 520);
  const b = VitBadge(g, 'B12', 1350, 420, 2.4);
  const a = Text(g, 'SENSIBILIDAD Y EQUILIBRIO', { x: 1350, y: 640, size: 52 });
  sfx('pop', at('siguiente1') + 1); sfx('pop', at('siguiente1') + 3);
  return t => { pop(f, t, at('siguiente1') + 1, 640, 520); pop(b, t, at('siguiente1') + 3, 1350, 420); show(a, t, at('siguiente1') + 4); };
});

window.draw = t => drawScenes(t);
