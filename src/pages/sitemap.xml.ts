import type { APIRoute } from 'astro';
import { getAllBlogPosts } from '@/lib/contentful/queries';
import { locales } from '@/lib/i18n/locales';
import { routes } from '@/lib/i18n/routes';
import { getLocalizedBlogPostUrl } from '@/lib/i18n/urls';
import { absoluteUrl } from '@/lib/urls';

type SitemapEntry = {
	path: string;
	lastmod?: string;
};

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function renderUrl(entry: SitemapEntry): string {
	const loc = escapeXml(absoluteUrl(entry.path));
	const lastmod = entry.lastmod
		? `\n    <lastmod>${escapeXml(entry.lastmod.slice(0, 10))}</lastmod>`
		: '';

	return `  <url>\n    <loc>${loc}</loc>${lastmod}\n  </url>`;
}

export const GET: APIRoute = async () => {
	const staticEntries: SitemapEntry[] = [
		{ path: routes.home.pl },
		{ path: routes.home.en },
		{ path: routes.resume.pl },
		{ path: routes.resume.en },
		{ path: routes.about.pl },
		{ path: routes.about.en },
		{ path: routes.blogIndex.pl },
		{ path: routes.blogIndex.en },
	];
	const blogEntries = (
		await Promise.all(
			locales.map(async (locale) => {
				const posts = await getAllBlogPosts(locale);

				return posts
					.filter((post) => !post.noIndex)
					.map((post) => ({
						path: post.canonicalUrl ?? getLocalizedBlogPostUrl(post.slug, locale),
						lastmod: post.updatedAt ?? post.publishedAt,
					}));
			}),
		)
	).flat();
	const entries = [...staticEntries, ...blogEntries];
	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		entries.map(renderUrl).join('\n'),
		'</urlset>',
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
