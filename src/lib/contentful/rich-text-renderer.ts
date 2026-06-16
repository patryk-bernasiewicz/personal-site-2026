import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import type { Options } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import type { Block, Document, Text } from '@contentful/rich-text-types';
import { codeToHtml } from 'shiki';

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

function isTextNode(node: unknown): node is Text {
	return (
		typeof node === 'object' &&
		node !== null &&
		'nodeType' in node &&
		(node as Text).nodeType === 'text'
	);
}

function isCodeText(node: Text): boolean {
	return node.marks.some((mark) => mark.type === MARKS.CODE);
}

function getCodeBlockText(node: Block): string | null {
	if (node.nodeType !== BLOCKS.PARAGRAPH || node.content.length === 0) {
		return null;
	}

	const textNodes = node.content.filter(isTextNode);
	if (textNodes.length !== node.content.length) {
		return null;
	}

	const code = textNodes.map((textNode) => textNode.value).join('');
	const trimmed = code.trimStart();
	const looksLikeCodeBlock =
		trimmed.startsWith('```') || /^lang:[\w-]+\r?\n/i.test(trimmed);
	const isMarkedCodeBlock = textNodes.every(isCodeText) && code.includes('\n');

	return isMarkedCodeBlock || looksLikeCodeBlock ? code : null;
}

function parseCodeFence(code: string): { code: string; lang: string } {
	const trimmed = code.trim();
	const langMatch = trimmed.match(/^lang:([\w-]+)\r?\n([\s\S]*)$/i);
	if (langMatch) {
		return { lang: langMatch[1] ?? 'text', code: langMatch[2] ?? '' };
	}

	const match = trimmed.match(/^```([\w-]+)?\n([\s\S]*?)\n?```$/);

	return match
		? { lang: match[1] ?? 'text', code: match[2] ?? '' }
		: { lang: 'text', code };
}

async function renderCodeBlock(code: string): Promise<string> {
	const parsed = parseCodeFence(code);
	let highlighted: string;

	try {
		highlighted = await codeToHtml(parsed.code, {
			lang: parsed.lang,
			theme: 'github-dark',
		});
	} catch {
		highlighted = `<pre><code>${escapeHtml(parsed.code)}</code></pre>`;
	}

	return `<figure class="code-block" data-language="${escapeHtml(parsed.lang)}">${highlighted}</figure>`;
}

function createRichTextRenderOptions(
	codeBlocks: Map<string, Promise<string>>,
): Options {
	return {
		renderNode: {
			[BLOCKS.PARAGRAPH]: (node, children) => {
				const code = getCodeBlockText(node as Block);
				if (!code) {
					return `<p>${children(node.content)}</p>`;
				}

				const marker = `@@CODE_BLOCK_${codeBlocks.size}@@`;
				codeBlocks.set(marker, renderCodeBlock(code));
				return marker;
			},
			[BLOCKS.HEADING_1]: (node, children) => `<h2>${children(node.content)}</h2>`,
			[BLOCKS.HEADING_2]: (node, children) => `<h3>${children(node.content)}</h3>`,
			[BLOCKS.HEADING_3]: (node, children) => `<h4>${children(node.content)}</h4>`,
			[BLOCKS.HEADING_4]: (node, children) => `<h5>${children(node.content)}</h5>`,
			[BLOCKS.HEADING_5]: (node, children) => `<h5>${children(node.content)}</h5>`,
			[BLOCKS.HEADING_6]: (node, children) => `<h5>${children(node.content)}</h5>`,
			[BLOCKS.UL_LIST]: (node, children) => `<ul>${children(node.content)}</ul>`,
			[BLOCKS.OL_LIST]: (node, children) => `<ol>${children(node.content)}</ol>`,
			[BLOCKS.LIST_ITEM]: (node, children) => `<li>${children(node.content)}</li>`,
			[BLOCKS.QUOTE]: (node, children) =>
				`<blockquote>${children(node.content)}</blockquote>`,
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

				const rawAlt = typeof target.fields.title === 'string' ? target.fields.title.trim() : '';
				const isGenericAlt = rawAlt === '' || /^image$/i.test(rawAlt);
				const alt = isGenericAlt ? '' : escapeHtml(rawAlt);
				const ariaHidden = isGenericAlt ? ' aria-hidden="true"' : '';
				const caption = target.fields.description
					? `<figcaption>${escapeHtml(target.fields.description)}</figcaption>`
					: '';

				return `<figure><img src="${escapeHtml(src)}" alt="${alt}"${ariaHidden} loading="lazy" decoding="async" />${caption}</figure>`;
			},
			[INLINES.HYPERLINK]: (node, children) =>
				renderExternalLink(node.data.uri, children(node.content)),
			[INLINES.ASSET_HYPERLINK]: (node, children) => {
				const childHtml = children(node.content);
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
			[INLINES.ENTRY_HYPERLINK]: (node, children) => children(node.content),
		},
		renderMark: {
			[MARKS.BOLD]: (text) => `<strong>${text}</strong>`,
			[MARKS.ITALIC]: (text) => `<em>${text}</em>`,
			[MARKS.UNDERLINE]: (text) => `<u>${text}</u>`,
			[MARKS.CODE]: (text) => `<code>${escapeHtml(String(text))}</code>`,
		},
	};
}

/**
 * Renders trusted Contentful rich text to HTML with explicit node/mark handlers.
 * Applies a minimal post-render sanitization pass (scripts, inline event handlers).
 */
export async function renderRichTextToHtml(
	document: Document,
): Promise<string> {
	const codeBlocks = new Map<string, Promise<string>>();
	let html = documentToHtmlString(
		document,
		createRichTextRenderOptions(codeBlocks),
	);

	for (const [marker, block] of codeBlocks) {
		html = html.replaceAll(marker, await block);
	}

	return sanitizeRichTextHtml(html);
}

function sanitizeRichTextHtml(html: string): string {
	return html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
		.replace(/\s+on[a-z]+\s*=\s*"[^"]*"/gi, '')
		.replace(/\s+on[a-z]+\s*=\s*'[^']*'/gi, '');
}
