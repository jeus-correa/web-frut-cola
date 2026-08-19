/**
 * FRUTAD SpA — Lógica principal
 */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavigation();
  initScrollEffects();
  initRevealAnimations();
  initCounters();
  initProducts();
  initCarousel();
  initWhatsAppFloat();
  initLocationTabs();
  initFooter();
  initSocialLinks();
});

/* ---------- Preloader ---------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 600);
  });

  setTimeout(() => preloader.classList.add('hidden'), 3000);
}

/* ---------- Navegación ---------- */
function initNavigation() {
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav__link');

  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  function closeMenu() {
    nav?.classList.remove('open');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  function openMenu() {
    nav?.classList.add('open');
    navToggle?.classList.add('active');
    navToggle?.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  navToggle?.addEventListener('click', () => {
    nav?.classList.contains('open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Header scroll
  function onScroll() {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}

/* ---------- Scroll suave ---------- */
function initScrollEffects() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---------- Animaciones reveal ---------- */
function initRevealAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Contadores animados ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ---------- Productos ---------- */
function initProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid || !FRUTAD_CONFIG.products) return;

  grid.classList.add('stagger-children');

  FRUTAD_CONFIG.products.forEach((product) => {
    const waUrl = Security.buildWhatsAppUrl(FRUTAD_CONFIG.whatsapp, product.whatsappMessage);
    const tagsHtml = product.tags.map((t) => `<span class="product-card__tag">${Security.escapeHtml(t)}</span>`).join('');

    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-card__image" style="background-image: url('${product.image}')" role="img" aria-label="${Security.escapeHtml(product.name)}"></div>
      <div class="product-card__body">
        <h3>${Security.escapeHtml(product.name)}</h3>
        <p>${Security.escapeHtml(product.description)}</p>
        <div class="product-card__tags">${tagsHtml}</div>
        <a href="${waUrl}" class="product-card__whatsapp" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Consultar por WhatsApp
        </a>
      </div>
    `;
    grid.appendChild(card);
  });

  // Trigger stagger animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(grid);
}

/* ---------- Carrusel ---------- */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const carousel = document.getElementById('carousel');

  if (!track || !FRUTAD_CONFIG.gallery?.length) return;

  let current = 0;
  let autoplayTimer = null;
  const total = FRUTAD_CONFIG.gallery.length;

  FRUTAD_CONFIG.gallery.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel__slide';
    slide.style.backgroundImage = `url('${url}')`;
    slide.setAttribute('role', 'img');
    slide.setAttribute('aria-label', `Imagen ${i + 1} de ${total}`);
    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = `carousel__dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer?.appendChild(dot);
  });

  const dots = dotsContainer?.querySelectorAll('.carousel__dot');

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots?.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  prevBtn?.addEventListener('click', () => { prev(); resetAutoplay(); });
  nextBtn?.addEventListener('click', () => { next(); resetAutoplay(); });

  carousel?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { prev(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { next(); resetAutoplay(); }
  });

  // Touch swipe
  let touchStartX = 0;
  carousel?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel?.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
      resetAutoplay();
    }
  }, { passive: true });

  function startAutoplay() {
    autoplayTimer = setInterval(next, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  carousel?.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  carousel?.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

/* ---------- WhatsApp flotante ---------- */
function initWhatsAppFloat() {
  const toggle = document.getElementById('whatsappToggle');
  const menu = document.getElementById('whatsappMenu');
  const list = document.getElementById('whatsappMenuList');

  if (!toggle || !menu || !list) return;

  FRUTAD_CONFIG.whatsappMenu.forEach((item) => {
    const url = Security.buildWhatsAppUrl(FRUTAD_CONFIG.whatsapp, item.message);
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${url}" target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        ${Security.escapeHtml(item.label)}
      </a>
    `;
    list.appendChild(li);
  });

  toggle.addEventListener('click', () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.whatsapp-float')) {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ---------- Tabs ubicación ---------- */
function initLocationTabs() {
  const tabs = document.querySelectorAll('.location-tab');
  const detail = document.getElementById('locationDetail');
  const mapFrame = document.getElementById('mapFrame');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.map;
      const loc = FRUTAD_CONFIG.locations[key];
      if (!loc) return;

      tabs.forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });

      if (detail) {
        detail.innerHTML = `
          <h3>${Security.escapeHtml(loc.title)}</h3>
          <p>${Security.escapeHtml(loc.address)}</p>
          <a href="${loc.googleLink}" target="_blank" rel="noopener noreferrer" class="btn btn--outline btn--sm">Abrir en Google Maps</a>
        `;
      }

      if (mapFrame) {
        mapFrame.src = loc.mapUrl;
        mapFrame.title = `Mapa FRUTAD ${loc.title}`;
      }
    });
  });
}

/* ---------- Footer ---------- */
function initFooter() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Redes Sociales ---------- */
function initSocialLinks() {
  if (typeof FRUTAD_CONFIG === 'undefined' || !FRUTAD_CONFIG.socials) return;

  const { facebook, instagram } = FRUTAD_CONFIG.socials;

  // Header desktop
  const headerFb = document.getElementById('headerFacebookLink');
  const headerIg = document.getElementById('headerInstagramLink');
  if (headerFb && facebook) headerFb.href = facebook;
  if (headerIg && instagram) headerIg.href = instagram;

  // Mobile nav sidebar
  const mobFb = document.getElementById('mobFacebookLink');
  const mobIg = document.getElementById('mobInstagramLink');
  if (mobFb && facebook) mobFb.href = facebook;
  if (mobIg && instagram) mobIg.href = instagram;

  // Contact section
  const contactFb = document.getElementById('contactFacebookLink');
  const contactIg = document.getElementById('contactInstagramLink');
  if (contactFb && facebook) contactFb.href = facebook;
  if (contactIg && instagram) contactIg.href = instagram;

  // Footer
  const footerFb = document.getElementById('footerFacebookLink');
  const footerIg = document.getElementById('footerInstagramLink');
  if (footerFb && facebook) footerFb.href = facebook;
  if (footerIg && instagram) footerIg.href = instagram;
}
