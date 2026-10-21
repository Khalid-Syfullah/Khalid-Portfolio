# 06 — Interactions

← [DESIGN.md](../../DESIGN.md) · Components: [`05-components.md`](05-components.md) · Motion: [`07-motion.md`](07-motion.md)

Every interaction exists to **find faster** or **act faster**. Each spec lists the trigger, the behaviour, keyboard/touch support, and its states.

```
                ┌──────────── find faster ────────────┐   ┌──── act faster ────┐
 visitor  ───▶  ⌘K menu · scroll-spy nav · row expand     copy email · résumé
                filters · skill→project links · deep links  theme · print
```

---

## 1. Command menu (⌘K) — the signature

**Triggers:** `⌘K` (macOS) or `Ctrl K` (Windows/Linux); the `/` key when focus isn't in a text field; the header ⌘ button; the hero hint chip; the footer line.

```
 press ⌘K ──▶ [dialog opens, input focused]
                 │ type "boi"
                 ▼
            filter (cmdk fuzzy) ──▶ ↑/↓ moves selection ──▶ Enter
                 │                                          │
                 │ Esc / click outside                      ├─ Navigate → close, smooth-scroll to #id, focus the section heading
                 ▼                                          ├─ Project  → close, open CaseDialog(slug)
            [closes, focus returns to trigger]              ├─ Action   → run (copy / download / theme / print), toast
                                                            └─ Link     → open in new tab
```

**Groups and items** (built from `content/*.ts`, never hand-listed):

| Group | Items |
|---|---|
| Navigate | About · Experience · Work · Skills · Credentials · Contact |
| Projects | one per project, featured first (keywords: stack, type) |
| Actions | Copy email · Download résumé · Toggle theme · Print this page as a résumé |
| Links | GitHub ↗ · LinkedIn ↗ · LeetCode ↗ · Email ↗ |

- **Search** matches label plus keywords, so "android" finds Android projects and "cv" finds Download résumé. Ranking is predictable: exact word > word prefix > substring (a custom `filter` replaces cmdk's fuzzy score).
- **Empty state:** "No results for "xyz"." plus a suggestion row "Show all projects".
- **Mobile:** opens as a bottom `Drawer`; the input is autofocused only after the open animation, so the keyboard doesn't jump.
- **A11y:** `role="dialog"` with a label; the cmdk listbox semantics; focus is trapped and then restored.
- The global key listener is registered once in `CommandMenu`. It ignores events from inputs and textareas (except ⌘K itself).

---

## 2. Header: scroll-spy, progress, compact state

- **Scroll-spy:** an `IntersectionObserver` on each `section[id]` with `rootMargin: "-45% 0px -50% 0px"`. The section crossing the middle band is active, and the active nav link's 2px brand underline scales in from the left (CSS `scale-x`, 200ms).
- **Reading progress:** a 2px brand bar under the header whose width is `scrollYProgress` (Motion `useScroll`, `useSpring` with stiffness 200 and damping 40).
- **Compact state:** after 8px of scroll, the header's bottom rule fades in. The header never hides.
- **Nav click:** smooth-scrolls to the section (`scroll-margin-top: 80px` on sections), updates the URL hash with `history.replaceState`, and moves focus to the section heading (`tabIndex={-1}`).

---

## 3. Experience rows (accordion)

```
  [row closed] ──click / Enter / Space──▶ [row open]   (any other open row closes)
       ▲                                       │
       └──────────── click again ──────────────┘
  URL: #experience/<slug> opens that row on load and scrolls to it
```

- Radix `Accordion type="single" collapsible defaultValue={first}`.
- Height animates (see motion); the content fades in 60ms after the height starts.
- **SHIPPED chips** inside a row open that project's case dialog.

---

## 4. Work: case dialog <a id="case-dialog"></a>

Cards, SHIPPED chips and archive names are plain links to `#work/<slug>`. The dialog host listens for the hash, so links work without JavaScript and can be shared or opened in a new tab.

```
 click card ──▶ dialog opens (URL → #work/<slug>) ──▶ Esc / ✕ / back button ──▶ closes (URL → previous)
                     │
                     └─ ← / → keys (or swipe on touch) move to the previous/next featured project
```

- **Deep link:** visiting `/#work/boimela` opens the dialog on load.
- The **browser back button** closes the dialog. A link click (or `openCase()` from the menu) adds a history entry, so closing calls `history.back()`. A deep link on first load has no entry to go back to, so closing just rewrites the hash to `#work`.
- Focus goes to the dialog title on open and returns to the card on close.

## 5. Work: archive filters and hover preview

- **The archive lists every project** (featured ones carry a "featured" tag), so "All projects (n)" is literal.
- **Filter chips:** single select. Changing the filter replays a short CSS fade-and-rise on the rows (staggered 20ms, max 8), and the result count updates. An `aria-live="polite"` region reads "6 projects".
- **Filter state** lives in the URL query (`?stack=android`), so it's shareable and survives a reload.
- **Hover preview** (desktop, `pointer: fine` and `hover: hover` only): hovering a row shows a 240×150 thumbnail that follows the cursor with a Motion spring (stiffness 300, damping 30) and an offset of +16px/+16px. It fades out on leave, and its code loads on the first hover. On touch, nothing happens; rows just link.

## 6. Skills → projects

```
 click "MongoDB" ──▶ archive filter = MongoDB ──▶ smooth-scroll to #work archive ──▶ toast-free; the chip shows "MongoDB ✕"
```

- A skill is a button only if at least one project lists it; otherwise it's plain text.
- The filter chip row gains a removable "MongoDB ✕" chip; clearing it restores the previous filter.

## 7. Copy email

- Click "Copy email" → `navigator.clipboard.writeText(email)` → toast "Email copied" (sonner, 2.5s, bottom-center).
- If clipboard access is refused, fall back to a `mailto:` link and the toast reads "Couldn't copy, opening your mail app".

## 8. Résumé download

- A static file at `/resume/Md-Khalid-Syfullah-Resume.pdf`, `download` attribute, opens in a new tab on iOS.
- The palette command does the same.

## 9. Theme

- `next-themes`, `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`, so there's no flash.
- The toggle cycles light ↔ dark (system is the initial state only). The icon swaps with a 120ms rotate and fade.

## 10. Print → résumé

`Ctrl/⌘ P` or the palette command "Print this page as a résumé":

- Hides the header, progress bar, menu, photos, hover previews, filter chips and footer CTA.
- Expands every experience row and lists all projects (featured plus archive) as plain text.
- Black on white, Schibsted at 10.5pt, `@page { margin: 16mm }`. Link URLs are printed after the link text (`a[href^="http"]::after { content: " (" attr(href) ")" }`).
- Target: 2 A4 pages.

## 11. Small details

- **Photos:** greyscale → colour on hover or focus (200ms filter transition).
- **Availability dot:** a single pulse on load (scale 1 → 1.8, fading out), none under reduced motion.
- **External links** get `↗` and `rel="noopener noreferrer"`.
- **Skip link:** "Skip to content" appears on first Tab.
- **Keyboard map:** Tab order follows reading order; ⌘K anywhere; `/` opens search; Esc closes any overlay.

## Interaction inventory (for QA)

| # | Interaction | Desktop | Touch | Keyboard | URL state |
|---|---|---|---|---|---|
| 1 | Command menu | ✓ | Drawer | ⌘K, /, ↑↓, Enter, Esc | — |
| 2 | Scroll-spy plus progress | ✓ | ✓ | — | hash on nav click |
| 3 | Experience accordion | ✓ | ✓ | Enter/Space | `#experience/<slug>` |
| 4 | Case dialog | ✓ | Drawer, swipe | Esc, ←/→ | `#work/<slug>` |
| 5 | Archive filter | ✓ | ✓ | Arrow keys in group | `?stack=` |
| 5b | Hover preview | ✓ | — | — | — |
| 6 | Skill → project filter | ✓ | ✓ | Enter | `?stack=` |
| 7 | Copy email | ✓ | ✓ | Enter | — |
| 8 | Résumé download | ✓ | ✓ | Enter | — |
| 9 | Theme toggle | ✓ | ✓ | Enter | localStorage |
| 10 | Print résumé | ✓ | — | ⌘P | — |
