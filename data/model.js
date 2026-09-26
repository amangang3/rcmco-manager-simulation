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

  // Six nurses. Each one sits clearly in one quadrant.
  //   A: highest output, uses every draft, barely checks          -> flag (bottom right, looks like the star)
  //   B: above target, checks and reports a lot                   -> champion
  //   C: on target, checks closely, reports steadily              -> champion
  //   D: uses every draft, then rewrites most of it, below target -> coach
  //   E: rarely uses the agent, writes by hand at the old pace    -> flag (bottom left)
  //   F: uses every draft, rereads the whole record first, just below target -> coach
  nurses: [
    { id: "a", name: "Nurse A", letters: 11, quality: 97, used: 100, edited: 2,  notes: 0,  answer: "flag",
      zone: "flag_high", plot: { x: 0.90, y: 0.12 } },
    { id: "b", name: "Nurse B", letters: 9,  quality: 97, used: 100, edited: 35, notes: 12, answer: "champion",
      zone: "champion",  plot: { x: 0.80, y: 0.80 } },
    { id: "c", name: "Nurse C", letters: 7,  quality: 96, used: 100, edited: 40, notes: 6,  answer: "champion",
      zone: "champion",  plot: { x: 0.62, y: 0.86 } },
    { id: "d", name: "Nurse D", letters: 5,  quality: 97, used: 100, edited: 78, notes: 2,  answer: "coach",
      zone: "coach",     plot: { x: 0.24, y: 0.90 } },
    { id: "e", name: "Nurse E", letters: 4,  quality: 96, used: 8,   edited: 0,  notes: 0,  answer: "flag",
      zone: "flag_low",  plot: { x: 0.18, y: 0.12 } },
    { id: "f", name: "Nurse F", letters: 6,  quality: 97, used: 100, edited: 25, notes: 5,  answer: "coach",
      zone: "coach",     plot: { x: 0.42, y: 0.74 } }
  ],
  // used = % of letters that started from the agent's draft. edited = % of the drafts they used that they changed.
  // notes = feedback notes sent per week. zone = quadrant on the reveal grid.
  // plot = position on the reveal grid, 0..1 (x = output, y = oversight). Stated, not computed, so it
  // cannot drift from the story.

  // Bar scales for the dashboard: the value at each end of a bar. Never shown as numbers.
  scales: {
    letters: { min: 0,  max: 12 },
    quality: { min: 80, max: 100 },
    used:    { min: 0,  max: 100 },
    edited:  { min: 0,  max: 100 },
    notes:   { min: 0,  max: 12 }
  },

  // Quadrants of the reveal grid, in reading order.
  zones: ["coach", "champion", "flag_low", "flag_high"],

  labels: [
    { id: "champion", name: "Champion", quota: 2 },
    { id: "coach",    name: "Coach",    quota: 2 },
    { id: "flag",     name: "Flag",     quota: 2 }
  ],

  // Exercise 2. The two champions carry over from exercise 1 (B and C) whatever a group picked there,
  // because exercise 1's reveal has already shown them.
  roles: [
    { id: "agent",  name: "Agent improvement champion", short: "Improves the agent" },
    { id: "people", name: "Agent adoption champion",    short: "Improves its users" }
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
  // Roles are valid and each champion has a one-sentence reason (at least 15 characters once trimmed).
  valid2Reasons: (roles, reasons) => window.RCM_LOGIC.valid2(roles)
    && window.RCM.champions.every(c => ((reasons || {})[c.id] || "").trim().length >= 15),
  score2: roles => window.RCM.champions.map(c =>
      ({ id: c.id, picked: roles[c.id], answer: c.answer, correct: roles[c.id] === c.answer })),
  // Fill a {placeholder} template from an object.
  fill: (tpl, vals) => tpl.replace(/\{(\w+)\}/g, (m, k) => (k in vals ? vals[k] : m))
};
