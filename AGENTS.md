# Agent guide — personal-site-2026

This file is the **source of truth** for how this Astro project is structured. Follow it in every session unless there is a strong technical reason to deviate. If you deviate, explain why and keep the change minimal.

## Project summary

Personal **static** site: Astro-first, content-focused, SEO-friendly, minimal client JS.

| Area | Source |
|------|--------|
| Home, about, resume | Mostly static sections + `src/config` + `src/lib/i18n/dictionaries` |
| Blog listing & posts | Contentful (`blogPost`, per locale) |
| Interactivity | React islands only when needed |
| Languages | `pl` (default), `en` — translated public URLs |

**Not** a React SPA. Default to `.astro`; use React in `src/components/islands/` only for real client behavior.

## Folder contract

```txt
src/
├─ pages/              # Thin routes only
├─ layouts/            # Page shells (no remote fetching)
├─ components/
│  ├─ pages/           # Page composers (locale + sections)
│  ├─ ui/
│  ├─ layout/
│  ├─ sections/{home,resume,about}/
│  ├─ blog/
│  └─ islands/         # React, client:* when needed
├─ config/             # site, social, about-content, resume-content
├─ lib/
│  ├─ i18n/            # routes, urls, dictionaries, locales
│  ├─ contentful/      # SDK, rich-text-renderer
│  ├─ seo.ts
│  ├─ dates.ts
│  ├─ slugs.ts
│  └─ urls.ts          # absolute URLs only (not localized paths)
├─ styles/             # global.css (@theme), typography.css
├─ assets/             # Processed by Astro
└─ scripts/            # Maintenance (e.g. content:check)

public/
├─ favicon.svg
├─ robots.txt
├─ og/                 # Default OG images
└─ files/              # CV PDFs, downloads

docker/                # Dockerfile, nginx
```

## Import alias

Always prefer `@/` over deep relatives:

```ts
import Header from "@/components/layout/Header.astro";
import { siteConfig } from "@/config/site";
```

## Rules by layer

### `src/pages` — thin routes (one file per localized public URL)

**May:** set `locale`, delegate to `@/components/pages/*`, `getStaticPaths()` with locale-aware queries.

**Must not:** large UI, Contentful SDK, hardcoded localized paths, duplicated SEO.

```astro
---
import ResumePage from "@/components/pages/ResumePage.astro";
---

<ResumePage locale="pl" />
```

```astro
---
import BlogPostPage from "@/components/pages/BlogPostPage.astro";
import { getAllBlogPosts } from "@/lib/contentful/queries";

export async function getStaticPaths() {
  const posts = await getAllBlogPosts("pl");
  return posts.map((post) => ({ params: { slug: post.slug }, props: { post } }));
}
---

<BlogPostPage post={Astro.props.post} />
```

### `src/lib/i18n`

| File | Role |
|------|------|
| `routes.ts` | Logical keys → localized paths (`home`, `resume`, `blogIndex`, …) |
| `urls.ts` | `getLocalizedRoute`, `getAlternateRoutes`, `getLocaleFromPathname`, … |
| `dictionaries.ts` | UI strings — never hardcode nav labels in components |
| `locales.ts` | `pl` / `en`, default locale, Contentful locale map |

**Route examples (do not hardcode elsewhere):**

| Key | `pl` | `en` |
|-----|------|------|
| `home` | `/` | `/en` |
| `about` | `/o-mnie` | `/about` |
| `resume` | `/cyfrowe-cv` | `/digital-resume` |
| `blogIndex` | `/blog` | `/articles` |

Blog posts: `/blog/{slug}` (pl), `/articles/{slug}` (en) — localized slugs from Contentful per locale.

Internal links: `getLocalizedRoute("resume", locale)` — never `/digital-resume` in components.

Language switcher: `getLocalizedRoute` / `alternatePaths` — never string-replace paths.

### `src/components`

| Folder | Purpose |
|--------|---------|
| `ui/` | Generic UI (Button, Card, Container, Prose) — props only, no Contentful |
| `pages/` | Compose layouts + sections; receive `locale`; may fetch via queries in composer only through thin pages |
| `layout/` | Header, Footer, Nav, LanguageSwitcher — use `dictionaries` + `getLocalizedRoute` |
| `sections/{home,resume,about}/` | Page sections — `locale` prop + dictionary strings |
| `blog/` | Blog UI — typed `BlogPost`, no SDK |
| `islands/` | React + hydration only when interactive |

### `src/layouts`

| File | Use |
|------|-----|
| `BaseLayout.astro` | `<html>`, head, global CSS, header/footer, base SEO |
| `PageLayout.astro` | Home, about, marketing pages |
| `BlogLayout.astro` | Single blog post |
| `ResumeLayout.astro` | Digital resume |

Layouts compose components; **no** Contentful calls. SEO via props + `@/lib/seo`.

### `src/lib/contentful`

| File | Role |
|------|------|
| `client.ts` | Contentful client (server env only) |
| `queries.ts` | `getAllBlogPosts(locale)`, `getBlogPostBySlug(slug, locale)`, `getBlogPostAlternatePaths` |
| `mappers.ts` | Raw entries → internal types |
| `types.ts` | `BlogPost`, raw entry types |

**Env (server, never `PUBLIC_`):**

```txt
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=   # optional; dev preview API
```

**Contentful model:** content type `blogPost` with `title`, `slug`, `description`, `publishedAt`, `updatedAt` (optional), `tags`, `content` (Rich text), `coverImage` (Asset).

### `src/config`

- `site.ts` — name, `PUBLIC_SITE_URL` (env), description, author, default OG
- `social.ts` — profile links
- `about-content.ts` / `resume-content.ts` — localized static copy (not inline in sections)

Nav labels live in `src/lib/i18n/dictionaries.ts`. Nav URLs via `getLocalizedRoute`.

### `src/lib` utilities

Pure helpers: `seo.ts`, `dates.ts` (`formatDate(iso, locale)`), `slugs.ts`, `urls.ts` — no UI, no Contentful.

Blog rich text: `src/lib/contentful/rich-text-renderer.ts` — explicit Contentful HTML options + light sanitization. Do not call `documentToHtmlString` from components.

### Styling

- `global.css` — `@import "tailwindcss"`, `@theme` (ink/gold palette, typography scale, utilities)
- `typography.css` — `.prose`, `.eyebrow`

Design tokens live in `@theme` inside `global.css` (not scattered). Reuse utilities: `page-shell`, `section-gap`, `btn-gold`, `card-glass`, `text-gradient-gold`, etc.

No random global CSS in components. Tailwind v4 via `@tailwindcss/vite`.

## Data flow

```txt
Contentful SDK → queries.ts → mappers.ts → pages → layouts → components
```

Never: `Component → Contentful SDK → render raw entry`.

## React

Use only for: theme toggle, mobile nav state, search/filter, widgets.

Do **not** use for: static cards, headings, sections, blog body, layouts, plain links.

## SEO

Centralize in `@/lib/seo`. Each localized page supplies:

- `locale`, localized `title` / `description`
- `canonical` for **this** language only (parallel translations, not cross-canonical)
- `alternatePaths` for `hreflang` (`pl`, `en`, `x-default` → default locale)

`BaseLayout` sets `<html lang>` and renders canonical + alternates.

Set `PUBLIC_SITE_URL` in `.env` before deploy. Sitemap via `@astrojs/sitemap`; `src/pages/robots.txt.ts` points at `/sitemap-index.xml`.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm run build` | `astro check && astro build` |
| `npm run check` | Typecheck |
| `npm run content:check` | Verify Contentful connectivity |

Production Docker build needs valid `CONTENTFUL_*` in `.env.prod` (static prerender at build time).

**Docker runtime:** `HOST_BIND` and `PORT` in `.env.prod` publish the container for the VPS reverse proxy. Default `127.0.0.1:3660`. Container nginx listens on `PORT` via `docker/nginx.conf.template`.

## Deploy

```bash
cp .env.prod.example .env.prod   # PUBLIC_SITE_URL, HOST_BIND, PORT, CONTENTFUL_*
docker --context mikrus compose --env-file .env.prod up -d
```

## Anti-patterns

- Dumping everything in `src/components`
- `features/` folder SPA-style layout
- Fetching Contentful in UI components
- `PUBLIC_` secret env vars
- Fat pages with inline UI + SDK
- React for static markup
- Abstractions before they are needed

## Definition of done

- [ ] Matches folder contract above
- [ ] Pages thin; Contentful only under `src/lib/contentful`
- [ ] `astro check` and `astro build` pass (with valid env for production build)
- [ ] No secrets on client
- [ ] `@/` imports used
- [ ] `AGENTS.md` updated if architecture changes
