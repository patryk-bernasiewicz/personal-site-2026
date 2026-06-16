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
# set PUBLIC_SITE_URL, CONTENTFUL_*, PORT
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

### Floating music player

The player fetches a public playlist directly from MinIO/S3:

```bash
MUSIC_PLAYLIST_URL=https://s3.patrykb.pl/patrykbpl/audio/playlist.json
```

Credentials are not required. The playlist should contain absolute MP3 URLs
readable by the browser:

```json
[
  {
    "title": "Atmospheric Track 01",
    "artist": "Patryk",
    "src": "https://s3.patrykb.pl/patrykbpl/audio/01-night-interface.mp3"
  }
]
```

The MinIO bucket needs CORS `GET` access for the deployed site origin. Without
CORS, playback may work, but the Web Audio visualizer may not receive analyser data.

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
cp .env.prod.example .env.prod
# set PUBLIC_SITE_URL, PORT=3660, CONTENTFUL_*, then:
docker --context mikrus compose --env-file .env.prod up -d
```

Container publishes `HOST_BIND:PORT` (default `127.0.0.1:3660`) for the VPS nginx reverse proxy.

Production image build needs valid `CONTENTFUL_*` values (static prerender).
