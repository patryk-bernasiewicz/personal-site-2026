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
	const asset = isResolvedAsset(entry.fields.coverImage)
		? entry.fields.coverImage
		: asArray(entry.fields.coverImage).find(isResolvedAsset);
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
	const publishedAt = asString(fields.publishedAt, entry.sys.createdAt);
	const updatedAt = asOptionalString(fields.updatedAt);

	return {
		entryId: entry.sys.id,
		locale,
		title: asString(fields.title),
		slug: asString(fields.slug),
		description: asString(fields.description, asString(fields.excerpt)),
		publishedAt,
		updatedAt,
		tags: mapTags(fields.tags ?? fields.tag),
		content: asOptionalDocument(fields.content) ?? asOptionalDocument(fields.body) ?? emptyDocument,
		coverImage: mapCoverImage(entry),
	};
}
