# 07 — Motion

← [DESIGN.md](../../DESIGN.md) · Interactions: [`06-interactions.md`](06-interactions.md)

Library: **Motion** (the current name of Framer Motion), imported from `motion/react`. Use `LazyMotion` with `domAnimation` features plus the `m.*` components, to keep the bundle small.

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

## Load choreography (hero only, once)

```
 t=0      header fades in (opacity 0→1, 200ms)
 t=80ms   headline line 1  y 16→0, opacity 0→1 (600ms, ease)
 t=120ms  headline line 2  …
 t=160ms  headline line 3  …
 t=280ms  lead paragraph   opacity 0→1, y 8→0
 t=360ms  links + buttons  opacity 0→1
 t=360ms  photo            clip-path inset(0 0 100% 0) → inset(0) (600ms)
 t=700ms  availability dot single pulse
```

- Headline lines come from a server-rendered split (one `<span>` per line, from content), not a client-side text splitter.
- **The text is visible without JS:** the initial styles are applied only once JS hydrates (`initial={false}` on SSR, then animate). This avoids an LCP penalty.
- Below-the-fold sections don't animate on scroll. No "fade-up on every section". The only scroll-linked motion is the progress bar.

## Per element

| Element | Motion |
|---|---|
| Nav underline | `layoutId="nav-underline"`, `spring.layout` |
| Reading progress | `scaleX` from `useSpring(scrollYProgress, { stiffness: 200, damping: 40 })`, origin left |
| Header rule | opacity 0→1 at scrollY > 8, `fast` |
| Accordion | height auto via `AnimatePresence` + `m.div` `animate={{ height: "auto" }}` `expand`/`ease`; content opacity delayed 60ms; ± icon: the vertical bar `scaleY 1→0` |
| Project card hover | image `scale 1.02` (`base`), arrow `x 0→4` (`fast`), border colour (`fast`) |
| Case dialog | overlay opacity 0→1 (`base`); panel `y 24→0, scale 0.98→1, opacity` (`expand`, `ease`); exit reversed with `ease-in` at 200ms |
| Command menu | panel `scale 0.98→1, opacity` (`base`); items have no stagger (speed matters) |
| Archive filter | rows `layout` + `AnimatePresence` (`initial={{opacity:0, y:6}}`), stagger 20ms, max 8 staggered |
| Hover preview | `x/y` via `useSpring` (`spring.follow`); opacity in `fast`, out `base` |
| Theme icon | rotate 90° + opacity crossfade, `fast` |
| Toast | sonner defaults |

## Reduced motion

`useReducedMotion()` plus a CSS `@media (prefers-reduced-motion: reduce)` block:

- Hero entrance: **opacity only**, 200ms, no y and no clip-path.
- Accordion: instant height, opacity 120ms.
- No pulse, no hover-preview follow (the preview stays put at its first position), no image scale.
- Smooth scrolling off (`scroll-behavior: auto`).
- The progress bar stays (it carries meaning) but without the spring.

```tsx
<MotionConfig reducedMotion="user" transition={{ duration: t.base, ease }}>
  {children}
</MotionConfig>
```

## Performance rules

- Animate only `transform` and `opacity` (plus `clip-path` once, for the hero photo). Never width, height or top, except the accordion height, which is measured by Motion.
- Every `motion` component lives in a client island. Sections stay server components and wrap only their interactive part.
- No animation runs while the tab is hidden; Motion handles this.
