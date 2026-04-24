// Theme
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', savedTheme);

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Sticky nav + scroll progress
const topnav = document.getElementById('topnav');
const scrollTop = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;

  topnav.classList.toggle('scrolled', y > 20);
  scrollTop.classList.toggle('visible', y > 400);

  root.style.setProperty('--scroll-pct', `${(y / max) * 100}%`);
}, { passive: true });

scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Active nav link highlighting
const navLinks = document.querySelectorAll('.topnav-links a');
const sections = document.querySelectorAll('section[id]');

const setActiveLink = () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
};

window.addEventListener('scroll', setActiveLink, { passive: true });

// Smooth scroll for nav links
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// Hero buttons smooth scroll
document.querySelectorAll('.hero-cta a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// Scroll-reveal for cards
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.08 }
);
document.querySelectorAll('.card').forEach(c => observer.observe(c));

// Typed subtitle
const phrases = ['Software Engineer', 'Android Developer', 'Back-End Developer'];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  const phrase = phrases[pi];
  typedEl.textContent = deleting ? phrase.slice(0, ci--) : phrase.slice(0, ci++);
  if (!deleting && ci > phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  setTimeout(type, deleting ? 45 : 80);
}
setTimeout(type, 800);
