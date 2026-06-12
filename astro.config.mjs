// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.SITE_URL ?? 'https://example.com';
const isDev = process.env.NODE_ENV !== 'production';
const devAllowedHost = 'patryk-macbook.local';
const devAllowedHosts = [
	devAllowedHost,
	'.trycloudflare.com',
	...(process.env.DEV_ALLOWED_HOSTS?.split(',')
		.map((host) => host.trim())
		.filter(Boolean) ?? []),
];

// https://astro.build/config
export default defineConfig({
	site: siteUrl,
	devToolbar: {
		enabled: false,
	},
	integrations: [sitemap(), react()],
	redirects: {
		'/resume': '/cyfrowe-cv',
		'/cv': '/cyfrowe-cv',
	},
	...(isDev && {
		server: {
			allowedHosts: devAllowedHosts,
		},
		security: {
			allowedDomains: [
				{
					hostname: devAllowedHost,
					protocol: 'http',
				},
				{
					hostname: '.trycloudflare.com',
					protocol: 'https',
				},
			],
		},
	}),
	vite: {
		plugins: [tailwindcss()],
		optimizeDeps: {
			include: ['embla-carousel', '@tsparticles/engine', '@tsparticles/basic'],
		},
	},
	env: {
		schema: {
			SITE_URL: envField.string({
				context: 'client',
				access: 'public',
				default: siteUrl,
			}),
			CONTENTFUL_ENABLED: envField.boolean({
				context: 'server',
				access: 'public',
				default: false,
			}),
			CONTENTFUL_SPACE_ID: envField.string({
				context: 'server',
				access: 'secret',
				optional: true,
			}),
			CONTENTFUL_DELIVERY_TOKEN: envField.string({
				context: 'server',
				access: 'secret',
				optional: true,
			}),
			CONTENTFUL_PREVIEW_TOKEN: envField.string({
				context: 'server',
				access: 'secret',
				optional: true,
			}),
			MUSIC_PLAYLIST_URL: envField.string({
				context: 'server',
				access: 'public',
				default: 'https://s3.patrykb.pl/patrykbpl/audio/playlist.json',
			}),
		},
	},
});
