# Deploy (CI/CD)

How khalidsyfullah.com gets from this repo to the AWS Lightsail server.

```
 git push main
      │
      ▼
 ┌──────────────── GitHub Actions: deploy.yml ────────────────┐
 │ build job                    deploy job (needs build)      │
 │  npm ci → lint → test →      only if DEPLOY_ENABLED=true   │
 │  npm run build → out/   ──▶  rsync out/ → releases/<id>/   │
 │  + version.txt (git SHA)     switch current → releases/<id>│
 │  upload artifact "site"      curl /version.txt == SHA ?    │
 │                               ├─ yes → done ✔               │
 │                               └─ no  → roll back to previous│
 └────────────────────────────────────────────────────────────┘
      │ SSH (deploy user, key in GitHub secrets)
      ▼
 ┌──────── Lightsail · Ubuntu · nginx 1.24 · 52.65.31.165 ────────┐
 │ /var/www/khalidsyfullah.com/                                   │
 │   releases/20261021083000-8b1fd38/   ← one folder per deploy   │
 │   releases/20261022101500-1a2b3c4/                             │
 │   current → releases/20261022101500-1a2b3c4   (atomic symlink) │
 │ nginx root = /var/www/khalidsyfullah.com/current               │
 └────────────────────────────────────────────────────────────────┘
```

- **`ci.yml`** builds every pull request and non-main branch (install → lint → test → build).
- **`deploy.yml`** runs on every push to `main` (or by hand from the Actions tab). The last 5 releases are kept, and a failed health check rolls back automatically.
- **The deploy job is switched off until setup is done.** It only runs when the repository variable `DEPLOY_ENABLED` is `true`. Until then pushes are built and checked, but not deployed.
- Only the **khalidsyfullah.com** site is touched. Mail, other domains and other nginx sites on the server are left alone.

## One-time setup

Do this once, **after the new Next.js site is merged to `main`** (Phase 7 in [`PLAN.md`](PLAN.md)). Enabling it earlier would deploy the old Create React App placeholder.

### 1. Make a deploy key (on your Mac)

```bash
ssh-keygen -t ed25519 -C "github-actions@khalid-portfolio" -f ~/.ssh/khalid_portfolio_deploy -N ""
cat ~/.ssh/khalid_portfolio_deploy.pub     # public key → server (step 2)
cat ~/.ssh/khalid_portfolio_deploy         # private key → GitHub secret (step 3)
```

### 2. Prepare the server (SSH into the Lightsail instance)

```bash
mkdir -p ~/portfolio-deploy/nginx && cd ~/portfolio-deploy
curl -fsSLO https://raw.githubusercontent.com/Khalid-Syfullah/khalid-portfolio/main/deploy/setup-server.sh
curl -fsSL -o nginx/khalidsyfullah.com.conf https://raw.githubusercontent.com/Khalid-Syfullah/khalid-portfolio/main/deploy/nginx/khalidsyfullah.com.conf
sudo bash setup-server.sh prepare "$(cat <<'KEY'
ssh-ed25519 AAAA…paste the .pub line here… github-actions@khalid-portfolio
KEY
)"
```

The script:
1. installs `rsync` if missing;
2. creates a `deploy` user that can log in only with that key (no forwarding);
3. finds the current khalidsyfullah.com nginx config and its web root, and asks you to confirm;
4. creates `/var/www/khalidsyfullah.com/releases` and points `current` at the **old** site for now, so nothing goes down;
5. backs up the old nginx config to `/root/nginx-backup-<date>/`, installs `deploy/nginx/khalidsyfullah.com.conf`, runs `nginx -t` and reloads. If the test fails, it restores the old config automatically.

It stops without changing anything if the old config file also serves other host names (for example `mail.khalidsyfullah.com`). In that case, split that file by hand first.

Also check that the Lightsail firewall allows SSH (port 22) from anywhere. GitHub's runners don't have fixed IPs.

### 3. Add secrets and variables in GitHub

Repo → **Settings → Secrets and variables → Actions**

| Kind | Name | Value |
|---|---|---|
| Secret | `LIGHTSAIL_HOST` | `52.65.31.165` (the instance's static IP) |
| Secret | `LIGHTSAIL_USER` | `deploy` |
| Secret | `LIGHTSAIL_SSH_KEY` | the whole private key file from step 1 |
| Secret (optional) | `LIGHTSAIL_KNOWN_HOSTS` | output of `ssh-keyscan -H 52.65.31.165` (pins the server key) |
| Variable | `DEPLOY_PATH` | `/var/www/khalidsyfullah.com` (default) |
| Variable | `SITE_URL` | `https://khalidsyfullah.com` (default) |
| Variable | `DEPLOY_ENABLED` | `true`. Set this last; it switches deploys on. |

The same thing with the GitHub CLI:

```bash
gh secret set LIGHTSAIL_HOST -b "52.65.31.165"
gh secret set LIGHTSAIL_USER -b "deploy"
gh secret set LIGHTSAIL_SSH_KEY < ~/.ssh/khalid_portfolio_deploy
ssh-keyscan -H 52.65.31.165 | gh secret set LIGHTSAIL_KNOWN_HOSTS
gh variable set DEPLOY_ENABLED -b "true"
```

### 4. First deploy, then remove the old site

1. Actions → **Deploy** → **Run workflow** (or push to `main`).
2. When it's green, the new site is live.
3. On the server, delete the old site for good (the brief: no backup):
   ```bash
   sudo bash ~/portfolio-deploy/setup-server.sh remove-old
   ```

## Day to day

- **Deploy:** merge to `main`. That's it.
- **Check what's live:** `curl https://khalidsyfullah.com/version.txt` prints the deployed commit SHA.
- **Roll back by hand:**
  ```bash
  ssh deploy@52.65.31.165
  cd /var/www/khalidsyfullah.com && ls -1t releases/       # pick a release
  ln -sfn releases/<id> current.tmp && mv -Tf current.tmp current
  ```
  Or re-run an older successful Deploy run from the Actions tab.
- **Pause deploys:** set `DEPLOY_ENABLED` to `false`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Missing secrets` | Add the secrets from step 3 |
| `Permission denied (publickey)` | The public key isn't in `/home/deploy/.ssh/authorized_keys`, or the wrong private key is in the secret |
| `Host key verification failed` | Update `LIGHTSAIL_KNOWN_HOSTS` (the server was rebuilt, or the IP changed) |
| Health check fails | Is nginx's root `/var/www/khalidsyfullah.com/current`? Run `sudo nginx -T \| grep -A3 "server_name khalidsyfullah.com"` |
| SSH times out | Lightsail firewall: allow TCP 22 from `0.0.0.0/0` |
