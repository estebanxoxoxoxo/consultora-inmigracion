(() => {
  'use strict';
  const SITE = window.SITE || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
  };
  const money = (n) => new Intl.NumberFormat(SITE.locale || 'es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0, useGrouping: 'always' }).format(n).replace(/ /g, ' ');

  /* ───────── Header ───────── */
  const header = $('[data-site-header]');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    const menuOpen = header.classList.contains('menu-open') || $('.has-drop.is-open');
    header.classList.toggle('is-hidden', !menuOpen && y > 640 && y > lastY + 4);
    if (y < lastY - 4 || y < 640) header.classList.remove('is-hidden');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Desplegable Residencias */
  const drop = $('.has-drop');
  if (drop) {
    const btn = $('[data-drop]', drop);
    const set = (open) => { drop.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', () => set(!drop.classList.contains('is-open')));
    const hover = window.matchMedia('(hover: hover)');
    let t;
    drop.addEventListener('mouseenter', () => { if (hover.matches) { clearTimeout(t); set(true); } });
    drop.addEventListener('mouseleave', () => { if (hover.matches) t = setTimeout(() => set(false), 160); });
    document.addEventListener('click', (e) => { if (!drop.contains(e.target)) set(false); });
    drop.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); btn.focus(); } });
    drop.addEventListener('focusout', (e) => { if (!drop.contains(e.relatedTarget)) set(false); });
  }

  /* Menú móvil */
  const burger = $('[data-burger]');
  const menu = $('[data-mobile-menu]');
  if (burger && menu) {
    const set = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? burger.dataset.labelClose : burger.dataset.labelOpen);
      menu.hidden = !open;
      header.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) header.classList.remove('is-hidden');
    };
    burger.addEventListener('click', () => set(menu.hidden));
    $$('a', menu).forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); burger.focus(); } });
  }

  /* ───────── Aparición al hacer scroll ───────── */
  const reveal = $$('[data-reveal], .final-cta, .platform-visual, .arrival-media');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveal.forEach((el) => io.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add('is-in'));
  }

  /* ───────── Contadores ───────── */
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    const to = +el.dataset.count;
    const from = +el.dataset.from || 0;
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    if (reduced) { el.textContent = pre + to.toLocaleString(SITE.locale) + suf; return; }
    const dur = 1800;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + Math.round(from + (to - from) * e).toLocaleString(SITE.locale) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length && 'IntersectionObserver' in window) {
    counters.forEach((el) => { el.textContent = (el.dataset.prefix || '') + (+el.dataset.from || 0) + (el.dataset.suffix || ''); });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => io.observe(el));
  }

  /* ───────── Acordeón ───────── */
  $$('.acc-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.acc-item');
      const open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ───────── Carrusel ───────── */
  const car = $('[data-carousel]');
  if (car) {
    const step = () => (car.querySelector('.testi')?.offsetWidth || 400) + 20;
    $('[data-carousel-prev]')?.addEventListener('click', () => car.scrollBy({ left: -step(), behavior: 'smooth' }));
    $('[data-carousel-next]')?.addEventListener('click', () => car.scrollBy({ left: step(), behavior: 'smooth' }));
    car.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') car.scrollBy({ left: step(), behavior: 'smooth' });
      if (e.key === 'ArrowLeft') car.scrollBy({ left: -step(), behavior: 'smooth' });
    });
  }

  /* ───────── Timeline (progreso con el scroll) ───────── */
  const tl = $('[data-timeline]');
  if (tl) {
    const line = $('.timeline-line', tl);
    const items = $$('.tl-item', tl);
    const update = () => {
      const r = tl.getBoundingClientRect();
      const mid = window.innerHeight * 0.6;
      const p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
      line.style.setProperty('--p', p.toFixed(3));
      items.forEach((it) => {
        const ir = it.getBoundingClientRect();
        it.classList.toggle('is-passed', ir.top + ir.height / 2 < mid);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ───────── Checklist de documentación ───────── */
  $$('[data-docs]').forEach((wrap) => {
    const key = 'docs:' + SITE.lang + ':' + wrap.dataset.docs;
    let saved = {};
    try { saved = JSON.parse(store.get(key) || '{}'); } catch { saved = {}; }
    const boxes = $$('input[data-doc]', wrap);
    const refresh = () => {
      $$('.doc-group', wrap).forEach((g) => {
        const all = $$('input', g);
        const done = all.filter((i) => i.checked).length;
        const badge = $('[data-doc-count]', g);
        badge.textContent = `${done}/${all.length}`;
        badge.classList.toggle('is-complete', done === all.length);
      });
    };
    boxes.forEach((b) => {
      b.checked = !!saved[b.dataset.doc];
      b.addEventListener('change', () => {
        saved[b.dataset.doc] = b.checked;
        store.set(key, JSON.stringify(saved));
        refresh();
      });
    });
    refresh();
  });

  /* ───────── Calculadora de medios ───────── */
  $$('[data-calc]').forEach((calc) => {
    const first = +calc.dataset.first, second = +calc.dataset.second, others = +calc.dataset.others;
    const nEl = $('[data-calc-n]', calc), out = $('[data-calc-out]', calc), year = $('[data-calc-year]', calc);
    let n = 1;
    const render = () => {
      const pct = first + (n >= 2 ? second : 0) + Math.max(0, n - 2) * others;
      const monthly = (SITE.iprem * pct) / 100;
      nEl.textContent = n;
      out.textContent = money(monthly);
      year.textContent = year.dataset.tpl.replace('{amount}', money(monthly * 12));
      $('[data-step="-1"]', calc).disabled = n <= 1;
    };
    $$('[data-step]', calc).forEach((b) => b.addEventListener('click', () => {
      n = Math.max(1, Math.min(12, n + +b.dataset.step));
      render();
      if (!reduced) out.animate([{ opacity: 0.4, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'cubic-bezier(.2,.7,.2,1)' });
    }));
    render();
  });

  /* ───────── Envío de formularios ───────── */
  async function send(payload) {
    if (!SITE.formEndpoint) return true; // sin endpoint: solo se muestra la confirmación
    const res = await fetch(SITE.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, lang: SITE.lang, page: location.pathname, sentAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return true;
  }
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const isPhone = (v) => v.replace(/[^\d]/g, '').length >= 6;

  $$('[data-short-form]').forEach((form) => {
    const status = $('.form-status', form);
    const btn = $('[type="submit"]', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let bad = null;
      $$('input[required], textarea[required]', form).forEach((i) => {
        const ok = i.type === 'checkbox' ? i.checked : i.type === 'email' ? isEmail(i.value) : i.type === 'tel' ? isPhone(i.value) : i.value.trim();
        i.setAttribute('aria-invalid', String(!ok));
        if (!ok && !bad) bad = i;
      });
      if (bad) { bad.focus(); return; }
      const label = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = btn.dataset.sending;
      const data = Object.fromEntries(new FormData(form));
      try {
        await send({ type: 'short', service: form.dataset.service, ...data });
        status.className = 'form-status is-ok';
        status.textContent = status.dataset.ok;
        form.reset();
      } catch {
        status.className = 'form-status is-error';
        status.textContent = status.dataset.error;
      } finally {
        btn.disabled = false;
        btn.innerHTML = label;
      }
    });
  });

  /* ───────── Asistente "Empezar" ───────── */
  const wiz = $('[data-wizard]');
  if (wiz) {
    const allQs = $$('.q', wiz);
    // El paso de tipo de residencia solo participa si el servicio elegido es el combo
    const isCombo = () => { const r = $('input[name="service"][value="combo"]', wiz); return !!(r && r.checked); };
    const steps = () => allQs.filter((q) => !('comboOnly' in q.dataset) || isCombo());
    const bar = $('[data-progress]');
    const label = $('[data-progress-label]');
    const back = $('[data-back]', wiz), next = $('[data-next]', wiz), submit = $('[data-submit]', wiz);
    const err = $('[data-q-error]', wiz);
    const arrival = $('[data-arrival]', wiz);
    let i = 0;
    let cur = allQs[0];

    const refresh = (list = steps()) => {
      list.forEach((q, idx) => { const num = $('.q-num', q); if (num) num.textContent = `${idx + 1} →`; });
      bar.style.width = ((i + 1) / list.length) * 100 + '%';
      label.textContent = label.dataset.tpl.replace('{n}', i + 1).replace('{total}', list.length);
      back.hidden = i === 0;
      next.hidden = i === list.length - 1;
      submit.hidden = i !== list.length - 1;
    };

    const pre = new URLSearchParams(location.search).get('s');
    if (pre) {
      const r = $(`input[name="service"][value="${CSS.escape(pre)}"]`, wiz);
      if (r) r.checked = true;
    }
    const today = new Date().toISOString().slice(0, 10);
    $('#arrival', wiz).min = today;
    refresh();

    const show = (n, dir = 1) => {
      const list = steps();
      cur.hidden = true;
      i = n;
      cur = list[i];
      cur.hidden = false;
      cur.classList.toggle('is-back', dir < 0);
      refresh(list);
      err.textContent = '';
      const f = cur.querySelector('input:checked, input:not([type=radio]):not([type=hidden]), select');
      if (f && window.matchMedia('(hover: hover)').matches) setTimeout(() => f.focus({ preventScroll: true }), 50);
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    };

    const validate = () => {
      const q = cur;
      const radios = $$('input[type=radio]', q);
      if (radios.length && !radios.some((r) => r.checked)) return wiz.dataset.required;
      if (q.dataset.q === '2' && $('input[value="no"]', q).checked && !$('#arrival', q).value) { $('#arrival', q).focus(); return wiz.dataset.required; }
      for (const inp of $$('input[required]:not([type=radio]), select[required]', q)) {
        const v = inp.value;
        let msg = null;
        if (inp.type === 'checkbox' && !inp.checked) msg = wiz.dataset.required;
        else if (inp.type !== 'checkbox' && !v.trim()) msg = wiz.dataset.required;
        else if (inp.type === 'email' && !isEmail(v)) msg = wiz.dataset.invalidEmail;
        else if (inp.type === 'tel' && !isPhone(v)) msg = wiz.dataset.invalidPhone;
        inp.setAttribute('aria-invalid', String(!!msg));
        if (msg) { inp.focus(); return msg; }
      }
      return null;
    };

    const go = () => {
      const m = validate();
      if (m) { err.textContent = m; return; }
      if (i < steps().length - 1) show(i + 1, 1);
    };

    next.addEventListener('click', go);
    back.addEventListener('click', () => i > 0 && show(i - 1, -1));

    // Avance automático al clickear una opción (también si ya estaba seleccionada)
    $$('input[type=radio]', wiz).forEach((r) => r.addEventListener('click', () => {
      if (r.name === 'service') {
        if (r.value !== 'combo') $$('input[name="residenceType"]', wiz).forEach((x) => { x.checked = false; });
        refresh();
      }
      if (r.name === 'inSpain') {
        arrival.hidden = r.value !== 'no';
        if (r.value === 'no') { setTimeout(() => $('#arrival', wiz).focus(), 50); return; }
      }
      setTimeout(go, reduced ? 0 : 280);
    }));

    // Teclado: Intro avanza, letras eligen opción
    wiz.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
        e.preventDefault();
        i === total - 1 ? wiz.requestSubmit() : go();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input:not([type=radio]), select, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toUpperCase();
      if (k.length === 1 && k >= 'A' && k <= 'E') {
        const opts = $$('input[type=radio]', cur);
        const o = opts[k.charCodeAt(0) - 65];
        if (o) o.click();
      }
    });

    // Stepper de personas
    $$('[data-stepper]', wiz).forEach((s) => {
      const inp = $('input', s);
      $$('[data-step]', s).forEach((b) => b.addEventListener('click', () => {
        const v = Math.max(+inp.min, Math.min(+inp.max, (+inp.value || 0) + +b.dataset.step));
        inp.value = v;
      }));
    });

    wiz.addEventListener('submit', async (e) => {
      e.preventDefault();
      const m = validate();
      if (m) { err.textContent = m; return; }
      const data = Object.fromEntries(new FormData(wiz));
      data.phoneFull = `${data.prefix} ${data.phone}`;
      data.privacy = !!data.privacy;
      data.marketing = !!data.marketing;
      const label = submit.innerHTML;
      submit.disabled = true;
      submit.textContent = wiz.dataset.sending;
      try {
        await send({ type: 'start', ...data });
        const services = JSON.parse(wiz.dataset.services);
        let svc = services[data.service] || data.service;
        if (data.residenceType) svc += ' · ' + (services[data.residenceType] || data.residenceType);
        const msg = wiz.dataset.waTpl.replace('{service}', svc);
        $('[data-done-wa]').href = `https://wa.me/${SITE.wa}?text=${encodeURIComponent(msg)}`;
        wiz.hidden = true;
        $('.progress').style.visibility = 'hidden';
        $('[data-progress-label]').hidden = true;
        const done = $('[data-done]');
        done.hidden = false;
        done.focus();
      } catch {
        err.textContent = wiz.dataset.error;
      } finally {
        submit.disabled = false;
        submit.innerHTML = label;
      }
    });
  }

  /* ───────── Cookies (RGPD) ───────── */
  const CK = 'cookie-consent-v1';
  const banner = $('[data-cookie]');
  const loadAnalytics = () => {
    if (!SITE.analyticsId || window.__ga) return;
    window.__ga = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(SITE.analyticsId);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', SITE.analyticsId, { anonymize_ip: true });
  };
  const saveConsent = (analytics) => {
    store.set(CK, JSON.stringify({ analytics, date: new Date().toISOString() }));
    banner.hidden = true;
    if (analytics) loadAnalytics();
  };
  if (banner) {
    let consent = null;
    try { consent = JSON.parse(store.get(CK)); } catch { consent = null; }
    if (!consent) setTimeout(() => { banner.hidden = false; }, 900);
    else if (consent.analytics) loadAnalytics();

    const prefs = $('[data-cookie-prefs]', banner);
    const toggle = $('[data-cookie-analytics]', banner);
    const cfgBtn = $('[data-cookie-configure]', banner);
    const saveBtn = $('[data-cookie-save]', banner);
    $('[data-cookie-accept]', banner).addEventListener('click', () => saveConsent(true));
    $('[data-cookie-reject]', banner).addEventListener('click', () => saveConsent(false));
    cfgBtn.addEventListener('click', () => { prefs.hidden = false; cfgBtn.hidden = true; saveBtn.hidden = false; toggle.focus(); });
    saveBtn.addEventListener('click', () => saveConsent(toggle.checked));
    $$('[data-cookie-settings]').forEach((b) => b.addEventListener('click', () => {
      let c = null;
      try { c = JSON.parse(store.get(CK)); } catch { c = null; }
      toggle.checked = !!(c && c.analytics);
      prefs.hidden = false; cfgBtn.hidden = true; saveBtn.hidden = false;
      banner.hidden = false;
      toggle.focus();
    }));
  }
})();
