// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const isMobileBuild = process.env.CAPACITOR === 'true';
const base = isMobileBuild ? '/' : '/algo-spellbook';

// https://astro.build/config
export default defineConfig({
	site: isMobileBuild ? 'https://localhost' : 'https://kozina-kate.github.io',
	base,
	output: 'static',
	integrations: [
		starlight({
			title: 'Algo Spellbook',
			description: 'Пошаговый курс по алгоритмам и структурам данных на JavaScript',
			favicon: '/favicon.svg',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Русский', lang: 'ru' },
			},
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#07111f' } },
				{ tag: 'meta', attrs: { name: 'application-name', content: 'Algo Spellbook' } },
				{ tag: 'link', attrs: { rel: 'manifest', href: `${base}/manifest.webmanifest`.replace('//', '/') } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${base}/apple-touch-icon.png`.replace('//', '/') } },
				{ tag: 'script', attrs: { src: `${base}/register-sw.js`.replace('//', '/'), defer: true } },
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Kozina-Kate/algo-spellbook' }],
			components: { Footer: './src/components/Footer.astro' },
			sidebar: [
				{
					label: 'Старт',
					items: [
						{ label: 'О курсе', slug: 'index' },
						{ label: 'Сложность алгоритмов', slug: 'slozhnost-algoritmov' },
						{ label: 'Структуры данных в JS', slug: 'struktury-dannyh-v-js' },
					],
				},
				{
					label: 'Массивы и строки',
					items: [
						{ label: 'Хеш-таблицы', slug: 'hesh-tablicy' },
						{ label: 'Два указателя', slug: 'dva-ukazatelja' },
						{ label: 'Скользящее окно', slug: 'skolzjashhee-okno' },
						{ label: 'Префиксные суммы', slug: 'prefiksnye-summy' },
						{ label: 'Бинарный поиск', slug: 'binarnyj-poisk' },
						{ label: 'Сортировки и интервалы', slug: 'sortirovki-i-intervaly' },
						{ label: 'Строки', slug: 'stroki' },
					],
				},
				{
					label: 'Структуры данных',
					items: [
						{ label: 'Стек и очередь', slug: 'stek-i-ochered' },
						{ label: 'Связные списки', slug: 'svjaznye-spiski' },
						{ label: 'Деревья', slug: 'derevja' },
						{ label: 'Графы', slug: 'grafy' },
						{ label: 'Жадные алгоритмы и куча', slug: 'zhadnye-algoritmy-i-kucha' },
					],
				},
				{
					label: 'Перебор и оптимизация',
					items: [
						{ label: 'Рекурсия и backtracking', slug: 'rekursija-i-backtracking' },
						{ label: 'Динамическое программирование', slug: 'dinamicheskoe-programmirovanie' },
					],
				},
				{
					label: 'Навык распознавания',
					items: [
						{ label: 'Как распознать тип задачи', slug: 'kak-raspoznat-tip-zadachi' },
						{ label: 'Тренажёр паттернов', slug: 'raspoznavanie-patterna-po-usloviju' },
					],
				},
				{
					label: 'На телефоне',
					items: [{ label: 'Установить приложение', slug: 'mobile' }],
				},
			],
		}),
	],
});
