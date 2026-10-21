"use client";

import { useSyncExternalStore } from "react";
import type { ProjectType } from "@/content/types";

/**
 * Small shared UI state for interactions that cross sections
 * (docs/design/06-interactions.md): the command menu, the case dialog,
 * and the Work archive filter (which Skills can set).
 */
export type ArchiveFilter =
  | { kind: "all" }
  | { kind: "type"; value: ProjectType }
  | { kind: "skill"; value: string; projects: string[]; previous: ArchiveFilter };

type UIState = {
  commandOpen: boolean;
  caseSlug: string | null;
  filter: ArchiveFilter;
};

let state: UIState = { commandOpen: false, caseSlug: null, filter: { kind: "all" } };
const listeners = new Set<() => void>();

export function getUIState() {
  return state;
}

export function setUIState(patch: Partial<UIState> | ((s: UIState) => Partial<UIState>)) {
  const next = typeof patch === "function" ? patch(state) : patch;
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const serverState: UIState = { commandOpen: false, caseSlug: null, filter: { kind: "all" } };

export function useUI<T>(selector: (s: UIState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(serverState),
  );
}

// ── URL helpers ──────────────────────────────────────────────────────────

/** "#work/boimela" → ["work", "boimela"] */
export function parseHash(): [string, string | undefined] {
  if (typeof window === "undefined") return ["", undefined];
  const raw = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  const [section, sub] = raw.split("/");
  return [section ?? "", sub];
}

export function replaceHash(hash: string) {
  const url = new URL(window.location.href);
  url.hash = hash;
  window.history.replaceState(window.history.state, "", url);
}

export function setQueryParam(key: string, value: string | null) {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set(key, value);
  else url.searchParams.delete(key);
  window.history.replaceState(window.history.state, "", url);
}

// ── Case dialog ─────────────────────────────────────────────────────────
// Cards and chips are plain links to #work/<slug>, so opening a case adds a
// history entry and the browser Back button closes it. A deep link on first
// load has no entry to go back to, so closing it just rewrites the hash.

let caseHasHistoryEntry = false;

/** Called by the dialog host whenever the hash changes or on load. */
export function syncCaseFromHash(isInitialLoad: boolean) {
  const [section, sub] = parseHash();
  const slug = section === "work" && sub ? sub : null;
  if (slug && !getUIState().caseSlug) caseHasHistoryEntry = !isInitialLoad;
  if (!slug) caseHasHistoryEntry = false;
  return slug;
}

/** Programmatic open (command menu, ←/→ between cases). */
export function openCase(slug: string) {
  const url = new URL(window.location.href);
  url.hash = `work/${slug}`;
  if (getUIState().caseSlug !== null) {
    window.history.replaceState(window.history.state, "", url); // ←/→ between cases
  } else {
    window.history.pushState(window.history.state, "", url);
    caseHasHistoryEntry = true;
  }
  setUIState({ caseSlug: slug });
}

export function closeCase() {
  if (caseHasHistoryEntry) {
    window.history.back(); // the host's popstate/hashchange handler clears caseSlug
  } else {
    replaceHash("work");
    setUIState({ caseSlug: null });
  }
}

// ── Archive filter ──────────────────────────────────────────────────────

export function setArchiveFilter(filter: ArchiveFilter) {
  setUIState({ filter });
  if (filter.kind === "type") setQueryParam("stack", filter.value.toLowerCase());
  else setQueryParam("stack", null);
  if (filter.kind === "skill") setQueryParam("skill", filter.value);
  else setQueryParam("skill", null);
}
