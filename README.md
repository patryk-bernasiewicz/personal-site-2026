# personal-site-2026

Personal static site: **Astro 6**, **TypeScript**, **Tailwind v4**, **Contentful** (blog), **Docker** deploy.

## Architecture

**Read [`AGENTS.md`](./AGENTS.md) first** — folder contract, i18n, data flow, and agent rules.

### Languages & routes

| Page | Polski (`pl`) | English (`en`) |
|------|---------------|----------------|
| Home | `/` | `/en` |
| About | `/o-mnie` | `/about` |
| Resume | `/cyfrowe-cv` | `/digital-resume` |
| Blog | `/blog` | `/articles` |

Redirects: `/resume` → `/cyfrowe-cv`, `/cv` → `/cyfrowe-cv`.

Registry: `src/lib/i18n/routes.ts` — never hardcode these paths in components.

## Local development

```bash
cp .env.example .env
# set SITE_URL, CONTENTFUL_*, PORT
npm install
npm run dev
```

### Contentful `blogPost` model

| Field | Type |
|-------|------|
| `title` | Short text |
| `slug` | Short text |
| `description` | Short text |
| `publishedAt` | Date |
| `updatedAt` | Date (optional) |
| `tags` | Short text, list |
| `content` | Rich text |
| `coverImage` | Media (optional) |

```bash
npm run content:check   # requires .env
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run dev:host` | Dev server on `0.0.0.0` |
| `npm run build` | `astro check` + production build |
| `npm run check` | Typecheck |
| `npm run preview` | Preview build |
| `npm run content:check` | Verify Contentful API |
| `npm run docker:up` | Build & run container |

## Docker deploy

```bash
docker context use <remote>
cp docker/.env.example docker/.env
# set SITE_URL, PORT=3660, CONTENTFUL_*, then:
docker compose -f docker/compose.yaml --env-file docker/.env up -d --build
```

Site listens on `http://<host>:${PORT}` (default **3660**, same mapping inside and outside the container: `3660:3660`).

Production image build needs valid `CONTENTFUL_*` values (static prerender).
