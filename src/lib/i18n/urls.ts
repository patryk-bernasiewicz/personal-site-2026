import type { Locale } from '@/lib/i18n/locales';
import { routes, type StaticRouteKey } from '@/lib/i18n/routes';

export function getLocalizedRoute(routeKey: StaticRouteKey, locale: Locale): string {
	return routes[routeKey][locale];
}

export function getAlternateRoutes(routeKey: StaticRouteKey): Record<Locale, string> {
	return { ...routes[routeKey] };
}

export function getLocalizedBlogPostUrl(slug: string, locale: Locale): string {
	const base = routes.blogPostBase[locale];
	return `${base}/${slug}`;
}
