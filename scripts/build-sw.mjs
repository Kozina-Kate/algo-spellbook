import { generateSW } from 'workbox-build';
import { readFile, writeFile } from 'node:fs/promises';

const baseArgument = process.argv.find((argument) => argument.startsWith('--base='));
const base = baseArgument?.slice('--base='.length) ?? '/algo-spellbook';
const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');

const manifestPath = new URL('../dist/manifest.webmanifest', import.meta.url);
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
manifest.start_url = `${normalizedBase}/`;
manifest.scope = `${normalizedBase}/`;
manifest.icons = manifest.icons.map((icon) => ({
	...icon,
	src: `${normalizedBase}/${icon.src.split('/').pop()}`,
}));
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const { count, size, warnings } = await generateSW({
	globDirectory: 'dist',
	globPatterns: ['**/*.{css,js,html,svg,png,webp,woff,woff2,webmanifest}'],
	swDest: 'dist/sw.js',
	cleanupOutdatedCaches: true,
	clientsClaim: true,
	skipWaiting: true,
	navigateFallback: undefined,
});

for (const warning of warnings) console.warn(warning);
console.log(`Service worker: ${count} files, ${Math.round(size / 1024)} KiB precached for ${base}.`);
