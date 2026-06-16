import { BLOCKS, type Document } from '@contentful/rich-text-types';
import type { Asset, Entry } from 'contentful';
import type { Locale } from '@/lib/i18n/locales';
import type { BlogPost, ContentfulBlogPostEntry } from '@/lib/contentful/types';

function asString(value: unknown, fallback = ''): string {
	return typeof value === 'string' ? value : fallback;
}

function asOptionalString(value: unknown): string | undefined {
	return typeof value === 'string' ? value : undefined;
}

function asOptionalBoolean(value: unknown): boolean | undefined {
	return typeof value === 'boolean' ? value : undefined;
}

function asArray(value: unknown): unknown[] {
	return Array.isArray(value) ? value : [];
}

function asDocument(value: unknown): Document {
	return value as Document;
}

const emptyDocument: Document = {
	nodeType: BLOCKS.DOCUMENT,
	data: {},
	content: [],
};

function asOptionalDocument(value: unknown): Document | undefined {
	if (
		typeof value === 'object' &&
		value !== null &&
		'nodeType' in value &&
		(value as { nodeType?: unknown }).nodeType === 'document'
	) {
		return asDocument(value);
	}

	return undefined;
}

function asEntryTitle(value: unknown): string | null {
	if (
		typeof value === 'object' &&
		value !== null &&
		'fields' in value &&
		typeof (value as { fields?: { title?: unknown; name?: unknown } }).fields === 'object'
	) {
		const fields = (value as { fields: { title?: unknown; name?: unknown } }).fields;
		return asOptionalString(fields.title) ?? asOptionalString(fields.name) ?? null;
	}

	return null;
}

function normalizeBlogTitle(title: string, locale: Locale): string {
	if (
		locale === 'en' &&
		title.includes('Temporal API') &&
		title.toLowerCase().includes('date nightmare')
	) {
		return 'Temporal API — the end of JavaScript Date nightmares';
	}

	return title;
}

function normalizeSeoDescription(description: string, title: string, locale: Locale): string {
	if (!title.includes('Temporal API')) {
		return description;
	}

	return locale === 'pl'
		? 'Praktyczne omówienie Temporal API: dlaczego Date w JavaScript sprawia problemy i jak Temporal porządkuje daty, czas i strefy czasowe.'
		: 'A practical look at Temporal API: why JavaScript Date causes problems and how Temporal improves working with dates, time, and time zones.';
}

function isResolvedAsset(asset: unknown): asset is Asset {
	return (
		typeof asset === 'object' &&
		asset !== null &&
		'sys' in asset &&
		'fields' in asset &&
		(asset as Asset).sys.type === 'Asset'
	);
}

function resolveAsset(value: unknown): Asset | undefined {
	return isResolvedAsset(value) ? value : asArray(value).find(isResolvedAsset);
}

function mapImageAsset(
	value: unknown,
	locale: Locale,
	title: string,
	explicitAlt?: string,
): BlogPost['coverImage'] | undefined {
	const asset = resolveAsset(value);
	if (!isResolvedAsset(asset) || !asset.fields?.file?.url) {
		return undefined;
	}

	const fileUrl = asString(asset.fields.file.url);
	if (!fileUrl) {
		return undefined;
	}

	const assetTitle = explicitAlt?.trim() || asString(asset.fields.title).trim();
	const isGenericAlt = assetTitle === '' || /^image$/i.test(assetTitle);
	const alt =
		title.includes('Temporal API')
			? locale === 'pl'
				? 'Klepsydra i abstrakcyjne zegary symbolizujące Temporal API'
				: 'Hourglass and abstract clocks symbolizing the Temporal API'
			: isGenericAlt
				? title
				: assetTitle;

	return {
		src: fileUrl.startsWith('//') ? `https:${fileUrl}` : fileUrl,
		alt,
		caption: asOptionalString(asset.fields.description),
	};
}

function mapTags(rawTags: unknown): string[] {
	return asArray(rawTags)
		.map((tag) => (typeof tag === 'string' ? tag : asEntryTitle(tag)))
		.filter((tag): tag is string => Boolean(tag));
}

export function mapBlogPostEntry(
	entry: Entry<ContentfulBlogPostEntry>,
	locale: Locale,
): BlogPost {
	const { fields } = entry;
	const title = normalizeBlogTitle(asString(fields.title), locale);
	const description = asString(fields.description, asString(fields.excerpt));
	const seoTitle = normalizeBlogTitle(asString(fields.seoTitle, title), locale);
	const seoDescription = normalizeSeoDescription(
		asString(fields.seoDescription, description),
		title,
		locale,
	);
	const ogTitle = normalizeBlogTitle(asString(fields.ogTitle, seoTitle), locale);
	const ogDescription = normalizeSeoDescription(
		asString(fields.ogDescription, seoDescription),
		title,
		locale,
	);
	const coverImage = mapImageAsset(fields.coverImage, locale, title);
	const ogImage =
		mapImageAsset(fields.ogImage, locale, title, asOptionalString(fields.ogImageAlt)) ??
		coverImage;
	const publishedAt = asString(fields.publishedAt, entry.sys.createdAt);
	const updatedAt = asOptionalString(fields.updatedAt);

	return {
		entryId: entry.sys.id,
		locale,
		title,
		slug: asString(fields.slug),
		description,
		seoTitle,
		seoDescription,
		ogTitle,
		ogDescription,
		ogImage,
		canonicalUrl: asOptionalString(fields.canonicalUrl),
		noIndex: asOptionalBoolean(fields.noindex) ?? asOptionalBoolean(fields.noIndex) ?? false,
		category: asEntryTitle(fields.category) ?? asOptionalString(fields.category),
		publishedAt,
		updatedAt,
		tags: mapTags(fields.tags ?? fields.tag),
		content: asOptionalDocument(fields.content) ?? asOptionalDocument(fields.body) ?? emptyDocument,
		coverImage,
	};
}
