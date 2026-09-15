import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDirectory = path.join(projectRoot, 'src', 'content', 'docs');
const reference = await readFile(path.join(docsDirectory, 'spravochnik-javascript.md'), 'utf8');

const requiredSections = [
	'## Переменные и типы',
	'## Условия',
	'## Циклы',
	'## Функции',
	'## Массивы',
	'## Строки',
	'## Объекты',
	'## Map',
	'## Set',
	'## Сортировка',
	'## Стоимость операций',
];

const lessonLinks = new Map([
	['js-01-kak-rabotaet-programma.md', '#быстрый-шаблон-программы'],
	['js-02-peremennye-i-tipy.md', '#переменные-и-типы'],
	['js-03-usloviya-i-operatory.md', '#условия'],
	['js-04-cikly.md', '#циклы'],
	['js-05-funkcii.md', '#функции'],
	['js-06-massivy-i-stroki.md', '#массивы'],
	['js-07-obekty-map-set.md', '#map'],
	['js-08-oshibki-i-otladka.md', '#быстрая-отладка'],
	['js-09-ot-usloviya-k-funkcii.md', '#скелет-решения-задачи'],
]);

const errors = [];

for (const section of requiredSections) {
	if (!reference.includes(section)) {
		errors.push(`spravochnik-javascript.md: нет раздела «${section.slice(3)}».`);
	}
}

for (const [fileName, fragment] of lessonLinks) {
	const lesson = await readFile(path.join(docsDirectory, fileName), 'utf8');
	const expectedLink = `../spravochnik-javascript/${fragment}`;

	if (!lesson.includes(expectedLink)) {
		errors.push(`${fileName}: нет точечной ссылки ${expectedLink}.`);
	}
}

if (/\b(?:TODO|TBD)\b/.test(reference)) {
	errors.push('spravochnik-javascript.md: найден незавершённый маркер TODO/TBD.');
}

if (errors.length > 0) {
	console.error(`Проверка JS-справочника не пройдена (${errors.length}):`);
	for (const error of errors) console.error(`- ${error}`);
	process.exit(1);
}

console.log(`Checked JavaScript reference and ${lessonLinks.size} lesson links.`);
