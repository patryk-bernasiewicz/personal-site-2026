import type { Locale } from '@/lib/i18n/locales';

export const routes = {
	home: {
		pl: '/',
		en: '/en',
	},
	about: {
		pl: '/o-mnie',
		en: '/about',
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

export const routeKeys = Object.keys(routes) as RouteKey[];

export function getRoutePaths(routeKey: RouteKey): Record<Locale, string> {
	return routes[routeKey];
}
