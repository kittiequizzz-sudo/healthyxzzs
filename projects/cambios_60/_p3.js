// Señal 3 — type 2 diabetes: can be silent for years; insulin as a key, insulin resistance; age is one risk factor, not destiny; symptoms (thirst, urination, fatigue, blurred vision, slow wounds); glucose/HbA1c; muscle uses glucose; walk + strength; no extreme diets; hypoglycaemia caution with meds.
window.START = at('h3') - 1.2;
window.END = at('h4') - 1.2;
window.DURATION = window.END;
const svg = Stage('p3');
const c = k => () => at(k);

TitleCard(svg, 3, 'EL AZÚCAR: UN PROBLEMA SILENCIOSO', 'El metabolismo después de los 60', () => START, c('molestias3'));
scene(svg, c('molestias3'), c('cambios3'), g => {
  const k = Kicker(g, 3, 'SEÑAL 3 · AZÚCAR'); Progress(g, 2);
  const a = Text(g, 'ALGUNAS ENFERMEDADES', { x: 960, y: 360, size: 74, color: C.ink });
  const b = Text(g, 'AVANZAN SIN MOLESTIAS', { x: 960, y: 470, size: 74, color: ACC });
  const d = Chip(g, 'DIABETES TIPO 2', { cx: 960, cy: 700, fill: C.red, color: C.white, size: 64 });
  sfx('stamp', at('diabetes3'));
  return t => { slideIn(k, t, at('molestias3'), 'l', 600); show(a, t, at('molestias3') + 0.5); show(b, t, at('molestias3') + 1.5); pop(d, t, at('diabetes3'), 960, 700); };
});
// insulin as a key
scene(svg, c('cambios3'), c('aclarar3'), g => {
  const r = ChipRow(g, [['GRASA', () => at('cambios3') + 3], ['MÚSCULO', () => at('cambios3') + 5], ['SENSIBILIDAD A LA INSULINA', () => at('cambios3') + 6.5]], { cy: 110, size: 36 });
  const key = el('g', {}, g); cut(key, 'insulina', 700, 500, 460);
  const exp = Chip(g, 'LA INSULINA: LA LLAVE QUE DEJA ENTRAR LA GLUCOSA', { cx: 960, cy: 800, fill: C.white, size: 38 });
  const rs = el('g', {}, g); Card(rs, { x: 1160, y: 330, w: 640, h: 300, fill: '#EAD3D0' }); Text(rs, 'RESISTENCIA', { x: 1480, y: 440, size: 54, color: C.red }); Text(rs, 'A LA INSULINA', { x: 1480, y: 520, size: 54, color: C.red });
  const p = Chip(g, 'LA LLAVE ENTRA PEOR → MÁS ESFUERZO', { cx: 1480, cy: 690, fill: C.white, size: 32 });
  sfx('pop', at('insulina3')); sfx('pop', at('peor3') + 1); sfx('stamp', at('resistencia3'));
  return t => { r(t); pop(key, t, at('insulina3'), 700, 500); pop(exp, t, at('insulina3') + 1, 960, 800); pop(p, t, at('peor3') + 1, 1480, 690); pop(rs, t, at('resistencia3'), 1480, 480); };
});
scene(svg, c('aclarar3'), c('sinsintomas3'), g => {
  const a = Text(g, 'CUMPLIR 60', { x: 960, y: 290, size: 90, color: C.ink });
  const ne = Text(g, '≠', { x: 960, y: 410, size: 110, color: C.red });
  const b = Text(g, 'TENER DIABETES', { x: 960, y: 530, size: 90, color: C.ink });
  const r = ChipRow(g, [['EDAD', c('factores3')], ['FAMILIA', () => at('factores3') + 3], ['GRASA ABDOMINAL', () => at('factores3') + 5], ['HÁBITOS', () => at('factores3') + 7]], { cy: 760, size: 40, fill: '#EAD3D0' });
  const h = Text(g, 'FACTORES DE RIESGO', { x: 960, y: 660, size: 40, color: ACC });
  sfx('stamp', at('noimplica3') + 1);
  return t => { show(a, t, at('noimplica3')); pop(ne, t, at('noimplica3') + 1, 960, 410); show(b, t, at('noimplica3') + 1.5); show(h, t, at('factores3')); r(t); };
});
stillScene(svg, 'd2a', c('sinsintomas3'), c('sed3'), { focus: [0.45, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'A VECES, SIN SÍNTOMAS', { hi: 'SIN SÍNTOMAS' });
  return t => show(a, t, at('sinsintomas3') + 0.5);
});
scene(svg, c('sed3'), c('confirma3'), g => {
  const ps = [['d1a', 'SED'], ['d1b', 'ORINAR MÁS'], ['d1c', 'VISIÓN BORROSA'], ['d1d', 'HERIDAS LENTAS']].map(([n, l], i) => {
    const x = 70 + i * 450, st = Still(el('g', {}, g), 'cut/' + n + '.png', { x, y: 260, w: 420, h: 300, iw: SZ[n][0], ih: SZ[n][1], r: 22 });
    const ch = Chip(g, l, { cx: x + 210, cy: 640, fill: C.white, size: 32 }); return [st, ch, x]; });
  const ks = [at('sed3') + 1.5, at('sed3') + 3, at('sed3') + 7, at('sed3') + 8.5];
  const f = Chip(g, '+ CANSANCIO PERSISTENTE', { cx: 960, cy: 820, fill: '#EAD3D0', size: 40 });
  const h = Text(g, 'POSIBLES SEÑALES', { x: 960, y: 150, size: 62, color: ACC });
  ks.forEach(k => sfx('pop', k, 0.5));
  return t => { show(h, t, at('sed3')); ps.forEach(([st, ch, x], i) => { show(st.g, t, ks[i]); st.draw(t, ks[i], at('confirma3')); pop(ch, t, ks[i], x + 210, 640); }); pop(f, t, at('sed3') + 5, 960, 820); };
});
scene(svg, c('confirma3'), c('musculos3'), g => {
  const a = Chip(g, 'NINGUNA CONFIRMA POR SÍ SOLA UNA DIABETES', { cx: 960, cy: 180, fill: C.white, size: 42 });
  const gl = ItemCard(g, 'glucometro', 640, 560, { w: 460, h: 480, fit: 330, label: 'GLUCOSA', size: 44 });
  const hb = el('g', {}, g); Card(hb, { x: 1060, y: 320, w: 460, h: 480, fill: C.white }); Text(hb, 'HbA1c', { x: 1290, y: 520, size: 96, color: ACC }); Text(hb, 'HEMOGLOBINA', { x: 1290, y: 640, size: 36 }); Text(hb, 'GLUCOSILADA', { x: 1290, y: 690, size: 36 });
  const n = CAP(g, 'CONTROLES CUANDO ESTÉN INDICADOS', { hi: 'CONTROLES', size: 50 });
  sfx('pop', at('confirma3')); sfx('pop', at('hba1c3') + 3); sfx('pop', at('hba1c3') + 5);
  return t => { pop(a, t, at('confirma3'), 960, 180); pop(gl, t, at('hba1c3') + 3, 640, 560); pop(hb, t, at('hba1c3') + 5, 1290, 560); show(n, t, at('hba1c3') + 7); };
});
scene(svg, c('musculos3'), c('caminar3'), g => {
  const m = ItemCard(g, 'musculo_fuerte', 600, 500, { w: 480, h: 540, fit: 380, label: 'MÚSCULO', size: 48 });
  const ar = el('g', {}, g); Arrow(ar, 880, 500, 1080, 500, ACC, 14);
  const k = ItemCard(g, 'insulina', 1340, 500, { w: 480, h: 540, fit: 360, label: 'USA LA GLUCOSA', size: 40 });
  const a = CAP(g, 'MÁS FUERZA = MEJOR SENSIBILIDAD A LA INSULINA', { hi: 'MEJOR', size: 44 });
  sfx('pop', at('musculos3') + 1); sfx('pop', at('tejido3') + 2);
  return t => { pop(m, t, at('musculos3') + 1, 600, 500); show(ar, t, at('tejido3') + 1.5); pop(k, t, at('tejido3') + 2, 1340, 500); show(a, t, at('fuerza3')); };
});
stillScene(svg, 'd2b', c('caminar3'), () => at('caminar3') + 5, { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'CAMINAR CON REGULARIDAD', { hi: 'CAMINAR' });
  return t => show(a, t, at('caminar3') + 0.3);
});
stillScene(svg, 'd2d', () => at('caminar3') + 5, c('noeliminar3'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, '+ FUERZA · ALIMENTACIÓN EQUILIBRADA', { hi: 'FUERZA', size: 52 });
  return t => show(a, t, at('caminar3') + 5.2);
});
scene(svg, c('noeliminar3'), c('hipo3'), g => {
  const no = el('g', {}, g); Card(no, { x: 160, y: 200, w: 760, h: 300, fill: C.white }); Mark(no, false, 260, 350, 0.9); Text(no, 'DIETAS EXTREMAS', { x: 600, y: 320, size: 46 }); Text(no, 'SIN HIDRATOS', { x: 600, y: 390, size: 46 });
  const st = Still(el('g', {}, g), 'cut/d2c.png', { x: 1000, y: 200, w: 760, h: 430, iw: SZ.d2c[0], ih: SZ.d2c[1], r: 26 });
  const r = SideChips(g, [['ALIMENTOS DE CALIDAD', () => at('priorizar3') + 0.5], ['CANTIDADES A TU MEDIDA', () => at('priorizar3') + 3.5], ['MENOS BEBIDAS AZUCARADAS', () => at('priorizar3') + 7], ['MENOS ULTRAPROCESADOS', () => at('priorizar3') + 9]], { cx: 540, y0: 600, dy: 110, size: 34 });
  sfx('pop', at('noeliminar3')); sfx('pop', at('priorizar3'));
  return t => { pop(no, t, at('noeliminar3'), 540, 350); show(st.g, t, at('priorizar3')); st.draw(t, at('priorizar3'), at('hipo3')); r(t); };
});
scene(svg, c('hipo3'), c('tiempo3'), g => {
  const w = Warn(g, 'SI YA TIENES DIABETES', ['ADAPTA ESTOS CAMBIOS A TU TRATAMIENTO', 'ALGUNOS MEDICAMENTOS PUEDEN', 'PROVOCAR HIPOGLUCEMIA'], { kind: 'amber', y: 200, w: 1400 });
  sfx('alert', at('hipo3') + 0.3);
  return t => pop(w, t, at('hipo3') + 0.3, 960, 420);
}, true);
scene(svg, c('tiempo3'), c('cerebro3'), g => {
  const a = Text(g, 'DETECTADA A TIEMPO', { x: 960, y: 400, size: 90, color: ACC });
  const b = Text(g, '= MEJOR CONTROL, MENOS COMPLICACIONES', { x: 960, y: 530, size: 54 });
  sfx('ding', at('tiempo3') + 3);
  return t => { show(a, t, at('tiempo3') + 0.3); show(b, t, at('tiempo3') + 3); };
});
scene(svg, c('cerebro3'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, 'Otro órgano a vigilar…', { cx: 1220, cy: 300, size: 54 });
  const b = el('g', {}, g); cut(b, 'cerebro', 1220, 640, 360);
  sfx('ding', at('cerebro3')); sfx('pop', at('cerebro3') + 10);
  return t => { host(t, at('cerebro3')); pop(q, t, at('cerebro3'), 1220, 300); pop(b, t, at('cerebro3') + 9.5, 1220, 640); };
});

window.draw = t => drawScenes(t);
