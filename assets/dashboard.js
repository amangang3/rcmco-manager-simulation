/* Exercise 1: Your dashboard. Give each nurse one call, lock in, then reveal Framework 1. */
(function () {
  "use strict";
  var RCM = window.RCM, L = window.RCM_LOGIC, UI = window.RCM_UI, S = window.RCM_SCRIPT.ex1;
  var el = UI.el, text = UI.text;
  var main = document.getElementById("main");
  var metrics = ["letters", "quality", "used", "edited", "notes"];
  var percent = { quality: true, used: true, edited: true };
  var picks, locked, rows, side;

  document.title = S.page_title;

  function pct(v, scale) {
    return Math.max(0, Math.min(100, (v - scale.min) / (scale.max - scale.min) * 100)) + "%";
  }

  function metricCell(n, key) {
    var scale = RCM.scales[key];
    var shown = percent[key] ? n[key] + "%" : String(n[key]);
    var tick = key === "letters" ? RCM.targets.letters : key === "quality" ? RCM.targets.quality : null;
    return el("td", { class: "cell-metric", "data-label": S.cols[key] }, [
      el("div", { class: "metric-val", text: shown }),
      el("div", { class: "bar", "aria-hidden": "true" }, [
        el("div", { class: "bar-fill", style: { width: pct(n[key], scale) } }),
        tick === null ? null : el("div", { class: "bar-tick", style: { left: pct(tick, scale) } })
      ])
    ]);
  }

  function header(key) {
    var sub = S.cols[key + "_sub"];
    return el("th", { scope: "col", class: "col-metric" }, [
      S.cols[key], sub ? el("small", { text: text(sub) }) : null
    ]);
  }

  function pills(n) {
    return el("div", { class: "pills", role: "group", "aria-label": n.name + ": " + S.cols.call },
      RCM.labels.map(function (l) {
        return el("button", {
          type: "button", class: "pill pill-" + l.id, "data-nurse": n.id, "data-label": l.id,
          "aria-pressed": "false", text: l.name,
          on: { click: function () { choose(n.id, l.id); } }
        });
      }));
  }

  function buildTable() {
    rows = {};
    var tbody = el("tbody");
    RCM.nurses.forEach(function (n, i) {
      var last = i === RCM.nurses.length - 1;
      var tr = el("tr", { class: "nurse-row" + (last ? " last" : "") }, [
        el("th", { scope: "row", class: "cell-nurse" }, [
          el("div", { class: "nurse-name", text: n.name }),
          el("div", { class: "floor", text: S.floor[n.id] })
        ])
      ].concat(metrics.map(function (k) { return metricCell(n, k); })).concat([
        el("td", { class: "cell-call" }, [pills(n)])
      ]));
      tbody.appendChild(tr);
      rows[n.id] = tr;
    });
    return el("table", {}, [
      el("caption", { class: "sr-only", text: S.table_label }),
      el("colgroup", {}, [el("col", { class: "col-nurse" })]
        .concat(metrics.map(function () { return el("col", { class: "col-metric" }); }))
        .concat([el("col", { class: "col-call" })])),
      el("thead", {}, [el("tr", {}, [
        el("th", { scope: "col", class: "col-nurse", text: S.cols.nurse })
      ].concat(metrics.map(header)).concat([
        el("th", { scope: "col", class: "col-call", text: S.cols.call })
      ]))]),
      tbody
    ]);
  }

  function counterLine() {
    var parts = [];
    L.counts(picks).forEach(function (c, i) {
      if (i) parts.push(el("span", { class: "sep", "aria-hidden": "true", text: "·" }));
      parts.push(el("span", {
        class: c.count === c.quota ? "met" : "unmet",
        text: text(S.counter_item, { name: S.counter_names[c.id], count: c.count, quota: c.quota })
      }));
    });
    return parts;
  }

  function buildDecide() {
    var counter = el("p", { class: "counter", id: "counter", "aria-live": "polite" }, counterLine());
    var lock = el("button", {
      type: "button", class: "btn", id: "lock", disabled: true, text: S.lock,
      on: { click: reveal }
    });
    return [
      el("h2", { text: S.defs_title }),
      el("div", { class: "defs" }, RCM.labels.map(function (l) {
        return el("div", { class: "def" }, [
          el("div", { class: "def-name word-" + l.id, text: l.name }),
          el("p", { text: S.defs[l.id] })
        ]);
      })),
      el("div", { class: "panel-foot" }, [
        el("p", { class: "eyebrow", text: S.counter_title }),
        counter,
        el("p", { class: "rule", text: S.counter_rule }),
        el("div", { class: "actions" }, [lock])
      ])
    ];
  }

  function build() {
    picks = {};
    locked = false;
    main.textContent = "";
    side = el("aside", { class: "card panel", "aria-label": S.defs_title }, buildDecide());
    main.appendChild(el("div", { class: "task" }, [
      el("p", { class: "eyebrow", text: S.eyebrow }),
      el("h1", { text: S.task })
    ]));
    main.appendChild(el("div", { class: "split split-60" }, [
      el("section", { class: "card dash", "aria-label": S.table_label }, [
        el("p", { class: "eyebrow dash-title", "aria-hidden": "true", text: S.table_label }),
        buildTable()
      ]),
      side
    ]));
  }

  function choose(nurseId, labelId) {
    if (locked) return;
    picks[nurseId] = labelId;
    Array.prototype.forEach.call(rows[nurseId].querySelectorAll(".pill"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-label") === labelId ? "true" : "false");
    });
    var counter = document.getElementById("counter");
    counter.textContent = "";
    counterLine().forEach(function (p) { counter.appendChild(p); });
    document.getElementById("lock").disabled = !L.quotaMet(picks);
  }

  // ---------- Reveal ----------

  function tag(labelId) {
    return el("span", { class: "tag tag-" + labelId, text: UI.label(labelId).name });
  }

  function revealRows(results) {
    results.forEach(function (r, i) {
      var tr = rows[r.id];
      var last = i === results.length - 1;
      var cell = tr.querySelector(".cell-call");
      cell.textContent = "";
      cell.appendChild(el("div", { class: "result enter", style: { "--i": i } }, [
        tag(r.answer),
        el("span", { class: "mark" }, [
          UI.mark(r.correct, S.mark_right, S.mark_wrong),
          text(S.your_call, { call: UI.label(r.picked).name })
        ])
      ]));
      tr.classList.add("has-reveal");
      tr.classList.remove("last");
      var line = r.correct ? S.right[r.id] : S.wrong[r.id][r.picked];
      var reveal = el("tr", { class: "reveal-row" + (last ? " last" : "") }, [
        el("td", { colspan: String(metrics.length + 2) }, [
          el("p", { class: "reveal-line enter", style: { "--i": i }, text: line })
        ])
      ]);
      tr.parentNode.insertBefore(reveal, tr.nextSibling);
    });
  }

  function grid() {
    var fw = S.fw;
    function zone(id) {
      var z = fw.zones[id];
      // The group writes its own intervention here. Nothing is scored, stored or sent.
      return el("div", { class: "zone zone-" + id }, [
        el("div", { class: "zone-text" }, [
          el("div", { class: "zone-name word-" + id, text: z.label }),
          el("p", { class: "zone-def", text: z.def }),
          el("textarea", {
            class: "zone-input", rows: "2", maxlength: "160",
            placeholder: fw.intervention_placeholder,
            "aria-label": text(fw.intervention_label, { type: z.label })
          })
        ])
      ]);
    }
    var dots = el("div", { class: "dots" }, RCM.nurses.map(function (n, i) {
      return el("div", {
        class: "dot dot-" + n.answer + " enter", role: "img",
        "aria-label": text(fw.dot_label, { name: n.name, zone: UI.label(n.answer).name }),
        style: { left: n.plot.x * 100 + "%", top: (1 - n.plot.y) * 100 + "%", "--i": i }
      }, [el("span", { "aria-hidden": "true", text: n.id.toUpperCase() })]);
    }));
    return el("div", { class: "fw enter", style: { "--i": 0 } }, [
      el("div", { class: "fw-ylabel" }, [fw.y, " ", el("small", { text: fw.y_sub })]),
      el("div", { class: "fw-yticks", "aria-hidden": "true" }, [
        el("span", { text: fw.high }), el("span", { text: fw.low })
      ]),
      el("div", { class: "fw-plot" }, RCM.zones.map(zone).concat([dots])),
      el("div", { class: "fw-xticks", "aria-hidden": "true" }, [
        el("span", { text: fw.low }), el("span", { text: fw.high })
      ]),
      el("div", { class: "fw-xlabel" }, [fw.x, " ", el("small", { text: fw.x_sub })])
    ]);
  }

  function diffBox() {
    return el("div", { class: "diff enter", style: { "--i": 2 } }, [
      el("h3", { text: S.fw.box_title }),
      el("dl", {}, S.fw.box.reduce(function (acc, row, i) {
        var isKey = i === S.fw.box.length - 1;
        return acc.concat([el("dt", { text: row.k }), el("dd", { class: isKey ? "key" : null, text: row.v })]);
      }, []))
    ]);
  }

  function reveal() {
    if (!L.quotaMet(picks) || locked) return;
    locked = true;
    var results = L.score1(picks);
    var right = results.filter(function (r) { return r.correct; }).length;
    revealRows(results);

    side.textContent = "";
    side.setAttribute("aria-label", S.fw.eyebrow);
    var score = el("p", { class: "score", tabindex: "-1", "aria-live": "polite",
      text: text(S.score, { right: right, total: results.length }) });
    [
      el("div", { class: "fw-head enter", style: { "--i": 0 } }, [
        el("p", { class: "eyebrow", text: S.fw.eyebrow }),
        el("h2", { text: S.fw.title })
      ]),
      grid(),
      diffBox(),
      el("div", { class: "panel-foot enter", style: { "--i": 3 } }, [
        score,
        el("div", { class: "actions" }, [
          el("a", { class: "btn", href: "champions.html", text: S.next }),
          el("button", { type: "button", class: "link", text: S.reset, on: { click: startOver } })
        ])
      ])
    ].forEach(function (n) { side.appendChild(n); });
    score.focus({ preventScroll: true });
  }

  function startOver() {
    build();
    var first = main.querySelector(".pill");
    if (first) first.focus();
  }

  build();
})();
