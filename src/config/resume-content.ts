import type { Locale } from '@/lib/i18n/locales';
import { applyPolishTypography } from '@/lib/typography';

export type SkillGroup = {
	title: string;
	items: readonly string[];
};

export type WorkRole = {
	company: string;
	title: string;
	period: string;
	context: string;
	summary: string;
	points: readonly string[];
	tags: readonly string[];
};

export type ExperiencePreviewRole = {
	company: string;
	title: string;
	period: string;
	summary: string;
	tags: readonly string[];
};

export type ResumeCopy = {
	hero: {
		eyebrow: string;
		heading: string;
		lead: string;
		description: string;
		quickFactsLabel: string;
		contactLabel: string;
		metrics: readonly string[];
	};
	snapshot: {
		label: string;
		intro: string;
		items: readonly { title: string; description: string }[];
	};
	projects: {
		label: string;
		title: string;
		intro: string;
		items: readonly { title: string; description: string }[];
	};
	experience: {
		title: string;
		intro: string;
	};
	technologies: {
		title: string;
		intro: string;
	};
	strengths: {
		title: string;
		items: readonly { title: string; description: string }[];
	};
	narrative: {
		title: string;
		paragraphs: readonly string[];
		blocks: readonly { title: string; description: string }[];
	};
	navigationCards: {
		heading: string;
		about: { title: string; description: string };
		blog: { title: string; description: string };
	};
};

const skillGroupsByLocale = {
	pl: [
		{
			title: 'Frontend',
			items: [
				'React',
				'Next.js',
				'TypeScript',
				'JavaScript',
				'HTML',
				'CSS / SCSS / Tailwind',
				'Styled Components',
				'Preact',
				'Angular',
			],
		},
		{
			title: 'State & Dane',
			items: [
				'Redux',
				'Redux Toolkit',
				'RTK Query',
				'React Query',
				'MobX',
				'Jotai',
				'Recoil',
				'React Hook Form',
				'REST API',
				'GraphQL',
			],
		},
		{
			title: 'Jakość i wydajność',
			items: [
				'Jest',
				'Cypress',
				'React Testing Library',
				'Storybook',
				'Testy integracyjne',
				'Accessibility',
				'Optymalizacja wydajności',
			],
		},
		{
			title: 'Architektura i dostarczanie',
			items: [
				'SSR',
				'Micro frontends',
				'Module Federation',
				'Turborepo',
				'Migracje platformy',
				'CI/CD',
				'Refaktoryzacja legacy',
			],
		},
		{
			title: 'CMS / e-commerce',
			items: [
				'AEM',
				'Builder.io',
				'2ClickShop',
				'Salesforce LWC',
				'Firebase',
				'Integracje Apple / Google Play',
			],
		},
		{
			title: 'Backend / wsparcie',
			items: [
				'.NET',
				'C#',
				'Ruby on Rails',
				'PHP',
				'PostgreSQL',
				'MySQL',
				'WebRTC',
				'Gamepad API',
			],
		},
	] as const,
	en: [
		{
			title: 'Frontend',
			items: [
				'React',
				'Next.js',
				'TypeScript',
				'JavaScript',
				'HTML',
				'CSS / SCSS / Tailwind',
				'Styled Components',
				'Preact',
				'Angular',
			],
		},
		{
			title: 'State & Data',
			items: [
				'Redux',
				'Redux Toolkit',
				'RTK Query',
				'React Query',
				'MobX',
				'Jotai',
				'Recoil',
				'React Hook Form',
				'REST APIs',
				'GraphQL',
			],
		},
		{
			title: 'Quality & Delivery',
			items: [
				'Jest',
				'Cypress',
				'React Testing Library',
				'Storybook',
				'Integration testing',
				'Accessibility',
				'Performance tuning',
			],
		},
		{
			title: 'Architecture & Delivery',
			items: [
				'SSR',
				'Micro frontends',
				'Module Federation',
				'Turborepo',
				'Platform migration',
				'CI/CD',
				'Legacy refactoring',
			],
		},
		{
			title: 'CMS / e-commerce',
			items: [
				'AEM',
				'Builder.io',
				'2ClickShop',
				'Salesforce LWC',
				'Firebase',
				'Apple / Google Play integrations',
			],
		},
		{
			title: 'Backend / support',
			items: ['.NET', 'C#', 'Ruby on Rails', 'PHP', 'PostgreSQL', 'MySQL', 'WebRTC', 'Gamepad API'],
		},
	] as const,
} as const satisfies Record<Locale, readonly SkillGroup[]>;

const workHistoryByLocale = {
	pl: [
		{
			company: 'Japan Tobacco International',
			title: 'Senior L3 Frontend Engineer',
			period: 'sierpień 2025 — teraz',
			context: 'Software Development / eCommerce',
			summary:
				'Utrzymanie i rozwój frontendowej części stron Ploom działających na ponad 30 rynkach, z naciskiem na stabilność, komponenty globalne, CMS i wsparcie zespołów contentowych.',
			points: [
				'Naprawa defektów na stronach e-commerce: karty produktów, bannery, CTA, tracking i layouty.',
				'Diagnozowanie problemów konfiguracyjnych w Builder.io i AEM.',
				'Refaktoryzacja i optymalizacja komponentów globalnych pod kątem dostępności oraz utrzymywalności.',
				'Utrzymanie testów jednostkowych i integracyjnych wspierających bezpieczne wydania.',
				'Komunikacja techniczna z content managerami i klientami wewnętrznymi.',
			],
			tags: ['React', 'Next.js', 'AEM', 'Builder.io', 'TypeScript', 'Accessibility', 'Testing'],
		},
		{
			company: 'Roboverse Reply DE',
			title: 'Freelance Fullstack Developer (React/.NET)',
			period: 'listopad 2024 — sierpień 2025',
			context: 'Software Development / Robotics',
			summary:
				'Modernizacja platformy do zdalnego sterowania robotami: migracja do Next.js, przebudowa state managementu, porządkowanie legacy oraz rozwój funkcji sterowania i podglądu na żywo.',
			points: [
				'Migracja aplikacji złożonej z 7 dużych modułów z platformy vanilla React SaaS na rozwiązanie On-Premise w Next.js',
				'Przepisanie state managementu z Recoil na Jotai z podziałem domenowym.',
				'Usunięcie 15–20% nieużywanego lub przestarzałego kodu backendowego pod nadzorem zespołu.',
				'Naprawa około 109 istniejących defektów platformy w ciągu 10 miesięcy.',
				'Implementacja sterowania dronem przez Gamepad API i integracji live camera feed.',
			],
			tags: ['React', 'Next.js', 'SSR', 'Jotai', 'Recoil', '.NET', 'C#', 'Gamepad API', 'WebRTC'],
		},
		{
			company: 'NapoleonCat',
			title: 'Senior Frontend Developer',
			period: 'marzec 2023 — październik 2024',
			context: 'Software Development / Social Media Management',
			summary:
				'Frontend dla produktu SaaS: moduł analityczny, globalne powiadomienia, mikrofrontendy, Storybook i regularne releasy produkcyjne.',
			points: [
				'Wdrożenie frontendu nowego modułu analitycznego na podstawie Design Systemu przygotowanego przez UI/UX.',
				'Budowa komponentów dashboardowych i widgetów dla różnych typów wykresów.',
				'Wdrożenie globalnego systemu powiadomień z Firebase Messaging.',
				'Wsparcie przejścia na mikrofrontendy z Turborepo i Module Federation.',
				'24 releasy produkcyjne oraz utrzymanie biblioteki około 75 komponentów w Storybooku.',
			],
			tags: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Storybook', 'Firebase Messaging', 'Turborepo', 'Module Federation'],
		},
		{
			company: 'Merixstudio',
			title: 'Senior React Developer',
			period: 'październik 2021 — wrzesień 2022',
			context: 'Software Development / Gaming Platform',
			summary:
				'Frontend backoffice dla platformy gamifikacyjnej online casino: rozbudowane formularze, kampanie, testy integracyjne i dynamiczny skrypt kampanii.',
			points: [
				'Odpowiadałem za rozbudowę panelu admin z 7 do 10 typów kampanii i zarządzanie formularzami.',
				'Utrzymanie zaawansowanych formularzy opartych o React Hook Form i Redux Toolkit.',
				'Implementacja około 50 testów integracyjnych.',
				'Rozwój dynamicznego skryptu kampanii w Preact.js.',
				'Obsługa około 250 aktywnych kampanii miesięcznie dla 18 operatorów.',
			],
			tags: [
				'React',
				'TypeScript',
				'Redux Toolkit',
				'React Hook Form',
				'Preact',
				'Jest',
				'Integration Testing',
			],
		},
		{
			company: 'Netguru',
			title: 'Mid Frontend Developer',
			period: 'kwiecień 2020 — wrzesień 2021',
			context: 'Software Development',
			summary:
				'Frontend dla projektów crowdfundingowych, real estate i narzędzi analitycznych Salesforce.',
			points: [
				'Rozwój platformy Hero5 i konfigurowalnych szablonów kampanii.',
				'Implementacja 10 widoków analityki Salesforce, w tym metryk NPS i wizualizacji.',
				'Budowa panelu admin dla Newst.se i frontendowych paneli dla klienta nieruchomościowego.',
				'Wprowadzanie testów jednostkowych i integracyjnych, wspierających stabilność projektów.',
			],
			tags: ['React', 'React Router', 'Redux', 'RTK Query', 'React Query', 'Jest', 'Cypress', 'Gatsby'],
		},
		{
			company: 'Trol Intermedia sp. z o.o. sp.k.',
			title: 'PHP/Frontend Developer',
			period: 'kwiecień 2018 — marzec 2020',
			context: 'Software Development / eCommerce',
			summary:
				'Frontend, UI i moduły PHP/MySQL dla e-commerce opartych o autorski CMS 2ClickShop.',
			points: [
				'Budowa sklepów i modułów e-commerce dla marek takich jak Neonail, Świat Zabawek i Zabawki Panda.',
				'Implementacja Infinite Scroll dla sklepów 2ClickShop.',
				'Wdrożenie kompletnego sklepu GlinianaKura.pl.',
				'Integracje katalogów produktów, koszyka i płatności.',
			],
			tags: ['PHP', 'JavaScript', 'HTML', 'Sass', 'MySQL', '2ClickShop', 'e-commerce'],
		},
		{
			company: 'LEOCODE / 314 Apps',
			title: 'Ruby on Rails/Frontend Developer',
			period: 'marzec 2017 — listopad 2017',
			context: 'Software Development',
			summary:
				'Fullstackowe początki: aplikacje Ruby on Rails i Angular dla klientów zagranicznych, dashboardy, panele administracyjne i tracking usług.',
			points: [
				'Rozwój Soap.ly — platformy do zamawiania mobilnego mycia samochodów.',
				'Implementacja real-time service tracking i powiadomień.',
				'Praca nad Lifetramp.com z Ruby on Rails i Angular 1.6.',
				'Budowa dashboardów, paneli użytkownika i funkcji administracyjnych.',
			],
			tags: ['Ruby on Rails', 'Angular', 'JavaScript', 'TypeScript', 'PostgreSQL', 'Sass'],
		},
	] as const,
	en: [
		{
			company: 'Japan Tobacco International',
			title: 'Senior L3 Frontend Engineer',
			period: 'August 2025 — Present',
			context: 'Software Development / eCommerce',
			summary:
				'I maintain and improve frontend for Ploom product websites across international markets, focusing on measurable quality and stable delivery.',
			points: [
				'Bugfixing and operational maintenance for Ploom storefronts in 30+ markets.',
				'Refined product cards, banners, CTAs, and tracking integrations while keeping regional behavior consistent.',
				'Diagnosed and fixed configuration issues in Builder.io and AEM.',
				'Refactored global components to improve accessibility and long-term maintainability.',
				'Maintained unit and integration tests to protect production stability.',
				'Coordinated technical communication between content managers and internal client stakeholders.',
			],
			tags: ['React', 'Next.js', 'AEM', 'Builder.io', 'Accessibility', 'REST APIs'],
		},
		{
			company: 'Roboverse Reply DE',
			title: 'Freelance Fullstack Developer (React/.NET)',
			period: 'November 2024 — August 2025',
			context: 'Software Development',
			summary:
				'Contributed to a major migration of a remote robot-control platform, keeping backend stability while expanding frontend capability.',
			points: [
				'Migrated 7 large modules to modern SSR architecture and moved from legacy React to Next.js.',
				'Performed controlled state-management migration from Recoil to Jotai.',
				'Removed 15–20% of unused/legacy code from backend areas to improve maintainability.',
				'Implemented drone control with gamepad support and live camera stream.',
				'Fixed around 109 existing platform defects over 10 months.',
				'Migrated the system from SaaS to on-premise with better customization and control.',
			],
			tags: ['React', 'Next.js', 'SSR', 'Jotai', 'Recoil', '.NET', 'C#', 'Gamepad API', 'WebRTC'],
		},
		{
			company: 'NapoleonCat',
			title: 'Senior Frontend Developer',
			period: 'March 2023 — October 2024',
			context: 'Software Development / Social Media Management',
			summary:
				'Led frontend delivery for core analytics and notification experiences in a product with continuous release cycles.',
			points: [
				'Built a new analytics module frontend with reusable components for chart-driven reporting.',
				'Implemented a global notification system and Firebase Messaging integrations.',
				'Led part of the micro frontend migration using Turborepo and Module Federation.',
				'Maintained a broad Storybook component library (around 75 components).',
				'Delivered 24 production releases while managing regular bug-fix work.',
				'Worked with support and customer feedback to keep release quality stable.',
			],
			tags: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Storybook', 'Firebase Messaging'],
		},
		{
			company: 'Merixstudio',
			title: 'Senior React Developer',
			period: 'October 2021 — September 2022',
			context: 'Software Development',
			summary:
				'Owned development of a backoffice product for casino gamification with complex campaign workflows and high-usage flows.',
			points: [
				'Expanded campaign creation capabilities from 7 to 10 campaign types.',
				'Built reusable form components and dashboard flows for campaign management.',
				'Created and maintained integration tests (~50) to reduce regression risk.',
				'Implemented dynamic campaign scripting with Preact and reward mechanics.',
				'Handled monthly delivery for ~250 active campaigns across 18 operators.',
			],
			tags: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'React Hook Form', 'Preact'],
		},
		{
			company: 'Netguru',
			title: 'Mid Frontend Developer',
			period: 'April 2020 — September 2021',
			context: 'Software Development',
			summary:
				'Contributed to Hero5 crowdfunding and Salesforce-oriented frontend work, balancing architecture constraints and fast delivery.',
			points: [
				'Delivered campaign templates in Hero5 and supported project rollout.',
				'Implemented Salesforce analytics views and 10 reporting features.',
				'Built frontend admin/product views for Newst.se real-estate product.',
				'Collaborated across teams on frontend architecture and component quality.',
				'Maintained unit and integration tests and supported production releases.',
			],
			tags: ['React', 'React Router', 'Redux', 'RTK Query', 'React Query', 'Jest', 'Cypress', 'Gatsby'],
		},
		{
			company: 'Trol Intermedia sp. z o.o. sp.k.',
			title: 'PHP/Frontend Developer',
			period: 'April 2018 — March 2020',
			context: 'Software Development / eCommerce',
			summary:
				'Developed full e-commerce storefronts on 2ClickShop, improving conversion-oriented UX through custom modules and interactive UI.',
			points: [
				'Built stores for brands including Neonail, Zabawki Panda, and others.',
				'Implemented Infinite Scroll and reusable frontend modules for product catalogs.',
				'Integrated cart, payment, and catalog flows across multiple client projects.',
				'Worked on responsive cross-browser implementations with design collaboration.',
				'Optimized existing stores for maintainability and performance improvements.',
			],
			tags: ['PHP', 'JavaScript', 'HTML', 'Sass', 'MySQL', '2ClickShop'],
		},
		{
			company: 'LEOCODE (at the time known as: 314 Apps)',
			title: 'Ruby on Rails/Frontend Developer',
			period: 'March 2017 — November 2017',
			context: 'Software Development',
			summary:
				'Worked as a junior fullstack developer building service-tracking and front-end features for external client projects.',
			points: [
				'Built Soap.ly mobile car wash platform with Angular 2 and service tracking in real time.',
				'Added user, order, and operator-facing functionality and analytics dashboards.',
				'Contributed to full-stack feature delivery in Ruby on Rails with Angular frontends.',
				'Implemented real-time status updates and notification capabilities.',
				'Integrated multiple third-party services into production-ready workflows.',
			],
			tags: ['Ruby on Rails', 'Angular 2', 'Angular 1.6', 'JavaScript', 'PostgreSQL', 'TypeScript'],
		},
	] as const,
} as const satisfies Record<Locale, WorkRole[]>;

const experiencePreviewByLocale = {
	en: [
		{
			company: 'Japan Tobacco International',
			title: 'Senior L3 Frontend Engineer',
			period: 'August 2025 — Present',
			summary:
				'Maintaining and improving frontend components for Ploom e-commerce websites across 30+ international markets, with focus on React, Next.js, accessibility, and stable releases.',
			tags: ['React', 'Next.js', 'Storybook', 'AEM', 'Builder.io', 'Accessibility'],
		},
		{
			company: 'Roboverse Reply DE',
			title: 'Freelance Fullstack Developer (React/.NET)',
			period: 'November 2024 — August 2025',
			summary:
				'Leading frontend migration and modernization for a remote robot control platform while sustaining delivery continuity.',
			tags: ['React', 'Next.js', 'SSR', 'Jotai', 'Recoil', '.NET'],
		},
		{
			company: 'NapoleonCat',
			title: 'Senior Frontend Developer',
			period: 'March 2023 — October 2024',
			summary:
				'Built and maintained major frontend modules, including analytics workflows and a global notification system.',
			tags: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Storybook', 'Turborepo'],
		},
	],
	pl: [
		{
			company: 'Japan Tobacco International',
			title: 'Senior L3 Frontend Engineer',
			period: 'sierpień 2025 — teraz',
			summary:
				'Utrzymanie i rozwój komponentów frontendowych dla stron Ploom na 30+ rynkach międzynarodowych, ze szczególną uwagą na React, Next.js i dostępność.',
			tags: ['React', 'Next.js', 'Storybook', 'AEM', 'Builder.io', 'Accessibility'],
		},
		{
			company: 'Roboverse Reply DE',
			title: 'Freelance Fullstack Developer (React/.NET)',
			period: 'listopad 2024 — sierpień 2025',
			summary:
				'Wiodłem migrację i modernizację frontendu platformy zdalnej kontroli robotów przy równoczesnym utrzymaniu ciągłości wdrożeń.',
			tags: ['React', 'Next.js', 'SSR', 'Jotai', 'Recoil', '.NET'],
		},
		{
			company: 'NapoleonCat',
			title: 'Senior Frontend Developer',
			period: 'marzec 2023 — październik 2024',
			summary:
				'Projektowanie i wdrożenie głównych modułów frontendowych: analityka i globalny system powiadomień.',
			tags: ['React', 'TypeScript', 'Redux Toolkit', 'RTK Query', 'Storybook', 'Turborepo'],
		},
	],
} as const satisfies Record<Locale, readonly ExperiencePreviewRole[]>;

const localizedSkillGroups = {
	pl: applyPolishTypography(skillGroupsByLocale.pl),
	en: skillGroupsByLocale.en,
} as const satisfies Record<Locale, readonly SkillGroup[]>;

const localizedWorkHistory = {
	pl: applyPolishTypography(workHistoryByLocale.pl),
	en: workHistoryByLocale.en,
} as const satisfies Record<Locale, readonly WorkRole[]>;

const localizedExperiencePreview = {
	pl: applyPolishTypography(experiencePreviewByLocale.pl),
	en: experiencePreviewByLocale.en,
} as const satisfies Record<Locale, readonly ExperiencePreviewRole[]>;

const resumeCopyByLocale = {
	pl: {
		hero: {
			eyebrow: 'Cyfrowe portfolio',
			heading: 'Moja ścieżka zawodowa.',
			lead: 'Ponad 9 lat doświadczenia w tworzeniu i rozwijaniu interfejsów w nowoczesnych aplikacjach webowych.',
			description:
				'Pracuję w zespole produktowym tam, gdzie frontend styka się z realnym produktem: architekturą, CMS, migracjami, testami i codziennym utrzymaniem.',
			quickFactsLabel: 'Skrót sygnałowy',
			contactLabel: 'Napisz',
			metrics: [
				'9+ lat doświadczenia zawodowego',
				'React / Next.js / TypeScript',
				'e-commerce (30+ rynków)',
				'Produktowe zespoły i realne delivery',
			],
		},
		snapshot: {
			label: 'W skrócie',
			intro: 'Cztery obszary, które najlepiej opisują moje doświadczenie i sposób pracy przy produktach webowych.',
			items: [
				{
					title: '9+ lat praktyki',
					description:
						'Od fullstackowych początków po frontend w produktach SaaS, e-commerce i międzynarodowych systemach CMS.',
				},
				{
					title: 'Frontend produktowy',
					description:
						'React, Next.js, TypeScript, CMS-y, dashboardy i przepływy użytkownika, które muszą działać w realnym produkcie.',
				},
				{
					title: 'Modernizacje i migracje',
					description:
						'Migracje do Next.js, SSR, micro frontends, state management i porządkowanie legacy.',
				},
				{
					title: 'Jakość i delivery',
					description:
						'Testy, dostępność, utrzymanie, stabilne releasy i komunikacja z zespołami produktowymi.',
				},
			],
		},
		projects: {
			label: 'Obszary pracy',
			title: 'Obszary pracy',
			intro:
				'Najczęściej pracuję przy frontendzie produktowym, modernizacjach, integracjach CMS, dashboardach, testach i utrzymaniu aplikacji po wdrożeniu.',
			items: [
				{
					title: 'Frontend produktowy',
					description:
						'Interfejsy, komponenty, stany aplikacji i przepływy użytkownika w realnych produktach webowych.',
				},
				{
					title: 'Modernizacje i integracje',
					description:
						'Migracje, porządkowanie legacy, integracje CMS i praca z ograniczeniami istniejących platform.',
				},
				{
					title: 'Jakość po wdrożeniu',
					description:
						'Testy, dostępność, utrzymanie, poprawki defektów i stabilizacja aplikacji po release’ach.',
				},
			],
		},
		experience: {
			title: 'Doświadczenie zawodowe',
			intro:
				'Od fullstackowych początków, przez e-commerce i SaaS, po frontend dla międzynarodowych produktów działających na wielu rynkach.',
		},
		technologies: {
			title: 'Technologie i narzędzia',
			intro:
				'Narzędzia, z którymi pracowałem komercyjnie przy frontendzie, migracjach, testach, CMS-ach, e-commerce i integracjach produktowych.',
		},
		strengths: {
			title: 'Najmocniejsze obszary',
			items: [
				{
					title: 'Frontend aplikacji produktowych',
					description:
						'Projektowanie i utrzymanie przepływów, komponentów i stanów aplikacji, aby działały spójnie przy realnym ruchu użytkowników.',
				},
				{
					title: 'Modernizacja i migracje',
					description:
						'Przejścia między architekturami frontendowymi, porządkowanie stanu i kodu oraz wdrażanie rozwiązań ułatwiających skalowanie.',
				},
				{
					title: 'Jakość i dostępność',
					description:
						'Testy, readable states, Storybook i porządek komponentów jako sposób na przewidywalną utrzymywalność.',
				},
				{
					title: 'E-commerce, CMS i workflow',
					description:
						'Praca z AEM/Builder.io i platformami produktowymi przy częstych zmianach contentu i konfiguracji.',
				},
			],
		},
		narrative: {
			title: 'Od implementacji do odpowiedzialności za delivery',
			paragraphs: [
				'Moja ścieżka przesuwała się od klasycznego frontendu i fullstackowych podstaw, przez e-commerce i SaaS, do pracy przy systemach, w których liczy się architektura, stabilność, dostępność, testy i współpraca z zespołami produktowymi.',
			],
			blocks: [
				{
					title: 'E-commerce i CMS',
					description: 'Sklepy, content, komponenty, integracje i realne ograniczenia treści.',
				},
				{
					title: 'SaaS i product frontend',
					description: 'Dashboardy, analityka, powiadomienia, mikrofrontendy i biblioteki komponentów.',
				},
				{
					title: 'Modernizacja i utrzymanie',
					description: 'Migracje, refaktoryzacje, legacy cleanup, testy i stabilne release’y.',
				},
			],
		},
		navigationCards: {
			heading: 'Zobacz dalej',
			about: {
				title: 'O mnie',
				description: 'Myślenie produktowe, podejście do pracy i codzienne nawyki wdrożeniowe.',
			},
			blog: {
				title: 'Blog',
				description: 'Notatki i wpisy z obszaru frontendu i delivery.',
			},
		},
	} as const,
	en: {
		hero: {
			eyebrow: 'Digital portfolio',
			heading: 'My professional path.',
			lead: '9 years in product web development.',
			description:
				'Frontend is not just components and pages — it is often the layer closest to users and most exposed to product constraints.',
			quickFactsLabel: 'Signal row',
			contactLabel: 'Get in touch',
			metrics: [
				'9+ years of professional experience',
				'React / Next.js / TypeScript',
				'e-commerce footprint across 30+ markets',
				'Product teams, architecture, and steady delivery',
			],
		},
		snapshot: {
			label: 'In short',
			intro: 'Four areas that best summarize my experience and day-to-day delivery profile.',
			items: [
				{
					title: '9+ years of practice',
					description:
						'From fullstack beginnings to frontend work in SaaS, e-commerce, and international CMS-driven systems.',
				},
				{
					title: 'Product frontend',
					description:
						'React, Next.js, TypeScript, CMS platforms, dashboards, and user flows that have to work in real products.',
				},
				{
					title: 'Modernization and migration',
					description:
						'Next.js migrations, SSR, micro frontends, state management, and legacy cleanup.',
				},
				{
					title: 'Quality and delivery',
					description:
						'Testing, accessibility, maintenance, stable releases, and communication with product teams.',
				},
			],
		},
		projects: {
			label: 'Work areas',
			title: 'Work areas',
			intro:
				'I most often work on product frontend, modernizations, CMS integrations, dashboards, testing, and post-release application maintenance.',
			items: [
				{
					title: 'Product frontend',
					description:
						'Interfaces, components, application states, and user flows in real web products.',
				},
				{
					title: 'Modernization and integrations',
					description:
						'Migrations, legacy cleanup, CMS integrations, and work within existing platform constraints.',
				},
				{
					title: 'Post-release quality',
					description:
						'Testing, accessibility, maintenance, defect fixes, and stabilizing applications after releases.',
				},
			],
		},
		experience: {
			title: 'Work experience',
			intro: 'From the latest role to earlier milestones, with full chronology and measurable contributions.',
		},
		technologies: {
			title: 'Technologies and tools',
			intro: 'Grouped stack from practical delivery work, with frontend as the core specialty.',
		},
		strengths: {
			title: 'Strongest areas',
			items: [
				{
					title: 'Product frontend',
					description:
						'Designing and maintaining user flows, UI states, and component architecture in fast-changing teams.',
				},
				{
					title: 'Modernization and migration',
					description:
						'Transitioning frontend architectures, state models, and legacy reduction to enable faster maintenance.',
				},
				{
					title: 'Quality and accessibility',
					description:
						'Testing, readable states, Storybook and component governance for predictable quality.',
				},
				{
					title: 'E-commerce, CMS and workflows',
					description:
						'Working with AEM/Builder.io and platform layers where content, campaign logic, and delivery constraints converge.',
				},
			],
		},
		narrative: {
			title: 'From implementation to delivery responsibility',
			paragraphs: [
				'The career moved from classic frontend and fullstack foundations through e-commerce and SaaS into systems where architecture, stability, accessibility, testing, and product-team collaboration matter every day.',
			],
			blocks: [
				{
					title: 'E-commerce and CMS',
					description: 'Stores, content workflows, components, integrations, and real content constraints.',
				},
				{
					title: 'SaaS and product frontend',
					description: 'Dashboards, analytics, notifications, micro frontends, and component libraries.',
				},
				{
					title: 'Modernization and maintenance',
					description: 'Migrations, refactoring, legacy cleanup, testing, and stable releases.',
				},
			],
		},
		navigationCards: {
			heading: 'Continue',
			about: { title: 'About', description: 'What I care about as a frontend engineer in product teams.' },
			blog: {
				title: 'Blog',
				description: 'Long-form notes and practical observations from frontend work.',
			},
		},
	} as const,
} as const satisfies Record<Locale, ResumeCopy>;

export function getSkillGroups(locale: Locale): readonly SkillGroup[] {
	return localizedSkillGroups[locale];
}

export function getWorkHistory(locale: Locale): readonly WorkRole[] {
	return localizedWorkHistory[locale];
}

export function getRecentExperiencePreview(locale: Locale): readonly ExperiencePreviewRole[] {
	return localizedExperiencePreview[locale];
}

export function getResumeCopy(locale: Locale): ResumeCopy {
	return resumeCopyByLocale[locale];
}
