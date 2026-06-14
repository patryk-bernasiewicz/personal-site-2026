function enhanceCodeBlocks(root: ParentNode = document): void {
	const blocks = root.querySelectorAll<HTMLElement>('.code-block:not([data-enhanced])');

	for (const block of blocks) {
		block.dataset.enhanced = 'true';

		const pre = block.querySelector('pre');
		if (!pre?.hasAttribute('tabindex')) {
			pre?.setAttribute('tabindex', '0');
		}
	}
}

export function setupBlogCodeBlocks(): void {
	enhanceCodeBlocks();
}

