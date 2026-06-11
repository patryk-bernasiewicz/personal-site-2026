import { defaultLocale, isLocale, locales, type Locale } from '@/lib/i18n/locales';
import { routes, type RouteKey, type StaticRouteKey } from '@/lib/i18n/routes';

function normalizePathname(pathname: string): string {
	if (!pathname || pathname === '/') {
		return '/';
	}

	return pathname.replace(/\/+$/, '') || '/';
}

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

export function getLocaleFromPathname(pathname: string): Locale {
	const normalized = normalizePathname(pathname);

	for (const locale of locales) {
		const base = routes.blogPostBase[locale];
		if (normalized.startsWith(`${base}/`) && normalized !== base) {
			return locale;
		}
	}

	for (const routeKey of Object.keys(routes) as RouteKey[]) {
		for (const locale of locales) {
			if (routes[routeKey][locale] === normalized) {
				return locale;
			}
		}
	}

	return defaultLocale;
}

export function getRouteKeyFromPathname(pathname: string): RouteKey | 'blogPost' | null {
	const normalized = normalizePathname(pathname);

	for (const locale of locales) {
		const base = routes.blogPostBase[locale];
		if (normalized.startsWith(`${base}/`) && normalized !== base) {
			return 'blogPost';
		}
	}

	for (const routeKey of Object.keys(routes) as RouteKey[]) {
		for (const locale of locales) {
			if (routes[routeKey][locale] === normalized) {
				return routeKey === 'blogPostBase' ? 'blogIndex' : routeKey;
			}
		}
	}

	return null;
}

export function getBlogPostSlugFromPathname(pathname: string, locale: Locale): string | null {
	const normalized = normalizePathname(pathname);
	const base = routes.blogPostBase[locale];

	if (!normalized.startsWith(`${base}/`) || normalized === base) {
		return null;
	}

	return normalized.slice(base.length + 1) || null;
}

export function parseLocaleParam(value: string | undefined): Locale {
	return value && isLocale(value) ? value : defaultLocale;
}
