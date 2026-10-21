# Deploy (CI/CD)

How khalidsyfullah.com gets from this repo to the web. The site is a static export, and Cloudflare serves it for free from its edge network. No server is involved.

```
 push / PR ─────────────┬──────────────────────────────────────────────┐
                        ▼                                              ▼
 ┌──── GitHub Actions: ci.yml ────┐        ┌──── Cloudflare Workers Builds ────────────┐
 │ npm ci → lint → test → build   │        │ main:  npm run build → npx wrangler deploy │
 │ → wrangler deploy --dry-run    │        │ other branches: preview build + URL        │
 │ (checks only, uploads nothing) │        │ status shows as a check on the commit/PR   │
 └────────────────────────────────┘        └────────────────────┬──────────────────────┘
                                                                ▼
                                   ┌──── Worker "khalid-portfolio" (static assets only) ────┐
                                   │ serves out/ · _headers · 404.html                       │
                                   │ custom domains: khalidsyfullah.com, www (→ 301 to apex) │
                                   └─────────────────────────────────────────────────────────┘
```

- **What runs where:** `ci.yml` checks every push and PR. Cloudflare's own builder (Workers Builds, connected to this repo) deploys `main`. A deploy doesn't need any GitHub secret or API token.
- **Config in the repo:**
  - `wrangler.jsonc`: an assets-only Worker serving `out/`. It uses the 404 page for unknown paths and handles trailing slashes automatically.
  - `public/_headers`: security headers on every response, `immutable` caching for `/_next/static/*` and one week for `/images/*`.
  - `.node-version`: pins Node 22 for the builder, the same version CI uses.
- **Cost:** Workers Free plan. Requests for static assets are free and unlimited. A version can hold up to 20,000 files of up to 25 MiB each; this site has about 85 files.
- **Rollback:** go to Workers & Pages → `khalid-portfolio` → Deployments, open an earlier version and choose **Rollback**. Or revert the commit on `main`.

## Local check

```bash
npm run build
npx wrangler dev            # serves out/ with Cloudflare's runtime at http://localhost:8787
npx wrangler deploy --dry-run
```

## One-time setup

### 1. Add the domain to Cloudflare (DNS moves from Namecheap)

1. In the Cloudflare dashboard, go to **Add a domain**, enter `khalidsyfullah.com` and pick the **Free** plan. Cloudflare imports the existing DNS records.
2. Check the imported records against the table below before changing nameservers. Everything that isn't the website must keep working, and mail records can't be proxied.
3. At Namecheap, open **Domain List** → khalidsyfullah.com → **Nameservers**, choose **Custom DNS** and enter the two nameservers Cloudflare shows. Save.
4. Wait until Cloudflare shows the domain as **Active**. That's usually minutes, but it can take up to 24 hours.

#### DNS records to keep

| Name | Type | Value | Proxy |
|---|---|---|---|
| `n8n` | A | 13.55.18.232 (EC2) | DNS only |
| `production` | A | 13.55.18.232 (EC2) | DNS only |
| `webmail` | A | 52.65.31.165 (Lightsail) | DNS only. Remove when the Lightsail instance goes |
| `@` | MX | 10 `mx01.mail.icloud.com` | — |
| `@` | MX | 10 `mx02.mail.icloud.com` | — |
| `@` | TXT | `v=spf1 … include:icloud.com ~all` | — |
| `@` | TXT | `apple-domain=…`, `google-site-verification=…`, `brevo-code:…` | — |
| `mail` | TXT | `brevo-code:…` | — |
| `sig1._domainkey` | CNAME | `sig1.dkim.khalidsyfullah.com.at.icloudmailadmin.com` | DNS only |
| `brevo1._domainkey` | CNAME | `b1.khalidsyfullah-com.dkim.brevo.com` | DNS only |
| `brevo2._domainkey` | CNAME | `b2.khalidsyfullah-com.dkim.brevo.com` | DNS only |
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | — |

The old `@` and `www` A records (52.65.31.165, Lightsail) are replaced when the Worker gets the custom domains in step 3.

### 2. Connect the repo (Workers Builds)

1. Go to **Workers & Pages** → **Create** → **Import a repository**. Connect GitHub and give the Cloudflare app access to **only** `Khalid-Syfullah/khalid-portfolio`.
2. Project settings:

   | Setting | Value |
   |---|---|
   | Project name | `khalid-portfolio` (must match `name` in `wrangler.jsonc`) |
   | Production branch | `main` |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` |
   | Root directory | `/` |
   | Builds for non-production branches | On (preview URLs for PRs) |

3. Save and deploy. The first build publishes the site at `khalid-portfolio.<account>.workers.dev`.

### 3. Custom domains

1. In the Worker, open **Settings** → **Domains & Routes** → **Add** → **Custom domain**. Add `khalidsyfullah.com`, then `www.khalidsyfullah.com`. Cloudflare creates the DNS records and the certificates.
2. Redirect `www` to the apex: **Rules** → **Redirect Rules** → **Create**, using the "Redirect from WWW to root" template (301, keep the path and query string).
3. **SSL/TLS** → **Edge Certificates**: turn on **Always Use HTTPS**.

### 4. Check

- `https://khalidsyfullah.com` loads the new site, and `https://www.khalidsyfullah.com/x` redirects to `https://khalidsyfullah.com/x`.
- `curl -sI https://khalidsyfullah.com` shows the headers from `public/_headers`.
- Mail still works: send a message to and from the iCloud address. The MX, SPF, DKIM and DMARC records resolve as before (`dig MX khalidsyfullah.com`).
- `n8n.khalidsyfullah.com` and `production.khalidsyfullah.com` still reach the EC2 server.
- PageSpeed Insights on the live URL.

## After the cut-over

- The old site on the Lightsail instance (`OpenClaw-1`, 52.65.31.165) no longer gets traffic for khalidsyfullah.com. Before stopping or deleting the instance, check what else runs on it (webmail and any other sites). Deleting it is Khalid's call, done by him.
- When Cloudflare preview builds are on, Netlify's PR previews (`netlify.toml`) can be disconnected.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Build fails with an unsupported Node version | Check that `.node-version` is in the repo root. You can also set `NODE_VERSION=22` under Settings → Build → Variables |
| `A Worker with this name already exists` or the wrong Worker deploys | The project name in the dashboard must equal `name` in `wrangler.jsonc` |
| Custom domain stuck on "Initializing" | The domain isn't Active on Cloudflare yet (nameservers still at Namecheap) |
| Mail stops arriving | An MX/DKIM record is missing or proxied. Compare against the table above; DKIM CNAMEs must be DNS only |
| Old site still shows | DNS cache. Check `dig +short khalidsyfullah.com` (it should return Cloudflare IPs) and try a private window |
