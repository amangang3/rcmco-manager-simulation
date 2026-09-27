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
    standfirst: "An AI agent now drafts every insurance appeal letter at RCMco. You manage the six nurses who review those drafts.",
    sections: [
      {
        eyebrow: "Who you are",
        heading: "Everyone in the room plays the role of a nurse manager.",
        body: [
          "You supervise six nurses who write insurance appeal letters. An appeal letter is a document sent to an insurer arguing that a denied claim should be reconsidered and paid.",
          "Compensation, performance targets, and the AI agent have already been set by senior leadership.",
          "You cannot change those decisions. Your job is to decide how to manage each nurse and which nurses to rely on most heavily."
        ]
      },
      {
        eyebrow: "What changed?",
        heading: "An AI agent now drafts every insurance appeal letter, and nurses review the drafts before they are sent.",
        body: [
          "For each case, the agent reviews the patient's medical record, checks the insurer's coverage criteria, and drafts a letter arguing why the denied claim should be paid.",
          "A nurse then reviews the draft, corrects any errors or omissions, and submits the final version to the insurer.",
          "When nurses find mistakes, they can report them through a feedback tool built into the drafting system.",
          "Before a letter is sent, it receives an automatic quality score based on clinical criteria.",
          "After the agent was introduced, the daily productivity target increased from {before} to {letters} letters per nurse, while the required quality standard remained unchanged at {quality}%.",
          "It is Monday morning. You have just received the first full month of performance data since the rollout."
        ]
      },
      {
        eyebrow: "What you will do",
        heading: "You will make two decisions. Each should take about 10 minutes.",
        steps: [
          { text: "Review your team dashboard.",
            sub: "For each of your six nurses, decide how you will manage them over the coming month." },
          { text: "Select and assign your champions.",
            sub: "Choose the two nurses you want to rely on most heavily and assign each of them a role." }
        ],
        after: "Work in groups of three on one laptop."
      }
    ],
    begin: "BEGIN",
    guide_link: "Facilitator guide"
  },

  // dashboard.html. Exercise 1.
  ex1: {
    page_title: "Your dashboard · The Manager's Monday",
    eyebrow: "You are the nurse manager · Monday morning",
    task: "Make one call on each nurse: two Champions, two Coaches and two Flags.",
    table_label: "Your team's first full month",
    cols: {
      nurse: "Nurse",
      letters: "Letters a day",
      letters_sub: "target {letters}",
      quality: "Quality score",
      quality_sub: "bar {quality}%",
      used: "Uses the agent's draft",
      used_sub: "share of letters",
      edited: "Drafts they edit",
      edited_sub: "share of drafts used",
      notes: "Feedback notes",
      notes_sub: "per week",
      call: "Your call"
    },
    target_mark: "Target",

    floor: {
      a: "Finishes the queue by lunch. Rarely opens the patient record.",
      b: "Logs agent errors in the feedback tool most days.",
      c: "Meets the target every day and reports anything that looks wrong.",
      d: "Rewrites most drafts from the beginning. Says they trust their own letters more.",
      e: "Writes letters from scratch in a separate document. Says the agent does not know the payers.",
      f: "Reads the full patient record for every case before opening the agent's draft."
    },

    defs_title: "What each call means",
    defs: {
      champion: "Uses the agent's drafts, checks them closely and reports errors. You will give them a champion role.",
      coach: "Checks the agent's drafts closely and is still learning to get full value from them. You will help them build that skill.",
      flag: "Is not checking the agent's drafts, or is not using the agent. You will step in."
    },
    counter_title: "Your calls",
    counter_names: { champion: "Champions", coach: "Coaches", flag: "Flags" },
    counter_item: "{name} {count} of {quota}",
    counter_rule: "LOCK IN becomes available when every nurse has a call and the counts match.",
    lock: "LOCK IN",

    // Reveal
    right: {
      a: "Nurse A has the highest output on the team. They edit 2% of drafts and send no feedback, so the agent's letters go out largely unchecked. Their quality score is high because the scorer checks each letter against the criteria, and a clean agent draft passes. The scorer does not catch unusual cases that need a nurse's judgment.",
      b: "Nurse B is above target, edits about a third of the drafts and sends the most feedback on the team.",
      c: "Nurse C meets the target at the quality bar, edits 40% of drafts and reports errors every week.",
      d: "Nurse D uses every agent draft and then rewrites most of it, so their output is below target. They check closely. Show them which parts of the draft the agent gets right.",
      e: "Nurse E starts only 8% of letters from the agent's draft and sends no feedback. Their output matches the old target of 4 letters a day. Ask why they avoid the agent before deciding what to do.",
      f: "Nurse F checks closely and sends useful feedback. They are just below target because they reread the full patient record before opening each draft. Show them how to check the agent's draft against the record without rereading all of it, and pair them with a champion."
    },
    wrong: {
      a: {
        champion: "The team would copy Nurse A's habits. Edit rates would fall across the team, and letters built on the wrong criteria would start to go out.",
        coach: "Coaching would focus on skill with the agent, and Nurse A already gets high output from it. They rarely check its drafts, which calls for an audit."
      },
      b: {
        coach: "Nurse B is above target and reviews closely. Coaching would use your time where it is not needed and tell your strongest reviewer they are behind.",
        flag: "Nurse B edits drafts and reports errors, which is the behavior you want. A flag would teach the team to stop correcting drafts."
      },
      c: {
        coach: "Nurse C meets the target at the quality bar and reviews closely. Coaching would use your time where it is not needed, and you would lose a champion.",
        flag: "Nurse C checks every draft they use and reports errors. A flag would tell the team that careful review gets people in trouble."
      },
      d: {
        champion: "The team would copy Nurse D's habit of rewriting drafts from the beginning. Output would drop, and the agent would look unhelpful.",
        flag: "Nurse D uses the agent on every letter and checks each draft closely. An audit would signal that careful review is a problem. Nurse D needs help working faster with the agent."
      },
      e: {
        champion: "Nurse E rarely uses the agent. Other nurses would take the role as permission to skip it.",
        coach: "Coaching assumes a nurse is working with the agent. Nurse E has mostly stopped using it. Find out why first."
      },
      f: {
        champion: "Nurse F checks closely and sends useful feedback. They are still below target, so as a champion they would model a slower way of working than the team needs.",
        flag: "Nurse F checks every case closely and reports errors. A flag would treat careful review as the problem. Nurse F needs help checking the agent's drafts more efficiently."
      }
    },
    your_call: "Your call: {call}",
    mark_right: "Matches",
    mark_wrong: "Different call",
    score: "Your group matched {right} of {total} calls.",
    next: "NEXT: YOUR CHAMPIONS",
    reset: "Start over",

    // Framework 1, as on the slide
    fw: {
      eyebrow: "Framework 1",
      title: "With agents, managers must measure oversight, in addition to output",
      x: "Output",
      x_sub: "Volume and quality against the bar",
      y: "Oversight",
      y_sub: "Edits, overrides and feedback",
      low: "Low",
      high: "High",
      zones: {
        coach: {
          label: "Coach",
          def: "Reviews carefully, but not yet fully utilizing agent potential",
          response: "Show them which parts of the draft the agent gets right, and pair them with a champion"
        },
        champion: {
          label: "Champion",
          def: "Utilizes agent's potential and actively reviews agent output and improves it with feedback",
          response: "Give them a champion role"
        },
        flag_low: {
          label: "Flag",
          def: "Not utilizing agent at all",
          response: "Ask why, then show them the agent's letters next to the team's, and pair them with a champion"
        },
        flag_high: {
          label: "Flag",
          def: "Utilizes agent's potential, but not checking the agent's work",
          response: "Audit a sample of their letters, and make checking part of the job"
        }
      },
      dot_label: "{name}: {zone}",
      box_title: "What is different with agents?",
      box: [
        { k: "Before agents", v: "The nurse wrote the letter. Output reflected their effort and judgment so output metrics were a good measure." },
        { k: "With agents", v: "The agent writes the letter. The nurse's value is the review, and output measures alone don't reflect this." },
        { k: "Key takeaway", v: "Measure oversight alongside output, or the highest approver looks like a high performer." }
      ]
    }
  },

  // champions.html. Exercise 2.
  ex2: {
    page_title: "Your champions · The Manager's Monday",
    eyebrow: "You are the nurse manager · Monday afternoon",
    task: "Nurse B and Nurse C are your champions. Give each of them one role.",
    stats: "{letters} letters a day · {quality}% · edits {edited}% · {notes} notes a week",
    bullets: {
      b: [
        "Three years at RCMco.",
        "Usually the first to spot when the agent cites the wrong guideline.",
        "Newer nurses ask them for help with the tool.",
        "Some experienced nurses call them 'the tech person.'"
      ],
      c: [
        "Sixteen years in nursing, most of them in intensive care.",
        "Other nurses bring them their hardest cases.",
        "Was openly skeptical of the agent until they compared its letters with the team's.",
        "Meets the quality bar every week."
      ]
    },
    pick_label: "Role for {name}",
    roles_title: "The two roles",
    role_desc: {
      agent: "Works with the team that builds the agent. Turns the nurses' edits into recommended fixes, tests new versions before they roll out, and helps other nurses send useful feedback.",
      people: "Teaches other nurses to review the agent's drafts and leads a weekly huddle on difficult cases."
    },
    reason_label: "Why this role? One sentence (optional).",
    reason_placeholder: "Example: They are right for this role because...",
    rule: "Each champion takes one role. Choosing a role for one nurse assigns the other role to the other nurse. You can add one sentence for each nurse on why the role fits before you lock in.",
    lock: "LOCK IN",

    // Reveal
    right: {
      b: "Nurse B's error reports are specific, and the agent's development team can act on them. As every nurse starts sending feedback, Nurse B can help the others make their reports just as useful.",
      c: "Other nurses already trust Nurse C with hard cases. As a former skeptic, they can speak to the doubts other nurses have."
    },
    wrong: {
      b: "Experienced nurses are less likely to take training from a colleague with three years on the team, so adoption slows among the nurses who most need it. Field research on clinics adopting new technology found that when managers chose newer staff as trainers, experienced staff resisted as a group.",
      c: "Nurse C sends about half as much feedback as Nurse B, so the development team gets less to work with. The nurse whom others trust most is also no longer teaching."
    },
    your_pick: "Your pick: {role}",
    your_reason: "Your reason:",
    reason_check: {
      b: "Did your reason mention the quality of Nurse B's feedback on the agent?",
      c: "Did your reason mention how other nurses see Nurse C?"
    },
    mark_right: "Matches",
    mark_wrong: "Swapped",
    score: "Your group matched {right} of {total} roles.",

    // Framework 2, as on the slide
    fw: {
      eyebrow: "Framework 2",
      title: "A champion improves either the agent or its users",
      rows: [
        { k: "The job",
          agent: "Turns the team's edits into recommendations for fixes to the agent, tests new versions before rollout",
          people: "Teaches peers to review agent drafts, then reinforces careful review in huddles" },
        { k: "Pick someone who",
          agent: "Reviews every draft, catches agent errors, writes specific feedback",
          people: "Peers already trust: tenure, credibility, ideally a converted skeptic" },
        { k: "On the dashboard",
          agent: "Visible: high edit rate, lots of feedback",
          people: "Not visible: ask who people go to with hard cases" }
      ],
      change_title: "With agents, the agent improvement champion's role changes over time",
      change: [
        { k: "During development", v: "A small group of champions gives feedback on the agent directly." },
        { k: "After rollout", v: "The agent learns from every nurse's edits and feedback, so the champion's job shifts from giving feedback to helping other nurses give good feedback." }
      ]
    },
    closing: "Name the part of the change each champion owns. Nurse B works directly with the agent's development team. Nurse C teaches the team and can help bring back Nurse E, who writes most letters without the agent. Nurses D and F, who are being coached, can learn from both.",
    end: "This is the end of the exercise. Your faculty will bring the room back together.",
    back: "Back to Your team",
    reset: "Start over"
  },

  // facilitate.html. For faculty, reachable by anyone, so it holds no answer key.
  guide: {
    page_title: "Facilitator guide · The Manager's Monday",
    eyebrow: "Facilitator guide",
    title: "Run it in about twenty-five minutes, in groups of three",
    lede: "Everyone plays the same nurse manager. The reveal screens show both frameworks, so this guide covers the intro, the timing and the debrief.",
    sections: [
      {
        eyebrow: "1 · The intro",
        heading: "Read this to the class. It takes about two minutes.",
        quote: "For the next twenty minutes you are the nurse manager of a denial-appeals team at RCMco. The company has deployed an AI agent that drafts every appeal letter. Your nurses now review and correct those drafts, and their daily target has gone from four letters to seven at the same quality standard. It is Monday, and you have the first full month of performance data on six nurses. Get into groups of three with one laptop per group. First, decide how you will manage each nurse. Then choose what role to give your two champions."
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
        tip: "Which two columns would you look at if you could see only two?",
        after: "You can close with the two framework slides. They match the reveal screens."
      },
      {
        eyebrow: "3 · Debrief",
        heading: "Questions for the room.",
        questions: [
          "Which nurse did your group first want as a champion, and what changed your mind?",
          "If your dashboard could show only two columns, which two would you keep?",
          "What would happen to the team if Nurse A became the example others followed?",
          "Nurses A and E both got a Flag. How would you handle each of them?",
          "Nurses D and F both need coaching. What does each of them need to learn?",
          "What reason did your group give for Nurse C's role? Did it mention how other nurses see them?",
          "A year after rollout, the agent learns from every nurse's feedback. How should the agent improvement champion spend their time then?",
          "The case asked whether nurses should get a bonus for output. What does this exercise suggest? Leave the question open. The class has already debated it."
        ]
      },
      {
        eyebrow: "4 · Where the ideas come from",
        heading: "Champions work best when the role is formal and has the manager's support.",
        research: [
          "Field research on clinics introducing new technology found that when managers chose newer, tech-savvy staff as trainers, experienced staff resisted as a group in three of five sites.",
          "Research on spreading new practices across clinics found that formally appointed peer advocates in each role spread new processes well. Their biggest barrier was a lack of protected time to train peers.",
          "Reviews of champions in health technology found that champions promote, teach, support users and connect developers with users. Changes that require people to work differently need more than one champion."
        ],
        after: "Monitoring for unchecked approvals is the manager's job. Champions are not asked to monitor their peers."
      }
    ],
    back: "Back to Your team"
  }
};
