import { siteConfig } from '@/config/site';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/locales';
import { absoluteUrl } from '@/lib/urls';

export type PageMetadata = {
	title: string;
	description: string;
	locale: Locale;
	canonical?: string;
	ogImage?: string;
	noIndex?: boolean;
	alternatePaths?: Partial<Record<Locale, string>>;
};

export function buildPageMetadata(
	overrides: Partial<PageMetadata> & Pick<PageMetadata, 'title' | 'locale'>,
): PageMetadata {
	return {
		title: overrides.title,
		description: overrides.description ?? siteConfig.description,
		locale: overrides.locale,
		canonical: overrides.canonical,
		ogImage: overrides.ogImage ?? siteConfig.defaultOgImage,
		noIndex: overrides.noIndex,
		alternatePaths: overrides.alternatePaths,
	};
}

export function formatDocumentTitle(title: string): string {
	if (title === siteConfig.name) {
		return siteConfig.name;
	}

	return `${title} · ${siteConfig.name}`;
}

export function getOpenGraphTags(metadata: PageMetadata) {
	const ogImage = metadata.ogImage
		? absoluteUrl(metadata.ogImage)
		: absoluteUrl(siteConfig.defaultOgImage);

	return {
		title: formatDocumentTitle(metadata.title),
		description: metadata.description,
		url: metadata.canonical ? absoluteUrl(metadata.canonical) : siteConfig.url,
		image: ogImage,
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
