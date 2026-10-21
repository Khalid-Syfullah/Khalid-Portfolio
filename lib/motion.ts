// Motion tokens: docs/design/07-motion.md
export const ease = [0.2, 0, 0, 1] as const;
export const easeIn = [0.4, 0, 1, 1] as const;
export const t = { fast: 0.12, base: 0.2, expand: 0.28, intro: 0.6 } as const;
export const spring = {
  layout: { type: "spring", stiffness: 380, damping: 34 },
  follow: { type: "spring", stiffness: 300, damping: 30 },
} as const;
