"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

/** Matches a media query; false during SSR. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Phone-sized or touch-first: overlays become bottom drawers. */
export function useIsCompact() {
  return useMediaQuery("(max-width: 767px)");
}

/** "⌘K" on Apple platforms, "Ctrl K" elsewhere. Defaults to ⌘K on the server. */
export function useShortcutLabel() {
  const [label, setLabel] = useState("⌘K");
  useEffect(() => {
    const p = navigator.userAgent;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- platform is only known after hydration
    if (!/Mac|iPhone|iPad|iPod/i.test(p)) setLabel("Ctrl K");
  }, []);
  return label;
}

/**
 * Scroll-spy (docs/design/06-interactions.md §2): the section crossing the
 * middle band of the viewport is active.
 */
export function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/** True once the browser has been idle after load (or after `timeout` ms). */
export function useIdle(timeout = 2500) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(() => setIdle(true), { timeout })
      : globalThis.setTimeout(() => setIdle(true), Math.min(timeout, 1500));
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle as number);
      else globalThis.clearTimeout(handle);
    };
  }, [timeout]);
  return idle;
}
