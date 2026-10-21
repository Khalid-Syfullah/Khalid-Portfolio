# Khalid Portfolio — Research & Build Plan

**Site:** khalidsyfullah.com · **Repo:** Khalid-Syfullah/Khalid-Portfolio · **Drafted:** 21 Oct 2026

```
 ┌──────────┐   ┌──────┐   ┌────────┐   ┌────────┐   ┌───────┐   ┌──────────┐   ┌────────┐
 │ RESEARCH │──▶│ PLAN │──▶│ DESIGN │──▶│ REVIEW │──▶│ BUILD │──▶│ OPTIMIZE │──▶│ DEPLOY │
 └──────────┘   └──────┘   └────────┘   └────────┘   └───────┘   └──────────┘   └────────┘
     done        this doc    next         gate          gate         gate          gate
```

No phase starts until the one before it is signed off. That's the rule from the brief.

### Decisions (Khalid, 21 Oct 2026)
- **Positioning: Software Engineer.** The site is for Khalid himself.
- **No kernel / Chimera OS work** on the site.
- **No Research section** (papers removed) and **no Blog**.
- **Photos:** use the two portraits from the current site (square headshot and the outdoor photo).
- **Hosting: AWS Lightsail.** Build a **new CI/CD** from scratch.
- **The old site is scrapped completely.** No backup and no fallback; the new build replaces it at deploy.

---

## 0. Brief (from Khalid's voice note)

- Build a **single-page, résumé/CV-type** portfolio: interactive, with the best design possible.
- Use the three galleries (One Page Love résumé, A1 Gallery portfolio, Bestfolios) for inspiration.
- Those sites are **design-focused**, so they lead with work visuals. That's fine, but **this site must also carry work experience**. It's résumé-first, with visuals in support.
- Stack: **Next.js** plus whatever libraries are needed: **Framer Motion, shadcn/ui, Tailwind**. Optimize everything.
- Process: research → plan → design → review → development. **No step can be skipped**, because working at random won't produce a good result.

---

## 1. Starting point

### Repo
- Has one commit ("Initial Commit", 24 Apr 2026). It is the untouched **Create React App** boilerplate (React 19, react-scripts 5, react-icons).
- CRA has been deprecated since Feb 2025. It gets replaced by a Next.js App Router scaffold in the same repo, so the history is kept.

### Live khalidsyfullah.com (built from source outside this repo)
- A dark single-pager: `#07070c` background, purple→teal gradient name, glow blobs, particle lines, a typing role line and an "Open to opportunities" pill.
- It shows **10 nav items** (About · Education · Experience · Skills · Projects · Research · Certs · Awards · Documents · Blog), **14 projects** given equal weight, around **100 skill tags** in 12 groups (plus a marquee that repeats them), 9 papers, certs, awards, 10 downloadable documents and a contact section.
- **The content is strong and complete**, so it becomes the content source for the new build. The weak part is presentation:
  1. The look is the generic "dark glow" template that thousands of dev portfolios share.
  2. Nothing is ranked. Everything is shown at the same weight, so a recruiter can't tell what matters most.
  3. The 10-item nav is a CV table of contents, not a page.
  4. Project captions are metadata ("React task management web application"), not a point of view.

---

## 2. What the references say

| Source | What it is | What to take | What to leave |
|---|---|---|---|
| **One Page Love — Résumé** (55 sites, 7 pages) | One-page résumé sites | The layouts below | Long unedited bios |
| **A1 Gallery — Portfolio** (205 sites) | Curated portfolio sites, mostly designers | Typographic confidence, editorial rules | Visual-only work grids |
| **Bestfolios** (100 portfolios, 50 résumés) | UX/product designer showcase | Its résumé collection; the few engineers (e.g. Dennis Gecaj, design engineer; Shubham Gupta, senior developer, both Editors' Picks) | Case-study-heavy designer flow |

### Four layouts that recur in the One Page Love résumé set
1. **Text-first column.** Christian Baun, Kshitij Srivastava, Ana Rita Morais: a narrow column with a short intro, a row of links and labelled sections. It reads in under a minute.
2. **Swiss résumé grid.** Sean O'Shea: a headline that lists his roles, then a left label column with content columns beside it, so the résumé reads like a table. **This is the best fit for experience-heavy content.**
3. **Big-type hero plus work list.** Wesley Naude, Marc Hanslin: a giant name or role, selected work as rows, and one strong colour band.
4. **Dark card grid.** Felice Della Gatta, Laurids: projects as tagged cards. This is closest to the current site.

### Trends and rules (A1 Gallery)
- Most sites are typography-led and minimal. Monochrome with **one accent colour** dominates, and "dark elegant" is common.
- **Show 3–4 featured projects up top and 6–10 in total.** Put the rest in an archive.
- A caption should carry an opinion, not just metadata. A case study runs *brief → constraint → decision → outcome*.
- Write in a personal voice with a commercial structure, and **say plainly what you're looking for.**
- Next.js is the usual pick for people who are comfortable writing code.

### Direction
Combine **layout 2 (Swiss résumé grid)** for experience, education and research with **layout 3 (big-type hero)** and a short, curated Selected Work section. Interaction should help people scan (filtering, expanding, jumping around), not decorate the page.

---

## 3. Positioning (decided)

**Software Engineer.** Web, back-end and Android products, plus cloud/Linux deployment. Awards and certifications act as supporting proof. Research and OS work stay off the site.

---

## 4. Information architecture (one page, 5 nav items)

| # | Section | Content | Replaces (old site) |
|---|---|---|---|
| 0 | **Hero** | Name in big type, "Software Engineer", availability line, links (Email, LinkedIn, GitHub, LeetCode), Résumé button, ⌘K hint, photo | Hero |
| 1 | **About** | 3–4 sentences, second photo, facts strip (based in, languages, degree) | About |
| 2 | **Experience** | Timeline rows: Qubitech Solutions, MonstarLab (industrial attachment), BOIMELA thesis, IEEE R10 HAC (Medspire), leadership. Click a row to expand its bullets and linked projects | Experience + Leadership |
| 3 | **Work** | 4 featured case cards (brief / constraint / decision / outcome, one visual each) and an **All projects** archive table with filters | Projects |
| 4 | **Skills** | 6 ranked groups (Languages, Front-end, Back-end, Mobile, Cloud & DevOps, Databases), no marquee | Skills |
| 5 | **Credentials** | Education · Certifications · Awards | Education + Certs + Awards |
| — | **Contact / footer** | CTA, email, LinkedIn, Résumé | Contact |

**Project consolidation:** BOIMELA app, back-end and web become one case. VFloors360 client, server and admin become one case.

**Suggested featured projects (confirm at design review):** BOIMELA, VFloors360, PLASMA+ (IEEE YESIST12 winner) and OBOSOR (Qubitech). Everything else goes in the archive.

**Proposed cuts (confirm at design review):** IELTS/GRE scores and the academic-document drawer (certificates, transcripts) are academic material, like the papers. The plan drops them and keeps only a résumé download.

---

## 5. Interactions (each one has a job)

- **⌘K command palette** (shadcn `Command`): jump to a section, open the CV, copy the email, switch theme.
- **Scroll-spy nav** with a reading-progress indicator.
- **Expandable experience rows** using Motion layout animations.
- **Project filter and archive** with shared-layout transitions; on desktop, a screenshot follows the cursor when hovering a row.
- **Light/dark theme** (next-themes) that follows the system setting.
- **Print stylesheet**, so printing the page produces a clean résumé.
- Gentle entrance reveals only. Everything respects `prefers-reduced-motion`.

---

## 6. Stack

- **Next.js** (latest stable, App Router, TypeScript) with `output: 'export'` for a static build served by Nginx on the AWS Lightsail instance.
- **Tailwind CSS v4** and **shadcn/ui** (Command, Sheet, Tabs, Tooltip, Badge, Button).
- **Motion** (the current name of Framer Motion; `motion/react`) for transitions and layout animation.
- **next-themes**, **lucide-react** (UI icons) and simple-icons or react-icons (brand marks: GitHub, LinkedIn, Scholar, LeetCode).
- **Content as typed data** (`content/*.ts`) as the single source for every section. JSON-LD is generated from the same files.
- `next/font` for self-hosted fonts. Images are pre-sized AVIF/WebP, because static export can't use the default image optimizer.

---

## 7. Optimization targets

- Lighthouse **≥ 95** in all four categories on mobile.
- **LCP < 2.0 s, CLS < 0.05, INP < 200 ms.**
- First-load JS kept small: only the interactive pieces are client components.
- SEO: metadata, Open Graph image, `sitemap.xml`, `robots.txt`, JSON-LD `Person`.
- Accessibility: keyboard support for the palette and expanders, visible focus rings, AA contrast, reduced motion.

---

## 8. Phases and gates

| Phase | Output | Gate |
|---|---|---|
| 1 Research | §1–2 of this doc | ✅ done |
| 2 Plan | This doc | ✅ answered 21 Oct |
| 3 Design | 3 visual directions (hero plus Experience), then the full page in the chosen direction: desktop and mobile, light and dark | Khalid picks a direction |
| 4 Review | Revision rounds on the full design | Khalid signs off |
| 5 Build | Next.js replaces CRA; content files, sections, interactions; delivered as a PR to `main` | PR reviewed |
| 6 Optimize | Lighthouse, accessibility and SEO pass against §7, with a report | Targets met |
| 7 Deploy | New GitHub Actions workflow: on push to `main`, build the static site and deploy it over SSH (rsync) to the Lightsail instance's Nginx web root. The old site is removed completely and khalidsyfullah.com points at the new build | Khalid approves the cut-over |

---

## 9. Deploy prerequisites (needed before Phase 7)

1. **Lightsail details:** instance name/region and static IP, SSH username, and whether Nginx already serves khalidsyfullah.com there (HTTPS via Let's Encrypt?).
2. **Deploy key:** a dedicated SSH key pair for GitHub Actions. The public key goes on the instance and the private key goes in the repo's Actions secrets (`LIGHTSAIL_HOST`, `LIGHTSAIL_USER`, `LIGHTSAIL_SSH_KEY`). Khalid adds the secret himself.
3. **Résumé PDF:** the software-engineering résumé to link from the site (the old site linked the 4-page academic CV).
