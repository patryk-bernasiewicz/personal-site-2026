export const locales = ['pl', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pl';

/** Contentful locale codes — adjust to match your space settings. */
export const contentfulLocaleMap: Record<Locale, string> = {
	pl: 'pl',
	en: 'en-US',
};

export function toContentfulLocale(locale: Locale): string {
	return contentfulLocaleMap[locale];
}

export function isLocale(value: string): value is Locale {
	return locales.includes(value as Locale);
}
