# Saroj's Portfolio

Personal portfolio, blog and contact site.

## Architecture

- `backend/` — Django 5 + Django REST Framework (API, admin CMS at a non-default path)
- `frontend/` — Next.js 15 (App Router), served as a Node render service
- `render.yaml` — Render Blueprint (Postgres + API + Frontend) ready for one-click deploy

## Super admin panel (frontend)

A custom Next.js dashboard lives at `/admin` (login at `/admin/login`). It authenticates
against the DRF token endpoint (`POST /api/auth/token/`) and is locked to staff/superusers
via the `IsAdminOrReadOnly` permission — reads stay public, writes require a super admin.
It manages Projects, Blog Posts, Skills, Experience, Education, Services, Certifications,
Content Blocks and the Profile through a config-driven CRUD UI (`src/lib/adminResources.ts`).

## Local development

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # fill in values
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev                   # http://localhost:3000
```

## Production security checklist

1. **Secrets** — `SECRET_KEY` and `ALLOWED_HOSTS` are mandatory when `DEBUG=False`;
   the app refuses to boot without them.
2. **Admin 2FA** — the Django admin is TOTP-protected (`django-two-factor-auth`).
   First login lands on `/account/login/`, where you enable a device and get
   backup codes at `/account/two_factor/backup/tokens/`.
3. **Admin URL** — set `ADMIN_URL` to a non-default path (e.g. `dashboard-7x`).
4. **Rate limits** — API throttling keys on the true client IP via
   `X-Forwarded-For` (`THROTTLE_USE_XFF=on`); only enable behind Render's proxy.
5. **Contact form** — honeypot field + `5/hour` throttle + storage/DB.
6. **Uploads** — admin image uploads are validated (extension + real image decode
   via Pillow + 5 MB cap).
7. **CI** — `.github/workflows/security.yml` runs `pip-audit`, `bandit`,
   Django checks, `npm audit`, lint and build on every push; Dependabot opens
   dependency PRs weekly.

## Custom domain + TLS (Render)

1. Render Dashboard → API/Frontend service → **Settings → Custom Domains** → add
   `saroj01.com.np` (+ `www`). Render provisions a free Let's Encrypt
   certificate automatically and redirects HTTP to HTTPS.
2. Update the API env: `ALLOWED_HOSTS=saroj01.com.np,www.saroj01.com.np` and
   `CORS_ALLOWED_ORIGINS=https://saroj01.com.np,https://www.saroj01.com.np`.
3. Point the DNS A/ALIAS record (`saroj01.com.np` → `@`/alias) at the frontend's
   `onrender.com` address. TLS renews automatically as long as the DNS
   resolves to Render.

## Deploying (Render Blueprint)

1. Push `main`.
2. Render Dashboard → **New → Blueprint** → select the repo.
3. Create services: Postgres, `portfolio-api` (gunicorn, auto migrate +
   collectstatic + seed), `portfolio-frontend` (Next.js start).
4. Set env on the API service: `SECRET_KEY`, `ALLOWED_HOSTS`, `DJANGO_ADMIN_URL`
   (if you rename), SMTP vars (`EMAIL_HOST*`) so the contact form actually
   sends, plus `ADMIN_USERNAME`/`ADMIN_PASSWORD` once to bootstrap the admin
   user — then remove them.