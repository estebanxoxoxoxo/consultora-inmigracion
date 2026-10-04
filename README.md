# Web · Residencias en España + Pack Bienvenida

Web estática, bilingüe (ES/EN), sin dependencias. Solo necesitas Node 18+.

```bash
npm run dev     # http://localhost:4321, se recompila al guardar
npm run build   # genera /dist, listo para subir
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Nombre de marca, colores, **precios**, **IPREM**, WhatsApp, email, URL de "Mi expediente", redes, fotos, endpoint del formulario, Google Analytics | `site.config.js` |
| Todos los textos en español (incluido SEO: title y description de cada página) | `content/es.js` |
| Todos los textos en inglés | `content/en.js` |
| Paleta, tipografía, espaciados | `assets/css/styles.css` (bloque `:root`) |
| Plantillas HTML de las páginas | `src/render.js` |

En los textos puedes usar `{price}`, `{pack}`, `{combo}`, `{save}`, `{iprem}`, `{brand}` y `{families}`: se rellenan solos con los valores de `site.config.js`. Si pones una palabra entre `*asteriscos*` en un titular, sale en cursiva serif.

## Antes de publicar

- [ ] `brand.name`: "Aterriza" es un nombre provisional
- [ ] `siteUrl` con tu dominio real (canonical, hreflang, sitemap)
- [ ] `contact.whatsapp`, `contact.email`, `platformUrl`, `social`
- [ ] `prices.combo` (placeholder: 649 €) e `iprem` (600 €/mes: compruébalo para el año en curso)
- [ ] `stats.families` (placeholder: 500)
- [ ] `formEndpoint`: **sin él, los formularios no guardan los datos** (p. ej. Formspree, Make o tu CRM: recibe un POST JSON)
- [ ] Testimonios: son de ejemplo y llevan la etiqueta "Ejemplo". Sustitúyelos por reales o pon `showPlaceholderTestimonials: false`
- [ ] Fotos: ahora son de Unsplash. Recomendado: fotos propias (familias latinoamericanas, Barajas, Retiro). Ponlas en `assets/img/` y usa `'/assets/img/archivo.jpg'` en `images`
- [ ] Páginas legales: son plantillas con campos `[ENTRE CORCHETES]`. Revísalas con tu asesor
- [ ] Revisa requisitos y documentación con tu equipo jurídico; la normativa de extranjería cambia

## Despliegue

Sube la carpeta `dist/` a cualquier hosting estático: Netlify, Vercel, Cloudflare Pages o GitHub Pages. Comando de build: `npm run build`; carpeta de salida: `dist`.

## Rutas

| ES | EN |
|---|---|
| `/` | `/en/` |
| `/residencia-estudios/` | `/en/student-residence/` |
| `/familiar-ciudadano-espanol/` | `/en/family-of-spanish-citizen/` |
| `/familiar-ciudadano-ue/` | `/en/family-of-eu-citizen/` |
| `/pack-bienvenida/` | `/en/welcome-pack/` |
| `/empezar/` (acepta `?s=students\|spanish\|eu\|pack\|combo`) | `/en/start/` |
| `/aviso-legal/`, `/privacidad/`, `/cookies/` | `/en/legal-notice/`, `/en/privacy/`, `/en/cookies/` |
# consultora-inmigracion
