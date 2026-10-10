import type { Locale } from '@/lib/i18n/locales';
import { applyPolishTypography } from '@/lib/typography';

export type HomeContent = {
	/** One sentence under the name. */
	lead: string;
	/** Short first-person bio; replaces the former about page. */
	paragraphs: readonly string[];
	photoAlt: string;
};

const homeContentByLocale = {
	pl: {
		lead: 'Frontend developer. Od 2017 roku buduję i naprawiam aplikacje webowe, od kilku lat głównie w React i Next.js.',
		paragraphs: [
			'Obecnie pracuję w Japan Tobacco International nad stronami Ploom, które działają na ponad 30 rynkach. Na co dzień to komponenty w React i Next.js, treści z AEM i Builder.io oraz sporo debugowania w miejscach, gdzie jedno spotyka się z drugim.',
			'Wcześniej przenosiłem platformę do zdalnego sterowania robotami na Next.js (przy okazji podpiąłem sterowanie dronem pod pada przez Gamepad API), budowałem moduł analityczny w NapoleonCat i formularze kampanii w backoffisie platformy gamingowej. Zaczynałem od PHP i Ruby on Rails.',
			'Po godzinach piszę na blogu, rozwijam egryzonie, aplikację pro publico bono, i małe narzędzia, na których uczę się backendu i wdrożeń: Redis, kolejki w BullMQ, Docker na własnym VPS-ie, Cloudflare.',
		],
		photoAlt: 'Patryk Bernasiewicz',
	},
	en: {
		lead: "Frontend developer. I've been building and fixing web apps since 2017, mostly in React and Next.js for the last few years.",
		paragraphs: [
			'I currently work at Japan Tobacco International on the Ploom websites, which run in more than 30 markets. Day to day that means React and Next.js components, content from AEM and Builder.io, and a fair amount of debugging wherever the two meet.',
			'Before that I moved a remote robot-control platform to Next.js (and along the way hooked drone control up to a gamepad through the Gamepad API), built the analytics module at NapoleonCat, and worked on campaign forms in the back office of a gaming platform. I started out with PHP and Ruby on Rails.',
			'After hours I write on this blog and work on egryzonie, a pro bono app, plus small tools that I use to learn backend and deployment: Redis, BullMQ queues, Docker on my own VPS, Cloudflare.',
		],
		photoAlt: 'Patryk Bernasiewicz',
	},
} as const satisfies Record<Locale, HomeContent>;

const localizedHomeContent = {
	pl: applyPolishTypography(homeContentByLocale.pl),
	en: homeContentByLocale.en,
} as const satisfies Record<Locale, HomeContent>;

export function getHomeContent(locale: Locale): HomeContent {
	return localizedHomeContent[locale];
}
