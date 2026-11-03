// Punto 1 — the cartilage paradox: rest weakens, the sponge, Pilar (73), gentle start.
window.START = at('h1') - 0.3;
window.END = at('h2') - 0.3;
window.DURATION = window.END;
const svg = Stage('p1');
const c = k => () => at(k);

TitleCard(svg, 1, 'LA PARADOJA DEL CARTÍLAGO', 'Descansar demasiado empeora', () => START, c('decision1'));
stillScene(svg, 'd1a', c('decision1'), c('duele1'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const k = Kicker(g, 1, 'EL CARTÍLAGO'); Progress(g, 0);
  const a = CAP(g, 'CON LA MEJOR INTENCIÓN…', { hi: 'MEJOR INTENCIÓN' });
  const b = CAP(g, 'DEJAR DE MOVERSE', { hi: 'DEJAR' });
  return t => { slideIn(k, t, at('decision1') + 0.2, 'l', 600); show(a, t, at('decision1') + 1, at('dejar1')); show(b, t, at('dejar1')); };
});
stillScene(svg, 'd1d', c('duele1'), c('cadera1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, '¿DUELE? → USARLA MENOS', { hi: 'MENOS' });
  return t => show(a, t, at('duele1') + 0.3);
});
stillScene(svg, 'i0c', c('cadera1'), c('reducir1'), { focus: [0.45, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, '¿ESCALERAS? → EVITARLAS', { hi: 'EVITARLAS' });
  return t => show(a, t, at('cadera1') + 0.3);
});
stillScene(svg, 'i2a', c('reducir1'), c('maquina'), { focus: [0.5, 0.45], zoom: 0.1 }, g => {
  const a = CAP(g, 'MENOS ACTIVIDADES', { hi: 'MENOS' });
  const b = Chip(g, '"ASÍ CONSERVO EL CARTÍLAGO"', { cx: 1300, cy: 150, size: 42 });
  sfx('pop', at('reducir1') + 3);
  return t => { show(a, t, at('reducir1') + 0.3); pop(b, t, at('reducir1') + 3, 1300, 150); };
});
// not machine parts: living tissue, no vessels, synovial fluid
scene(svg, c('maquina'), c('esponja'), g => {
  const gear = el('g', {}, g); IC.gear(gear, 230, 260, 2.4);
  const x = el('g', {}, g); IC.cross(x, 380, 240, 1.1);
  const ml = Text(g, 'NO ES UNA MÁQUINA', { x: 450, y: 600, size: 52 });
  const k = ItemCard(g, 'rodilla_sana', 1180, 480, { w: 560, h: 720, fit: 600 });
  const ring = Callout(g, 1180, 520, 150);
  const r = SideChips(g, [['TEJIDO VIVO', c('vivo')], ['SIN VASOS SANGUÍNEOS', c('vasos')], ['LÍQUIDO SINOVIAL', c('sinovial')]], { cx: 1680, y0: 300, dy: 170, size: 36 });
  const a = CAP(g, 'SE NUTRE DEL LÍQUIDO DE LA ARTICULACIÓN', { size: 48, hi: 'LÍQUIDO' });
  sfx('pop', at('maquina')); sfx('stamp', at('maquina') + 1); sfx('pop', at('vivo') - 0.5);
  ['vivo', 'vasos', 'sinovial'].forEach(kk => sfx('pop', at(kk), 0.6));
  return t => {
    pop(gear, t, at('maquina'), 350, 380); pop(x, t, at('maquina') + 1, 435, 295); show(ml, t, at('maquina') + 1.2);
    pop(k, t, at('vivo') - 0.5, 1180, 480); ring(t, at('vivo') + 0.5, at('vasos')); r(t); show(a, t, at('sinovial') + 1.5);
  };
});
// sponge
scene(svg, c('esponja'), c('peligro1'), g => {
  const h = Text(g, 'COMO UNA ESPONJA', { x: 960, y: 140, size: 76, color: ACC });
  const a = ItemCard(g, 'esponja', 600, 480, { w: 560, h: 500, fit: 440 });
  const b = ItemCard(g, 'esponja_p', 1320, 480, { w: 560, h: 500, fit: 440 });
  const la = Chip(g, 'COMPRIMES', { cx: 1320, cy: 790, fill: ACC, color: C.white, size: 40 });
  const lb = Chip(g, 'LIBERAS', { cx: 600, cy: 790, fill: C.blue, size: 40 });
  const ar = el('g', {}, g); Arrow(ar, 920, 400, 1010, 400, C.ink, 12); Arrow(ar, 1010, 560, 920, 560, C.blue, 12);
  const a2 = CAP(g, 'CARGA MODERADA = NUTRICIÓN', { hi: 'NUTRICIÓN' });
  sfx('pop', at('esponja')); sfx('squeeze', at('comprimes')); sfx('pop', at('liberas'));
  return t => {
    show(h, t, at('esponja')); pop(a, t, at('esponja') + 0.4, 600, 480); pop(b, t, at('comprimes'), 1320, 480);
    pop(la, t, at('comprimes') + 0.3, 1320, 790); pop(lb, t, at('liberas'), 600, 790); show(ar, t, at('liberas') + 0.5);
    show(a2, t, at('parecido1'));
  };
});
// sedentary danger
scene(svg, c('peligro1'), c('mujer'), g => {
  const h = Stamp(g, 'SEDENTARISMO', { cx: 960, cy: 170, size: 80, color: C.red, rot: -4 });
  const a = IconTile(g, 'chair', 'HORAS SENTADO', 420, 520, { w: 380, h: 380 });
  const ar = el('g', {}, g); Arrow(ar, 650, 520, 780, 520, C.ink, 14);
  const b = IconTile(g, 'dumbbell', 'MENOS FUERZA', 1010, 520, { w: 380, h: 380 });
  const d = IconTile(g, 'knee', 'MENOS TOLERANCIA', 1540, 520, { w: 420, h: 380 });
  const dn1 = el('g', {}, g); Arrow(dn1, 1150, 380, 1150, 470, C.red, 12);
  const a2 = CAP(g, 'LO FÁCIL SE VUELVE INCÓMODO', { hi: 'INCÓMODO' });
  sfx('stamp', at('peligro1') + 0.2); sfx('pop', at('sentado1')); sfx('pop', at('sentado1') + 2); sfx('pop', at('tejidos1'));
  return t => {
    h.draw(t, at('peligro1') + 0.2); pop(a, t, at('sentado1'), 420, 520); show(ar, t, at('sentado1') + 1.5);
    pop(b, t, at('sentado1') + 2, 1010, 520); show(dn1, t, at('sentado1') + 2.4); pop(d, t, at('tejidos1'), 1540, 520); show(a2, t, at('tejidos1') + 3);
  };
});
// Pilar, 73
stillScene(svg, 'd1b', c('mujer'), c('meses1'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = Chip(g, '73 AÑOS', { cx: 1660, cy: 150, fill: ACC, color: C.white, size: 50 });
  const b = CAP(g, 'DEJA DE IR AL MERCADO', { hi: 'MERCADO' });
  Drama(g);
  sfx('pop', at('mujer') + 0.6);
  return t => { pop(a, t, at('mujer') + 0.6, 1660, 150); show(b, t, at('mujer') + 2); };
});
stillScene(svg, 'd1c', c('meses1'), c('nonec1'), { focus: [0.5, 0.5], zoom: 0.14 }, g => {
  const a = Chip(g, 'MESES DESPUÉS…', { cx: 400, cy: 150, size: 46 });
  const b = CAP(g, 'LEVANTARSE LE CUESTA MÁS', { hi: 'CUESTA MÁS' });
  Drama(g);
  return t => { slideIn(a, t, at('meses1'), 'l', 400); show(b, t, at('meses1') + 2); };
});
scene(svg, c('nonec1'), c('solucion1'), g => {
  const a = el('g', {}, g); Card(a, { x: 260, y: 220, w: 1400, h: 220, fill: C.white }); Mark(a, false, 400, 330, 1.1); Text(a, 'EL CARTÍLAGO DESAPARECIÓ', { x: 1020, y: 330, size: 58, color: C.grey });
  const b = el('g', {}, g); Card(b, { x: 260, y: 520, w: 1400, h: 220, fill: C.white }); Mark(b, true, 400, 630, 1.1); Text(b, 'SUS PIERNAS PERDIERON FUERZA', { x: 1020, y: 630, size: 58 });
  sfx('pop', at('nonec1')); sfx('ding', at('piernas1'));
  return t => { pop(a, t, at('nonec1'), 960, 330); pop(b, t, at('piernas1'), 960, 630); };
});
// gentle start
scene(svg, c('solucion1'), c('preguntarte1'), g => {
  const r = ChipRow(g, [['✗ IGNORAR EL DOLOR', c('solucion1')], ['✗ CAMINAR HASTA AGOTARTE', () => at('solucion1') + 2]], { cy: 160, size: 40 });
  const a = el('g', {}, g); const sa = Still(a, 'cut/re2.png', { x: 230, y: 280, w: 640, h: 520, iw: SZ.re2[0], ih: SZ.re2[1], r: 30, zoom: 0.04 });
  const la = Chip(a, 'CONTRAE EL MUSLO SENTADO', { cx: 550, cy: 880, size: 36 });
  const b = el('g', {}, g); const sb = Still(b, 'cut/ss4.png', { x: 1050, y: 280, w: 640, h: 520, iw: SZ.ss4[0], ih: SZ.ss4[1], r: 30, focus: [0.5, 0.6], zoom: 0.04 });
  const lb = Chip(b, 'LEVÁNTATE CON APOYO', { cx: 1370, cy: 880, size: 36 });
  const g2 = el('g', {}, g); Card(g2, { x: 610, y: 400, w: 700, h: 240, fill: C.white }); IC.stairs(g2, 650, 470, 1); Text(g2, 'POCO A POCO', { x: 1010, y: 490, size: 64, color: ACC }); Text(g2, 'respetando tus capacidades', { x: 1010, y: 570, size: 36, weight: 700 });
  sfx('pop', at('suaves1') + 0.5); sfx('pop', at('silla1')); sfx('ding', at('gradual1'));
  return t => {
    r(t); show(a, t, at('suaves1') + 0.5); sa.draw(t, at('suaves1'), at('gradual1')); show(b, t, at('silla1')); sb.draw(t, at('silla1'), at('gradual1'));
    pop(g2, t, at('gradual1'), 960, 520);
  };
});
// question to the viewers
scene(svg, c('preguntarte1'), c('recuerda1'), g => {
  const host = Host(g, 'three_q', { cx: 400, cy: 600, fit: 720 });
  const q = Bubble(g, '¿Has dejado de caminar por miedo?', { cx: 1180, cy: 330, size: 50 });
  const w = el('g', { transform: 'translate(220 0)' }, g); const cta = CTA(w, 'comment', 700);
  sfx('ding', at('preguntarte1') + 1.6); sfx('click', at('cuentamelo1'));
  return t => { host(t, at('preguntarte1')); pop(q, t, at('preguntarte1') + 1.6, 1180, 330); pop(cta, t, at('cuentamelo1'), 1180, 700); };
});
scene(svg, c('recuerda1'), () => END + 1, g => {
  const a = el('g', {}, g); Card(a, { x: 260, y: 240, w: 1400, h: 520, fill: C.white });
  Text(a, 'PROTEGER ≠ INMOVILIZAR', { x: 960, y: 400, size: 84, color: ACC });
  const b = Text(g, 'enseñar a moverse con seguridad', { x: 960, y: 560, size: 56, weight: 800 });
  const ck = el('g', {}, g); IC.check(ck, 910, 610, 1);
  sfx('pop', at('recuerda1') + 0.3); sfx('ding', at('recuerda1') + 4);
  return t => { pop(a, t, at('recuerda1') + 0.3, 960, 500); show(b, t, at('recuerda1') + 4); pop(ck, t, at('recuerda1') + 4.6, 960, 660); };
});

window.draw = t => drawScenes(t);
