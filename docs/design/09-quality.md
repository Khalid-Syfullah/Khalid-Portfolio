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

| Metric | Target | Measured (21 Oct 2026, local build behind gzip) |
|---|---|---|
| Lighthouse desktop: Perf / A11y / BP / SEO | ≥ 95 each | **100 / 100 / 100 / 100** (LCP 0.7s, TBT 40ms, CLS 0) |
| Lighthouse mobile: A11y / BP / SEO | ≥ 95 each | **100 / 100 / 100** |
| Lighthouse mobile: Performance | ≥ 90 on PageSpeed Insights | 77–78 on the slow build container (CPU benchmark ≈ 1,200) |
| LCP (mobile, applied throttling) | < 2.5s | **2.1s** (the hero headline) |
| CLS | < 0.05 | **0** |
| First-load JS (modern browsers) | ≤ 180 KB gzipped | **178 KB**, of which ≈ 136 KB is React + the Next.js App Router runtime |
| Fonts | 2 families, Latin subset, self-hosted via `next/font`, `swap` | ✓ |
| Images | AVIF/WebP with explicit width/height; hero photo ≤ 40 KB | ✓ (hero AVIF 10 KB) |

The original 130 KB budget was below what Next.js 16's App Router needs on its own, so it is now 180 KB. Most of the remaining mobile blocking time is framework start-up, and it was measured on a container with a fraction of a typical laptop's CPU, then slowed 4× by Lighthouse. Re-check on PageSpeed Insights after deploy.

How:
- `output: "export"` gives static HTML; sections are server components; only the islands hydrate (header, command menu, accordion, work, skills buttons, theme, toasts).
- The command menu, case dialog, phone nav sheet, toaster, reading-progress bar and hover preview load with `next/dynamic`, on first use or when the browser is idle.
- Motion only appears inside those lazy chunks (`LazyMotion` + `domAnimation`).
- The type scale uses `type-*` utilities so the default `cn` works; a custom `createCn` config would add 34 KB.
- Cards, chips and archive names are plain `#work/<slug>` links, so they need no hydration.
- No analytics script at launch. If one is added later, it must be cookieless and under 2 KB.

## SEO and sharing

- `metadata` in `app/layout.tsx`: title, description, canonical, Open Graph (`og:type=profile`), Twitter card.
- **OG image:** `app/opengraph-image.png` (+ `twitter-image.png`), 1200×630: name, role and the mono index style, light theme.
- `public/sitemap.xml` and `public/robots.txt` (static files).
- JSON-LD `Person`: name, jobTitle, url, sameAs (GitHub, LinkedIn), address locality, alumniOf.
- Favicon set: a mono "ks" mark (SVG plus a PNG fallback), `theme-color` per theme.

## Print

Specced in [`06-interactions.md` §10](06-interactions.md). Acceptance: printing to A4 gives 2 clean pages with all experience expanded and no UI chrome.

## Review checklist (the Phase 4 gate)

Design review (Khalid):
- [x] Direction and overall feel approved (A base + C's command menu + B's dark ground), 21 Oct
- [ ] Hero headline and lead copy approved
- [ ] About paragraph approved
- [ ] Featured projects and order approved (BOIMELA, VFloors360, PLASMA+, OBOSOR)
- [ ] Every **[KHALID: …]** in `08-content.md` filled or removed
- [ ] Photos approved (greyscale → colour treatment)
- [ ] Interactions list approved (`06`)

Pre-merge (build), checked 21 Oct 2026 with Playwright, axe-core and Lighthouse:
- [x] All tokens come from CSS variables; no raw hex in components
- [x] Every interaction in the QA table works on desktop, touch and keyboard
- [x] Light and dark checked on every section
- [x] 320 / 390 / 768 / 1024 / 1440 widths checked, no horizontal scroll
- [x] Lighthouse: desktop 100 in every category; mobile A11y/BP/SEO 100, Performance 77–78 on the build container (see the table above)
- [x] axe: 0 serious or critical issues
- [x] Print preview gives 2 A4 pages
- [x] No academic content anywhere (search for: IELTS, GRE, CGPA, transcript, journal, conference, DOI)
- [x] README updated
