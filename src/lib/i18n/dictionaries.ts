import type { Locale } from '@/lib/i18n/locales';
import { applyPolishTypography } from '@/lib/typography';

export const dictionaries = {
	pl: {
		localeName: 'Polski',
		switchTo: 'English',
		nav: {
			home: 'Start',
			about: 'O mnie',
			resume: 'Cyfrowe CV',
			blog: 'Blog',
		},
		skipLink: 'Przejdź do treści',
		meta: {
			home: {
				title: 'Strona główna',
				description: 'Osobista strona — portfolio, cyfrowe CV i blog.',
			},
			about: {
				title: 'O mnie',
				description: 'Kim jestem i nad czym pracuję.',
			},
			resume: {
				title: 'Cyfrowe CV',
				description: 'Doświadczenie, umiejętności i pobranie CV.',
			},
			blogIndex: {
				title: 'Blog',
				description: 'Artykuły i notatki.',
			},
		},
		home: {
			eyebrow: 'Strona osobista',
			readBlog: 'Zobacz blog',
			readBlogWithCount: (count: number) => `Zobacz blog (${count} najnowszych)`,
			latestPostsTitle: 'Najnowsze wpisy',
			latestPostsDescription: 'Ostatnie publikacje z Contentful (build time).',
			scrollIndicator: {
				label: 'Nawigacja po sekcjach strony głównej',
				scrollToSectionLabel: 'Przewiń do sekcji {number}',
			},
			hero: {
				number: '01',
				eyebrow: 'Frontend Developer',
				heading: {
					line1: 'Tworzę cyfrowe',
					line2: 'produkty, które robią',
					line3: 'różnicę.',
				},
				lead: 'Tworzę szybkie, skalowalne i dostępne doświadczenia webowe, oparte na czystym kodzie i przemyślanym designie.',
				viewWork: 'Zobacz moje prace',
				letsTalk: 'Porozmawiajmy',
				followMe: 'Obserwuj',
				scroll: 'Przewiń',
			},
			aboutPreview: {
				number: '02',
				eyebrow: 'O mnie',
				heading: {
					line1: 'Najpierw sens.',
					line2: 'Potem interfejs.',
				},
				lead: 'Pracuję blisko frontendu, produktu i designu. Lubię zamieniać złożone procesy w widoki, które prowadzą użytkownika bez tłumaczenia.',
				cta: 'Więcej o mnie',
				closing:
					'Po godzinach rozwijam własne projekty internetowe — z tej samej potrzeby łączenia technologii, treści i sensownego doświadczenia.',
				values: [
					{
						icon: 'lightning',
						title: 'Zaczynam od problemu',
						description:
							'Zanim wybiorę rozwiązanie, chcę wiedzieć, co naprawdę próbujemy uprościć, przyspieszyć albo wyjaśnić.',
					},
					{
						icon: 'cube',
						title: 'Frontend w kontekście produktu',
						description:
							'Interfejs traktuję jako część większego systemu: treści, architektury, SEO, CMS-a i decyzji produktowych.',
					},
					{
						icon: 'pencil',
						title: 'Porządkuję złożoność',
						description:
							'Najlepiej odnajduję się tam, gdzie trzeba poukładać kod, strukturę projektu albo ścieżkę użytkownika.',
					},
					{
						icon: 'users',
						title: 'Buduję na kolejne iteracje',
						description:
							'Wolę rozwiązania, które da się rozwijać po miesiącach, niż takie, które dobrze wyglądają tylko przy pierwszym wdrożeniu.',
					},
				],
			},
			techStack: {
				number: '03',
				label: 'Narzędzia',
				previous: 'Poprzednie technologie',
				next: 'Następne technologie',
			},
			experiencePreview: {
				number: '04',
				eyebrow: 'Doświadczenie',
				heading: 'Ostatnie role frontendowe',
				intro:
					'Ostatnie projekty skupione wokół Reacta, Next.js, TypeScriptu, SSR, dostępności, testów i architektury frontendowej.',
				cta: 'Zobacz pełne cyfrowe CV',
			},
			cta: {
				heading: {
					line1: 'Zbudujmy razem coś',
					highlight: 'naprawdę',
					line2: 'dobrego.',
				},
				button: 'Napisz do mnie',
			},
		},
		about: {
			eyebrow: 'O mnie',
			heading: (name: string) => `O ${name}`,
			lead: 'Statyczna strona „O mnie”. Uzupełnij treść w sekcjach lub przenieś ją do CMS później.',
			valuesTitle: 'Wartości',
			valuesDescription: 'Przykładowa treść do podmiany.',
		},
		resume: {
			eyebrow: 'CV',
			downloadCv: 'Pobierz CV',
			lead: 'Cyfrowe CV. Plik PDF umieść w public/files/.',
			skillsTitle: 'Umiejętności',
			experienceTitle: 'Doświadczenie',
		},
		blog: {
			eyebrow: 'Pisanie',
			empty: 'Brak wpisów. Opublikuj wpis typu blogPost w Contentful.',
			updated: 'Zaktualizowano',
		},
	},
	en: {
		localeName: 'English',
		switchTo: 'Polski',
		nav: {
			home: 'Home',
			about: 'About',
			resume: 'Digital Resume',
			blog: 'Articles',
		},
		skipLink: 'Skip to content',
		meta: {
			home: {
				title: 'Home',
				description: 'Personal site — portfolio, digital resume, and blog.',
			},
			about: {
				title: 'About',
				description: 'Background and what I work on.',
			},
			resume: {
				title: 'Digital Resume',
				description: 'Experience, skills, and CV download.',
			},
			blogIndex: {
				title: 'Articles',
				description: 'Writing and notes.',
			},
		},
		home: {
			eyebrow: 'Personal site',
			readBlog: 'Read articles',
			readBlogWithCount: (count: number) => `Read articles (${count} recent)`,
			latestPostsTitle: 'Latest posts',
			latestPostsDescription: 'Recent posts from Contentful at build time.',
			scrollIndicator: {
				label: 'Home page section navigation',
				scrollToSectionLabel: 'Scroll to section {number}',
			},
			hero: {
				number: '01',
				eyebrow: 'Frontend Developer',
				heading: {
					line1: 'I build digital',
					line2: 'products that make an',
					line3: 'impact.',
				},
				lead: 'I craft fast, scalable and accessible web experiences with clean code and thoughtful design.',
				viewWork: 'View my work',
				letsTalk: "Let's talk",
				followMe: 'Follow me',
				scroll: 'Scroll',
			},
			aboutPreview: {
				number: '02',
				eyebrow: 'About me',
				heading: {
					line1: 'I care more about why something exists',
					line2: 'than what it was built with.',
				},
				lead: 'I work mainly on the frontend, close to product requirements and ready UI designs. I like the moment when a complex problem starts turning into a working view that feels logical and obvious to the user.',
				cta: 'More about me',
				closing:
					'I build my own web projects after hours because the same thing still fascinates me: how to connect technology, content, and useful structure into something people actually want to use.',
				values: [
					{
						icon: 'lightning',
						title: 'I start with the problem',
						description:
							'Technologies change. A well-named problem lasts longer. Before implementation, I want to understand what we are really trying to simplify, speed up, or explain.',
					},
					{
						icon: 'cube',
						title: 'Frontend in product context',
						description:
							'An interface does not exist in isolation. I also look at application architecture, CMSs, content flow, SEO, and constraints that affect implementation and maintenance.',
					},
					{
						icon: 'pencil',
						title: 'I organize complexity',
						description:
							'I get the most satisfaction from simplifying difficult things: code, project structure, content, and user paths.',
					},
					{
						icon: 'users',
						title: 'I build for the next iterations',
						description:
							'I like solutions that remain understandable after months of product development, not just ones that look good on launch day.',
					},
				],
			},
			techStack: {
				number: '03',
				label: 'Tech stack',
				previous: 'Previous technologies',
				next: 'Next technologies',
			},
			experiencePreview: {
				number: '04',
				eyebrow: 'Digital CV',
				heading: 'Selected frontend experience',
				intro:
					'Recent work focused on React, Next.js, TypeScript, SSR, accessibility, testing, and production-grade frontend architecture.',
				cta: 'View full digital CV',
			},
			cta: {
				heading: {
					line1: "Let's build something",
					highlight: 'amazing',
					line2: 'together.',
				},
				button: 'Contact me',
			},
		},
		about: {
			eyebrow: 'About',
			heading: (name: string) => `About ${name}`,
			lead: 'Static about page shell. Replace copy in sections or move long-form content to the CMS later.',
			valuesTitle: 'Values',
			valuesDescription: 'Placeholder content to replace.',
		},
		resume: {
			eyebrow: 'Resume',
			downloadCv: 'Download CV',
			lead: 'Digital resume page. Place a PDF in public/files/ when ready.',
			skillsTitle: 'Skills',
			experienceTitle: 'Experience',
		},
		blog: {
			eyebrow: 'Writing',
			empty: 'No posts yet. Publish a blogPost entry in Contentful.',
			updated: 'Updated',
		},
	},
} as const;

const localizedDictionaries = {
	pl: applyPolishTypography(dictionaries.pl),
	en: dictionaries.en,
} as const satisfies Record<Locale, (typeof dictionaries)[Locale]>;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
	return localizedDictionaries[locale];
}
