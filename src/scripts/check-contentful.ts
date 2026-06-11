import 'dotenv/config';
import { createClient } from 'contentful';

const enabled = process.env.CONTENTFUL_ENABLED === 'true';

if (!enabled) {
	console.log('Contentful integration disabled (CONTENTFUL_ENABLED is not true). Skipping check.');
	process.exit(0);
}

const space = process.env.CONTENTFUL_SPACE_ID;
const token = process.env.CONTENTFUL_DELIVERY_TOKEN;

if (!space || !token) {
	console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_TOKEN in environment.');
	process.exit(1);
}

const client = createClient({
	space,
	accessToken: token,
});

const response = await client.getEntries({
	content_type: 'blogPost',
	limit: 1,
});

console.log(`Contentful OK — blogPost content type reachable (${response.total} total).`);
