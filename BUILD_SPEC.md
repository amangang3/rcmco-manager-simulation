# Build spec: The Manager's Monday

This describes the site as built. Keep it in step with the code.

## Purpose

A classroom simulation in two parts. Groups of three share one laptop and play the
nurse manager of a denial-appeals team at RCMco (fictional). An AI agent drafts appeal letters; nurses review,
correct and improve the drafts. The manager cannot change compensation, targets or the agent. They decide how
to manage each of six nurses and which to rely on most, then give their two champions their roles. Each
exercise takes about 10 minutes.

## Constraints

- Plain HTML, CSS and vanilla JS. No build step, no package manager, no backend.
- No network calls: no CDN fonts, external scripts, analytics or APIs. System fonts only.
- Works from `file://` and from GitHub Pages at the repository root.
- Deterministic: the same clicks always produce the same screens. Nothing persists between runs. Text that
  groups type lives only in the page: it is never scored, stored or sent, and Start over clears it.
- One source of truth: every figure comes from `data/model.js` (`window.RCM`) and every sentence from
  `data/script.js` (`window.RCM_SCRIPT`). The `.html` files hold only a page shell. `.js` is used instead of
  `.json` because `fetch()` of a local file fails from `file://`.
- They/them for every person.
- Everything is fiction. No real people, organizations, courses or sources are named.

## Flow

Three numbered steps, rendered on every page by `assets/nav.js` from `RCM_SCRIPT.nav`, with the current step
marked (`aria-current`). The facilitator guide is an unnumbered quiet link.

| Page | Step | Kind | Script |
|---|---|---|---|
| `index.html` | 1 · Your team | Scrolling document | `assets/doc.js` |
| `dashboard.html` | 2 · Your dashboard | One screen | `assets/dashboard.js` |
| `champions.html` | 3 · Your champions | One screen | `assets/champions.js` |
| `facilitate.html` | Facilitator guide | Scrolling document | `assets/doc.js` |

`assets/nav.js` also exposes `window.RCM_UI`: an element builder, a `{placeholder}` filler that draws on the
targets in the model, lookups, and a tick/cross mark with a screen-reader label.

## Data (`data/model.js`)

- Targets: 7 letters a day (up from 4) at a 95% quality bar.
- Six nurses, each with letters a day, quality score %, % of letters started from the agent's draft (`used`),
  % of used drafts they edit, feedback notes a week, the right call, a quadrant on the reveal grid (`zone`),
  and a stated plot position (x = output, y = oversight, 0 to 1).

| Nurse | Letters | Quality | Uses draft | Edited | Notes | Right call | Quadrant |
|---|---|---|---|---|---|---|---|
| A | 11 | 97% | 100% | 2% | 0 | Self-Automator | Bottom right |
| B | 9 | 97% | 100% | 35% | 12 | Champion | Top right |
| C | 7 | 96% | 100% | 40% | 6 | Champion | Top right |
| D | 5 | 97% | 100% | 78% | 2 | Learner | Top left |
| E | 4 | 96% | 8% | 0% | 0 | Resister | Bottom left |
| F | 6 | 97% | 100% | 25% | 5 | Learner | Top left |

- Nurse E sits at 4 letters a day, the pre-agent target, because they still write every letter by hand.
- Nurses D and F are both Learners, for different reasons. D distrusts the agent's writing and rewrites most
  drafts from the beginning. F distrusts the agent's reading of the record and rereads the full patient record
  before opening each draft. F is just below target, engaged and reviewing, so a group may be tempted to make
  F a champion; the reveal explains why a nurse below target builds skill first.
- Bar scales (never shown as numbers), the four quadrant ids in reading order, the four labels with quotas
  (2 Champions, 2 Learners, 1 Resister, 1 Self-Automator), the two champion roles (Agent improvement champion,
  Agent adoption champion), and the right role for B (improves the agent) and C (improves its users).
- `window.RCM_LOGIC`: pure functions `quotaMet`, `counts`, `score1`, `valid2`, `score2`, `fill`.

No other numbers appear in the exercise: no money, revenue or pay.

## Exercise 1: Your dashboard

- Task line, then a table (about 60% width) of the six nurses: letters a day (bar with a target tick),
  quality score (bar with a bar tick), uses the agent's draft, drafts they edit, feedback notes per week. Bars
  are one neutral color. Nothing is colored good or bad before the reveal. Each name carries one plain floor
  note.
- Each row has four pill buttons (Champion, Learner, Resister, Self-Automator), `aria-pressed`, one call per
  nurse.
- Right panel: plain-word definitions of the four calls, a live counter, the quota rule, and LOCK IN, which
  enables only at exactly 2 Champions, 2 Learners, 1 Resister and 1 Self-Automator.
- Reveal (no undo): each row shows the right call as a colored tag with its word, a tick or cross against the
  group's call, and the right-call line or the specific consequence line. Rows enter 150ms apart. The right
  panel becomes the Framework 1 grid: four equal quadrants, one type of adaptation each (Learner top left,
  Champion top right, Resister bottom left for not using the agent, Self-Automator bottom right for not
  checking its work), Low and High on both axes, and the six nurses as lettered dots. The Learner text keeps
  to the left of its cell so Nurse F's dot never covers it. Then the navy "What is different with agents?" box, a computed score line, NEXT: YOUR
  CHAMPIONS, and a quiet Start over.

## Exercise 2: Your champions

- Two nurse cards (B and C). Each has the exercise 1 figures in small type, four evidence bullets and two role
  buttons (Improves the agent, Improves its users) on the left, and a four-line optional reason box ("Why
  this role? One sentence (optional).", up to 200 characters) on the right. Choosing a role for one nurse assigns the other role to
  the other nurse.
- LOCK IN enables as soon as roles are chosen. The reasons are optional, and the rule under the role cards
  says so.
- Right panel before the reveal: the two role cards (plain name large, formal name small). The agent
  improvement card includes helping other nurses send useful feedback.
- Reveal: the reason boxes are disabled. Each card shows a tick or cross, the group's own reason in quotation
  marks if they wrote one, the right-role or swapped line, and, when there is a reason, a muted prompt asking
  whether it named what matters. The
  right panel becomes the Framework 2 table (the job, pick someone who, on the dashboard), then a navy note on
  how the agent improvement champion's role changes over time (during development the champions give feedback
  directly; after rollout the agent learns from every nurse, so the champion helps others give good feedback),
  a closing line naming the part of the change each champion owns with short reminders of who Nurses D, E and
  F are, a computed score line, the end state, a quiet link back to Your team, and Start over.

## Copy rules (`data/script.js`)

- Plain words before any reveal. "Oversight", "complacency", "rubber-stamp" and "utilization" appear only in
  reveal and framework copy.
- The narrator never states the lesson before the reveal.
- No contrast framing ("X, not Y", "rather than", "instead of", "not just" and similar). State the positive fact.
- No slogans, no fragments, no dramatic storytelling, and no superlatives unless they are data.
- Write like a clinical operations manager's notes: short declarative sentences that name the nurse, say what
  the data shows, then say what to do.
- Framework wording on the reveals matches the framework slides exactly, including two zone definitions that
  keep their original "but" wording.
- Practices the site presents as things a manager does are limited to these: champions give feedback on the
  agent during development; the agent keeps improving from every nurse's edits and comments after rollout;
  the manager names owners for different parts of the change, who learn their part and teach the team;
  managers track how nurses change the agent's drafts, openly, and use it to target coaching; and the agent is
  presented as taking over tedious work. The site adds no other practices, such as pay, titles or protected
  time for champions.
- American English, no em dashes, they/them.
- Research is described in plain words, without author names, titles, venues or years.
- The facilitator guide holds the intro, timing, a stall prompt, debrief
  questions and the research. It holds no answer key, because anyone can reach it.

## Design

- Tokens in `:root` of `assets/style.css`. Navy = Champion, orange = Learner (text uses the darker orange),
  red = Resister, plum = Self-Automator. Nothing else is colored. No gradients, shadows, accent stripes, emoji or decorative icons.
- Every size in rem. Documents: `html { font-size: clamp(15px, 0.9vw, 22px) }`. Exercise pages:
  `html.fit { font-size: clamp(8px, min(0.94vw, 1.67vh), 32px) }`, so they follow whichever of width or height
  is tighter. Below 900px wide the exercise pages stack and scroll.
- Motion 150 to 400ms ease-out, via CSS animations. `prefers-reduced-motion: reduce` removes them and reaches
  the same final state.
- Visible focus states, keyboard-operable throughout, and color is never the only signal.

## Verify

1. **Logic.** Open `test.html` (linked from nowhere), or run it under node:
   `node -e 'global.window=global;require("./data/model.js");require("./data/script.js");require("./assets/test.js");console.log(window.RCM_TEST_RESULTS.passed+"/"+window.RCM_TEST_RESULTS.total)'`.
   It enumerates every call assignment (exactly 180 valid, exactly one scores 6 of 6), checks every right-call
   line and all 18 consequence lines exist, checks all four quadrants and each nurse's quadrant, plot, floor
   note, and scores both exercise 2 assignments.
2. **Content.** The contrast-framing grep
   (`grep -nE ", not |not just|rather than|instead of|isn't|doesn't have to|What's missing|The (problem|issue|point) is" data/script.js`)
   returns nothing. No gendered pronouns in `data/`, `assets/` or `*.html`; no digits in the page `.html` files;
   no em dashes in `data/`; framework wording matches the slides; no practice outside the list above appears.
3. **Behavior.** LOCK IN gating on both exercises (exercise 2 needs roles only), every wrong line appearing on the
   right nurse's row, Start over on both, three-step nav on every page,
   keyboard-only run including typing, reduced motion, two identical runs, and no network requests from
   `file://`.
4. **Fit.** Screenshot both one-screen pages before and after each reveal at 1280×720, 1366×768,
   1440×900, 1920×1080 and 2560×1440 (no scrollbar, nothing clipped, no grid dot covering text or another
   dot), including exercise 2 with both reasons at 200 characters and all 180 exercise 1 call combinations; and
   at 390px wide (stacks and scrolls). Look at every screenshot.
5. **Time.** Your team and each exercise read aloud in under two minutes before their reveals.

## Deploy

GitHub Pages from `main`, path `/`. `.nojekyll` is present. Use explicit `git add` paths; internal notes are
gitignored.
