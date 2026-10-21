"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { setUIState, useUI } from "@/lib/ui-store";

// cmdk + dialog load on first use (or when the browser is idle), keeping them
// out of the first-load bundle (docs/design/09-quality.md).
const CommandPanel = dynamic(() => import("./command-panel").then((m) => m.CommandPanel), { ssr: false });

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
}

/** Global ⌘K / Ctrl K / "/" listener; mounts the panel once it's needed. */
export function CommandMenu() {
  const open = useUI((s) => s.commandOpen);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setUIState((s) => ({ commandOpen: !s.commandOpen }));
      } else if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingTarget(e.target)) {
        e.preventDefault();
        setUIState({ commandOpen: true });
      }
    };
    window.addEventListener("keydown", onKey);
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(() => setLoad(true), { timeout: 4000 })
      : globalThis.setTimeout(() => setLoad(true), 2500);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (hasIdle) window.cancelIdleCallback(handle as number);
      else globalThis.clearTimeout(handle);
    };
  }, []);

  if (!load && !open) return null;
  return <CommandPanel />;
}
