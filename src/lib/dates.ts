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

/** Year-month in `YYYY-MM` format. */
export type YearMonth = `${number}-${number}`;

const presentLabel: Record<Locale, string> = {
	pl: 'obecnie',
	en: 'present',
};

const durationUnits: Record<Locale, Record<'year' | 'month', Partial<Record<Intl.LDMLPluralRule, string>>>> = {
	pl: {
		year: { one: 'rok', few: 'lata', many: 'lat', other: 'roku' },
		month: { one: 'miesiąc', few: 'miesiące', many: 'miesięcy', other: 'miesiąca' },
	},
	en: {
		year: { one: 'year', other: 'years' },
		month: { one: 'month', other: 'months' },
	},
};

function parseYearMonth(value: YearMonth): { year: number; month: number } {
	const [year, month] = value.split('-').map(Number);
	return { year, month };
}

function currentYearMonth(): YearMonth {
	const now = new Date();
	return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

/** `08.2025 — 03.2026` / `08.2025 — obecnie`. A `null` end means the role is ongoing. */
export function formatMonthPeriod(start: YearMonth, end: YearMonth | null, locale: Locale): string {
	const format = (value: YearMonth) => {
		const { year, month } = parseYearMonth(value);
		return `${String(month).padStart(2, '0')}.${year}`;
	};

	return `${format(start)} — ${end ? format(end) : presentLabel[locale]}`;
}

/**
 * Length of a role counted in whole months, both ends inclusive (`2024-11`…`2025-08` = 10 months).
 * Ongoing roles are measured up to the build date.
 */
export function formatMonthDuration(start: YearMonth, end: YearMonth | null, locale: Locale): string {
	const from = parseYearMonth(start);
	const to = parseYearMonth(end ?? currentYearMonth());
	const totalMonths = Math.max(1, (to.year - from.year) * 12 + (to.month - from.month) + 1);
	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;
	const pluralRules = new Intl.PluralRules(intlLocaleBySiteLocale[locale]);
	const unit = (count: number, kind: 'year' | 'month') => {
		const forms = durationUnits[locale][kind];
		return `${count} ${forms[pluralRules.select(count)] ?? forms.other}`;
	};

	return [years > 0 && unit(years, 'year'), months > 0 && unit(months, 'month')]
		.filter(Boolean)
		.join(' ');
}
