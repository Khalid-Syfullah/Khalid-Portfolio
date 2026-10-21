"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ease, t } from "@/lib/motion";

/** Wraps the lazily loaded Motion pieces (docs/design/07-motion.md). */
export function MotionScope({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: t.base, ease }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
