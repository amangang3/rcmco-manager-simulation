/* The flow. Renders the step nav on every page from RCM_SCRIPT.nav, marks the current step,
   and offers the small DOM helpers the page scripts share. */
(function () {
  "use strict";
  var RCM = window.RCM, S = window.RCM_SCRIPT, L = window.RCM_LOGIC;

  // Values every {placeholder} in the copy can draw on.
  var base = {
    letters: RCM.targets.letters,
    quality: RCM.targets.quality,
    before: RCM.targets.lettersBefore,
    total: RCM.nurses.length
  };

  function text(tpl, vals) { return L.fill(tpl, Object.assign({}, base, vals || {})); }

  // el("p", { class: "x", text: "..." }, [children])
  function el(tag, attrs, kids) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "text") node.textContent = v;
      else if (k === "on") Object.keys(v).forEach(function (ev) { node.addEventListener(ev, v[ev]); });
      else if (k === "style") Object.keys(v).forEach(function (p) { node.style.setProperty(p, v[p]); });
      else node.setAttribute(k, v === true ? "" : v);
    });
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function nurse(id) { return RCM.nurses.filter(function (n) { return n.id === id; })[0]; }
  function label(id) { return RCM.labels.filter(function (l) { return l.id === id; })[0]; }
  function role(id) { return RCM.roles.filter(function (r) { return r.id === id; })[0]; }

  // A tick or cross, with a text label for screen readers.
  function mark(ok, rightText, wrongText) {
    return el("span", { class: "glyph " + (ok ? "glyph-ok" : "glyph-no") }, [
      el("span", { "aria-hidden": "true", text: ok ? "✓" : "✕" }),
      el("span", { class: "sr-only", text: ok ? rightText : wrongText })
    ]);
  }

  function renderNav() {
    var host = document.getElementById("nav");
    if (!host) return;
    var page = document.body.getAttribute("data-page");
    var here = page + ".html";
    host.className = "nav";
    host.setAttribute("aria-label", S.nav.label);
    host.appendChild(el("div", { class: "nav-brand" }, [
      RCM.meta.org + " ", el("span", { text: "· " + RCM.meta.title })
    ]));
    host.appendChild(el("ol", { class: "nav-steps" }, S.nav.steps.map(function (s) {
      return el("li", {}, [
        el("a", { href: s.href, "aria-current": s.href === here ? "step" : null }, [
          el("span", { class: "nav-num", "aria-hidden": "true", text: String(s.n) }),
          el("span", { class: "sr-only", text: String(s.n) + ". " }),
          s.label
        ])
      ]);
    })));
    host.appendChild(el("a", {
      class: "nav-guide", href: S.nav.guide_href,
      "aria-current": S.nav.guide_href === here ? "page" : null, text: S.nav.guide
    }));
  }

  window.RCM_UI = { text: text, el: el, nurse: nurse, label: label, role: role, mark: mark };
  renderNav();
})();
