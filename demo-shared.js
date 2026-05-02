// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── REVEAL ON SCROLL ──
const __revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      __revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => __revealObserver.observe(el));

// ── MOBILE NAV DROPDOWN ──
(function() {
  const trigger = document.getElementById('navMobileTrigger');
  const panel   = document.getElementById('navMobilePanel');
  if (!trigger || !panel) return;

  trigger.addEventListener('click', () => {
    const open = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!open));
    panel.classList.toggle('open', !open);
  });

  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      trigger.setAttribute('aria-expanded', 'false');
      panel.classList.remove('open');
    });
  });

  document.addEventListener('click', e => {
    if (panel.classList.contains('open')
        && !panel.contains(e.target)
        && !trigger.contains(e.target)) {
      trigger.setAttribute('aria-expanded', 'false');
      panel.classList.remove('open');
    }
  });
})();

// ── SERVICE CARD MOUSE FOLLOW ──
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});
