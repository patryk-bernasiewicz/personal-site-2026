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

/** @type {import('vite').Plugin} */
const noStoreInDev = {
	name: 'no-store-in-dev',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			const noStoreValue = 'no-store, no-cache, max-age=0, must-revalidate';
			const shouldClearBrowserCache = req.headers.accept?.includes('text/html') ?? false;
			const applyNoStoreHeaders = () => {
				res.setHeader('Cache-Control', noStoreValue);
				res.setHeader('Pragma', 'no-cache');
				res.setHeader('Expires', '0');
				if (shouldClearBrowserCache) {
					res.setHeader('Clear-Site-Data', '"cache"');
				}
				res.removeHeader('ETag');
				res.removeHeader('Last-Modified');
			};
			const setHeader = res.setHeader.bind(res);

			res.setHeader = (name, value) => {
				const headerName = name.toLowerCase();

				if (headerName === 'cache-control') {
					return setHeader(name, noStoreValue);
				}

				if (headerName === 'etag' || headerName === 'last-modified') {
					return res;
				}

				return setHeader(name, value);
			};

			applyNoStoreHeaders();
			next();
		});
	},
};

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
		plugins: [tailwindcss(), ...(isDev ? [noStoreInDev] : [])],
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
