// ==========================================================================
// Header background on scroll
// ==========================================================================
const header = document.getElementById('site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ==========================================================================
// Mobile nav toggle
// ==========================================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navClose = document.getElementById('navClose');

function closeMobileNav() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navClose.addEventListener('click', closeMobileNav);

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

// ==========================================================================
// Reveal-on-scroll animations
// ==========================================================================
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealItems.forEach((item) => revealObserver.observe(item));

// ==========================================================================
// Portfolio filtering
// ==========================================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const gridItems = document.querySelectorAll('.grid-item');

function applyFilter(filter) {
  filterButtons.forEach((b) => b.classList.toggle('active', b.dataset.filter === filter));
  gridItems.forEach((item) => {
    const match = filter === 'featured' ? item.dataset.featured === 'true' : item.dataset.category === filter;
    item.classList.toggle('hidden', !match);
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});

applyFilter('featured');

// Hero category links: jump to Work pre-filtered to that category
document.querySelectorAll('.hero-chip').forEach((chip) => {
  chip.addEventListener('click', () => applyFilter(chip.dataset.filter));
});

// ==========================================================================
// Lightbox
// ==========================================================================
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const lightboxMedia = document.querySelector('.lightbox-media');
const lightboxCampaign = document.getElementById('lightboxCampaign');
const lightboxCampaignList = document.getElementById('lightboxCampaignList');
const lightboxRoles = document.getElementById('lightboxRoles');

// data-video accepts a YouTube/Vimeo embed URL or a local file path (e.g. assets/video/clip.mp4)
function isEmbedUrl(src) {
  return /youtube\.com\/embed|player\.vimeo\.com/.test(src);
}

function openLightboxFor(thumb) {
  lightboxTitle.textContent = thumb.dataset.title || '';
  lightboxDesc.textContent = thumb.dataset.desc || '';

  const roles = thumb.closest('.grid-item')?.querySelector('.roles');
  lightboxRoles.innerHTML = roles ? roles.innerHTML : '';

  const videoSrc = thumb.dataset.video;
  if (videoSrc) {
    lightboxMedia.innerHTML = isEmbedUrl(videoSrc)
      ? `<iframe src="${videoSrc}" title="${thumb.dataset.title || ''}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;"></iframe>`
      : `<video controls autoplay style="width:100%;height:100%;"><source src="${videoSrc}"></video>`;
  } else {
    lightboxMedia.innerHTML = `<span class="lightbox-category">${thumb.dataset.category || ''}</span>`;
  }

  const campaign = thumb.dataset.campaign;
  const siblings = campaign
    ? [...document.querySelectorAll(`.grid-thumb[data-campaign="${campaign}"]`)].filter((el) => el !== thumb)
    : [];

  if (siblings.length) {
    lightboxCampaignList.innerHTML = '';
    siblings.forEach((sibling) => {
      const btn = document.createElement('button');
      btn.className = 'lightbox-campaign-item';
      btn.type = 'button';
      btn.innerHTML = `
        <span class="lightbox-campaign-thumb">${sibling.innerHTML}</span>
        <span class="lightbox-campaign-title">${sibling.dataset.title || ''}</span>
      `;
      btn.addEventListener('click', () => openLightboxFor(sibling));
      lightboxCampaignList.appendChild(btn);
    });
    lightboxCampaign.hidden = false;
  } else {
    lightboxCampaign.hidden = true;
  }

  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.grid-thumb').forEach((thumb) => {
  thumb.addEventListener('click', () => openLightboxFor(thumb));
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxMedia.querySelectorAll('video, iframe').forEach((el) => el.remove());
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ==========================================================================
// Language toggle (Spanish default, English optional)
// ==========================================================================
const langOptions = document.querySelectorAll('.lang-option');
const textNodes = document.querySelectorAll('[data-es]');
const htmlNodes = document.querySelectorAll('[data-es-html]');

function setLanguage(lang) {
  document.documentElement.lang = lang;
  textNodes.forEach((el) => { el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es; });
  htmlNodes.forEach((el) => { el.innerHTML = lang === 'en' ? el.dataset.enHtml : el.dataset.esHtml; });
  langOptions.forEach((btn) => { btn.classList.toggle('active', btn.dataset.lang === lang); });
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

let savedLang = 'es';
try { savedLang = localStorage.getItem('lang') || 'es'; } catch (e) {}
setLanguage(savedLang);

langOptions.forEach((btn) => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ==========================================================================
// Footer year
// ==========================================================================
document.getElementById('year').textContent = new Date().getFullYear();
