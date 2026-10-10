import type { YearMonth } from '@/lib/dates';
import type { Locale } from '@/lib/i18n/locales';
import { applyPolishTypography } from '@/lib/typography';

export type ResumeRole = {
	company: string;
	role: string;
	start: YearMonth;
	/** `null` = current role. */
	end: YearMonth | null;
	summary: string;
	points: readonly string[];
	stack: readonly string[];
};

export type SkillGroup = {
	title: string;
	items: readonly string[];
};

export type ResumeContent = {
	intro: string;
	roles: readonly ResumeRole[];
	skills: readonly SkillGroup[];
};

const skills = [
	{ title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS', 'Tailwind CSS', 'Styled Components', 'Preact', 'Angular'] },
	{ title: 'State & data', items: ['Redux Toolkit', 'RTK Query', 'React Query', 'MobX', 'Jotai', 'Recoil', 'React Hook Form', 'REST', 'GraphQL'] },
	{ title: 'Testing', items: ['Jest', 'React Testing Library', 'Cypress', 'Playwright', 'Storybook', 'WCAG'] },
	{ title: 'Architecture', items: ['SSR', 'React Server Components', 'Micro frontends', 'Module Federation', 'Turborepo', 'CI/CD'] },
	{ title: 'CMS & e-commerce', items: ['AEM', 'Builder.io', 'Contentful', '2ClickShop', 'Salesforce LWC', 'Firebase'] },
	{ title: 'Backend & ops', items: ['.NET / C#', 'Ruby on Rails', 'PHP', 'PostgreSQL', 'MySQL', 'Redis', 'BullMQ', 'Docker', 'Cloudflare'] },
] as const satisfies readonly SkillGroup[];

const resumeByLocale = {
	pl: {
		intro: 'Frontend developer, komercyjnie od 2017 roku. Zaczynałem od PHP i Ruby on Rails, od kilku lat pracuję głównie w React i Next.js. Role od najnowszej.',
		roles: [
		{
			company: 'Japan Tobacco International',
			role: 'Senior L3 Frontend Engineer',
			start: '2025-08',
			end: null,
			summary: 'Utrzymanie i rozwój frontendowej części stron Ploom działających na ponad 30 rynkach, z naciskiem na stabilność, komponenty globalne, CMS i wsparcie zespołów contentowych.',
			points: [
				'Naprawa defektów na stronach e-commerce: karty produktowe, bannery, CTA, tracking i layouty.',
				'Diagnozowanie problemów konfiguracyjnych w Builder.io i AEM.',
				'Refaktoryzacja i optymalizacja komponentów globalnych pod kątem dostępności oraz utrzymywalności.',
				'Utrzymanie testów jednostkowych i integracyjnych wspierających bezpieczne wydania.',
				'Komunikacja techniczna z content managerami i klientami wewnętrznymi.',
			],
			stack: ['React', 'Next.js', 'AEM', 'Builder.io', 'TypeScript'],
		},
		{
			company: 'Roboverse Reply DE',
			role: 'Freelance Fullstack Developer (React/.NET)',
			start: '2024-11',
			end: '2025-08',
			summary: 'Modernizacja platformy do zdalnego sterowania robotami: migracja do Next.js, przebudowa state managementu, porządkowanie legacy oraz rozwój funkcji sterowania i podglądu na żywo.',
			points: [
				'Migracja aplikacji złożonej z 7 dużych modułów z platformy vanilla React SaaS na rozwiązanie On-Premise w Next.js',
				'Przepisanie state managementu z Recoil na Jotai z podziałem domenowym.',
				'Usunięcie 15–20% nieużywanego lub przestarzałego kodu backendowego pod nadzorem zespołu.',
				'Naprawa około 109 istniejących defektów platformy w ciągu 10 miesięcy.',
				'Implementacja sterowania dronem przez Gamepad API i integracji live camera feed.',
			],
			stack: ['React', 'Next.js', 'SSR', 'Jotai', 'Recoil', '.NET', 'C#', 'Gamepad API', 'WebRTC'],
		},
		{
			company: 'NapoleonCat',
			role: 'Senior Frontend Developer',
			start: '2023-03',
			end: '2024-10',
			summary: 'Frontend dla produktu SaaS: moduł analityczny, globalne powiadomienia, mikrofrontendy, Storybook i regularne releasy produkcyjne.',
			points: [
				'Wdrożenie frontendu nowego modułu analitycznego na podstawie Design Systemu przygotowanego przez UI/UX.',
				'Budowa komponentów dashboardowych i widgetów dla różnych typów wykresów.',
				'Wdrożenie globalnego systemu powiadomień z Firebase Messaging.',
				'Wsparcie przejścia na mikrofrontendy z Turborepo i Module Federation.',
				'24 releasy produkcyjne oraz utrzymanie biblioteki około 75 komponentów w Storybooku.',
			],
			stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Storybook', 'Firebase Messaging', 'Turborepo', 'Module Federation'],
		},
		{
			company: 'Merixstudio',
			role: 'Senior React Developer',
			start: '2021-10',
			end: '2022-09',
			summary: 'Frontend backoffice dla platformy gamifikacyjnej online casino: rozbudowane formularze, kampanie, testy integracyjne i dynamiczny skrypt kampanii.',
			points: [
				'Rozbudowa systemu kampanii z 7 do 10 typów.',
				'Utrzymanie zaawansowanych formularzy opartych o React Hook Form i Redux Toolkit.',
				'Implementacja około 50 testów integracyjnych.',
				'Rozwój dynamicznego skryptu kampanii w Preact.js.',
				'Obsługa około 250 aktywnych kampanii miesięcznie dla 18 operatorów.',
			],
			stack: ['React', 'TypeScript', 'Redux Toolkit', 'React Hook Form', 'Preact', 'Jest'],
		},
		{
			company: 'Netguru',
			role: 'Mid Frontend Developer',
			start: '2020-04',
			end: '2021-09',
			summary: 'Frontend dla projektów crowdfundingowych, real estate i narzędzi analitycznych Salesforce.',
			points: [
				'Rozwój platformy Hero5 i konfigurowalnych szablonów kampanii.',
				'Implementacja funkcji analitycznych Salesforce, w tym metryk i wizualizacji.',
				'Budowa frontendowej warstwy paneli administracyjnych.',
				'Praca z testami jednostkowymi i integracyjnymi.',
			],
			stack: ['React', 'TypeScript', 'Redux', 'RTK Query', 'React Query', 'Jest', 'Cypress', 'Gatsby'],
		},
		{
			company: 'Trol Intermedia',
			role: 'PHP/Frontend Developer',
			start: '2018-04',
			end: '2020-03',
			summary: 'Frontend, UI i moduły PHP/MySQL dla e-commerce opartych o autorski CMS 2ClickShop.',
			points: [
				'Budowa sklepów i modułów e-commerce dla marek takich jak Neonail, Świat Zabawek i Zabawki Panda.',
				'Implementacja Infinite Scroll dla sklepów 2ClickShop.',
				'Wdrożenie kompletnego sklepu GlinianaKura.pl.',
				'Integracje katalogów produktów, koszyka i płatności.',
			],
			stack: ['PHP', 'JavaScript', 'HTML', 'Sass', 'MySQL', '2ClickShop'],
		},
		{
			company: 'LEOCODE / 314 Apps',
			role: 'Ruby on Rails/Frontend Developer',
			start: '2017-03',
			end: '2017-11',
			summary: 'Fullstackowe początki: aplikacje Ruby on Rails i Angular dla klientów zagranicznych, dashboardy, panele administracyjne i tracking usług.',
			points: [
				'Rozwój Soap.ly — platformy do zamawiania mobilnego mycia samochodów.',
				'Implementacja real-time service tracking i powiadomień.',
				'Praca nad Lifetramp.com z Ruby on Rails i Angular 1.6.',
				'Budowa dashboardów, paneli użytkownika i funkcji administracyjnych.',
			],
			stack: ['Ruby on Rails', 'Angular', 'JavaScript', 'TypeScript', 'PostgreSQL', 'Sass'],
		},
		],
		skills,
	},
	en: {
		intro: 'Frontend developer, working commercially since 2017. I started out with PHP and Ruby on Rails; for the last few years it has mostly been React and Next.js. Roles, newest first.',
		roles: [
		{
			company: 'Japan Tobacco International',
			role: 'Senior L3 Frontend Engineer',
			start: '2025-08',
			end: null,
			summary: 'Maintaining and improving the frontend part of Ploom websites across 30+ markets.',
			points: [
				'Fixing e-commerce defects: product cards, banners, CTAs, tracking, and layout regressions.',
				'Debugging configuration issues in Builder.io and AEM.',
				'Refactoring global UI components for accessibility and maintainability.',
				'Keeping unit and integration tests stable for safe releases.',
				'Technical communication with content teams and internal clients.',
			],
			stack: ['React', 'Next.js', 'AEM', 'Builder.io', 'TypeScript'],
		},
		{
			company: 'Roboverse Reply DE',
			role: 'Freelance Fullstack Developer (React/.NET)',
			start: '2024-11',
			end: '2025-08',
			summary: 'Remote robot platform modernization: Next.js migration, state-management rebuild, legacy cleanup, and live control/preview features.',
			points: [
				'Migrated 7 major modules from vanilla React to Next.js / SSR.',
				'Rebuilt state management from Recoil to Jotai with domain decomposition.',
				'Removed 15–20% of unused or outdated backend code with team alignment.',
				'Fixed around 109 existing platform defects over 10 months.',
				'Implemented drone control via Gamepad API and live camera feed integration.',
			],
			stack: ['React', 'Next.js', 'SSR', 'Jotai', 'Recoil', '.NET', 'C#', 'Gamepad API', 'WebRTC'],
		},
		{
			company: 'NapoleonCat',
			role: 'Senior Frontend Developer',
			start: '2023-03',
			end: '2024-10',
			summary: 'SaaS product frontend: analytics module, global notifications, micro-frontends, Storybook, and regular production releases.',
			points: [
				'Built the new analytics module frontend based on Design System prepared by UI/UX.',
				'Created dashboard components and widgets for multiple chart types.',
				'Implemented global notifications with Firebase Messaging.',
				'Supported a shift to micro-frontends with Turborepo and Module Federation.',
				'24 production releases and around 75 components maintained in Storybook.',
			],
			stack: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Storybook', 'Firebase Messaging', 'Turborepo', 'Module Federation'],
		},
		{
			company: 'Merixstudio',
			role: 'Senior React Developer',
			start: '2021-10',
			end: '2022-09',
			summary: 'Backoffice frontend for gamification platform: forms, campaign system, integration testing, and dynamic campaign scripts.',
			points: [
				'Expanded campaign system from 7 to 10 campaign types.',
				'Built and maintained advanced forms with React Hook Form and Redux Toolkit.',
				'Added around 50 integration tests.',
				'Developed dynamic campaign scripting in Preact.',
				'Handled roughly 250 active campaigns monthly across 18 operators.',
			],
			stack: ['React', 'TypeScript', 'Redux Toolkit', 'React Hook Form', 'Preact', 'Jest'],
		},
		{
			company: 'Netguru',
			role: 'Mid Frontend Developer',
			start: '2020-04',
			end: '2021-09',
			summary: 'Frontend for crowdfunding, real estate and Salesforce analytical tools.',
			points: [
				'Developed Hero5 platform and configurable campaign templates.',
				'Built Salesforce analytics features, including metrics and visualizations.',
				'Implemented dashboard admin layers.',
				'Worked with unit and integration tests.',
			],
			stack: ['React', 'TypeScript', 'Redux', 'RTK Query', 'React Query', 'Jest', 'Cypress', 'Gatsby'],
		},
		{
			company: 'Trol Intermedia',
			role: 'PHP/Frontend Developer',
			start: '2018-04',
			end: '2020-03',
			summary: 'Frontend, UI and PHP/MySQL modules for e-commerce on custom 2ClickShop CMS.',
			points: [
				'Built stores and modules for brands including Neonail, Świat Zabawek and Zabawki Panda.',
				'Implemented Infinite Scroll for 2ClickShop stores.',
				'Launched the complete GlinianaKura.pl store.',
				'Integrated product catalogs, carts, and payment flows.',
			],
			stack: ['PHP', 'JavaScript', 'HTML', 'Sass', 'MySQL', '2ClickShop'],
		},
		{
			company: 'LEOCODE / 314 Apps',
			role: 'Ruby on Rails/Frontend Developer',
			start: '2017-03',
			end: '2017-11',
			summary: 'Fullstack beginnings: Ruby on Rails and Angular applications for international clients, including dashboards, admin panels, and service tracking.',
			points: [
				'Developed Soap.ly, a platform for mobile car detailing ordering.',
				'Implemented real-time service tracking and notification flows.',
				'Worked on Lifetramp.com with Ruby on Rails and Angular 1.6.',
				'Built user dashboards, admin panels, and operational features.',
			],
			stack: ['Ruby on Rails', 'Angular', 'JavaScript', 'TypeScript', 'PostgreSQL', 'Sass'],
		},
		],
		skills,
	},
} as const satisfies Record<Locale, ResumeContent>;

const localizedResume = {
	pl: applyPolishTypography(resumeByLocale.pl),
	en: resumeByLocale.en,
} as const satisfies Record<Locale, ResumeContent>;

export function getResume(locale: Locale): ResumeContent {
	return localizedResume[locale];
}
