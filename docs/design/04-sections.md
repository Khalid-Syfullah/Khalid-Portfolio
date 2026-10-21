# 04 — Sections

← [DESIGN.md](../../DESIGN.md) · Copy lives in [`08-content.md`](08-content.md) · Behaviour in [`06-interactions.md`](06-interactions.md)

Each section has a **job** (what the visitor should leave with), its **content**, its **layout** and its **states**.

---

## 01 — Hero `#top`

**Job:** within 10 seconds the visitor knows who this is, what he builds, that he's available, and how to reach him.

```
┌──────────────┬────────────────────────────────────────────────────────┐
│ 01 — INTRO   │ I build Android apps,                                   │
│              │ Node.js back-ends and                                   │  text-display, balance
│ ┌──────────┐ │ React front-ends.                                       │
│ │  photo   │ │                                                         │
│ │ square,  │ │ Software engineer from Rajshahi, Bangladesh. …          │  text-lead, ink-2, ≤ 38rem
│ │ 240px    │ │                                                         │
│ └──────────┘ │ Email ↗   LinkedIn ↗   GitHub ↗   LeetCode ↗             │  mono links
│ Role   SE    │                                                         │
│ Based  Rajsh.│ [ Résumé ↓ ]   [ ⌘K  Jump anywhere ]                    │  ink button + ghost hint
│ ● Open to roles — BD & remote                                          │  brand dot
└──────────────┴────────────────────────────────────────────────────────┘
```

- **Photo:** `photo-0` (square headshot), 240×240, `--radius-sm`, **greyscale by default and full colour on hover/focus** (200ms). On a phone it's 96×96 beside the name row.
- **Facts list** (`<dl>`): Role, Based, Degree.
- **Availability:** brand dot plus "Open to software engineering roles — Bangladesh & remote". The dot pulses once on load, and never under reduced motion.
- **⌘K hint chip:** a ghost button that opens the command menu. It shows `Ctrl K` on Windows/Linux and `⌘K` on macOS; on touch it reads "Search".
- No background effects.

**Mobile**

```
┌────────────────────────────┐
│ [96px photo] Md Khalid     │
│              Syfullah      │
│              Software Eng. │
│ ● Open to roles            │
│                            │
│ I build Android apps,      │
│ Node.js back-ends and      │
│ React front-ends.          │
│ lead …                     │
│ Email  LinkedIn            │
│ GitHub LeetCode            │
│ [ Résumé ↓ ] [ Search ]    │
└────────────────────────────┘
```

---

## 02 — About `#about`

**Job:** a human paragraph that answers "what kind of engineer, and what does he want next?"

```
┌──────────────┬───────────────────────────────┬────────────────────┐
│ 02 — ABOUT   │ 3–4 sentences, text-lead       │  photo-1 (outdoor) │
│              │                                │  4:3, greyscale →  │
│              │ Based in   Rajshahi, BD        │  colour on hover   │
│              │ Languages  Bangla, English     │                    │
│              │ Education  B.Sc. Engg. (ECE),  │                    │
│              │            RUET                │                    │
└──────────────┴───────────────────────────────┴────────────────────┘
```

- On mobile the photo goes **above** the text, full width, 4:3.
- The facts strip is a `<dl>` in two columns.

---

## 03 — Experience `#experience`

**Job:** show real work history in résumé form; each row opens to the detail.

```
 03 — EXPERIENCE           ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  rule-strong
 Select a row to see       Apr 2021 — Dec 2021   Qubitech Solutions      Rajshahi    −
 what I did and what                             Software Developer
 shipped.                     • Led development of 4 projects …
                              • Built native Android apps and web platforms …
                              • Worked with the CEO and a 6-person team …
                              SHIPPED  (OBOSOR ↗) (BERGER ↗)
                           ───────────────────────────────────────────────────  border
                           Apr 2021 — Jun 2021   MonstarLab Bangladesh   Remote      +
                                                 Industrial Attachment
                           ───────────────────────────────────────────────────
```

- **Rows:** period (mono, tabular), org (`text-h3`) plus role (ink-2), place (muted), and a +/− toggle.
- **Open state:** bullets (max 3) plus "SHIPPED" chips that link to the matching project in Work (they open its case dialog).
- **Default:** the first row is open. One row open at a time (accordion).
- **Mobile:** period moves above the org; place sits under the role; the toggle stays right-aligned.
- Rows are deep-linkable: `#experience/qubitech`.
- Only two rows remain after the academic cut. That's honest, and the Work section carries the weight. If more roles come (freelance, current job), they slot in at the top.

---

## 04 — Work `#work`

**Job:** prove he ships. Four strong projects with a point of view, plus everything else one click away.

```
 04 — WORK                 ┌───────────────────────┐ ┌───────────────────────┐
 Four projects I'd show    │ [screenshot 16:10]    │ │ [screenshot 16:10]    │
 first. Everything else    │ BOIMELA               │ │ VFloors360            │
 is in the archive.        │ Bilingual EPUB3 reader│ │ 360° tile showrooms…  │
                           │ Android · Node · React│ │ React · Node · Mongo  │
                           │ Read the case →       │ │ Read the case →       │
                           └───────────────────────┘ └───────────────────────┘
                           ┌───────────────────────┐ ┌───────────────────────┐
                           │ PLASMA+  ★ IEEE winner │ │ OBOSOR                │
                           └───────────────────────┘ └───────────────────────┘

                           All projects (n)   [All] [Android] [Web] [Back-end]
                           ─────────────────────────────────────────────────────
                           Task Manager       Web       React · Node · Mongo   ↗
                           Muslim Virtual Aid Android   Java · MVVM            ↗
                           …
```

- **Featured cards** (2×2 on ≥ md, 1-up on mobile): screenshot, name, a one-line point of view, stack chips, award badge if any, "Read the case →".
- **Card click** opens the **case dialog** (brief → constraint → decision → outcome, screenshots, links). See [`06-interactions.md`](06-interactions.md#case-dialog).
- **Archive:** filter chips plus a ruled table (name, type, stack, link). On mobile it becomes a stacked list. On desktop, hovering a row shows a floating thumbnail that follows the cursor (`pointer: fine` only).
- **Screenshots:** real screenshots supplied by Khalid. Until then, a neutral placeholder box shows the project name in mono (**no stock images, no mockup frames**).

---

## 05 — Skills `#skills`

**Job:** a scannable stack, honest and grouped. Each skill links to where it was used.

```
 05 — SKILLS        Languages         Front-end        Back-end
 Click a skill to   Java              React            Node.js
 see projects       JavaScript        Redux            Express
 that use it.       Python            Tailwind CSS     MongoDB / Mongoose
                    C / C++           Bootstrap        JWT · OAuth 2.0
                    PHP               Axios            Jest · Mocha · Chai

                    Mobile            Databases        Cloud & DevOps
                    Android (Java)    MongoDB          AWS (EC2, Route 53)
                    MVVM · Retrofit   MySQL            Nginx · Apache
                    Firebase          Firebase         Docker · Linux · Bash
                    TensorFlow Lite   SQLite           Git · GitHub
```

- 6 groups in a 3-col grid (≥ lg), 2-col (md), 1-col (mobile). Strongest skills come first in each group.
- **Interactive:** each skill is a button. Clicking it filters the Work archive by that skill and scrolls there (see interactions). Skills with no linked project are plain text.
- No bars, no percentages, no logos.

---

## 06 — Credentials `#credentials`

**Job:** a quick trust check. Short.

```
 06 — CREDENTIALS   EDUCATION
                    B.Sc. Engg., Electrical & Computer Engineering — RUET        2017 — 2024
                    ─────────────────────────────────────────────────────────────
                    CERTIFICATIONS
                    Machine Learning Specialization — Univ. of Washington · Coursera   Verify ↗
                    Reinforcement Learning Specialization — Univ. of Alberta · Coursera  Verify ↗
                    Self-Driving Cars Specialization — Univ. of Toronto · Coursera    Verify ↗
                    ─────────────────────────────────────────────────────────────
                    AWARDS
                    Winner — IEEE YESIST12 2020, Special Track (PLASMA+)          Sep 2020
                    2nd Runner-up — Virtual Project Competition on ICT, IICT RUET  Dec 2020
                    Most Popular Project — IEEE YESIST12 2019, Maker Fair Track   Sep 2019
```

- Three ruled lists. No CGPA, no transcripts, no test scores (the academic cut).

---

## 07 — Contact (footer) `#contact`

**Job:** one obvious next step.

- Headline "Let's build something." (`text-h2`).
- **Primary:** "Email me" (mailto, ink button). **Secondary:** "Copy email" (shows a toast). Then LinkedIn ↗ and GitHub ↗.
- A small line: "Prefer the keyboard? Press ⌘K."
- Footer meta: © year, "Built with Next.js", source link to the repo.
