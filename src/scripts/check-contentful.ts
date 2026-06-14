import 'dotenv/config';
import { createClient } from 'contentful';

const enabled = process.env.CONTENTFUL_ENABLED === 'true';
const hasCredentials = Boolean(
	process.env.CONTENTFUL_SPACE_ID &&
		(process.env.CONTENTFUL_DELIVERY_TOKEN || process.env.CONTENTFUL_PREVIEW_TOKEN),
);

if (!enabled && !hasCredentials) {
	console.log(
		'Contentful integration disabled. Add Contentful credentials or set CONTENTFUL_ENABLED=true.',
	);
	process.exit(0);
}

const space = process.env.CONTENTFUL_SPACE_ID;
const isDev = process.env.NODE_ENV !== 'production';
const token = isDev
	? (process.env.CONTENTFUL_PREVIEW_TOKEN ?? process.env.CONTENTFUL_DELIVERY_TOKEN)
	: process.env.CONTENTFUL_DELIVERY_TOKEN;

if (!space || !token) {
	console.error('Missing CONTENTFUL_SPACE_ID or Contentful access token in environment.');
	process.exit(1);
}

const client = createClient({
	space,
	accessToken: token,
	host: isDev ? 'preview.contentful.com' : 'cdn.contentful.com',
});

try {
	const response = await client.getEntries({
		content_type: 'blogPost',
		limit: 1,
	});

	console.log(`Contentful OK - blogPost content type reachable (${response.total} total).`);
} catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`Contentful check failed: ${message}`);
	process.exit(1);
}
