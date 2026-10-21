"use client";

import { dismissCase } from "@/lib/ui-store";

/**
 * Smooth-scroll to a section, record it in the URL and move focus to its heading.
 * If a case dialog is open (e.g. navigating from the command menu), it closes
 * first, and the scroll waits until the dialog has restored focus so the page
 * doesn't jump back to the card.
 */
export function goTo(id: string) {
  const hadCase = dismissCase();
  const run = () => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    window.history.replaceState(window.history.state, "", `#${id}`);
    const heading = document.getElementById(id === "top" ? "hero-title" : `${id}-title`);
    heading?.focus({ preventScroll: true });
  };
  if (hadCase) window.setTimeout(run, 320);
  else run();
}
