import { siteConfig } from '@/config/site';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/locales';
import { absoluteUrl } from '@/lib/urls';

export type PageMetadata = {
	title: string;
	description: string;
	locale: Locale;
	canonical?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogType?: 'website' | 'article';
	ogImage?: string;
	ogImageAlt?: string;
	noIndex?: boolean;
	alternatePaths?: Partial<Record<Locale, string>>;
	publishedTime?: string;
	modifiedTime?: string;
	tags?: string[];
	section?: string;
	jsonLd?: Record<string, unknown>;
};

export function buildPageMetadata(
	overrides: Partial<PageMetadata> & Pick<PageMetadata, 'title' | 'locale'>,
): PageMetadata {
	return {
		title: overrides.title,
		description: overrides.description ?? siteConfig.description,
		locale: overrides.locale,
		canonical: overrides.canonical,
		ogTitle: overrides.ogTitle,
		ogDescription: overrides.ogDescription,
		ogType: overrides.ogType ?? 'website',
		ogImage: overrides.ogImage ?? siteConfig.defaultOgImage,
		ogImageAlt: overrides.ogImageAlt ?? siteConfig.defaultOgImageAlt,
		noIndex: overrides.noIndex,
		alternatePaths: overrides.alternatePaths,
		publishedTime: overrides.publishedTime,
		modifiedTime: overrides.modifiedTime,
		tags: overrides.tags,
		section: overrides.section,
		jsonLd: overrides.jsonLd,
	};
}

export function formatDocumentTitle(title: string): string {
	return title;
}

export function getOgLocale(locale: Locale): string {
	return locale === 'pl' ? 'pl_PL' : 'en_US';
}

export function getOpenGraphTags(metadata: PageMetadata) {
	const ogImage = metadata.ogImage
		? absoluteUrl(metadata.ogImage)
		: absoluteUrl(siteConfig.defaultOgImage);
	const title = metadata.ogTitle ?? metadata.title;
	const description = metadata.ogDescription ?? metadata.description;

	return {
		title,
		description,
		type: metadata.ogType ?? 'website',
		url: metadata.canonical ? absoluteUrl(metadata.canonical) : siteConfig.url,
		image: ogImage,
		imageAlt: metadata.ogImageAlt ?? siteConfig.defaultOgImageAlt,
		imageWidth: 1200,
		imageHeight: 630,
		siteName: siteConfig.name,
		locale: getOgLocale(metadata.locale),
	};
}

export type HrefLangAlternate = {
	hreflang: string;
	href: string;
};

export function getHrefLangAlternates(metadata: PageMetadata): HrefLangAlternate[] {
	if (!metadata.alternatePaths) {
		return [];
	}

	const alternates: HrefLangAlternate[] = locales
		.filter((locale) => metadata.alternatePaths?.[locale])
		.map((locale) => ({
			hreflang: locale,
			href: absoluteUrl(metadata.alternatePaths![locale]!),
		}));

	const defaultPath = metadata.alternatePaths[defaultLocale];
	if (defaultPath) {
		alternates.push({
			hreflang: 'x-default',
			href: absoluteUrl(defaultPath),
		});
	}

	return alternates;
}

export function buildBlogPostingJsonLd(metadata: PageMetadata) {
	const og = getOpenGraphTags(metadata);

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: metadata.title,
		description: metadata.description,
		image: og.image,
		datePublished: metadata.publishedTime,
		dateModified: metadata.modifiedTime ?? metadata.publishedTime,
		author: {
			'@type': 'Person',
			name: siteConfig.author.name,
		},
		publisher: {
			'@type': 'Person',
			name: siteConfig.author.name,
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': og.url,
		},
	};
}
