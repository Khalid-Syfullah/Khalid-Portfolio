"use client";

import { useEffect } from "react";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { MotionScope } from "./motion-scope";
import { ProjectFrame } from "./project-frame";
import type { Project } from "@/content/types";
import { spring, t } from "@/lib/motion";

function Preview({ project, point }: { project: Project | null; point: { x: number; y: number } }) {
  const x = useMotionValue(point.x);
  const y = useMotionValue(point.y);
  const sx = useSpring(x, spring.follow);
  const sy = useSpring(y, spring.follow);
  useEffect(() => {
    x.set(point.x);
    y.set(point.y);
  }, [point, x, y]);
  return (
    <AnimatePresence>
      {project ? (
        <m.div
          key="preview"
          aria-hidden
          className="pointer-events-none fixed top-0 left-0 z-30 w-60 rounded-md bg-card p-1 shadow-pop ring-1 ring-border"
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: t.fast } }}
          exit={{ opacity: 0, transition: { duration: t.base } }}
        >
          <ProjectFrame project={project} sizes="240px" />
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Thumbnail that follows the cursor over archive rows (desktop only). */
export function HoverPreview(props: { project: Project | null; point: { x: number; y: number } }) {
  return (
    <MotionScope>
      <Preview {...props} />
    </MotionScope>
  );
}
