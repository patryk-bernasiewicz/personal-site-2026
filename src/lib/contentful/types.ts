import type { EntryFieldTypes } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import type { Locale } from '@/lib/i18n/locales';

export type ContentfulBlogPostEntry = {
	contentTypeId: 'blogPost';
	fields: {
		title: EntryFieldTypes.Text;
		slug: EntryFieldTypes.Text;
		excerpt: EntryFieldTypes.Text;
		body: EntryFieldTypes.RichText;
		coverImage?: unknown;
		tag?: unknown;
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
		caption?: string;
	};
};
