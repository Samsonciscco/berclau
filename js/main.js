/* =========================================================
   BERCLAU — Script principal
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header scroll ---------- */
  const header = document.getElementById('header');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
      backTop.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      backTop.classList.remove('visible');
    }
  });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Menu mobile ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      nav.classList.remove('open');
    });
  });

  /* ---------- Lien actif au scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  /* ---------- Compteurs animés ---------- */
  const counters = document.querySelectorAll('.stat__num');
  const animateCounter = (el) => {
    const target = +el.dataset.count;
    let count = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { el.textContent = target; clearInterval(timer); }
      else el.textContent = Math.floor(count);
    }, 20);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Reveal au scroll ---------- */
  const revealEls = document.querySelectorAll(
    '.section__head, .service-card, .why-card, .testi, .about__inner, .formation__inner, .contact__grid'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Année footer ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Formulaire contact ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const lang = localStorage.getItem('lang') || 'fr';
    const messages = {
      fr: '✅ Merci ! Votre message a bien été envoyé. Nous vous répondrons rapidement.',
      en: '✅ Thank you! Your message has been sent. We will reply soon.',
      rn: '✅ Murakoze! Ubutumwa bwanyu bwoherejwe. Tuzobasubiza vuba.'
    };
    note.textContent = messages[lang];
    form.reset();
    setTimeout(() => { note.textContent = ''; }, 6000);
  });

});