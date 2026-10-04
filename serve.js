// Servidor local con recompilación automática. Uso: npm run dev
const http = require('http');
const fs = require('fs');
const path = require('path');
const build = require('./build');

const PORT = process.env.PORT || 4321;
const DIST = path.join(__dirname, 'dist');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };

build();

let timer;
for (const dir of ['assets', 'content', 'src']) {
  fs.watch(path.join(__dirname, dir), { recursive: true }, rebuild);
}
fs.watch(path.join(__dirname, 'site.config.js'), rebuild);
function rebuild() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    try { build(); } catch (e) { console.error(e); }
  }, 120);
}

http
  .createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(DIST, p);
    if (!file.startsWith(DIST)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) file = path.join(DIST, '404.html');
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
