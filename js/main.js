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

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
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
    const match = filter === 'all' || item.dataset.category === filter;
    item.classList.toggle('hidden', !match);
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
});

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

// data-video accepts a YouTube/Vimeo embed URL or a local file path (e.g. assets/video/clip.mp4)
function isEmbedUrl(src) {
  return /youtube\.com\/embed|player\.vimeo\.com/.test(src);
}

document.querySelectorAll('.grid-thumb').forEach((thumb) => {
  thumb.addEventListener('click', () => {
    lightboxTitle.textContent = thumb.dataset.title || '';
    lightboxDesc.textContent = thumb.dataset.desc || '';

    const videoSrc = thumb.dataset.video;
    if (videoSrc) {
      lightboxMedia.innerHTML = isEmbedUrl(videoSrc)
        ? `<iframe src="${videoSrc}" title="${thumb.dataset.title || ''}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%;height:100%;"></iframe>`
        : `<video controls autoplay style="width:100%;height:100%;"><source src="${videoSrc}"></video>`;
    } else {
      lightboxMedia.innerHTML = `<span class="lightbox-category">${thumb.dataset.category || ''}</span>`;
    }

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
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
// Footer year
// ==========================================================================
document.getElementById('year').textContent = new Date().getFullYear();
