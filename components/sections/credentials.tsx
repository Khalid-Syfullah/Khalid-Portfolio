import { ArrowUpRightIcon } from "lucide-react";
import { Section } from "@/components/section";
import { awards, certifications, education } from "@/content/credentials";

function ListTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="border-b border-rule-strong pb-2 font-mono type-label font-medium uppercase text-muted-foreground">{children}</h3>;
}

const row = "flex flex-col gap-1 border-b border-border py-4 print:flex-row print:justify-between print:py-1 md:flex-row md:items-baseline md:justify-between md:gap-6";

export function CredentialsSection() {
  return (
    <Section id="credentials" index="06" label="Credentials" title="Credentials">
      <div className="flex flex-col gap-12 print:gap-3">
        <div>
          <ListTitle>Education</ListTitle>
          <ul>
            {education.map((e) => (
              <li key={e.degree} className={row}>
                <span>
                  <span className="font-semibold">{e.degree}</span>
                  <span className="text-ink-2"> — {e.school}</span>
                </span>
                <span className="tabular shrink-0 font-mono type-meta text-muted-foreground">{e.period}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ListTitle>Certifications</ListTitle>
          <ul>
            {certifications.map((c) => (
              <li key={c.credentialId} className={row}>
                <span>
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-ink-2"> — {c.issuer}</span>
                </span>
                <span className="flex shrink-0 items-baseline gap-5">
                  <span className="tabular font-mono type-meta text-muted-foreground">{c.date}</span>
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-print-url print-hide inline-flex min-h-11 items-center gap-1 type-small underline decoration-1 underline-offset-4 hover:text-brand md:min-h-7"
                    aria-label={`Verify ${c.name} on Coursera (opens in a new tab)`}
                  >
                    Verify
                    <ArrowUpRightIcon className="size-3.5" aria-hidden />
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ListTitle>Awards</ListTitle>
          <ul>
            {awards.map((a) => (
              <li key={a.title + a.date} className={row}>
                <span>
                  <span className="font-semibold">{a.title}</span>
                  <span className="text-ink-2"> — {a.event}</span>
                  <span className="block type-small text-muted-foreground">For {a.forWhat}</span>
                </span>
                <span className="tabular shrink-0 font-mono type-meta text-muted-foreground">{a.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
