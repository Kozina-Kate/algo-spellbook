import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDirectory = path.join(projectRoot, 'src', 'content', 'docs');

const algorithmLessons = [
	'slozhnost-algoritmov.md',
	'struktury-dannyh-v-js.md',
	'hesh-tablicy.md',
	'dva-ukazatelja.md',
	'skolzjashhee-okno.md',
	'prefiksnye-summy.md',
	'binarnyj-poisk.md',
	'sortirovki-i-intervaly.md',
	'stroki.md',
	'stek-i-ochered.md',
	'svjaznye-spiski.md',
	'derevja.md',
	'grafy.md',
	'zhadnye-algoritmy-i-kucha.md',
	'rekursija-i-backtracking.md',
	'dinamicheskoe-programmirovanie.md',
	'kak-raspoznat-tip-zadachi.md',
	'raspoznavanie-patterna-po-usloviju.md',
];

const errors = [];

for (const fileName of algorithmLessons) {
	const filePath = path.join(docsDirectory, fileName);
	const content = await readFile(filePath, 'utf8');

	if (!content.includes(':::note[Перед началом]')) {
		errors.push(`${fileName}: нет блока «Перед началом».`);
	}

	if (!content.includes('**Маршрут') || !content.includes('прост')) {
		errors.push(`${fileName}: нет маршрута от простого решения к новому паттерну.`);
	}

	if (!content.includes('../kak-rabotat-s-algoritmicheskoy-glavoy/')) {
		errors.push(`${fileName}: нет ссылки на общую памятку чтения разборов.`);
	}

	if (!/\.\.\/js-\d{2}-/.test(content)) {
		errors.push(`${fileName}: нет ссылки хотя бы на один базовый урок JavaScript.`);
	}
}

if (errors.length > 0) {
	console.error(`Проверка алгоритмических глав не пройдена (${errors.length}):`);
	for (const error of errors) console.error(`- ${error}`);
	process.exit(1);
}

console.log(`Checked ${algorithmLessons.length} algorithm lessons: beginner bridges are present.`);
