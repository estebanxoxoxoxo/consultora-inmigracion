/**
 * TEXTOS EN ESPAÑOL
 * Variables disponibles en cualquier texto: {brand} {price} {pack} {combo} {save} {iprem} {families}
 * Se sustituyen automáticamente con los valores de site.config.js
 * Usa *asteriscos* para poner una palabra en cursiva serif dentro de un titular.
 */

// Lo que incluye el servicio: común a las 3 residencias
const includes = [
  'Reunión informativa de 20 minutos gratis',
  'Análisis de tu caso',
  'Checklist personalizada de documentos',
  'Revisión completa de tu documentación',
  'Preparación de formularios',
  'Firma digital de la representación desde tu móvil',
  'Presentación online ante Extranjería en tu nombre',
  'Respuesta a requerimientos de documentación',
  'Seguimiento en nuestra plataforma hasta la resolución',
  'Guía para la cita de huellas y obtención de tu tarjeta (TIE)',
];

module.exports = {
  lang: 'es',
  locale: 'es_ES',
  langName: 'Español',

  ui: {
    skip: 'Saltar al contenido',
    nav: {
      residences: 'Residencias',
      pack: 'Pack Bienvenida',
      how: 'Cómo funciona',
      file: 'Mi expediente',
      start: 'Empezar',
      menu: 'Abrir menú',
      close: 'Cerrar menú',
      home: 'Inicio',
    },
    langSwitch: 'EN',
    langSwitchLabel: 'Read in English',
    from: 'Desde',
    perFamily: 'por familia',
    oneTime: 'pago único',
    seeMore: 'Ver detalle',
    freeCall: 'Incluye reunión informativa de 20 min gratis',
    whatsapp: 'Escríbenos por WhatsApp',
    whatsappMsg: 'Hola, me gustaría información sobre vuestros servicios.',
    placeholderBadge: 'Ejemplo',
    footer: {
      blurb: 'Gestionamos tu residencia en España 100% online y te ayudamos a instalarte cuando llegas. Desde Madrid.',
      services: 'Servicios',
      company: 'Contacto',
      legal: 'Legal',
      legalNotice: 'Aviso legal',
      privacy: 'Privacidad',
      cookies: 'Cookies',
      cookieSettings: 'Configurar cookies',
      rights: 'Todos los derechos reservados.',
      disclaimer: 'No somos un organismo público. Gestionamos tu trámite como representantes ante la Administración.',
    },
    cookies: {
      title: 'Tu privacidad, tu decisión',
      text: 'Usamos cookies técnicas necesarias para que la web funcione y, solo si nos dejas, cookies analíticas para mejorarla.',
      accept: 'Aceptar todas',
      reject: 'Rechazar',
      configure: 'Configurar',
      save: 'Guardar preferencias',
      necessary: 'Necesarias',
      necessaryText: 'Imprescindibles para que la web funcione. Siempre activas.',
      analytics: 'Analíticas',
      analyticsText: 'Nos ayudan a entender cómo se usa la web, de forma agregada.',
      more: 'Más información',
    },
    faqTitle: 'Preguntas frecuentes',
    // Formulario corto de las páginas de detalle
    shortForm: {
      name: 'Nombre',
      email: 'Email',
      phone: 'WhatsApp',
      message: '¿Algo que debamos saber? (opcional)',
      privacy: 'Acepto la <a href="{privacyUrl}">política de privacidad</a>.',
      submit: 'Enviar',
      sending: 'Enviando…',
      ok: '¡Recibido! Te escribimos en menos de 24 horas.',
      error: 'No hemos podido enviarlo. Escríbenos por WhatsApp y lo vemos al momento.',
    },
  },

  // Servicios (nav, tarjetas, footer, formulario)
  services: {
    students: { name: 'Estancia por estudios', short: 'Estudios', line: 'Quédate a estudiar en España.' },
    spanish: { name: 'Familiar de ciudadano español', short: 'Familiar de español', line: 'Vive en España con tu familia española.' },
    eu: { name: 'Familiar de ciudadano UE', short: 'Familiar UE', line: 'Vive en España con tu familiar europeo.' },
    pack: { name: 'Pack Bienvenida', short: 'Pack Bienvenida', line: 'Aterriza con todo resuelto.' },
  },

  /* ═════════════════════════ HOME ═════════════════════════ */
  home: {
    seo: {
      title: '{brand} · Residencia en España online y ayuda para llegar con tu familia',
      description: 'Gestionamos tu residencia de estudiante, de familiar de español o tarjeta comunitaria 100% online desde Madrid. Y te ayudamos a instalarte al llegar a España.',
    },
    hero: {
      eyebrow: 'Residencias en España · 100% online',
      title: 'Tu nueva vida en España *empieza aquí.*',
      lead: 'Residencia online y llegada resuelta. Sin colas, sin citas, sin estrés.',
      cta: 'Empezar ahora',
      cta2: 'Ver servicios',
      alt: 'Padre sonriente con sus dos hijos en brazos, al aire libre',
    },
    statement: {
      line1: 'Nosotros hacemos el papeleo.',
      line2: 'Tú disfrutas de llegar.',
    },
    residences: {
      eyebrow: 'Residencias',
      title: 'Elige tu *camino.*',
      lead: 'Un precio cerrado. Todo online. Te acompañamos hasta tu tarjeta.',
      alts: {
        students: 'Grupo de estudiantes riendo en una biblioteca',
        spanish: 'Dos manos formando un corazón al atardecer',
        eu: 'Familia grande de la mano frente al mar al atardecer',
      },
    },
    how: {
      eyebrow: 'Cómo funciona',
      title: 'Cuatro pasos. *Cero colas.*',
      steps: [
        { title: 'Nos cuentas tu caso', text: 'Un formulario de 2 minutos o un WhatsApp.' },
        { title: 'Firmas desde tu móvil', text: 'Nos autorizas a representarte con firma digital.' },
        { title: 'Presentamos tu solicitud online', text: 'Ante Extranjería, en tu nombre. Sin citas.' },
        { title: 'Sigues todo desde nuestra plataforma', text: 'Cada paso, en tiempo real.' },
      ],
    },
    pack: {
      eyebrow: 'Pack Bienvenida',
      title: 'Aterriza con *todo resuelto.*',
      lead: 'Por familia. Desde el aeropuerto hasta tu primer día en casa.',
      items: [
        { icon: 'car', label: 'Traslado desde el aeropuerto' },
        { icon: 'sim', label: 'SIM con datos' },
        { icon: 'home', label: 'Empadronamiento' },
        { icon: 'bank', label: 'Cuenta bancaria' },
        { icon: 'shield', label: 'Seguro médico' },
        { icon: 'wifi', label: 'Internet y móviles' },
      ],
      cta: 'Descubrir el Pack',
      alt: 'Viajero descansando en la terminal del aeropuerto mientras despega un avión',
    },
    stats: {
      eyebrow: 'En cifras',
      title: 'Hecho para que *no pierdas ni un día.*',
      items: [
        { value: 100, suffix: '%', label: 'online', text: 'De la primera consulta a la resolución.' },
        { value: 0, from: 99, suffix: '', label: 'colas', text: 'Ni citas imposibles, ni esperas.' },
        { value: '{families}', prefix: '+', suffix: '', label: 'familias acompañadas', text: 'Que ya viven en España.' },
        { value: 24, suffix: ' h', label: 'de respuesta', text: 'Máximo. Normalmente, mucho antes.' },
      ],
    },
    platform: {
      eyebrow: 'Plataforma',
      title: 'Tu trámite, *siempre a la vista.*',
      lead: 'Sigue cada paso en tiempo real desde nuestra plataforma.',
      points: [
        { icon: 'bell', text: 'Avisos en cada cambio de estado' },
        { icon: 'upload', text: 'Sube documentos desde el móvil' },
        { icon: 'chat', text: 'Habla con tu gestor sin esperas' },
      ],
      cta: 'Ir a Mi expediente',
    },
    testimonials: {
      eyebrow: 'Historias',
      title: 'Ya están *aquí.*',
      items: [
        { name: 'Valentina R.', country: 'Colombia', service: 'Estancia por estudios', avatar: 'avatar1', quote: 'Estaba agobiada con el máster y los plazos. Me lo dieron todo hecho y yo solo firmé desde el móvil.' },
        { name: 'Andrés M.', country: 'México', service: 'Familiar de español + Pack', avatar: 'avatar2', quote: 'Llegamos con dos niños y a la semana teníamos padrón, banco y médico. No me lo podía creer.' },
        { name: 'Camila S.', country: 'Argentina', service: 'Familiar de ciudadano UE', avatar: 'avatar3', quote: 'Me dijeron que tenía tres meses y me asusté. Lo presentaron en diez días.' },
        { name: 'Diego P.', country: 'Perú', service: 'Pack Bienvenida', avatar: 'avatar4', quote: 'Nos esperaban en Barajas con un cartel con nuestro apellido. Así empezó todo.' },
      ],
    },
    faq: [
      { q: '¿Tengo que ir en persona a algún sitio?', a: 'Para la solicitud, no: la presentamos online en tu nombre. Solo tendrás que acudir a la cita de huellas para recoger tu tarjeta (TIE), y te guiamos en ese paso.' },
      { q: '¿Cómo firmo para que me representéis?', a: 'Desde tu móvil, con firma digital. Te enviamos un enlace, lo revisas y firmas en un minuto. Sin imprimir nada.' },
      { q: '¿Cuánto tarda?', a: 'Preparar y presentar tu solicitud suele llevarnos pocos días desde que tenemos tus documentos. Después, la resolución depende de Extranjería. Mientras tanto, ves cada avance en tu plataforma.' },
      { q: '¿Qué pasa si piden más documentos?', a: 'Está incluido. Si Extranjería emite un requerimiento, te avisamos, te decimos exactamente qué hace falta y lo contestamos por ti.' },
      { q: '¿Puedo contratar la residencia y el Pack juntos?', a: 'Sí. Con el combo Residencia + Pack Bienvenida pagas {combo} en lugar de comprarlos por separado.' },
      { q: '¿Cómo sigo mi trámite?', a: 'Desde “Mi expediente”, nuestra plataforma. Ves cada estado en tiempo real, subes documentos y hablas con tu gestor.' },
    ],
    final: {
      title: '¿Empezamos?',
      lead: 'Cuéntanos tu caso. Te respondemos en menos de 24 horas.',
      cta: 'Cuéntanos tu caso',
      alt: 'Gran Vía de Madrid al atardecer vista desde lo alto',
    },
  },

  /* ═════════════════════ DETALLE: COMÚN ═════════════════════ */
  detail: {
    priceNote: 'Precio cerrado · 100% online',
    cta: 'Empezar',
    forYouTitle: '¿Es *para ti?*',
    includesTitle: 'Qué incluye *nuestro servicio.*',
    includesLead: 'Todo el trámite, de principio a fin. Sin sorpresas.',
    includes,
    requirementsTitle: '*Requisitos.*',
    requirementsLead: 'Lo que necesitas cumplir. Nosotros lo revisamos contigo.',
    docsTitle: '*Documentación.*',
    docsLead: 'Tu checklist. Márcala a medida que vayas reuniendo cada documento.',
    docsHint: 'Te enviamos una versión personalizada al empezar.',
    meansTitle: 'Medios *económicos.*',
    meansIpremLabel: 'IPREM mensual',
    calcTitle: 'Calculadora orientativa',
    calcLabel: 'Personas en la solicitud',
    calcHint: 'Titular + familiares que te acompañan',
    calcResult: 'al mes, aproximadamente',
    calcYear: 'Equivale a {amount} al año.',
    calcDisclaimer: 'Cálculo orientativo. Revisamos tu caso concreto antes de presentar.',
    processTitle: 'El *proceso.*',
    benefitsTitle: 'Qué *consigues.*',
    upsell: {
      eyebrow: 'Llegada resuelta',
      title: 'Súmale el Pack Bienvenida por {pack}.',
      text: 'Traslado desde Barajas, SIM, padrón, banco, seguro e internet. Todo en un mismo sitio.',
      cta: 'Ver el Pack',
    },
    final: {
      title: '¿Empezamos con *lo tuyo?*',
      lead: 'Déjanos tus datos y te escribimos en menos de 24 horas. O empieza el formulario completo.',
      cta: 'Formulario completo',
    },
  },

  /* ═════════════════════ ESTANCIA POR ESTUDIOS ═════════════════════ */
  students: {
    seo: {
      title: 'Residencia de estudiante en España online · {price} | {brand}',
      description: 'Tramitamos tu estancia por estudios en España desde dentro del país, 100% online. Revisión de documentos, presentación ante Extranjería y seguimiento. {price}.',
    },
    hero: {
      eyebrow: 'Estancia por estudios',
      title: 'Estudia en España. *Quédate a vivirlo.*',
      lead: 'Convierte tu estancia en una residencia de estudiante, sin salir de España.',
      alt: 'Estudiantes graduados lanzando sus birretes al cielo',
    },
    forYou: [
      { icon: 'plane', title: 'Estás en España', text: 'Como turista o con estancia legal.' },
      { icon: 'graduation', title: 'Te han admitido', text: 'Universidad, máster, FP, idiomas u otro centro autorizado.' },
      { icon: 'calendar', title: 'Aún estás a tiempo', text: 'Tu estancia legal no ha terminado todavía.' },
      { icon: 'users', title: 'Vienes con familia', text: 'Pareja o hijos pueden acompañarte.' },
    ],
    requirements: [
      { icon: 'clock', title: 'Estancia regular', text: 'Estar en España de forma regular y presentar antes de que termine tu estancia legal.' },
      { icon: 'graduation', title: 'Admisión o matrícula', text: 'En un centro de estudios autorizado.' },
      { icon: 'shield', title: 'Seguro médico privado', text: 'Sin copagos ni carencias.' },
      { icon: 'coins', title: 'Medios económicos', text: 'Suficientes para ti y tu familia, según IPREM.' },
      { icon: 'check-doc', title: 'Sin antecedentes penales', text: 'Para mayores de edad.' },
      { icon: 'passport', title: 'Pasaporte en vigor', text: 'Completo y con validez suficiente.' },
    ],
    docs: [
      { title: 'Identidad', items: ['Pasaporte completo (todas las páginas)', 'Formulario EX-00'] },
      { title: 'Estudios', items: ['Carta de admisión o matrícula del centro autorizado'] },
      { title: 'Salud y medios', items: ['Seguro médico privado sin copagos ni carencias', 'Acreditación de medios económicos'] },
      { title: 'Antecedentes', items: ['Certificado de antecedentes penales apostillado y traducido (mayores de edad)'] },
      { title: 'Si te acompaña tu familia', items: ['Pasaporte de cada familiar', 'Acreditación del vínculo (matrimonio, pareja o nacimiento) apostillada y traducida'] },
    ],
    means: {
      text: 'Debes acreditar el 100% del IPREM mensual para ti, el 75% para el primer familiar y el 50% por cada familiar adicional.',
      highlight: '{iprem} / mes',
      highlightLabel: 'para el estudiante',
    },
    process: [
      { title: 'Evaluación', text: 'Analizamos tu caso y confirmamos que encaja.' },
      { title: 'Documentos', text: 'Te damos tu checklist y revisamos cada papel.' },
      { title: 'Firma', text: 'Firmas la representación desde tu móvil.' },
      { title: 'Presentación online', text: 'Presentamos tu solicitud ante Extranjería.' },
      { title: 'Resolución', text: 'Seguimos el expediente y respondemos requerimientos.' },
      { title: 'Huellas y TIE', text: 'Te guiamos en la cita y en la recogida de tu tarjeta.' },
    ],
    benefits: [
      { icon: 'home', title: 'Vivir legalmente', text: 'Durante tus estudios en España.' },
      { icon: 'briefcase', title: 'Trabajar', text: 'De forma compatible con tus estudios.' },
      { icon: 'users', title: 'Traer a tu familia', text: 'Pareja e hijos, contigo.' },
    ],
    faq: [
      { q: '¿Puedo pedirla si entré como turista?', a: 'Sí, siempre que estés en España de forma regular y presentes la solicitud antes de que termine tu estancia legal. Por eso conviene empezar cuanto antes.' },
      { q: '¿Qué estudios sirven?', a: 'Estudios en un centro autorizado: universidad, máster, formación profesional, idiomas y otros programas reconocidos. Revisamos tu admisión antes de empezar.' },
      { q: '¿Puedo trabajar mientras estudio?', a: 'Sí, de forma compatible con tus estudios. Te explicamos las condiciones en tu caso.' },
      { q: '¿Qué seguro médico necesito?', a: 'Un seguro privado sin copagos ni carencias, con cobertura equivalente a la sanitaria pública. Si no lo tienes, te ayudamos a encontrarlo.' },
    ],
  },

  /* ═════════════════════ FAMILIAR DE ESPAÑOL ═════════════════════ */
  spanish: {
    seo: {
      title: 'Residencia de familiar de ciudadano español online · {price} | {brand}',
      description: 'Residencia para cónyuges, parejas, hijos y padres de españoles. Gestionamos tu tarjeta de familiar de español 100% online desde Madrid. {price}.',
    },
    hero: {
      eyebrow: 'Familiar de ciudadano español',
      title: 'Tu familia es española. *Tu vida, también.*',
      lead: 'Residencia y trabajo en España junto a los tuyos.',
      alt: 'Pareja abrazándose frente a un atardecer',
    },
    forYou: [
      { icon: 'ring', title: 'Cónyuge o pareja', text: 'Casado o en pareja registrada con un español.' },
      { icon: 'child', title: 'Hijos', text: 'Del español o de su pareja.' },
      { icon: 'heart', title: 'Padres a cargo', text: 'Del español o de su pareja.' },
    ],
    requirements: [
      { icon: 'link', title: 'Vínculo acreditado', text: 'Matrimonio, pareja o filiación documentada.' },
      { icon: 'id', title: 'Familiar español con DNI', text: 'En vigor.' },
      { icon: 'shield', title: 'Cobertura sanitaria', text: 'Seguridad Social del familiar español o seguro privado.' },
      { icon: 'coins', title: 'Medios económicos', text: 'Suficientes, según el caso.' },
      { icon: 'passport', title: 'Pasaporte en vigor', text: 'Completo y con validez suficiente.' },
    ],
    docs: [
      { title: 'Identidad', items: ['Pasaporte completo (todas las páginas)', 'Formulario EX-24'] },
      { title: 'Vínculo familiar', items: ['Certificado de matrimonio, pareja o nacimiento apostillado y traducido'] },
      { title: 'Familiar español', items: ['DNI del familiar español'] },
      { title: 'Residencia y salud', items: ['Certificado de empadronamiento', 'Acreditación de cobertura sanitaria'] },
      { title: 'Medios económicos', items: ['Contrato o vida laboral del familiar español, o acreditación de recursos'] },
    ],
    means: {
      text: 'Si tu familiar español trabaja, basta con acreditar su empleo. Si no, se acreditan recursos según el IPREM.',
      highlight: 'Su empleo',
      highlightLabel: 'basta si tu familiar trabaja',
    },
    process: [
      { title: 'Evaluación', text: 'Analizamos tu vínculo y tu situación.' },
      { title: 'Documentos', text: 'Checklist personalizada y revisión completa.' },
      { title: 'Firma', text: 'Firmas la representación desde tu móvil.' },
      { title: 'Presentación online', text: 'Presentamos tu solicitud ante Extranjería.' },
      { title: 'Resolución', text: 'Seguimos el expediente y respondemos requerimientos.' },
      { title: 'Huellas y TIE', text: 'Te guiamos hasta tener tu tarjeta en la mano.' },
    ],
    benefits: [
      { icon: 'home', title: 'Vivir en España', text: 'Junto a tu familia.' },
      { icon: 'briefcase', title: 'Trabajar', text: 'Sin necesidad de otro permiso de trabajo.' },
      { icon: 'graduation', title: 'Estudiar', text: 'Y acceder a servicios como residente.' },
    ],
    faq: [
      { q: '¿Necesito estar casado?', a: 'No necesariamente. También vale la pareja registrada, y en algunos casos la pareja estable acreditada. Lo revisamos contigo.' },
      { q: '¿Mi pareja española tiene que trabajar?', a: 'No es obligatorio. Si trabaja, basta con acreditar su empleo. Si no, se acreditan recursos económicos suficientes.' },
      { q: '¿Puedo trabajar desde el primer día?', a: 'La tarjeta de familiar te permite vivir y trabajar en España sin pedir otro permiso. Te explicamos desde cuándo en tu caso.' },
      { q: '¿Puedo traer a mis padres?', a: 'Sí, si están a cargo del español o de su pareja. Requiere acreditar esa dependencia; te decimos cómo.' },
    ],
  },

  /* ═════════════════════ FAMILIAR UE ═════════════════════ */
  eu: {
    seo: {
      title: 'Tarjeta comunitaria en Madrid · Familiar de ciudadano UE · {price} | {brand}',
      description: 'Tarjeta de residencia de familiar de ciudadano de la Unión Europea, EEE o Suiza. La tramitamos online desde Madrid. Tienes 3 meses desde tu llegada. {price}.',
    },
    hero: {
      eyebrow: 'Familiar de ciudadano de la UE',
      title: 'Tu familia es europea. *España es tu casa.*',
      lead: 'Tu tarjeta de familiar de ciudadano de la Unión, sin colas.',
      alt: 'Familia paseando de la mano por la orilla del mar',
    },
    urgent: {
      title: 'Tienes 3 meses desde tu llegada.',
      text: 'Empieza hoy.',
      cta: 'Empezar ya',
    },
    forYou: [
      { icon: 'ring', title: 'Cónyuge o pareja', text: 'De un ciudadano de la UE, del EEE o de Suiza que vive en España.' },
      { icon: 'child', title: 'Hijos', text: 'Del ciudadano europeo o de su pareja.' },
      { icon: 'heart', title: 'Padres a cargo', text: 'Del ciudadano europeo o de su pareja.' },
    ],
    requirements: [
      { icon: 'clock', title: 'Plazo de 3 meses', text: 'Solicitar en los 3 meses siguientes a tu llegada a España.' },
      { icon: 'link', title: 'Vínculo acreditado', text: 'Matrimonio, pareja o filiación documentada.' },
      { icon: 'id', title: 'Ciudadano UE registrado', text: 'Con certificado de registro de ciudadano de la UE.' },
      { icon: 'briefcase', title: 'Trabajo o recursos', text: 'El ciudadano europeo trabaja, o tiene recursos y seguro médico para toda la familia.' },
      { icon: 'passport', title: 'Pasaporte en vigor', text: 'Completo y con validez suficiente.' },
    ],
    docs: [
      { title: 'Identidad', items: ['Pasaporte completo (todas las páginas)', '3 fotografías tamaño carné', 'Formulario EX-19'] },
      { title: 'Vínculo familiar', items: ['Certificado de matrimonio, pareja o nacimiento apostillado y traducido'] },
      { title: 'Ciudadano europeo', items: ['Certificado de registro UE del familiar', 'Contrato de trabajo o acreditación de recursos'] },
      { title: 'Salud', items: ['Seguro médico, si corresponde'] },
    ],
    means: {
      text: 'Si el ciudadano UE trabaja, basta con acreditar su empleo. Si no, se acreditan recursos según el IPREM y un seguro médico completo.',
      highlight: 'Su empleo',
      highlightLabel: 'basta si tu familiar trabaja',
    },
    process: [
      { title: 'Evaluación', text: 'Confirmamos plazos y encaje de tu caso.' },
      { title: 'Documentos', text: 'Checklist personalizada y revisión completa.' },
      { title: 'Firma', text: 'Firmas la representación desde tu móvil.' },
      { title: 'Presentación online', text: 'Presentamos tu solicitud dentro de plazo.' },
      { title: 'Resolución', text: 'Seguimos el expediente y respondemos requerimientos.' },
      { title: 'Huellas y TIE', text: 'Te guiamos hasta tener tu tarjeta en la mano.' },
    ],
    benefits: [
      { icon: 'id', title: 'Tarjeta de familiar UE', text: 'Tu documento de residencia en España.' },
      { icon: 'home', title: 'Residencia', text: 'Vive en España con tu familia.' },
      { icon: 'briefcase', title: 'Trabajo', text: 'Por cuenta ajena o propia.' },
    ],
    faq: [
      { q: '¿Qué pasa si ya han pasado los 3 meses?', a: 'Escríbenos cuanto antes. Revisamos tu situación y te decimos qué opciones tienes.' },
      { q: '¿Mi familiar europeo tiene que estar registrado?', a: 'Sí, debe tener su certificado de registro de ciudadano de la UE en España. Si aún no lo tiene, te orientamos.' },
      { q: '¿Vale para familiares de suizos o noruegos?', a: 'Sí. Aplica a familiares de ciudadanos de la UE, del Espacio Económico Europeo (Noruega, Islandia, Liechtenstein) y de Suiza.' },
      { q: '¿Necesito seguro médico?', a: 'Si tu familiar europeo trabaja en España, normalmente no. Si no trabaja, necesitáis un seguro completo para toda la familia.' },
    ],
  },

  /* ═════════════════════ PACK BIENVENIDA ═════════════════════ */
  pack: {
    seo: {
      title: 'Pack Bienvenida · Ayuda para llegar a España con tu familia · {pack} | {brand}',
      description: 'Traslado desde Barajas, SIM, empadronamiento, cuenta bancaria, seguro médico e internet. Todo resuelto para tu familia al llegar a Madrid por {pack}.',
    },
    hero: {
      eyebrow: 'Pack Bienvenida',
      title: 'Aterriza con *todo resuelto.*',
      cta: 'Quiero el Pack',
      alt: 'Viajero con mochila frente a los paneles de salidas de un aeropuerto',
    },
    statement: {
      line1: 'Del aeropuerto a tu casa.',
      line2: 'Del papeleo, nos ocupamos nosotros.',
    },
    timelineTitle: 'Tu llegada, *paso a paso.*',
    steps: [
      { icon: 'car', img: 'stepTransfer', title: 'Traslado desde el aeropuerto', text: 'Te esperamos en Barajas. Hasta 5 personas.', alt: 'Avión en la puerta de embarque al atardecer' },
      { icon: 'sim', img: 'stepSim', title: 'SIM inicial', text: 'Datos móviles desde el primer minuto.', alt: 'Teléfono móvil sobre una sábana blanca' },
      { icon: 'home', img: 'stepPadron', title: 'Empadronamiento', text: 'Todo tu núcleo familiar empadronado.', alt: 'Vista aérea de los edificios de Madrid' },
      { icon: 'bank', img: 'stepBank', title: 'Cuenta bancaria', text: 'Cuenta para cada adulto.', alt: 'Dos personas dándose la mano en una oficina' },
      { icon: 'shield', img: 'stepInsurance', title: 'Seguro médico privado', text: 'Cobertura para toda tu familia.', alt: 'Estetoscopio junto a un portátil' },
      { icon: 'wifi', img: 'stepInternet', title: 'Internet y móviles', text: 'Tu casa conectada, una vez abierta tu cuenta.', alt: 'Dormitorio luminoso y ordenado' },
      { icon: 'phone', img: null, title: 'Seguimiento en nuestra plataforma', text: 'Cada trámite, a la vista.' },
    ],
    pricing: {
      title: 'Un precio. *Toda la familia.*',
      name: 'Pack Bienvenida',
      items: [
        'Reunión informativa de 20 minutos gratis',
        'Traslado aeropuerto (hasta 5 personas)',
        '1 SIM con datos',
        'Empadronamiento de todo el núcleo familiar',
        'Cuenta bancaria para cada adulto',
        'Seguro médico privado para toda la familia',
        'Alta de internet y móviles',
        'Seguimiento en plataforma',
      ],
      note: 'Incluye la gestión de cada servicio. Las primas del seguro y las tarifas de internet y móvil las abonas directamente al proveedor.',
      cta: 'Quiero el Pack',
    },
    combo: {
      eyebrow: 'Combo',
      title: 'Residencia + Pack Bienvenida',
      text: 'Tu residencia y tu llegada, resueltas por el mismo equipo.',
      save: 'Ahorras {save}',
      cta: 'Quiero el combo',
    },
    faq: [
      { q: '¿Cuándo tengo que contratarlo?', a: 'Idealmente, un par de semanas antes de tu vuelo, para organizar el traslado y tener las citas preparadas. Pero también podemos ayudarte si ya estás aquí.' },
      { q: '¿Y si somos más de 5 personas?', a: 'Escríbenos y adaptamos el traslado. El resto del Pack cubre a todo tu núcleo familiar.' },
      { q: '¿El seguro y las tarifas están incluidas?', a: 'Incluimos toda la gestión. La prima del seguro y las tarifas de internet y móvil las pagas directamente a cada proveedor, sin intermediarios.' },
      { q: '¿Solo en Madrid?', a: 'El traslado es desde Barajas y el Pack está pensado para instalarte en Madrid. Si vas a otra ciudad, pregúntanos.' },
      { q: '¿Puedo contratarlo sin la residencia?', a: 'Sí. El Pack funciona por sí solo, aunque con el combo te sale mejor.' },
    ],
    final: {
      title: 'Tu primer día en España, *tranquilo.*',
      lead: 'Cuéntanos cuándo llegáis y cuántos sois.',
      cta: 'Quiero el Pack',
      alt: 'Gran Vía de Madrid al atardecer',
    },
  },

  /* ═════════════════════ EMPEZAR ═════════════════════ */
  start: {
    seo: {
      title: 'Empezar · Cuéntanos tu caso | {brand}',
      description: 'Cuéntanos tu caso en 2 minutos y te respondemos en menos de 24 horas. Residencia en España online y Pack Bienvenida para tu llegada.',
    },
    aside: {
      title: 'Dos minutos. *Y empezamos.*',
      points: ['Respuesta en menos de 24 h', 'Sin compromiso', 'Tus datos, protegidos'],
      alt: 'Calles de Madrid vistas desde una azotea',
    },
    progress: 'Paso {n} de {total}',
    back: 'Atrás',
    next: 'Continuar',
    enterHint: 'pulsa Intro ↵',
    submit: 'Enviar',
    sending: 'Enviando…',
    required: 'Este campo es obligatorio.',
    invalidEmail: 'Revisa tu email.',
    invalidPhone: 'Revisa tu número.',
    q1: {
      title: '¿Qué necesitas?',
      options: [
        { value: 'students', label: 'Estancia por estudios', icon: 'graduation' },
        { value: 'spanish', label: 'Familiar de español', icon: 'heart' },
        { value: 'eu', label: 'Familiar de ciudadano UE', icon: 'globe' },
        { value: 'pack', label: 'Pack Bienvenida', icon: 'plane' },
        { value: 'combo', label: 'Residencia + Pack', icon: 'sparkle' },
      ],
    },
    q2: {
      title: '¿Ya estás en España?',
      yes: 'Sí, ya estoy aquí',
      no: 'No, llego el…',
      dateLabel: 'Fecha de llegada',
    },
    q3: {
      title: '¿Cuántas personas sois?',
      adults: 'Adultos',
      minors: 'Menores',
      dec: 'Quitar',
      inc: 'Añadir',
    },
    q4: {
      title: '¿Cómo te contactamos?',
      name: 'Nombre y apellidos',
      email: 'Email',
      prefix: 'Prefijo',
      phone: 'WhatsApp',
      country: 'País de origen',
      countryPlaceholder: 'Escribe tu país',
    },
    q5: {
      title: 'Un último paso.',
      text: 'Usaremos tus datos solo para responder a tu consulta y preparar tu propuesta. Nunca los compartimos con terceros con fines comerciales.',
      accept: 'He leído y acepto la <a href="{privacyUrl}" target="_blank" rel="noopener">política de privacidad</a>.',
      marketing: 'Quiero recibir novedades y consejos útiles para mi llegada (opcional).',
    },
    done: {
      title: '¡Listo!',
      text: 'Te escribimos en menos de 24 horas.',
      whatsapp: '¿Prefieres hablar ya? Escríbenos',
      home: 'Volver al inicio',
    },
    error: 'No hemos podido enviarlo. Escríbenos por WhatsApp y lo vemos al momento.',
    whatsappPrefill: 'Hola, acabo de rellenar el formulario. Me interesa: {service}.',
    countries: ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador', 'El Salvador', 'Estados Unidos', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay', 'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'Filipinas', 'Marruecos', 'Ucrania', 'Reino Unido', 'Otro'],
  },

  /* ═════════════════════ LEGAL (plantillas) ═════════════════════ */
  legal: {
    note: 'Plantilla orientativa. Revísala con tu asesor legal y completa los datos entre corchetes antes de publicar.',
    legalNotice: {
      seo: { title: 'Aviso legal | {brand}', description: 'Aviso legal e información del titular del sitio web.' },
      title: 'Aviso legal',
      sections: [
        { h: 'Titular del sitio', p: ['En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información (LSSI-CE), te informamos de que este sitio web es titularidad de [RAZÓN SOCIAL], con NIF [NIF] y domicilio en [DIRECCIÓN], Madrid. Email de contacto: {email}. [Datos registrales, si aplica].'] },
        { h: 'Objeto', p: ['Este sitio ofrece información sobre servicios de gestión de autorizaciones de residencia en España y de ayuda a la llegada. La información tiene carácter general y no sustituye el análisis de cada caso concreto.'] },
        { h: 'Propiedad intelectual', p: ['Los contenidos, marcas, logotipos y diseño del sitio pertenecen a su titular o a terceros que han autorizado su uso. No está permitida su reproducción sin autorización.'] },
        { h: 'Responsabilidad', p: ['No somos un organismo público. Actuamos como representantes de nuestros clientes ante la Administración. Las resoluciones corresponden siempre a la autoridad competente.'] },
        { h: 'Legislación aplicable', p: ['Este aviso se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid, salvo que la normativa de consumidores disponga otra cosa.'] },
      ],
    },
    privacy: {
      seo: { title: 'Política de privacidad | {brand}', description: 'Cómo tratamos tus datos personales conforme al RGPD y la LOPDGDD.' },
      title: 'Política de privacidad',
      sections: [
        { h: 'Responsable', p: ['[RAZÓN SOCIAL], NIF [NIF], [DIRECCIÓN], Madrid. Contacto: {email}.'] },
        { h: 'Qué datos tratamos y para qué', p: ['Los datos que nos facilitas en formularios, WhatsApp o email (identificativos, de contacto y relativos a tu situación migratoria) para responder a tu consulta, preparar tu propuesta y, si contratas, prestar el servicio.'] },
        { h: 'Base legal', p: ['Tu consentimiento al enviar el formulario, la ejecución del contrato cuando contratas y el cumplimiento de obligaciones legales.'] },
        { h: 'Conservación', p: ['Mientras dure la relación y, después, durante los plazos legales de prescripción. Las consultas que no se convierten en clientes se eliminan a los [12] meses.'] },
        { h: 'Destinatarios', p: ['La Administración competente para tramitar tu solicitud y proveedores que nos prestan servicios (alojamiento web, plataforma de seguimiento, firma digital), con contratos de encargo de tratamiento. No cedemos tus datos con fines comerciales.'] },
        { h: 'Tus derechos', p: ['Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a {email}. También puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).'] },
      ],
    },
    cookies: {
      seo: { title: 'Política de cookies | {brand}', description: 'Qué cookies usamos y cómo puedes configurarlas.' },
      title: 'Política de cookies',
      sections: [
        { h: 'Qué son', p: ['Las cookies son pequeños archivos que se guardan en tu navegador para que la web funcione o para obtener información sobre su uso.'] },
        { h: 'Cuáles usamos', p: ['Técnicas (necesarias): guardan tus preferencias de cookies e idioma. No requieren consentimiento.', 'Analíticas (opcionales): solo si las aceptas. [Google Analytics 4, si se activa]. Nos ayudan a medir visitas de forma agregada.'] },
        { h: 'Cómo gestionarlas', p: ['Puedes cambiar tu elección en cualquier momento desde “Configurar cookies”, en el pie de página, o borrarlas desde la configuración de tu navegador.'] },
      ],
    },
  },
};
