/* Clar de Lluna — menu rendering and interactions. No dependencies. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (id) { return document.getElementById(id); };

  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var norm = function (s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  };
  var slug = function (s) { return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); };
  var priceHTML = function (p) {
    return '<span class="price">' + String(p).replace('.', ',') + '<small>DT</small></span>';
  };

  /* ---------- Moon drawings (thin line) ---------- */
  var FRACTION = { new: 0, crescent: 0.24, half: 0.5, gibbous: 0.76, full: 1 };
  function moon(phase, cls) {
    var rim = '<circle class="rim" cx="50" cy="50" r="40"/>';
    var body;
    if (phase === 'eclipse') {
      body = '<circle class="corona" cx="50" cy="50" r="47"/><circle class="lit" cx="50" cy="50" r="40"/>' +
        '<circle class="shadow" cx="56" cy="47" r="37"/>';
    } else {
      var f = FRACTION[phase] == null ? 0.24 : FRACTION[phase];
      if (f === 0) body = rim + '<circle class="rim" cx="50" cy="50" r="31" stroke-dasharray="2 5"/>';
      else if (f === 1) body = '<circle class="lit" cx="50" cy="50" r="40"/>';
      else {
        var rx = Math.abs(1 - 2 * f) * 40;
        body = rim + '<path class="lit" d="M50 10A40 40 0 0 1 50 90A' + rx.toFixed(2) + ' 40 0 0 ' + (f < 0.5 ? 0 : 1) + ' 50 10Z"/>';
      }
    }
    return '<svg class="moon ' + (cls || '') + '" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' + body + '</svg>';
  }
  var CRESCENT = '<svg viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M6.5 .8A4.4 4.4 0 1 0 6.5 9.2A5 5 0 0 1 6.5 .8Z"/></svg>';

  /* ---------- Render ---------- */
  var groups = [];
  MENU.forEach(function (cat) {
    var g = groups.filter(function (x) { return x.title === cat.group; })[0];
    if (!g) groups.push(g = { title: cat.group, cats: [] });
    g.cats.push(cat);
  });
  var GROUP_MOON = ['crescent', 'half', 'full'];

  var index = []; // { el, text, catId }
  var sigs = [];
  var menuHTML = '';
  groups.forEach(function (g, gi) {
    menuHTML += '<section class="group" id="groupe-' + slug(g.title) + '" aria-labelledby="gt' + gi + '">' +
      '<div class="group-head reveal"><span class="rule"></span><div class="group-title-wrap">' + moon(GROUP_MOON[gi % 3]) +
      '<h2 class="group-title" id="gt' + gi + '">' + esc(g.title) + '</h2></div><span class="rule"></span></div>';
    g.cats.forEach(function (cat) {
      menuHTML += '<section class="cat reveal" id="' + cat.id + '" data-cat="' + cat.id + '" aria-labelledby="ct-' + cat.id + '">' +
        '<div class="cat-head"><h3 class="cat-title" id="ct-' + cat.id + '">' + esc(cat.title) + '</h3>' +
        (cat.subtitle ? '<p class="cat-sub">' + esc(cat.subtitle) + '</p>' : '') + '</div><ul class="items">';
      cat.items.forEach(function (it) {
        var id = cat.id + '-' + slug(it.name);
        if (it.sig) sigs.push({ it: it, cat: cat, id: id });
        menuHTML += '<li class="item" id="' + id + '" data-cat="' + cat.id + '">' +
          '<div class="item-line"><span class="item-name">' + esc(it.name) + '</span><span class="leader" aria-hidden="true"></span>' + priceHTML(it.price) + '</div>' +
          (it.desc ? '<p class="item-desc">' + esc(it.desc) + '</p>' : '') +
          (it.sig ? '<p class="sig-label">' + CRESCENT + '<span>Signature</span></p>' : '') +
          '</li>';
      });
      menuHTML += '</ul></section>';
    });
    menuHTML += '</section>';
  });
  $('menu').innerHTML = menuHTML;

  MENU.forEach(function (cat) {
    cat.items.forEach(function (it) {
      var el = $(cat.id + '-' + slug(it.name));
      index.push({ el: el, cat: cat.id, text: norm([it.name, it.desc || '', cat.title, cat.subtitle || '', it.sig ? 'signature' : ''].join(' ')) });
    });
  });

  $('sigRow').innerHTML = sigs.map(function (s) {
    return '<a class="sig-card" href="#' + s.id + '" data-target="' + s.id + '">' + moon(s.it.phase) +
      '<span class="sig-cat">' + esc(s.cat.title) + '</span><span class="sig-name">' + esc(s.it.name) + '</span>' +
      priceHTML(s.it.price) + '</a>';
  }).join('');

  var chips = $('chips');
  chips.innerHTML = MENU.map(function (cat) {
    return '<a class="chip" href="#' + cat.id + '" data-cat="' + cat.id + '">' + esc(cat.title) + '</a>';
  }).join('');

  /* ---------- Smooth scrolling ---------- */
  var spyLock = 0;
  // Layout position (offsetTop ignores the fade-up transform, so targets never land short)
  function pageTop(el) {
    var y = 0;
    for (; el; el = el.offsetParent) y += el.offsetTop;
    return y;
  }
  function scrollToEl(el, after, extra) {
    spyLock = Date.now() + 900;
    var top = pageTop(el) - $('bars').offsetHeight - (extra == null ? 0 : extra);
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    if (after) setTimeout(after, reduceMotion.matches ? 0 : 650);
  }

  $('toMenu').addEventListener('click', function (e) {
    e.preventDefault();
    spyLock = Date.now() + 900;
    window.scrollTo({ top: document.getElementById('top').offsetHeight, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  });

  chips.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    e.preventDefault();
    var sec = $(chip.dataset.cat);
    if (!sec) return;
    setActive(chip.dataset.cat);
    scrollToEl(sec);
    history.replaceState(null, '', '#' + chip.dataset.cat);
  });

  $('sigRow').addEventListener('click', function (e) {
    var card = e.target.closest('.sig-card');
    if (!card) return;
    e.preventDefault();
    var el = $(card.dataset.target);
    scrollToEl(el, function () {
      el.classList.add('flash');
      setTimeout(function () { el.classList.remove('flash'); }, 1400);
    }, 24);
  });

  /* ---------- Scroll-spy ---------- */
  var active = null;
  function setActive(id) {
    if (id === active) return;
    active = id;
    var current = null;
    Array.prototype.forEach.call(chips.children, function (c) {
      var on = c.dataset.cat === id;
      if (on) { c.setAttribute('aria-current', 'true'); current = c; }
      else c.removeAttribute('aria-current');
    });
    if (current) {
      var left = current.offsetLeft - (chips.clientWidth - current.offsetWidth) / 2;
      chips.scrollTo({ left: Math.max(0, left), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll('.cat'));
  var bars = $('bars');
  function spy() {
    if (Date.now() < spyLock) return;
    var line = bars.getBoundingClientRect().bottom + 24;
    var pick = null;
    for (var i = 0; i < sections.length; i++) {
      var s = sections[i];
      if (s.hidden) continue;
      if (!pick) pick = s;
      if (s.getBoundingClientRect().top <= line) pick = s;
      else break;
    }
    // at the very bottom of the page, the last visible section wins
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      for (var j = sections.length - 1; j >= 0; j--) if (!sections[j].hidden) { pick = sections[j]; break; }
    }
    if (pick) setActive(pick.dataset.cat);
  }
  // IntersectionObserver tells us when section boundaries cross the sticky bars; scroll keeps it exact.
  var spyIO = new IntersectionObserver(spy, { rootMargin: '-120px 0px -50% 0px', threshold: [0, 1] });
  sections.forEach(function (s) { spyIO.observe(s); });
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; spy(); });
  }, { passive: true });
  window.addEventListener('scrollend', function () { spyLock = 0; spy(); });
  spy();

  /* ---------- Search ---------- */
  var q = $('q');
  var qClear = $('qClear');
  function filter() {
    var terms = norm(q.value).split(/\s+/).filter(Boolean);
    var shown = {};
    var total = 0;
    index.forEach(function (row) {
      var ok = terms.every(function (t) { return row.text.indexOf(t) !== -1; });
      row.el.hidden = !ok;
      if (ok) { shown[row.cat] = (shown[row.cat] || 0) + 1; total++; }
    });
    sections.forEach(function (s) { s.hidden = !shown[s.dataset.cat]; });
    Array.prototype.forEach.call(document.querySelectorAll('.group'), function (g) {
      g.hidden = !g.querySelector('.cat:not([hidden])');
    });
    Array.prototype.forEach.call(chips.children, function (c) { c.hidden = !shown[c.dataset.cat]; });
    $('signatures').hidden = terms.length > 0;
    $('empty').hidden = total > 0;
    qClear.hidden = !q.value;
    if (terms.length) revealAll();
    active = null;
    spy();
  }
  q.addEventListener('input', filter);
  q.addEventListener('keydown', function (e) { if (e.key === 'Enter') q.blur(); });
  qClear.addEventListener('click', function () { q.value = ''; filter(); q.focus(); });
  $('searchJump').addEventListener('click', function () {
    scrollToEl($('searchBox'), function () { q.focus({ preventScroll: true }); }, 12);
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function revealAll() { reveals.forEach(function (el) { el.classList.add('in'); }); }
  if (reduceMotion.matches || !('IntersectionObserver' in window)) revealAll();
  else {
    var rIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting || en.boundingClientRect.top < 0) {
          en.target.classList.add('in');
          rIO.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { rIO.observe(el); });
  }

  /* ---------- Starfield ---------- */
  var canvas = $('stars');
  var ctx = canvas.getContext && canvas.getContext('2d');
  if (ctx) {
    var seed = 42;
    var rnd = function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    var stars = [];
    for (var i = 0; i < 60; i++) {
      stars.push({ x: rnd(), y: rnd(), r: 0.4 + rnd() * 0.9, a: 0.15 + rnd() * 0.4, s: 0.3 + rnd() * 0.9, p: rnd() * 6.28 });
    }
    var W = 0, H = 0, dpr = 1;
    var size = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var draw = function (t) {
      ctx.clearRect(0, 0, W, H);
      for (var k = 0; k < stars.length; k++) {
        var st = stars[k];
        var tw = reduceMotion.matches ? 1 : 0.55 + 0.45 * Math.sin(t / 1000 * st.s + st.p);
        ctx.globalAlpha = st.a * tw;
        ctx.fillStyle = '#EDEAE3';
        ctx.beginPath();
        ctx.arc(st.x * W, st.y * H, st.r, 0, 6.2832);
        ctx.fill();
      }
    };
    var last = 0;
    var loop = function (t) {
      if (t - last > 50) { draw(t); last = t; }
      if (!reduceMotion.matches && !document.hidden) requestAnimationFrame(loop);
    };
    var start = function () { size(); draw(performance.now()); if (!reduceMotion.matches) requestAnimationFrame(loop); };
    var resizeT;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { size(); draw(performance.now()); }, 120);
    });
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && !reduceMotion.matches) requestAnimationFrame(loop);
    });
    start();
  }
})();
