// Señal 1 — fatigue that rest doesn't fix: not explained by age alone; anemia, hypothyroidism, heart; also sleep, stress, meds, inactivity; when to worry; diary; red flags.
window.START = at('h1') - 1.2;
window.END = at('h2') - 1.2;
window.DURATION = window.END;
const svg = Stage('p1');
const c = k => () => at(k);

TitleCard(svg, 1, 'EL CANSANCIO QUE NO SE VA', 'Aunque descanses', () => START, c('intenso1'));
scene(svg, c('intenso1'), c('error1'), g => {
  const k = Kicker(g, 1, 'SEÑAL 1 · CANSANCIO'); Progress(g, 0);
  const v = VsCards(g, ['NORMAL', [['Cansado tras un día intenso', () => at('intenso1') + 0.8]]],
    ['MERECE ATENCIÓN', [['Agotado tras 8 horas de sueño', () => at('agotado1') + 1.5], ['Sentarte tras tareas sencillas', () => at('agotado1') + 5.5], ['Menos energía cada semana', () => at('agotado1') + 8.5]]]);
  sfx('pop', at('intenso1')); sfx('pop', at('agotado1') + 0.5);
  return t => { slideIn(k, t, at('intenso1'), 'l', 600); v.draw(t, at('intenso1'), at('agotado1') + 0.5); };
});
stillScene(svg, 'b1a', c('error1'), c('cambia1'), { focus: [0.45, 0.45], zoom: 0.14 }, g => {
  const a = CAP(g, 'ERROR: «PERDER ENERGÍA ES INEVITABLE»', { hi: 'INEVITABLE', size: 50 });
  return t => show(a, t, at('error1') + 1);
});
stillScene(svg, 'b1c', c('cambia1'), c('nosolo1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const r = SideChips(g, [['MENOS MASA MUSCULAR', () => at('cambia1') + 3], ['PEOR SUEÑO', () => at('cambia1') + 5], ['RECUPERACIÓN MÁS LENTA', () => at('cambia1') + 6.5]], { cx: 1480, y0: 200, dy: 120, size: 38 });
  [3, 5, 6.5].forEach(d => sfx('pop', at('cambia1') + d, 0.5));
  return r;
});
stillScene(svg, 'b1b', c('nosolo1'), c('causas1'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, 'LA EDAD NO EXPLICA CUALQUIER CANSANCIO', { hi: 'NO EXPLICA', size: 50 });
  return t => show(a, t, at('nosolo1') + 0.5);
});
// three possible causes, building up between two stills
const CAUSES = [['globulos', 'ANEMIA', ['debilidad · palidez', 'mareo · falta de aire']], ['tiroides', 'HIPOTIROIDISMO', ['frío · estreñimiento', 'poca concentración']], ['corazon', 'CORAZÓN', ['fatiga poco habitual', 'al esfuerzo']]];
function causes(a, b, n, extra) {
  scene(svg, a, b, g => {
    const h = Text(g, 'POSIBLES CAUSAS', { x: 960, y: 140, size: 72, color: ACC });
    const it = CAUSES.slice(0, n).map(([nm, l, ls], i) => { const cx = 400 + i * 560, x = el('g', {}, g);
      Card(x, { x: cx - 250, y: 220, w: 500, h: 700, fill: C.white }); cut(x, nm, cx, 440, 300); Text(x, l, { x: cx, y: 650, size: l.length > 10 ? 40 : 48, color: ACC });
      const sy = ls.map((s, j) => Text(x, s, { x: cx, y: 740 + j * 60, size: 34, weight: 800 }));
      return [x, cx, i === n - 1, sy]; });
    sfx('pop', a() + 0.3, 0.7);
    const more = extra ? extra(g) : null;
    return t => { show(h, t, a()); it.forEach(([x, cx, last, sy]) => { pop(x, t, a() + (last ? 0.3 : 0), cx, 570); sy.forEach((s, j) => show(s, t, last ? a() + 2.5 + j * 2.5 : a())); }); if (more) more(t); };
  });
}
causes(c('causas1'), c('sintomas1'), 1);
stillScene(svg, 'b2b', c('sintomas1'), c('hipo1'), { focus: [0.45, 0.4], zoom: 0.12 }, g => {
  const a = CAP(g, 'DEBILIDAD · PALIDEZ · MAREOS', { hi: 'PALIDEZ' });
  return t => show(a, t, at('sintomas1') + 1.5);
});
causes(c('hipo1'), c('frio1'), 2);
stillScene(svg, 'b2c', c('frio1'), c('tercera1'), { focus: [0.25, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'FRÍO CUANDO LOS DEMÁS ESTÁN BIEN', { hi: 'FRÍO', size: 52 });
  return t => show(a, t, at('frio1') + 1.5);
});
causes(c('tercera1'), c('nosignifica1'), 3);
scene(svg, c('nosignifica1'), c('cuando1'), g => {
  const h = Text(g, 'TAMBIÉN PUEDE SER…', { x: 960, y: 170, size: 66, color: ACC });
  const ts = [['moon', 'FALTA DE\nSUEÑO', 0], ['bolt', 'ESTRÉS', 1.2], ['pill', 'MEDICAMENTOS', 2.6], ['chair', 'POCA\nACTIVIDAD', 4.2]].map(([ic, l, d], i) => [IconTile(g, ic, l, 300 + i * 440, 540, { w: 380, h: 400 }), d, 300 + i * 440]);
  const a = CAP(g, 'CANSANCIO ≠ ENFERMEDAD DEL CORAZÓN', { hi: '≠', size: 50 });
  ts.forEach(([, d]) => sfx('pop', at('sueno1') + d, 0.5));
  return t => { show(a, t, at('nosignifica1') + 0.3, at('sueno1')); show(h, t, at('nosignifica1') + 0.3); ts.forEach(([x, d, cx]) => pop(x, t, at('sueno1') + d, cx, 540)); };
});
stillScene(svg, 'b1d', c('cuando1'), c('sinexplicacion1'), { focus: [0.5, 0.45], zoom: 0.12 }, g => {
  const a = CAP(g, '¿CUÁNDO PRESTAR MÁS ATENCIÓN?', { hi: 'MÁS ATENCIÓN' });
  return t => show(a, t, at('cuando1') + 0.3);
});
scene(svg, c('sinexplicacion1'), c('consejo1'), g => {
  const h = Text(g, 'CONSULTA SI EL CANSANCIO…', { x: 960, y: 150, size: 66, color: ACC });
  const its = [['APARECE SIN EXPLICACIÓN', 0], ['EMPEORA POCO A POCO', 2.5], ['DURA VARIAS SEMANAS', 4.5], ['TE IMPIDE HACER LO DE ANTES', 6.5]].map(([s, d], i) => { const r = el('g', {}, g), cy = 300 + i * 160; Card(r, { x: 300, y: cy - 60, w: 1320, h: 120, fill: C.white }); el('circle', { cx: 380, cy, r: 30, fill: '#D9A84E', stroke: C.ink, 'stroke-width': 4 }, r); Text(r, '!', { x: 380, y: cy + 3, size: 40 }); Text(r, s, { x: 440, y: cy + 2, size: 48, anchor: 'start' }); return [r, d]; });
  its.forEach(([, d]) => sfx('pop', at('sinexplicacion1') + d, 0.5));
  return t => { show(h, t, at('sinexplicacion1')); its.forEach(([r, d]) => slideIn(r, t, at('sinexplicacion1') + d, 'l', 500)); };
});
stillScene(svg, 'b2d', c('consejo1'), c('medico1'), { focus: [0.5, 0.5], zoom: 0.12 }, g => {
  const r = SideChips(g, [['¿CUÁNTO DUERMES?', () => at('anota1') + 0.3], ['¿CÓMO DESPIERTAS?', () => at('anota1') + 1.8], ['¿QUÉ TE CANSA MÁS?', () => at('anota1') + 3.5]], { cx: 420, y0: 180, dy: 120, size: 40 });
  const a = CAP(g, 'UN CONSEJO PRÁCTICO: ANÓTALO', { hi: 'ANÓTALO' });
  [0.3, 1.8, 3.5].forEach(d => sfx('pop', at('anota1') + d, 0.5));
  return t => { show(a, t, at('consejo1')); r(t); };
});
stillScene(svg, 'b2a', c('medico1'), c('recuerda1'), { focus: [0.45, 0.5], zoom: 0.12 }, g => {
  const a = CAP(g, 'AYUDA A TU MÉDICO A DECIDIR LAS PRUEBAS', { hi: 'PRUEBAS', size: 48 });
  return t => show(a, t, at('medico1') + 0.5);
});
scene(svg, c('recuerda1'), c('asumir1'), g => {
  const w = el('g', {}, g); Warn(w, 'CANSANCIO REPENTINO + …', ['DOLOR EN EL PECHO', 'DIFICULTAD INTENSA PARA RESPIRAR', 'DESMAYO'], { kind: 'red', y: 150, w: 1300 });
  const u = el('g', {}, g); Card(u, { x: 560, y: 720, w: 800, h: 150, fill: C.red, r: 75 }); IC.phone(u, 600, 745, 1); Text(u, 'URGENCIAS · 112', { x: 1010, y: 797, size: 60, color: C.white });
  sfx('alert', at('recuerda1') + 0.3); sfx('alert', at('urgente1') + 6);
  return t => { show(w, t, at('recuerda1') + 0.3); pop(u, t, at('urgente1') + 6, 960, 795); };
}, true);
scene(svg, c('asumir1'), c('noche1'), g => {
  const a = Text(g, 'SENTIRTE AGOTADO SIEMPRE', { x: 960, y: 300, size: 70, color: C.grey });
  const b = Text(g, 'NO ES «COSA DE LA EDAD»', { x: 960, y: 400, size: 70, color: C.ink });
  const m = el('g', {}, g); IC.heart(m, 860, 500, 2);
  const d = Text(g, 'ESCUCHARTE = CUIDAR TU INDEPENDENCIA', { x: 960, y: 820, size: 58, color: ACC });
  sfx('pop', at('asumir1') + 3); sfx('ding', at('independencia1') + 0.5);
  return t => { show(a, t, at('asumir1') + 0.3); show(b, t, at('asumir1') + 1.5); pop(m, t, at('asumir1') + 3, 960, 600); show(d, t, at('independencia1') + 0.5); };
});
scene(svg, c('noche1'), () => END + 1, g => {
  const host = Host(g, 'three_q', { cx: 420, cy: 600, fit: 700 });
  const q = Bubble(g, '¿Te levantas por la noche?', { cx: 1220, cy: 330, size: 54 });
  const m = el('g', {}, g); IC.moon2(m, 1110, 520, 2.2);
  sfx('ding', at('noche1') + 1);
  return t => { host(t, at('noche1')); pop(q, t, at('noche1') + 1, 1220, 330); pop(m, t, at('noche1') + 4, 1220, 630); };
});

window.draw = t => drawScenes(t);
