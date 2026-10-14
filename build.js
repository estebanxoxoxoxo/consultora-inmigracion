// Genera el sitio estático en /dist. Uso: node build.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');

// Recarga limpia de módulos en cada build (útil con `npm run dev`)
function loadModules() {
  for (const k of Object.keys(require.cache)) {
    if (!k.includes('node_modules') && k !== __filename && !k.endsWith('serve.js')) delete require.cache[k];
  }
  return {
    cfg: require('./site.config'),
    R: require('./src/render'),
    langs: { es: require('./content/es'), en: require('./content/en') },
  };
}

function write(route, html) {
  const file = path.join(OUT, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

function build() {
  const { cfg, R, langs } = loadModules();
  fs.rmSync(OUT, { recursive: true, force: true });
  copyDir(path.join(ROOT, 'assets'), path.join(OUT, 'assets'));

  let count = 0;
  for (const [lang, content] of Object.entries(langs)) {
    const ctx = R.createCtx(cfg, content);
    const pages = {
      home: () => R.home(ctx),
      students: () => R.detail(ctx, 'students'),
      spanish: () => R.detail(ctx, 'spanish'),
      eu: () => R.detail(ctx, 'eu'),
      pack: () => R.pack(ctx),
      start: () => R.start(ctx),
      legalNotice: () => R.legal(ctx, 'legalNotice'),
      privacy: () => R.legal(ctx, 'privacy'),
      cookies: () => R.legal(ctx, 'cookies'),
    };
    for (const [key, fn] of Object.entries(pages)) {
      write(R.ROUTES[key][lang], fn());
      count++;
    }
  }

  // 404, sitemap, robots
  fs.writeFileSync(path.join(OUT, '404.html'), `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/"><title>404</title><a href="/">Inicio</a>`);
  const urls = Object.keys(R.ROUTES)
    .map((k) => {
      const alts = ['es', 'en'].map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${cfg.siteUrl}${R.ROUTES[k][l]}"/>`).join('');
      return ['es', 'en'].map((l) => `<url><loc>${cfg.siteUrl}${R.ROUTES[k][l]}</loc>${alts}</url>`).join('\n');
    })
    .join('\n');
  fs.writeFileSync(
    path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
  );
  fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);

  console.log(`✓ ${count} páginas generadas en /dist`);
}

module.exports = build;
if (require.main === module) build();
