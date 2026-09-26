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
  check("Exactly 90 valid call assignments (found " + valid.length + ")", valid.length === 90);
  var perfect = valid.filter(function (p) {
    return L.score1(p).every(function (r) { return r.correct; });
  });
  check("Exactly one valid assignment scores 6 of 6", perfect.length === 1);

  var invalidOk = all.filter(function (p) {
    var c = {};
    Object.keys(p).forEach(function (k) { c[p[k]] = (c[p[k]] || 0) + 1; });
    var isValid = Object.keys(p).length === 6 && c.champion === 2 && c.coach === 2 && c.flag === 2;
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
  var wrongCount = 0;
  Object.keys(S.ex1.wrong).forEach(function (id) { wrongCount += Object.keys(S.ex1.wrong[id]).length; });
  check("Exactly 12 consequence lines (found " + wrongCount + ")", wrongCount === 12);
  labelIds.forEach(function (l) {
    check("Definition and counter name for " + l, !!S.ex1.defs[l] && !!S.ex1.counter_names[l]);
  });
  check("Four framework zones, each with label, definition and response", RCM.zones.length === 4 &&
    RCM.zones.every(function (z) { var x = S.ex1.fw.zones[z]; return x && x.label && x.def && x.response; }));
  check("Every nurse has a zone that exists and matches their call", RCM.nurses.every(function (n) {
    return RCM.zones.indexOf(n.zone) !== -1 && n.zone.indexOf(n.answer) === 0;
  }));

  var right2 = { b: "agent", c: "people" }, swapped = { b: "people", c: "agent" };
  function count(r) { return r.filter(function (x) { return x.correct; }).length; }
  check("Exercise 2 right assignment scores 2 of 2", L.valid2(right2) && count(L.score2(right2)) === 2);
  check("Exercise 2 swapped assignment scores 0 of 2", L.valid2(swapped) && count(L.score2(swapped)) === 0);
  var long = "Other nurses already trust them.", reasonsOk = { b: long, c: long };
  check("valid2Reasons is true with valid roles and two long reasons", L.valid2Reasons(right2, reasonsOk));
  check("valid2Reasons is false when a reason is missing", !L.valid2Reasons(right2, { b: long }) && !L.valid2Reasons(right2, {}) && !L.valid2Reasons(right2));
  check("valid2Reasons is false when a trimmed reason is under 15 characters",
    !L.valid2Reasons(right2, { b: long, c: "   fourteen chars   ".slice(0, 20) }) && !L.valid2Reasons(right2, { b: long, c: "12345678901234" })
    && L.valid2Reasons(right2, { b: long, c: "  123456789012345  " }));
  check("valid2Reasons is false when roles are invalid", !L.valid2Reasons({ b: "agent", c: "agent" }, reasonsOk));
  check("Every nurse has a floor line and a Next week reminder", RCM.nurses.every(function (n) {
    return !!S.ex1.floor[n.id] && !!S.ex3.reminders[n.id];
  }));
  check("Next week has exactly four approaches, each with lead and text", S.ex3.approaches.length === 4 &&
    S.ex3.approaches.every(function (a) { return !!a.lead && !!a.text; }));
  check("Exercise 2 rejects matching or missing roles",
    !L.valid2({ b: "agent", c: "agent" }) && !L.valid2({ b: "agent" }) && !L.valid2({}));
  RCM.champions.forEach(function (c) {
    check("Exercise 2 lines and bullets for Nurse " + c.id.toUpperCase(),
      !!S.ex2.right[c.id] && !!S.ex2.wrong[c.id] && S.ex2.bullets[c.id].length === 4);
  });

  var quadrant = { coach: [false, true], champion: [true, true], flag_low: [false, false], flag_high: [true, false] };
  check("Plot positions sit in their quadrants", RCM.nurses.every(function (n) {
    var q = quadrant[n.zone];
    return (n.plot.x >= 0.5) === q[0] && (n.plot.y >= 0.5) === q[1];
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
