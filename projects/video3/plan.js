// Video 3 · Ozempic, Mounjaro, Trulicity — qué hacen de verdad dentro de su cuerpo. Shots keyed to cues.txt.
// own('p_…', fallback): the owner's real photos (photos.md) replace the CC0 stand-ins when they arrive.
const has = n => n in (window.SIZES || {});
const own = (n, fallback) => (has(n) ? n : fallback);
const REC = 'Recreación · Doña Carmen es un personaje';
const T = k => STORY_T(k);

Story({ name: 'SALUD 60+' }, [
  // Beat 1 · apertura
  { at: 'open', type: 'photo', src: own('carmen_arrive', 'doc_worry'), move: 'in', lt: ['Doña Carmen', 'Una pregunta que trae desde la casa'], note: REC },
  { at: 'vecina', type: 'photo', src: own('p_vecinas', 'couple_coffee'), move: 'left', cap: '“Mi vecina se inyecta Ozempic”' },
  { at: 'porque', type: 'photo', src: own('carmen_ask', 'doc_talk'), move: 'in', head: ['¿Y POR QUÉ', 'A MÍ NO?'], hi: 1, note: REC },
  { at: 'todos', type: 'photo', src: own('p_fiesta', 'corridor'), move: 'right', cap: 'Una pregunta de todos los días' },
  { at: 'canal', type: 'photo', src: own('p_doctora', 'doc_talk'), move: 'in', lt: ['En este canal', 'Guías médicas y estudios, con fuentes'] },
  { at: 'famosas', type: 'custom', noNote: true, build: (g, s) => {
    const h = Headline(g, ['OZEMPIC · MOUNJARO', 'TRULICITY'], { x: 960, y: 440, size: 120, hi: 1 });
    SFX.push([s.t0 + 0.3, 'impact', -8]);
    return t => h.draw(t, s.t0 + 0.2, s.t1);
  } },
  { at: 'tele', type: 'photo', src: own('p_tele', own('p_celular', 'phone_hands')), move: 'in', cap: 'En la tele, en Facebook, en WhatsApp' },
  { at: 'milagro', type: 'custom', noNote: true, build: (g, s) => {
    const h = Headline(g, ['¿MEDICINA MILAGRO…', '…O DE VANIDAD?'], { x: 960, y: 440, size: 120, hi: 1 });
    return t => h.draw(t, s.t0 + 0.2, s.t1);
  } },
  { at: 'ninguna', type: 'photo', src: own('p_doctora', 'doc_talk'), move: 'out', cap: 'Ninguna de las dos' },
  { at: 'hoy', type: 'custom', noNote: true, build: (g, s) => { const a = Agenda(g, { items: [{ icon: 'organs', label: ['DENTRO DE', 'SU CUERPO'] }, { icon: 'doc', label: ['LOS ESTUDIOS', 'GRANDES'] }, { icon: 'bars', label: ['NÚMEROS', 'CLAROS'] }] }); return t => a.draw(t, s.t0, [s.t0 + 0.4, T('hoy2'), T('hoy3')]); } },
  { at: 'riesgo65', type: 'photo', src: own('p_banda', 'senior_class'), move: 'in', cap: 'Después de los 65: un riesgo del que casi nadie habla' },
  { at: 'razonesmed', type: 'photo', src: own('p_doctora', 'doc_worry'), move: 'left', cap: 'Su médico puede tener buenas razones… o no' },
  { at: 'final', type: 'photo', src: 'notebook', move: 'left', lt: ['Al final', '3 preguntas para su cita'] },

  // Beat 2 · el mito
  { at: 'creen', type: 'photo', src: own('p_vecinas', 'couple_coffee'), move: 'in', head: ['“SI A MI VECINA LE FUNCIONÓ,', 'A MÍ TAMBIÉN”'], hi: 1, headSize: 84, sec: 'EL MITO' },
  { at: 'moda', type: 'photo', src: own('p_bascula', 'dumbbells'), move: 'right', cap: '“Es una moda para bajar de peso”' },
  { at: 'cierto', type: 'custom', noNote: true, build: (g, s) => { const a = TwoDown(g); return t => a.draw(t, s.t0, T('potentes'), T('bajan'), T('peso1')); } },
  { at: 'obesidad', type: 'photo', src: 'pills', move: 'left', lt: ['También para la obesidad', 'Con otros nombres y otras dosis'] },
  { at: 'pero', type: 'photo', src: own('p_parque', 'walk_away'), move: 'in', cap: 'Ni todo el mundo las necesita' },
  { at: 'despues60', type: 'custom', noNote: true, build: (g, s) => {
    const h = Headline(g, ['NI MILAGRO,', 'NI VANIDAD'], { x: 960, y: 450, size: 140, hi: 1 });
    SFX.push([s.t0 + 0.3, 'impact', -8]);
    return t => h.draw(t, s.t0 + 0.2, s.t1);
  } },

  // Beat 3 · Clave 1: la hormona del "ya comí"
  { at: 'clave1', type: 'chapter', src: own('p_comida', 'eggs'), n: 1, title: 'La hormona del “ya comí”', sub: 'GLP-1: un timbre del intestino', sec: 'CLAVE 1' },
  { at: 'intestino', type: 'custom', noNote: true, build: (g, s) => { const a = GutGLP1(g); return t => a.draw(t, s.t0, T('glp1')); } },
  { at: 'timbre', type: 'photo', src: own('p_timbre', 'bell'), move: 'in', cap: '“¡Llegó comida!”' },
  { at: 'cuatro', type: 'custom', noNote: true, source: 'Revisión: mecanismo de los GLP-1 (PMID 19801361)', build: (g, s) => {
    const m = MechanismMap(g, { center: 'GLP-1', items: [
      { label: 'Más insulina', sub: 'solo si el azúcar está alta', color: N.teal },
      { label: 'Menos glucagón', sub: 'el hígado saca menos azúcar', color: N.teal },
      { label: 'Estómago lento', sub: 'la comida pasa más despacio', color: N.gold },
      { label: 'Cerebro: “ya comí”', sub: 'menos hambre', color: N.gold }] });
    SFX.push([s.t0 + 0.2, 'ding', -10]);
    return t => m.draw(t, s.t0 + 0.1, [T('uno'), T('dos'), T('tres'), T('cuatro2')]);
  } },
  { at: 'fabrica', type: 'custom', noNote: true, build: (g, s) => { const a = PancreasKeys(g); return t => a.draw(t, s.t0, T('fab_tim'), T('fab_sube')); } },
  { at: 'solo', type: 'custom', noNote: true, build: (g, s) => { const a = OnlyWhenHigh(g); return t => a.draw(t, s.t0, T('solo_baja')); } },
  { at: 'dos', type: 'custom', noNote: true, build: (g, s) => { const a = LiverTap(g); return t => a.draw(t, s.t0, T('higado')); } },
  { at: 'tres', type: 'custom', noNote: true, build: (g, s) => { const f = Funnels(g, {}); return t => f.draw(t, s.t0 + 0.1); } },
  { at: 'cuatro2', type: 'custom', noNote: true, build: (g, s) => { const a = BrainFull(g); return t => a.draw(t, s.t0); } },
  { at: 'bajito', type: 'custom', noNote: true, build: (g, s) => { const a = QuietBell(g); return t => a.draw(t, s.t0, T('semag'), T('dula')); } },
  { at: 'copias', type: 'custom', noNote: true, source: 'Los nombres comerciales cambian por país', build: (g, s) => {
    const rows = [['Semaglutida', 'Ozempic · Rybelsus (pastilla)', 'copias'], ['Dulaglutida', 'Trulicity', 'copias'], ['Tirzepatida', 'Mounjaro', 'tirze']];
    const head = NT(g, 'NOMBRE GENÉRICO → NOMBRE COMERCIAL', { x: 960, y: 230, size: 46, anchor: 'middle', color: N.gold, ls: 2 });
    const items = rows.map(([gen, br], i) => {
      const r = el('g', {}, g), y = 400 + i * 190;
      el('rect', { x: 260, y: y - 70, width: 1400, height: 140, fill: N.panel, opacity: 0.95 }, r);
      el('rect', { x: 260, y: y - 70, width: 12, height: 140, fill: i === 2 ? N.teal : N.gold }, r);
      NT(r, gen, { x: 320, y, size: 64, font: 'S' });
      NT(r, '→ ' + br, { x: 1600, y, size: 46, anchor: 'end', color: N.dim });
      return r;
    });
    return t => { show(head, t, s.t0); items.forEach((r, i) => show(r, t, s.t0 + 0.4 + i * 0.6, 1e9, { dy: 20 })); };
  } },
  { at: 'semana', type: 'custom', noNote: true, build: (g, s) => { const a = WeekCalendar(g); return t => a.draw(t, s.t0, T('pastilla')); } },
  { at: 'tirze', type: 'custom', noNote: true, build: (g, s) => { const a = TwoBells(g); SFX.push([s.t0 + 0.5, 'ding', -12]); return t => a.draw(t, s.t0, T('gip')); } },
  { at: 'oxido', type: 'custom', noNote: true, build: (g, s) => { const a = RustyLock(g); return t => a.draw(t, s.t0, T('oxpeso'), T('oxmejor')); } },

  // Clave 2: más que azúcar
  { at: 'clave2', type: 'chapter', src: own('p_corazon_doctor', 'icu_monitor'), n: 2, title: 'Más que azúcar', sub: 'Corazón y riñones', sec: 'CLAVE 2' },
  { at: 'surpass', type: 'study', src: 'lab_rack', pub: 'SURPASS-2 · NEJM 2021', title: ['Tirzepatide versus semaglutide', 'once weekly in type 2 diabetes'], lines: ['1.879 adultos · A1C inicial 8,3 %', 'A1C: −2,0 a −2,3 vs −1,9 en 40 semanas'], hi: 1, source: 'Frías JP y col. NEJM 2021;385:503 · financiado por Eli Lilly' },
  { at: 'puntos', type: 'number', src: 'tube', value: 2, prefix: '−', suffix: ' puntos', label: 'de A1C en 40 semanas', source: 'SURPASS-2' },
  { at: 'importa', type: 'custom', noNote: true, build: (g, s) => { const a = HeartKidneys(g); return t => a.draw(t, s.t0, T('imp_num'), T('imp_cor')); } },
  { at: 'sustain', type: 'custom', noNote: true, source: 'SUSTAIN-6 · NEJM 2016 · 3.297 adultos · Novo Nordisk', build: (g, s) => {
    const c = Per100(g, { title: 'SUSTAIN-6 · infarto, derrame o muerte cardiaca · ~2 años', left: { n: 9, label: 'Placebo' }, right: { n: 7, label: 'Semaglutida' }, note: 'De cada 100 personas con alto riesgo del corazón' });
    return t => c.draw(t, s.t0 + 0.1, T('sustain2'));
  } },
  { at: 'rewind', type: 'custom', noNote: true, source: 'REWIND · Lancet 2019 · 9.901 adultos, edad media 66', build: (g, s) => {
    const c = Per100(g, { title: 'REWIND · eventos del corazón · más de 5 años', left: { n: 13, label: 'Placebo' }, right: { n: 12, label: 'Dulaglutida' }, note: 'De cada 100 personas · edad promedio 66 años' });
    return t => c.draw(t, s.t0 + 0.1, T('rewind2'));
  } },
  { at: 'flow', type: 'custom', noNote: true, source: 'FLOW · NEJM 2024 · 3.533 adultos con diabetes y enfermedad renal · Novo Nordisk', build: (g, s) => {
    const c = Per100(g, { title: 'FLOW · riñón grave o muerte cardiaca · ~3,5 años', left: { n: 23, label: 'Placebo' }, right: { n: 19, label: 'Semaglutida' }, note: 'De cada 100 personas con diabetes y enfermedad de los riñones' });
    return t => c.draw(t, s.t0 + 0.1, T('flow2'));
  } },
  { at: 'fijese', type: 'custom', noNote: true, build: (g, s) => {
    const h = Headline(g, ['9 → 7 · 13 → 12 · 23 → 19'], { x: 960, y: 400, size: 110, hi: 0 });
    const c = NT(g, 'Beneficio real, pero no es magia', { x: 960, y: 620, size: 60, font: 'S', italic: true, anchor: 'middle' });
    return t => { h.draw(t, s.t0 + 0.2, s.t1); show(c, t, s.t0 + 1.2); };
  } },
  { at: 'pagaron', type: 'photo', src: own('p_laboratorio', 'lab_rack'), move: 'left', lt: ['Dato justo', 'Estudios pagados por los fabricantes, con revisión de expertos'] },

  // Clave 3: el precio
  { at: 'clave3', type: 'chapter', src: own('p_estomago', 'water_glass'), n: 3, title: 'El precio', sub: 'Lo que cuesta al cuerpo', sec: 'CLAVE 3' },
  { at: 'estomago', type: 'custom', noNote: true, build: (g, s) => { const a = StomachSymptoms(g); return t => a.draw(t, s.t0, [T('s_naus'), T('s_vom'), T('s_diar'), T('s_estr')]); } },
  { at: 'nauseas', type: 'number', src: own('p_estomago', 'water_glass'), value: 1, suffix: ' de 5', label: 'tuvo náuseas en SURPASS-2', source: 'SURPASS-2 · náuseas 17–22 %' },
  { at: 'avisos', type: 'study', src: 'blister', pub: 'Prospecto · advertencias', title: ['Lo que dice', 'la ficha técnica'], lines: ['Pancreatitis · problemas de vesícula', 'Tumores de tiroides en animales'], hi: 0, source: 'Ozempic, información de prescripción (FDA 2026)' },
  { at: 'animales', type: 'custom', noNote: true, source: 'Ficha técnica de semaglutida · advertencia de tiroides', build: (g, s) => { const a = ThyroidWarn(g); return t => a.draw(t, s.t0, T('an_nose'), T('an_med')); } },
  { at: 'familia', type: 'photo', src: own('p_familia_sofa', 'couple_coffee'), move: 'in', cap: 'Por eso le preguntan por su familia' },
  { at: 'ojos', type: 'custom', noNote: true, source: 'SUSTAIN-6 · NEJM 2016', build: (g, s) => { const a = EyeRetina(g); return t => a.draw(t, s.t0, T('ojos_ret'), T('ojos_3'), T('ojos_2')); } },
  { at: 'naion', type: 'number', src: own('p_ojos', 'rbc_flow'), value: 10000, prefix: '1 de cada ', label: 'NAION: muy raro', size: 170, source: 'EMA · PRAC, junio 2025' },
  { at: 'musculo', type: 'photo', src: own('p_pesas', 'senior_weights'), move: 'in', head: ['EL RIESGO DEL QUE', 'CASI NADIE HABLA'], hi: 1, headSize: 90 },
  { at: 'grasa', type: 'custom', noNote: true, build: (g, s) => { const a = FatMuscleBlocks(g); return t => a.draw(t, s.t0); } },
  { at: 'estudio19', type: 'bars', title: 'Al bajar de peso (STEP 1, dosis para obesidad)', unit: ' %', max: 22,
    rows: [['Grasa', 19.3, N.gold], ['Masa magra (músculo)', 9.7, N.red]], dec: 1, source: 'STEP 1, subestudio DXA (PMC8089287) · adultos con obesidad' },
  { at: 'joven', type: 'custom', noNote: true, build: (g, s) => { const a = MuscleCurve(g); return t => a.draw(t, s.t0, T('j_60')); } },
  { at: 'caidas', type: 'custom', noNote: true, build: (g, s) => { const a = MuscleDoors(g); return t => a.draw(t, s.t0, T('c_caidas')); } },

  // Beat 5 · guías
  { at: 'guias', type: 'study', src: own('p_corazon_doctor', 'doc_talk'), pub: 'ADA · Standards of Care 2026', title: ['Secciones 9 y 10', 'Medicinas GLP-1'], lines: ['Con enfermedad del corazón o alto riesgo', 'y con enfermedad de los riñones'], hi: 0, source: 'Diabetes Care 2026;49(Supl. 1)', sec: 'LAS GUÍAS' },
  { at: 'mayores', type: 'photo', src: own('p_parque', 'couple_coffee'), move: 'in', lt: ['Adultos mayores · sección 13', 'Medicinas con poco riesgo de bajones'], source: 'ADA 2026 · 13.13' },
  { at: 'decision', type: 'checklist', title: 'La pregunta no es “¿quiero Ozempic?”', y: 240, ats: [undefined, undefined, undefined, undefined],
    items: ['¿Qué tiene mi corazón?', '¿Qué tienen mis riñones?', '¿Cuánto peso tengo?', '¿Cuánto músculo tengo?'] },
  { at: 'recuerde1', type: 'custom', noNote: true, build: (g, s) => { const a = ThreeNo(g); return t => a.draw(t, s.t0, [T('r_no1'), T('r_no2'), T('r_no3')]); } },

  // Beat 6 · por qué podría no recetarla
  { at: 'porque_no', type: 'chapter', src: own('carmen_ask', 'doc_talk'), n: 4, title: '¿Por qué no a mí?', sub: 'Buenas razones para no recetarla', sec: 'SU CASO', note: REC },
  { at: 'razones', type: 'checklist', title: 'Razones para no recetarla', y: 220, ats: ['razones', 'delgado', 'pancreatitis', 'precio'],
    items: ['Ya está en su meta, sin problemas del corazón ni del riñón', 'Es delgado, come poco o pierde fuerza', 'Pancreatitis o cáncer medular de tiroides en la familia', 'Precio y acceso'] },
  { at: 'mexico', type: 'photo', src: own('p_farmacia', 'pills'), move: 'in', lt: ['México · COFEPRIS', 'Tirzepatida aprobada para diabetes tipo 2 (nov. 2024)'], source: 'Aprobaciones y cobertura cambian por país' },
  { at: 'advertencia', type: 'custom', noNote: true, build: (g, s) => { const a = SugarDrop(g); return t => a.draw(t, s.t0, T('adv_ins'), T('adv_agre'), T('adv_baja')); } },
  { at: 'ajustar', type: 'photo', src: own('p_doctora', 'doc_talk'), move: 'in', lt: ['Ajustar las otras medicinas', 'Eso lo decide su médico'] },
  { at: 'senales', type: 'warning', src: 'pills', title: 'Azúcar baja: menos de 70', ats: [undefined, undefined, undefined, undefined],
    items: ['Temblor', 'Sudor frío', 'Hambre de repente', 'Corazón acelerado · confusión'], source: 'ADA en español · hipoglucemia' },
  { at: 'urgencias', type: 'custom', noNote: true, source: 'Dolor fuerte de estómago a la espalda · vómito sin retener agua · pérdida de la vista', build: (g, s) => {
    const c = NumbersCard(g, { title: 'EMERGENCIAS', items: [['México', '911'], ['Colombia', '123'], ['Chile', '131'], ['Perú', '106'], ['Argentina', '107'], ['España', '112'], ['Rep. Dominicana', '911']] });
    SFX.push([s.t0, 'thunk', -10]);
    return t => c.draw(t, s.t0 + 0.1);
  } },

  // Beat 7 · matices
  { at: 'justa', type: 'photo', src: own('p_jardin', 'garden_hose'), move: 'in', lt: ['Para ser justa', 'Una gran ayuda para muchas personas mayores'], sec: 'LO QUE NO SABEMOS' },
  { at: 'nosabemos', type: 'photo', src: own('p_laboratorio', 'lab_rack'), move: 'right', cap: 'Pocas personas muy mayores o frágiles en los estudios' },
  { at: 'vigilar', type: 'custom', noNote: true, source: 'Consenso EASO/EFAD/ECPO 2026', build: (g, s) => { const a = WatchThree(g); return t => a.draw(t, s.t0, [T('v_comida'), T('v_fuerza'), T('v_peso')]); } },
  { at: 'proteina', type: 'photo', src: own('p_plato_proteina', 'beans_market'), move: 'in', lt: ['Pregunte', '¿Cuánta proteína? ¿Qué ejercicio de fuerza?'] },

  // Beat 8 · la imagen completa
  { at: 'carmen', type: 'photo', src: own('carmen_leave', 'walk_away'), move: 'in', lt: ['Doña Carmen', 'Salió sin Ozempic… y entendió por qué'], note: REC, sec: 'SU HISTORIA' },
  { at: 'buenrinon', type: 'photo', src: own('p_jardin', 'garden_hose'), move: 'in', lt: ['En su caso', 'Buen riñón · buen corazón · en su meta · delgadita'] },
  { at: 'pesaba', type: 'photo', src: own('p_pesas', 'senior_weights'), move: 'left', cap: 'Perder músculo pesaba más que el beneficio' },
  { at: 'vecina2', type: 'photo', src: own('p_vecinas', 'couple_coffee'), move: 'left', cap: 'Otro cuerpo, otra historia' },
  { at: 'famosa', type: 'custom', noNote: true, build: (g, s) => {
    const h = Headline(g, ['LA MEJOR MEDICINA', 'NO ES LA MÁS FAMOSA'], { x: 960, y: 450, size: 120, hi: 1 });
    SFX.push([s.t0 + 0.3, 'impact', -8]);
    return t => h.draw(t, s.t0 + 0.2, s.t1);
  } },

  // Beat 9 · 3 preguntas + cierre
  { at: 'anote', type: 'checklist', title: '3 preguntas para su cita', y: 200, ats: ['p1', 'p2', 'p3'], sec: 'SU PRÓXIMA CITA',
    items: ['¿Tiene sentido para mi corazón, riñones y peso?', '¿Cómo cuido mi músculo y qué hago con las náuseas?', '¿Hay que ajustar mi insulina o glibenclamida?'] },
  { at: 'comentarios', type: 'photo', src: own('p_celular', 'phone_hands'), move: 'in', cap: '¿En su clínica, o solo en la tele y WhatsApp?' },
  { at: 'miercoles', type: 'photo', src: own('p_farmacia', 'pills'), move: 'left', lt: ['El miércoles', 'Ozempic genérico y Ozempic falso'] },
  { at: 'comparta', type: 'photo', src: own('p_familia_sofa', 'couple_coffee'), move: 'in', lt: ['Compártalo', 'con alguien de su familia'] },
  { at: 'recuerde', type: 'end' },
]);
