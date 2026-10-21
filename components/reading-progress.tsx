"use client";

import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { MotionScope } from "./motion-scope";

function Bar() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <m.div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  );
}

/** 2px reading-progress bar under the header (docs/design/06-interactions.md §2). */
export function ReadingProgress() {
  return (
    <MotionScope>
      <Bar />
    </MotionScope>
  );
}
