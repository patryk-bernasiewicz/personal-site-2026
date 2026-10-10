export const routes = {
	home: {
		pl: '/',
		en: '/en',
	},
	resume: {
		pl: '/cyfrowe-cv',
		en: '/digital-resume',
	},
	blogIndex: {
		pl: '/blog',
		en: '/articles',
	},
	blogPostBase: {
		pl: '/blog',
		en: '/articles',
	},
} as const;

export type RouteKey = keyof typeof routes;

export type StaticRouteKey = Exclude<RouteKey, 'blogPostBase'>;

/** RSS feed per locale (not a page, so not part of `routes`). */
export const feedPaths = {
	pl: '/rss.xml',
	en: '/en/rss.xml',
} as const;
