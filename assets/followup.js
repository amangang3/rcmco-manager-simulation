/* Part 3 (optional): Next week. The group writes a short plan, then compares it with four approaches.
   Nothing is scored, stored or sent. */
(function () {
  "use strict";
  var RCM = window.RCM, UI = window.RCM_UI, S = window.RCM_SCRIPT.ex3;
  var el = UI.el;
  var main = document.getElementById("main");
  var MIN_PLAN = 20;
  var side, plan, show;

  document.title = S.page_title;

  // Always the answer calls: the dashboard reveal has already shown them.
  function team() {
    return el("section", { class: "card panel team", "aria-label": S.team_title }, [
      el("h2", { class: "eyebrow", text: S.team_title }),
      el("ul", { class: "team-list" }, RCM.nurses.map(function (n) {
        return el("li", {}, [
          el("span", { class: "nurse-name", text: n.name }),
          el("span", { class: "tag tag-" + n.answer, text: UI.label(n.answer).name }),
          el("span", { class: "team-note", text: S.reminders[n.id] })
        ]);
      }))
    ]);
  }

  function build() {
    main.textContent = "";
    plan = el("textarea", { id: "plan", rows: "4", maxlength: "600", placeholder: S.plan_placeholder,
      on: { input: function () { show.disabled = plan.value.trim().length < MIN_PLAN; } } });
    show = el("button", { type: "button", class: "btn", disabled: true, text: S.show, on: { click: reveal } });
    side = el("section", { class: "card panel plan", "aria-label": S.plan_label }, [
      el("p", { class: "question", text: S.question }),
      el("div", { class: "reason" }, [el("label", { for: "plan", text: S.plan_label }), plan]),
      el("div", { class: "actions", id: "show-row" }, [show])
    ]);
    main.appendChild(el("div", { class: "task" }, [
      el("p", { class: "eyebrow", text: S.eyebrow }),
      el("h1", { text: S.task })
    ]));
    main.appendChild(el("div", { class: "split split-38" }, [team(), side]));
  }

  function reveal() {
    if (plan.value.trim().length < MIN_PLAN) return;
    plan.disabled = true;
    var row = document.getElementById("show-row");
    var title = el("h2", { class: "approaches-title", tabindex: "-1", text: S.approaches_title });
    side.replaceChild(el("div", { class: "approaches" }, [
      el("p", { class: "your-reason enter", style: { "--i": 0 } }, [
        el("span", { class: "who", text: S.your_plan + " " }), plan.value.trim()
      ]),
      el("div", { class: "enter", style: { "--i": 1 } }, [title]),
      el("ol", { class: "approach-list" }, S.approaches.map(function (a, i) {
        return el("li", { class: "enter", style: { "--i": i + 1 } }, [
          el("strong", { text: a.lead }), " ", a.text
        ]);
      })),
      el("p", { class: "reason-check enter", style: { "--i": 5 }, text: S.discuss }),
      el("div", { class: "panel-foot enter", style: { "--i": 6 } }, [
        el("p", { class: "end", text: S.end }),
        el("div", { class: "actions" }, [
          el("a", { class: "link", href: "index.html", text: S.back }),
          el("button", { type: "button", class: "link", text: S.reset, on: { click: startOver } })
        ])
      ])
    ]), row);
    title.focus({ preventScroll: true });
  }

  function startOver() {
    build();
    plan.focus();
  }

  build();
})();
