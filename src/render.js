const { icon } = require('./icons');

/* ───────────────────────── Rutas ───────────────────────── */
const ROUTES = {
  home: { es: '/', en: '/en/' },
  students: { es: '/residencia-estudios/', en: '/en/student-residence/' },
  spanish: { es: '/familiar-ciudadano-espanol/', en: '/en/family-of-spanish-citizen/' },
  eu: { es: '/familiar-ciudadano-ue/', en: '/en/family-of-eu-citizen/' },
  pack: { es: '/pack-bienvenida/', en: '/en/welcome-pack/' },
  start: { es: '/empezar/', en: '/en/start/' },
  legalNotice: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  cookies: { es: '/cookies/', en: '/en/cookies/' },
};
const RESIDENCES = ['eu', 'spanish', 'students'];
const RES_ICON = { students: 'graduation', spanish: 'heart', eu: 'globe' };

/* ───────────────────────── Utilidades ───────────────────────── */
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const stripRich = (s) => String(s).replace(/\*/g, '');
const rich = (s) => String(s).replace(/\*(.+?)\*/g, '<em>$1</em>');

function createCtx(cfg, c) {
  const nf = new Intl.NumberFormat(c.lang === 'es' ? 'es-ES' : 'en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' });
  const money = (n) => nf.format(n).replace(/ /g, ' ');
  const vars = {
    brand: cfg.brand.name,
    price: money(cfg.prices.residence),
    pack: money(cfg.prices.pack),
    packSolo: money(cfg.prices.packSolo),
    packExtra: money(cfg.prices.packExtra),
    combo: money(cfg.prices.combo),
    comboWas: money(cfg.prices.residence + cfg.prices.packSolo),
    save: money(cfg.prices.residence + cfg.prices.packSolo - cfg.prices.combo),
    resDiscount: money(cfg.prices.residenceDiscount),
    residenceOff: money(cfg.prices.residence - cfg.prices.residenceDiscount),
    iprem: money(cfg.iprem),
    families: String(cfg.stats.families),
    email: cfg.contact.email,
    privacyUrl: ROUTES.privacy[c.lang],
  };
  const t = (s, extra = {}) => String(s ?? '').replace(/\{(\w+)\}/g, (m, k) => (k in extra ? extra[k] : k in vars ? vars[k] : m));
  const url = (page, hash = '') => ROUTES[page][c.lang] + hash;
  return { cfg, c, t, url, money, lang: c.lang };
}

function imgSrc(cfg, key, w) {
  const v = cfg.images[key] || key;
  if (v.startsWith('/') || v.startsWith('http')) return v;
  return `https://images.unsplash.com/photo-${v}?auto=format&fit=crop&w=${w}&q=72`;
}

function img(ctx, key, alt, { sizes = '100vw', cls = '', eager = false, widths = [480, 800, 1200, 1600, 2200], ratio } = {}) {
  const v = ctx.cfg.images[key] || key;
  const local = v.startsWith('/') || v.startsWith('http');
  const srcset = local ? '' : ` srcset="${widths.map((w) => `${imgSrc(ctx.cfg, key, w)} ${w}w`).join(', ')}" sizes="${sizes}"`;
  const dims = ratio ? ` width="${ratio[0]}" height="${ratio[1]}"` : ' width="1600" height="1067"';
  return `<img class="${cls}" src="${imgSrc(ctx.cfg, key, 1200)}"${srcset} alt="${esc(alt)}"${dims} ${eager ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}>`;
}

const waLink = (ctx, msg) => `https://wa.me/${ctx.cfg.contact.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;

function eyebrow(text, cls = '') {
  return `<p class="eyebrow ${cls}">${text}</p>`;
}

function logo(ctx) {
  return `<svg class="logo-mark" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="var(--primary)"/><path d="M7 21.5a9 9 0 0 1 18 0" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-linecap="round"/><path d="M5.5 24.5h21" stroke="#FAF7F2" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="12.2" r="2" fill="#FAF7F2"/></svg><span class="logo-word">${esc(ctx.cfg.brand.name)}</span>`;
}

/* ───────────────────────── Layout ───────────────────────── */
function layout(ctx, { page, seo, body, header = 'overlay', schema = [] }) {
  const { cfg, c, t } = ctx;
  const title = t(seo.title);
  const desc = t(seo.description);
  const other = c.lang === 'es' ? 'en' : 'es';
  const canonical = cfg.siteUrl + ROUTES[page][c.lang];
  const ogImg = imgSrc(cfg, page === 'pack' ? 'packHero' : 'homeHero', 1200);

  const org = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: cfg.brand.name,
    url: cfg.siteUrl,
    email: cfg.contact.email,
    telephone: '+' + cfg.contact.whatsapp,
    areaServed: 'ES',
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
    sameAs: [cfg.social.instagram, cfg.social.tiktok],
  };

  const siteJs = {
    lang: c.lang,
    wa: cfg.contact.whatsapp,
    formEndpoint: cfg.formEndpoint,
    analyticsId: cfg.analyticsId,
    iprem: cfg.iprem,
    locale: c.lang === 'es' ? 'es-ES' : 'en-IE',
  };

  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="es" href="${cfg.siteUrl + ROUTES[page].es}">
<link rel="alternate" hreflang="en" href="${cfg.siteUrl + ROUTES[page].en}">
<link rel="alternate" hreflang="x-default" href="${cfg.siteUrl + ROUTES[page].es}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(cfg.brand.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImg}">
<meta property="og:locale" content="${c.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FAF7F2">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/fraunces.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="stylesheet" href="/assets/css/styles.css">
<style>:root{--primary:${cfg.colors.primary};--accent:${cfg.colors.accent}}</style>
<script>document.documentElement.classList.add('js');window.SITE=${JSON.stringify(siteJs)};</script>
${[org, ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
<script src="/assets/js/main.js" defer></script>
</head>
<body data-page="${page}" data-header="${header}">
<a class="skip" href="#main">${c.ui.skip}</a>
${siteHeader(ctx, page, other)}
<main id="main">
${body}
</main>
${footer(ctx)}
${waFab(ctx)}
${cookieBanner(ctx)}
</body>
</html>`;
}

function siteHeader(ctx, page, other) {
  const { c, cfg, url } = ctx;
  const n = c.ui.nav;
  const resItems = RESIDENCES.map(
    (k) => `<a class="drop-item" href="${url(k)}">
      <span class="drop-icon">${icon(RES_ICON[k])}</span>
      <span><span class="drop-title">${c.services[k].name}</span><span class="drop-line">${c.services[k].line}</span></span></a>`
  ).join('');

  const mobileLinks = [
    `<a href="${url('pack')}"><span>${n.pack}</span></a>`,
    ...RESIDENCES.map((k) => `<a href="${url(k)}"><span>${c.services[k].name}</span></a>`),
    `<a href="${url('home', '#como-funciona')}"><span>${n.how}</span></a>`,
    `<a href="${cfg.platformUrl}" rel="noopener"><span>${n.file}</span>${icon('arrow-up-right')}</a>`,
  ].join('');

  return `<header class="site-header" data-site-header>
  <div class="container header-inner">
    <a class="logo" href="${url('home')}" aria-label="${esc(cfg.brand.name)} · ${n.home}">${logo(ctx)}</a>
    <nav class="nav" aria-label="${c.lang === 'es' ? 'Principal' : 'Main'}">
      <ul class="nav-list">
        <li><a class="nav-link${page === 'pack' ? ' is-current' : ''}" href="${url('pack')}">${n.pack}</a></li>
        <li class="has-drop">
          <button class="nav-link" type="button" aria-expanded="false" aria-controls="drop-res" data-drop>${n.residences}${icon('chevron', 'chev')}</button>
          <div class="dropdown" id="drop-res">${resItems}</div>
        </li>
        <li><a class="nav-link" href="${url('home', '#como-funciona')}">${n.how}</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      <a class="lang-link" href="${ROUTES[page][other]}" hreflang="${other}" lang="${other}" aria-label="${c.ui.langSwitchLabel}">${c.ui.langSwitch}</a>
      <a class="file-link" href="${cfg.platformUrl}" rel="noopener">${icon('lock')}<span>${n.file}</span></a>
      <a class="btn btn-accent btn-sm header-cta" href="${url('start')}">${n.start}</a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${n.menu}" data-label-open="${n.menu}" data-label-close="${n.close}" data-burger><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" data-mobile-menu hidden>
  <div class="container">
    <nav class="mobile-links" aria-label="${c.lang === 'es' ? 'Menú' : 'Menu'}">${mobileLinks}</nav>
    <div class="mobile-foot">
      <a class="btn btn-accent btn-lg btn-block" href="${url('start')}">${n.start}${icon('arrow')}</a>
      <a class="lang-link" href="${ROUTES[page][other]}" hreflang="${other}" lang="${other}">${c.ui.langSwitchLabel}</a>
    </div>
  </div>
</div>`;
}

function footer(ctx) {
  const { c, cfg, url } = ctx;
  const f = c.ui.footer;
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="logo logo-light" href="${url('home')}">${logo(ctx)}</a>
        <p>${f.blurb}</p>
        <div class="socials">
          <a href="${cfg.social.instagram}" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
          <a href="${cfg.social.tiktok}" rel="noopener" aria-label="TikTok">${icon('tiktok')}</a>
          <a href="${waLink(ctx, c.ui.whatsappMsg)}" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
        </div>
      </div>
      <div class="footer-col">
        <p class="footer-h">${f.services}</p>
        <ul>
          <li><a href="${url('pack')}">${c.services.pack.name}</a></li>
          ${RESIDENCES.map((k) => `<li><a href="${url(k)}">${c.services[k].name}</a></li>`).join('')}
        </ul>
      </div>
      <div class="footer-col">
        <p class="footer-h">${f.company}</p>
        <ul>
          <li><a href="${waLink(ctx, c.ui.whatsappMsg)}" rel="noopener">${cfg.contact.whatsappDisplay}</a></li>
          <li><a href="mailto:${cfg.contact.email}">${cfg.contact.email}</a></li>
          <li>${cfg.contact.city}</li>
          <li><a href="${cfg.platformUrl}" rel="noopener">${c.ui.nav.file}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <p class="footer-h">${f.legal}</p>
        <ul>
          <li><a href="${url('legalNotice')}">${f.legalNotice}</a></li>
          <li><a href="${url('privacy')}">${f.privacy}</a></li>
          <li><a href="${url('cookies')}">${f.cookies}</a></li>
          <li><button type="button" class="linklike" data-cookie-settings>${f.cookieSettings}</button></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${year} ${esc(cfg.brand.name)}. ${f.rights}</p>
      <p class="footer-disclaimer">${f.disclaimer}</p>
    </div>
  </div>
</footer>`;
}

function waFab(ctx) {
  return `<a class="wa-fab" href="${waLink(ctx, ctx.c.ui.whatsappMsg)}" target="_blank" rel="noopener" aria-label="${ctx.c.ui.whatsapp}">${icon('whatsapp')}<span class="wa-tip">${ctx.c.ui.whatsapp}</span></a>`;
}

function cookieBanner(ctx) {
  const k = ctx.c.ui.cookies;
  return `<div class="cookie" data-cookie role="dialog" aria-modal="false" aria-labelledby="cookie-title" hidden>
  <div class="cookie-main">
    <p class="cookie-title" id="cookie-title">${k.title}</p>
    <p class="cookie-text">${k.text} <a href="${ctx.url('cookies')}">${k.more}</a></p>
    <div class="cookie-prefs" data-cookie-prefs hidden>
      <label class="switch-row"><span><strong>${k.necessary}</strong><small>${k.necessaryText}</small></span><input type="checkbox" checked disabled><span class="switch" aria-hidden="true"></span></label>
      <label class="switch-row"><span><strong>${k.analytics}</strong><small>${k.analyticsText}</small></span><input type="checkbox" data-cookie-analytics><span class="switch" aria-hidden="true"></span></label>
    </div>
  </div>
  <div class="cookie-actions">
    <button class="btn btn-ghost btn-sm" type="button" data-cookie-configure>${k.configure}</button>
    <button class="btn btn-ghost btn-sm" type="button" data-cookie-save hidden>${k.save}</button>
    <button class="btn btn-ghost btn-sm" type="button" data-cookie-reject>${k.reject}</button>
    <button class="btn btn-dark btn-sm" type="button" data-cookie-accept>${k.accept}</button>
  </div>
</div>`;
}

/* ───────────────────────── Componentes ───────────────────────── */
function sectionHead(ctx, { eb, title, lead, center = false, light = false }) {
  return `<div class="section-head${center ? ' center' : ''}" data-reveal>
    ${eb ? eyebrow(eb, light ? 'eyebrow-light' : '') : ''}
    <h2 class="display-l">${rich(ctx.t(title))}</h2>
    ${lead ? `<p class="lead">${ctx.t(lead)}</p>` : ''}
  </div>`;
}

// La FAQ admite dos formatos: array plano de {q,a} o array de grupos {label, items:[{q,a}]}.
const isGroupedFaq = (items) => Array.isArray(items) && items.length > 0 && Array.isArray(items[0].items);

// ns: '' en FAQ plana (ids faq-0, faq-b-0) o '<g>-' en agrupada (ids faq-0-1, faq-b-0-1).
function faqAccordion(ctx, items, ns = '') {
  return `<div class="accordion" data-reveal>
      ${items
        .map(
          (it, i) => `<div class="acc-item">
        <h3><button class="acc-btn" type="button" aria-expanded="false" aria-controls="faq-${ns}${i}" id="faq-b-${ns}${i}">${ctx.t(it.q)}<span class="acc-plus" aria-hidden="true"></span></button></h3>
        <div class="acc-panel" id="faq-${ns}${i}" role="region" aria-labelledby="faq-b-${ns}${i}"><div><p>${ctx.t(it.a)}</p></div></div>
      </div>`
        )
        .join('')}
    </div>`;
}

function faqBlock(ctx, items, { title } = {}) {
  const inner = isGroupedFaq(items)
    ? `<div class="faq-groups">
    ${items
      .map((grp, g) => `<h3 class="faq-group-label" data-reveal>${ctx.t(grp.label)}</h3>
    ${faqAccordion(ctx, grp.items, `${g}-`)}`)
      .join('\n    ')}
    </div>`
    : faqAccordion(ctx, items);
  return `<section class="section faq" aria-labelledby="faq-title">
  <div class="container narrow">
    <div class="section-head center" data-reveal><h2 class="display-l" id="faq-title">${title || ctx.c.ui.faqTitle}</h2></div>
    ${inner}
  </div>
</section>`;
}

function faqSchema(ctx, items) {
  const flat = isGroupedFaq(items) ? items.flatMap((grp) => grp.items) : items;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: flat.map((it) => ({ '@type': 'Question', name: ctx.t(it.q), acceptedAnswer: { '@type': 'Answer', text: ctx.t(it.a) } })),
  };
}

function serviceSchema(ctx, name, price, page, description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'ProfessionalService', name: ctx.cfg.brand.name },
    areaServed: 'ES',
    url: ctx.cfg.siteUrl + ROUTES[page][ctx.lang],
    offers: { '@type': 'Offer', price: String(price), priceCurrency: 'EUR' },
  };
}

function statement(ctx, line1, line2, imgKey) {
  return `<section class="statement${imgKey ? ' has-img' : ''}">
  ${imgKey ? `<div class="statement-bg" aria-hidden="true">${img(ctx, imgKey, '', { sizes: '100vw' })}</div>` : ''}
  <div class="container">
    <p class="statement-text"><span data-reveal>${line1}</span> <span class="accent-text" data-reveal style="--d:.15s">${line2}</span></p>
  </div>
</section>`;
}

function phoneMockup(ctx) {
  const L = ctx.lang === 'es'
    ? { hi: 'Hola, Camila', file: 'Expediente', service: 'Familiar de ciudadano UE', status: 'En tramitación', steps: ['Documentación revisada', 'Representación firmada', 'Solicitud presentada', 'Resolución', 'Huellas y TIE'], when: ['2 sep', '3 sep', '5 sep', 'En curso', 'Pendiente'], toast: 'Solicitud presentada ante Extranjería', now: 'ahora', manager: 'Tu gestora: Lucía', msg: 'Todo en orden. Te avisamos en cuanto haya resolución.' }
    : { hi: 'Hi, Camila', file: 'Case', service: 'Family of an EU citizen', status: 'In progress', steps: ['Documents reviewed', 'Representation signed', 'Application filed', 'Decision', 'Fingerprints & TIE'], when: ['2 Sep', '3 Sep', '5 Sep', 'In progress', 'Pending'], toast: 'Application filed with the Immigration Office', now: 'now', manager: 'Your case manager: Lucía', msg: 'All in order. We’ll let you know as soon as there’s a decision.' };
  const states = ['done', 'done', 'done', 'active', 'todo'];
  return `<div class="phone-wrap" aria-hidden="true">
  <div class="phone">
    <div class="phone-notch"></div>
    <div class="phone-screen">
      <div class="ph-status"><span>9:41</span><span class="ph-dots"><i></i><i></i><i></i></span></div>
      <div class="ph-top"><span class="ph-brand">${logo(ctx)}</span><span class="ph-avatar">C</span></div>
      <p class="ph-hi">${L.hi}</p>
      <div class="ph-card">
        <div class="ph-card-top"><span class="ph-pill">${L.status}</span><span class="ph-num">${L.file} 28/004812</span></div>
        <p class="ph-service">${L.service}</p>
        <div class="ph-bar"><span data-bar style="--w:72%"></span></div>
      </div>
      <ol class="ph-steps">
        ${L.steps.map((s, i) => `<li class="is-${states[i]}"><span class="ph-dot">${states[i] === 'done' ? icon('check') : ''}</span><span class="ph-step">${s}</span><span class="ph-when">${L.when[i]}</span></li>`).join('')}
      </ol>
      <div class="ph-msg"><span class="ph-msg-av">L</span><div><strong>${L.manager}</strong><p>${L.msg}</p></div></div>
    </div>
  </div>
  <div class="ph-toast"><span class="ph-toast-icon">${icon('bell')}</span><div><strong>${ctx.cfg.brand.name}</strong><p>${L.toast}</p></div><small>${L.now}</small></div>
</div>`;
}

function shortForm(ctx, service) {
  const s = ctx.c.ui.shortForm;
  const id = `sf-${service}`;
  return `<form class="short-form" data-short-form data-service="${service}" novalidate>
  <div class="field"><label for="${id}-name">${s.name}</label><input id="${id}-name" name="name" autocomplete="name" required></div>
  <div class="field-row">
    <div class="field"><label for="${id}-email">${s.email}</label><input id="${id}-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field"><label for="${id}-phone">${s.phone}</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" placeholder="+52 55 1234 5678" required></div>
  </div>
  <div class="field"><label for="${id}-msg">${s.message}</label><textarea id="${id}-msg" name="message" rows="3"></textarea></div>
  <label class="check"><input type="checkbox" name="privacy" required><span class="check-box">${icon('check')}</span><span>${ctx.t(s.privacy)}</span></label>
  <button class="btn btn-accent btn-lg btn-block" type="submit" data-sending="${s.sending}">${s.submit}${icon('arrow')}</button>
  <p class="form-status" role="status" aria-live="polite" data-ok="${esc(s.ok)}" data-error="${esc(s.error)}"></p>
</form>`;
}

function finalCta(ctx, { title, lead, cta, href, imgKey, alt }) {
  return `<section class="final-cta">
  <div class="final-bg">${img(ctx, imgKey, alt, { sizes: '100vw' })}</div>
  <div class="container final-inner">
    <h2 class="display-xxl" data-reveal>${rich(ctx.t(title))}</h2>
    ${lead ? `<p class="lead lead-light" data-reveal style="--d:.1s">${ctx.t(lead)}</p>` : ''}
    <a class="btn btn-accent btn-xl" href="${href}" data-reveal style="--d:.2s">${cta}${icon('arrow')}</a>
  </div>
</section>`;
}

/* ───────────────────────── HOME ───────────────────────── */
function home(ctx) {
  const { c, cfg, t, url, money } = ctx;
  const h = c.home;

  const hero = `<section class="hero hero-full">
  <div class="hero-media">${img(ctx, 'homeHero', h.hero.alt, { eager: true })}</div>
  <div class="container hero-inner">
    ${eyebrow(h.hero.eyebrow, 'eyebrow-light hero-in')}
    <h1 class="display-xxl hero-in" style="--d:.08s">${rich(h.hero.title)}</h1>
    <p class="lead lead-light hero-in" style="--d:.16s">${h.hero.lead}</p>
    <div class="btn-row hero-in" style="--d:.24s">
      <a class="btn btn-accent btn-xl" href="${url('start')}">${h.hero.cta}${icon('arrow')}</a>
      <a class="btn btn-glass btn-xl" href="#servicios">${h.hero.cta2}</a>
    </div>
  </div>
  <a class="scroll-cue" href="#servicios" aria-label="${h.hero.cta2}"><span></span></a>
</section>`;

  const cards = RESIDENCES.map((k, i) => {
    const imgKey = { students: 'cardStudents', spanish: 'cardSpanish', eu: 'cardEu' }[k];
    return `<a class="res-card" href="${url(k)}" data-reveal style="--d:${i * 0.1}s">
      <div class="res-media">${img(ctx, imgKey, h.residences.alts[k], { sizes: '(min-width: 1000px) 33vw, 90vw', widths: [480, 800, 1200] })}</div>
      <div class="res-body">
        <span class="pill pill-glass">${icon(RES_ICON[k])}${money(cfg.prices.residence)}</span>
        <h3 class="res-title">${c.services[k].name}</h3>
        <p>${c.services[k].line}</p>
        <p class="res-free">${icon('calendar')}${c.ui.freeCall}</p>
        <span class="res-more">${c.ui.seeMore}${icon('arrow')}</span>
      </div>
    </a>`;
  }).join('');

  const residences = `<section class="section" id="residencias">
  <div class="container">
    ${sectionHead(ctx, { eb: h.residences.eyebrow, title: h.residences.title, lead: h.residences.lead })}
    <div class="res-grid">${cards}</div>
  </div>
</section>`;

  const how = `<section class="section section-tint" id="como-funciona">
  <div class="container">
    ${sectionHead(ctx, { eb: h.how.eyebrow, title: h.how.title, lead: h.how.lead })}
    <ol class="steps">
      ${h.how.steps.map((s, i) => `<li class="step" data-reveal style="--d:${i * 0.1}s"><span class="step-num">${String(i + 1).padStart(2, '0')}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}
    </ol>
  </div>
</section>`;

  const pack = `<section class="pack-hero" id="servicios">
  <div class="pack-hero-media">${img(ctx, 'homePack', h.pack.alt, { sizes: '(min-width: 1000px) 50vw, 100vw' })}</div>
  <div class="pack-hero-body">
    ${eyebrow(h.pack.eyebrow, 'eyebrow-light')}
    <h2 class="display-l" data-reveal>${rich(h.pack.title)}</h2>
    <p class="price-xl" data-reveal><span>${money(cfg.prices.packSolo)}</span></p>
    <p class="lead lead-light" data-reveal>${t(h.pack.lead)}</p>
    <p class="price-footnote" data-reveal>${t(c.ui.groupExtraNote)}</p>
    <p class="free-call" data-reveal>${icon('calendar')}${c.ui.freeCall}</p>
    <ul class="icon-grid" data-reveal>
      ${h.pack.items.map((it) => `<li>${icon(it.icon)}<span>${it.label}</span></li>`).join('')}
    </ul>
    <p class="footnote" data-reveal>${h.pack.note}</p>
    <a class="btn btn-accent btn-lg" href="${url('pack')}" data-reveal>${h.pack.cta}${icon('arrow')}</a>
  </div>
</section>`;

  const stats = `<section class="section">
  <div class="container">
    ${sectionHead(ctx, { eb: h.stats.eyebrow, title: h.stats.title, center: true })}
    <div class="stats">
      ${h.stats.items
        .map((s, i) => {
          const v = parseInt(t(String(s.value)), 10) || 0;
          return `<div class="stat" data-reveal style="--d:${i * 0.08}s">
          <p class="stat-num"><span data-count="${v}" data-from="${s.from ?? 0}" data-prefix="${s.prefix || ''}" data-suffix="${esc(s.suffix || '')}">${s.prefix || ''}${v}${s.suffix || ''}</span></p>
          <p class="stat-label">${s.label}</p>
          ${s.text ? `<p class="stat-text">${s.text}</p>` : ''}
        </div>`;
        })
        .join('')}
    </div>
  </div>
</section>`;

  const platform = `<section class="section section-dark platform">
  <div class="container platform-grid">
    <div class="platform-copy">
      ${eyebrow(h.platform.eyebrow, 'eyebrow-light')}
      <h2 class="display-l" data-reveal>${rich(h.platform.title)}</h2>
      <p class="lead lead-light" data-reveal>${h.platform.lead}</p>
      <ul class="points" data-reveal>${h.platform.points.map((p) => `<li>${icon(p.icon)}<span>${p.text}</span></li>`).join('')}</ul>
      <a class="btn btn-glass btn-lg" href="${cfg.platformUrl}" rel="noopener" data-reveal>${h.platform.cta}${icon('arrow-up-right')}</a>
    </div>
    <div class="platform-visual" data-reveal>${phoneMockup(ctx)}</div>
  </div>
</section>`;

  const testimonials = cfg.showPlaceholderTestimonials
    ? (() => {
        const cards = h.testimonials.items
          .map(
            (it) => `<figure class="testi">
      <blockquote>“${it.quote}”</blockquote>
      <figcaption><strong>${it.name}</strong><small>${it.country} · ${it.service}</small></figcaption>
    </figure>`
          )
          .join('');
        return `<section class="section testimonials">
  <div class="container">
    ${sectionHead(ctx, { eb: h.testimonials.eyebrow, title: h.testimonials.title })}
  </div>
  <div class="marquee" data-reveal>
    <div class="marquee-track">${cards}<div class="marquee-dup" aria-hidden="true">${cards}</div></div>
  </div>
</section>`;
      })()
    : '';

  const body = [
    hero,
    statement(ctx, h.statement.line1, h.statement.line2),
    pack,
    residences,
    how,
    stats,
    platform,
    testimonials,
    faqBlock(ctx, h.faq),
    finalCta(ctx, { title: h.final.title, lead: h.final.lead, cta: h.final.cta, href: url('start'), imgKey: 'finalCta', alt: h.final.alt }),
  ].join('\n');

  return layout(ctx, { page: 'home', seo: h.seo, body, schema: [faqSchema(ctx, h.faq)] });
}

/* ───────────────────────── DETALLE RESIDENCIA ───────────────────────── */
function detail(ctx, key) {
  const { c, cfg, t, url, money } = ctx;
  const d = c.detail;
  const p = c[key];
  const heroImg = { students: 'studentsHero', spanish: 'spanishHero', eu: 'euHero' }[key];
  const startHref = `${url('start')}?s=${key}`;
  const m = cfg.means[key];

  const hero = `<section class="hero hero-full hero-detail">
  <div class="hero-media">${img(ctx, heroImg, p.hero.alt, { eager: true })}</div>
  <div class="container hero-inner">
    <span class="pill pill-glass hero-in">${icon(RES_ICON[key])}${p.hero.eyebrow}</span>
    <h1 class="display-xxl hero-in" style="--d:.08s">${rich(p.hero.title)}</h1>
    <p class="lead lead-light hero-in" style="--d:.16s">${p.hero.lead}</p>
    <div class="hero-price hero-in" style="--d:.24s">
      <p class="price-xl"><span>${money(cfg.prices.residence)}</span></p>
      <p class="price-note">${d.priceNote}</p>
    </div>
    <p class="free-call hero-in" style="--d:.28s">${icon('calendar')}${c.ui.freeCall}</p>
    <div class="btn-row hero-in" style="--d:.3s"><a class="btn btn-accent btn-xl" href="${startHref}">${d.cta}${icon('arrow')}</a></div>
  </div>
</section>`;

  const urgent = p.urgent
    ? `<section class="urgent" aria-label="${p.urgent.title}">
  <div class="container urgent-inner" data-reveal>
    <span class="urgent-icon">${icon('clock')}</span>
    <p><strong>${p.urgent.title}</strong> <span>${p.urgent.text}</span></p>
    <a class="btn btn-dark btn-md" href="${startHref}">${p.urgent.cta}${icon('arrow')}</a>
  </div>
</section>`
    : '';

  const forYou = `<section class="section">
  <div class="container">
    ${sectionHead(ctx, { title: d.forYouTitle })}
    <div class="card-grid cols-${p.forYou.length}">
      ${p.forYou.map((f, i) => `<article class="card card-hover" data-reveal style="--d:${i * 0.08}s"><span class="icon-chip">${icon(f.icon)}</span><h3>${f.title}</h3><p>${f.text}</p></article>`).join('')}
    </div>
  </div>
</section>`;

  const includes = `<section class="section section-dark">
  <div class="container split">
    <div>${sectionHead(ctx, { title: d.includesTitle, lead: d.includesLead, light: true })}
      <div class="price-tag" data-reveal><span>${money(cfg.prices.residence)}</span><small>${d.priceNote}</small></div>
    </div>
    <ul class="checklist">
      ${d.includes.map((it, i) => `<li data-reveal style="--d:${i * 0.05}s"><span class="check-dot">${icon('check')}</span>${it}</li>`).join('')}
    </ul>
  </div>
</section>`;

  const reqs = `<section class="section">
  <div class="container">
    ${sectionHead(ctx, { title: d.requirementsTitle, lead: d.requirementsLead })}
    <div class="card-grid cols-3">
      ${p.requirements.map((r, i) => `<article class="card card-lg card-hover" data-reveal style="--d:${(i % 3) * 0.08}s"><span class="icon-chip icon-chip-lg">${icon(r.icon)}</span><h3>${r.title}</h3><p>${r.text}</p></article>`).join('')}
    </div>
  </div>
</section>`;

  const docs = `<section class="section section-tint">
  <div class="container split">
    <div>${sectionHead(ctx, { title: d.docsTitle, lead: d.docsLead })}<p class="muted small" data-reveal>${icon('sparkle', 'inline-icon')} ${d.docsHint}</p></div>
    <div class="docs" data-docs="${key}" data-reveal>
      ${p.docs
        .map(
          (g, gi) => `<details class="doc-group"${gi === 0 ? ' open' : ''}>
        <summary><span class="doc-title">${g.title}</span><span class="doc-count" data-doc-count>0/${g.items.length}</span><span class="doc-chev">${icon('chevron')}</span></summary>
        <ul>${g.items.map((it, ii) => `<li><label class="check"><input type="checkbox" data-doc="${gi}-${ii}"><span class="check-box">${icon('check')}</span><span>${it}</span></label></li>`).join('')}</ul>
      </details>`
        )
        .join('')}
    </div>
  </div>
</section>`;

  const means = `<section class="section">
  <div class="container">
    ${sectionHead(ctx, { title: d.meansTitle })}
    <div class="means" data-reveal>
      <div class="means-info">
        <p class="means-big">${t(p.means.highlight)}</p>
        <p class="means-label">${p.means.highlightLabel}</p>
        <p class="means-text">${p.means.text}</p>
        <p class="means-iprem"><span>${d.meansIpremLabel}</span><strong>${money(cfg.iprem)}</strong></p>
      </div>
      <div class="calc" data-calc data-first="${m.first}" data-second="${m.second}" data-others="${m.others}">
        <p class="calc-title">${icon('coins')}${d.calcTitle}</p>
        <p class="calc-label" id="calc-l-${key}">${d.calcLabel}<small>${d.calcHint}</small></p>
        <div class="stepper stepper-lg" role="group" aria-labelledby="calc-l-${key}">
          <button type="button" class="round-btn" data-step="-1" aria-label="−1">${icon('minus')}</button>
          <output data-calc-n aria-live="polite">1</output>
          <button type="button" class="round-btn" data-step="1" aria-label="+1">${icon('plus')}</button>
        </div>
        <p class="calc-result"><span data-calc-out>${money(cfg.iprem * m.first / 100)}</span><small>${d.calcResult}</small></p>
        <p class="calc-year" data-calc-year data-tpl="${esc(d.calcYear)}"></p>
        <p class="calc-disc">${d.calcDisclaimer}</p>
      </div>
    </div>
  </div>
</section>`;

  const process = `<section class="section section-tint">
  <div class="container narrow">
    ${sectionHead(ctx, { title: d.processTitle, center: true })}
    <ol class="timeline" data-timeline>
      <span class="timeline-line" aria-hidden="true"><span></span></span>
      ${p.process.map((s, i) => `<li class="tl-item" data-reveal><span class="tl-dot">${String(i + 1).padStart(2, '0')}</span><div class="tl-body"><h3>${s.title}</h3><p>${s.text}</p></div></li>`).join('')}
    </ol>
  </div>
</section>`;

  const benefits = `<section class="section">
  <div class="container">
    ${sectionHead(ctx, { title: d.benefitsTitle, center: true })}
    <div class="benefits">
      ${p.benefits.map((b, i) => `<div class="benefit" data-reveal style="--d:${i * 0.1}s"><span class="benefit-icon">${icon(b.icon)}</span><h3>${b.title}</h3><p>${b.text}</p></div>`).join('')}
    </div>
  </div>
</section>`;

  const upsell = `<section class="section section-pad-sm">
  <div class="container">
    <a class="upsell" href="${url('pack')}" data-reveal>
      <div class="upsell-media">${img(ctx, 'packHero', '', { sizes: '(min-width: 900px) 40vw, 100vw', widths: [480, 800, 1200] })}</div>
      <div class="upsell-body">
        ${eyebrow(d.upsell.eyebrow, 'eyebrow-light')}
        <h2 class="display-m">${t(d.upsell.title)}</h2>
        <p>${d.upsell.text}</p>
        <span class="btn btn-accent btn-md">${d.upsell.cta}${icon('arrow')}</span>
      </div>
    </a>
  </div>
</section>`;

  const final = `<section class="section section-dark final-form" id="contacto">
  <div class="container split">
    <div>
      <h2 class="display-l" data-reveal>${rich(d.final.title)}</h2>
      <p class="lead lead-light" data-reveal>${d.final.lead}</p>
      <div class="btn-row" data-reveal>
        <a class="btn btn-glass btn-lg" href="${startHref}">${d.final.cta}${icon('arrow')}</a>
        <a class="btn btn-glass btn-lg" href="${waLink(ctx, c.ui.whatsappMsg + ' (' + c.services[key].name + ')')}" target="_blank" rel="noopener">${icon('whatsapp')}WhatsApp</a>
      </div>
    </div>
    <div class="form-card" data-reveal>${shortForm(ctx, key)}</div>
  </div>
</section>`;

  const body = [hero, urgent, forYou, includes, reqs, docs, means, process, benefits, faqBlock(ctx, p.faq), upsell, final].join('\n');
  return layout(ctx, {
    page: key,
    seo: p.seo,
    body,
    schema: [serviceSchema(ctx, c.services[key].name, cfg.prices.residence, key, t(p.seo.description)), faqSchema(ctx, p.faq)],
  });
}

/* ───────────────────────── PACK ───────────────────────── */
function pack(ctx) {
  const { c, cfg, t, url, money } = ctx;
  const p = c.pack;
  const startHref = `${url('start')}?s=pack`;

  const hero = `<section class="hero hero-full">
  <div class="hero-media">${img(ctx, 'packHero', p.hero.alt, { eager: true })}</div>
  <div class="container hero-inner">
    <span class="pill pill-glass hero-in">${icon('plane')}${p.hero.eyebrow}</span>
    <h1 class="display-xxl hero-in" style="--d:.08s">${rich(p.hero.title)}</h1>
    <div class="hero-price hero-in" style="--d:.16s">
      <p class="price-xl"><span>${money(cfg.prices.packSolo)}</span></p>
      <p class="price-note">${c.ui.perPerson}</p>
      <p class="price-note">${t(c.ui.groupNote)}</p>
      <p class="price-footnote">${t(c.ui.groupExtraNote)}</p>
    </div>
    <p class="free-call hero-in" style="--d:.2s">${icon('calendar')}${c.ui.freeCall}</p>
    <div class="btn-row hero-in" style="--d:.24s"><a class="btn btn-accent btn-xl" href="${startHref}">${p.hero.cta}${icon('arrow')}</a></div>
  </div>
</section>`;

  const steps = `<section class="section">
  <div class="container">
    ${sectionHead(ctx, { title: p.timelineTitle, center: true })}
    <ol class="arrival">
      ${p.steps
        .map(
          (s, i) => `<li class="arrival-step">
        <div class="arrival-body" data-reveal>
          <span class="arrival-num">${String(i + 1).padStart(2, '0')}</span>
          <span class="icon-chip icon-chip-lg">${icon(s.icon)}</span>
          <h3 class="display-m">${s.title}</h3>
          <p class="lead">${s.text}</p>
        </div>
        <div class="arrival-media" data-reveal style="--d:.1s">${s.img ? img(ctx, s.img, s.alt, { sizes: '(min-width: 900px) 50vw, 100vw', widths: [480, 800, 1200, 1600] }) : `<div class="arrival-phone">${phoneMockup(ctx)}</div>`}</div>
      </li>`
        )
        .join('')}
    </ol>
    <p class="footnote footnote-center" data-reveal>${p.stepsNote}</p>
  </div>
</section>`;

  const pricing = `<section class="section section-tint" id="precio">
  <div class="container">
    ${sectionHead(ctx, { title: p.pricing.title, center: true })}
    <div class="pricing" data-reveal>
      <div class="pricing-head">
        <p class="pricing-name">${p.pricing.name}</p>
        <p class="pricing-price"><span>${money(cfg.prices.packSolo)}</span><small>${c.ui.perPerson}</small></p>
        <p class="muted small">${t(c.ui.groupNote)}</p>
        <p class="muted small">${t(c.ui.groupExtraNote)}</p>
      </div>
      <ul class="pricing-list">${p.pricing.items.map((it) => `<li><span class="check-dot">${icon('check')}</span>${it}</li>`).join('')}</ul>
      <a class="btn btn-accent btn-lg btn-block" href="${startHref}">${p.pricing.cta}${icon('arrow')}</a>
      <p class="pricing-note">${p.pricing.note}</p>
    </div>
  </div>
</section>`;

  const combo = `<section class="section section-pad-sm">
  <div class="container">
    <div class="combo" data-reveal>
      <div>
        ${eyebrow(p.combo.eyebrow, 'eyebrow-light')}
        <h2 class="display-m">${p.combo.title}</h2>
        <p>${t(p.combo.text)}</p>
      </div>
      <div class="combo-price">
        <p class="combo-was"><s>${money(cfg.prices.residence + cfg.prices.packSolo)}</s></p>
        <p class="price-xl"><span>${money(cfg.prices.combo)}</span></p>
        <span class="pill pill-accent">${t(p.combo.save)}</span>
        <a class="btn btn-accent btn-lg" href="${url('start')}?s=combo">${p.combo.cta}${icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>`;

  const body = [
    hero,
    statement(ctx, p.statement.line1, p.statement.line2),
    steps,
    pricing,
    combo,
    faqBlock(ctx, p.faq),
    finalCta(ctx, { title: p.final.title, lead: p.final.lead, cta: p.final.cta, href: startHref, imgKey: 'finalCta', alt: p.final.alt }),
  ].join('\n');
  return layout(ctx, {
    page: 'pack',
    seo: p.seo,
    body,
    schema: [serviceSchema(ctx, c.services.pack.name, cfg.prices.packSolo, 'pack', t(p.seo.description)), faqSchema(ctx, p.faq)],
  });
}

/* ───────────────────────── EMPEZAR ───────────────────────── */
function start(ctx) {
  const { c, cfg, t, url } = ctx;
  const s = c.start;
  const total = 5;
  const prefixes = ['+34', '+52', '+57', '+54', '+58', '+51', '+56', '+593', '+591', '+595', '+598', '+506', '+507', '+503', '+502', '+504', '+505', '+53', '+1', '+55', '+63', '+212', '+380', '+44', '+33', '+49', '+39'];

  const serviceNames = Object.fromEntries(s.q1.options.map((o) => [o.value, o.label]));

  const steps = `
  <fieldset class="q" data-q="1">
    <legend class="q-title"><span class="q-num">1 →</span>${s.q1.title}</legend>
    <div class="opt-grid">
      ${s.q1.options.map((o, i) => `<label class="opt"><input type="radio" name="service" value="${o.value}" required><span class="opt-key">${String.fromCharCode(65 + i)}</span>${icon(o.icon)}<span>${o.label}</span></label>`).join('')}
    </div>
  </fieldset>
  <fieldset class="q" data-q="1b" data-combo-only hidden>
    <legend class="q-title"><span class="q-num">2 →</span>${s.q1b.title}</legend>
    <div class="opt-grid">
      ${s.q1b.options.map((o, i) => `<label class="opt"><input type="radio" name="residenceType" value="${o.value}"><span class="opt-key">${String.fromCharCode(65 + i)}</span>${icon(o.icon)}<span>${o.label}</span></label>`).join('')}
    </div>
  </fieldset>
  <fieldset class="q" data-q="2" hidden>
    <legend class="q-title"><span class="q-num">2 →</span>${s.q2.title}</legend>
    <div class="opt-grid opt-grid-2">
      <label class="opt"><input type="radio" name="inSpain" value="yes" required><span class="opt-key">A</span>${icon('pin')}<span>${s.q2.yes}</span></label>
      <label class="opt"><input type="radio" name="inSpain" value="no"><span class="opt-key">B</span>${icon('plane')}<span>${s.q2.no}</span></label>
    </div>
    <div class="field field-date" data-arrival hidden><label for="arrival">${s.q2.dateLabel}</label><input type="date" id="arrival" name="arrival"></div>
  </fieldset>
  <fieldset class="q" data-q="3" hidden>
    <legend class="q-title"><span class="q-num">3 →</span>${s.q3.title}</legend>
    <div class="people">
      ${[['adults', s.q3.adults, 1, 1], ['minors', s.q3.minors, 0, 0]]
        .map(
          ([n, label, val, min]) => `<div class="people-row"><span class="people-label">${icon(n === 'adults' ? 'users' : 'child')}${label}</span>
        <div class="stepper" data-stepper role="group" aria-label="${label}">
          <button type="button" class="round-btn" data-step="-1" aria-label="${s.q3.dec}">${icon('minus')}</button>
          <input type="number" name="${n}" value="${val}" min="${min}" max="12" inputmode="numeric" aria-label="${label}">
          <button type="button" class="round-btn" data-step="1" aria-label="${s.q3.inc}">${icon('plus')}</button>
        </div></div>`
        )
        .join('')}
    </div>
  </fieldset>
  <fieldset class="q" data-q="4" hidden>
    <legend class="q-title"><span class="q-num">4 →</span>${s.q4.title}</legend>
    <div class="field"><label for="f-name">${s.q4.name}</label><input id="f-name" name="name" autocomplete="name" required></div>
    <div class="field"><label for="f-email">${s.q4.email}</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
    <div class="field-row field-phone">
      <div class="field"><label for="f-prefix">${s.q4.prefix}</label><select id="f-prefix" name="prefix" autocomplete="tel-country-code">${prefixes.map((p) => `<option${p === '+34' ? ' selected' : ''}>${p}</option>`).join('')}</select></div>
      <div class="field"><label for="f-phone">${s.q4.phone}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel-national" inputmode="tel" required></div>
    </div>
    <div class="field"><label for="f-country">${s.q4.country}</label><input id="f-country" name="country" list="countries" autocomplete="country-name" placeholder="${s.q4.countryPlaceholder}" required>
      <datalist id="countries">${s.countries.map((x) => `<option value="${x}">`).join('')}</datalist></div>
  </fieldset>
  <fieldset class="q" data-q="5" hidden>
    <legend class="q-title"><span class="q-num">5 →</span>${s.q5.title}</legend>
    <p class="q-text">${s.q5.text}</p>
    <label class="check check-lg"><input type="checkbox" name="privacy" required><span class="check-box">${icon('check')}</span><span>${t(s.q5.accept)}</span></label>
    <label class="check check-lg"><input type="checkbox" name="marketing"><span class="check-box">${icon('check')}</span><span>${s.q5.marketing}</span></label>
  </fieldset>`;

  const body = `<section class="start">
  <aside class="start-aside">
    ${img(ctx, 'contact', s.aside.alt, { sizes: '(min-width: 1000px) 40vw, 1px', eager: true })}
    <div class="start-aside-inner">
      <h1 class="display-l">${rich(s.aside.title)}</h1>
      <ul>${s.aside.points.map((p) => `<li>${icon('check')}${p}</li>`).join('')}</ul>
    </div>
  </aside>
  <div class="start-main">
    <div class="progress" aria-hidden="true"><span data-progress></span></div>
    <p class="progress-label" data-progress-label data-tpl="${esc(s.progress)}" data-total="${total}">${t(s.progress, { n: 1, total })}</p>
    <form class="wizard" data-wizard novalidate
      data-required="${esc(s.required)}" data-invalid-email="${esc(s.invalidEmail)}" data-invalid-phone="${esc(s.invalidPhone)}"
      data-sending="${esc(s.sending)}" data-error="${esc(s.error)}" data-wa-tpl="${esc(s.whatsappPrefill)}"
      data-services='${esc(JSON.stringify(serviceNames))}'>
      ${steps}
      <p class="q-error" role="alert" data-q-error></p>
      <div class="wizard-nav">
        <button type="button" class="btn btn-ghost btn-lg" data-back hidden>${icon('arrow-left')}${s.back}</button>
        <button type="button" class="btn btn-dark btn-lg" data-next>${s.next}${icon('arrow')}</button>
        <button type="submit" class="btn btn-accent btn-lg" data-submit hidden>${s.submit}${icon('arrow')}</button>
        <span class="enter-hint">${s.enterHint}</span>
      </div>
    </form>
    <div class="done" data-done hidden tabindex="-1">
      <div class="done-check">${icon('check')}</div>
      <h2 class="display-xl">${s.done.title}</h2>
      <p class="lead">${s.done.text}</p>
      <div class="btn-row center">
        <a class="btn btn-wa btn-lg" data-done-wa href="${waLink(ctx)}" target="_blank" rel="noopener">${icon('whatsapp')}${s.done.whatsapp}</a>
        <a class="btn btn-ghost btn-lg" href="${url('home')}">${s.done.home}</a>
      </div>
    </div>
  </div>
</section>`;

  return layout(ctx, { page: 'start', seo: s.seo, body, header: 'solid' });
}

/* ───────────────────────── LEGAL ───────────────────────── */
function legal(ctx, key) {
  const { c, t } = ctx;
  const L = c.legal[key];
  const body = `<section class="section legal">
  <div class="container narrow">
    <h1 class="display-xl">${L.title}</h1>
    <p class="legal-note">${c.legal.note}</p>
    ${L.sections.map((s) => `<h2>${s.h}</h2>${s.p.map((p) => `<p>${t(p)}</p>`).join('')}`).join('')}
  </div>
</section>`;
  return layout(ctx, { page: key, seo: L.seo, body, header: 'solid' });
}

module.exports = { ROUTES, createCtx, home, detail, pack, start, legal, RESIDENCES };
