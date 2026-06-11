import { createClient } from 'contentful';
import {
	CONTENTFUL_DELIVERY_TOKEN,
	CONTENTFUL_PREVIEW_TOKEN,
	CONTENTFUL_SPACE_ID,
} from 'astro:env/server';
import { isContentfulEnabled } from '@/lib/contentful/config';

function createContentfulClient() {
	if (!isContentfulEnabled()) {
		throw new Error('Contentful integration is disabled.');
	}

	if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_DELIVERY_TOKEN) {
		throw new Error(
			'Contentful is enabled but CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_TOKEN is missing.',
		);
	}

	const isDev = import.meta.env.DEV;
	const accessToken = isDev
		? (CONTENTFUL_PREVIEW_TOKEN ?? CONTENTFUL_DELIVERY_TOKEN)
		: CONTENTFUL_DELIVERY_TOKEN;

	return createClient({
		space: CONTENTFUL_SPACE_ID,
		accessToken,
		host: isDev ? 'preview.contentful.com' : 'cdn.contentful.com',
	});
}

export const contentfulClient = createContentfulClient();
