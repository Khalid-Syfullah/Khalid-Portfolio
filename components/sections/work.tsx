import { ArrowRightIcon } from "lucide-react";
import { Section } from "@/components/section";
import { Chip } from "@/components/primitives";
import { ProjectFrame } from "@/components/project-frame";
import { ProjectArchive } from "@/components/project-archive";
import { Text } from "@/components/text";
import { featuredProjects, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

/** A featured project. A plain link to #work/<slug>: the case dialog listens for it. */
function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={`#work/${project.slug}`}
      className="group/card flex flex-col gap-4 rounded-xl border border-border bg-card p-4 text-left text-foreground no-underline transition-colors duration-[120ms] hover:border-input"
    >
      <div className="overflow-hidden rounded-sm">
        <ProjectFrame project={project} className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover/card:scale-[1.02] motion-reduce:transform-none" />
      </div>
      <div className="flex flex-col gap-2 px-1 pb-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="type-h3 font-semibold">{project.name}</h3>
          {project.award ? <Chip className="border-brand text-brand">★ {project.award}</Chip> : null}
        </div>
        <p className="text-ink-2">{project.pov}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 4).map((s) => (
            <Chip key={s}>
              <Text>{s}</Text>
            </Chip>
          ))}
        </div>
        <span className="mt-2 inline-flex items-center gap-1.5 type-small font-medium underline decoration-1 underline-offset-4 group-hover/card:text-brand">
          Read the case
          <ArrowRightIcon className="size-4 transition-transform duration-[120ms] group-hover/card:translate-x-1 motion-reduce:transform-none" aria-hidden />
        </span>
      </div>
    </a>
  );
}

export function WorkSection() {
  return (
    <Section
      id="work"
      index="04"
      label="Work"
      title="Work"
      helper="Four projects I'd show first. Everything else is in the archive."
    >
      <ul className="print-hide grid grid-cols-1 gap-5 md:grid-cols-2">
        {featuredProjects.map((p) => (
          <li key={p.slug} className="flex">
            <ProjectCard project={p} />
          </li>
        ))}
      </ul>
      <div className="print-hide">
        <ProjectArchive />
      </div>

      {/* print: every project as plain text */}
      <div className="print-only">
        {projects.map((p) => (
          <p key={p.slug} className={cn("mb-1.5")}>
            <strong>{p.name}</strong> ({p.types.join(", ")}) — {p.pov} <em>{p.stack.join(", ")}</em>
          </p>
        ))}
      </div>
    </Section>
  );
}
