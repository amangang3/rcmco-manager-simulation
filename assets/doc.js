/* The two scrolling documents: Your team (index.html) and the facilitator guide (facilitate.html). */
(function () {
  "use strict";
  var RCM = window.RCM, SC = window.RCM_SCRIPT, UI = window.RCM_UI;
  var el = UI.el, text = UI.text;
  var main = document.getElementById("main");
  var page = document.body.getAttribute("data-page");

  function head(S, lede) {
    return [
      el("p", { class: "eyebrow", text: S.eyebrow }),
      el("h1", { text: S.title }),
      lede
    ];
  }

  function section(s, body) {
    return el("section", {}, [
      el("p", { class: "eyebrow", text: s.eyebrow }),
      el("h2", { text: s.heading })
    ].concat(body));
  }

  function paras(list) { return (list || []).map(function (p) { return el("p", { text: text(p) }); }); }

  function intro() {
    var S = SC.intro;
    document.title = S.page_title;
    head(S, el("p", { class: "standfirst", text: S.standfirst })).forEach(function (n) { main.appendChild(n); });
    S.sections.forEach(function (s) {
      main.appendChild(section(s, paras(s.body).concat([
        s.steps ? el("ol", { class: "steps-list" }, s.steps.map(function (t) { return el("li", { text: text(t) }); })) : null,
        s.after ? el("p", { class: "after", text: s.after }) : null
      ])));
    });
    main.appendChild(el("div", { class: "begin" }, [
      el("a", { class: "btn", href: SC.nav.steps[1].href, text: S.begin }),
      el("a", { class: "link", href: SC.nav.guide_href, text: S.guide_link })
    ]));
    main.appendChild(el("p", { class: "fine disclaimer", text: RCM.meta.disclaimer }));
  }

  function guide() {
    var S = SC.guide;
    document.title = S.page_title;
    head(S, el("p", { class: "lede", text: S.lede })).forEach(function (n) { main.appendChild(n); });
    S.sections.forEach(function (s) {
      var body = [];
      if (s.quote) body.push(el("blockquote", { class: "quote", text: s.quote }));
      if (s.timeline) body.push(el("dl", { class: "timeline" }, s.timeline.reduce(function (acc, row) {
        return acc.concat([el("dt", { text: row.t }), el("dd", { text: row.v })]);
      }, [])));
      if (s.tip) body.push(el("div", { class: "tip" }, [el("strong", { text: s.tip_label }), el("p", { text: s.tip })]));
      if (s.questions) body.push(el("ol", { class: "numbered" }, s.questions.map(function (q) { return el("li", { text: q }); })));
      if (s.research) body.push(el("ul", { class: "bulleted" }, s.research.map(function (q) { return el("li", { text: q }); })));
      if (s.after) body.push(el("p", { class: "after", text: s.after }));
      main.appendChild(section(s, body));
    });
    main.appendChild(el("div", { class: "begin" }, [
      el("a", { class: "link", href: SC.nav.steps[0].href, text: S.back })
    ]));
    main.appendChild(el("p", { class: "fine disclaimer", text: RCM.meta.disclaimer }));
  }

  if (page === "index") intro();
  if (page === "facilitate") guide();
})();
