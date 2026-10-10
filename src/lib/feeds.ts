import rss from '@astrojs/rss';
import { siteConfig } from '@/config/site';
import { getAllBlogPosts } from '@/lib/contentful/queries';
import { getDictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/locales';
import { getLocalizedBlogPostUrl } from '@/lib/i18n/urls';

/** RSS 2.0 feed of the blog posts for one locale. */
export async function buildBlogFeed(locale: Locale): Promise<Response> {
	const dictionary = getDictionary(locale);
	const posts = await getAllBlogPosts(locale);

	return rss({
		title: dictionary.meta.blogIndex.title,
		description: dictionary.meta.blogIndex.description,
		site: siteConfig.url,
		customData: `<language>${locale}</language>`,
		items: posts
			.filter((post) => !post.noIndex)
			.map((post) => ({
				title: post.title,
				description: post.description,
				link: post.canonicalUrl ?? getLocalizedBlogPostUrl(post.slug, locale),
				pubDate: new Date(post.publishedAt),
				categories: post.tags,
			})),
	});
}
