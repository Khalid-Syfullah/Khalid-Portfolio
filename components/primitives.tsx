import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-6 items-center rounded-[5px] border border-input px-1.5 font-mono text-[0.75rem] leading-none text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** Pill chip for stacks and shipped projects (`type-meta`). */
export function Chip({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-2.5 py-0.5 font-mono type-meta text-ink-2",
        className,
      )}
      {...props}
    />
  );
}

/** "03 — EXPERIENCE" */
export function SectionIndex({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <span className={cn("block font-mono type-label font-medium uppercase text-muted-foreground", className)}>
      {index} — {label}
    </span>
  );
}

/** <picture> for the pre-sized photos in public/images (AVIF → WebP → JPEG). */
export function Picture({
  base,
  widths,
  sizes,
  alt,
  width,
  height,
  className,
  imgClassName,
  priority = false,
}: {
  base: string;
  widths: number[];
  sizes: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  const set = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  const largest = widths[widths.length - 1];
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`${base}-${largest}.jpg`}
        srcSet={set("jpg")}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}
