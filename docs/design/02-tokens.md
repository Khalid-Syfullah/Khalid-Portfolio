# 02 — Design tokens

← [DESIGN.md](../../DESIGN.md)

Every colour, size and duration in the codebase comes from this file. Components use Tailwind classes or CSS variables, **never raw hex values**.

## Colour

### Light (default)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--background` | `#F3F3F0` | Page ground (neutral paper, not cream) | — |
| `--card` / `--popover` | `#FFFFFF` | Command menu, dialogs, cards | — |
| `--foreground` | `#121212` | Headlines, body text | 16.9 on bg |
| `--ink-2` | `#33332F` | Secondary text, lead paragraphs | 11.4 on bg |
| `--muted-foreground` | `#5A5A55` | Labels, meta, periods | 6.2 on bg |
| `--border` | `#D6D6D0` | Row rules, dividers (decorative) | — |
| `--rule-strong` | `#121212` | Top rule of a section's list | — |
| `--input` | `#85857E` | Borders of controls (buttons, inputs, chips) | ≥ 3:1 on bg (UI) |
| `--brand` | `#2747D8` | **The one accent**: active state, focus ring, the availability dot, link hover | 6.3 on bg |
| `--brand-foreground` | `#FFFFFF` | Text on brand fills | 7.1 |
| `--accent` | `#E6EAFB` | shadcn hover/selected surface (menu item highlight) | ink 15.6 |
| `--secondary` / `--muted` | `#EAEAE6` | Chip fills, subtle surfaces | — |
| `--destructive` | `#B42318` | Not used in UI; kept for shadcn defaults | — |

### Dark

| Token | Hex | Contrast |
|---|---|---|
| `--background` | `#0E0E0D` | — |
| `--card` / `--popover` | `#171716` | — |
| `--foreground` | `#EEEDE7` | 16.5 on bg |
| `--ink-2` | `#C9C8C0` | 11.5 on bg |
| `--muted-foreground` | `#9C9B93` | 6.9 on bg |
| `--border` | `#2B2B28` | — |
| `--rule-strong` | `#EEEDE7` | — |
| `--input` | `#6B6B65` | ≥ 3:1 on bg (UI) |
| `--brand` | `#7C93FF` | 6.9 on bg (lighter blue for dark) |
| `--brand-foreground` | `#0E0E0D` | 6.9 |
| `--accent` | `#1C2350` | ink 12.7 |
| `--secondary` / `--muted` | `#1D1D1B` | — |

**Rules**

- The brand blue is the only chromatic colour on the page, apart from the photos.
- Brand never fills large areas. Buttons are ink-filled (`--foreground` background) and brand is reserved for *state*.
- The theme follows the system setting on first visit; the toggle overrides it and is remembered.

## Typography

| Role | Family | Fallback |
|---|---|---|
| Sans (display + body) | **Schibsted Grotesk** (variable 400–800) | `"Helvetica Neue", Arial, sans-serif` |
| Mono (labels, meta, kbd) | **IBM Plex Mono** 400, 500 | `ui-monospace, SFMono-Regular, Menlo, monospace` |

Loaded with `next/font/google` (self-hosted, `display: swap`, Latin subset).

### Scale

Implemented as Tailwind `@utility type-*` classes, **not** `text-*`. The class merger (`cn`) would otherwise read a custom `text-small` as a colour and drop `text-primary-foreground` beside it.

| Class | Size | Line height | Tracking | Weight | Used for |
|---|---|---|---|---|---|
| `type-display` | `clamp(2.75rem, 1.4rem + 5.2vw, 5.75rem)` (44→92px) | 1.02 | -0.035em | 700 | Hero headline only |
| `type-h2` | `clamp(2rem, 1.5rem + 2vw, 3rem)` (32→48px) | 1.05 | -0.025em | 700 | Section titles, dialog titles |
| `type-h3` | `1.5rem` (24px) | 1.2 | -0.01em | 600 | Row titles, card titles |
| `type-lead` | `1.25rem` (20px) | 1.55 | 0 | 400 | Hero/About lead paragraph |
| `type-body` | `1.0625rem` (17px) | 1.55 | 0 | 400 | Default |
| `type-small` | `0.9375rem` (15px) | 1.5 | 0 | 400 | Nav, meta lists |
| `type-label` | `0.8125rem` (13px), mono, uppercase | 1.4 | 0.04em | 500 | Section index `02 — EXPERIENCE` |
| `type-meta` | `0.875rem` (14px), mono | 1.4 | 0 | 400 | Periods, kbd, chips |

- `text-wrap: balance` on headlines; `text-wrap: pretty` on paragraphs.
- Body measure: 60–72 characters (`max-w-[38rem]` on paragraphs).
- Numbers in periods use `font-variant-numeric: tabular-nums`.

## Spacing (4 px base)

`1`=4 · `2`=8 · `3`=12 · `4`=16 · `6`=24 · `8`=32 · `10`=40 · `14`=56 · `18`=72 · `24`=96 · `32`=128

| Token | Value |
|---|---|
| `--gutter` (page side padding) | `clamp(20px, 4vw, 56px)` |
| `--section-y` (section top/bottom padding) | `clamp(56px, 8vw, 96px)` |
| `--container` | `1280px` |
| `--label-col` | `minmax(240px, 300px)` (see layout) |
| Column gap (label ↔ content) | `56px` desktop, `24px` stacked |

## Radii, borders, elevation

| Class | Value | Use |
|---|---|---|
| `rounded-sm` | 4px | Images |
| `rounded-md` | 6px | Buttons, inputs |
| `rounded-lg` | 10px | Menu items (pill chips use `rounded-full`) |
| `rounded-xl` | 14px | Command menu panel, dialogs, cards |
| Border | 1px solid | Everything; 2px only for the focus ring |
| `--shadow-pop` | `0 24px 48px -24px rgb(18 18 18 / 0.35)` | Command menu, dialog, toast only |

There are no other shadows. Depth comes from rules and surfaces.

## Breakpoints

Tailwind defaults: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280. The layout's one real switch is at **`lg` (1024px)**: below it, the label column stacks above the content.

## Z-index

`header 40` · `progress 41` · `dialog/command 50` · `toast 60`

## Motion tokens

See [`07-motion.md`](07-motion.md). Short version: `fast 120ms`, `base 200ms`, `expand 280ms`, `intro 600ms`; ease `cubic-bezier(0.2, 0, 0, 1)`.

---

## Implementation

`app/globals.css` is the implementation of this file, and the two must match:

- `:root` and `.dark` hold the colour tokens above, under shadcn/ui's variable names (`--background`, `--primary`, `--accent` …) plus our own (`--brand`, `--ink-2`, `--rule-strong`).
- `@theme inline` maps them to Tailwind colours (`bg-brand`, `text-ink-2`, `border-rule-strong` …), fonts (`font-sans`, `font-mono`) and radii.
- `@utility type-*` defines the type scale.
- Fonts load in `app/layout.tsx` with `next/font/google` (`Schibsted_Grotesk` → `--font-schibsted`, `IBM_Plex_Mono` 400/500 → `--font-plex-mono`).
- The print block at the end turns the page into a two-page résumé (see [`06-interactions.md` §10](06-interactions.md)).
