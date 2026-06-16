const DEV_SITE_URL = 'http://localhost:4321';

function stripTrailingSlash(url: string): string {
	return url.replace(/\/+$/, '');
}

export function getSiteUrl(): string {
	const configuredUrl = import.meta.env.PUBLIC_SITE_URL;
	const siteUrl = configuredUrl?.trim() ? configuredUrl : DEV_SITE_URL;

	return stripTrailingSlash(siteUrl);
}

export function absoluteUrl(path: string): string {
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path;
	}

	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return new URL(normalizedPath, `${getSiteUrl()}/`).toString();
}
