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
	return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function asDocument(value: unknown): Document {
	return value as Document;
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

function mapCoverImage(entry: Entry<ContentfulBlogPostEntry>): BlogPost['coverImage'] | undefined {
	const asset = entry.fields.coverImage;
	if (!isResolvedAsset(asset) || !asset.fields?.file?.url) {
		return undefined;
	}

	const fileUrl = asString(asset.fields.file.url);
	if (!fileUrl) {
		return undefined;
	}

	return {
		src: fileUrl.startsWith('//') ? `https:${fileUrl}` : fileUrl,
		alt: asString(asset.fields.title, asString(entry.fields.title, 'Cover image')),
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
		description: asString(fields.description),
		publishedAt: asString(fields.publishedAt),
		updatedAt: asOptionalString(fields.updatedAt),
		tags: asStringArray(fields.tags),
		content: asDocument(fields.content),
		coverImage: mapCoverImage(entry),
	};
}
