"use client";

import { Section } from "@/components/section";
import { skillGroups } from "@/content/skills";
import type { Skill } from "@/content/types";
import { getUIState, setArchiveFilter } from "@/lib/ui-store";

function pick(skill: Skill) {
  const current = getUIState().filter;
  const previous = current.kind === "skill" ? current.previous : current;
  setArchiveFilter({ kind: "skill", value: skill.name, projects: skill.projects, previous });
  const target = document.getElementById("work-archive");
  target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

export function SkillsSection() {
  return (
    <Section id="skills" index="05" label="Skills" title="Skills" helper="Click a skill to see the projects that use it.">
      <div className="print-hide grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.name}>
            <h3 className="border-b border-rule-strong pb-2 font-mono type-label font-medium uppercase text-muted-foreground">
              {group.name}
            </h3>
            <ul className="mt-2 flex flex-col">
              {group.skills.map((skill) => (
                <li key={skill.name} className="border-b border-border last:border-b-0">
                  {skill.projects.length ? (
                    <button
                      type="button"
                      onClick={() => pick(skill)}
                      className="group/skill flex min-h-11 w-full items-center justify-between gap-3 text-left transition-colors duration-[120ms] hover:text-brand"
                      aria-label={`${skill.name}, show ${skill.projects.length} ${skill.projects.length === 1 ? "project" : "projects"}`}
                    >
                      <span>{skill.name}</span>
                      <span aria-hidden className="font-mono type-meta text-muted-foreground group-hover/skill:text-brand">
                        {skill.projects.length} →
                      </span>
                    </button>
                  ) : (
                    <span className="flex min-h-11 items-center text-ink-2">{skill.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="print-only">
        {skillGroups.map((g) => (
          <p key={g.name}>
            <strong>{g.name}:</strong> {g.skills.map((s) => s.name).join(", ")}
          </p>
        ))}
      </div>
    </Section>
  );
}
