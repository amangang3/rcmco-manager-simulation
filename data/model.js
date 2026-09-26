/* All data for The Manager's Monday, and the pure logic that scores it.
   Every figure on every page renders from here. No number is typed into an .html file.
   A .js file (not .json) so the site also works when opened straight from the filesystem. */

window.RCM = {
  meta: {
    org: "RCMco",
    title: "The Manager's Monday",
    you: "the nurse manager",
    disclaimer: "A fictional teaching simulation. RCMco and every person, number and event in it are invented."
  },

  targets: { letters: 7, quality: 95, lettersBefore: 4 },   // letters per day, quality score %; the target before the agent

  // The four nurses. Each differs from the others on one clear thing.
  //   A: highest output, almost no checking            -> flag   (looks like the star)
  //   B: above target, checks and reports a lot         -> champion
  //   C: on target, checks carefully, reports steadily  -> champion
  //   D: well below target, rewrites nearly everything  -> coach  (careful, not using the agent well)
  nurses: [
    { id: "a", name: "Nurse A", letters: 11, quality: 97, edited: 2,  notes: 0,  answer: "flag",
      plot: { x: 0.92, y: 0.10 } },
    { id: "b", name: "Nurse B", letters: 9,  quality: 97, edited: 35, notes: 12, answer: "champion",
      plot: { x: 0.78, y: 0.80 } },
    { id: "c", name: "Nurse C", letters: 7,  quality: 96, edited: 40, notes: 6,  answer: "champion",
      plot: { x: 0.60, y: 0.84 } },
    { id: "d", name: "Nurse D", letters: 4,  quality: 97, edited: 78, notes: 2,  answer: "coach",
      plot: { x: 0.22, y: 0.92 } }
  ],
  // edited = % of agent drafts the nurse changed before sending. notes = feedback notes sent per week.
  // plot = position on the reveal grid, 0..1 (x = output, y = oversight). Stated, not computed, so it
  // cannot drift from the story.

  // Bar scales for the dashboard: the value at each end of a bar. Never shown as numbers.
  scales: {
    letters: { min: 0,  max: 12 },
    quality: { min: 80, max: 100 },
    edited:  { min: 0,  max: 100 },
    notes:   { min: 0,  max: 12 }
  },

  labels: [
    { id: "champion", name: "Champion", quota: 2 },
    { id: "coach",    name: "Coach",    quota: 1 },
    { id: "flag",     name: "Flag",     quota: 1 }
  ],

  // Exercise 2. The two champions carry over from exercise 1 (B and C) whatever a group picked there,
  // because exercise 1's reveal has already shown them.
  roles: [
    { id: "agent",  name: "Agent-improvement champion", short: "Improves the agent" },
    { id: "people", name: "Adoption champion",          short: "Improves the people" }
  ],
  champions: [
    { id: "b", answer: "agent"  },
    { id: "c", answer: "people" }
  ]
};

// Pure functions. No side effects, no DOM.
window.RCM_LOGIC = {
  // picks: { a: "flag", b: "champion", ... }
  quotaMet: picks => window.RCM.labels.every(l =>
      Object.values(picks).filter(p => p === l.id).length === l.quota)
    && Object.keys(picks).length === window.RCM.nurses.length,
  counts: picks => window.RCM.labels.map(l =>
      ({ id: l.id, name: l.name, quota: l.quota,
         count: Object.values(picks).filter(p => p === l.id).length })),
  score1: picks => window.RCM.nurses.map(n =>
      ({ id: n.id, picked: picks[n.id], answer: n.answer, correct: picks[n.id] === n.answer })),
  // roles: { b: "agent", c: "people" }. The two must differ.
  valid2: roles => !!(roles.b && roles.c && roles.b !== roles.c),
  score2: roles => window.RCM.champions.map(c =>
      ({ id: c.id, picked: roles[c.id], answer: c.answer, correct: roles[c.id] === c.answer })),
  // Fill a {placeholder} template from an object.
  fill: (tpl, vals) => tpl.replace(/\{(\w+)\}/g, (m, k) => (k in vals ? vals[k] : m))
};
