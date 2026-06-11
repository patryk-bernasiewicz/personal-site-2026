import type { Locale } from '@/lib/i18n/locales';
import { applyPolishTypography } from '@/lib/typography';

export type AboutValue = {
	title: string;
	description: string;
};

const aboutValuesByLocale = {
	pl: [
		{
			title: 'Przejrzystość',
			description:
				'Proste systemy, czytelny kod i oczywista architektura informacji.',
		},
		{
			title: 'Wydajność',
			description: 'Statyczny HTML domyślnie, JavaScript tylko gdy jest potrzebny.',
		},
		{
			title: 'Utrzymywalność',
			description: 'Cienkie strony i logika CMS w src/lib/contentful.',
		},
	],
	en: [
		{
			title: 'Clarity',
			description: 'Simple systems, readable code, and obvious information architecture.',
		},
		{
			title: 'Performance',
			description: 'Static HTML by default, JavaScript only when interaction requires it.',
		},
		{
			title: 'Maintainability',
			description: 'Thin pages and CMS logic under src/lib/contentful.',
		},
	],
} as const satisfies Record<Locale, AboutValue[]>;

const localizedAboutValues = {
	pl: applyPolishTypography(aboutValuesByLocale.pl),
	en: aboutValuesByLocale.en,
} as const satisfies Record<Locale, AboutValue[]>;

export function getAboutValues(locale: Locale): AboutValue[] {
	return localizedAboutValues[locale];
}
