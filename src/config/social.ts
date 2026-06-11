export type SocialIcon = 'github' | 'linkedin' | 'email';

export type SocialLink = {
	label: string;
	href: string;
	icon: SocialIcon;
};

export const socialIconPaths: Record<SocialIcon, string> = {
	github: '/icons/github.svg',
	linkedin: '/icons/linkedin.svg',
	email: '/icons/email.svg',
};

export const socialLinks: SocialLink[] = [
	{
		label: 'GitHub',
		href: 'https://github.com/patryk-bernasiewicz',
		icon: 'github',
	},
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/patryk-bernasiewicz',
		icon: 'linkedin',
	},
	{
		label: 'Email',
		href: 'mailto:patryk.bernasiewicz@gmail.com',
		icon: 'email',
	},
];
