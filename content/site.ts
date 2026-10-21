import type { Link } from "./types";

export const site = {
  name: "Md Khalid Syfullah",
  shortName: "Khalid Syfullah",
  wordmark: "khalid syfullah",
  role: "Software Engineer",
  location: "Rajshahi, Bangladesh",
  availability: "Open to software engineering roles — Bangladesh & remote",
  availabilityShort: "Open to roles — Bangladesh & remote",
  url: "https://khalidsyfullah.com",
  title: "Md Khalid Syfullah — Software Engineer",
  description:
    "Software engineer building Android apps, Node.js back-ends and React front-ends. Based in Rajshahi, Bangladesh; open to roles in Bangladesh and remote.",
  email: "khalidsyfullah@gmail.com",
  /** null until Khalid adds the software-engineering résumé PDF to public/resume/ */
  resume: null as string | null,
  resumeTodo: "[KHALID: add the software-engineering résumé PDF]",
  repo: "https://github.com/Khalid-Syfullah/khalid-portfolio",
  photos: {
    portrait: {
      base: "/images/photo-portrait",
      width: 960,
      height: 960,
      alt: "Portrait of Md Khalid Syfullah",
    },
    outdoor: {
      base: "/images/photo-outdoor",
      width: 1100,
      height: 825,
      alt: "Md Khalid Syfullah sitting outdoors",
    },
  },
} as const;

export const socialLinks: Link[] = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: "https://linkedin.com/in/khalid-syfullah", external: true },
  { label: "GitHub", href: "https://github.com/Khalid-Syfullah", external: true },
  { label: "LeetCode", href: "https://leetcode.com/u/khalid_syfullah/", external: true },
];

export const hero = {
  headline: ["I build Android apps,", "Node.js back-ends and", "React front-ends."],
  lead: "Software engineer from Rajshahi, Bangladesh. I've built native Android apps and web platforms for startup clients, REST APIs in Node.js, and React dashboards, and I deploy them on Linux servers I run myself.",
  facts: [
    { term: "Role", value: "Software Engineer" },
    { term: "Based", value: "Rajshahi, Bangladesh" },
    { term: "Degree", value: "B.Sc. Engg. (ECE), RUET" },
  ],
};

export const about = {
  paragraph:
    "I work across the stack: native Android apps in Java, REST APIs with Node.js and Express, React front-ends, and the Linux and Nginx servers they run on. At Qubitech Solutions I built Android apps and web platforms for startup clients alongside a six-person team. My largest personal build, BOIMELA, is a bilingual EPUB3 reader with its own API and web store. I'm looking for a software engineering role where I can own features end to end, in Bangladesh or remotely.",
  facts: [
    { term: "Based in", value: "Rajshahi, Bangladesh" },
    { term: "Languages", value: "Bangla, English" },
    { term: "Education", value: "B.Sc. Engg. (ECE), RUET" },
  ],
};

export const contact = {
  headline: "Let's build something.",
  line: "Hiring for a software engineering role, or have a project in mind? My inbox is open.",
};

export const sections = [
  { id: "top", index: "01", label: "Intro" },
  { id: "about", index: "02", label: "About" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "work", index: "04", label: "Work" },
  { id: "skills", index: "05", label: "Skills" },
  { id: "credentials", index: "06", label: "Credentials" },
  { id: "contact", index: "07", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/** the five sections in the header nav */
export const navSections = sections.filter((s) =>
  ["about", "experience", "work", "skills", "credentials"].includes(s.id),
);
