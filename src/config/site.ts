import { getSiteUrl } from '@/lib/urls';

export const siteConfig = {
	name: 'Patryk Bernasiewicz',
	/** Canonical site origin. Set `PUBLIC_SITE_URL` in `.env` before deploy. */
	url: getSiteUrl(),
	description:
		'Frontend developer focused on React, Next.js, TypeScript, accessibility, CMS-driven platforms, and reliable web product delivery.',
	author: {
		name: 'Patryk Bernasiewicz',
		email: 'patryk.bernasiewicz@gmail.com',
	},
	defaultOgImage: '/og/default.jpg',
	defaultOgImageAlt: 'Patryk Bernasiewicz - Frontend Developer',
} as const;
