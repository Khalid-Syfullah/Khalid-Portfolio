import { cn } from "@/lib/utils";
import { SectionIndex } from "./primitives";

/**
 * The two-column section anatomy (docs/design/03-layout.md):
 * sticky label column (index + helper) beside the content column.
 */
export function Section({
  id,
  index,
  label,
  title,
  helper,
  children,
  className,
  as: Tag = "section",
}: {
  id: string;
  index: string;
  label: string;
  /** accessible section heading; visually the mono index carries the label */
  title: string;
  helper?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  as?: "section" | "footer";
}) {
  const headingId = `${id}-title`;
  return (
    <Tag id={id} aria-labelledby={headingId} className={cn("border-t border-border py-[var(--section-y)]", className)}>
      <div className="container-page grid grid-cols-1 gap-y-6 print:gap-y-1.5 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] lg:gap-x-14">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <h2 id={headingId} tabIndex={-1} className="outline-none">
            <SectionIndex index={index} label={label} />
            <span className="sr-only">{title}</span>
          </h2>
          {helper ? <p className="print-hide mt-2 max-w-[15rem] type-small text-muted-foreground">{helper}</p> : null}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </Tag>
  );
}
