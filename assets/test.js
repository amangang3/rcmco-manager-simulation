/* Logic checks for test.html. Linked from nowhere. Also runs under node (see BUILD_SPEC.md). */
(function () {
  "use strict";
  var RCM = window.RCM, L = window.RCM_LOGIC, S = window.RCM_SCRIPT;
  var results = [];
  function check(name, ok) { results.push({ name: name, ok: !!ok }); }

  var ids = RCM.nurses.map(function (n) { return n.id; });
  var labelIds = RCM.labels.map(function (l) { return l.id; });

  // Every assignment of a label (or none) to each nurse.
  var all = [];
  (function walk(i, picks) {
    if (i === ids.length) { all.push(Object.assign({}, picks)); return; }
    [null].concat(labelIds).forEach(function (l) {
      var next = Object.assign({}, picks);
      if (l) next[ids[i]] = l;
      walk(i + 1, next);
    });
  })(0, {});

  var valid = all.filter(L.quotaMet);
  check("Exactly 12 valid call assignments (found " + valid.length + ")", valid.length === 12);
  var perfect = valid.filter(function (p) {
    return L.score1(p).every(function (r) { return r.correct; });
  });
  check("Exactly one valid assignment scores 4 of 4", perfect.length === 1);

  var invalidOk = all.filter(function (p) {
    var c = {};
    Object.keys(p).forEach(function (k) { c[p[k]] = (c[p[k]] || 0) + 1; });
    var isValid = Object.keys(p).length === 4 && c.champion === 2 && c.coach === 1 && c.flag === 1;
    return !isValid && L.quotaMet(p);
  });
  check("quotaMet is false for every invalid assignment (" + (all.length - valid.length) + " checked)", invalidOk.length === 0);

  var answerCounts = {};
  RCM.nurses.forEach(function (n) { answerCounts[n.answer] = (answerCounts[n.answer] || 0) + 1; });
  check("The answer key itself meets the quotas", RCM.labels.every(function (l) { return answerCounts[l.id] === l.quota; }));

  RCM.nurses.forEach(function (n) {
    check("Right-call line for " + n.name, typeof S.ex1.right[n.id] === "string" && S.ex1.right[n.id].length > 0);
    check("Floor note for " + n.name, typeof S.ex1.floor[n.id] === "string" && S.ex1.floor[n.id].length > 0);
    labelIds.filter(function (l) { return l !== n.answer; }).forEach(function (l) {
      var line = S.ex1.wrong[n.id] && S.ex1.wrong[n.id][l];
      check("Consequence line for " + n.name + " as " + l, typeof line === "string" && line.length > 0);
    });
  });
  labelIds.forEach(function (l) {
    check("Definition and framework zone for " + l, !!S.ex1.defs[l] && !!S.ex1.fw.zones[l] && !!S.ex1.counter_names[l]);
  });

  var right2 = { b: "agent", c: "people" }, swapped = { b: "people", c: "agent" };
  function count(r) { return r.filter(function (x) { return x.correct; }).length; }
  check("Exercise 2 right assignment scores 2 of 2", L.valid2(right2) && count(L.score2(right2)) === 2);
  check("Exercise 2 swapped assignment scores 0 of 2", L.valid2(swapped) && count(L.score2(swapped)) === 0);
  check("Exercise 2 rejects matching or missing roles",
    !L.valid2({ b: "agent", c: "agent" }) && !L.valid2({ b: "agent" }) && !L.valid2({}));
  RCM.champions.forEach(function (c) {
    check("Exercise 2 lines and bullets for Nurse " + c.id.toUpperCase(),
      !!S.ex2.right[c.id] && !!S.ex2.wrong[c.id] && S.ex2.bullets[c.id].length === 4);
  });

  check("Plot positions sit in their zones", RCM.nurses.every(function (n) {
    if (n.answer === "flag") return n.plot.y < 0.35;
    if (n.answer === "coach") return n.plot.y >= 0.35 && n.plot.x < 0.5;
    return n.plot.y >= 0.35 && n.plot.x >= 0.5;
  }));

  var passed = results.filter(function (r) { return r.ok; }).length;
  window.RCM_TEST_RESULTS = { passed: passed, total: results.length, results: results };

  if (typeof document !== "undefined" && document.getElementById("results")) {
    var ul = document.getElementById("results");
    results.forEach(function (r) {
      var li = document.createElement("li");
      li.className = r.ok ? "pass" : "fail";
      li.textContent = (r.ok ? "PASS  " : "FAIL  ") + r.name;
      ul.appendChild(li);
    });
    document.getElementById("summary").textContent = passed + " of " + results.length + " checks pass.";
    document.title = (passed === results.length ? "PASS" : "FAIL") + " · Logic checks";
  }
})();
