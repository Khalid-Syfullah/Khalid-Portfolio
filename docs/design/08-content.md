# 08 — Content

← [DESIGN.md](../../DESIGN.md)

The single source for every word and data point on the site. During the build it becomes `content/*.ts`.

- Facts come from Khalid's CV and the old site (including its links). **Nothing is invented.**
- **Still open** (shown on the site as dashed blue placeholders): BOIMELA and VFloors360 years; constraint/decision/outcome for VFloors360, PLASMA+ and OBOSOR; BOIMELA's constraint; OBOSOR and BERGER stacks; project screenshots; the software-engineering résumé PDF.
- **[KHALID: …]** marks a fact only Khalid can supply. The build shows these as visible placeholders, and the review checklist blocks launch while any remain.
- **Academic material is removed** (papers, IELTS/GRE, transcripts, certificates, HSC/SSC, CGPA, student leadership), and so are research-only projects.

---

## Site meta (`content/site.ts`)

| Key | Value |
|---|---|
| Name | Md Khalid Syfullah |
| Short name | Khalid Syfullah |
| Role | Software Engineer |
| Location | Rajshahi, Bangladesh |
| Availability | Open to software engineering roles — Bangladesh & remote |
| `<title>` | Md Khalid Syfullah — Software Engineer |
| Meta description | Software engineer building Android apps, Node.js back-ends and React front-ends. Based in Rajshahi, Bangladesh; open to roles in Bangladesh and remote. |
| URL | https://khalidsyfullah.com |
| Email | khalidsyfullah@gmail.com (the address the old site published) |
| GitHub | https://github.com/Khalid-Syfullah |
| LinkedIn | https://linkedin.com/in/khalid-syfullah |
| LeetCode | https://leetcode.com/u/khalid_syfullah/ |
| Résumé | `/resume/Md-Khalid-Syfullah-Resume.pdf` · [KHALID: software-engineering résumé PDF] |
| Photos | `photo-portrait.jpg` (square headshot), `photo-outdoor.jpg` (outdoor, seated) |

## Hero

- **Headline (3 lines):** "I build Android apps, / Node.js back-ends and / React front-ends."
- **Lead:** "Software engineer from Rajshahi, Bangladesh. I've built native Android apps and web platforms for startup clients, REST APIs in Node.js, and React dashboards, and I deploy them on Linux servers I run myself."
- **Facts:** Role — Software Engineer · Based — Rajshahi, Bangladesh · Degree — B.Sc. Engg. (ECE), RUET
- **Buttons:** Résumé ↓ · ⌘K Jump anywhere

## About

> I work across the stack: native Android apps in Java, REST APIs with Node.js and Express, React front-ends, and the Linux and Nginx servers they run on. At Qubitech Solutions I built Android apps and web platforms for startup clients alongside a six-person team. My largest personal build, BOIMELA, is a bilingual EPUB3 reader with its own API and web store. I'm looking for a software engineering role where I can own features end to end, in Bangladesh or remotely.

- **Facts strip:** Based in — Rajshahi, Bangladesh · Languages — Bangla, English · Education — B.Sc. Engg. (ECE), RUET

## Experience (`content/experience.ts`)

| slug | Period | Org | Role | Place |
|---|---|---|---|---|
| `qubitech` | Apr 2021 — Dec 2021 | Qubitech Solutions | Software Developer | Rajshahi, Bangladesh |
| `monstarlab` | Apr 2021 — Jun 2021 | MonstarLab Bangladesh | Industrial Attachment | Dhaka, Bangladesh (Remote) |

**qubitech**
- Led development of 4 projects for the company and its startup clients.
- Built native Android apps and web platforms for 2 startup clients.
- Worked with the CEO and a team of 6 front-end, back-end and Android developers, cutting development time significantly.
- *Shipped:* OBOSOR (`obosor`), BERGER (`berger`)

**monstarlab**
- Worked through every SDLC phase on 2 projects: requirements analysis, database schema design and OOP.
- Evaluated 4 design patterns and 2 frameworks (AngularJS and native Android).
- Practised beta testing for quality assurance and Git for version control.
- *Shipped:* Blog app front-end (Angular) and back-end (Node.js) (`blog-app`)

[KHALID: any role after Dec 2021, such as freelance, contract or current work? It would go at the top.]

## Projects (`content/projects.ts`)

### Featured (in this order)

**1 · BOIMELA** `boimela` · Android · Back-end · Web · year [KHALID]
- *Point of view:* A reader and e-book store for English and Bangla readers, from the Android app down to the API.
- *Brief:* A mobile EPUB3 reader with a built-in multilingual e-book store, for reading and buying e-books in English and Bangla.
- *Constraint:* [KHALID: what made it hard? e.g. Bangla rendering in EPUB3, offline reading, payments]
- *Decision:* MVVM architecture on Android for a structured, scalable app; one Node.js REST API secured with OAuth 2.0 that serves both the Android app and the React web store.
- *Outcome:* Reflowable reading with chapter navigation, bookmarks, a personal library, reading progress, light and dark modes and rich media; API endpoints for authentication, book management and purchases. [KHALID: users, demo or other result]
- *Stack:* Android · Java · XML · MVVM · Node.js · Express · OAuth 2.0 · React
- *Links:* GitHub — [app](https://github.com/Khalid-Syfullah/Boimela), [API](https://github.com/Khalid-Syfullah/Boimela-Backend), [web store](https://github.com/Khalid-Syfullah/Boimela-Web)

**2 · VFloors360** `vfloors360` · Web · Back-end · year [KHALID]
- *Point of view:* Tile catalogues you can walk through: a 360° room viewer, its API and the admin that feeds it.
- *Brief:* An immersive 360° room visualisation platform for exploring tile catalogues in realistic VR rooms.
- *Constraint:* [KHALID]
- *Decision:* Three separate apps: the 360° viewer with dynamic scene loading, a Node.js REST API with authentication and tile management on MongoDB, and a React admin for textures and platform settings. [KHALID: why this split]
- *Outcome:* [KHALID]
- *Stack:* React · Node.js · Express · MongoDB
- *Links:* GitHub — [viewer](https://github.com/Khalid-Syfullah/VFloors360-Client), [API](https://github.com/Khalid-Syfullah/VFloors360-Server), [admin](https://github.com/Khalid-Syfullah/VFloors360-Admin)

**3 · PLASMA+** `plasma-plus` · Android · 2020 · ★ Winner, IEEE YESIST12 2020
- *Point of view:* A plasma and blood bank in your pocket that matches donors to patients during COVID-19.
- *Brief:* An Android platform that connects plasma and blood donors with recipients, with registration, search and matching, plus COVID-19 screening from chest X-ray images.
- *Constraint:* [KHALID]
- *Decision:* [KHALID]
- *Outcome:* Winner, IEEE YESIST12 2020 Special Track (Malaysia, Sep 2020); 2nd Runner-up, Virtual Project Competition on ICT, IICT RUET (Dec 2020).
- *Stack:* Android · Java
- *Links:* [GitHub](https://github.com/Khalid-Syfullah/plasmaplus)

**4 · OBOSOR** `obosor` · Web · 2021 · built at Qubitech Solutions
- *Point of view:* An online book shop for campus communities.
- *Brief:* A community and campus-based online book shop.
- *Constraint / Decision / Outcome:* [KHALID]
- *Stack:* [KHALID]
- *Links:* [Qubitech case study](https://qubitechsolutions.com.bd/case-studies/1)

### Archive

| slug | Name | Type | Stack | Line | Link |
|---|---|---|---|---|---|
| `task-manager` | Task Manager | Web | React · Node.js · Express · MongoDB | Task app with real-time create, edit and delete | [GitHub](https://github.com/Khalid-Syfullah/React-Task-Management-Web-App) |
| `muslim-virtual-aid` | Muslim Virtual Aid | Android | Java · XML · MVVM | Quran, prayer times, mosque finder, Qibla and Ramadan tools for Bangladesh | [GitHub](https://github.com/Khalid-Syfullah/Muslim-Virtual-Aid-App) |
| `e-doctors` | E-DOCTORS | Android | Java | Telemedicine app for patient–doctor contact, built for the IEEE R10 HAC special call during COVID-19 | [GitHub](https://github.com/Khalid-Syfullah/e-doctors) |
| `berger` | BERGER | Android | [KHALID] | Data collector app, built at Qubitech | [Case study](https://qubitechsolutions.com.bd/case-studies/3) |
| `blog-app` | Blog app | Web · Back-end | Angular · Node.js | Blog front-end and API, built during the MonstarLab attachment | [front-end](https://github.com/Khalid-Syfullah/Angular-Blog-Web-Application), [API](https://github.com/Khalid-Syfullah/Nodejs-Blog-Web-Application-Backend) |
| `grammarquick` | GrammarQuick | Android | Java | Grammar exercises and quizzes for English learners | [GitHub](https://github.com/Khalid-Syfullah/GrammarQuick) |
| `ropms` | ROPMS | Web | PHP · MySQL | Profile and performance tracking for students and teachers | [GitHub](https://github.com/Khalid-Syfullah/ROPMS) |

[KHALID: add Tuktak Bazaar and the ERP System? If yes, they go last.]

**Removed as academic / research:** CXR17-DenseParallel-ELM, Plant Disease Classifier, IoT security system, IoT disaster-management robot.

## Skills (`content/skills.ts`)

Strongest first in each group. `→` marks project slugs that use the skill, which drives the skill → archive filter.

| Group | Skills |
|---|---|
| Languages | Java → boimela, plasma-plus, muslim-virtual-aid, e-doctors, grammarquick · JavaScript → task-manager, vfloors360, blog-app · Python · C / C++ · PHP → ropms · HTML & CSS |
| Front-end | React → boimela, vfloors360, task-manager · Redux · Tailwind CSS · Bootstrap · Axios · Angular → blog-app |
| Back-end | Node.js → boimela, vfloors360, task-manager, blog-app · Express → boimela, vfloors360, task-manager · MongoDB & Mongoose → vfloors360, task-manager · JWT · OAuth 2.0 → boimela · Multer · Jest / Mocha / Chai |
| Mobile | Android (Java + XML) → boimela, plasma-plus, muslim-virtual-aid, e-doctors, grammarquick · MVVM → boimela, muslim-virtual-aid · Retrofit · Firebase · TensorFlow Lite |
| Databases | MongoDB · MySQL → ropms · Firebase · SQLite |
| Cloud & DevOps | AWS (EC2, Route 53, Lightsail) · GCP Compute Engine · Linux · Nginx · Apache · Docker · Bash · Git & GitHub · GitHub Actions [KHALID: confirm] |
| Tools | VS Code · Android Studio · Postman · Figma |

**Removed:** the ML/DL group, Circuit/AVR, IoT, MATLAB, LaTeX.

## Credentials (`content/credentials.ts`)

**Education**
- B.Sc. Engg. in Electrical & Computer Engineering — Rajshahi University of Engineering & Technology (RUET) · Jan 2017 — Apr 2024

**Certifications**
| Name | Issuer | Date | Credential ID |
|---|---|---|---|
| Machine Learning Specialization | University of Washington · Coursera | Sep 2023 | KJ5PZ6VVX4NS |
| Reinforcement Learning Specialization | University of Alberta · Coursera | Sep 2023 | VVN725H2W3SK |
| Self-Driving Cars Specialization | University of Toronto · Coursera | Oct 2023 | N2ZKC5FNBR95 |

**Awards**
| Award | Event | Date | For |
|---|---|---|---|
| Winner, Special Track | IEEE YESIST12 2020 · Malaysia | Sep 2020 | PLASMA+ |
| 2nd Runner-up | Virtual Project Competition on ICT, IICT RUET | Dec 2020 | PLASMA+ |
| Most Popular Project Award, Maker Fair Track | IEEE YESIST12 2019 · Thailand | Sep 2019 | IoT monitoring robot for disaster management |

## Contact / footer

- Headline: "Let's build something."
- Line: "Hiring for a software engineering role, or have a project in mind? My inbox is open."
- Keyboard line: "Prefer the keyboard? Press ⌘K."
- Meta: "© 2026 Md Khalid Syfullah · Built with Next.js · Source on GitHub"

## Content types

```ts
// content/types.ts
export type Link = { label: string; href: string; external?: boolean };
export type Experience = {
  slug: string; period: string; org: string; role: string; place: string;
  bullets: string[]; shipped: string[];            // project slugs
};
export type Project = {
  slug: string; name: string; featured: boolean; order: number;
  types: ("Android" | "Web" | "Back-end")[]; year?: string;
  pov: string; brief?: string; constraint?: string; decision?: string; outcome?: string;
  stack: string[]; award?: string; links: Link[]; images: string[]; keywords: string[];
};
export type SkillGroup = { name: string; skills: { name: string; projects: string[] }[] };
```
