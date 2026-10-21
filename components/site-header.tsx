"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandTrigger, ResumeButton, ThemeToggle } from "./header-controls";
import { navSections, sections, site } from "@/content/site";
import { useIdle, useScrollSpy } from "@/lib/hooks";
import { goTo } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const spyIds = sections.map((s) => s.id);

// The phone menu (a Sheet) loads on first tap.
const MobileNav = dynamic(() => import("./mobile-nav").then((m) => m.MobileNav), { ssr: false });
// The reading-progress bar (Motion) loads once the browser is idle.
const ReadingProgress = dynamic(() => import("./reading-progress").then((m) => m.ReadingProgress), { ssr: false });

export function SiteHeader() {
  const active = useScrollSpy(spyIds);
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [navLoaded, setNavLoaded] = useState(false);
  const idle = useIdle();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "print-hide sticky top-0 z-40 h-[var(--header-h)] border-b bg-background transition-colors duration-[120ms]",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            goTo("top");
          }}
          className="font-mono type-meta tracking-[0.02em] text-foreground no-underline"
        >
          {site.wordmark}
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-7 type-small">
            {navSections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="relative">
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(s.id);
                    }}
                    className={cn(
                      "flex h-11 items-center no-underline transition-colors duration-[120ms] hover:text-brand",
                      isActive ? "text-foreground" : "text-ink-2",
                    )}
                  >
                    {s.label}
                  </a>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-2 h-0.5 origin-left bg-brand transition-transform duration-200 ease-[var(--ease-out-soft)] motion-reduce:transition-none",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <CommandTrigger variant="header" className="hidden lg:inline-flex" />
          <ResumeButton className="hidden lg:inline-flex" />
          <ThemeToggle className="hidden lg:inline-flex" />
          <CommandTrigger variant="icon" className="lg:hidden" />
          <Button
            variant="quiet"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            aria-expanded={sheetOpen}
            onClick={() => {
              setNavLoaded(true);
              setSheetOpen(true);
            }}
          >
            <MenuIcon className="size-5" aria-hidden />
          </Button>
          {navLoaded ? <MobileNav open={sheetOpen} onOpenChange={setSheetOpen} active={active} /> : null}
        </div>
      </div>
      {idle ? <ReadingProgress /> : null}
    </header>
  );
}
