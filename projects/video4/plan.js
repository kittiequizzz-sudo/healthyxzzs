// Video 4 · Ozempic genérico, Ozempic falso — cómo no confundirse. Shots keyed to cues.txt.
// own('p_…', fallback): the owner's photos and character images (ORDER.md) replace stand-ins when they arrive.
// Rule (owner, video 3): no photo in more than 2 shots; mechanisms, lists and numbers are animated.
const has = n => n in (window.SIZES || {});
const own = (n, fallback) => (has(n) ? n : fallback);
const REC = 'Dramatización · Don Aurelio, Andrés y Doña Fidelina son personajes';
const T = k => STORY_T(k);
const SC = (body, extra = {}) => ({ type: 'custom', noNote: true, ...extra, build: body });
const MSG = [{ text: 'Ozempic genérico' }, { text: 'Mitad de precio' }, { text: 'Envío a domicilio' }, { text: 'Sin receta' }];
// map cards: country (Natural Earth name), label, status, colour, card position
const BR = { country: 'Brazil', name: 'Brasil', status: 'Genéricos aprobados · ago. 2026', color: N.teal, cx: 980, cy: 930, w: 520 };
const MX = { country: 'Mexico', name: 'México', status: 'Sin genérico aprobado · sep. 2026', color: N.red, cx: 640, cy: 190, w: 540 };
const CO = { country: 'Colombia', name: 'Colombia', status: 'Revise el registro del INVIMA', color: N.gold, cx: 330, cy: 560, w: 480 };
const ES = { country: 'Spain', name: 'España', status: 'Protección en la UE hasta 2031', color: N.red, cx: 1540, cy: 880, w: 520 };
const mapShot = (at, items, lit, extra = {}) => SC((g, s) => {
  const m = MapStatus(g, { items });
  return t => m.draw(t, s.t0, items.map((_, i) => (i < lit ? s.t0 + 0.1 : T(at) + 0.3)));
}, { at, source: 'Estado a octubre de 2026 · cambia rápido · verifique con su autoridad sanitaria', ...extra });

Story({ name: 'SALUD 60+' }, [
  // Beat 1 · apertura
  { at: 'open', ...SC((g, s) => { const a = PhoneChat(g, { msgs: MSG, title: 'Mensaje de ejemplo' }); return t => a.draw(t, s.t0, [s.t0 + 0.4, s.t0 + 1.3, T('envio'), T('envio') + 0.9]); }), note: REC },
  { at: 'aurelio', type: 'photo', src: own('aurelio_msg', 'phone_hands'), move: 'in', lt: ['Don Aurelio, 72 años', 'Oaxaca, México'], note: REC },
  { at: 'iglesia', type: 'photo', src: own('p_oaxaca', 'corridor'), move: 'left', cap: 'Se lo reenviaron del grupo de la iglesia' },
  { at: 'miami', type: 'photo', src: own('andres_pc', 'notebook_phone'), move: 'in', lt: ['Andrés, 47 años', 'De Medellín, vive en Miami'], note: REC },
  { at: 'fidelina', type: 'photo', src: own('p_cali', 'walk_away'), move: 'right', cap: 'Para su mamá, Doña Fidelina, en Cali' },
  { at: 'pagina', type: 'photo', src: own('p_laptop_noche', 'notebook_phone'), move: 'in', cap: 'Precios mucho más bajos que en la farmacia' },
  { at: 'patente', ...SC((g, s) => { const h = Headline(g, ['¿GENÉRICO…', '…O FALSO?'], { x: 960, y: 440, size: 140, hi: 1 }); SFX.push([s.t0 + 0.3, 'impact', -8]); return t => h.draw(t, s.t0 + 0.2, s.t1); }) },
  { at: 'legales', type: 'photo', src: own('p_laboratorio_control', 'p_laboratorio'), move: 'in', lt: ['2026', 'La patente se venció en varios países'] },
  { at: 'falsas', ...SC((g, s) => { const a = PenContents(g, { title: 'Pero siguen apareciendo plumas falsas' }); return t => a.draw(t, s.t0, [s.t0 + 0.3, T('nada'), T('europa')]); }) },
  { at: 'canal', type: 'photo', src: own('p_celular_mesa', 'p_celular'), move: 'in', lt: ['En este canal', 'Guías médicas, estudios y autoridades sanitarias'] },
  { at: 'hoy', ...SC((g, s) => { const a = Agenda(g, { items: [{ icon: 'doc', label: ['PAÍS POR', 'PAÍS'] }, { icon: 'bars', label: ['GENÉRICO, COMPUESTO', 'O FALSO'] }, { icon: 'warn', label: ['5 SEÑALES', 'PARA NO CAER'] }] }); return t => a.draw(t, s.t0, [s.t0 + 0.3, T('diferencia'), T('cinco')]); }) },
  { at: 'final', type: 'photo', src: own('p_farmacia_mostrador', 'p_farmacia'), move: 'left', lt: ['Al final', '3 preguntas para su farmacia o su médico'] },

  // Beat 2 · desmentir lo obvio
  { at: 'piensa', type: 'photo', src: own('p_farmaceutico', 'doc_talk'), move: 'in', cap: '“Igual que el de marca, pero más barato”', sec: 'EL MITO' },
  { at: 'bolsillo', type: 'photo', src: own('p_fabrica_pharma', 'pills'), move: 'right', cap: 'Los genéricos de verdad: buena noticia' },
  { at: 'disfraz', ...SC((g, s) => { const h = Headline(g, ['“GENÉRICO”', 'SE VOLVIÓ UN DISFRAZ'], { x: 960, y: 440, size: 120, hi: 1 }); return t => h.draw(t, s.t0 + 0.2, s.t1); }) },
  { at: 'redes', type: 'photo', src: own('p_tianguis', 'corridor'), move: 'in', cap: 'Redes, WhatsApp, mercados informales' },
  { at: 'pregunta', ...SC((g, s) => {
    const h = Headline(g, ['NO ES MARCA VS. GENÉRICO'], { x: 960, y: 360, size: 96, hi: -1 });
    const c = Pill(g, '¿TIENE REGISTRO SANITARIO EN MI PAÍS?', { x: 960, y: 620, size: 64, color: N.gold, stroke: N.gold });
    SFX.push([T('registro'), 'ding', -10]);
    return t => { h.draw(t, s.t0 + 0.2, s.t1); c.draw(t, T('registro')); };
  }) },
  { at: 'paso', type: 'photo', src: own('p_laboratorio_control', 'lab_rack'), move: 'left', lt: ['Un genérico de verdad', 'Pasó por la autoridad sanitaria. Un falso, no'] },

  // Clave 1
  { at: 'clave1', type: 'chapter', src: own('p_fabrica_pharma', 'pills'), n: 1, title: 'Qué es un genérico de verdad', sub: 'Genérico · compuesto · falso', sec: 'CLAVE 1' },
  { at: 'mismo', ...SC((g, s) => { const a = ThreeKinds(g); return t => a.draw(t, s.t0, [s.t0 + 0.2, T('compuesto'), T('falso')]); }) },
  { at: 'b12', type: 'study', src: own('p_bogota', 'blister'), pub: 'INVIMA · Alerta 090-2024', title: ['“Semaglutida con', 'vitamina B12”'], lines: ['Se vendía para bajar de peso', 'Sin registro sanitario'], hi: 1, source: 'INVIMA, Colombia · abril 2024' },
  { at: 'falso', type: 'photo', src: own('p_tianguis', 'blister'), move: 'in', cap: 'El falso: copian la caja, la etiqueta o la pluma' },

  // Clave 2
  { at: 'clave2', type: 'chapter', src: own('p_brasil', 'corridor'), n: 2, title: 'País por país', sub: 'México · Brasil · Colombia · España', sec: 'CLAVE 2' },
  { at: 'brasil', ...mapShot('brasil', [BR], 0) },
  { at: 'anvisa', type: 'photo', src: own('p_brasil', 'p_laboratorio'), move: 'in', lt: ['Brasil · ANVISA', 'Primer genérico: 17 de agosto de 2026 · otro una semana después'], source: 'Prensa brasileña, agosto 2026' },
  { at: 'precio', type: 'number', src: own('p_farmacia_mostrador', 'blister'), value: 292, prefix: 'R$ ', label: '≈ US$ 56 · estimación de prensa', source: 'Band, 18/08/2026 · cambio del 17/08/2026' },
  { at: 'ojo', ...SC((g, s) => { const h = Headline(g, ['APROBADO ≠', 'EN TODAS LAS FARMACIAS'], { x: 960, y: 440, size: 110, hi: 1 }); return t => h.draw(t, s.t0 + 0.2, s.t1); }) },
  { at: 'mexico', ...mapShot('mexico', [BR, MX], 1), source: 'Según la prensa, cierre de septiembre 2026 · verifique en cofepris.gob.mx' },
  { at: 'litigado', type: 'photo', src: own('p_cdmx', 'corridor'), move: 'left', lt: ['Según reportes de prensa', 'Litigio por la protección de datos'] },
  { at: 'importante', ...SC((g, s) => { const h = Headline(g, ['“OZEMPIC GENÉRICO” EN MÉXICO,', 'HOY: NO ES UN GENÉRICO LEGAL'], { x: 960, y: 440, size: 84, hi: 1 }); SFX.push([s.t0 + 0.3, 'impact', -8]); return t => h.draw(t, s.t0 + 0.2, s.t1); }), source: 'Al cierre de septiembre 2026, según la prensa' },
  { at: 'colombia', ...mapShot('colombia', [BR, MX, CO], 2), source: 'Análisis legal, abril 2026 · consulte invima.gov.co' },
  { at: 'invima', type: 'photo', src: own('p_bogota', 'p_farmacia'), move: 'in', lt: ['INVIMA, 2024', 'Un solo registro de semaglutida: el de Ozempic'], source: 'INVIMA Alerta 200-2024' },
  { at: 'espana', ...mapShot('espana', [BR, MX, CO, ES], 3), source: 'Protección de datos/mercado en la UE hasta 2031' },
  { at: 'codigos', type: 'photo', src: own('p_madrid', 'p_farmacia'), move: 'left', lt: ['España', 'Cada caja se verifica con un código antes de entregarla'] },

  // Clave 3
  { at: 'clave3', type: 'chapter', src: own('p_tianguis', 'blister'), n: 3, title: 'Qué traen los falsos', sub: 'Lo que encontraron las autoridades', sec: 'CLAVE 3' },
  { at: 'abuelos', type: 'photo', src: own('p_nieto_celular', 'p_familia_sofa'), move: 'in', cap: 'Lo que más preocupa para nuestros abuelos' },
  { at: 'marzo', type: 'study', src: own('p_cdmx', 'blister'), pub: 'COFEPRIS · alerta sanitaria · marzo 2026', title: ['Ozempic 1 mg', 'falsificado en México'], lines: ['Etiquetas en otro idioma, no en español', 'Sin el principio activo, según la prensa'], hiAt: 'principio', hi: 1, source: 'COFEPRIS, 26–27 marzo 2026 · Expansión, Uno TV' },
  { at: 'mayo', ...SC((g, s) => { const a = PenContents(g, { title: 'Mayo 2026 · otro lote falso', labels: ['ORIGINAL', 'PLUMA DISTINTA', ''] }); return t => a.draw(t, s.t0, [s.t0 + 0.3, s.t0 + 1.4, 1e9]); }), source: 'COFEPRIS, mayo 2026' },
  { at: 'bogota', type: 'study', src: own('p_bogota', 'blister'), pub: 'INVIMA · Alerta 200-2024', title: ['Plumas falsas', 'en Bogotá'], lines: ['La pluma de otro producto', 'con caja y etiqueta de Ozempic'], hi: 0, source: 'INVIMA, Colombia · 2024' },
  { at: 'austria', type: 'study', src: own('p_urgencias', 'icu_monitor'), pub: 'Austria · autoridades sanitarias · 2023', title: ['Plumas falsificadas', 'en Europa'], lines: ['Hospitalizados: azúcar muy baja, convulsiones', 'Se sospechaba insulina, no semaglutida'], hiAt: 'insulina', hi: 1, source: 'Reuters, octubre 2023 · alerta de la EMA' },
  { at: 'oms', ...SC((g, s) => {
    const items = [{ country: 'Brazil', name: 'Brasil', status: 'Lotes falsos', color: N.red, cx: 820, cy: 860, w: 360 },
      { country: 'United Kingdom', name: 'Reino Unido', status: 'Lotes falsos', color: N.red, cx: 1000, cy: 230, w: 380 },
      { country: 'United States of America', name: 'Estados Unidos', status: 'Lotes falsos', color: N.red, cx: 420, cy: 230, w: 420 }];
    const m = MapStatus(g, { view: 'world', inset: null, items });
    const k = Kicker(g, 'OMS · alerta mundial · junio 2024', { y: 120 });
    return t => { m.draw(t, s.t0, [s.t0 + 0.8, s.t0 + 1.3, s.t0 + 1.8]); k.draw(t, s.t0); };
  }), source: 'Organización Mundial de la Salud, 20 junio 2024' },

  // Clave 4
  { at: 'clave4', type: 'chapter', src: own('p_farmacia_mostrador', 'p_farmacia'), n: 4, title: 'Cinco señales para no caer', sub: 'Receta · Registro · Empaque · Lote · Precio', sec: 'CLAVE 4' },
  { at: 's1', ...SC((g, s) => { const a = FiveSigns(g, { notes: ['Farmacia formal, no internet', 'El número de su país', 'Etiquetas en su idioma', 'Iguales en caja y pluma', '“Mitad de precio”, “sin receta”'] }); return t => a.draw(t, s.t0, [s.t0 + 0.3, T('s2'), T('s3'), T('s4'), T('s5')]); }), source: 'COFEPRIS · INVIMA · OMS' },
  { at: 'frases', ...SC((g, s) => { const a = PhoneChat(g, { msgs: [{ text: 'Mitad de precio' }, { text: 'Sin receta' }, { text: 'Envío por WhatsApp' }, { text: 'En frasco' }, { text: 'Con vitamina B12' }], title: 'Señales de alerta' }); return t => a.draw(t, s.t0, [0, 1, 2, 3, 4].map(i => s.t0 + 0.2 + i * 0.35)); }), note: 'Mensaje de ejemplo' },

  // Beat 4–5 · autoridades
  { at: 'sigamos', type: 'photo', src: own('p_celular_mesa', 'p_celular'), move: 'right', cap: 'Bueno, sigamos', sec: 'AUTORIDADES' },
  { at: 'autoridades', type: 'checklist', title: 'Lo que dicen las autoridades', y: 230, ats: ['cofepris', 'invima2', 'oms2'],
    items: ['COFEPRIS: con receta; sin supervisión es un riesgo', 'INVIMA: verifique el registro, no compre en línea', 'OMS: solo canales confiables, con un profesional'] },
  { at: 'lugar', ...SC((g, s) => { const h = Headline(g, ['EL LUGAR DONDE COMPRA', 'ES PARTE DE LA MEDICINA'], { x: 960, y: 440, size: 104, hi: 1 }); SFX.push([s.t0 + 0.3, 'impact', -8]); return t => h.draw(t, s.t0 + 0.2, s.t1); }) },
  { at: 'recuerde', ...SC((g, s) => { const a = ThreeNo(g); return t => a.draw(t, s.t0, [s.t0 + 1.2, s.t0 + 1.9, s.t0 + 2.6]); }) },

  // Beat 6 · ¿me afecta?
  { at: 'dira', type: 'photo', src: own('aurelio_farmacia', 'p_farmacia'), move: 'in', cap: '“Yo compro en mi farmacia de siempre”', note: REC, sec: 'SU FAMILIA' },
  { at: 'familia', type: 'photo', src: own('p_nieto_celular', 'p_tele'), move: 'left', cap: 'Los mensajes llegan a los mayores… y a los hijos lejos' },
  { at: 'andres2', type: 'photo', src: own('andres_llamada', 'notebook_phone'), move: 'in', lt: ['Andrés', 'Quería ayudar a su mamá desde Miami'], note: REC },
  { at: 'reglas', ...SC((g, s) => { const a = AbroadNo(g); return t => a.draw(t, s.t0, s.t0 + 2.6, T('cali')); }) },
  { at: 'advertencia', type: 'warning', src: own('p_urgencias', 'icu_monitor'), title: 'Si usó una pluma sospechosa', ats: [undefined, undefined, undefined, undefined],
    items: ['Temblor · sudor frío', 'Hambre de repente', 'Corazón acelerado', 'Confusión'], source: 'Puede ser azúcar baja' },
  { at: 'glucometro', ...SC((g, s) => { const a = MeterLow(g); return t => a.draw(t, s.t0); }) },
  { at: 'urgencias', ...SC((g, s) => { const c = NumbersCard(g, { title: 'CONFUSIÓN FUERTE · DESMAYO · CONVULSIONES', items: [['México', '911'], ['Colombia', '123'], ['Chile', '131'], ['Perú', '106'], ['Argentina', '107'], ['España', '112'], ['Rep. Dominicana', '911']] }); SFX.push([s.t0, 'thunk', -10]); return t => c.draw(t, s.t0 + 0.1); }) },
  { at: 'avise', ...SC((g, s) => {
    const bg = AnimBG(g, { tint: N.gold });
    const k = Kicker(g, 'Si ya usó una pluma sospechosa', { y: 130 });
    const env = Art(g, 'a_sobre', { x: 480, y: 540, w: 400 }, OBJ.envelope);
    const rows = [['NO SIGA USÁNDOLA', 'avise a un profesional de salud', s.t0 + 0.6], ['GUARDE LA PLUMA Y LA CAJA', '', T('guarde')], ['AVISE A LA AUTORIDAD', 'México: farmacovigilancia@cofepris.gob.mx', T('guarde') + 1.4], ['', 'Colombia: invimafv@invima.gov.co', T('guarde') + 2.0]]
      .map(([a, b, tt], i) => { const o = el('g', {}, g); if (a) NT(o, a, { x: 820, y: 330 + i * 150, size: 54, color: N.gold, ls: 2 }); if (b) NT(o, b, { x: 820, y: 330 + i * 150 + (a ? 58 : 0), size: 38, font: 'B', weight: 700 }); return [o, tt]; });
    return t => { bg.draw(t); k.draw(t, s.t0); env.draw(t, s.t0 + 0.2, { k: 0.02, rate: 3 }); rows.forEach(([o, tt]) => show(o, t, tt)); };
  }), source: 'COFEPRIS · INVIMA' },

  // Beat 7 · matices
  { at: 'justa', type: 'photo', src: own('p_fabrica_pharma', 'p_laboratorio'), move: 'in', lt: ['Para ser justa', 'Los genéricos de verdad son una muy buena noticia'], sec: 'LA OTRA CARA' },
  { at: 'fabricar', ...SC((g, s) => { const a = MakeCost(g); return t => a.draw(t, s.t0, s.t0 + 3.2, T('nopublicado')); }), source: 'Imperial College de Londres y otros · vía AFP, marzo 2026' },
  { at: 'realistas', ...SC((g, s) => { const h = Headline(g, ['APROBADO HOY ≠', 'MÁS BARATO MAÑANA'], { x: 960, y: 440, size: 120, hi: 1 }); return t => h.draw(t, s.t0 + 0.2, s.t1); }) },
  { at: 'barato', type: 'photo', src: own('p_brasil', 'pills'), move: 'left', lt: ['Más barato ≠ falso', 'La clave: el registro sanitario en su país'] },

  // Beat 8 · la imagen completa
  { at: 'aurelio2', type: 'photo', src: own('aurelio_farmacia', 'p_farmacia'), move: 'in', lt: ['Don Aurelio', 'No contestó: fue a su farmacia y preguntó'], note: REC, sec: 'SU HISTORIA' },
  { at: 'borro', type: 'photo', src: own('aurelio_grupo', 'p_iglesia'), move: 'in', cap: 'Y avisó al grupo de la iglesia', note: REC },
  { at: 'andres3', type: 'photo', src: own('fidelina_farmacia', own('fidelina_medico', 'p_doctora')), move: 'in', lt: ['Doña Fidelina', 'Ahora lo recibe con receta, por su sistema de salud'], note: REC },
  { at: 'llegar', type: 'photo', src: own('p_familia_mesa', 'p_fiesta'), move: 'out', head: ['LA MEJOR PROTECCIÓN:', 'SABER QUÉ PREGUNTAR'], hi: 1, headSize: 90 },

  // Beat 9 · 3 preguntas + cierre
  { at: 'anote', type: 'checklist', title: '3 preguntas', y: 200, ats: ['p1', 'p2', 'p3'], sec: 'SU PRÓXIMA CITA',
    items: ['Farmacia: ¿tiene registro aquí? ¿Me enseña el número?', 'Farmacia: ¿ya hay un genérico aprobado en mi país?', 'Médico: si aparece uno, ¿me conviene cambiarme?'] },
  { at: 'comentarios', type: 'photo', src: own('p_videollamada', 'p_celular'), move: 'in', cap: '¿Le han llegado ofertas así? ¿De qué país?' },
  { at: 'sabado', type: 'photo', src: own('p_familia_mesa', 'p_familia_sofa'), move: 'left', lt: ['El sábado', 'Pan de muerto, guaguas de pan y colada morada'] },
  { at: 'comparta', type: 'photo', src: own('p_nieto_celular', 'p_vecinas'), move: 'in', lt: ['Compártalo', 'con su grupo de WhatsApp de la familia'] },
  { at: 'cierre', type: 'end' },
]);
