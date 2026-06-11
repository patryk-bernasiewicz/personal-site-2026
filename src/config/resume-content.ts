import type { Locale } from '@/lib/i18n/locales';
import { applyPolishTypography } from '@/lib/typography';

export type SkillGroup = {
	title: string;
	items: string[];
};

export type WorkRole = {
	company: string;
	title: string;
	period: string;
	summary: string;
};

export type ExperiencePreviewRole = WorkRole & {
	tags: readonly string[];
};

const skillGroupsByLocale = {
	pl: [
		{ title: 'Frontend', items: ['Astro', 'TypeScript', 'React', 'Tailwind CSS'] },
		{ title: 'Backend', items: ['Node.js', 'API', 'Contentful'] },
		{ title: 'Ops', items: ['Docker', 'CI/CD', 'Hosting statyczny'] },
	],
	en: [
		{ title: 'Frontend', items: ['Astro', 'TypeScript', 'React', 'Tailwind CSS'] },
		{ title: 'Backend', items: ['Node.js', 'API design', 'Contentful'] },
		{ title: 'Ops', items: ['Docker', 'CI/CD', 'Static hosting'] },
	],
} as const satisfies Record<Locale, SkillGroup[]>;

const workHistoryByLocale = {
	pl: [
		{
			company: 'Firma A',
			title: 'Senior Engineer',
			period: '2022 — obecnie',
			summary: 'Przykładowe stanowisko do podmiany własną treścią.',
		},
		{
			company: 'Firma B',
			title: 'Software Engineer',
			period: '2019 — 2022',
			summary: 'Kolejny wpis demonstracyjny układu sekcji CV.',
		},
	],
	en: [
		{
			company: 'Company A',
			title: 'Senior Engineer',
			period: '2022 — Present',
			summary: 'Placeholder role. Replace with your experience.',
		},
		{
			company: 'Company B',
			title: 'Software Engineer',
			period: '2019 — 2022',
			summary: 'Another placeholder entry for the resume layout.',
		},
	],
} as const satisfies Record<Locale, WorkRole[]>;

const experiencePreviewByLocale = {
	en: [
		{
			company: 'Japan Tobacco International',
			title: 'Senior L3 Frontend Engineer',
			period: 'August 2025 — Present',
			summary:
				'Maintaining and improving frontend components for Ploom e-commerce websites across 30+ international markets, with focus on React, Next.js, Storybook, accessibility, performance, and consistent UI behavior.',
			tags: [
				'React',
				'Next.js',
				'Storybook',
				'AEM',
				'Builder.io',
				'Accessibility',
				'REST APIs',
				'Testing',
			],
		},
		{
			company: 'Roboverse Reply DE',
			title: 'Freelance Fullstack Developer (React/.NET)',
			period: 'November 2024 — August 2025',
			summary:
				'Contributed to frontend migration and platform modernization for a remote robot control system, moving large platform areas from legacy React to Next.js while supporting backend stability and new product capabilities.',
			tags: [
				'React',
				'Next.js',
				'SSR',
				'React Server Components',
				'Jotai',
				'.NET',
				'C#',
				'Shadcn UI',
				'Radix UI',
			],
		},
		{
			company: 'NapoleonCat',
			title: 'Senior Frontend Developer',
			period: 'March 2023 — October 2024',
			summary:
				'Led frontend work on analytics module redesign, global notification system implementation, and a microfrontend architecture transition while maintaining a large component library and shipping regular production releases.',
			tags: [
				'React',
				'TypeScript',
				'Redux Toolkit',
				'RTK Query',
				'Storybook',
				'Firebase Messaging',
				'Turborepo',
				'Webpack',
				'Module Federation',
				'WCAG',
			],
		},
	],
	pl: [
		{
			company: 'Japan Tobacco International',
			title: 'Senior L3 Frontend Engineer',
			period: 'Sierpień 2025 — obecnie',
			summary:
				'Utrzymanie i rozwój komponentów frontendowych dla sklepów e-commerce Ploom na ponad 30 rynkach międzynarodowych, z naciskiem na React, Next.js, Storybook, dostępność, wydajność i spójne zachowanie UI.',
			tags: [
				'React',
				'Next.js',
				'Storybook',
				'AEM',
				'Builder.io',
				'Accessibility',
				'REST APIs',
				'Testing',
			],
		},
		{
			company: 'Roboverse Reply DE',
			title: 'Freelance Fullstack Developer (React/.NET)',
			period: 'Listopad 2024 — Sierpień 2025',
			summary:
				'Wsparcie migracji frontendu i modernizacji platformy systemu zdalnej kontroli robotów — przenoszenie dużych obszarów z legacy React do Next.js przy utrzymaniu stabilności backendu i nowych możliwości produktu.',
			tags: [
				'React',
				'Next.js',
				'SSR',
				'React Server Components',
				'Jotai',
				'.NET',
				'C#',
				'Shadcn UI',
				'Radix UI',
			],
		},
		{
			company: 'NapoleonCat',
			title: 'Senior Frontend Developer',
			period: 'Marzec 2023 — Październik 2024',
			summary:
				'Prowadzenie prac frontendowych nad przeprojektowaniem modułu analityki, wdrożeniem globalnego systemu powiadomień i przejściem na architekturę microfrontendów przy utrzymaniu dużej biblioteki komponentów i regularnych release’ach produkcyjnych.',
			tags: [
				'React',
				'TypeScript',
				'Redux Toolkit',
				'RTK Query',
				'Storybook',
				'Firebase Messaging',
				'Turborepo',
				'Webpack',
				'Module Federation',
				'WCAG',
			],
		},
	],
} as const satisfies Record<Locale, ExperiencePreviewRole[]>;

const localizedSkillGroups = {
	pl: applyPolishTypography(skillGroupsByLocale.pl),
	en: skillGroupsByLocale.en,
} as const satisfies Record<Locale, SkillGroup[]>;

const localizedWorkHistory = {
	pl: applyPolishTypography(workHistoryByLocale.pl),
	en: workHistoryByLocale.en,
} as const satisfies Record<Locale, WorkRole[]>;

const localizedExperiencePreview = {
	pl: applyPolishTypography(experiencePreviewByLocale.pl),
	en: experiencePreviewByLocale.en,
} as const satisfies Record<Locale, ExperiencePreviewRole[]>;

export function getSkillGroups(locale: Locale): SkillGroup[] {
	return localizedSkillGroups[locale];
}

export function getWorkHistory(locale: Locale): WorkRole[] {
	return localizedWorkHistory[locale];
}

export function getRecentExperiencePreview(locale: Locale): ExperiencePreviewRole[] {
	return localizedExperiencePreview[locale];
}
