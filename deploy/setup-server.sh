#!/usr/bin/env bash
# One-time server setup for khalidsyfullah.com on the AWS Lightsail instance.
# Run ON THE SERVER with sudo. Only touches the khalidsyfullah.com site:
# mail, other domains and other nginx sites are left alone.
#
#   sudo bash setup-server.sh prepare "ssh-ed25519 AAAA… github-actions@khalid-portfolio"
#       Creates the `deploy` user with the GitHub Actions key, creates
#       /var/www/khalidsyfullah.com/{releases,current}, and switches nginx to the
#       new site config. `current` points at the OLD site until the first deploy,
#       so nothing goes down in between.
#
#   sudo bash setup-server.sh remove-old
#       After the first deploy is live: permanently deletes the old site's files.
#
# Overrides (env): OLD_ROOT=/path/to/old/site  CERT_NAME=khalidsyfullah.com
set -euo pipefail

DOMAIN="khalidsyfullah.com"
DEPLOY_USER="deploy"
DEPLOY_PATH="/var/www/${DOMAIN}"
CERT_NAME="${CERT_NAME:-$DOMAIN}"
HERE="$(cd "$(dirname "$0")" && pwd)"
NEW_CONF_SRC="${HERE}/nginx/${DOMAIN}.conf"
SITES_AVAIL="/etc/nginx/sites-available"
SITES_ENABLED="/etc/nginx/sites-enabled"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="/root/nginx-backup-${STAMP}"

say()  { printf '\n\033[1m%s\033[0m\n' "$*"; }
die()  { printf '\n\033[31mError:\033[0m %s\n' "$*" >&2; exit 1; }
confirm() { read -r -p "$1 [y/N] " a; [[ "$a" =~ ^[Yy]$ ]]; }

[ "$(id -u)" -eq 0 ] || die "run with sudo"
command -v nginx >/dev/null || die "nginx is not installed"

# Files whose server_name mentions the domain (exact host names only)
site_files() {
  local d="${DOMAIN//./\\.}"
  grep -lE "server_name([^;]*[[:space:]])?(www\.)?${d}([[:space:]][^;]*)?;" "$SITES_ENABLED"/* /etc/nginx/conf.d/*.conf 2>/dev/null || true
}

prepare() {
  local pubkey="${1:-}"
  [ -n "$pubkey" ] || die 'usage: sudo bash setup-server.sh prepare "ssh-ed25519 AAAA… comment"'
  [[ "$pubkey" =~ ^ssh-(ed25519|rsa)\  ]] || die "that doesn't look like an SSH public key"
  [ -f "$NEW_CONF_SRC" ] || die "missing $NEW_CONF_SRC (download the deploy/ folder from the repo first)"
  [ -f "/etc/letsencrypt/live/${CERT_NAME}/fullchain.pem" ] || die "no certificate at /etc/letsencrypt/live/${CERT_NAME}/ (set CERT_NAME, or run certbot first)"

  say "1/5  Packages"
  command -v rsync >/dev/null || { apt-get update -qq && apt-get install -y -qq rsync; }
  echo "rsync: $(rsync --version | head -1)"

  say "2/5  Deploy user '${DEPLOY_USER}'"
  if ! id "$DEPLOY_USER" >/dev/null 2>&1; then
    adduser --system --group --shell /bin/bash --home "/home/${DEPLOY_USER}" "$DEPLOY_USER"
  fi
  install -d -m 700 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "/home/${DEPLOY_USER}/.ssh"
  local ak="/home/${DEPLOY_USER}/.ssh/authorized_keys"
  touch "$ak"
  local entry="no-port-forwarding,no-agent-forwarding,no-X11-forwarding ${pubkey}"
  grep -qxF "$entry" "$ak" || echo "$entry" >> "$ak"
  chown "$DEPLOY_USER:$DEPLOY_USER" "$ak"; chmod 600 "$ak"
  echo "key installed for ${DEPLOY_USER}"

  say "3/5  Find the current site"
  mapfile -t files < <(site_files)
  [ "${#files[@]}" -gt 0 ] && printf '  config: %s\n' "${files[@]}"
  local old_root="${OLD_ROOT:-}"
  if [ -z "$old_root" ] && [ "${#files[@]}" -gt 0 ]; then
    old_root="$(grep -hE '^\s*root\s' "${files[@]}" | grep -vE 'letsencrypt|acme' | head -1 | awk '{print $2}' | tr -d ';')"
  fi
  for f in "${files[@]}"; do
    # refuse to disable a file that also serves other host names (mail, n8n, other domains…)
    others="$(grep -hoE 'server_name[^;]*' "$f" | sed 's/server_name//' | tr ' ' '\n' | grep -v -E "^$|^${DOMAIN//./\\.}$|^www\.${DOMAIN//./\\.}$" || true)"
    [ -z "$others" ] || die "$f also serves: $(echo $others). Split that file by hand first, then re-run."
  done
  echo "  old web root: ${old_root:-<not found>}"
  [ -n "$old_root" ] || die "couldn't find the old web root; re-run with OLD_ROOT=/path"
  confirm "Use ${old_root} as the OLD site (kept live until the first deploy)?" || die "aborted"

  say "4/5  Web root ${DEPLOY_PATH}"
  install -d -m 755 -o "$DEPLOY_USER" -g "$DEPLOY_USER" "$DEPLOY_PATH" "$DEPLOY_PATH/releases"
  install -d -m 755 /var/www/letsencrypt
  if [ ! -e "$DEPLOY_PATH/current" ]; then
    ln -s "$old_root" "$DEPLOY_PATH/current"
    chown -h "$DEPLOY_USER:$DEPLOY_USER" "$DEPLOY_PATH/current"
  fi
  echo "$old_root" > "$DEPLOY_PATH/.old_root"
  echo "  current -> $(readlink "$DEPLOY_PATH/current")"

  say "5/5  Nginx"
  mkdir -p "$BACKUP_DIR"
  for f in "${files[@]}"; do cp -aL "$f" "$BACKUP_DIR/"; rm -f "$f"; done
  [ -f "$SITES_AVAIL/$DOMAIN" ] && cp -a "$SITES_AVAIL/$DOMAIN" "$BACKUP_DIR/$DOMAIN.available"
  sed "s#/etc/letsencrypt/live/${DOMAIN}/#/etc/letsencrypt/live/${CERT_NAME}/#g" "$NEW_CONF_SRC" > "$SITES_AVAIL/$DOMAIN"
  ln -sfn "$SITES_AVAIL/$DOMAIN" "$SITES_ENABLED/$DOMAIN"
  if nginx -t; then
    systemctl reload nginx
    echo "nginx reloaded (backup of the old config: $BACKUP_DIR)"
  else
    echo "nginx -t failed, restoring the old config"
    rm -f "$SITES_ENABLED/$DOMAIN"
    for f in "$BACKUP_DIR"/*; do
      case "$f" in *.available) cp -a "$f" "$SITES_AVAIL/$DOMAIN" ;; *) cp -a "$f" "$SITES_ENABLED/" ;; esac
    done
    nginx -t && systemctl reload nginx
    die "new config rejected; nothing changed"
  fi

  say "Done."
  cat <<EOF
Next:
  1. Add the GitHub secrets/variables listed in docs/DEPLOY.md
     (LIGHTSAIL_USER=${DEPLOY_USER}, DEPLOY_PATH=${DEPLOY_PATH}).
  2. Run the Deploy workflow. The new site replaces the old one.
  3. Then: sudo bash $0 remove-old
EOF
}

remove_old() {
  local old_root
  old_root="${OLD_ROOT:-$(cat "$DEPLOY_PATH/.old_root" 2>/dev/null || true)}"
  [ -n "$old_root" ] || die "old web root unknown; set OLD_ROOT=/path"
  local live; live="$(readlink "$DEPLOY_PATH/current" || true)"
  [[ "$live" == releases/* || "$live" == "$DEPLOY_PATH/releases/"* ]] || die "current still points at ${live:-nothing}; deploy the new site first"
  case "$old_root" in /|/var|/var/www|/home|/root|/etc|/usr) die "refusing to delete $old_root";; esac
  [ "$old_root" != "$DEPLOY_PATH" ] || die "refusing to delete the deploy path itself"
  [ -d "$old_root" ] || { echo "$old_root is already gone"; rm -f "$DEPLOY_PATH/.old_root"; exit 0; }
  du -sh "$old_root"
  confirm "Permanently delete the old site at ${old_root}?" || die "aborted"
  rm -rf -- "$old_root"
  rm -f "$DEPLOY_PATH/.old_root"
  # the first deploy recorded the old root as the rollback target; clear it
  if [ "$(cat "$DEPLOY_PATH/.previous" 2>/dev/null || true)" = "$old_root" ]; then : > "$DEPLOY_PATH/.previous"; fi
  echo "Old site removed."
}

case "${1:-}" in
  prepare)    shift; prepare "${1:-}" ;;
  remove-old) remove_old ;;
  *) sed -n '2,16p' "$0"; exit 1 ;;
esac
