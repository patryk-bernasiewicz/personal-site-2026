import type { Container, Engine, ISourceOptions } from '@tsparticles/engine';

let engineReady: Promise<Engine> | undefined;

async function loadEngine(): Promise<Engine> {
	const [{ tsParticles }, { loadBasic }] = await Promise.all([
		import('@tsparticles/engine'),
		import('@tsparticles/basic'),
	]);

	await loadBasic(tsParticles);

	return tsParticles;
}

export function getParticleEngine(): Promise<Engine> {
	engineReady ??= loadEngine();

	return engineReady;
}

export async function createParticleStream(
	element: HTMLElement,
	options: ISourceOptions,
): Promise<Container> {
	const engine = await getParticleEngine();
	const id = element.id;

	if (!id) {
		throw new Error('Particle stream element requires a stable id attribute.');
	}

	const container = await engine.load({ element, id, options });

	if (!container) {
		throw new Error('Failed to create particle stream.');
	}

	element.querySelector('canvas')?.setAttribute('aria-hidden', 'true');

	return container;
}
