import { CONTENTFUL_ENABLED } from 'astro:env/server';

export function isContentfulEnabled(): boolean {
	return CONTENTFUL_ENABLED;
}
