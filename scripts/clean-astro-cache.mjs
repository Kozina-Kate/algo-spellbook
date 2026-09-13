import { rm } from 'node:fs/promises';

await Promise.all([
	rm('.astro', { recursive: true, force: true }),
	rm('node_modules/.astro/data-store.json', { force: true }),
]);
