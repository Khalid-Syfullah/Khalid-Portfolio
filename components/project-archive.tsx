"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ToggleGroup } from "radix-ui";
import { ArrowUpRightIcon, XIcon } from "lucide-react";
import { Text } from "@/components/text";
import { projectTypes, projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import type { Project, ProjectType } from "@/content/types";
import { type ArchiveFilter, setArchiveFilter, useUI } from "@/lib/ui-store";
import { useMediaQuery } from "@/lib/hooks";

function filterKey(filter: ArchiveFilter) {
  return filter.kind === "all" ? "all" : `${filter.kind}:${filter.value}`;
}

function matches(project: Project, filter: ArchiveFilter) {
  if (filter.kind === "all") return true;
  if (filter.kind === "type") return project.types.includes(filter.value);
  return filter.projects.includes(project.slug);
}

// Hover preview (Motion springs) loads on the first hover, desktop only.
const HoverPreview = dynamic(() => import("@/components/hover-preview").then((m) => m.HoverPreview), { ssr: false });

function useHoverPreview() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [hovered, setHovered] = useState<Project | null>(null);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [used, setUsed] = useState(false);
  const bind = (p: Project) =>
    fine
      ? {
          onPointerEnter: (e: React.PointerEvent) => {
            setUsed(true);
            setPoint({ x: e.clientX + 16, y: e.clientY + 16 });
            setHovered(p);
          },
          onPointerMove: (e: React.PointerEvent) => setPoint({ x: e.clientX + 16, y: e.clientY + 16 }),
          onPointerLeave: () => setHovered(null),
        }
      : {};
  const preview = fine && used ? <HoverPreview project={hovered} point={point} /> : null;
  return { bind, preview };
}

export function ProjectArchive() {
  const filter = useUI((s) => s.filter);
  const list = useMemo(() => projects.filter((p) => matches(p, filter)), [filter]);
  const { bind, preview } = useHoverPreview();
  const archiveRef = useRef<HTMLDivElement>(null);

  // ?stack= / ?skill= on load
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const stack = q.get("stack");
    const skill = q.get("skill");
    const type = projectTypes.find((pt) => pt.toLowerCase() === stack);
    if (type) setArchiveFilter({ kind: "type", value: type });
    else if (skill) {
      const found = skillGroups.flatMap((g) => g.skills).find((s) => s.name === skill);
      if (found) setArchiveFilter({ kind: "skill", value: found.name, projects: found.projects, previous: { kind: "all" } });
    }
  }, []);

  const typeValue = filter.kind === "type" ? filter.value : filter.kind === "all" ? "all" : "";

  return (
    <div ref={archiveRef} id="work-archive" className="mt-16 scroll-mt-[calc(var(--header-h)+16px)]">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule-strong pb-4">
        <h3 className="type-h3 font-semibold">
          All projects <span className="font-mono type-meta font-normal text-muted-foreground">({projects.length})</span>
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup.Root
            type="single"
            value={typeValue}
            onValueChange={(v) => {
              if (!v) return;
              setArchiveFilter(v === "all" ? { kind: "all" } : { kind: "type", value: v as ProjectType });
            }}
            aria-label="Filter projects by type"
            className="flex flex-wrap gap-1.5"
          >
            {(["all", ...projectTypes] as const).map((v) => (
              <ToggleGroup.Item
                key={v}
                value={v}
                className="inline-flex min-h-11 items-center rounded-full border border-input px-3.5 type-small transition-colors duration-[120ms] hover:bg-accent data-[state=on]:border-foreground data-[state=on]:bg-foreground data-[state=on]:text-background"
              >
                {v === "all" ? "All" : v}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
          {filter.kind === "skill" ? (
            <button
              type="button"
              onClick={() => setArchiveFilter(filter.previous)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-brand bg-accent px-3.5 type-small text-foreground"
              aria-label={`Remove the ${filter.value} filter`}
            >
              {filter.value}
              <XIcon className="size-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {list.length} {list.length === 1 ? "project" : "projects"}
      </p>

      {list.length === 0 ? (
        <div className="flex flex-wrap items-center gap-3 py-8 text-ink-2">
          <span>
            No projects tagged <em>{filter.kind === "skill" ? filter.value : filter.kind === "type" ? filter.value : ""}</em> yet.
          </span>
          <button type="button" onClick={() => setArchiveFilter({ kind: "all" })} className="min-h-11 underline decoration-1 underline-offset-4 hover:text-brand">
            Show all
          </button>
        </div>
      ) : (
        <ul key={filterKey(filter)} className="flex flex-col">
            {list.map((p, i) => (
              <li
                key={p.slug}
                className="border-b border-border animate-in fade-in-0 slide-in-from-bottom-1.5 [animation-duration:200ms] [animation-fill-mode:both] motion-reduce:animate-none"
                style={{ animationDelay: `${Math.min(i, 8) * 20}ms` }}
              >
                <div
                  {...bind(p)}
                  className="grid grid-cols-1 items-baseline gap-x-6 gap-y-1 py-4 md:min-h-14 md:grid-cols-[minmax(0,1fr)_150px_minmax(0,1.2fr)_200px]"
                >
                  <a
                    href={`#work/${p.slug}`}
                    className="text-left text-[1.0625rem] font-semibold no-underline underline-offset-4 hover:text-brand hover:underline"
                  >
                    {p.name}
                    {p.featured ? <span className="ml-2 font-mono type-meta font-normal text-brand">featured</span> : null}
                  </a>
                  <span className="font-mono type-meta text-muted-foreground">{p.types.join(" · ")}</span>
                  <span className="type-small text-ink-2">
                    <span className="md:hidden">{p.pov} </span>
                    <span className="text-muted-foreground md:text-ink-2">
                      <Text>{p.stack.join(" · ")}</Text>
                    </span>
                  </span>
                  <span className="flex flex-wrap gap-x-4 md:justify-end">
                    {p.links.map((l) =>
                      l.href ? (
                        <a
                          key={l.label}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1 type-small underline decoration-1 underline-offset-4 hover:text-brand md:min-h-7"
                          aria-label={`${p.name} ${p.links.length > 1 ? l.label : "Code"} (opens in a new tab)`}
                        >
                          {p.links.length > 1 ? l.label : "Code"}
                          <ArrowUpRightIcon className="size-3.5" aria-hidden />
                        </a>
                      ) : null,
                    )}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      )}
      {preview}
    </div>
  );
}

