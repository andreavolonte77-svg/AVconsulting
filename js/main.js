// ─── Sticky nav ───────────────────────────────
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── Mobile menu ─────────────────────────────
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

function setMenu(open) {
  mobileMenu.classList.toggle('open', open);
  nav.classList.toggle('menu-open', open);
  burgerBtn.setAttribute('aria-expanded', String(open));
  burgerBtn.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
}

if (burgerBtn && mobileMenu) {
  burgerBtn.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setMenu(false);
      burgerBtn.focus();
    }
  });
}

// ─── Scroll reveal ────────────────────────────
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

// ─── Home: pannelli delle tre aree ────────────
// Su desktop il pannello sotto il mouse (o con il focus) si allarga;
// il disegno al tratto si ridisegna a ogni attivazione.
const panels = [...document.querySelectorAll('.area-panel')];
if (panels.length) {
  const wide = window.matchMedia('(min-width: 861px)');
  const redraw = (p) => {
    p.classList.remove('drawn');
    void p.offsetWidth; // forza il ricalcolo per ripartire da zero
    p.classList.add('drawn');
  };
  const activate = (p) => {
    if (p.classList.contains('is-active')) return;
    panels.forEach(x => x.classList.toggle('is-active', x === p));
    redraw(p);
  };
  panels.forEach(p => {
    p.addEventListener('mouseenter', () => { if (wide.matches) activate(p); });
    p.addEventListener('focus', () => activate(p));
  });

  // Primo disegno quando la sezione entra nello schermo
  const container = document.querySelector('[data-areas]');
  const drawAll = () => panels.forEach((p, i) => setTimeout(() => p.classList.add('drawn'), i * 180));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) { drawAll(); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(container);
  } else {
    drawAll();
  }
}

// ─── Hero: conteggio dei numeri chiave ────────
const counters = document.querySelectorAll('.count[data-to]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (counters.length && !reduceMotion) {
  const duration = 1400;
  counters.forEach(el => { el.textContent = '0'; });
  setTimeout(() => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      counters.forEach(el => { el.textContent = String(Math.round(eased * Number(el.dataset.to))); });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, 500);
}

// ─── Form contatti (Formspree) ───────────────
// L'invio avviene solo dopo la validazione nativa del browser.
const form = document.getElementById('contactForm');
if (form) {
  const btn = form.querySelector('.form-submit');
  const btnLabel = btn.querySelector('.form-submit__label');
  const status = document.getElementById('formStatus');
  const fallbackEmail = form.dataset.fallbackEmail;
  const notConfigured = form.action.includes('IL_TUO_ID');

  const showStatus = (html, isError) => {
    status.innerHTML = html;
    status.classList.toggle('is-error', isError);
  };
  const errorMsg = (intro) =>
    `${intro} Puoi scrivermi direttamente a <a href="mailto:${fallbackEmail}">${fallbackEmail}</a>.`;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (notConfigured) {
      showStatus(errorMsg('Il modulo non è ancora attivo.'), true);
      return;
    }

    btn.disabled = true;
    btnLabel.textContent = 'Invio in corso…';
    showStatus('', false);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      showStatus('Grazie, messaggio ricevuto. Ti rispondo personalmente entro 48 ore lavorative.', false);
    } catch {
      showStatus(errorMsg('Non è stato possibile inviare il messaggio.'), true);
    } finally {
      btn.disabled = false;
      btnLabel.textContent = 'Invia messaggio';
    }
  });
}
