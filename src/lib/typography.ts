import type { Locale } from '@/lib/i18n/locales';

const NBSP = '\u00A0';

const BOUNDARY = String.raw`(?:^|[\s(,;:\[]|„|[–—-])`;

const SINGLE_LETTER_WORD = new RegExp(
	`(?<=${BOUNDARY})([A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]) (?=[\\p{L}„"(])`,
	'gu',
);

const TWO_LETTER_PREPOSITION = new RegExp(
	`(?<=${BOUNDARY})(do|na|od|po|za|ze|ku|we) (?=[\\p{L}„"(])`,
	'giu',
);

const THREE_LETTER_PREPOSITION = new RegExp(
	`(?<=${BOUNDARY})(dla|bez|nad|pod) (?=[\\p{L}„"(])`,
	'giu',
);

const ABBREVIATION = /\b(np\.|itd\.|itp\.|prof\.|nr|dr) (?=[\p{L}])/giu;

const FIXED_PHRASES: Array<[RegExp, string]> = [
	[/\bCyfrowe CV\b/g, `Cyfrowe${NBSP}CV`],
	[/\bcoś istnieje\b/g, `coś${NBSP}istnieje`],
];

/** Inserts non-breaking spaces per common Polish typography rules. */
export function polishNbsp(text: string): string {
	let result = text;

	result = result.replace(SINGLE_LETTER_WORD, `$1${NBSP}`);
	result = result.replace(TWO_LETTER_PREPOSITION, `$1${NBSP}`);
	result = result.replace(THREE_LETTER_PREPOSITION, `$1${NBSP}`);
	result = result.replace(ABBREVIATION, `$1${NBSP}`);

	for (const [pattern, replacement] of FIXED_PHRASES) {
		result = result.replace(pattern, replacement);
	}

	return result;
}

export function polishCopy(text: string, locale: Locale): string {
	return locale === 'pl' ? polishNbsp(text) : text;
}

export function applyPolishTypography<T>(value: T): T {
	if (typeof value === 'string') {
		return polishNbsp(value) as T;
	}

	if (typeof value === 'function') {
		const fn = value as (...args: unknown[]) => unknown;

		return ((...args: unknown[]) => {
			const result = fn(...args);
			return typeof result === 'string' ? polishNbsp(result) : result;
		}) as T;
	}

	if (Array.isArray(value)) {
		return value.map((item) => applyPolishTypography(item)) as T;
	}

	if (value !== null && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [key, applyPolishTypography(item)]),
		) as T;
	}

	return value;
}
