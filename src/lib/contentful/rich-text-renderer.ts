import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Options } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function resolveAssetSrc(url: string | undefined): string | null {
	if (!url) {
		return null;
	}

	return url.startsWith('//') ? `https:${url}` : url;
}

function renderExternalLink(url: string, children: string): string {
	const isExternal = /^https?:\/\//i.test(url);

	if (!isExternal) {
		return `<a href="${escapeHtml(url)}">${children}</a>`;
	}

	return `<a href="${escapeHtml(url)}" rel="noopener noreferrer" target="_blank">${children}</a>`;
}

export const richTextRenderOptions: Options = {
	renderNode: {
		[BLOCKS.HEADING_1]: (_node, children) => `<h2>${children}</h2>`,
		[BLOCKS.HEADING_2]: (_node, children) => `<h3>${children}</h3>`,
		[BLOCKS.HEADING_3]: (_node, children) => `<h4>${children}</h4>`,
		[BLOCKS.HEADING_4]: (_node, children) => `<h5>${children}</h5>`,
		[BLOCKS.QUOTE]: (_node, children) => `<blockquote>${children}</blockquote>`,
		[BLOCKS.HR]: () => '<hr />',
		[BLOCKS.EMBEDDED_ASSET]: (node) => {
			const target = node.data.target;
			if (!target || !('fields' in target)) {
				return '';
			}

			const src = resolveAssetSrc(target.fields.file?.url);
			if (!src) {
				return '';
			}

			const alt = escapeHtml(target.fields.title ?? '');

			return `<figure class="my-8"><img src="${escapeHtml(src)}" alt="${alt}" loading="lazy" decoding="async" class="w-full rounded-card" /></figure>`;
		},
		[INLINES.HYPERLINK]: (node, children) =>
			renderExternalLink(node.data.uri, String(children)),
		[INLINES.ASSET_HYPERLINK]: (node, children) => {
			const childHtml = String(children);
			const target = node.data.target;

			if (!target || !('fields' in target)) {
				return childHtml;
			}

			const src = resolveAssetSrc(target.fields.file?.url);
			if (!src) {
				return childHtml;
			}

			return renderExternalLink(src, childHtml);
		},
		[INLINES.ENTRY_HYPERLINK]: (_node, children) => String(children),
	},
	renderMark: {
		[MARKS.CODE]: (text) => `<code>${text}</code>`,
	},
};

/**
 * Renders trusted Contentful rich text to HTML with explicit node/mark handlers.
 * Applies a minimal post-render sanitization pass (scripts, inline event handlers).
 */
export function renderRichTextToHtml(document: Document): string {
	const html = documentToHtmlString(document, richTextRenderOptions);

	return sanitizeRichTextHtml(html);
}

function sanitizeRichTextHtml(html: string): string {
	return html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
		.replace(/\s+on[a-z]+\s*=\s*"[^"]*"/gi, '')
		.replace(/\s+on[a-z]+\s*=\s*'[^']*'/gi, '');
}
