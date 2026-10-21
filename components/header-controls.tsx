"use client";

import { MoonIcon, SunIcon, SearchIcon, DownloadIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/primitives";
import { setUIState } from "@/lib/ui-store";
import { useShortcutLabel } from "@/lib/hooks";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { notify } from "@/lib/actions";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant="quiet"
      size="icon"
      className={cn("print-hide", className)}
      aria-label="Toggle dark theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon className="size-[18px] transition-transform duration-[120ms] dark:hidden" aria-hidden />
      <MoonIcon className="hidden size-[18px] transition-transform duration-[120ms] dark:block" aria-hidden />
    </Button>
  );
}

/** Opens the command menu. `hero` shows the discoverable hint chip. */
export function CommandTrigger({ variant = "header", className }: { variant?: "header" | "hero" | "icon"; className?: string }) {
  const shortcut = useShortcutLabel();
  const open = () => setUIState({ commandOpen: true });
  if (variant === "icon") {
    return (
      <Button variant="quiet" size="icon" aria-label="Search the page" onClick={open} className={cn("print-hide", className)}>
        <SearchIcon className="size-[18px]" aria-hidden />
      </Button>
    );
  }
  if (variant === "hero") {
    return (
      <Button variant="ghost" onClick={open} className={cn("print-hide", className)}>
        <SearchIcon aria-hidden className="text-muted-foreground" />
        <span className="hidden [@media(pointer:fine)]:inline">Jump anywhere</span>
        <span className="[@media(pointer:fine)]:hidden">Search</span>
        <Kbd className="hidden [@media(pointer:fine)]:inline-flex">{shortcut}</Kbd>
      </Button>
    );
  }
  return (
    <Button variant="ghost" size="sm" onClick={open} aria-label={`Open the command menu (${shortcut})`} className={cn("h-11 px-3 print-hide", className)}>
      <span className="font-mono type-meta">{shortcut}</span>
    </Button>
  );
}

export function ResumeButton({ className, variant = "default" }: { className?: string; variant?: "default" | "ghost" }) {
  if (site.resume) {
    return (
      <Button asChild variant={variant} className={cn("print-hide", className)}>
        <a href={site.resume} download target="_blank" rel="noopener">
          Résumé <DownloadIcon aria-hidden />
        </a>
      </Button>
    );
  }
  return (
    <Button
      variant={variant}
      aria-disabled="true"
      className={cn("print-hide opacity-60", className)}
      onClick={() => notify("The résumé PDF isn't uploaded yet.")}
      title={site.resumeTodo}
    >
      Résumé <DownloadIcon aria-hidden />
    </Button>
  );
}
