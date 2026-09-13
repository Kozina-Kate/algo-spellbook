# Algo Spellbook

Открытый пошаговый курс по алгоритмам и структурам данных на JavaScript.

- 18 учебных глав: от O-нотации до динамического программирования.
- Поиск, адаптивная вёрстка и офлайн-режим PWA.
- Статическая сборка Astro + Starlight для GitHub Pages.
- Capacitor-ready архитектура для будущих приложений iOS и Android.

После публикации сайт будет доступен по адресу:
<https://kozina-kate.github.io/algo-spellbook/>

## Разработка

Нужен Node.js 22.19 или новее. Рекомендуемая версия зафиксирована в `.nvmrc`
и секции `volta` в `package.json`.

```bash
nvm use
npm install
npm run dev
```

Проверки перед коммитом:

```bash
npm run check
npm run build
npm run check:links
npm run build:mobile
```

Главы курса лежат в `src/content/docs`. Конфигурация навигации, GitHub Pages и
PWA — в `astro.config.mjs`. Подготовка нативных проектов описана в
[`MOBILE.md`](./MOBILE.md).

## Публикация

Workflow `.github/workflows/deploy.yml` собирает и публикует сайт при каждом
push в `main`. В настройках репозитория GitHub Pages источником должен быть
выбран **GitHub Actions**.

## Лицензия

[MIT](./LICENSE)
