import { SITE_URL } from 'astro:env/client';

export const siteConfig = {
	name: 'Personal Site',
	/** Canonical site origin — set `SITE_URL` in `.env` before deploy. */
	url: SITE_URL,
	description: 'Personal website, digital resume, and blog.',
	author: {
		name: 'Patryk',
		email: 'patryk.bernasiewicz@gmail.com',
	},
	defaultOgImage: '/og/default.png',
} as const;
