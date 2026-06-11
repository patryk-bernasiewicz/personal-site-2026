import type { EntryFieldTypes } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import type { Locale } from '@/lib/i18n/locales';

export type ContentfulBlogPostEntry = {
	contentTypeId: 'blogPost';
	fields: {
		title: EntryFieldTypes.Text;
		slug: EntryFieldTypes.Text;
		description: EntryFieldTypes.Text;
		publishedAt: EntryFieldTypes.Date;
		updatedAt?: EntryFieldTypes.Date;
		tags?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
		content: EntryFieldTypes.RichText;
		coverImage?: EntryFieldTypes.AssetLink;
	};
};

export type BlogPost = {
	entryId: string;
	locale: Locale;
	title: string;
	slug: string;
	description: string;
	publishedAt: string;
	updatedAt?: string;
	tags: string[];
	content: Document;
	coverImage?: {
		src: string;
		alt: string;
	};
};
