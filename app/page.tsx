import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { WorkSection } from "@/components/sections/work";
import { SkillsSection } from "@/components/sections/skills";
import { CredentialsSection } from "@/components/sections/credentials";
import { ContactFooter } from "@/components/contact-footer";
import { CommandMenu } from "@/components/command-menu";
import { CaseDialogHost } from "@/components/case-dialog";
import { site, socialLinks } from "@/content/site";
import { education } from "@/content/credentials";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Rajshahi", addressCountry: "BD" },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
  sameAs: socialLinks.filter((l) => l.external && l.href).map((l) => l.href),
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <ExperienceSection />
        <WorkSection />
        <SkillsSection />
        <CredentialsSection />
      </main>
      <ContactFooter year={new Date().getFullYear()} />
      <CommandMenu />
      <CaseDialogHost />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
    </>
  );
}
