import type { Locale } from '@/lib/i18n/locales';
import { applyPolishTypography } from '@/lib/typography';

export const dictionaries = {
	pl: {
		localeName: 'Polski',
		switchTo: 'English',
		nav: {
			home: 'Strona główna',
			main: 'Główna nawigacja',
			resume: 'CV',
			blog: 'Blog',
		},
		skipLink: 'Przejdź do treści',
		meta: {
			home: {
				title: 'Patryk Bernasiewicz — Frontend Developer',
				description:
					'Frontend developer z Polski. Od 2017 roku buduję aplikacje webowe, obecnie w React i Next.js dla stron Ploom w JTI. Piszę o frontendzie i JavaScripcie.',
			},
			resume: {
				title: 'CV — Patryk Bernasiewicz',
				description:
					'Doświadczenie zawodowe i technologie: React, Next.js, TypeScript, CMS-y i e-commerce. Role od 2017 roku.',
			},
			blogIndex: {
				title: 'Blog — Patryk Bernasiewicz',
				description: 'Wpisy o frontendzie, JavaScripcie, wydajności i narzędziach.',
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
			resumeLink: 'Cyfrowe CV',
			latestPostsTitle: 'Ostatnie wpisy',
			allPosts: 'Wszystkie wpisy',
		},
		resume: {
			title: 'Cyfrowe CV',
			experienceTitle: 'Doświadczenie',
			skillsTitle: 'Technologie',
		},
		blog: {
			title: 'Blog',
			empty: 'Nie ma jeszcze wpisów.',
			updated: 'Zaktualizowano',
		},
	},
	en: {
		localeName: 'English',
		switchTo: 'Polski',
		nav: {
			home: 'Home',
			main: 'Main navigation',
			resume: 'Resume',
			blog: 'Articles',
		},
		skipLink: 'Skip to content',
		meta: {
			home: {
				title: 'Patryk Bernasiewicz — Frontend Developer',
				description:
					'Frontend developer from Poland. Building web apps since 2017, currently React and Next.js for the Ploom websites at JTI. Writing about frontend and JavaScript.',
			},
			resume: {
				title: 'Resume — Patryk Bernasiewicz',
				description:
					'Work experience and technologies: React, Next.js, TypeScript, CMSs and e-commerce. Roles since 2017.',
			},
			blogIndex: {
				title: 'Articles — Patryk Bernasiewicz',
				description: 'Posts about frontend, JavaScript, performance and tooling.',
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
			resumeLink: 'Digital resume',
			latestPostsTitle: 'Latest articles',
			allPosts: 'All articles',
		},
		resume: {
			title: 'Digital resume',
			experienceTitle: 'Experience',
			skillsTitle: 'Technologies',
		},
		blog: {
			title: 'Articles',
			empty: 'No articles yet.',
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
