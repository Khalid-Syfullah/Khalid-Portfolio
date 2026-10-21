"use client";

import { ArrowUpRightIcon, CopyIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd, SectionIndex } from "@/components/primitives";
import { contact, site, socialLinks } from "@/content/site";
import { useShortcutLabel } from "@/lib/hooks";
import { copyEmail } from "@/lib/actions";

export function ContactFooter({ year }: { year: number }) {
  const shortcut = useShortcutLabel();
  const profiles = socialLinks.filter((l) => l.external && l.label !== "LeetCode");
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-border">
      <div className="container-page grid grid-cols-1 gap-y-6 py-[var(--section-y)] lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] lg:gap-x-14">
        <div>
          <SectionIndex index="07" label="Contact" />
        </div>
        <div className="flex flex-col gap-8 print:gap-1">
          <div className="print-hide flex flex-col gap-3">
            <h2 id="contact-title" tabIndex={-1} className="type-h2 font-bold outline-none">
              {contact.headline}
            </h2>
            <p className="max-w-[38rem] type-lead text-ink-2">{contact.line}</p>
          </div>
          <div className="print-hide flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href={`mailto:${site.email}`}>
                <MailIcon aria-hidden /> Email me
              </a>
            </Button>
            <Button variant="ghost" onClick={copyEmail}>
              <CopyIcon aria-hidden /> Copy email
            </Button>
            {profiles.map((l) => (
              <a
                key={l.label}
                href={l.href ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 px-2 underline decoration-1 underline-offset-4 hover:text-brand"
              >
                {l.label}
                <ArrowUpRightIcon className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
          <p className="print-only">
            {site.email} · {site.url.replace("https://", "")}
          </p>
          <p className="print-hide flex items-center gap-2 type-small text-muted-foreground">
            Prefer the keyboard? Press <Kbd>{shortcut}</Kbd>
          </p>
        </div>
      </div>
      <div className="print-hide border-t border-border">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-6 font-mono type-meta text-muted-foreground">
          <span>
            © {year} {site.name}
          </span>
          <span className="print-hide">
            Built with Next.js ·{" "}
            <a href={site.repo} target="_blank" rel="noopener noreferrer" className="underline decoration-1 underline-offset-4 hover:text-brand">
              Source on GitHub
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
