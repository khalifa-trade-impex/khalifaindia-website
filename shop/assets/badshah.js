/* BADSHAH tarpaulin — variant picker and table.
   Depends on badshah-data.js (window.BADSHAH) and shop.js (cart).
   Only valid GSM/colour combinations are ever selectable: 120 GSM is Yellow
   only, 200 GSM is Blue or Black. Invalid pairs cannot be constructed. */
(function () {
  'use strict';
  var B = window.BADSHAH;
  if (!B) return;

  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var sizeSel = $('#bd-size'), gsmSel = $('#bd-gsm'), colSel = $('#bd-colour');
  if (!sizeSel) return;

  var qtyOpts = '';
  for (var q = 1; q <= B.RULES.maxQtyPerLine; q++) qtyOpts += '<option value="' + q + '">' + q + ' PCS</option>';

  sizeSel.innerHTML = B.SIZES.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + '</option>'; }).join('');
  gsmSel.innerHTML = B.GSMS.map(function (g) { return '<option value="' + g + '">' + g + ' GSM</option>'; }).join('');

  /* Colour list is derived from the chosen GSM, so an invalid pair can never
     be selected. Keeps the current colour if it is still valid. */
  function syncColours() {
    var gsm = gsmSel.value;
    var allowed = B.coloursFor(gsm);
    var keep = colSel.value;
    colSel.innerHTML = allowed.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join('');
    if (allowed.indexOf(keep) >= 0) colSel.value = keep;
    colSel.disabled = allowed.length < 2;
    $('#bd-colour-note').textContent = allowed.length < 2
      ? gsm + ' GSM is available in ' + allowed[0] + ' only.'
      : gsm + ' GSM is available in ' + allowed.join(' or ') + '.';
  }

  function paint() {
    var v = B.find(sizeSel.value, gsmSel.value, colSel.value);
    var box = $('#bd-summary');
    if (!v) { box.innerHTML = '<p class="body-sm">That combination is not available.</p>'; return; }
    var buyable = B.purchasable(v);
    box.innerHTML =
      '<div class="bd-sum-price">' +
        '<span class="pr-now">' + B.money(v.price) + '</span>' +
        '<span class="pr-mrp">' + B.money(v.mrp) + '</span>' +
        '<span class="pr-off">' + v.discountPct + '% OFF</span>' +
      '</div>' +
      '<dl class="bd-sum-spec">' +
        '<div><dt>Size</dt><dd>' + esc(v.size) + '</dd></div>' +
        '<div><dt>GSM</dt><dd>' + esc(v.gsm) + ' GSM</dd></div>' +
        '<div><dt>Colour</dt><dd>' + esc(v.colour) + '</dd></div>' +
        '<div><dt>' + esc(B.RULES.weightLabel) + '</dt><dd>~' + Number(v.weightKg).toFixed(2) + ' KG</dd></div>' +
      '</dl>' +
      '<p class="bd-free">FREE HOME DELIVERY &mdash; ALL INDIA</p>' +
      (buyable
        ? '<div class="sp-actions bd-actions">' +
            '<label class="sr-only" for="bd-qty">Quantity</label>' +
            '<select id="bd-qty" class="sp-qty">' + qtyOpts + '</select>' +
            '<button type="button" class="btn btn-primary btn-sm sp-add" data-add="' + esc(v.id) + '" data-from="#bd-qty">Add to cart</button>' +
            '<button type="button" class="btn btn-dark btn-sm sp-buy" data-buynow="' + esc(v.id) + '" data-from="#bd-qty">Buy now</button>' +
          '</div>'
        : '<div class="sp-actions bd-actions"><button type="button" class="btn btn-quiet btn-sm" disabled>Out of stock</button></div>') +
      '<p class="body-xs" style="margin-top:10px">Weight shown is a reference weight. Actual manufactured piece weight may vary slightly.</p>';
  }

  function jumpTo(v) {
    sizeSel.value = v.size;
    gsmSel.value = v.gsm;
    syncColours();
    colSel.value = v.colour;
    paint();
  }

  function renderTable() {
    $('#bd-tbody').innerHTML = B.VARIANTS.map(function (v) {
      var buyable = B.purchasable(v);
      return '<tr>' +
        '<td>' + esc(v.size) + '</td>' +
        '<td>' + esc(v.gsm) + '</td>' +
        '<td>' + esc(v.colour) + '</td>' +
        '<td class="num">~' + Number(v.weightKg).toFixed(2) + ' KG</td>' +
        '<td class="num"><span class="pr-mrp">' + B.money(v.mrp) + '</span></td>' +
        '<td class="num"><strong>' + B.money(v.price) + '</strong></td>' +
        '<td>' + (buyable
          ? '<button type="button" class="btn btn-quiet btn-sm bd-pick" data-pick="' + esc(v.id) + '">Select</button>'
          : '<span class="body-xs">Out of stock</span>') + '</td>' +
      '</tr>';
    }).join('');
  }

  gsmSel.addEventListener('change', function () { syncColours(); paint(); });
  sizeSel.addEventListener('change', paint);
  colSel.addEventListener('change', paint);

  doc.addEventListener('click', function (ev) {
    var pick = ev.target.closest('[data-pick]');
    if (!pick) return;
    var v = B.byId(pick.getAttribute('data-pick'));
    if (v) {
      jumpTo(v);
      var picker = $('.bd-picker');
      if (picker) window.scrollTo({ top: picker.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    }
  });

  syncColours();
  paint();
  renderTable();
})();
