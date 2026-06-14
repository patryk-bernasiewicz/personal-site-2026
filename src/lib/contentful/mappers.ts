import type { Document } from '@contentful/rich-text-types';
import type { Asset, Entry } from 'contentful';
import type { Locale } from '@/lib/i18n/locales';
import type { BlogPost, ContentfulBlogPostEntry } from '@/lib/contentful/types';

function asString(value: unknown, fallback = ''): string {
	return typeof value === 'string' ? value : fallback;
}

function asOptionalString(value: unknown): string | undefined {
	return typeof value === 'string' ? value : undefined;
}

function asStringArray(value: unknown): string[] {
	return Array.isArray(value)
		? value.filter((item): item is string => typeof item === 'string')
		: [];
}

function asArray(value: unknown): unknown[] {
	return Array.isArray(value) ? value : [];
}

function asDocument(value: unknown): Document {
	return value as Document;
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

function isResolvedAsset(asset: unknown): asset is Asset {
	return (
		typeof asset === 'object' &&
		asset !== null &&
		'sys' in asset &&
		'fields' in asset &&
		(asset as Asset).sys.type === 'Asset'
	);
}

function mapCoverImage(
	entry: Entry<ContentfulBlogPostEntry>,
): BlogPost['coverImage'] | undefined {
	const asset = asArray(entry.fields.coverImage).find(isResolvedAsset);
	if (!isResolvedAsset(asset) || !asset.fields?.file?.url) {
		return undefined;
	}

	const fileUrl = asString(asset.fields.file.url);
	if (!fileUrl) {
		return undefined;
	}

	return {
		src: fileUrl.startsWith('//') ? `https:${fileUrl}` : fileUrl,
		alt: asString(
			asset.fields.title,
			asString(entry.fields.title, 'Cover image'),
		),
		caption: asOptionalString(asset.fields.description),
	};
}

export function mapBlogPostEntry(
	entry: Entry<ContentfulBlogPostEntry>,
	locale: Locale,
): BlogPost {
	const { fields } = entry;

	return {
		entryId: entry.sys.id,
		locale,
		title: asString(fields.title),
		slug: asString(fields.slug),
		description: asString(fields.excerpt),
		publishedAt: entry.sys.createdAt,
		updatedAt: entry.sys.updatedAt,
		tags: asStringArray(asArray(fields.tag).map(asEntryTitle)),
		content: asDocument(fields.body),
		coverImage: mapCoverImage(entry),
	};
}
