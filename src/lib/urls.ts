import { siteConfig } from '@/config/site';

export function absoluteUrl(path: string): string {
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path;
	}

	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return new URL(normalizedPath, siteConfig.url).toString();
}

