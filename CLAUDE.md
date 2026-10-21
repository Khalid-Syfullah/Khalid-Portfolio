# Working in this repo

khalidsyfullah.com: Md Khalid Syfullah's single-page portfolio (Software Engineer).

## Rules

- **Update `README.md` in every commit you push.** Keep its Status line, Progress table and Changelog current (newest entry first, dated).
- **Follow the phases in `docs/PLAN.md`.** Research → plan → design → review → build → optimize → deploy. Don't skip a phase or start one before the previous gate is signed off.
- **The design spec is the source of truth.** It lives in `DESIGN.md` and `docs/design/`. Change the spec before changing code that disagrees with it.
- **Tokens only.** Colours, sizes and durations come from `docs/design/02-tokens.md` (CSS variables). No raw hex in components.
- **Content only from `docs/design/08-content.md`** (later `content/*.ts`). Never invent facts; mark unknowns `[KHALID: …]`.
- **No academic content:** papers, IELTS/GRE, transcripts, certificates, HSC/SSC, CGPA, student leadership. No kernel / Chimera OS work and no blog.
- **Deploys** go through GitHub Actions to AWS Lightsail (`docs/DEPLOY.md`). Never deploy by hand. Never touch other sites, mail or other config on that server.
