# Build spec: The Manager's Monday

This describes the site as built. Keep it in step with the code.

## Purpose

A two-part classroom simulation. Groups of three share one laptop and play the nurse manager of a
denial-appeals team at RCMco (fictional). An agent drafts appeal letters; nurses review, correct and improve
the drafts. The manager cannot change pay, targets or the agent. They decide who to rely on, who to coach,
who to step in with, and what job to give their best people. Each exercise takes about 10 minutes.

## Constraints

- Plain HTML, CSS and vanilla JS. No build step, no package manager, no backend.
- No network calls: no CDN fonts, external scripts, analytics or APIs. System fonts only.
- Works from `file://` and from GitHub Pages at the repository root.
- Deterministic: the same clicks always produce the same screens. Nothing persists between runs.
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
- Four nurses, each with letters a day, quality %, % of drafts edited, feedback notes a week, the right call,
  and a stated plot position for the reveal grid (x = output, y = oversight, 0 to 1).

| Nurse | Letters | Quality | Edited | Notes | Right call |
|---|---|---|---|---|---|
| A | 11 | 97% | 2% | 0 | Flag |
| B | 9 | 97% | 35% | 12 | Champion |
| C | 7 | 96% | 40% | 6 | Champion |
| D | 4 | 97% | 78% | 2 | Coach |

- Bar scales (never shown as numbers), the three labels with quotas (2 Champions, 1 Coach, 1 Flag), the two
  champion roles, and the right role for B (improves the agent) and C (improves the people).
- `window.RCM_LOGIC`: pure functions `quotaMet`, `counts`, `score1`, `valid2`, `score2`, `fill`.

No other numbers appear in the exercise: no money, revenue or pay.

## Exercise 1: Your dashboard

- Task line, then a table (about 60% width) of the four nurses: letters a day (bar with a target tick),
  quality (bar with a bar tick), drafts they edit, feedback notes a week. Bars are one neutral color. Nothing
  is colored good or bad before the reveal. Each name carries one plain floor note.
- Each row has three pill buttons (Champion, Coach, Flag), `aria-pressed`, one call per nurse.
- Right panel: plain-word definitions of the three calls, a live counter, the quota rule, and LOCK IN, which
  enables only at exactly 2/1/1.
- Reveal (no undo): each row shows the right call as a colored tag with its word, a tick or cross against the
  group's call, and the right-call line or the specific consequence line. Rows enter 150ms apart. The right
  panel becomes the Framework 1 grid (Coach top-left, Champion top-right, Flag across the bottom row, Low and
  High on both axes) with the four nurses as lettered dots, the navy "What is different with agents?" box, a
  computed score line, NEXT: YOUR CHAMPIONS, and a quiet Start over.

## Exercise 2: Your champions

- Two nurse cards (B and C), each with the exercise 1 figures in small type, four evidence bullets, and two
  buttons: Improves the agent, Improves the people. Picking a job for one nurse gives the other nurse the
  other job, so there is one decision and no invalid state. LOCK IN enables once a choice is made.
- Right panel before the reveal: the two role cards (plain name large, formal name small).
- Reveal: a tick or cross and one line on each card; the right panel becomes the Framework 2 table (the job,
  pick someone who, on the dashboard), the closing line on treating champions, a computed score line, the end
  state, a quiet link back to Your team, and Start over.

## Copy rules (`data/script.js`)

- Plain words before any reveal. "Oversight", "complacency", "rubber-stamp" and "utilization" appear only in
  reveal and framework copy.
- The narrator never states the lesson before the reveal.
- American English, no em dashes, no "not X but Y" constructions, one idea per sentence, they/them.
- Research is described in plain words, without author names, titles, venues or years.
- The facilitator guide holds the intro, timing, a stall prompt, debrief questions and the research. It holds
  no answer key, because anyone can reach it.

## Design

- Tokens in `:root` of `assets/style.css`. Navy = Champion, orange = Coach (text uses the darker orange),
  red = Flag. Nothing else is colored. No gradients, shadows, accent stripes, emoji or decorative icons.
- Every size in rem. Documents: `html { font-size: clamp(15px, 0.9vw, 22px) }`. Exercise pages:
  `html.fit { font-size: clamp(8px, min(0.94vw, 1.67vh), 32px) }`, so they follow whichever of width or height
  is tighter. Below 900px wide the exercise pages stack and scroll.
- Motion 150 to 400ms ease-out, via CSS animations. `prefers-reduced-motion: reduce` removes them and reaches
  the same final state.
- Visible focus states, keyboard-operable throughout, and color is never the only signal.

## Verify

1. **Logic.** Open `test.html` (linked from nowhere), or run it under node:
   `node -e 'global.window=global;require("./data/model.js");require("./data/script.js");require("./assets/test.js");console.log(window.RCM_TEST_RESULTS.passed+"/"+window.RCM_TEST_RESULTS.total)'`.
   It enumerates every call assignment (exactly 12 valid, exactly one scores 4 of 4), checks every right-call
   and consequence line exists, and scores both exercise 2 assignments.
2. **Content.** No gendered pronouns in `data/`, `assets/` or `*.html`; no digits in the page `.html` files;
   no em dashes in `data/`; framework wording matches the spec above.
3. **Behavior.** LOCK IN gating, Start over, nav on every page, keyboard-only run, reduced motion, two
   identical runs, and no network requests from `file://`.
4. **Fit.** Screenshot both exercise pages before and after the reveal at 1280×720, 1366×768, 1440×900,
   1920×1080 and 2560×1440 (no scrollbar, nothing clipped), and at 390px wide (stacks and scrolls). Look at
   every screenshot.
5. **Time.** Each participant page reads aloud in under two minutes before its reveal.

## Deploy

GitHub Pages from `main`, path `/`. `.nojekyll` is present. Use explicit `git add` paths; internal notes are
gitignored.
