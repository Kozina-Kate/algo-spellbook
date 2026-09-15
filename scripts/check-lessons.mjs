import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDirectory = path.join(projectRoot, 'src', 'content', 'docs');
const fileNames = (await readdir(docsDirectory))
	.filter((fileName) => /^js-\d{2}-.*\.md$/.test(fileName))
	.sort();

const requiredSections = [
	'## Предскажите результат',
	'## Измените код',
	'## Самостоятельная практика',
	'## Типичные ошибки',
	'## Проверьте себя',
	'## Источники',
	'## Дальше',
];

const errors = [];

if (fileNames.length !== 9) {
	errors.push(`Ожидалось 9 базовых уроков, найдено ${fileNames.length}.`);
}

for (const [index, fileName] of fileNames.entries()) {
	const lessonNumber = index + 1;
	const filePath = path.join(docsDirectory, fileName);
	const content = await readFile(filePath, 'utf8');
	const frontmatter = content.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? '';

	if (!/^title: .+$/m.test(frontmatter) || !/^description: .+$/m.test(frontmatter)) {
		errors.push(`${fileName}: нужны title и description во frontmatter.`);
	}

	if (!content.includes(':::note[Перед началом]')) {
		errors.push(`${fileName}: нет блока «Перед началом».`);
	}

	if (!content.includes(`Урок ${lessonNumber} из 9`)) {
		errors.push(`${fileName}: неверный номер урока в блоке «Перед началом».`);
	}

	for (const section of requiredSections) {
		if (!content.includes(section)) {
			errors.push(`${fileName}: нет обязательного раздела «${section.slice(3)}».`);
		}
	}

	const checklistItems = content.match(/^- \[ \] /gm) ?? [];
	if (checklistItems.length < 4) {
		errors.push(`${fileName}: в чеклисте должно быть не меньше четырёх пунктов.`);
	}

	if (!/<details>[\s\S]*?<summary>/.test(content)) {
		errors.push(`${fileName}: нужен скрываемый ответ или решение.`);
	}

	const sourcesSection = content.split('## Источники')[1]?.split('## Дальше')[0] ?? '';
	if (!/https:\/\//.test(sourcesSection)) {
		errors.push(`${fileName}: в разделе источников нужна публичная ссылка.`);
	}

	if (/\b(?:TODO|TBD)\b/.test(content)) {
		errors.push(`${fileName}: найден незавершённый маркер TODO/TBD.`);
	}
}

if (errors.length > 0) {
	console.error(`Проверка учебного формата не пройдена (${errors.length}):`);
	for (const error of errors) console.error(`- ${error}`);
	process.exit(1);
}

console.log(`Checked ${fileNames.length} beginner lessons: structure is consistent.`);
