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
