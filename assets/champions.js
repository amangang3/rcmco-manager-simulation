/* Exercise 2: Your champions. Give Nurse B and Nurse C one job each, lock in, then reveal Framework 2. */
(function () {
  "use strict";
  var RCM = window.RCM, L = window.RCM_LOGIC, UI = window.RCM_UI, S = window.RCM_SCRIPT.ex2;
  var el = UI.el, text = UI.text;
  var main = document.getElementById("main");
  var ids = RCM.champions.map(function (c) { return c.id; });
  var roles, reasons, locked, cards, side;

  document.title = S.page_title;

  function other(roleId) {
    return RCM.roles.filter(function (r) { return r.id !== roleId; })[0].id;
  }

  function nurseCard(id) {
    var n = UI.nurse(id);
    var card = el("section", { class: "card ncard", "aria-label": n.name }, [
      el("div", { class: "ncard-head" }, [
        el("h2", { text: n.name }),
        el("p", { class: "stats", text: text(S.stats, {
          letters: n.letters, quality: n.quality, edited: n.edited, notes: n.notes }) })
      ]),
      el("ul", {}, S.bullets[id].map(function (b) { return el("li", { text: b }); })),
      el("div", { class: "choice", role: "group", "aria-label": text(S.pick_label, { name: n.name }) }, [
        el("span", { class: "choice-label", "aria-hidden": "true", text: text(S.pick_label, { name: n.name }) })
      ].concat(RCM.roles.map(function (r) {
        return el("button", {
          type: "button", class: "opt", "data-nurse": id, "data-role": r.id, "aria-pressed": "false",
          text: r.short, on: { click: function () { choose(id, r.id); } }
        });
      }))),
      el("div", { class: "reason" }, [
        el("label", { for: "reason-" + id, text: S.reason_label }),
        el("textarea", { id: "reason-" + id, rows: "2", maxlength: "200", placeholder: S.reason_placeholder,
          on: { input: function (ev) { reasons[id] = ev.target.value; update(); } } })
      ])
    ]);
    cards[id] = card;
    return card;
  }

  function roleCards() {
    return [el("h2", { class: "eyebrow", text: S.roles_title })].concat(RCM.roles.map(function (r) {
      return el("div", { class: "card role" }, [
        el("h3", { text: r.short }),
        el("p", { class: "formal", text: r.name }),
        el("p", { text: S.role_desc[r.id] })
      ]);
    })).concat([
      el("div", { class: "panel-foot" }, [
        el("p", { class: "rule", text: S.rule }),
        el("div", { class: "actions" }, [
          el("button", { type: "button", class: "btn", id: "lock", disabled: true, text: S.lock,
            on: { click: reveal } })
        ])
      ])
    ]);
  }

  function build() {
    roles = {};
    reasons = {};
    locked = false;
    cards = {};
    main.textContent = "";
    side = el("aside", { class: "panel roles", "aria-label": S.roles_title }, roleCards());
    main.appendChild(el("div", { class: "task" }, [
      el("p", { class: "eyebrow", text: S.eyebrow }),
      el("h1", { text: S.task })
    ]));
    main.appendChild(el("div", { class: "split split-55" }, [
      el("div", { class: "nurses" }, ids.map(nurseCard)),
      side
    ]));
  }

  // Picking a job for one nurse gives the other nurse the other job, so there is one decision.
  function choose(id, roleId) {
    if (locked) return;
    ids.forEach(function (n) { roles[n] = n === id ? roleId : other(roleId); });
    ids.forEach(function (n) {
      Array.prototype.forEach.call(cards[n].querySelectorAll(".opt"), function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-role") === roles[n] ? "true" : "false");
      });
    });
    update();
  }

  function update() {
    document.getElementById("lock").disabled = !L.valid2Reasons(roles, reasons);
  }

  function framework() {
    var fw = S.fw;
    return el("table", { class: "fw2" }, [
      el("caption", { class: "sr-only", text: fw.title }),
      el("thead", {}, [el("tr", {}, [el("td")].concat(RCM.roles.map(function (r) {
        return el("th", { scope: "col" }, [
          el("span", { class: "plain", text: r.short }),
          el("span", { class: "formal", text: r.name })
        ]);
      })))]),
      el("tbody", {}, fw.rows.map(function (row) {
        return el("tr", {}, [el("th", { scope: "row", text: row.k })].concat(RCM.roles.map(function (r) {
          return el("td", { text: row[r.id] });
        })));
      }))
    ]);
  }

  function reveal() {
    if (!L.valid2Reasons(roles, reasons) || locked) return;
    locked = true;
    var results = L.score2(roles);
    var right = results.filter(function (r) { return r.correct; }).length;

    results.forEach(function (r, i) {
      var card = cards[r.id];
      Array.prototype.forEach.call(card.querySelectorAll(".opt, textarea"), function (b) { b.disabled = true; });
      card.appendChild(el("div", { class: "result enter", style: { "--i": i } }, [
        UI.mark(r.correct, S.mark_right, S.mark_wrong),
        el("div", { class: "result-body" }, [
          el("p", { class: "your-reason" }, [
            el("span", { class: "who", text: S.your_reason + " " }),
            "\u201c" + reasons[r.id].trim() + "\u201d"
          ]),
          el("p", { class: "reveal-line" }, [
            el("span", { class: "who", text: text(S.your_pick, { role: UI.role(r.picked).short }) + ". " }),
            r.correct ? S.right[r.id] : S.wrong[r.id]
          ]),
          el("p", { class: "reason-check", text: S.reason_check[r.id] })
        ])
      ]));
    });

    side.textContent = "";
    side.className = "card panel";
    side.setAttribute("aria-label", S.fw.eyebrow);
    var score = el("p", { class: "score", tabindex: "-1", "aria-live": "polite",
      text: text(S.score, { right: right, total: results.length }) });
    [
      el("div", { class: "fw-head enter", style: { "--i": 0 } }, [
        el("p", { class: "eyebrow", text: S.fw.eyebrow }),
        el("h2", { text: S.fw.title })
      ]),
      el("div", { class: "enter", style: { "--i": 1 } }, [framework()]),
      el("div", { class: "diff enter", style: { "--i": 2 } }, [
        el("h3", { text: S.fw.change_title }),
        el("dl", {}, S.fw.change.reduce(function (acc, row) {
          return acc.concat([el("dt", { text: row.k }), el("dd", { text: row.v })]);
        }, []))
      ]),
      el("p", { class: "closing enter", style: { "--i": 3 }, text: S.closing }),
      el("div", { class: "panel-foot enter", style: { "--i": 4 } }, [
        score,
        el("p", { class: "end", text: S.end }),
        el("div", { class: "actions" }, [
          el("a", { class: "btn", href: "followup.html", text: S.next }),
          el("a", { class: "link", href: "index.html", text: S.back }),
          el("button", { type: "button", class: "link", text: S.reset, on: { click: startOver } })
        ])
      ])
    ].forEach(function (n) { side.appendChild(n); });
    score.focus({ preventScroll: true });
  }

  function startOver() {
    build();
    var first = main.querySelector(".opt");
    if (first) first.focus();
  }

  build();
})();
