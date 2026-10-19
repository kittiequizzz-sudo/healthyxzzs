// Video 2 · Mito «Si me siento bien, mi azúcar está bien» (A1C). Shots keyed to cues.txt.
// Owner's assets (order.md) replace stock stand-ins automatically when they are in assets/.
const has = n => n in (window.SIZES || {});
const own = (n, fallback) => (has(n) ? n : fallback);
const REC = 'Recreación · Don Ernesto es un personaje';

Story({ name: 'SALUD 60+' }, [
  // Beat 1 · apertura
  { at: 'open', type: 'photo', src: own('ernesto_arrive', 'walk_away'), move: 'in', lt: ['Don Ernesto · 68 años', 'Barranquilla'], note: REC },
  { at: 'perfecto', type: 'photo', src: own('ernesto_walk', 'couple_coffee'), move: 'left', cap: '“Me siento perfecto”', note: REC },
  { at: 'analisis', type: 'custom', note: 'Ejemplo · sin datos reales', build: (g, s) => {
    const ph = Photo(g, 'assets/doc_talk.jpg', { iw: SIZES.doc_talk[0], ih: SIZES.doc_talk[1], dark: 0.72, fade: false });
    const l = LabSheet(g, { rows: [['Glucosa en ayunas', '131', 'mg/dL'], ['Hemoglobina A1c', '8.1', '%'], ['Creatinina', '0.9', 'mg/dL']], hi: 1 });
    SFX.push([s.t0 + 0.1, 'paper', -2], [s.t0 + 1.6, 'marker', -4]);
    return t => { ph.draw(t, s.t0, s.t1); l.draw(t, s.t0 + 0.1, s.t0 + 1.6, s.t1); };
  } },
  { at: 'como', type: 'photo', src: own('ernesto_desk', 'doc_worry'), move: 'in', head: ['ME SIENTO BIEN…', '¿Y ESTE NÚMERO?'], hi: 1, note: REC },
  { at: 'comunes', type: 'photo', src: 'doc_talk', move: 'right' },
  { at: 'avisa', type: 'photo', src: 'corridor', move: 'in', cap: 'El azúcar alta casi no avisa' },
  { at: 'lunes', type: 'photo', src: 'corridor', move: 'left', lt: ['El lunes', 'Por qué el azúcar sube con los años'] },
  { at: 'hoy', type: 'photo', src: 'tube', move: 'in', lt: ['Hoy · el A1C', 'Hemoglobina glicosilada'] },
  { at: 'explico', type: 'photo', src: 'lab_rack', move: 'right', cap: 'Qué mide · qué significa · cuándo engaña' },
  { at: 'preguntas', type: 'photo', src: 'notebook', move: 'in', lt: ['Al final', '3 preguntas para su cita'] },

  // Beat 2 · el mito
  { at: 'mito', type: 'photo', src: 'couple_coffee', move: 'in', head: ['“SI ME SIENTO BIEN,', 'MI AZÚCAR ESTÁ BIEN”'], hi: 1, sec: 'EL MITO' },
  { at: 'cierto', type: 'photo', src: 'walk_away', move: 'right', cap: '¿Qué tiene de cierto?' },
  { at: 'senales', type: 'photo', src: 'water_glass', move: 'in', lt: ['Azúcar muy alta', 'Sed · orinar seguido · cansancio'] },
  { at: 'antes', type: 'photo', src: 'rbc_flow', move: 'in', cap: 'Antes, el cuerpo casi no dice nada' },
  { at: 'mexico', type: 'number', src: 'lab_rack', value: 33, label: 'de cada 100 con A1C menor de 7', source: 'Ensanut 2021–2024 · Salud Pública Méx 2025' },
  { at: 'idea', type: 'custom', noNote: true, build: (g, s) => {
    const h = Headline(g, ['LA DIABETES', 'CASI NO AVISA'], { x: 960, y: 470, size: 140, hi: 1 });
    SFX.push([s.t0 + 0.3, 'impact', -6]);
    return t => h.draw(t, s.t0 + 0.2, s.t1);
  } },

  // Beat 3 · tres claves
  { at: 'clave1', type: 'chapter', src: 'film_camera', n: 1, title: 'La foto y la película', sub: 'Glucómetro vs. A1C', sec: 'CLAVE 1' },
  { at: 'foto', type: 'custom', noNote: true, build: (g, s) => {
    const pv = PhotoVsFilm(g, {});
    SFX.push([s.t0 + 0.1, 'shutter', -6], [STORY_T('pelicula'), 'swish', -8]);
    return t => pv.draw(t, s.t0 + 0.1, STORY_T('pelicula'));
  } },
  { at: 'globulos', type: 'photo', src: 'rbc_flow', move: 'in', lt: ['Glóbulos rojos', 'Llevan la hemoglobina'], source: 'Wellcome Collection (CC BY)' },
  { at: 'pega', type: 'photo', src: 'honey_spoon', move: 'out', cap: 'El azúcar se pega a la hemoglobina' },
  { at: 'dias120', type: 'number', src: 'rbc', value: 120, label: 'días vive un glóbulo rojo', source: 'Revisión: HbA1c y vida del glóbulo rojo (PMC1569985)' },
  { at: 'mide', type: 'custom', noNote: true, source: 'A1C = % de hemoglobina con azúcar', build: (g, s) => {
    const c = SugarCells(g, {});
    return t => c.draw(t, s.t0, 0, 8.1, 3);
  } },
  { at: 'detalle', type: 'photo', src: 'tube', move: 'in', lt: ['Dato práctico', 'La mitad del cambio se ve en ~1 mes'], source: 'Modelo de la cinética del A1C (PMC5094338)' },
  { at: 'semanas', type: 'photo', src: 'notebook_phone', move: 'left', cap: 'No tiene sentido repetirlo cada 2 semanas' },

  { at: 'clave2', type: 'chapter', src: 'lab_rack', n: 2, title: 'Traducir el número', sub: 'Del % a los mg/dL de su glucómetro', sec: 'CLAVE 2' },
  { at: 'adag', type: 'study', src: 'tube', pub: 'Estudio ADAG · Diabetes Care 2008',
    title: ['Translating the A1C assay into', 'estimated average glucose values'], lines: ['507 adultos · 3 meses', 'miles de mediciones por persona'], hi: 0, source: 'Nathan DM y col. · ADA Standards 2010, tabla 9' },
  { at: 'tabla', type: 'bars', title: 'A1C → azúcar promedio (aprox.)', unit: ' mg/dL', max: 230,
    rows: [['A1C 6 %', 126], ['A1C 7 %', 154, N.gold], ['A1C 8 %', 183, N.gold], ['A1C 9 %', 212]], source: 'ADAG · ADA Standards 2010, tabla 9' },
  { at: 'ronda', type: 'number', src: 'water_glass', value: 183, suffix: ' mg/dL', label: 'A1C 8 % · de día y de noche', source: 'ADAG (PMC2797382)' },
  { at: 'ernesto186', type: 'number', src: own('ernesto_desk', 'walk_away'), value: 186, suffix: ' mg/dL', label: 'Don Ernesto · A1C 8,1 %', source: '28,7 × 8,1 − 46,7 ≈ 186 (fórmula ADAG)', note: REC },

  { at: 'clave3', type: 'chapter', src: 'water_glass', n: 3, title: 'Por qué no se siente', sub: 'El límite del riñón', sec: 'CLAVE 3' },
  { at: 'rinones', type: 'custom', noNote: true, source: 'Umbral renal de glucosa · varía con la edad y el riñón', build: (g, s) => {
    const gl = ThresholdGlass(g, {});
    const k = [[s.t0 + 0.3, 110], [STORY_T('limite'), 150], [STORY_T('encima'), 175], [STORY_T('encima') + 3, 215], [STORY_T('problema'), 186], [STORY_T('problema') + 2, 170], [STORY_T('problema') + 4, 192]];
    SFX.push([STORY_T('encima') + 2, 'whoosh', -14]);
    return t => gl.draw(t, k);
  } },
  { at: 'edad', type: 'photo', src: 'couple_coffee', move: 'in', lt: ['El límite cambia', 'con la edad y la salud del riñón'] },
  { at: 'vasos', type: 'photo', src: 'rbc', move: 'in', cap: 'Ojos · riñones · nervios', source: 'Wellcome Collection (CC BY)' },


  // Beat 5 · guías
  { at: 'guias', type: 'study', src: 'doc_talk', pub: 'ADA · Standards of Care 2026', title: ['Sección 6', 'Metas glucémicas'], lines: ['Muchos adultos: A1C menor de 7 %', 'si se logra sin bajones de azúcar'], hi: 0, source: 'Diabetes Care 2026;49(Supl. 1) · rec. 6.3a', sec: 'LAS GUÍAS' },
  { at: 'estricta', type: 'photo', src: 'doc_talk', move: 'left', cap: 'Su meta depende de su salud' },
  { at: 'mayores', type: 'photo', src: 'couple_coffee', move: 'in', lt: ['Adultos mayores sanos', 'Meta: menos de 7 a 7,5 %'], source: 'ADA 2026 · Sección 13 (13.7a)' },
  { at: 'cada', type: 'photo', src: 'notebook', move: 'right', lt: ['¿Cada cuánto?', 'Estable: 2 veces al año · si no: cada 3 meses'], source: 'ADA Standards of Care · Sección 6' },
  { at: 'hijos', type: 'photo', src: own('daughter_lab', 'tube'), move: 'in', lt: ['Diagnóstico', '6,5 % o más: diabetes · 5,7–6,4 %: prediabetes'], source: 'ADA 2026 · Sección 2' },
  { at: 'mama', type: 'photo', src: 'couple_coffee', move: 'left', cap: '¿Mamá o papá con diabetes? Pregunte si debe medirse' },
  { at: 'ukpds', type: 'study', src: 'pills', pub: 'UKPDS 35 · BMJ 2000', title: ['Association of glycaemia with', 'complications of type 2 diabetes'], lines: ['1 % menos de A1C ≈ 37 % menos', 'riesgo relativo (vasos pequeños)'], hi: 0, source: 'Stratton IM y col. BMJ 2000;321:405' },
  { at: 'riesgo37', type: 'number', src: 'pills', value: 37, suffix: ' %', label: 'menos riesgo relativo por cada punto de A1C', source: 'UKPDS 35 · BMJ 2000 · observacional' },
  { at: 'relativo', type: 'custom', noNote: true, source: 'UKPDS 35 · estudio observacional', build: (g, s) => {
    const h = Headline(g, ['RIESGO RELATIVO', 'ESTUDIO DE OBSERVACIÓN'], { x: 960, y: 450, size: 110, hi: 1 });
    return t => h.draw(t, s.t0 + 0.2, s.t1);
  } },
  { at: 'medicina', type: 'photo', src: 'blister', move: 'in', lt: ['Información, no una consulta', 'Hable con su equipo médico antes de cambiar'] },

  // Beat 6 · cuándo engaña
  { at: 'engana', type: 'chapter', src: 'tube', n: 4, title: 'Cuándo el A1C engaña', sub: 'Depende de los glóbulos rojos', sec: 'CUÁNDO ENGAÑA' },
  { at: 'anemia', type: 'checklist', title: 'Pueden mover el resultado', items: ['Anemia', 'Sangrado o transfusión reciente', 'Enfermedad avanzada del riñón', 'Variantes de la hemoglobina'], source: 'Revisión HbA1c (PMC1569985) · ADA' },
  { at: 'historia', type: 'photo', src: own('glucometer_hands', 'notebook_phone'), move: 'in', cap: '¿Cuentan la misma historia?' },
  { at: 'bajones', type: 'photo', src: 'blister', move: 'left', lt: ['Precaución', 'Insulina · glibenclamida · glimepirida'] },
  { at: 'caida', type: 'warning', src: 'pills', title: 'Señales de azúcar baja (menos de 70)', items: ['Temblor', 'Sudor frío', 'Hambre de repente', 'Corazón acelerado · confusión'], source: 'ADA en español · hipoglucemia' },
  { at: 'urgencias', type: 'custom', noNote: true, source: 'Verifique el número de su país', build: (g, s) => {
    const c = NumbersCard(g, { title: 'EMERGENCIAS', items: [['México', '911'], ['Colombia', '123'], ['Chile', '131'], ['Perú', '106'], ['Argentina', '107'], ['España', '112'], ['Rep. Dominicana', '911']] });
    SFX.push([s.t0, 'thunk', -10]);
    return t => c.draw(t, s.t0 + 0.1);
  } },

  // Beat 7 · un promedio esconde
  { at: 'promedio', type: 'custom', note: 'Ejemplo ilustrativo', sec: 'LO QUE ESCONDE', build: (g, s) => {
    const c = TwoCurves(g, {});
    return t => c.draw(t, s.t0 + 0.4, STORY_T('otra'));
  } },
  { at: 'sensor', type: 'photo', src: own('glucometer_hands', 'notebook_phone'), move: 'in', lt: ['También', 'Lecturas del glucómetro o sensor continuo'] },
  { at: 'aprox', type: 'custom', noNote: true, source: 'ADAG · PMC4455453', build: (g, s) => {
    const h = Headline(g, ['A1C 8 %  →', '147 A 217 mg/dL'], { x: 960, y: 420, size: 120, hi: 1 });
    const c = NT(g, 'El número es una guía, no una sentencia', { x: 960, y: 760, size: 52, font: 'S', italic: true, anchor: 'middle', color: N.dim });
    return t => { h.draw(t, s.t0 + 0.2, s.t1); show(c, t, s.t0 + 1.5); };
  } },

  // Beat 8 · la imagen completa
  { at: 'serio', type: 'photo', src: own('ernesto_desk', 'walk_away'), move: 'out', note: REC, sec: 'SU HISTORIA' },
  { at: 'noticia', type: 'photo', src: 'couple_coffee', move: 'in', cap: 'Sentirse bien es una buena noticia' },
  { at: 'miden', type: 'custom', noNote: true, build: (g, s) => {
    const h = Headline(g, ['NO SE SIENTEN HOY.', 'SE MIDEN HOY.'], { x: 960, y: 470, size: 130, hi: 1 });
    SFX.push([s.t0 + 0.3, 'impact', -8]);
    return t => h.draw(t, s.t0 + 0.2, s.t1);
  } },
  { at: 'regañarlo', type: 'photo', src: own('daughter_lab', 'notebook'), move: 'in', lt: ['Su A1C', 'Su historia en un solo número'] },

  // Beat 9 · 3 preguntas + cierre
  { at: 'anote', type: 'checklist', title: '3 preguntas para su cita', y: 200, ats: ['uno', 'dos', 'tres'], sec: 'SU PRÓXIMA CITA',
    items: ['¿Cuál fue mi último A1C y mi meta?', '¿Algo hace que mi A1C no sea exacto?', '¿Mi A1C y mi glucómetro coinciden?'] },
  { at: 'comentarios', type: 'photo', src: 'notebook_phone', move: 'in', cap: '¿Sabe cuál fue su último A1C?' },
  { at: 'ozempic', type: 'photo', src: 'pills', move: 'left', lt: ['El lunes', 'Ozempic, Mounjaro y compañía'] },
  { at: 'comparta', type: 'photo', src: 'couple_coffee', move: 'in', lt: ['Compártalo', 'con alguien de su familia'] },
  { at: 'vealo', type: 'photo', src: 'walk_away', move: 'left', lt: ['El video del lunes', 'Por qué el azúcar sube con los años'] },
  { at: 'recuerde', type: 'end' },
]);
