/* All copy for The Manager's Monday. No sentence is typed into an .html file.
   Rules: plain words before any reveal, American English, no em dashes, one idea per sentence,
   they/them for every person, and the narrator never states the lesson before the reveal.
   {placeholders} are filled from data/model.js so no figure is typed twice. */

window.RCM_SCRIPT = {
  nav: {
    label: "Steps",
    steps: [
      { n: 1, label: "Your team",      href: "index.html" },
      { n: 2, label: "Your dashboard", href: "dashboard.html" },
      { n: 3, label: "Your champions", href: "champions.html" }
    ],
    guide: "Facilitator guide",
    guide_href: "facilitate.html"
  },

  // index.html. Read in under two minutes.
  intro: {
    page_title: "The Manager's Monday",
    eyebrow: "RCMco · Denial appeals",
    title: "The Manager's Monday",
    standfirst: "The agent writes the letters now. Your job is to work out who is doing theirs.",
    sections: [
      {
        eyebrow: "Who you are",
        heading: "Everyone in the room plays the same person: the nurse manager.",
        body: [
          "You run a denial-appeals team of four nurses at RCMco.",
          "You cannot change pay, targets or the agent.",
          "You decide who you rely on, who you coach, and who you step in with."
        ]
      },
      {
        eyebrow: "What changed",
        heading: "An agent drafts every appeal letter. Your nurses review it.",
        body: [
          "The agent reads the record, checks the insurer's criteria and drafts the letter.",
          "Each nurse reviews the draft, fixes it, and reports what the agent got wrong.",
          "The target went from {before} to {letters} letters a day, at the same {quality}% quality bar.",
          "It is Monday morning, and you have your first full month of data."
        ]
      },
      {
        eyebrow: "What you will do",
        heading: "Two decisions, about ten minutes each.",
        steps: [
          "Read your dashboard and give each of your four nurses one call.",
          "Decide what job to give your two champions."
        ],
        after: "Work as a group of three, on one laptop."
      }
    ],
    begin: "BEGIN",
    guide_link: "Facilitator guide"
  },

  // dashboard.html. Exercise 1.
  ex1: {
    page_title: "Your dashboard · The Manager's Monday",
    eyebrow: "You are the nurse manager · Monday morning",
    task: "Give each nurse one call: two Champions, one Coach, one Flag.",
    table_label: "Your team's first full month",
    cols: {
      nurse: "Nurse",
      letters: "Letters a day",
      letters_sub: "target {letters}",
      quality: "Quality",
      quality_sub: "bar {quality}%",
      edited: "Drafts they edit",
      edited_sub: "",
      notes: "Feedback notes a week",
      notes_sub: "",
      call: "Your call"
    },
    target_mark: "Target",

    floor: {
      a: "Clears the queue by lunch. Rarely has the patient record open.",
      b: "Logs agent mistakes in the feedback tool most days.",
      c: "Steady. Hits the target and flags anything that looks off.",
      d: "Rewrites most drafts from scratch. Says they trust their own letters more."
    },

    defs_title: "What the calls mean",
    defs: {
      champion: "Gets the most out of the agent and checks its work. You'll give them a job.",
      coach: "Checks carefully, but isn't getting the benefit of the agent yet. You'll help them build the skill.",
      flag: "Isn't really checking the agent's work, or isn't using the agent at all. You'll step in."
    },
    counter_title: "Your calls",
    counter_names: { champion: "Champions", coach: "Coach", flag: "Flag" },
    counter_item: "{name} {count} of {quota}",
    counter_rule: "LOCK IN opens when every nurse has a call and the counts match exactly.",
    lock: "LOCK IN",

    // Reveal
    right: {
      a: "The fastest nurse on the team, and they change 2 drafts in 100 and send no feedback. On output alone they look like your star. The letters are the agent's, unchecked.",
      b: "Above target, and they fix a third of the drafts and report what the agent gets wrong.",
      c: "On target at the quality bar, checking carefully and reporting steadily. A champion doesn't have to be the fastest.",
      d: "They check everything, including what the agent already gets right, so their output is far below target. The care is there. The skill with the agent isn't yet. Show them where the agent is reliable."
    },
    wrong: {
      a: {
        champion: "You made A a champion. The team copies their pace, not their checking. Within weeks edits fall across the team, and an audit finds letters built on the wrong criteria.",
        coach: "Coaching A on pace misses the problem. They have plenty of pace. What's missing is any checking of the agent's work, and a coaching plan about speed won't touch it."
      },
      b: {
        coach: "B is above target and checking well. Coaching them spends your time where it isn't needed and tells your best reviewer they're behind.",
        flag: "Flagging B for heavy editing punishes the thing you most want. The rest of the team learns to stop fixing drafts."
      },
      c: {
        coach: "C is on target at the quality bar and checking carefully. There's nothing to coach, and you've passed over a champion.",
        flag: "C is doing exactly the checking the agent needs. Flagging them tells the team that careful review gets you in trouble."
      },
      d: {
        champion: "Make D a champion and the team copies their habit of rewriting from scratch. Output stalls, and the agent starts to look useless.",
        flag: "D checks every draft. Flagging them treats careful review as the problem. What they need is skill with the agent, not an audit."
      }
    },
    your_call: "Your call: {call}",
    mark_right: "Right call",
    mark_wrong: "Different call",
    score: "Your group called {right} of {total}.",
    next: "NEXT: YOUR CHAMPIONS",
    reset: "Start over",

    // Framework 1, as on the slide
    fw: {
      eyebrow: "Framework 1",
      title: "With agents, managers must measure oversight, not just output",
      x: "Output",
      x_sub: "Volume and quality against the bar",
      y: "Oversight",
      y_sub: "Edits, overrides and feedback",
      low: "Low",
      high: "High",
      zones: {
        champion: {
          def: "Utilizes agent potential and actively reviews agent output and improves with feedback",
          response: "Give them a job"
        },
        coach: {
          def: "Reviews carefully, but not yet fully utilizing agent potential",
          response: "Build the skill: show them where the agent is reliable, pair them with a champion"
        },
        flag: {
          def: "Not checking the agent's work or not utilizing agents at all",
          response: "Step in: audit a sample of their work, reset expectations"
        }
      },
      dot_label: "{name}: {zone}",
      box_title: "What is different with agents?",
      box: [
        { k: "Before agents", v: "The nurse wrote the letter. Output reflected their effort and judgment, so output metrics were a good measure." },
        { k: "With agents", v: "The agent writes the letter. The nurse's value is the review, and output measures don't reflect this." },
        { k: "Key takeaway", v: "Measure oversight alongside output, or the highest approver looks like the best performer." }
      ]
    }
  },

  // champions.html. Exercise 2.
  ex2: {
    page_title: "Your champions · The Manager's Monday",
    eyebrow: "You are the nurse manager · Monday afternoon",
    task: "Nurse B and Nurse C are your champions. Give each one a job.",
    stats: "{letters} letters a day · {quality}% · edits {edited}% · {notes} notes a week",
    bullets: {
      b: [
        "Three years at RCMco.",
        "First to spot when the agent cites the wrong guideline.",
        "Newer nurses ask them for help with the tool.",
        "Some of the veterans call them 'the tech person'."
      ],
      c: [
        "Sixteen years, most of them as an ICU nurse.",
        "Peers bring them their hardest cases.",
        "Was the loudest skeptic until they saw the agent's letters side by side with the team's.",
        "Not the fastest. Never misses the bar."
      ]
    },
    pick_label: "Job for {name}",
    roles_title: "The two jobs",
    role_desc: {
      agent: "Works with the agent's development team. Turns the team's edits into fixes, and tests new versions before they roll out.",
      people: "Teaches the team to review the agent's drafts well, and runs the weekly huddle on hard cases."
    },
    rule: "Each champion gets one job. Picking a job for one gives the other nurse the other job.",
    lock: "LOCK IN",

    // Reveal
    right: {
      b: "B's specific catches are exactly what the development team needs. Every note becomes a fix.",
      c: "Peers already bring C their hardest cases, and a converted skeptic is the most persuasive teacher on the floor."
    },
    wrong: {
      b: "You sent B to teach the veterans. Several stop coming: 'they've been here three years.' Adoption stalls on the nurses who most needed it. Research on clinics adopting new technology found the same thing: when newer staff were made the trainers, experienced staff resisted as a group.",
      c: "C sends good feedback, but half as much as B, so the development team hears less. Meanwhile the one person the veterans would follow isn't teaching anyone."
    },
    your_pick: "Your pick: {role}",
    mark_right: "Right job",
    mark_wrong: "Swapped",
    score: "Your group placed {right} of {total}.",

    // Framework 2, as on the slide
    fw: {
      eyebrow: "Framework 2",
      title: "A champion improves either the agent or the people",
      rows: [
        { k: "The job",
          agent: "Turns the team's edits into fixes to the agent; tests new versions before rollout",
          people: "Teaches peers to review agent drafts, then reinforces careful review in huddles" },
        { k: "Pick someone who",
          agent: "Reviews every draft, catches agent errors, writes specific feedback",
          people: "Peers already trust: tenure, credibility, ideally a converted skeptic" },
        { k: "On the dashboard",
          agent: "Visible: high edit rate, lots of feedback",
          people: "Not visible: ask who people go to with hard cases" }
      ]
    },
    closing: "Treat every champion the same way: appoint them formally, protect their time, give them a channel to you and the development team, and rotate the role. Once Nurse D is coached, they are next.",
    end: "That's the exercise. Your faculty will bring the room back together.",
    back: "Back to Your team",
    reset: "Start over"
  },

  // facilitate.html. For faculty, reachable by anyone, so it holds no answer key.
  guide: {
    page_title: "Facilitator guide · The Manager's Monday",
    eyebrow: "Facilitator guide",
    title: "Run it in about twenty-five minutes, in groups of three",
    lede: "Everyone plays the same nurse manager. The two reveal screens are the answer key and carry both frameworks, so this guide holds only the intro, the timing and the debrief.",
    sections: [
      {
        eyebrow: "1 · The intro",
        heading: "Read this to the class. It takes about two minutes.",
        quote: "For the next twenty minutes you are the nurse manager of a denial-appeals team at RCMco. Your company has deployed an agent that drafts every appeal letter. Your nurses now review, fix and improve those drafts instead of writing from scratch, and their target has gone from four letters a day to seven at the same quality bar. It's Monday, and you have your first full month of data on four nurses. Get into groups of three, one laptop between you. First decide what call to make on each nurse. Then decide what job to give your best two."
      },
      {
        eyebrow: "2 · How to run it",
        heading: "Groups work on their own. You circulate.",
        timeline: [
          { t: "2 min", v: "Give the intro." },
          { t: "1 min", v: "Form groups of three, one laptop each, open to Your team." },
          { t: "10 min", v: "Exercise 1: Your dashboard." },
          { t: "10 min", v: "Exercise 2: Your champions." },
          { t: "5 to 10 min", v: "Bring the room back together for the debrief." }
        ],
        tip_label: "If a group stalls on exercise 1, ask:",
        tip: "Which two columns would you look at if you could only see two?",
        after: "You can close with the two framework slides. They carry the same content as the reveal screens."
      },
      {
        eyebrow: "3 · Debrief",
        heading: "Six questions for the room.",
        questions: [
          "Who did your group want to make a champion first, and what changed your mind?",
          "If your dashboard could show only two columns, which two would you keep?",
          "What would it cost the team if Nurse A were the model everyone copied?",
          "Why does Nurse D need coaching and not an audit?",
          "Why is the person who improves the agent often the wrong person to teach the team?",
          "The case asked whether nurses should get a bonus for output. What does this exercise suggest? (Leave it open. The class has argued it already.)"
        ]
      },
      {
        eyebrow: "4 · Where the ideas come from",
        heading: "Champions work when the role is formal, protected and shared.",
        research: [
          "Field research on clinics introducing new technology found that when managers made newer, tech-savvy staff the trainers, experienced staff resisted as a group in three of five sites. Learning worked where the trainer role rotated, so trainees could move up into it.",
          "Research on spreading new practices across clinics found that formally appointed peer advocates in each role spread new processes well. The biggest barrier was that they had no protected time to train peers.",
          "Reviews of champions in health technology found that champions promote, teach, support and act as a go-between for developers and users. More than one champion is needed when people have to change how they work."
        ],
        after: "Watching for unchecked approvals stays with the manager, so no nurse is asked to police peers."
      }
    ],
    back: "Back to Your team"
  }
};
