# Khalid Portfolio — khalidsyfullah.com

[![CI](https://github.com/Khalid-Syfullah/khalid-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Khalid-Syfullah/khalid-portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/Khalid-Syfullah/khalid-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/Khalid-Syfullah/khalid-portfolio/actions/workflows/deploy.yml)

The personal site of **Md Khalid Syfullah, Software Engineer**. It's a single-page, résumé-style portfolio that you can operate from the keyboard: a ⌘K command menu, expandable experience rows and filterable projects.

> **Status:** Phase 3 — Design (spec written, waiting on review). The app code hasn't started yet; `src/` still holds the original Create React App placeholder, which will be replaced by Next.js in Phase 5.

## Progress

| Phase | What | State |
|---|---|---|
| 1 · Research | Reference galleries, the old site, the brief | ✅ Done |
| 2 · Plan | [`docs/PLAN.md`](docs/PLAN.md) | ✅ Done |
| 3 · Design | [`DESIGN.md`](DESIGN.md) + [`docs/design/`](docs/design/) | 🟡 Waiting on review |
| 4 · Review | Khalid signs off on the design | ⏳ |
| 5 · Build | Next.js + Tailwind + shadcn/ui + Motion | ⏳ |
| 6 · Optimize | Lighthouse ≥ 95, a11y, SEO | ⏳ |
| 7 · Deploy | GitHub Actions → AWS Lightsail ([`docs/DEPLOY.md`](docs/DEPLOY.md)) | 🟡 Pipeline ready, switched off |

## Docs

| File | What's in it |
|---|---|
| [`docs/PLAN.md`](docs/PLAN.md) | Research, decisions, phases and gates |
| [`DESIGN.md`](DESIGN.md) | Design entry point: concept, principles, file index |
| [`docs/design/01-direction.md`](docs/design/01-direction.md) | Direction and references |
| [`docs/design/02-tokens.md`](docs/design/02-tokens.md) | Colours, type, spacing, `globals.css` |
| [`docs/design/03-layout.md`](docs/design/03-layout.md) | Grid, header, responsive rules |
| [`docs/design/04-sections.md`](docs/design/04-sections.md) | Hero, About, Experience, Work, Skills, Credentials, Contact |
| [`docs/design/05-components.md`](docs/design/05-components.md) | Components and shadcn/ui mapping |
| [`docs/design/06-interactions.md`](docs/design/06-interactions.md) | ⌘K menu, scroll-spy, rows, filters, dialogs, print |
| [`docs/design/07-motion.md`](docs/design/07-motion.md) | Motion tokens and choreography |
| [`docs/design/08-content.md`](docs/design/08-content.md) | All copy and data |
| [`docs/design/09-quality.md`](docs/design/09-quality.md) | Accessibility, performance, SEO, review checklist |
| [`docs/DEPLOY.md`](docs/DEPLOY.md) | CI/CD and the one-time server setup |

## Stack (planned)

Next.js (App Router, TypeScript, static export) · Tailwind CSS v4 · shadcn/ui · Motion (Framer Motion) · next-themes · lucide-react. Served as static files by nginx on AWS Lightsail.

## CI/CD

- **CI** (`.github/workflows/ci.yml`): every pull request and branch push runs install → lint → test → build.
- **Deploy** (`.github/workflows/deploy.yml`): every push to `main` builds the site, uploads it over SSH to the Lightsail server as a new release, switches the live symlink, health-checks `https://khalidsyfullah.com/version.txt`, and rolls back automatically if that fails.
- Deploys stay **off** until the repository variable `DEPLOY_ENABLED=true` and the SSH secrets are set. The steps are in [`docs/DEPLOY.md`](docs/DEPLOY.md), and the server bootstrap script is [`deploy/setup-server.sh`](deploy/setup-server.sh).

## Repository layout

```
.github/workflows/   ci.yml, deploy.yml
deploy/              nginx site config + one-time server setup script
docs/                PLAN.md, DEPLOY.md, design/ (spec files)
DESIGN.md            design entry point
src/, public/        Create React App placeholder (replaced in Phase 5)
```

## Local development

Phase 5 replaces the commands below with the Next.js ones (`npm run dev`, `npm run build` → `out/`).

```bash
npm ci
npm start        # current placeholder app on http://localhost:3000
npm run build    # production build
```

## Changelog

- **2026-10-21:** Design spec added (`DESIGN.md` + 9 files in `docs/design/`). Everything academic removed from the plan and content. CI/CD added: build checks on every PR, and Lightsail deploy with atomic releases and automatic rollback (off until setup). README rewritten.
- **2026-10-21:** `docs/PLAN.md` added: research on the reference galleries and the old site, decisions, and the phased plan.
- **2026-04-24:** Initial commit (Create React App scaffold).
