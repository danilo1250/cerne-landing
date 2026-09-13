document.addEventListener('DOMContentLoaded', function () {

  /* ---------- menu mobile ---------- */
  var toggle = document.getElementById('menuToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scroll progress + header shrink + floating whatsapp ---------- */
  var progressBar = document.getElementById('progressBar');
  var header = document.getElementById('siteHeader');
  var floatWa = document.getElementById('floatWa');
  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
    if (header) header.classList.toggle('scrolled', scrollTop > 12);
    if (floatWa) floatWa.classList.toggle('show', scrollTop > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll('.reveal, .steps');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- typewriter for the mock browser url ---------- */
  var urlEl = document.getElementById('heroUrl');
  if (urlEl) {
    var fullText = urlEl.textContent.trim();
    urlEl.textContent = '';
    var i = 0;
    setTimeout(function typeChar() {
      urlEl.textContent = fullText.slice(0, i);
      i++;
      if (i <= fullText.length) {
        setTimeout(typeChar, 45);
      }
    }, 900);
  }

  /* ---------- live mockup customizer ---------- */
  var segments = {
    salao: { sub: 'SALÃO DE BELEZA — VILA MADALENA', cta: 'Agende seu horário em 1 minuto' },
    restaurante: { sub: 'RESTAURANTE — ITAIM BIBI', cta: 'Veja o cardápio e reserve sua mesa' },
    loja: { sub: 'LOJA — MOEMA', cta: 'Confira as novidades da semana' },
    barbearia: { sub: 'BARBEARIA — PINHEIROS', cta: 'Marque seu horário sem sair do zap' },
    consultorio: { sub: 'CONSULTÓRIO — JARDINS', cta: 'Marque sua consulta em poucos cliques' }
  };
  var nameInput = document.getElementById('bizName');
  var segSelect = document.getElementById('bizSegment');
  var mHead = document.querySelector('.mock-site .m-head');
  var mSub = document.querySelector('.mock-site .m-sub');
  var mHeroSpan = document.querySelector('.mock-site .m-hero span');

  function updateMock() {
    if (mHead) mHead.textContent = (nameInput && nameInput.value.trim()) || 'Studio Alameda';
    var seg = segments[(segSelect && segSelect.value) || 'salao'];
    if (mSub) mSub.textContent = seg.sub;
    if (mHeroSpan) mHeroSpan.textContent = seg.cta;
  }
  if (nameInput) nameInput.addEventListener('input', updateMock);
  if (segSelect) segSelect.addEventListener('change', updateMock);

  /* ---------- 3D tilt on the browser mockup ---------- */
  var tiltWrap = document.querySelector('.tilt-wrap');
  var browser = document.querySelector('.browser');
  if (tiltWrap && browser && window.matchMedia('(hover: hover)').matches) {
    tiltWrap.addEventListener('mousemove', function (e) {
      var rect = tiltWrap.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      var rotY = x * 10;
      var rotX = y * -10;
      browser.style.transform = 'rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
    });
    tiltWrap.addEventListener('mouseleave', function () {
      browser.style.transform = 'rotateX(0) rotateY(0)';
    });
  }

  /* ---------- ambient glow following cursor in hero ---------- */
  var hero = document.querySelector('.hero');
  var glow = document.getElementById('heroGlow');
  if (hero && glow) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.setProperty('--gx', x + '%');
      glow.style.setProperty('--gy', y + '%');
    });
  }

  /* ---------- magnetic final cta ---------- */
  document.querySelectorAll('.cta-btn.magnetic').forEach(function (magnetic) {
    magnetic.addEventListener('mousemove', function (e) {
      var rect = magnetic.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      magnetic.style.setProperty('--mx', x + 'px');
      magnetic.style.setProperty('--my', y + 'px');
      var moveX = (x - rect.width / 2) * 0.15;
      var moveY = (y - rect.height / 2) * 0.25;
      magnetic.style.transform = 'translate(' + moveX + 'px,' + moveY + 'px)';
    });
    magnetic.addEventListener('mouseleave', function () {
      magnetic.style.transform = 'translate(0,0)';
    });
  });

});
