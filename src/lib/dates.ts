import type { Locale } from '@/lib/i18n/locales';

const intlLocaleBySiteLocale: Record<Locale, string> = {
	pl: 'pl-PL',
	en: 'en-US',
};

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getDateFormatter(locale: Locale): Intl.DateTimeFormat {
	const intlLocale = intlLocaleBySiteLocale[locale];

	if (!formatterCache.has(intlLocale)) {
		formatterCache.set(
			intlLocale,
			new Intl.DateTimeFormat(intlLocale, {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
		);
	}

	return formatterCache.get(intlLocale)!;
}

export function formatDate(isoDate: string, locale: Locale): string {
	return getDateFormatter(locale).format(new Date(isoDate));
}
