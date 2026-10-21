import type { Award, Certification, Education } from "./types";

export const education: Education[] = [
  {
    degree: "B.Sc. Engg. in Electrical & Computer Engineering",
    school: "Rajshahi University of Engineering & Technology (RUET)",
    period: "Jan 2017 — Apr 2024",
  },
];

const coursera = (id: string) =>
  `https://www.coursera.org/account/accomplishments/specialization/certificate/${id}`;

export const certifications: Certification[] = [
  {
    name: "Machine Learning Specialization",
    issuer: "University of Washington · Coursera",
    date: "Sep 2023",
    credentialId: "KJ5PZ6VVX4NS",
    verifyUrl: coursera("KJ5PZ6VVX4NS"),
  },
  {
    name: "Reinforcement Learning Specialization",
    issuer: "University of Alberta · Coursera",
    date: "Sep 2023",
    credentialId: "VVN725H2W3SK",
    verifyUrl: coursera("VVN725H2W3SK"),
  },
  {
    name: "Self-Driving Cars Specialization",
    issuer: "University of Toronto · Coursera",
    date: "Oct 2023",
    credentialId: "N2ZKC5FNBR95",
    verifyUrl: coursera("N2ZKC5FNBR95"),
  },
];

export const awards: Award[] = [
  { title: "Winner, Special Track", event: "IEEE YESIST12 2020 · Malaysia", date: "Sep 2020", forWhat: "PLASMA+" },
  {
    title: "2nd Runner-up",
    event: "Virtual Project Competition on ICT, IICT RUET",
    date: "Dec 2020",
    forWhat: "PLASMA+",
  },
  {
    title: "Most Popular Project Award, Maker Fair Track",
    event: "IEEE YESIST12 2019 · Thailand",
    date: "Sep 2019",
    forWhat: "IoT monitoring robot for disaster management",
  },
];
