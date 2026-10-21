// Content model: docs/design/08-content.md is the source of truth.
// Text that contains "[KHALID: …]" marks a fact only Khalid can supply;
// <Text> renders it as a visible placeholder.

export type Link = {
  label: string;
  /** null while the URL is still unknown; `todo` then says what's missing */
  href: string | null;
  todo?: string;
  external?: boolean;
};

export type Experience = {
  slug: string;
  period: string;
  org: string;
  role: string;
  place: string;
  bullets: string[];
  /** project slugs shown as SHIPPED chips */
  shipped: string[];
};

export type ProjectType = "Android" | "Web" | "Back-end";

export type Project = {
  slug: string;
  name: string;
  featured: boolean;
  types: ProjectType[];
  year?: string;
  /** one line with a point of view */
  pov: string;
  brief?: string;
  constraint?: string;
  decision?: string;
  outcome?: string;
  stack: string[];
  award?: string;
  context?: string;
  links: Link[];
  /** screenshot paths under /images/work; empty → placeholder frame */
  images: string[];
  /** extra search words for the command menu */
  keywords: string[];
};

export type Skill = { name: string; projects: string[] };
export type SkillGroup = { name: string; skills: Skill[] };

export type Certification = { name: string; issuer: string; date: string; credentialId: string; verifyUrl: string };
export type Award = { title: string; event: string; date: string; forWhat: string };
export type Education = { degree: string; school: string; period: string };
