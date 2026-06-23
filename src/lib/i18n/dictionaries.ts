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
				title: 'Patryk Bernasiewicz — Frontend Developer',
				description:
					'Frontend developer specjalizujący się w React, Next.js, TypeScript, dostępności, CMS-ach i stabilnym delivery produktów webowych.',
			},
			about: {
				title: 'O mnie — Patryk Bernasiewicz',
				description:
					'Kim jestem, jak pracuję i jak podchodzę do frontendu, produktu, UX oraz technicznego delivery.',
			},
			resume: {
				title: 'Cyfrowe CV — Patryk Bernasiewicz',
				description:
					'Doświadczenie frontendowe, technologie, obszary pracy i role komercyjne Patryka Bernasiewicza.',
			},
			blogIndex: {
				title: 'Blog — Patryk Bernasiewicz',
				description:
					'Artykuły o frontendzie, JavaScript, wydajności, dostępności i praktycznym delivery produktów webowych.',
			},
		},
		audioPlayer: {
			hint: 'kliknij, aby posłuchać klimatycznych kawałków',
			previous: 'Poprzedni utwór',
			play: 'Odtwórz muzykę',
			pause: 'Zatrzymaj muzykę',
			next: 'Następny utwór',
			ready: 'Odtwarzacz muzyki gotowy',
			unknownTrack: 'Nieznany utwór',
			playing: 'Odtwarzanie: {track}',
			stopped: 'Muzyka zatrzymana',
			loadingPlaylist: 'Ładowanie playlisty',
			selected: 'Wybrano: {track}',
			playlistLoadError: 'Nie udało się załadować playlisty.',
			trackPlayError: 'Nie udało się odtworzyć utworu.',
			webAudioError: 'Twoja przeglądarka nie obsługuje Web Audio API.',
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
				eyebrow: 'Frontend Developer · React / Next.js',
				heading: {
					line1: 'Buduję i modernizuję',
					line2: 'frontendy działające',
					line3: 'na wielu rynkach.',
				},
				lead: 'Obecnie rozwijam platformy Ploom dla ponad 30 rynków. Wcześniej migrowałem siedmiomodułową platformę robotyczną do Next.js i budowałem moduły analityczne w produkcie SaaS.',
				viewWork: 'Zobacz cyfrowe CV',
				letsTalk: 'Porozmawiajmy',
				followMe: 'Obserwuj',
				scroll: 'Przewiń',
			},
			proofStrip: {
				label: 'Dowody doświadczenia',
				items: [
					{
						value: '9+ lat',
						label: 'komercyjnego doświadczenia frontendowego',
					},
					{
						value: '30+ rynków',
						label: 'platformy Ploom rozwijane globalnie',
					},
					{
						value: '7 modułów',
						label: 'migracja platformy robotycznej do Next.js',
					},
					{
						value: '24 releasy',
						label: 'około 75 komponentów w pracy nad produktem SaaS',
					},
				],
			},
			aboutPreview: {
				number: '02',
				eyebrow: 'O mnie',
				heading: {
					line1: 'Najpierw sens.',
					line2: 'Potem interfejs.',
				},
				lead: 'Pracuję blisko frontendu, produktu i gotowych projektów UI. Lubię zamieniać złożone procesy w widoki, które prowadzą użytkownika bez tłumaczenia.',
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
					line1: 'Pracujesz nad frontendem, który wymaga',
					highlight: 'modernizacji lub stabilizacji?',
					line2: '',
				},
				description:
					'Mogę pomóc w migracji, uporządkowaniu architektury albo rozwoju istniejącego produktu React lub Next.js.',
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
				title: 'Patryk Bernasiewicz — Frontend Developer',
				description:
					'Frontend developer focused on React, Next.js, TypeScript, accessibility, CMS-driven platforms, and reliable web product delivery.',
			},
			about: {
				title: 'About — Patryk Bernasiewicz',
				description:
					'Background, working style, and approach to frontend, product, UX, and technical delivery.',
			},
			resume: {
				title: 'Digital Resume — Patryk Bernasiewicz',
				description:
					'Frontend experience, technologies, work areas, and commercial roles of Patryk Bernasiewicz.',
			},
			blogIndex: {
				title: 'Blog — Patryk Bernasiewicz',
				description:
					'Articles about frontend, JavaScript, performance, accessibility, and practical web product delivery.',
			},
		},
		audioPlayer: {
			hint: 'click to play atmospheric tracks',
			previous: 'Previous track',
			play: 'Play music',
			pause: 'Pause music',
			next: 'Next track',
			ready: 'Music player ready',
			unknownTrack: 'Unknown track',
			playing: 'Playing: {track}',
			stopped: 'Music stopped',
			loadingPlaylist: 'Loading playlist',
			selected: 'Selected: {track}',
			playlistLoadError: 'Could not load the playlist.',
			trackPlayError: 'Could not play this track.',
			webAudioError: 'Your browser does not support the Web Audio API.',
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
				eyebrow: 'Frontend Developer · React / Next.js',
				heading: {
					line1: 'I build and modernize',
					line2: 'production frontends',
					line3: 'across markets.',
				},
				lead: 'I currently build Ploom platforms for 30+ markets. Previously, I migrated a seven-module robotics platform to Next.js and built analytics modules for a SaaS product.',
				viewWork: 'View digital resume',
				letsTalk: "Let's talk",
				followMe: 'Follow me',
				scroll: 'Scroll',
			},
			proofStrip: {
				label: 'Experience proof points',
				items: [
					{
						value: '9+ years',
						label: 'of commercial frontend experience',
					},
					{
						value: '30+ markets',
						label: 'global Ploom platforms',
					},
					{
						value: '7 modules',
						label: 'robotics platform migration to Next.js',
					},
					{
						value: '24 releases',
						label: 'around 75 components in SaaS product work',
					},
				],
			},
			aboutPreview: {
				number: '02',
				eyebrow: 'About me',
				heading: {
					line1: 'I care more about why something exists',
					line2: 'than what it was built with.',
				},
				lead: 'I work close to frontend, product, and ready UI designs. I like turning complex flows into interfaces that guide users without extra explanation.',
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
					line1: 'Working on a frontend that needs',
					highlight: 'modernization or stabilization?',
					line2: '',
				},
				description:
					'I can help with migration, architecture cleanup, or ongoing development of an existing React or Next.js product.',
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
