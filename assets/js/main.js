/* Keyla Portfolio — interaksi ringan, tanpa dependensi eksternal. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* 1. Menu navigasi seluler                                            */
  /* ------------------------------------------------------------------ */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    var openIcon = menuToggle.querySelector('.menu-icon-open');
    var closeIcon = menuToggle.querySelector('.menu-icon-close');

    var setMenuOpen = function (open) {
      mobileMenu.classList.toggle('hidden', !open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
      if (openIcon) openIcon.classList.toggle('hidden', open);
      if (closeIcon) closeIcon.classList.toggle('hidden', !open);
    };

    menuToggle.addEventListener('click', function () {
      setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    Array.prototype.forEach.call(mobileMenu.querySelectorAll('a'), function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    var desktopQuery = window.matchMedia('(min-width: 1024px)');
    var handleDesktop = function (event) {
      if (event.matches) setMenuOpen(false);
    };
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', handleDesktop);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(handleDesktop);
    }
  }

  /* ------------------------------------------------------------------ */
  /* 2. Salin alamat email sekali klik                                   */
  /* ------------------------------------------------------------------ */
  var copyBtn = document.getElementById('copy-email-btn');
  var emailText = document.getElementById('email-address-text');
  var copyLabel = document.getElementById('copy-label');
  var copyIcon = document.getElementById('copy-icon');
  var checkIcon = document.getElementById('copy-icon-check');
  var resetTimer = null;

  function writeToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.top = '0';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      var copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (error) {
        copied = false;
      }
      document.body.removeChild(field);
      copied ? resolve() : reject(new Error('Copy failed'));
    });
  }

  function resetCopyButton() {
    if (!copyBtn || !copyLabel) return;
    copyLabel.textContent = 'Salin';
    copyBtn.classList.add('bg-primary');
    copyBtn.classList.remove('bg-secondary-container', 'text-on-secondary-fixed');
    if (copyIcon) copyIcon.classList.remove('hidden');
    if (checkIcon) checkIcon.classList.add('hidden');
  }

  if (copyBtn && emailText && copyLabel) {
    copyBtn.addEventListener('click', function () {
      var email = emailText.textContent.trim();

      writeToClipboard(email)
        .then(function () {
          copyLabel.textContent = 'Tersalin!';
          copyBtn.classList.remove('bg-primary');
          copyBtn.classList.add('bg-secondary-container', 'text-on-secondary-fixed');
          if (copyIcon) copyIcon.classList.add('hidden');
          if (checkIcon) checkIcon.classList.remove('hidden');

          window.clearTimeout(resetTimer);
          resetTimer = window.setTimeout(resetCopyButton, 2500);
        })
        .catch(function () {
          copyLabel.textContent = 'Pilih & salin';
          var range = document.createRange();
          range.selectNodeContents(emailText);
          var selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
          window.clearTimeout(resetTimer);
          resetTimer = window.setTimeout(resetCopyButton, 3000);
        });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. Status aktif pada navigasi utama saat halaman digulir            */
  /* ------------------------------------------------------------------ */
  var navLinks = document.querySelectorAll('#main-nav a[href^="#"]');

  if (navLinks.length) {
    var setActive = function (id) {
      Array.prototype.forEach.call(navLinks, function (link) {
        var active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('bg-primary-container', active);
        link.classList.toggle('text-on-primary', active);
        link.classList.toggle('text-on-surface-variant', !active);
        if (active) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    Array.prototype.forEach.call(navLinks, function (link) {
      link.addEventListener('click', function () {
        setActive(link.getAttribute('href').slice(1));
      });
    });

    if ('IntersectionObserver' in window) {
      var sections = Array.prototype.map
        .call(navLinks, function (link) {
          return document.querySelector(link.getAttribute('href'));
        })
        .filter(Boolean);

      var observer = new IntersectionObserver(
        function (entries) {
          var visible = entries
            .filter(function (entry) { return entry.isIntersecting; })
            .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
          if (visible) setActive(visible.target.id);
        },
        { rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.1, 0.5] }
      );

      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  /* ------------------------------------------------------------------ */
  /* 4. Formulir cek ketersediaan cepat                                  */
  /* ------------------------------------------------------------------ */
  var form = document.getElementById('quick-inquiry');
  var emailInput = document.getElementById('quick-email');
  var formStatus = document.getElementById('form-status');

  if (form && emailInput) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      var visitorEmail = emailInput.value.trim();
      var subject = encodeURIComponent('Cek ketersediaan proyek — ' + visitorEmail);
      var body = encodeURIComponent(
        'Halo Keyla,\n\nSaya ingin menanyakan ketersediaan Anda untuk proyek desain.\nEmail kerja saya: ' +
          visitorEmail +
          '\n\nTerima kasih.'
      );

      if (formStatus) {
        formStatus.textContent =
          'Aplikasi email Anda akan dibuka. Bila tidak terbuka, silakan hubungi keylamarcelianti03@gmail.com atau WhatsApp 087716792785.';
        formStatus.classList.remove('hidden');
      }

      window.location.href =
        'mailto:keylamarcelianti03@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
})();
