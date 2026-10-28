/**
 * main.js — Ducting Kitchen
 * Versi: 1.0 | Acuan: PRD 7.6, DESIGN.md 10
 * Dimuat dengan defer di setiap halaman.
 */

'use strict';

/* -------------------------------------------------------
   1. TOMBOL KEMBALI KE ATAS
------------------------------------------------------- */
(function initBackToTop() {
  const topBtn = document.querySelector('.float-top');
  if (!topBtn) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  function toggle() {
    topBtn.classList.toggle('is-visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  topBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: prefersReduced.matches ? 'auto' : 'smooth'
    });
  });
})();

/* -------------------------------------------------------
   2. WHATSAPP LINK BUILDER
   Setiap tombol .btn-wa-page atau .float-wa dengan data-wa-page
   mendapat pesan otomatis berdasarkan halaman asal.
------------------------------------------------------- */
(function initWhatsApp() {
  const WA_BASE = 'https://wa.me/6285210620252';
  const pageTitle = document.title;
  const pageUrl = window.location.href;

  // Pesan default
  const defaultMsg = `Halo Ducting Kitchen, saya ingin konsultasi. Saya melihat halaman: ${pageUrl}`;

  // Cek apakah elemen memiliki data-wa-msg (override) atau data-wa-service
  const waLinks = document.querySelectorAll('[data-wa-link]');
  waLinks.forEach(function (el) {
    const service = el.getAttribute('data-wa-service') || '';
    let msg;
    if (service) {
      msg = `Halo Ducting Kitchen, saya ingin konsultasi ${service}. Lokasi proyek: ... Saya melihat halaman: ${pageUrl}`;
    } else {
      msg = defaultMsg;
    }
    const currentHref = el.getAttribute('href') || '';
    if (currentHref.includes('wa.me')) {
      el.setAttribute('href', `${WA_BASE}?text=${encodeURIComponent(msg)}`);
    }
  });
})();

/* -------------------------------------------------------
   3. FORMULIR PERMINTAAN PENAWARAN
------------------------------------------------------- */
(function initForm() {
  const form = document.getElementById('form-penawaran');
  if (!form) return;

  const submitBtn = form.querySelector('[type="submit"]');
  const successEl = document.getElementById('form-success');
  const errorEl = document.getElementById('form-error');

  // Validasi satu field
  function validateField(field) {
    const wrapper = field.closest('.mb-3') || field.parentElement;
    const errorEl = wrapper.querySelector('.field-error');
    let valid = true;
    let msg = '';

    if (field.required && !field.value.trim()) {
      valid = false;
      msg = 'Kolom ini wajib diisi.';
    } else if (field.type === 'tel' && field.value.trim()) {
      const telRegex = /^(\+62|62|0)[0-9]{8,13}$/;
      if (!telRegex.test(field.value.replace(/[\s\-]/g, ''))) {
        valid = false;
        msg = 'Masukkan nomor WhatsApp/telepon yang valid (misal: 08xxxxxxxx atau +62xxxxxxxx).';
      }
    } else if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        valid = false;
        msg = 'Masukkan alamat email yang valid.';
      }
    } else if (field.tagName === 'SELECT' && field.required && !field.value) {
      valid = false;
      msg = 'Pilih salah satu opsi.';
    }

    if (!valid) {
      field.classList.add('is-invalid');
      if (errorEl) {
        errorEl.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
          </svg>
          ${msg}`;
        errorEl.style.display = 'flex';
      }
    } else {
      field.classList.remove('is-invalid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    }
    return valid;
  }

  // Validasi semua field
  function validateAll() {
    const fields = form.querySelectorAll('input:not([type="hidden"]):not([name="website"]), select, textarea');
    let allValid = true;
    fields.forEach(function (f) {
      if (!validateField(f)) allValid = false;
    });
    return allValid;
  }

  // Blur event untuk validasi real-time
  form.addEventListener('focusout', function (e) {
    const field = e.target;
    if (field.tagName === 'INPUT' || field.tagName === 'SELECT' || field.tagName === 'TEXTAREA') {
      validateField(field);
    }
  });

  // Submit
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Honeypot check
    const honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) return; // Diam-diam tolak

    if (!validateAll()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';

    if (errorEl) errorEl.style.display = 'none';

    // Kirim ke endpoint formulir (ganti URL endpoint sesuai layanan yang dipakai)
    const ENDPOINT = form.getAttribute('action') || '#';

    if (ENDPOINT === '#') {
      // Mode demo: simulasi berhasil
      setTimeout(function () {
        showSuccess();
      }, 800);
      return;
    }

    try {
      const data = new FormData(form);
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showSuccess();
      } else {
        showError();
      }
    } catch (err) {
      showError();
    }
  });

  function showSuccess() {
    form.style.display = 'none';
    if (successEl) {
      successEl.style.display = 'block';
      successEl.focus();
    }
    // Track event
    trackEvent('form_submit_success', { location: 'contact_page' });
  }

  function showError() {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Kirim Permintaan';
    if (errorEl) {
      errorEl.style.display = 'block';
      errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
})();

/* -------------------------------------------------------
   4. EVENT TRACKING (GA4)
------------------------------------------------------- */
function trackEvent(eventName, params) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params || {});
  }
}

(function initTracking() {
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-track]');
    if (!el) return;

    const eventName = el.getAttribute('data-track');
    const location = el.getAttribute('data-location') || '';
    trackEvent(eventName, { location: location });
  });
})();

/* -------------------------------------------------------
   5. TAHUN DI FOOTER
------------------------------------------------------- */
(function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* -------------------------------------------------------
   6. MENU MOBILE: DRAWER FULLSCREEN DENGAN TOMBOL TUTUP (✕)
------------------------------------------------------- */
(function initMobileMenu() {
  const menuEl = document.getElementById('menu-utama');
  if (!menuEl) return;

  // Auto-inject header mobile dengan logo dan tombol tutup (✕) jika belum ada di HTML
  if (!menuEl.querySelector('.site-nav__mobile-header')) {
    const mobileHeader = document.createElement('div');
    mobileHeader.className = 'site-nav__mobile-header d-lg-none';
    mobileHeader.innerHTML = `
      <a class="site-nav__brand" href="/" aria-label="Ducting Kitchen">
        <img src="/assets/img/web/logo.png" alt="Ducting Kitchen" width="130" height="38">
      </a>
      <button class="site-nav__close-btn" type="button" aria-label="Tutup menu navigasi">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    menuEl.insertBefore(mobileHeader, menuEl.firstChild);
  }

  function getCollapseInstance() {
    if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
      return bootstrap.Collapse.getInstance(menuEl) || new bootstrap.Collapse(menuEl, { toggle: false });
    }
    return null;
  }

  function closeMenu() {
    menuEl.classList.remove('drawer-open');
    const instance = getCollapseInstance();
    if (instance) {
      instance.hide();
    } else {
      menuEl.classList.remove('show');
    }
    document.body.classList.remove('menu-open');
  }

  // Klik tombol tutup (✕) di dalam drawer
  menuEl.addEventListener('click', function (e) {
    const closeBtn = e.target.closest('.site-nav__close-btn');
    if (closeBtn) {
      e.preventDefault();
      closeMenu();
    }
  });

  // Tutup menu saat tautan dipilih
  const links = menuEl.querySelectorAll('a');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 992) {
        closeMenu();
      }
    });
  });

  // Kunci scroll body & aktifkan animasi slide dari kiri ke kanan
  menuEl.addEventListener('show.bs.collapse', function () {
    document.body.classList.add('menu-open');
    menuEl.classList.add('drawer-open');
  });
  menuEl.addEventListener('shown.bs.collapse', function () {
    document.body.classList.add('menu-open');
    menuEl.classList.add('drawer-open');
  });
  menuEl.addEventListener('hide.bs.collapse', function () {
    document.body.classList.remove('menu-open');
    menuEl.classList.remove('drawer-open');
  });
  menuEl.addEventListener('hidden.bs.collapse', function () {
    document.body.classList.remove('menu-open');
    menuEl.classList.remove('drawer-open');
  });

  // Tutup dengan tombol Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && (menuEl.classList.contains('show') || menuEl.classList.contains('drawer-open'))) {
      closeMenu();
    }
  });
})();

/* -------------------------------------------------------
   7. FAQ ACCORDION — IKON PLUS/MINUS
------------------------------------------------------- */
(function initFaqIcons() {
  const accordionBtns = document.querySelectorAll('.faq-accordion .accordion-button');
  accordionBtns.forEach(function (btn) {
    function updateIcon() {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const iconEl = btn.querySelector('.faq-icon');
      if (!iconEl) return;
      iconEl.innerHTML = isExpanded
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>`;
    }
    updateIcon();
    btn.addEventListener('click', function () {
      setTimeout(updateIcon, 50);
    });
  });
})();

/* -------------------------------------------------------
   8. SERVICE DETAIL GALLERY THUMBNAIL SWITCHER
------------------------------------------------------- */
(function initServiceGallery() {
  const galleries = document.querySelectorAll('.service-gallery');
  galleries.forEach(function (gallery) {
    const mainImg = gallery.querySelector('.service-gallery__main img');
    const thumbs = gallery.querySelectorAll('.service-gallery__thumb');
    if (!mainImg || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        thumbs.forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');
        const targetSrc = thumb.getAttribute('data-src');
        if (targetSrc && mainImg.src !== targetSrc) {
          mainImg.style.opacity = '0.4';
          setTimeout(function () {
            mainImg.src = targetSrc;
            mainImg.style.opacity = '1';
          }, 140);
        }
      });
    });
  });
})();

/* -------------------------------------------------------
   9. BLOG REAL-TIME SEARCH FILTER
------------------------------------------------------- */
(function initBlogSearch() {
  const searchInput = document.getElementById('blogSearchInput');
  const searchForm = document.getElementById('blogSearchForm');
  const clearBtn = document.getElementById('blogSearchClear');
  const statusEl = document.getElementById('blogSearchStatus');
  const notFoundEl = document.getElementById('blogSearchNotFound');
  const resetBtn = document.getElementById('blogSearchResetBtn');
  const querySpan = document.getElementById('blogSearchQuery');
  const cardsGrid = document.getElementById('blogCardsGrid');

  if (!searchInput || !cardsGrid) return;

  const blogCards = cardsGrid.querySelectorAll(':scope > .col');
  if (!blogCards.length) return;

  function performSearch() {
    const rawQuery = searchInput.value || '';
    const query = rawQuery.trim().toLowerCase();

    // Tampilkan / sembunyikan tombol clear
    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
    }

    let matchCount = 0;

    blogCards.forEach(function (col) {
      const title = (col.querySelector('.pandawa-blog-card__title')?.textContent || '').toLowerCase();
      const excerpt = (col.querySelector('.pandawa-blog-card__excerpt')?.textContent || '').toLowerCase();
      const imgAlt = (col.querySelector('img')?.getAttribute('alt') || '').toLowerCase();
      const isMatch = !query || title.includes(query) || excerpt.includes(query) || imgAlt.includes(query);

      if (isMatch) {
        col.style.display = '';
        matchCount++;
      } else {
        col.style.display = 'none';
      }
    });

    // Handle tampilan saat tidak ditemukan
    if (notFoundEl && querySpan) {
      if (matchCount === 0 && query.length > 0) {
        notFoundEl.style.display = 'block';
        querySpan.textContent = rawQuery;
        cardsGrid.style.display = 'none';
      } else {
        notFoundEl.style.display = 'none';
        cardsGrid.style.display = '';
      }
    }

    // Update status teks
    if (statusEl) {
      if (query.length > 0) {
        statusEl.style.display = 'block';
        statusEl.textContent = `Menampilkan ${matchCount} dari ${blogCards.length} artikel untuk "${rawQuery}"`;
      } else {
        statusEl.style.display = 'none';
        statusEl.textContent = '';
      }
    }
  }

  searchInput.addEventListener('input', performSearch);

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchInput.value) {
      searchInput.value = '';
      performSearch();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      searchInput.value = '';
      searchInput.focus();
      performSearch();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      searchInput.value = '';
      searchInput.focus();
      performSearch();
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      performSearch();
    });
  }
})();

/* -------------------------------------------------------
   7. DETAIL LAYANAN TABS CONTROLLER
   Memastikan tabs berfungsi mulus dan mendukung deep-link hash
------------------------------------------------------- */
(function initServiceDetailTabs() {
  const tabNavs = document.querySelectorAll('.service-tabs-nav');
  if (!tabNavs.length) return;

  tabNavs.forEach(function (nav) {
    const buttons = nav.querySelectorAll('button[data-bs-toggle="pill"], button[data-bs-toggle="tab"]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        // Reset active pada nav buttons
        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Target tab pane
        const targetSelector = btn.getAttribute('data-bs-target');
        if (targetSelector) {
          const targetPane = document.querySelector(targetSelector);
          if (targetPane) {
            const container = targetPane.closest('.tab-content');
            if (container) {
              container.querySelectorAll('.tab-pane').forEach(function (pane) {
                pane.classList.remove('show', 'active');
              });
              targetPane.classList.add('show', 'active');
            }
          }
        }
      });
    });
  });

  // Dukungan link hash URL (misal: #tab-material)
  if (window.location.hash) {
    const activeTabByHash = document.querySelector(`.service-tabs-nav button[data-bs-target="${window.location.hash}"]`);
    if (activeTabByHash) {
      activeTabByHash.click();
    }
  }
})();

/* -------------------------------------------------------
   INDUSTRY GALLERY FILTER
------------------------------------------------------- */
(function initIndustryFilter() {
  const filterBtns = document.querySelectorAll('.industry-filter-btn');
  const cards = document.querySelectorAll('.industry-art-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filterValue = btn.getAttribute('data-filter') || 'all';

      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      cards.forEach(function (card) {
        const category = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
})();

/* -------------------------------------------------------
   INDUSTRY PHOTO LIGHTBOX VIEWER
------------------------------------------------------- */
(function initIndustryLightbox() {
  const cards = document.querySelectorAll('.industry-art-card');
  const modalEl = document.getElementById('industryLightboxModal');
  if (!cards.length || !modalEl) return;

  const modalInstance = typeof bootstrap !== 'undefined' ? new bootstrap.Modal(modalEl) : null;
  const imgEl = document.getElementById('industryLightboxImg');
  const titleEl = document.getElementById('industryLightboxTitle');
  const badgeEl = document.getElementById('industryLightboxBadge');
  const captionEl = document.getElementById('industryLightboxCaption');
  const counterEl = document.getElementById('industryLightboxCounter');
  const waBtn = document.getElementById('industryLightboxWa');
  const prevBtn = document.getElementById('industryLightboxPrev');
  const nextBtn = document.getElementById('industryLightboxNext');

  let activeList = [];
  let currentIndex = 0;

  function getVisibleCards() {
    return Array.from(cards).filter(function (card) {
      return !card.classList.contains('is-hidden');
    });
  }

  function updateModal(index) {
    if (!activeList.length) return;
    currentIndex = (index + activeList.length) % activeList.length;
    const card = activeList[currentIndex];
    const img = card.querySelector('.industry-art-card__img');
    const title = card.querySelector('.industry-art-card__title');
    const badge = card.querySelector('.industry-art-card__badge');

    const src = img ? (img.getAttribute('src') || '') : '';
    const alt = img ? (img.getAttribute('alt') || '') : '';
    const titleText = title ? title.textContent.trim() : '';
    const badgeText = badge ? badge.textContent.trim() : '';

    if (imgEl) {
      imgEl.src = src;
      imgEl.alt = alt;
    }
    if (titleEl) titleEl.textContent = titleText;
    if (badgeEl) badgeEl.textContent = badgeText;
    if (captionEl) captionEl.textContent = alt;
    if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + activeList.length;

    if (waBtn) {
      const waText = encodeURIComponent('Halo Ducting Kitchen, saya tertarik dengan instalasi di foto "' + titleText + '" (' + badgeText + '). Mohon info dan estimasi sistem untuk kebutuhan saya.');
      waBtn.href = 'https://wa.me/6285210620252?text=' + waText;
    }
  }

  cards.forEach(function (card) {
    function openCardLightbox() {
      activeList = getVisibleCards();
      if (!activeList.length) activeList = Array.from(cards);
      const idx = activeList.indexOf(card);
      currentIndex = idx !== -1 ? idx : 0;
      updateModal(currentIndex);
      if (modalInstance) {
        modalInstance.show();
      }
    }

    card.addEventListener('click', openCardLightbox);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCardLightbox();
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      updateModal(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      updateModal(currentIndex + 1);
    });
  }

  // Keyboard navigation when modal is open
  document.addEventListener('keydown', function (e) {
    if (!modalEl.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') {
      updateModal(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateModal(currentIndex + 1);
    }
  });
})();

/* -------------------------------------------------------
   ARTICLE SOCIAL SHARE & COPY LINK
------------------------------------------------------- */
(function initArticleShare() {
  const copyButtons = document.querySelectorAll('.js-copy-link');
  if (!copyButtons.length) return;

  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const url = window.location.href;
      const copyTextSpan = btn.querySelector('.copy-text');
      const originalText = copyTextSpan ? copyTextSpan.textContent : 'Salin Link';

      function onSuccess() {
        btn.classList.add('is-copied');
        if (copyTextSpan) copyTextSpan.textContent = 'Tersalin!';
        setTimeout(function () {
          btn.classList.remove('is-copied');
          if (copyTextSpan) copyTextSpan.textContent = originalText;
        }, 2000);
      }

      function fallback() {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand('copy');
          onSuccess();
        } catch (err) {
          console.error('Gagal menyalin:', err);
        }
        document.body.removeChild(textarea);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(onSuccess).catch(fallback);
      } else {
        fallback();
      }
    });
  });
})();
