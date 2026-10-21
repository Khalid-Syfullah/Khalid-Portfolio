"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { featuredProjects, projectBySlug } from "@/content/projects";
import { openCase, setUIState, syncCaseFromHash, useUI } from "@/lib/ui-store";

// Dialog, drawer and case content load on first open (or when the browser is idle).
const CaseDialogView = dynamic(() => import("./case-dialog-view").then((m) => m.CaseDialogView), { ssr: false });

/** Mounted once; keeps the case dialog in sync with #work/<slug>. */
export function CaseDialogHost() {
  const slug = useUI((s) => s.caseSlug);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const sync = (initial = false) => {
      const slug = syncCaseFromHash(initial);
      setUIState({ caseSlug: slug && projectBySlug(slug) ? slug : null });
    };
    sync(true); // deep link on load
    const onNav = () => sync(false);
    window.addEventListener("popstate", onNav);
    window.addEventListener("hashchange", onNav);
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle ? window.requestIdleCallback(() => setLoad(true), { timeout: 5000 }) : globalThis.setTimeout(() => setLoad(true), 3000);
    return () => {
      window.removeEventListener("popstate", onNav);
      window.removeEventListener("hashchange", onNav);
      if (hasIdle) window.cancelIdleCallback(handle as number);
      else globalThis.clearTimeout(handle);
    };
  }, []);

  // ←/→ between featured projects
  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const i = featuredProjects.findIndex((p) => p.slug === slug);
      if (i < 0) return;
      const j = e.key === "ArrowLeft" ? i - 1 : i + 1;
      if (featuredProjects[j]) openCase(featuredProjects[j].slug);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slug]);

  if (!load && !slug) return null;
  return <CaseDialogView />;
}
