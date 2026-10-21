import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * A project's screenshot at 16:10. Until Khalid supplies real screenshots
 * (docs/design/04-sections.md), a neutral frame shows the name in mono.
 */
export function ProjectFrame({ project, className, sizes = "(min-width: 768px) 440px, 100vw" }: { project: Project; className?: string; sizes?: string }) {
  const src = project.images[0];
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden rounded-sm bg-secondary", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export
        <img src={src} alt={`${project.name} screenshot`} sizes={sizes} loading="lazy" decoding="async" className="size-full object-cover" />
      ) : (
        <div
          aria-hidden
          className="flex size-full items-center justify-center bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] bg-center"
        >
          <span className="rounded-sm bg-secondary px-2 font-mono type-meta text-muted-foreground">{project.name.toLowerCase()}</span>
        </div>
      )}
    </div>
  );
}
