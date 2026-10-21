"use client";

import { site } from "@/content/site";

/** Show a toast; sonner's code loads on first use. */
export function notify(message: string) {
  void import("sonner").then((m) => m.toast(message));
}

/** docs/design/06-interactions.md §7 */
export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(site.email);
    notify("Email copied");
  } catch {
    notify("Couldn't copy, opening your mail app");
    window.location.href = `mailto:${site.email}`;
  }
}
