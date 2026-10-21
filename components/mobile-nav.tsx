"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ResumeButton, ThemeToggle } from "./header-controls";
import { navSections, site } from "@/content/site";
import { goTo } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onOpenChange, active }: { open: boolean; onOpenChange: (o: boolean) => void; active: string | null }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(320px,85vw)] bg-background p-0">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-mono type-meta font-normal">{site.wordmark}</SheetTitle>
        </SheetHeader>
        <nav aria-label="Sections" className="p-3">
          <ul className="flex flex-col">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenChange(false);
                    // let the sheet close before scrolling
                    window.setTimeout(() => goTo(s.id), 250);
                  }}
                  className={cn(
                    "flex min-h-12 items-center gap-4 rounded-lg px-3 type-body no-underline hover:bg-accent",
                    active === s.id ? "font-semibold text-foreground" : "text-ink-2",
                  )}
                >
                  <span className="font-mono type-meta text-muted-foreground">{s.index}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto flex items-center gap-2 border-t border-border p-5">
          <ResumeButton className="flex-1" />
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
