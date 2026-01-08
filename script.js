/* =====================================================
   SMOOTH SCROLL (NAVIGATION)
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* =====================================================
   DARK MODE TOGGLE
===================================================== */
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('dark');
        themeIcon?.classList.replace('fa-sun', 'fa-moon');
    }
}

themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    applyTheme(isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* =====================================================
   LOAD SAVED THEME + INIT
===================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    initScrollAnimations();
});

/* =====================================================
   SCROLL FADE-IN ANIMATIONS
===================================================== */
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.skill-category, .project-card, .experience-card'
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* =====================================================
   MODALS
===================================================== */
function openSIHModal() {
    openModal('sihModal');
}

function openInnosparkModal() {
    openModal('innosparkModal');
}

function showQualityCode() {
    openModal('qualityModal');
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/* Close modal when clicking outside */
window.addEventListener('click', event => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

/* =====================================================
   NAVBAR SCROLL SHADOW
===================================================== */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    nav.style.boxShadow =
        window.scrollY > 80
            ? '0 6px 24px rgba(0,0,0,0.15)'
            : '0 2px 10px rgba(0,0,0,0.06)';
});

/* =====================================================
   HERO PARALLAX (SUBTLE & SAFE)
===================================================== */
const hero = document.querySelector('.hero');

hero?.addEventListener('mousemove', event => {
    const rect = hero.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / 40;
    const rotateY = (rect.width / 2 - x) / 40;

    hero.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

hero?.addEventListener('mouseleave', () => {
    hero.style.transform = 'none';
});
