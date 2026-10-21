"use client";

import { useEffect, useState } from "react";
import { Accordion } from "radix-ui";
import { Section } from "@/components/section";
import { experience } from "@/content/experience";
import { projectBySlug } from "@/content/projects";
import { parseHash, replaceHash } from "@/lib/ui-store";

function PlusMinus() {
  return (
    <span aria-hidden className="relative block size-4 shrink-0">
      <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
      <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-current transition-transform duration-[280ms] ease-[var(--ease-out-soft)] group-data-[state=open]/row:scale-y-0" />
    </span>
  );
}

export function ExperienceSection() {
  const [open, setOpen] = useState<string>(experience[0]?.slug ?? "");

  // #experience/<slug> opens that row on load
  useEffect(() => {
    const [section, sub] = parseHash();
    if (section === "experience" && sub && experience.some((e) => e.slug === sub)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- the hash is only readable after hydration
      setOpen(sub);
      document.getElementById(`exp-${sub}`)?.scrollIntoView({ block: "center" });
    }
  }, []);

  return (
    <Section
      id="experience"
      index="03"
      label="Experience"
      title="Experience"
      helper="Select a row to see what I did and what shipped."
    >
      <Accordion.Root
        type="single"
        collapsible
        value={open}
        onValueChange={(v) => {
          setOpen(v);
          replaceHash(v ? `experience/${v}` : "experience");
        }}
        className="print-hide border-t border-rule-strong"
      >
        {experience.map((job) => (
          <Accordion.Item key={job.slug} value={job.slug} id={`exp-${job.slug}`} className="group/row border-b border-border">
            <Accordion.Header asChild>
              <h3>
                <Accordion.Trigger className="group/row flex min-h-[76px] w-full flex-wrap items-baseline gap-x-6 gap-y-1 py-[18px] text-left">
                  <span className="tabular order-first w-full font-mono type-meta text-muted-foreground md:w-[190px] md:shrink-0">
                    {job.period}
                  </span>
                  <span className="flex min-w-0 flex-1 basis-[260px] flex-col gap-0.5">
                    <span className="type-h3 font-semibold transition-colors duration-[120ms] group-hover/row:text-brand">
                      {job.org}
                    </span>
                    <span className="text-[1rem] text-ink-2">{job.role}</span>
                    <span className="type-small text-muted-foreground md:hidden">{job.place}</span>
                  </span>
                  <span className="hidden w-[170px] shrink-0 type-small text-muted-foreground md:block">{job.place}</span>
                  <span className="ml-auto self-center text-foreground group-data-[state=open]/row:text-brand">
                    <PlusMinus />
                  </span>
                </Accordion.Trigger>
              </h3>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down motion-reduce:animate-none">
              <div className="flex flex-col gap-4 pb-7 md:pl-[214px]">
                <ul className="flex max-w-[40rem] list-disc flex-col gap-2 pl-[18px] text-ink-2 marker:text-muted-foreground">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {job.shipped.length ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1.5 font-mono type-label uppercase text-muted-foreground">Shipped</span>
                    {job.shipped.map((slug) => {
                      const p = projectBySlug(slug);
                      if (!p) return null;
                      return (
                        <a
                          key={slug}
                          href={`#work/${slug}`}
                          className="inline-flex min-h-9 items-center rounded-full border border-input px-3 type-small no-underline transition-colors duration-[120ms] hover:border-brand hover:text-brand"
                        >
                          {p.name}
                          <span aria-hidden className="ml-1">↗</span>
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      {/* print: everything expanded */}
      <div className="print-only">
        {experience.map((job) => (
          <div key={job.slug} className="mb-3">
            <p>
              <strong>{job.org}</strong> — {job.role}, {job.place} · {job.period}
            </p>
            <ul className="list-disc pl-5">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
