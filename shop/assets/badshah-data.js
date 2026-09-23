/* BADSHAH HDPE Laminated Tarpaulin — retail shop data.
   SOURCE: BADSHAH_Tarpaulin_ShopNow_Implementation_Reference.pdf (client-supplied).
   Sizes, approximate weights and MRP are taken verbatim from that chart.
   Nothing here is estimated or recalculated from rounded weights.

   RULES ENCODED (do not relax without client instruction):
     * Online range is 120 GSM and 200 GSM ONLY. 100/150/180/250 GSM are not sold online.
     * 120 GSM = Yellow only.  200 GSM = Blue or Black.  No other combination is valid.
     * 13 sizes x (1 colour @120 + 2 colours @200) = 39 sellable variants.
     * Weight is a REFERENCE weight and must always be shown as "Approx. Weight".
       Never label it Actual / Guaranteed / Exact weight.
     * FREE HOME DELIVERY on every single piece, all India. The CORSA 1,000
       threshold does NOT apply to BADSHAH.
     * Variant identity is SIZE + GSM + COLOUR. No SKU is required.

   Adding/editing later: every field below is overridable from the private
   admin editor (same override mechanism as CORSA), or edit this file directly. */
(function () {
  var PRODUCT_NAME = 'BADSHAH HDPE LAMINATED TARPAULIN';
  var SOURCE_CLAIM = '100% Waterproof';

  var RULES = {
    discountPct: 15,
    freeDeliveryAllOrders: true,      // every single piece, all India
    minOrderForFreeDelivery: null,    // explicitly no threshold
    maxQtyPerLine: 10,
    defaultAvailability: 'AVAILABLE',
    weightLabel: 'Approx. Weight',
    codDefault: 'NOT SET',
    shippingCategory: 'FREE HOME DELIVERY — ALL INDIA',
    returnPolicy: 'MANUAL / NOT SPECIFIED'   // client decides later
  };

  var GSM_COLOURS = { '120': ['Yellow'], '200': ['Blue', 'Black'] };

  /* [size, wt120, mrp120, sell120, wt200, mrp200, sell200] — verbatim from the chart */
  var CHART = [["12 × 15 FT",2,940,799,3.4,1598,1358.3],["15 × 15 FT",2.51,1178.93,1002.09,4.18,1964.88,1670.15],["15 × 18 FT",3.01,1414.72,1202.51,5.02,2357.86,2004.18],["18 × 21 FT",4.21,1980.6,1683.51,7.02,3301,2805.85],["18 × 24 FT",4.82,2263.55,1924.02,8.03,3772.58,3206.69],["18 × 30 FT",6.02,2829.43,2405.02,10.03,4715.72,4008.36],["18 × 36 FT",7.22,3395.32,2886.02,12.04,5658.86,4810.03],["24 × 24 FT",6.42,3018.06,2565.35,10.7,5030.1,4275.59],["24 × 30 FT",8.03,3772.58,3206.69,13.38,6287.63,5344.49],["24 × 36 FT",9.63,4527.09,3848.03,16.05,7545.15,6413.38],["24 × 40 FT",10.7,5030.1,4275.59,17.84,8383.5,7125.97],["30 × 30 FT",10.03,4715.72,4008.36,16.72,7859.53,6680.6],["30 × 36 FT",12.04,5658.86,4810.03,20.07,9431.44,8016.72]];

  var VARIANTS = [];
  CHART.forEach(function (r, rowIdx) {
    [['120', r[1], r[2], r[3]], ['200', r[4], r[5], r[6]]].forEach(function (g) {
      var gsm = g[0];
      GSM_COLOURS[gsm].forEach(function (colour) {
        VARIANTS.push({
          id: 'badshah-' + r[0].replace(/[^0-9]+/g, 'x').replace(/^x|x$/g, '') + '-' + gsm + '-' + colour.toLowerCase(),
          product: PRODUCT_NAME,
          size: r[0],
          gsm: gsm,
          colour: colour,
          weightKg: g[1],
          mrp: g[2],
          price: g[3],
          discountPct: RULES.discountPct,
          image: '../assets/img/badshah-tarpaulin-product.jpg',   // default; per-variant photos overridable
          availability: RULES.defaultAvailability,
          cod: RULES.codDefault,
          shippingCategory: RULES.shippingCategory,
          returnPolicy: RULES.returnPolicy,
          description: null,
          offers: null,
          rowIdx: rowIdx
        });
      });
    });
  });

  /* ---- admin overrides (same pattern as CORSA) -------------------------- */
  var OVERRIDES = {};   // paste exported JSON here to publish permanently
  var OV_KEY = 'kti_badshah_overrides_v1';
  function readOverrides() {
    var live = {};
    try { live = JSON.parse(localStorage.getItem(OV_KEY) || '{}'); } catch (e) {}
    var merged = {};
    Object.keys(OVERRIDES).forEach(function (k) { merged[k] = Object.assign({}, OVERRIDES[k]); });
    Object.keys(live).forEach(function (k) { merged[k] = Object.assign({}, merged[k] || {}, live[k]); });
    return merged;
  }
  (function apply() {
    var ov = readOverrides();
    VARIANTS.forEach(function (v) {
      var o = ov[v.id];
      if (!o) return;
      Object.keys(o).forEach(function (f) {
        if (f === 'id' || o[f] === '' || o[f] == null) return;
        v[f] = o[f];
      });
      if (o.mrp != null || o.discountPct != null) {
        var m = Number(v.mrp), p = Number(v.discountPct);
        if (!isNaN(m) && !isNaN(p)) v.price = +(m * (1 - p / 100)).toFixed(2);
      }
    });
  })();

  function money(n) {
    if (n == null) return '—';
    return '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  window.BADSHAH = {
    NAME: PRODUCT_NAME,
    CLAIM: SOURCE_CLAIM,
    RULES: RULES,
    GSM_COLOURS: GSM_COLOURS,
    SIZES: CHART.map(function (r) { return r[0]; }),
    GSMS: ['120', '200'],
    VARIANTS: VARIANTS,
    OV_KEY: OV_KEY,
    readOverrides: readOverrides,

    coloursFor: function (gsm) { return (GSM_COLOURS[String(gsm)] || []).slice(); },

    isValid: function (gsm, colour) {
      return (GSM_COLOURS[String(gsm)] || []).indexOf(colour) >= 0;
    },

    find: function (size, gsm, colour) {
      for (var i = 0; i < VARIANTS.length; i++) {
        var v = VARIANTS[i];
        if (v.size === size && v.gsm === String(gsm) && v.colour === colour) return v;
      }
      return null;
    },

    byId: function (id) {
      for (var i = 0; i < VARIANTS.length; i++) if (VARIANTS[i].id === id) return VARIANTS[i];
      return null;
    },

    purchasable: function (v) { return !!v && v.price != null && v.availability === 'AVAILABLE'; },

    label: function (v) { return v.size + ' · ' + v.gsm + ' GSM · ' + v.colour; },

    weightText: function (v) { return RULES.weightLabel + ': ~' + Number(v.weightKg).toFixed(2) + ' KG'; },

    saveOverride: function (id, field, value) {
      if (field === 'id') return false;
      var live = {};
      try { live = JSON.parse(localStorage.getItem(OV_KEY) || '{}'); } catch (e) {}
      live[id] = live[id] || {};
      if (value === '' || value == null) delete live[id][field]; else live[id][field] = value;
      if (!Object.keys(live[id]).length) delete live[id];
      localStorage.setItem(OV_KEY, JSON.stringify(live));
      var v = this.byId(id);
      if (v) {
        v[field] = (value === '' || value == null) ? null : value;
        if (field === 'mrp' || field === 'discountPct') {
          var m = Number(v.mrp), p = Number(v.discountPct);
          if (!isNaN(m) && !isNaN(p)) v.price = +(m * (1 - p / 100)).toFixed(2);
        }
      }
      return true;
    },

    money: money
  };
})();
