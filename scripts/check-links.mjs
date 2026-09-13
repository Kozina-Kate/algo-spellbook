import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, normalize, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url);
const BASE = '/algo-spellbook/';

async function walk(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const nested = await Promise.all(entries.map((entry) => {
		const path = join(directory, entry.name);
		return entry.isDirectory() ? walk(path) : [path];
	}));
	return nested.flat();
}

function targetFile(rawUrl, htmlFile) {
	const clean = rawUrl.split('#')[0].split('?')[0];
	if (!clean || /^(?:https?:|mailto:|tel:|data:|javascript:)/.test(clean)) return null;

	let path;
	if (clean.startsWith(BASE)) {
		path = clean.slice(BASE.length);
	} else if (clean.startsWith('/')) {
		path = clean.slice(1);
	} else {
		path = normalize(join(dirname(relative(DIST.pathname, htmlFile)), clean));
	}

	if (path.endsWith('/')) return join(DIST.pathname, path, 'index.html');
	const direct = join(DIST.pathname, path);
	if (extname(path)) return direct;
	return existsSync(direct) ? direct : join(direct, 'index.html');
}

const files = await walk(DIST.pathname);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const failures = [];

for (const file of htmlFiles) {
	const html = await readFile(file, 'utf8');
	for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
		const target = targetFile(match[1], file);
		if (target && !existsSync(target)) {
			failures.push(`${relative(DIST.pathname, file)} → ${match[1]}`);
		}
	}
}

if (failures.length) {
	console.error(`Broken local links (${failures.length}):\n${failures.join('\n')}`);
	process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files: all local links and assets resolve.`);
