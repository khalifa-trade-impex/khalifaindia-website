/* ==========================================================================
   Shop engine — listing, filters, cart, product detail.
   Reads window.CORSA (assets/corsa-data.js). No product values are ever
   written into HTML; every view renders from the data layer so a future
   admin dashboard only has to change data.
   ========================================================================== */
(function () {
  'use strict';
  if (!window.CORSA) return;

  var C = window.CORSA, R = C.RULES;
  var CART_KEY = 'kti_cart_v1';
  var doc = document;

  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function on(el, ev, fn, o) { if (el) el.addEventListener(ev, fn, o); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ------------------------------------------------------------------ cart */
  function readCart() {
    try { var v = JSON.parse(localStorage.getItem(CART_KEY)); return v && typeof v === 'object' ? v : {}; }
    catch (e) { return {}; }
  }
  function writeCart(c) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {}
    paintCount();
  }
  var B = window.BADSHAH || null;

  /* A cart key is either a CORSA SKU or a BADSHAH variant id. resolve() returns
     a uniform shape so the cart, totals and lines work for both ranges. */
  function resolve(key) {
    var p = C.bySku(key);
    if (p) return { range: 'corsa', key: key, title: C.title(p), sub: p.seriesLabel || '', price: p.price, mrp: p.mrp, discountPct: p.discountPct, image: p.image, purchasable: C.purchasable(p), raw: p };
    if (B) {
      var v = B.byId(key);
      if (v) return { range: 'badshah', key: key, title: B.NAME, sub: B.label(v), price: v.price, mrp: v.mrp, discountPct: v.discountPct, image: v.image, purchasable: B.purchasable(v), raw: v };
    }
    /* A cart key that resolves to nothing means the customer loses that line
       silently. The usual cause is a missing data-layer <script> on this page,
       so say which one rather than dropping the item without a word. */
    if (!B && /^badshah-/.test(key)) {
      console.error('[shop] cart line "' + key + '" dropped: badshah-data.js is not loaded on this page. ' +
        'Add <script src="../assets/badshah-data.js"></scr' + 'ipt> before shop.js.');
    } else {
      console.warn('[shop] cart line "' + key + '" could not be resolved and was skipped.');
    }
    return null;
  }

  function cartLines() {
    var c = readCart(), out = [];
    Object.keys(c).forEach(function (key) {
      var it = resolve(key);
      if (!it || it.price == null) return;
      var qty = Math.max(R.minQty, Math.min(R.maxQtyPerSku, c[key] | 0));
      out.push({ p: it, qty: qty, line: it.price * qty });
    });
    return out;
  }
  function cartTotals() {
    var lines = cartLines();
    var sub = lines.reduce(function (a, l) { return a + l.line; }, 0);
    var units = lines.reduce(function (a, l) { return a + l.qty; }, 0);
    /* BADSHAH ships free on every piece, all India — the 1,000 threshold is a
       CORSA rule only, so it is tested against the CORSA subtotal alone. */
    var corsaSub = lines.reduce(function (a, l) { return a + (l.p.range === 'corsa' ? l.line : 0); }, 0);
    var free = corsaSub === 0 || corsaSub >= R.freeDeliveryFrom;
    return {
      lines: lines, sub: sub, units: units, corsaSub: corsaSub,
      freeDelivery: free,
      shortfall: free ? 0 : Math.max(0, R.freeDeliveryFrom - corsaSub),
      badshahOnly: corsaSub === 0 && lines.length > 0
    };
  }
  function addToCart(key, qty) {
    var it = resolve(key);
    if (!it || !it.purchasable) return false;
    var c = readCart();
    /* Cap is per line only — there is no whole-cart cap. */
    c[key] = Math.max(R.minQty, Math.min(R.maxQtyPerSku, (c[key] | 0) + (qty | 0 || 1)));
    writeCart(c);
    return true;
  }
  function setQty(sku, qty) {
    var c = readCart();
    qty = qty | 0;
    if (qty <= 0) delete c[sku]; else c[sku] = Math.min(R.maxQtyPerSku, Math.max(R.minQty, qty));
    writeCart(c);
  }
  function paintCount() {
    var t = cartTotals();
    $$('[data-cart-count]').forEach(function (el) {
      el.textContent = t.units;
      el.hidden = t.units === 0;
    });
    /* Repaint wherever the cart is rendered: the drawer OR the cart page,
       which has #cart-body without a #cart-panel wrapper. */
    if ($('#cart-body')) paintCart();
  }

  /* --------------------------------------------------------- shared markup */
  function priceBlock(p) {
    if (p.price == null) return '<span class="pr-na">Price on enquiry</span>';
    var off = p.mrp > p.price;
    return '<span class="pr-now">' + C.money(p.price) + '</span>' +
      (off ? '<span class="pr-mrp">' + C.money(p.mrp) + '</span><span class="pr-off">' + p.discountPct + '% off</span>' : '');
  }
  function availBadge(p) {
    if (p.availability === 'AVAILABLE') return '<span class="av av-in">In stock</span>';
    if (p.availability === 'NOT AVAILABLE') return '<span class="av av-out">Out of stock</span>';
    return '<span class="av av-pending">Availability to be confirmed</span>';
  }
  function media(p, cls, eager) {
    /* Accepts a raw CORSA product (has .sku) or a resolved cart item (has .title). */
    var alt = p.title || C.title(p);
    if (p.image) return '<img src="' + esc(p.image) + '" alt="' + esc(alt) + '"' + (eager ? '' : ' loading="lazy"') + '>';
    return '<span class="ph ' + (cls || '') + '"><span>Product image<br>to be supplied</span></span>';
  }

  /* Enquiry label: "Name (SKU)" when a name exists, otherwise just the SKU. */
  function enqLabel(p) {
    return p.name ? C.title(p) + ' (' + p.sku + ')' : 'CORSA ' + p.sku;
  }

  function card(p) {
    var buyable = C.purchasable(p);
    var qtyOpts = '';
    for (var i = R.minQty; i <= R.maxQtyPerSku; i++) qtyOpts += '<option value="' + i + '">' + i + ' PCS</option>';
    return '<article class="sp-card" data-sku="' + esc(p.sku) + '">' +
      '<a class="sp-media" href="../product/index.html?sku=' + encodeURIComponent(p.sku) + '">' + media(p) + '</a>' +
      '<div class="sp-body">' +
        '<span class="sp-series">' + esc(p.seriesLabel) + '</span>' +
        '<h3 class="sp-name"><a href="../product/index.html?sku=' + encodeURIComponent(p.sku) + '">' + esc(C.title(p)) + '</a></h3>' +
        (p.name ? '<span class="sp-sku">' + esc(p.sku) + '</span>' : '<span class="sp-sku sp-sku-pending">Product name to be supplied</span>') +
        '<div class="sp-price">' + priceBlock(p) + '</div>' +
        availBadge(p) +
        '<div class="sp-actions">' +
          '<label class="sr-only" for="q-' + esc(p.sku) + '">Quantity for ' + esc(p.sku) + '</label>' +
          (buyable
            ? '<select class="sp-qty" id="q-' + esc(p.sku) + '" data-qty>' + qtyOpts + '</select>' +
              '<button type="button" class="btn btn-primary btn-sm sp-add" data-add="' + esc(p.sku) + '">Add to cart</button>' +
              '<button type="button" class="btn btn-dark btn-sm sp-buy" data-buynow="' + esc(p.sku) + '">Buy now</button>'
            : '<button type="button" class="btn btn-quiet btn-sm sp-add" disabled>Out of stock</button>'
          ) +
        '</div>' +
      '</div></article>';
  }

  /* --------------------------------------------------------------- listing */
  var grid = $('#corsa-grid');
  if (grid) {
    var state = { q: '', series: '', avail: '', max: null, sort: 'catalogue', shown: 24 };
    var qEl = $('#corsa-search'), sortEl = $('#corsa-sort'), moreEl = $('#corsa-more'),
        countEl = $('#corsa-count'), emptyEl = $('#corsa-empty'), priceEl = $('#corsa-price'), priceOut = $('#corsa-price-out');

    function matches(p) {
      if (state.q) {
        var hay = (C.title(p) + ' ' + p.sku + ' ' + p.seriesLabel + ' ' + (p.name || '')).toLowerCase();
        if (!state.q.toLowerCase().split(/\s+/).filter(Boolean).every(function (t) { return hay.indexOf(t) >= 0; })) return false;
      }
      if (state.series && p.series !== state.series) return false;
      if (state.avail === 'in' && p.availability !== 'AVAILABLE') return false;
      if (state.avail === 'out' && p.availability === 'AVAILABLE') return false;
      if (state.max != null && (p.price == null || p.price > state.max)) return false;
      return true;
    }
    function sorted(list) {
      var s = state.sort, a = list.slice();
      if (s === 'price-asc') a.sort(function (x, y) { return (x.price == null) - (y.price == null) || x.price - y.price; });
      else if (s === 'price-desc') a.sort(function (x, y) { return (x.price == null) - (y.price == null) || y.price - x.price; });
      else if (s === 'name') a.sort(function (x, y) { return C.title(x).localeCompare(C.title(y)); });
      else if (s === 'newest') a.sort(function (x, y) { return (y.cataloguePage || 0) - (x.cataloguePage || 0); });
      return a;
    }
    function render() {
      var list = sorted(C.PRODUCTS.filter(matches));
      grid.innerHTML = list.slice(0, state.shown).map(card).join('');
      countEl.textContent = list.length + (list.length === 1 ? ' product' : ' products') +
        (list.length > state.shown ? ' \u00b7 showing ' + state.shown : '');
      emptyEl.hidden = list.length !== 0;
      moreEl.hidden = list.length <= state.shown;
      if (!moreEl.hidden) moreEl.textContent = 'Show more (' + (list.length - state.shown) + ' remaining)';
    }
    on(qEl, 'input', function () { state.q = qEl.value.trim(); state.shown = 24; render(); });
    on(sortEl, 'change', function () { state.sort = sortEl.value; render(); });
    on(moreEl, 'click', function () { state.shown += 24; render(); });
    on(priceEl, 'input', function () {
      state.max = +priceEl.value >= +priceEl.max ? null : +priceEl.value;
      priceOut.textContent = state.max == null ? 'Any price' : 'Up to ' + C.money(state.max);
      state.shown = 24; render();
    });
    on($('#corsa-facets'), 'click', function (ev) {
      var b = ev.target.closest('[data-facet]');
      if (!b) return;
      var k = b.getAttribute('data-facet'), v = b.getAttribute('data-value');
      state[k] = state[k] === v ? '' : v;
      $$('[data-facet="' + k + '"]').forEach(function (x) {
        x.setAttribute('aria-pressed', x.getAttribute('data-value') === state[k] ? 'true' : 'false');
      });
      state.shown = 24; render();
    });
    on($('#corsa-clear'), 'click', function () {
      state = { q: '', series: '', avail: '', max: null, sort: state.sort, shown: 24 };
      if (qEl) qEl.value = '';
      if (priceEl) { priceEl.value = priceEl.max; priceOut.textContent = 'Any price'; }
      $$('[data-facet]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      render();
    });
    render();
  }

  /* -------------------------------------------------------- product detail */
  var detail = $('#corsa-detail');
  if (detail) {
    var sku = new URLSearchParams(location.search).get('sku');
    var p = sku ? C.bySku(sku) : null;
    if (!p) {
      detail.innerHTML = '<div class="shop-empty"><h1 style="font-size:24px;font-weight:800">Product not found</h1>' +
        '<p class="body-sm" style="margin-top:10px">This product code is not in the catalogue.</p>' +
        '<div class="btn-row" style="margin-top:20px"><a class="btn btn-primary" href="../corsa-ptmt-bath-fittings/index.html">Back to CORSA range</a></div></div>';
    } else {
      doc.title = C.title(p) + ' \u2014 CORSA PTMT | Khalifa Trade & Impex';
      var buyable = C.purchasable(p);
      var qtyOpts = '';
      for (var i = R.minQty; i <= R.maxQtyPerSku; i++) qtyOpts += '<option value="' + i + '">' + i + ' PCS</option>';
      var spec = [
        ['Product code / SKU', p.sku],
        ['Series', p.seriesLabel],
        ['Colour / variant', p.colour || C.MISSING],
        ['Product dimensions', p.dimensions],
        ['Product weight', p.weight],
        ['Package dimensions', p.packDimensions],
        ['Package / shipping weight', p.shipWeight],
        ['Set / pack quantity', p.setQty],
        ['COD', p.cod === 'NOT SET' ? C.MISSING : p.cod],
        ['Shipping category', p.shippingCategory],
        ['Return / replacement', p.returnPolicy]
      ];
      $('#corsa-crumb').textContent = C.title(p);
      detail.innerHTML =
        '<div class="pd-grid">' +
          '<div class="pd-media">' + media(p, 'ph-lg') +
            '<p class="pd-disclaimer">' + esc(R.imageDisclaimer) + '</p>' +
          '</div>' +
          '<div class="pd-info">' +
            '<span class="kicker">' + esc(p.seriesLabel) + '</span>' +
            '<h1>' + esc(C.title(p)) + '</h1>' +
            (p.name ? '<span class="pd-sku">' + esc(p.sku) + '</span>'
                    : '<span class="pd-sku pd-sku-pending">Catalogue code \u2014 product name to be supplied</span>') +
            '<div class="pd-price">' + priceBlock(p) + '</div>' +
            (p.mrp != null ? '<p class="pd-incl">MRP inclusive of all taxes. Retail discount applied.</p>' : '') +
            '<div class="pd-avail">' + availBadge(p) + '</div>' +
            (p.shortDesc ? '<p class="lede" style="margin-top:16px;font-size:15px">' + esc(p.shortDesc) + '</p>' : '') +
            '<div class="pd-buy">' +
              (buyable
                ? '<label class="sr-only" for="pd-qty">Quantity</label>' +
                  '<select id="pd-qty" class="sp-qty">' + qtyOpts + '</select>' +
                  '<button type="button" class="btn btn-primary btn-lg" data-add="' + esc(p.sku) + '" data-from="#pd-qty">Add to cart</button>' +
                  '<button type="button" class="btn btn-dark btn-lg" data-buynow="' + esc(p.sku) + '" data-from="#pd-qty">Buy now</button>'
                : '<button type="button" class="btn btn-quiet btn-lg" disabled>Out of stock</button>'
              ) +
            '</div>' +
            (buyable ? '' : '<p class="pd-note">This product cannot be ordered online yet \u2014 availability is confirmed before a SKU goes on sale. Send an enquiry and we will confirm stock and price.</p>') +
            '' +
            '<div class="pd-pack">' +
              '<span class="micro">What you get in your pack</span>' +
              (p.packContents ? '<pre class="pd-pack-list">' + esc(p.packContents) + '</pre>'
                              : '<p class="body-sm" style="margin-top:8px">' + C.MISSING + ' \u2014 pack contents are confirmed against the physical product before publishing.</p>') +
            '</div>' +
            '<div class="pd-spec"><span class="micro">Specifications</span><dl>' +
              spec.map(function (r) { return '<div><dt>' + esc(r[0]) + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') +
            '</dl></div>' +
            '<p class="pd-note">Free delivery on orders of ' + C.money(R.freeDeliveryFrom) + ' or more to a single address. Below that, delivery is charged as per the shipping rule for your location.</p>' +
          '</div>' +
        '</div>' +
        /* Similar products — reuses the listing card component, so pricing,
           availability, quantity and Add to cart behave identically. */
        (function () {
          var sim = C.similar(p, 6);
          if (!sim.length) return '';
          return '<section class="pd-similar">' +
            '<div class="pd-similar-head">' +
              '<span class="kicker">Similar products</span>' +
              '<a class="link-cta" href="../corsa-ptmt-bath-fittings/index.html">View all CORSA &rarr;</a>' +
            '</div>' +
            '<div class="sp-grid pd-similar-grid">' + sim.map(card).join('') + '</div>' +
          '</section>';
        })();
    }
  }

  /* --------------------------------------------------------------- actions */
  doc.addEventListener('click', function (ev) {
    var add = ev.target.closest('[data-add]');
    if (add && !add.disabled) {
      var sku = add.getAttribute('data-add');
      var sel = add.getAttribute('data-from') ? $(add.getAttribute('data-from')) : $('.sp-qty', add.closest('.sp-card') || doc);
      if (addToCart(sku, sel ? +sel.value : 1)) {
        add.textContent = 'Added \u2713';
        setTimeout(function () { add.textContent = 'Add to cart'; }, 1400);
        openCart();
      }
      return;
    }
    var buy = ev.target.closest('[data-buynow]');
    if (buy && !buy.disabled) {
      var s2 = buy.getAttribute('data-buynow');
      var from = buy.getAttribute('data-from');
      var q2 = from ? $(from) : $('.sp-qty', buy.closest('.sp-card') || doc);
      if (addToCart(s2, q2 ? +q2.value : 1)) location.href = '../cart/index.html';
    }
  });

  /* ----------------------------------------------------------- cart drawer */
  var panel = $('#cart-panel');
  function openCart() { if (panel) { panel.classList.add('is-open'); paintCart(); } }
  function closeCart() { if (panel) panel.classList.remove('is-open'); }
  $$('[data-open-cart]').forEach(function (b) { on(b, 'click', openCart); });
  $$('[data-close-cart]').forEach(function (b) { on(b, 'click', closeCart); });
  on(panel, 'click', function (e) { if (e.target === panel) closeCart(); });
  on(doc, 'keydown', function (e) { if (e.key === 'Escape') closeCart(); });

  function paintCart() {
    var body = $('#cart-body'), foot = $('#cart-foot');
    if (!body) return;
    var t = cartTotals();
    if (!t.lines.length) {
      body.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      if (foot) foot.hidden = true;
      return;
    }
    body.innerHTML = t.lines.map(function (l) {
      var opts = '';
      for (var i = R.minQty; i <= R.maxQtyPerSku; i++) opts += '<option value="' + i + '"' + (i === l.qty ? ' selected' : '') + '>' + i + '</option>';
      return '<div class="cart-line">' +
        '<span class="cart-thumb">' + media(l.p, null, true) + '</span>' +
        '<div class="cart-meta">' +
          '<strong>' + esc(l.p.title) + '</strong>' +
          '<span class="cart-sub">' + esc(l.p.sub) + '</span>' +
          '<span class="cart-unit">' + C.money(l.p.price) + ' each</span>' +
        '</div>' +
        '<div class="cart-ctl">' +
          '<label class="sr-only" for="cq-' + esc(l.p.key) + '">Quantity for ' + esc(l.p.key) + '</label>' +
          '<select id="cq-' + esc(l.p.key) + '" data-cartqty="' + esc(l.p.key) + '">' + opts + '</select>' +
          '<button type="button" class="cart-rm" data-remove="' + esc(l.p.key) + '" aria-label="Remove ' + esc(l.p.key) + '">Remove</button>' +
        '</div>' +
        '<span class="cart-line-total">' + C.money(l.line) + '</span>' +
      '</div>';
    }).join('');
    if (foot) {
      foot.hidden = false;
      foot.innerHTML =
        '<div class="cart-row"><span>Subtotal (' + t.units + ' PCS)</span><strong>' + C.money(t.sub) + '</strong></div>' +
        '<div class="cart-row"><span>Delivery</span><strong>' + (t.freeDelivery ? 'FREE' : 'Charged as per location') + '</strong></div>' +
        (t.freeDelivery
          ? '<p class="cart-note cart-note-ok">' + (t.badshahOnly
              ? 'Free home delivery \u2014 all India, every piece.'
              : 'Free delivery applied to this order.') + '</p>'
          : '<p class="cart-note">Add ' + C.money(t.shortfall) + ' more of CORSA products for free delivery. BADSHAH tarpaulin always ships free.</p>') +
        '<div class="btn-row" style="margin-top:14px">' +
          '<button type="button" class="btn btn-primary btn-lg" data-order>Place order on WhatsApp</button>' +
          '<button type="button" class="btn btn-quiet" data-clear-cart>Clear cart</button>' +
        '</div>' +
        '<p class="cart-note">Online payment is not enabled yet. Your order is sent to us with full details and we confirm price, delivery and payment directly.</p>';
    }
  }
  doc.addEventListener('change', function (ev) {
    var q = ev.target.closest('[data-cartqty]');
    if (q) setQty(q.getAttribute('data-cartqty'), +q.value);
  });
  doc.addEventListener('click', function (ev) {
    var rm = ev.target.closest('[data-remove]');
    if (rm) { setQty(rm.getAttribute('data-remove'), 0); return; }
    if (ev.target.closest('[data-clear-cart]')) {
      /* Only ever removes this site's own cart key. */
      try { localStorage.removeItem(CART_KEY); } catch (e) {}
      paintCount();
      return;
    }
    if (ev.target.closest('[data-order]')) {
      var t = cartTotals();
      if (!t.lines.length) return;
      var msg = ['Order enquiry \u2014 Khalifa Trade & Impex (Shop)', ''];
      t.lines.forEach(function (l) {
        /* CORSA lines carry their SKU for picking; BADSHAH is identified by
           size + GSM + colour, which is its variant identity. */
        var ident = l.p.range === 'corsa' ? l.p.key : l.p.sub;
        msg.push(l.p.title + ' | ' + ident + ' | ' + l.qty + ' PCS | ' + C.money(l.p.price) + ' each = ' + C.money(l.line));
      });
      msg.push('', 'Subtotal: ' + C.money(t.sub) + ' (' + t.units + ' PCS)');
      msg.push('Delivery: ' + (t.freeDelivery ? 'FREE' : 'to be confirmed'));
      msg.push('', 'Please confirm availability and delivery.');
      window.open('https://wa.me/919825284842?text=' + encodeURIComponent(msg.join('\n')), '_blank', 'noopener');
    }
  });

  paintCount();
})();
