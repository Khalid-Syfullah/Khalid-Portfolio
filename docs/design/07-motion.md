# 07 — Motion

← [DESIGN.md](../../DESIGN.md) · Interactions: [`06-interactions.md`](06-interactions.md)

Library: **Motion** (the current name of Framer Motion), imported from `motion/react`, for the **spring-driven** pieces: the reading-progress bar and the archive hover preview. Both live in lazily loaded components wrapped in `MotionScope` (`LazyMotion` + `domAnimation` + `MotionConfig reducedMotion="user"`), so Motion's code never ships in the first load.

Everything else animates with **CSS**: the hero entrance (keyframes in `globals.css`), dialogs, drawers and the command menu (shadcn's `tw-animate-css` `data-state` animations), the nav underline, the accordion and the archive rows. That keeps the page light on phones.

**Rule:** motion confirms an action or orients the eye. One orchestrated entrance on load; everything else is a response to the visitor.

## Tokens

| Token | Value | Use |
|---|---|---|
| `fast` | 120ms | Colour/opacity on hover, icon swaps |
| `base` | 200ms | Buttons, chips, photo greyscale → colour |
| `expand` | 280ms | Accordion height, dialog open |
| `intro` | 600ms | Hero entrance (per element) |
| `ease` | `cubic-bezier(0.2, 0, 0, 1)` | Default ease-out (enter) |
| `ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits |
| `spring.layout` | `{ type: "spring", stiffness: 380, damping: 34 }` | `layout` / `layoutId` moves (nav underline, filter reflow) |
| `spring.follow` | `{ type: "spring", stiffness: 300, damping: 30 }` | Hover preview following the cursor |
| `stagger` | 40ms | Hero headline lines, archive rows |

```ts
// lib/motion.ts
export const ease = [0.2, 0, 0, 1] as const;
export const easeIn = [0.4, 0, 1, 1] as const;
export const t = { fast: 0.12, base: 0.2, expand: 0.28, intro: 0.6 };
export const spring = {
  layout: { type: "spring", stiffness: 380, damping: 34 },
  follow: { type: "spring", stiffness: 300, damping: 30 },
} as const;
```

## Load choreography (hero only, once, pure CSS)

```
 t=40ms   headline         y 16→0, transform only (600ms, ease); never transparent, it is the LCP text
 t=280ms  lead paragraph   opacity 0→1, y 8→0
 t=360ms  links + buttons  opacity 0→1
 t=700ms  availability dot single pulse
```

- The photo has no entrance animation: on phones it's a large paint, and a clip-path reveal held LCP back by seconds in testing.
- CSS keyframes run before hydration, so nothing waits for JavaScript.
- Below-the-fold sections don't animate on scroll. No "fade-up on every section". The only scroll-linked motion is the progress bar.

## Per element

| Element | Motion |
|---|---|
| Nav underline | CSS `scale-x` 0→1 from the left, 200ms |
| Reading progress | **Motion**: `scaleX` from `useSpring(scrollYProgress, { stiffness: 200, damping: 40 })`, origin left; loads when idle |
| Header rule | opacity 0→1 at scrollY > 8, `fast` |
| Accordion | Radix `--radix-accordion-content-height` + `animate-accordion-down/up`; ± icon: the vertical bar `scaleY 1→0` (280ms) |
| Project card hover | image `scale 1.02` (`base`), arrow `x 0→4` (`fast`), border colour (`fast`) |
| Case dialog / drawer | `tw-animate-css` fade + zoom (dialog) or vaul slide (drawer) |
| Command menu | `tw-animate-css` fade + zoom; items have no stagger (speed matters) |
| Archive filter | rows replay a CSS fade-in + 6px rise, stagger 20ms, max 8 staggered; no exit animation |
| Hover preview | **Motion**: `x/y` via `useSpring` (`spring.follow`); `AnimatePresence` opacity in `fast`, out `base` |
| Theme icon | icon swap, `fast` |
| Toast | sonner defaults |

## Reduced motion

`useReducedMotion()` plus a CSS `@media (prefers-reduced-motion: reduce)` block:

- Hero entrance: **opacity only**, 200ms, no y and no clip-path.
- Accordion: instant height, opacity 120ms.
- No pulse, no hover-preview follow (the preview stays put at its first position), no image scale.
- Smooth scrolling off (`scroll-behavior: auto`).
- The progress bar stays (it carries meaning) but without the spring.

```tsx
// components/motion-scope.tsx
<LazyMotion features={domAnimation} strict>
  <MotionConfig reducedMotion="user" transition={{ duration: t.base, ease }}>
    {children}
  </MotionConfig>
</LazyMotion>
```

## Performance rules

- Animate only `transform` and `opacity` (plus `clip-path` once, for the hero photo). Never width, height or top, except the accordion height, which is measured by Motion.
- Every Motion component lives in a lazily loaded client island (`next/dynamic`). Sections stay server components and wrap only their interactive part.
- No animation runs while the tab is hidden; Motion handles this.
