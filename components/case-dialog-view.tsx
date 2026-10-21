"use client";

import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/primitives";
import { ProjectFrame } from "@/components/project-frame";
import { Text } from "@/components/text";
import { featuredProjects, projectBySlug } from "@/content/projects";
import type { Project } from "@/content/types";
import { closeCase, openCase, useUI } from "@/lib/ui-store";
import { useIsCompact } from "@/lib/hooks";

const blocks = [
  ["Brief", "brief"],
  ["Constraint", "constraint"],
  ["Decision", "decision"],
  ["Outcome", "outcome"],
] as const;

function CaseBody({ project }: { project: Project }) {
  const idx = featuredProjects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? featuredProjects[idx - 1] : null;
  const next = idx >= 0 && idx < featuredProjects.length - 1 ? featuredProjects[idx + 1] : null;
  const meta = [project.types.join(" · "), project.year, project.context].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 pr-10">
        <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono type-meta text-muted-foreground">
          {meta.map((m) => (
            <span key={m}>
              <Text>{m}</Text>
            </span>
          ))}
        </p>
        <p className="max-w-[40rem] type-lead text-ink-2">{project.pov}</p>
      </div>

      <ProjectFrame project={project} sizes="(min-width: 860px) 800px, 100vw" />

      <dl className="flex flex-col divide-y divide-border border-y border-border">
        {blocks.map(([label, key]) =>
          project[key] ? (
            <div key={key} className="grid grid-cols-1 gap-1 py-4 md:grid-cols-[140px_minmax(0,1fr)] md:gap-6">
              <dt className="font-mono type-label uppercase text-muted-foreground">{label}</dt>
              <dd className="type-body">
                <Text>{project[key] as string}</Text>
              </dd>
            </div>
          ) : null,
        )}
        <div className="grid grid-cols-1 gap-2 py-4 md:grid-cols-[140px_minmax(0,1fr)] md:gap-6">
          <dt className="font-mono type-label uppercase text-muted-foreground">Stack</dt>
          <dd className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <Chip key={s}>
                <Text>{s}</Text>
              </Chip>
            ))}
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {project.links.map((l) => (
            <li key={l.label}>
              {l.href ? (
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1 underline decoration-1 underline-offset-4 hover:text-brand"
                >
                  {l.label}
                  <ArrowUpRightIcon className="size-3.5" aria-hidden />
                </a>
              ) : (
                <span className="todo">{l.todo ?? l.label}</span>
              )}
            </li>
          ))}
        </ul>
        {idx >= 0 ? (
          <div className="flex gap-1">
            <Button variant="quiet" size="icon" disabled={!prev} onClick={() => prev && openCase(prev.slug)} aria-label={prev ? `Previous: ${prev.name}` : "No previous project"}>
              <ArrowLeftIcon aria-hidden />
            </Button>
            <Button variant="quiet" size="icon" disabled={!next} onClick={() => next && openCase(next.slug)} aria-label={next ? `Next: ${next.name}` : "No next project"}>
              <ArrowRightIcon aria-hidden />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** The dialog itself (Dialog on desktop, bottom Drawer on phones). Loaded on demand. */
export function CaseDialogView() {
  const slug = useUI((s) => s.caseSlug);
  const compact = useIsCompact();
  const project = slug ? projectBySlug(slug) : undefined;
  const onOpenChange = (o: boolean) => {
    if (!o) closeCase();
  };

  if (compact) {
    return (
      <Drawer open={!!project} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[92vh] bg-background">
          {project ? (
            <div className="overflow-y-auto px-5 pt-4 pb-8">
              <DrawerTitle className="mb-1 type-h2 font-bold">{project.name}</DrawerTitle>
              <DrawerDescription className="sr-only">Case study</DrawerDescription>
              <CaseBody project={project} />
            </div>
          ) : null}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[min(860px,calc(100vw-32px))] max-w-none overflow-y-auto rounded-xl bg-background p-8 shadow-pop ring-1 ring-border sm:max-w-none">
        {project ? (
          <>
            <DialogTitle className="type-h2 font-bold">{project.name}</DialogTitle>
            <DialogDescription className="sr-only">Case study</DialogDescription>
            <CaseBody project={project} />
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
