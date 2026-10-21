/**
 * ─────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN GLOBAL DEL SITIO
 *  Todo lo que cambia a menudo vive aquí: marca, precios, IPREM,
 *  contacto, enlaces y fotos. Después de editar: `npm run build`.
 *  Los textos están en /content/es.js y /content/en.js
 * ─────────────────────────────────────────────────────────────
 */
module.exports = {
  // [NOMBRE DE LA MARCA] — nombre provisional, cámbialo aquí
  brand: {
    name: 'Ya Aterrizamos',
    tagline: 'Llegada y residencia en Madrid',
  },

  // Dominio final (para canonical, hreflang, sitemap y Open Graph). Sin barra final.
  siteUrl: 'https://www.tudominio.es',

  // [COLOR DE MARCA] — el resto de la paleta está en assets/css/styles.css (:root)
  colors: {
    primary: '#1B2A4A',
    accent: '#D9824B',
  },

  // Precios en euros (números). El ahorro del combo se calcula solo.
  prices: {
    residence: 299,
    pack: 399, // Pack Bienvenida: tarifa plana por grupo de hasta 4
    packSolo: 349, // Pack Bienvenida por persona (tarifa principal)
    packExtra: 50, // Por persona adicional a partir de la quinta
    combo: 649, // [PRECIO COMBO] — placeholder
  },

  // [IPREM VIGENTE] mensual en euros. Revísalo cada año (BOE / Presupuestos).
  iprem: 600,

  // Porcentajes de IPREM para la calculadora orientativa de medios económicos.
  // first = titular, second = primer familiar, others = cada familiar adicional.
  means: {
    students: { first: 100, second: 75, others: 50 },
    spanish: { first: 100, second: 75, others: 50 },
    eu: { first: 100, second: 75, others: 50 },
  },

  contact: {
    whatsapp: '34600000000', // [NÚMERO] solo dígitos con prefijo, sin + ni espacios
    whatsappDisplay: '+34 600 000 000',
    email: 'hola@tudominio.es',
    city: 'Madrid, España',
  },

  // [URL PLATAFORMA] de seguimiento "Mi expediente"
  platformUrl: 'https://app.tudominio.es',

  social: {
    instagram: 'https://instagram.com/tumarca',
    tiktok: 'https://tiktok.com/@tumarca',
  },

  // Cifras de la home. [X] familias acompañadas → placeholder
  stats: {
    families: 120,
  },

  // Endpoint para recibir formularios (p. ej. Formspree, Make, Zapier, tu backend).
  // Se envía un POST con JSON. Si lo dejas vacío, el formulario muestra la pantalla
  // final y ofrece continuar por WhatsApp, pero NO guarda los datos en ningún sitio.
  formEndpoint: '',

  // Muestra los testimonios de ejemplo (marcados como "Ejemplo"). Pon false al publicar
  // si aún no tienes testimonios reales.
  showPlaceholderTestimonials: true,

  // ID de Google Analytics 4 (G-XXXX). Solo se carga si el usuario acepta cookies analíticas.
  analyticsId: '',

  /**
   * Fotos. Valor = ID de Unsplash (parte tras "photo-") o una ruta local (/assets/img/foto.jpg).
   * Recomendado: sustituirlas por fotos propias o con licencia antes de lanzar.
   */
  images: {
    homeHero: '1570135460231-4407ce9488b5',
    statement: '1543783207-ec64e4d95325',
    cardStudents: '1523240795612-9a054b0db644',
    cardSpanish: '1516589178581-6cd7833ae3b2',
    cardEu: '1511895426328-dc8714191300',
    packHero: '1517400508447-f8dd518b86db',
    homePack: '1530521954074-e64f6810b32d',
    finalCta: '1646039319329-ad6ef058cca5',
    studentsHero: '1541339907198-e08756dedf3f',
    studentsAlt: '1522202176988-66273c2fd55f',
    spanishHero: '1494774157365-9e04c6720e47',
    euHero: '1475503572774-15a45e5d60b9',
    contact: '1570698473651-b2de99bae12f',
    stepTransfer: '1542296332-2e4473faf563',
    stepSim: '1580910051074-3eb694886505',
    stepPadron: '1543783207-ec64e4d95325',
    stepBank: '1521791136064-7986c2920216',
    stepInsurance: '1576091160550-2173dba999ef',
    stepInternet: '1586105251261-72a756497a11',
    avatar1: '1438761681033-6461ffad8d80',
    avatar2: '1507003211169-0a1dd7228f2d',
    avatar3: '1534528741775-53994a69daeb',
    avatar4: '1500648767791-00dcc994a43e',
  },
};
