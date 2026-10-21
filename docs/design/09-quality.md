# 09 — Quality: accessibility, performance, SEO, print, review

← [DESIGN.md](../../DESIGN.md)

## Accessibility (WCAG 2.2 AA)

- **Contrast:** every text token passes 4.5:1 on its surfaces in both themes (the computed values are in [`02-tokens.md`](02-tokens.md)). Control borders (`--input`) pass 3:1.
- **Keyboard:** everything works without a mouse. Visible 2px focus ring. A skip link. Logical tab order. ⌘K, `/` and Esc as specced.
- **Semantics:** one `<h1>` (hero headline); each section has an `<h2>` (visually it may be the mono label). `<nav aria-label="Sections">`, `<main>`, `<footer>`. Lists are lists, `<dl>` for facts, a `<table>` for the archive on desktop.
- **Overlays:** dialogs and drawers trap focus, restore it on close and are labelled.
- **Live regions:** archive result count and toasts (`aria-live="polite"`).
- **Images:** meaningful `alt` text on the portraits; decorative SVGs get `aria-hidden`.
- **Motion:** honours `prefers-reduced-motion` (see [`07-motion.md`](07-motion.md)).
- **Zoom:** layout holds at 200% zoom and at 320px width.

## Performance budget

| Metric | Target (mobile, Lighthouse) |
|---|---|
| Lighthouse Performance / A11y / Best practices / SEO | ≥ 95 each |
| LCP | < 2.0s (the LCP element is the hero headline text, not the photo) |
| CLS | < 0.05 |
| INP | < 200ms |
| First-load JS | ≤ 130 KB gzipped |
| Fonts | 2 families, Latin subset, self-hosted via `next/font`, `swap` |
| Images | AVIF/WebP with explicit width/height; hero photo ≤ 40 KB |

How:
- `output: "export"` gives static HTML; sections are server components; only the islands hydrate (header, command menu, accordion, work, skills buttons, theme, toasts).
- `cmdk`, the dialog and the drawer are loaded with `next/dynamic` on first ⌘K, or prefetched on idle.
- `LazyMotion` + `domAnimation`.
- No analytics script at launch. If one is added later, it must be cookieless and under 2 KB.

## SEO and sharing

- `metadata` in `app/layout.tsx`: title, description, canonical, Open Graph (`og:type=profile`), Twitter card.
- **OG image:** 1200×630 generated at build (name, role and the mono index style, light theme).
- `app/sitemap.ts`, `app/robots.ts` (static).
- JSON-LD `Person`: name, jobTitle, url, sameAs (GitHub, LinkedIn), address locality, alumniOf.
- Favicon set: a mono "ks" mark (SVG plus a PNG fallback), `theme-color` per theme.

## Print

Specced in [`06-interactions.md` §10](06-interactions.md). Acceptance: printing to A4 gives 2 clean pages with all experience expanded and no UI chrome.

## Review checklist (the Phase 4 gate)

Design review (Khalid):
- [ ] Direction and overall feel approved (A base + C's command menu + B's dark ground)
- [ ] Hero headline and lead copy approved
- [ ] About paragraph approved
- [ ] Featured projects and order approved (BOIMELA, VFloors360, PLASMA+, OBOSOR)
- [ ] Every **[KHALID: …]** in `08-content.md` filled or removed
- [ ] Photos approved (greyscale → colour treatment)
- [ ] Interactions list approved (`06`)

Pre-merge (build):
- [ ] All tokens come from CSS variables; no raw hex in components
- [ ] Every interaction in the QA table works on desktop, touch and keyboard
- [ ] Light and dark checked on every section
- [ ] 320 / 390 / 768 / 1024 / 1440 widths checked, no horizontal scroll
- [ ] Lighthouse targets met (report attached to the PR)
- [ ] axe: 0 serious or critical issues
- [ ] Print preview gives 2 A4 pages
- [ ] No academic content anywhere (search for: IELTS, GRE, CGPA, transcript, journal, conference, DOI)
- [ ] README updated
