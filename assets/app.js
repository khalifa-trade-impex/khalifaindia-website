/* ==========================================================================
   KHALIFA TRADE & IMPEX — site behaviour
   Vanilla JS, no framework, no CDN. Requires assets/data.js loaded first.
   Every page gets: nav, mega menu, search, enquiry modal, reveals, counters.
   Category pages additionally get: facet filters, sort, load-more.
   ========================================================================== */
(function () {
  'use strict';

  var D = window.KTI || {};
  var PER_PAGE = 12;
  var doc = document;

  document.documentElement.classList.remove('no-js');

  function $(sel, root) { return (root || doc).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }
  function on(el, ev, fn) { if (el) el.addEventListener(ev, fn); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* --- root-relative prefix, so the site works in a subfolder or at root --- */
  var PREFIX = (function () {
    var m = doc.querySelector('meta[name="kti-prefix"]');
    return m ? m.getAttribute('content') : '';
  })();
  function url(path) { return PREFIX + path; }

  /* ----------------------------------------------------------------- header */
  var mega = $('#mega');
  var megaBtn = $('#nav-products');
  var mobileMenu = $('#mobile-menu');
  var burger = $('#burger');

  function closeMega() { if (mega) mega.classList.remove('is-open'); }
  if (mega && megaBtn) {
    on(megaBtn, 'mouseenter', function () { mega.classList.add('is-open'); });
    on(megaBtn, 'focus', function () { mega.classList.add('is-open'); });
    on(mega, 'mouseleave', closeMega);
    $$('.nav a').forEach(function (a) {
      if (a !== megaBtn) on(a, 'mouseenter', closeMega);
    });
  }
  on(burger, 'click', function () {
    var open = mobileMenu.classList.toggle('is-open');
    burger.textContent = open ? 'CLOSE' : 'MENU';
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* ------------------------------------------------ header fit guard
     The CSS breakpoint assumes the authored font metrics. Real browsers can
     render the row wider (Windows font rasterising, zoom, display scaling), so
     measure it: if the desktop row does not fit, collapse to the MENU button
     exactly as the narrow-viewport layout does. */
  (function () {
    var root = document.documentElement;
    var bar = $('.header-bar');
    var navEl = $('.nav');
    var acts = $('.header-actions');
    if (!bar || !navEl || !acts) return;
    function fits() {
      root.classList.remove('header-compact');
      if (getComputedStyle(acts).display === 'none') return true;   // media query already collapsed it
      var b = bar.getBoundingClientRect();
      var pad = parseFloat(getComputedStyle(bar).paddingRight) || 0;
      var brand = $('.brand', bar);
      var n = navEl.getBoundingClientRect();
      var ar = acts.getBoundingClientRect();
      var overflowRight = ar.right > b.right - pad + 1;
      var overlapBrand = brand && n.left < brand.getBoundingClientRect().right;
      var overlapNav = ar.left < n.right - 1;
      return !(overflowRight || overlapBrand || overlapNav || bar.scrollWidth > bar.clientWidth + 1);
    }
    function check() { if (!fits()) root.classList.add('header-compact'); }
    check();
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(check, 60); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);
    window.addEventListener('load', check);
  })();

  /* --------------------------------------------------------- search overlay */
  var searchOverlay = $('#search-overlay');
  var searchInput = $('#search-input');
  var searchResults = $('#search-results');
  var searchHint = $('#search-hint');

  function catImg(slug) {
    var rec = D.IMG && D.IMG[slug];
    return rec ? url('assets/img/' + rec[0]) : '';
  }

  function renderSearch(q) {
    if (!searchResults) return;
    var list = D.PRODUCTS || [];
    var out;
    if (q) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      out = list.filter(function (p) {
        var hay = [p.name, p.categoryName, p.subCategoryName, p.brand, p.businessRelationship, p.tags.join(' '), p.applications.join(' ')].join(' ').toLowerCase();
        return terms.every(function (t) { return hay.indexOf(t) >= 0; });
      }).slice(0, 10);
    } else {
      out = list.slice(0, 6);
    }
    searchResults.innerHTML = out.map(function (p) {
      return '<a href="' + url('product/' + p.slug + '/index.html') + '">' +
        '<span class="thumb"><img src="' + catImg(p.category) + '" alt="" loading="lazy"></span>' +
        '<span><strong>' + esc(p.name) + '</strong><br>' +
        '<span>' + esc(p.categoryName + ' · ' + p.brand + ' · ' + p.businessRelationship) + '</span></span></a>';
    }).join('');
    if (searchHint) {
      searchHint.textContent = q
        ? out.length + (out.length === 1 ? ' result' : ' results') + ' — search by product, category, brand, tag or application.'
        : 'Try “GFRP”, “Tarpaulin”, “PTMT”, “HDPE pipe” or “safety net”.';
    }
  }

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('is-open');
    if (mobileMenu) mobileMenu.classList.remove('is-open');
    renderSearch(searchInput ? searchInput.value.trim() : '');
    if (searchInput) searchInput.focus();
  }
  function closeSearch() { if (searchOverlay) searchOverlay.classList.remove('is-open'); }

  $$('[data-open-search]').forEach(function (b) { on(b, 'click', openSearch); });
  $$('[data-close-search]').forEach(function (b) { on(b, 'click', closeSearch); });
  on(searchOverlay, 'click', function (e) { if (e.target === searchOverlay) closeSearch(); });
  on(searchInput, 'input', function () { renderSearch(searchInput.value.trim()); });

  /* --------------------------------------------------------- enquiry modal */
  var modal = $('#enquiry-overlay');
  var modalTitle = $('#enquiry-title');
  var modalIntro = $('#enquiry-intro');
  var modalWa = $('#enquiry-wa');
  var status = $('#enquiry-status');
  var currentProduct = null;

  function formValues() {
    var v = {};
    ['name', 'company', 'phone', 'email', 'product', 'qty', 'message'].forEach(function (k) {
      var el = $('#eq-' + k);
      v[k] = el ? el.value.trim() : '';
    });
    return v;
  }
  function enquiryText() {
    var v = formValues();
    var lines = ['Enquiry — Khalifa Trade & Impex', ''];
    if (v.product) lines.push('Product / Requirement: ' + v.product);
    if (v.qty) lines.push('Quantity / Requirement: ' + v.qty);
    if (v.name) lines.push('Name: ' + v.name);
    if (v.company) lines.push('Company: ' + v.company);
    if (v.phone) lines.push('Phone: ' + v.phone);
    if (v.email) lines.push('Email: ' + v.email);
    if (v.message) lines.push('', 'Message:', v.message);
    if (lines.length === 2) lines.push('I would like to enquire about your products.');
    return lines.join('\n');
  }
  function syncWa() {
    if (modalWa) modalWa.href = D.wa ? D.wa(enquiryText()) : '#';
  }

  function openEnquiry(product) {
    if (!modal) return;
    currentProduct = product || null;
    var pf = $('#eq-product');
    if (pf && product) pf.value = product;
    var msg = $('#eq-message');
    if (msg && product && !msg.value) msg.value = 'I am interested in ' + product + '.';
    if (modalTitle) modalTitle.textContent = product || 'Send us your requirement';
    if (modalIntro) modalIntro.textContent = product
      ? 'Your enquiry will reference this product.'
      : 'Tell us the product, quantity and application.';
    if (status) status.hidden = true;
    syncWa();
    modal.classList.add('is-open');
    if (mobileMenu) mobileMenu.classList.remove('is-open');
    var first = $('#eq-name');
    if (first) first.focus();
  }
  function closeEnquiry() { if (modal) modal.classList.remove('is-open'); }

  doc.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-enquire]') : null;
    if (t) {
      e.preventDefault();
      var p = t.getAttribute('data-enquire');
      openEnquiry(p || null);
    }
  });
  $$('[data-close-enquiry]').forEach(function (b) { on(b, 'click', closeEnquiry); });
  on(modal, 'click', function (e) { if (e.target === modal) closeEnquiry(); });
  ['name', 'company', 'phone', 'email', 'product', 'qty', 'message'].forEach(function (k) {
    on($('#eq-' + k), 'input', syncWa);
  });

  /* Email fallback — WhatsApp is the primary action (see modal markup). */
  on($('#enquiry-mail'), 'click', function (e) {
    e.preventDefault();
    var v = formValues();
    var subject = 'Enquiry' + (v.product ? ' — ' + v.product : '') + ' | Khalifa Trade & Impex';
    window.location.href = 'mailto:' + D.EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(enquiryText());
    if (status) {
      status.hidden = false;
      status.textContent = 'Your email application should now be open with the enquiry details. If nothing opened, use WhatsApp or call us instead.';
    }
  });

  on(doc, 'keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); closeEnquiry(); closeMega(); }
  });

  /* ---------------------------------------------------------- scroll reveal
     Fails OPEN. Content is visible in CSS by default; the hidden state exists
     only while html.js-reveal is set, and only ever for elements below the fold.
     Three independent guarantees content becomes visible:
       1. anything already in view is revealed synchronously, before paint;
       2. the IntersectionObserver reveals the rest on scroll;
       3. a timer drops html.js-reveal outright, so even a dead observer,
          a throwing callback or a zero-height container cannot hide anything.
     -------------------------------------------------------------------------- */
  var revealables = $$('.reveal, .reveal-stagger');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function revealAll() { revealables.forEach(function (el) { el.classList.add('is-in'); }); }
  function failOpen() { document.documentElement.classList.remove('js-reveal'); }

  if (!revealables.length || reduceMotion || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    document.documentElement.classList.add('js-reveal');

    // 1. reveal what is already on screen, without waiting for the observer
    var vh = window.innerHeight || document.documentElement.clientHeight;
    revealables.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) el.classList.add('is-in');
    });

    // 2. observer for the rest
    try {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); ro.unobserve(en.target); }
        });
      }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
      revealables.forEach(function (el) {
        if (!el.classList.contains('is-in')) ro.observe(el);
      });
    } catch (e) {
      revealAll();
      failOpen();
    }

    // 3. unconditional failsafe
    setTimeout(function () {
      var stuck = $$('.reveal:not(.is-in), .reveal-stagger:not(.is-in)');
      if (stuck.length) revealAll();
      failOpen();
    }, 1500);
  }

  /* -------------------------------------------------------- stat counters */
  var statWrap = $('#stats');
  if (statWrap) {
    var nums = $$('[data-count]', statWrap);
    var ran = false;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function runCounters() {
      if (ran) return;
      ran = true;
      if (reduce) {
        nums.forEach(function (n) { n.textContent = n.getAttribute('data-count') + '+'; });
        return;
      }
      var t0 = performance.now(), dur = 1500;
      function tick(now) {
        var p = Math.min(1, (now - t0) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        nums.forEach(function (n) {
          n.textContent = Math.round(parseInt(n.getAttribute('data-count'), 10) * e) + '+';
        });
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    /* Same fail-open treatment as the reveals: if the observer never fires the
       numbers must still end up at their final value, never stuck at 0+. */
    function inView() {
      var r = statWrap.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh && r.bottom > 0;
    }
    if ('IntersectionObserver' in window) {
      try {
        var so = new IntersectionObserver(function (en) {
          if (en.some(function (x) { return x.isIntersecting; })) { so.disconnect(); runCounters(); }
        }, { threshold: 0 });
        so.observe(statWrap);
      } catch (e) { runCounters(); }
      if (inView()) runCounters();
      var onScroll = function () { if (inView()) { runCounters(); cleanup(); } };
      var cleanup = function () {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      setTimeout(function () { if (!ran && inView()) runCounters(); }, 1500);
    } else { runCounters(); }
  }

  /* --------------------------------------------------------- shop slider
     Auto-advances, pauses on hover/focus, supports arrows, dots, keyboard and
     swipe. Fails open: if anything throws, slide 1 stays visible. */
  var slider = $('#shop-slider');
  if (slider) {
    var slides = $$('.slide', slider);
    var dots = $$('.dot', slider);
    var idx = 0;
    var timer = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var interval = parseInt(slider.getAttribute('data-interval'), 10) || 6000;

    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var on = i === idx;
        s.classList.toggle('is-active', on);
        if (on) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true');
      });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === idx);
        if (i === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
    function next() { show(idx + 1); }
    function start() { if (reduce || slides.length < 2) return; stop(); timer = setInterval(next, interval); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    on($('[data-next]', slider), 'click', function () { next(); start(); });
    on($('[data-prev]', slider), 'click', function () { show(idx - 1); start(); });
    dots.forEach(function (d) {
      on(d, 'click', function () { show(parseInt(d.getAttribute('data-slide'), 10)); start(); });
    });
    on(slider, 'mouseenter', stop);
    on(slider, 'mouseleave', start);
    on(slider, 'focusin', stop);
    on(slider, 'focusout', start);
    on(slider, 'keydown', function (ev) {
      if (ev.key === 'ArrowRight') { next(); start(); }
      if (ev.key === 'ArrowLeft') { show(idx - 1); start(); }
    });
    var x0 = null;
    on(slider, 'touchstart', function (ev) { x0 = ev.touches[0].clientX; stop(); }, { passive: true });
    on(slider, 'touchend', function (ev) {
      if (x0 === null) return;
      var dx = ev.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
      start();
    });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    start();
  }

  /* ------------------------------------------------- catalogue: facets etc. */
  var grid = $('#product-grid');
  if (!grid) return;

  var cards = $$('.p-card', grid);
  var facetHost = $('#facets');
  var countEl = $('#result-count');
  var emptyEl = $('#no-results');
  var loadWrap = $('#load-wrap');
  var loadBtn = $('#load-more');
  var sortSel = $('#sort');
  var searchField = $('#catalogue-search');
  var emptyBare = $('#empty-bare');
  var emptyFiltered = $('#empty-filtered');
  var scope = grid.getAttribute('data-scope') || '';
  var shown = PER_PAGE;
  var active = {};

  var FACET_DEFS = [
    { key: 'cat', label: 'Category', attr: 'data-cat-name' },
    { key: 'sub', label: 'Sub-category', attr: 'data-sub-name' },
    { key: 'brand', label: 'Brand / Source', attr: 'data-brand' },
    { key: 'rel', label: 'Business relationship', attr: 'data-rel' },
    { key: 'app', label: 'Application', attr: 'data-apps', multi: true }
  ];

  function valuesOf(card, def) {
    var raw = card.getAttribute(def.attr) || '';
    return def.multi ? raw.split('|').filter(Boolean) : (raw ? [raw] : []);
  }
  function matchesQuery(card, q) {
    if (!q) return true;
    var hay = (card.getAttribute('data-search') || '').toLowerCase();
    return q.toLowerCase().split(/\s+/).filter(Boolean).every(function (t) { return hay.indexOf(t) >= 0; });
  }
  function passes(card, skipKey) {
    var q = searchField ? searchField.value.trim() : '';
    if (!matchesQuery(card, q)) return false;
    return FACET_DEFS.every(function (def) {
      if (def.key === skipKey) return true;
      var sel = active[def.key];
      if (!sel || !sel.length) return true;
      var vals = valuesOf(card, def);
      return sel.some(function (v) { return vals.indexOf(v) >= 0; });
    });
  }

  function buildFacets() {
    if (!facetHost) return;
    var html = '';
    FACET_DEFS.forEach(function (def) {
      if (def.key === 'cat' && scope !== 'all') return;
      if (def.key === 'sub' && scope === 'sub') return;
      var counts = {};
      cards.forEach(function (card) {
        if (!passes(card, def.key)) return;
        valuesOf(card, def).forEach(function (v) { counts[v] = (counts[v] || 0) + 1; });
      });
      var keys = Object.keys(counts).sort();
      var sel = active[def.key] || [];
      if (keys.length < 2 && !sel.length) return;
      html += '<div class="facet-group"><span class="micro">' + esc(def.label) + '</span>';
      keys.forEach(function (v) {
        var isOn = sel.indexOf(v) >= 0;
        html += '<button type="button" class="facet" data-facet="' + esc(def.key) + '" data-value="' + esc(v) +
          '" aria-pressed="' + (isOn ? 'true' : 'false') + '"><span>' + esc(v) +
          '</span><span class="facet-count">' + counts[v] + '</span></button>';
      });
      html += '</div>';
    });
    facetHost.innerHTML = html;
  }

  function apply() {
    var visible = cards.filter(function (c) { return passes(c, null); });

    if (sortSel) {
      var mode = sortSel.value;
      if (mode === 'az' || mode === 'za') {
        visible.sort(function (a, b) {
          var an = a.getAttribute('data-name') || '', bn = b.getAttribute('data-name') || '';
          return mode === 'az' ? an.localeCompare(bn) : bn.localeCompare(an);
        });
      } else {
        visible.sort(function (a, b) {
          return (+a.getAttribute('data-order') || 0) - (+b.getAttribute('data-order') || 0);
        });
      }
      visible.forEach(function (c) { grid.appendChild(c); });
    }

    cards.forEach(function (c) { c.hidden = true; });
    visible.slice(0, shown).forEach(function (c) { c.hidden = false; });

    if (countEl) {
      countEl.textContent = visible.length + (visible.length === 1 ? ' product' : ' products') +
        (visible.length > shown ? ' · showing ' + shown : '');
    }
    /* Distinguish "nothing in this group yet" from "filters matched nothing".
       A group with no rows at all is not a failed search — its models live in
       the downloadable catalogue, so say that instead of "no results". */
    if (emptyEl) {
      emptyEl.hidden = visible.length !== 0;
      if (visible.length === 0) {
        var bare = cards.length === 0;
        if (emptyBare) emptyBare.hidden = !bare;
        if (emptyFiltered) emptyFiltered.hidden = bare;
      }
    }
    if (loadWrap) loadWrap.hidden = visible.length <= shown;
    if (loadBtn) loadBtn.textContent = 'Load more (' + Math.max(0, visible.length - shown) + ' remaining)';
    buildFacets();
  }

  on(facetHost, 'click', function (e) {
    var b = e.target.closest('.facet');
    if (!b) return;
    var k = b.getAttribute('data-facet'), v = b.getAttribute('data-value');
    var arr = active[k] ? active[k].slice() : [];
    var i = arr.indexOf(v);
    if (i >= 0) arr.splice(i, 1); else arr.push(v);
    active[k] = arr;
    shown = PER_PAGE;
    apply();
  });

  on(searchField, 'input', function () { shown = PER_PAGE; apply(); });
  on(sortSel, 'change', function () { apply(); });
  on(loadBtn, 'click', function () { shown += PER_PAGE; apply(); });
  $$('[data-clear-filters]').forEach(function (b) {
    on(b, 'click', function () {
      active = {};
      if (searchField) searchField.value = '';
      shown = PER_PAGE;
      apply();
    });
  });

  /* --- small screens: collapse the facet panel behind a toggle ----------- */
  var facetPanel = doc.querySelector('.facets');
  if (facetPanel && facetHost) {
    var toggle = doc.createElement('button');
    toggle.type = 'button';
    toggle.id = 'filter-toggle';
    toggle.className = 'btn btn-outline btn-sm';
    toggle.setAttribute('aria-controls', 'facets');
    facetPanel.insertBefore(toggle, facetPanel.firstChild);

    var small = window.matchMedia('(max-width: 900px)');
    function labelToggle() {
      var collapsed = facetPanel.classList.contains('is-collapsed');
      toggle.innerHTML = '<span>Search &amp; filters</span><span>' + (collapsed ? '+' : '\u2212') + '</span>';
      toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    }
    function syncPanel() {
      if (small.matches) facetPanel.classList.add('is-collapsed');
      else facetPanel.classList.remove('is-collapsed');
      labelToggle();
    }
    on(toggle, 'click', function () {
      facetPanel.classList.toggle('is-collapsed');
      labelToggle();
    });
    if (small.addEventListener) small.addEventListener('change', syncPanel);
    else if (small.addListener) small.addListener(syncPanel);
    syncPanel();
  }

  apply();
})();
