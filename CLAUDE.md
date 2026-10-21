# Working in this repo

khalidsyfullah.com: Md Khalid Syfullah's single-page portfolio (Software Engineer).

## Rules

- **Update `README.md` in every commit you push.** Keep its Status line, Progress table and Changelog current (newest entry first, dated).
- **Follow the phases in `docs/PLAN.md`.** Research → plan → design → review → build → optimize → deploy. Don't skip a phase or start one before the previous gate is signed off.
- **The design spec is the source of truth.** It lives in `DESIGN.md` and `docs/design/`. Change the spec before changing code that disagrees with it.
- **Tokens only.** Colours, sizes and durations come from `docs/design/02-tokens.md` (CSS variables). No raw hex in components.
- **Content only from `docs/design/08-content.md`** (later `content/*.ts`). Never invent facts; mark unknowns `[KHALID: …]`.
- **No academic content:** papers, IELTS/GRE, transcripts, certificates, HSC/SSC, CGPA, student leadership. No kernel / Chimera OS work and no blog.
- **Deploys** happen through Cloudflare Workers Builds when `main` changes (`docs/DEPLOY.md`). Never deploy by hand with `wrangler deploy`. The domain's DNS lives on Cloudflare, so leave the mail, DKIM and EC2 (`n8n`, `production`) records alone.

## Code notes

- **Next.js 16 changed APIs.** Read `AGENTS.md` and the bundled docs in `node_modules/next/dist/docs/` before relying on older patterns. The site is a static export (`output: "export"`): no server features, no `next/image` optimizer.
- **Type scale:** use the `type-display|h2|h3|lead|body|small|label|meta` utilities, never custom `text-*` sizes, because `cn` would read those as colours.
- **Keep the first load light.** Overlays (command menu, case dialog, phone nav, toaster) and Motion pieces load via `next/dynamic`. Don't import them statically into sections.
- **Before pushing:** `npm run lint` and `npm run build` must pass. For UI changes, check light and dark, phone and desktop.
