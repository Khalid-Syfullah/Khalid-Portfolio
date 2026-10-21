import { Section } from "@/components/section";
import { Picture } from "@/components/primitives";
import { about, site } from "@/content/site";

export function About() {
  const photo = site.photos.outdoor;
  return (
    <Section id="about" index="02" label="About" title="About">
      <div className="grid grid-cols-1 gap-8 print:grid-cols-1 print:gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:gap-12">
        <Picture
          base={photo.base}
          widths={[480, 800, 1100]}
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 40vw, 100vw"
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="print-hide order-first block md:order-last"
          imgClassName="aspect-[4/3] w-full rounded-sm object-cover grayscale transition-[filter] duration-200 hover:grayscale-0"
        />
        <div className="flex flex-col gap-8 print:gap-2">
          <p className="max-w-[38rem] type-lead">{about.paragraph}</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 type-small">
            {about.facts.map((f) => (
              <div key={f.term} className="contents">
                <dt className="text-muted-foreground">{f.term}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
