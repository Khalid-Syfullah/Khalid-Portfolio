# DESIGN.md — khalidsyfullah.com

The single entry point for how the new portfolio looks, reads and behaves.
Build from these files. If code and spec disagree, fix the spec first, then the code.

> **Status:** Phase 3 (Design), waiting on Khalid's review · **Updated:** 21 Oct 2026
> **Plan:** [`docs/PLAN.md`](docs/PLAN.md)

---

## The idea in one line

**A résumé you can operate.** It reads like a well-set CV: a Swiss grid, a label column and ruled rows. It behaves like a developer tool: a ⌘K command menu, keyboard navigation, filters and rows that expand.

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │ khalid syfullah     About  Experience  Work  Skills  Credentials  ⌘K ▤ │  ← header
 ├──────────────┬─────────────────────────────────────────────────────────┤
 │ 01 — INTRO   │  I build Android apps, Node.js back-ends                │
 │ [photo]      │  and React front-ends.                                  │  ← hero
 │ Role  …      │  lead paragraph · links                                 │
 ├──────────────┼─────────────────────────────────────────────────────────┤
 │ 02 — ABOUT   │  short paragraph · facts · photo                        │
 ├──────────────┼─────────────────────────────────────────────────────────┤
 │ 03 — EXPER.  │  Apr 2021—Dec 2021  Qubitech Solutions        −         │
 │              │  Apr 2021—Jun 2021  MonstarLab Bangladesh     +         │  ← ruled rows
 ├──────────────┼─────────────────────────────────────────────────────────┤
 │ 04 — WORK    │  [card] [card] [card] [card]   ·  All projects ▾         │
 │ 05 — SKILLS  │  …                                                      │
 │ 06 — CREDS   │  …                                                      │
 └──────────────┴─────────────────────────────────────────────────────────┘
   label column (3/12)          content column (9/12)
```

## Direction

The base is **Direction A · Résumé Sheet** from the design canvas, with two additions:

- **from C · Console:** the command menu and the filters, which make it interactive;
- **from B · Big Type:** the near-black ground of the dark theme.

The full reasoning, and what each reference gallery contributed, is in [`01-direction.md`](docs/design/01-direction.md).

## Principles

1. **Résumé first.** A recruiter finds role, experience and contact within 10 seconds, without scrolling past decoration.
2. **Every interaction has a job.** It either speeds up scanning (filter, expand, jump) or acts (copy, download). Nothing moves just to move.
3. **One accent, used sparingly.** Blue marks what is active or actionable, and nothing else.
4. **Fewer, better.** 4 featured projects, 5 sections, 1 accent, 2 typefaces.
5. **Same page on every device.** Phone is a first-class layout, not a squeezed desktop.
6. **Fast and accessible by default.** Static export, keyboard-complete, AA contrast, reduced-motion safe.

## Files

| File | What it decides |
|---|---|
| [`docs/design/01-direction.md`](docs/design/01-direction.md) | Concept, references, why this direction, what we rejected |
| [`docs/design/02-tokens.md`](docs/design/02-tokens.md) | Colours (light/dark), type scale, spacing, radii, shadows, breakpoints, CSS variables and the Tailwind `@theme` |
| [`docs/design/03-layout.md`](docs/design/03-layout.md) | Page grid, section anatomy, header, responsive rules |
| [`docs/design/04-sections.md`](docs/design/04-sections.md) | Each section: Hero, About, Experience, Work, Skills, Credentials, Contact |
| [`docs/design/05-components.md`](docs/design/05-components.md) | Component inventory mapped to shadcn/ui, with variants, states and a11y |
| [`docs/design/06-interactions.md`](docs/design/06-interactions.md) | Every interaction: command menu, scroll-spy, rows, filters, case dialog, copy, theme, print |
| [`docs/design/07-motion.md`](docs/design/07-motion.md) | Motion (Framer Motion) durations, easings, springs, choreography, reduced motion |
| [`docs/design/08-content.md`](docs/design/08-content.md) | All copy and data: the single source for `content/*.ts` |
| [`docs/design/09-quality.md`](docs/design/09-quality.md) | Accessibility, performance, SEO, print, and the review checklist |

## Scope decisions (from Khalid)

- **Positioning:** Software Engineer.
- **Removed:** everything academic. That means research papers, IELTS/GRE, transcripts, certificates, HSC/SSC, CGPA and student leadership. Kernel / Chimera OS work and the Blog are also out.
- **Kept:** the B.Sc. degree (one line), Coursera certifications, and project awards that belong to shipped products.
- **Photos:** the two portraits from the old site.
- **Old site:** scrapped completely; nothing carries over except facts and photos.

## How to use this during the build

- Tokens in `02` become `app/globals.css` (CSS variables plus Tailwind v4 `@theme`). No raw hex values in components.
- Copy and data in `08` become `content/*.ts`. Components never hard-code copy.
- Every component in `05` and every behaviour in `06` gets built exactly once, then reused.
- Before the PR, run the checklist in `09`.
