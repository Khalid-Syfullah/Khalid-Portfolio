import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    slug: "qubitech",
    period: "Apr 2021 — Dec 2021",
    org: "Qubitech Solutions",
    role: "Software Developer",
    place: "Rajshahi, Bangladesh",
    bullets: [
      "Led development of 4 projects for the company and its startup clients.",
      "Built native Android apps and web platforms for 2 startup clients.",
      "Worked with the CEO and a team of 6 front-end, back-end and Android developers, cutting development time significantly.",
    ],
    shipped: ["obosor", "berger"],
  },
  {
    slug: "monstarlab",
    period: "Apr 2021 — Jun 2021",
    org: "MonstarLab Bangladesh",
    role: "Industrial Attachment",
    place: "Dhaka, Bangladesh (Remote)",
    bullets: [
      "Worked through every SDLC phase on 2 projects: requirements analysis, database schema design and OOP.",
      "Evaluated 4 design patterns and 2 frameworks (AngularJS and native Android).",
      "Practised beta testing for quality assurance and Git for version control.",
    ],
    shipped: ["blog-app"],
  },
];
