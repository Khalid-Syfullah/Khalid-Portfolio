# 03 — Layout

← [DESIGN.md](../../DESIGN.md)

## Page structure

One page. Five sections plus the hero and the footer. The order is fixed:

```
<Header/>                 sticky, 64px
<main>
  #top          Hero        01 — INTRO
  #about        About       02 — ABOUT
  #experience   Experience  03 — EXPERIENCE
  #work         Work        04 — WORK
  #skills       Skills      05 — SKILLS
  #credentials  Credentials 06 — CREDENTIALS
</main>
<Footer/>       #contact    contact CTA
<CommandMenu/>  portal (dialog)
<Toaster/>      portal
```

The nav shows five items (About, Experience, Work, Skills, Credentials). The hero is reached through the name or logo, and Contact through the footer CTA and the menu.

## Container and grid

- Container: `max-width: 1280px; margin-inline: auto; padding-inline: var(--gutter)`.
- Every section uses the same **two-column anatomy**:

```
desktop ≥ 1024px
┌─────────────── container 1280 ───────────────┐
│ ┌─ label col ─┐ 56px ┌──── content col ─────┐ │
│ │ 03 — EXPER. │      │                      │ │
│ │ helper text │      │  section content     │ │
│ │ (sticky)    │      │                      │ │
│ └─────────────┘      └──────────────────────┘ │
└───────────────────────────────────────────────┘
grid-template-columns: minmax(240px, 300px) minmax(0, 1fr);
column-gap: 56px;

mobile < 1024px
┌──── container ────┐
│ 03 — EXPERIENCE   │   label row: index + helper on one line
│ ───────────────── │
│ section content   │
└───────────────────┘
grid-template-columns: minmax(0, 1fr);  row-gap: 24px;
```

- **The label column is sticky** on desktop (`position: sticky; top: 96px`), so the section index stays in view while the content scrolls. On mobile it's a normal block.
- Sections are separated by a 1px `--border` rule and `--section-y` padding.

## Header

```
desktop
┌──────────────────────────────────────────────────────────────────────────┐
│ khalid syfullah    About  Experience  Work  Skills  Credentials   [⌘K] [Résumé ↓] [◐] │
└──────────────────────────────────────────────────────────────────────────┘
 mono wordmark      text links, active = brand underline     ghost  ink-fill  icon
 ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁  2px brand progress bar (reading progress)

mobile
┌──────────────────────────────────┐
│ khalid syfullah        [⌘] [≡]   │   ⌘ opens the command menu; ≡ opens a Sheet
└──────────────────────────────────┘   (nav + Résumé + theme)
```

- Height 64px, solid `--background`. **No blur or glass.** The bottom `--border` rule appears only after 8px of scroll.
- The wordmark links to `#top`.
- The active nav item comes from scroll-spy (see [`06-interactions.md`](06-interactions.md)).
- On a phone, the ⌘ button opens the same command menu, as a bottom drawer.

## Footer / contact

```
┌──────────────┬───────────────────────────────────────────────┐
│ 07 — CONTACT │  Let's build something.                        │  text-h2
│              │  [Email me]  [Copy email]  LinkedIn ↗  GitHub ↗  │
├──────────────┴───────────────────────────────────────────────┤
│ © 2026 Md Khalid Syfullah · Built with Next.js · Press ⌘K     │  text-meta, muted
└──────────────────────────────────────────────────────────────┘
```

## Responsive rules

| Width | Behaviour |
|---|---|
| ≥ 1280 | Container capped; generous gutters |
| 1024–1279 | Same layout; gutters shrink (fluid) |
| 768–1023 | Label column stacks; Work cards 2-up; nav moves into the Sheet |
| < 768 | Single column everywhere; Work cards 1-up; archive becomes a list (no table); experience row meta wraps under the title |
| < 380 | Hero headline min 44px; link row wraps to 2×2 |

- No horizontal scroll at any width (test 320px).
- Touch targets are at least 44×44px.
- Images are fluid: `width: 100%`, a fixed `aspect-ratio` reserves space (no CLS).

## Section rhythm

| Section | Content column width | Notes |
|---|---|---|
| Hero | full content col | Headline up to ~14 words, balanced |
| About | max 38rem text, photo beside it on ≥ md | |
| Experience | full content col | Ruled list; first row open |
| Work | full content col | 2×2 featured grid plus archive |
| Skills | full content col, 3-col grid on ≥ lg | |
| Credentials | full content col, 3 stacked lists | |
