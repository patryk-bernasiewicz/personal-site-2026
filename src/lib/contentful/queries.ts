import { isContentfulEnabled } from '@/lib/contentful/config';
import { mapBlogPostEntry } from '@/lib/contentful/mappers';
import type { BlogPost, ContentfulBlogPostEntry } from '@/lib/contentful/types';
import { locales, toContentfulLocale, type Locale } from '@/lib/i18n/locales';
import { getLocalizedBlogPostUrl } from '@/lib/i18n/urls';

async function withContentfulFallback<T>(
	operation: () => Promise<T>,
	fallback: T,
): Promise<T> {
	if (!isContentfulEnabled()) {
		return fallback;
	}

	try {
		return await operation();
	} catch (error) {
		if (import.meta.env.DEV) {
			console.warn('[contentful]', error);
			return fallback;
		}

		throw error;
	}
}

function hasPublicBlogRoute(post: BlogPost): boolean {
	return Boolean(post.title.trim() && post.slug.trim());
}

export async function getAllBlogPosts(locale: Locale): Promise<BlogPost[]> {
	return withContentfulFallback(async () => {
		const { contentfulClient } = await import('@/lib/contentful/client');

		const response = await contentfulClient.getEntries<ContentfulBlogPostEntry>({
			content_type: 'blogPost',
			locale: toContentfulLocale(locale),
			include: 2,
		});

		return response.items
			.map((item) => mapBlogPostEntry(item, locale))
			.filter(hasPublicBlogRoute)
			.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
	}, []);
}

export async function getBlogPostBySlug(
	slug: string,
	locale: Locale,
): Promise<BlogPost | null> {
	return withContentfulFallback(async () => {
		const { contentfulClient } = await import('@/lib/contentful/client');

		const response = await contentfulClient.getEntries<ContentfulBlogPostEntry>({
			content_type: 'blogPost',
			locale: toContentfulLocale(locale),
			'fields.slug': slug,
			limit: 1,
			include: 2,
		});

		const entry = response.items[0];
		if (!entry) {
			return null;
		}

		const post = mapBlogPostEntry(entry, locale);
		return hasPublicBlogRoute(post) ? post : null;
	}, null);
}

export async function getLatestBlogPosts(limit: number, locale: Locale): Promise<BlogPost[]> {
	const posts = await getAllBlogPosts(locale);
	return posts.slice(0, limit);
}

export async function getBlogPostAlternatePaths(
	entryId: string,
): Promise<Partial<Record<Locale, string>>> {
	return withContentfulFallback(async () => {
		const { contentfulClient } = await import('@/lib/contentful/client');
		const paths: Partial<Record<Locale, string>> = {};

		await Promise.all(
			locales.map(async (locale) => {
				try {
					const entry = await contentfulClient.getEntry<ContentfulBlogPostEntry>(entryId, {
						locale: toContentfulLocale(locale),
					});

					const post = mapBlogPostEntry(entry, locale);
					if (hasPublicBlogRoute(post)) {
						paths[locale] = getLocalizedBlogPostUrl(post.slug, locale);
					}
				} catch {
					// Translation missing for this locale — omit from alternates.
				}
			}),
		);

		return paths;
	}, {});
}
