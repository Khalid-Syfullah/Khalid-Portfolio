import { Fragment } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { Picture, SectionIndex } from "@/components/primitives";
import { CommandTrigger, ResumeButton } from "@/components/header-controls";
import { hero, site, socialLinks } from "@/content/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

/** Keep "back-ends" / "front-ends" from breaking at the hyphen. */
function keepHyphenated(text: string) {
  return text.split(" ").map((word, i, all) => (
    <Fragment key={i}>
      {word.includes("-") ? <span className="whitespace-nowrap">{word}</span> : word}
      {i < all.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function Hero() {
  const photo = site.photos.portrait;
  return (
    <section id="top" aria-labelledby="hero-title" className="py-12 print:py-0 lg:py-[88px]">
      <div className="container-page grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] lg:gap-x-14">
        {/* label column */}
        <div className="flex flex-col gap-6 print:gap-1 lg:gap-7">
          <SectionIndex index="01" label="Intro" className="hidden lg:block" />
          <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-7">
            <Picture
              base={photo.base}
              widths={[192, 480, 960]}
              sizes="(min-width: 1024px) 240px, 96px"
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              priority
              className="print-hide block shrink-0"
              imgClassName="size-24 rounded-sm object-cover grayscale transition-[filter] duration-200 hover:grayscale-0 lg:size-60"
            />
            <div className="lg:hidden">
              <p className="type-h3 font-semibold">{site.name}</p>
              <p className="type-small text-ink-2">{site.role}</p>
            </div>
          </div>
          <dl className="hidden grid-cols-[auto_1fr] gap-x-4 gap-y-2.5 type-small lg:grid">
            {hero.facts.map((f) => (
              <div key={f.term} className="contents">
                <dt className="text-muted-foreground">{f.term}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="flex items-center gap-2.5 type-small">
            <span aria-hidden className="dot-pulse size-2.5 shrink-0 rounded-full bg-brand" />
            <span>{site.availabilityShort}</span>
          </p>
        </div>

        {/* content column */}
        <div className="flex min-w-0 flex-col gap-8 print:gap-2 lg:gap-10">
          <h1 id="hero-title" tabIndex={-1} className="intro-slide type-display font-bold outline-none" style={delay(40)}>
            {hero.headline.map((line, i) => (
              <Fragment key={line}>
                <span>{keepHyphenated(line)}</span>
                {i < hero.headline.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h1>
          <p className="intro-rise max-w-[38rem] type-lead text-ink-2" style={{ ...delay(280), ["--rise" as string]: "8px" }}>
            {hero.lead}
          </p>
          <ul aria-label="Links" className="intro-fade flex flex-wrap gap-x-7 gap-y-3 font-mono text-[0.9375rem] print:gap-y-0 print:text-[9pt]" style={delay(360)}>
            {socialLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href ?? undefined}
                  {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex min-h-11 items-center gap-1 underline decoration-1 underline-offset-4 hover:text-brand print:min-h-0"
                >
                  {l.label}
                  <ArrowUpRightIcon className="size-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <div className="intro-fade flex flex-wrap items-center gap-3" style={delay(360)}>
            <ResumeButton />
            <CommandTrigger variant="hero" />
          </div>
        </div>
      </div>
    </section>
  );
}
