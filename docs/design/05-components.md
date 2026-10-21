# 05 — Components

← [DESIGN.md](../../DESIGN.md) · Tokens: [`02-tokens.md`](02-tokens.md) · Behaviour: [`06-interactions.md`](06-interactions.md)

Built on **shadcn/ui** (Radix primitives plus Tailwind), restyled with the tokens. Our own components sit in `components/`; shadcn's sit in `components/ui/`.

## shadcn/ui primitives to install

`button` · `badge` · `command` (cmdk) · `dialog` · `drawer` (vaul, for the mobile command menu) · `sheet` (mobile nav) · `accordion` · `toggle-group` (filters) · `tooltip` · `sonner` (toasts) · `separator`

## Inventory

| Component | File | Built on | Notes |
|---|---|---|---|
| `SiteHeader` | `components/site-header.tsx` | — | Wordmark, `NavLinks`, `CommandTrigger`, résumé button, `ThemeToggle`; mobile `Sheet` |
| `NavLinks` | `components/nav-links.tsx` | — | Reads the active id from `useScrollSpy` |
| `ReadingProgress` | `components/reading-progress.tsx` | Motion `useScroll` | 2px brand bar under the header |
| `Section` | `components/section.tsx` | — | The two-column anatomy: `index`, `label`, `helper`, `children` |
| `SectionLabel` | inside `Section` | — | `03 — EXPERIENCE` (mono label) plus helper text; sticky on lg |
| `Hero` | `components/sections/hero.tsx` | — | |
| `About` | `components/sections/about.tsx` | — | |
| `ExperienceList` | `components/sections/experience.tsx` | `accordion` | Single open, first open by default |
| `ExperienceRow` | inside `ExperienceList` | `AccordionItem` | Trigger = full-width row; content = bullets plus `ProjectChip`s |
| `WorkGrid` | `components/sections/work.tsx` | — | Featured `ProjectCard` ×4 plus `ProjectArchive` |
| `ProjectCard` | `components/project-card.tsx` | `button` → `dialog` | Opens `CaseDialog` |
| `CaseDialog` | `components/case-dialog.tsx` | `dialog` | brief / constraint / decision / outcome, images, links; URL hash sync |
| `ProjectArchive` | `components/project-archive.tsx` | `toggle-group` | Filter chips plus ruled table / mobile list; `HoverPreview` |
| `HoverPreview` | `components/hover-preview.tsx` | Motion | Cursor-following thumbnail, `pointer: fine` only |
| `SkillGroups` | `components/sections/skills.tsx` | `button` | Skill buttons filter the archive |
| `Credentials` | `components/sections/credentials.tsx` | — | Three ruled lists |
| `ContactFooter` | `components/contact-footer.tsx` | `button`, `sonner` | Email, copy-email, socials |
| `CommandMenu` | `components/command-menu.tsx` | `command` in `dialog` / `drawer` | Global ⌘K; see interactions |
| `CommandTrigger` | `components/command-trigger.tsx` | `button` | Shows the platform-correct shortcut |
| `ThemeToggle` | `components/theme-toggle.tsx` | `button`, `next-themes` | Sun/moon icon, `aria-label` |
| `CopyButton` | `components/copy-button.tsx` | `button`, `sonner` | Clipboard plus toast "Email copied" |
| `ProjectChip` / `StackChip` | `components/chips.tsx` | `badge` | Pill, `text-meta` |
| `Kbd` | `components/kbd.tsx` | — | `<kbd>` styled mono, 1px `--input` border |

## Specs

### Button

| Variant | Look | Use |
|---|---|---|
| `primary` | `bg-primary text-primary-foreground` (ink fill), radius 6, h-11 (44px), px-5, weight 600 | Résumé, Email me |
| `ghost` | transparent, 1px `--input` border | ⌘K hint, Copy email |
| `link` | underline 1px, offset 4px; hover → brand | Inline links, "Read the case →" |
| `icon` | 44×44, ghost | Theme toggle, mobile menu |

States: hover (primary: 8% lighter or darker; ghost: `bg-accent`), focus-visible (2px ring), active (translateY 1px), disabled (not used).

### ExperienceRow

```
┌ trigger (button, full width, min-h 76px) ──────────────────────────────────┐
│ period(190px, mono, muted) │ org h3 / role ink-2 (flex) │ place (170px) │ ± │
└──────────────────────────────────────────────────────────────────────────┘
  content: padding-left aligns with the org column; bullets (max 3) then chips
```

- `aria-expanded`, `aria-controls` (Radix handles them).
- The ± icon is a 2-bar glyph whose vertical bar scales to 0 when open (see motion).
- Hover: the org text turns brand; the row background stays.

### ProjectCard

```
┌───────────────────────────────┐  radius-lg, 1px border, bg-card
│ image 16:10 (radius-sm)       │
│ NAME (h3)        ★ award chip │
│ one-line point of view (ink-2)│
│ [Android] [Node.js] [React]   │
│ Read the case →               │  link style; the arrow nudges 4px on hover
└───────────────────────────────┘
```

- The whole card is one `<button>` (opens the dialog). No nested links inside it.
- Hover: border → `--input`, image scale 1.02 (inside an overflow-hidden frame), arrow +4px.

### CaseDialog

- Width `min(860px, 100vw - 32px)`, radius-lg, `--shadow-pop`, max-h 90vh, scrolls inside.
- Layout: title plus meta row (type · year · stack), a hero image, then four labelled blocks **Brief / Constraint / Decision / Outcome** (mono labels in a left column on ≥ md), then links (GitHub ↗, Live ↗).
- On a phone it's a full-height sheet from the bottom (`drawer`).

### ProjectArchive

- Filter: `ToggleGroup type="single"` (All, Android, Web, Back-end), chips 36px high with 44px hit area.
- Table columns: Name · Type · Stack · Link. Row height 56px, 1px rules.
- Empty state (a skill filter with no match): "No projects tagged *X* yet." plus a "Show all" button.

### CommandMenu

- `Dialog` with `Command` inside; width 560px, radius-lg, `--shadow-pop`, `bg-popover`.
- Input row 52px with a search icon and an `Esc` kbd; groups Navigate · Projects · Actions · Links; items 44px with a right-side meta (`section`, `project`, `↗`).
- Selected item: `bg-accent`, with a left 2px brand bar **inside** the item's padding (not a border-left card).
- On a phone: `Drawer` from the bottom, input on top, 70vh.

## Icons

**lucide-react** for UI (search, sun, moon, arrow-up-right, plus, minus, copy, download, menu, x). Brand marks (GitHub, LinkedIn, LeetCode) come from **simple-icons** as inline SVGs, `aria-hidden` next to a text label. Never icon-only for links.

## Images

- `public/images/photo-portrait.jpg` (square) and `photo-outdoor.jpg` (4:3 crop). Export AVIF plus WebP plus JPEG at 1×/2× and serve them with `<picture>` (static export means no Next image optimizer).
- Project screenshots: `public/images/work/<slug>-1.webp`, 1600×1000.
