"use client";

import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  ArrowUpRightIcon,
  CopyIcon,
  DownloadIcon,
  FolderIcon,
  HashIcon,
  MoonIcon,
  PrinterIcon,
  SearchIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Kbd } from "@/components/primitives";
import { copyEmail, notify } from "@/lib/actions";
import { projects } from "@/content/projects";
import { sections, site, socialLinks } from "@/content/site";
import { openCase, setUIState, useUI } from "@/lib/ui-store";
import { goTo } from "@/lib/navigation";
import { useIsCompact } from "@/lib/hooks";

const itemClass =
  "relative flex min-h-11 cursor-pointer select-none items-center gap-3 rounded-lg px-3 text-[0.9375rem] outline-none before:absolute before:inset-y-2.5 before:left-1 before:w-0.5 before:rounded-full before:bg-brand before:opacity-0 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[selected=true]:before:opacity-100";
const groupClass =
  "px-1 pb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:type-label [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground";
const metaClass = "ml-auto font-mono text-[0.75rem] text-muted-foreground";

/**
 * Predictable ranking (docs/design/06-interactions.md §1): exact word or
 * keyword > word prefix > substring. cmdk's default fuzzy scoring let
 * "cv" rank VFloors360 above "Download résumé".
 */
function score(value: string, search: string, keywords?: string[]) {
  const q = search.trim().toLowerCase();
  if (!q) return 1;
  const hay = [value, ...(keywords ?? [])].map((h) => h.toLowerCase());
  const words = hay.flatMap((h) => h.split(/[\s·/,+()-]+/));
  if (words.some((w) => w === q) || hay.some((h) => h === q)) return 1;
  if (words.some((w) => w.startsWith(q))) return 0.8;
  if (hay.some((h) => h.includes(q))) return 0.5;
  return 0;
}

function close() {
  setUIState({ commandOpen: false });
}

/** Run after the overlay has closed, so focus restoration doesn't fight the action. */
function after(fn: () => void) {
  close();
  window.setTimeout(fn, 120);
}

function Menu() {
  const { resolvedTheme, setTheme } = useTheme();
  const navItems = sections.filter((s) => s.id !== "top");
  const links = socialLinks.filter((l) => l.href);

  return (
    <Command label="Command menu" loop filter={score} className="flex flex-col overflow-hidden text-popover-foreground">
      <div className="flex min-h-[52px] items-center gap-2.5 border-b border-border px-4">
        <SearchIcon className="size-[18px] shrink-0 text-muted-foreground" aria-hidden />
        <Command.Input
          autoFocus
          placeholder="Jump to a section, project or action…"
          className="h-12 w-full min-w-0 bg-transparent text-[1rem] outline-none placeholder:text-muted-foreground"
        />
        <Kbd className="hidden md:inline-flex">Esc</Kbd>
      </div>
      <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto overscroll-contain py-1">
        <Command.Empty className="px-4 py-8 text-center type-small text-muted-foreground">
          No results. Try &ldquo;android&rdquo;, &ldquo;email&rdquo; or &ldquo;cv&rdquo;.
        </Command.Empty>

        <Command.Group heading="Navigate" className={groupClass}>
          {navItems.map((s) => (
            <Command.Item key={s.id} value={`go ${s.label}`} keywords={[s.label, "section"]} onSelect={() => after(() => goTo(s.id))} className={itemClass}>
              <HashIcon className="size-4 text-muted-foreground" aria-hidden />
              {s.label}
              <span className={metaClass}>section</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Projects" className={groupClass}>
          {projects.map((p) => (
            <Command.Item
              key={p.slug}
              value={`project ${p.name}`}
              keywords={[p.name, ...p.types, ...p.stack, ...p.keywords]}
              onSelect={() => after(() => openCase(p.slug))}
              className={itemClass}
            >
              <FolderIcon className="size-4 text-muted-foreground" aria-hidden />
              {p.name}
              <span className={metaClass}>{p.featured ? "featured" : p.types[0]?.toLowerCase()}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions" className={groupClass}>
          <Command.Item value="copy email" keywords={["email", "mail", "contact", "address"]} onSelect={() => after(copyEmail)} className={itemClass}>
            <CopyIcon className="size-4 text-muted-foreground" aria-hidden />
            Copy email address
            <span className={metaClass}>action</span>
          </Command.Item>
          <Command.Item
            value="download resume"
            keywords={["cv", "resume", "résumé", "pdf"]}
            onSelect={() =>
              after(() => {
                if (site.resume) window.open(site.resume, "_blank", "noopener");
                else notify("The résumé PDF isn't uploaded yet.");
              })
            }
            className={itemClass}
          >
            <DownloadIcon className="size-4 text-muted-foreground" aria-hidden />
            Download résumé
            <span className={metaClass}>file</span>
          </Command.Item>
          <Command.Item
            value="toggle theme"
            keywords={["dark", "light", "theme", "mode"]}
            onSelect={() => after(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
            className={itemClass}
          >
            <MoonIcon className="size-4 text-muted-foreground" aria-hidden />
            Switch to {resolvedTheme === "dark" ? "light" : "dark"} theme
            <span className={metaClass}>action</span>
          </Command.Item>
          <Command.Item value="print resume" keywords={["print", "pdf", "cv", "resume"]} onSelect={() => after(() => window.print())} className={itemClass}>
            <PrinterIcon className="size-4 text-muted-foreground" aria-hidden />
            Print this page as a résumé
            <span className={metaClass}>action</span>
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Links" className={groupClass}>
          {links.map((l) => (
            <Command.Item
              key={l.label}
              value={`link ${l.label}`}
              keywords={[l.label, "profile"]}
              onSelect={() =>
                after(() => {
                  if (l.external) window.open(l.href!, "_blank", "noopener,noreferrer");
                  else window.location.href = l.href!;
                })
              }
              className={itemClass}
            >
              <ArrowUpRightIcon className="size-4 text-muted-foreground" aria-hidden />
              {l.label}
              <span className={metaClass}>↗</span>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  );
}

export function CommandPanel() {
  const open = useUI((s) => s.commandOpen);
  const compact = useIsCompact();
  const onOpenChange = (o: boolean) => setUIState({ commandOpen: o });

  if (compact) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[70vh] bg-popover">
          <DrawerTitle className="sr-only">Command menu</DrawerTitle>
          <DrawerDescription className="sr-only">Search sections, projects and actions</DrawerDescription>
          <Menu />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-[18vh] w-[min(560px,calc(100vw-32px))] max-w-none translate-y-0 gap-0 overflow-hidden rounded-xl bg-popover p-0 shadow-pop ring-1 ring-border sm:max-w-none"
      >
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <DialogDescription className="sr-only">Search sections, projects and actions</DialogDescription>
        <Menu />
      </DialogContent>
    </Dialog>
  );
}
