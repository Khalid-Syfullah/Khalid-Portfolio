import type { Project } from "./types";

const gh = (repo: string) => `https://github.com/Khalid-Syfullah/${repo}`;

/** Featured first, in display order; then the archive. */
export const projects: Project[] = [
  {
    slug: "boimela",
    name: "BOIMELA",
    featured: true,
    types: ["Android", "Back-end", "Web"],
    year: "[KHALID: year]",
    pov: "A reader and e-book store for English and Bangla readers, from the Android app down to the API.",
    brief:
      "A mobile EPUB3 reader with a built-in multilingual e-book store, for reading and buying e-books in English and Bangla.",
    constraint: "[KHALID: what made it hard? e.g. Bangla rendering in EPUB3, offline reading, payments]",
    decision:
      "MVVM architecture on Android for a structured, scalable app; one Node.js REST API secured with OAuth 2.0 that serves both the Android app and the React web store.",
    outcome:
      "Reflowable reading with chapter navigation, bookmarks, a personal library, reading progress, light and dark modes and rich media; API endpoints for authentication, book management and purchases.",
    stack: ["Android", "Java", "XML", "MVVM", "Node.js", "Express", "OAuth 2.0", "React"],
    links: [
      { label: "Android app", href: gh("Boimela"), external: true },
      { label: "API", href: gh("Boimela-Backend"), external: true },
      { label: "Web store", href: gh("Boimela-Web"), external: true },
    ],
    images: [],
    keywords: ["epub", "reader", "ebook", "bangla", "android", "node", "react", "api"],
  },
  {
    slug: "vfloors360",
    name: "VFloors360",
    featured: true,
    types: ["Web", "Back-end"],
    year: "[KHALID: year]",
    pov: "Tile catalogues you can walk through: a 360° room viewer, its API and the admin that feeds it.",
    brief: "An immersive 360° room visualisation platform for exploring tile catalogues in realistic VR rooms.",
    constraint: "[KHALID: what made it hard?]",
    decision:
      "Three separate apps: the 360° viewer with dynamic scene loading, a Node.js REST API with authentication and tile management on MongoDB, and a React admin for textures and platform settings.",
    outcome: "[KHALID: result, e.g. who used it]",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    links: [
      { label: "Viewer", href: gh("VFloors360-Client"), external: true },
      { label: "API", href: gh("VFloors360-Server"), external: true },
      { label: "Admin", href: gh("VFloors360-Admin"), external: true },
    ],
    images: [],
    keywords: ["vr", "360", "tiles", "react", "node", "mongodb", "admin"],
  },
  {
    slug: "plasma-plus",
    name: "PLASMA+",
    featured: true,
    types: ["Android"],
    year: "2020",
    pov: "A plasma and blood bank in your pocket that matches donors to patients during COVID-19.",
    brief:
      "An Android platform that connects plasma and blood donors with recipients, with registration, search and matching, plus COVID-19 screening from chest X-ray images.",
    constraint: "[KHALID: what made it hard?]",
    decision: "[KHALID: a key decision]",
    outcome:
      "Winner, IEEE YESIST12 2020 Special Track (Malaysia, Sep 2020); 2nd Runner-up, Virtual Project Competition on ICT, IICT RUET (Dec 2020).",
    stack: ["Android", "Java"],
    award: "IEEE YESIST12 winner",
    links: [{ label: "GitHub", href: gh("plasmaplus"), external: true }],
    images: [],
    keywords: ["blood", "plasma", "donor", "covid", "android", "award", "ieee"],
  },
  {
    slug: "obosor",
    name: "OBOSOR",
    featured: true,
    types: ["Web"],
    year: "2021",
    pov: "An online book shop for campus communities.",
    brief: "A community and campus-based online book shop.",
    constraint: "[KHALID: what made it hard?]",
    decision: "[KHALID: a key decision]",
    outcome: "[KHALID: result]",
    stack: ["[KHALID: stack]"],
    context: "Built at Qubitech Solutions",
    links: [{ label: "Case study", href: "https://qubitechsolutions.com.bd/case-studies/1", external: true }],
    images: [],
    keywords: ["books", "shop", "ecommerce", "campus", "qubitech"],
  },

  // Archive
  {
    slug: "task-manager",
    name: "Task Manager",
    featured: false,
    types: ["Web"],
    pov: "Task app with real-time create, edit and delete.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    links: [{ label: "GitHub", href: gh("React-Task-Management-Web-App"), external: true }],
    images: [],
    keywords: ["todo", "tasks", "crud", "react", "node", "mongodb"],
  },
  {
    slug: "muslim-virtual-aid",
    name: "Muslim Virtual Aid",
    featured: false,
    types: ["Android"],
    pov: "Quran, prayer times, mosque finder, Qibla and Ramadan tools for Bangladesh.",
    stack: ["Java", "XML", "MVVM"],
    links: [{ label: "GitHub", href: gh("Muslim-Virtual-Aid-App"), external: true }],
    images: [],
    keywords: ["islamic", "quran", "prayer", "qibla", "ramadan", "android"],
  },
  {
    slug: "e-doctors",
    name: "E-DOCTORS",
    featured: false,
    types: ["Android"],
    pov: "Telemedicine app for patient–doctor contact, built for the IEEE R10 HAC special call during COVID-19.",
    stack: ["Java"],
    links: [{ label: "GitHub", href: gh("e-doctors"), external: true }],
    images: [],
    keywords: ["telemedicine", "doctor", "health", "covid", "ieee", "android"],
  },
  {
    slug: "berger",
    name: "BERGER",
    featured: false,
    types: ["Android"],
    pov: "Data collector app, built at Qubitech.",
    stack: ["[KHALID: stack]"],
    links: [{ label: "Case study", href: "https://qubitechsolutions.com.bd/case-studies/3", external: true }],
    images: [],
    keywords: ["data", "collector", "survey", "qubitech", "android"],
  },
  {
    slug: "blog-app",
    name: "Blog app",
    featured: false,
    types: ["Web", "Back-end"],
    pov: "Blog front-end and API, built during the MonstarLab attachment.",
    stack: ["Angular", "Node.js"],
    links: [
      { label: "Front-end", href: gh("Angular-Blog-Web-Application"), external: true },
      { label: "API", href: gh("Nodejs-Blog-Web-Application-Backend"), external: true },
    ],
    images: [],
    keywords: ["blog", "angular", "node", "monstarlab", "api"],
  },
  {
    slug: "grammarquick",
    name: "GrammarQuick",
    featured: false,
    types: ["Android"],
    pov: "Grammar exercises and quizzes for English learners.",
    stack: ["Java"],
    links: [{ label: "GitHub", href: gh("GrammarQuick"), external: true }],
    images: [],
    keywords: ["english", "grammar", "quiz", "education", "android"],
  },
  {
    slug: "ropms",
    name: "ROPMS",
    featured: false,
    types: ["Web"],
    pov: "Profile and performance tracking for students and teachers.",
    stack: ["PHP", "MySQL"],
    links: [{ label: "GitHub", href: gh("ROPMS"), external: true }],
    images: [],
    keywords: ["php", "mysql", "profiles", "web"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);
export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const projectTypes = ["Android", "Web", "Back-end"] as const;
