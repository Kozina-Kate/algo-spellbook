---
title: "7. Объекты, Map и Set"
description: "Хранение данных по ключу, подсчёт частот и проверка уникальности."
---

Массив отвечает на вопрос «какое значение находится на позиции 2?». Объект и `Map` отвечают на другой вопрос: «какое значение связано с ключом `apple`?». `Set` хранит только уникальные значения.

## Объект

Объект объединяет именованные свойства.

```js
const user = {
  name: "Ada",
  solved: 3,
};

console.log(user.name);      // "Ada"
console.log(user["solved"]); // 3
```

- `{ ... }` создаёт объект;
- `name` и `solved` — ключи;
- `"Ada"` и `3` — связанные с ними значения;
- точка используется с заранее известным именем;
- квадратные скобки позволяют взять ключ из переменной.

```js
const key = "solved";
user[key] += 1;
console.log(user.solved); // 4
```

## Частотный словарь

Частотный словарь хранит, сколько раз встретилось каждое значение.

```js
function countLetters(text) {
  const counts = {};

  for (const letter of text) {
    if (counts[letter] === undefined) {
      counts[letter] = 0;
    }

    counts[letter] += 1;
  }

  return counts;
}

console.log(countLetters("level"));
// { l: 2, e: 2, v: 1 }
```

На первой встрече свойства ещё нет, поэтому чтение возвращает `undefined`. Мы создаём счётчик со значением `0`, затем увеличиваем его.

## Map

`Map` тоже хранит пары «ключ → значение», но предоставляет специальные методы и допускает ключи любого типа.

```js
const counts = new Map();

counts.set("a", 1);              // записать значение
counts.set("b", 2);

console.log(counts.get("a"));    // 1
console.log(counts.has("c"));    // false
console.log(counts.size);        // 2

counts.delete("b");
```

### Методы Map

- `new Map()` создаёт пустую карту;
- `set(key, value)` записывает или заменяет значение;
- `get(key)` возвращает значение либо `undefined`;
- `has(key)` проверяет наличие ключа;
- `delete(key)` удаляет пару;
- `size` хранит количество ключей. Это свойство, поэтому круглые скобки не нужны.

Частотный словарь на `Map`:

```js
function countNumbers(numbers) {
  const counts = new Map();

  for (const number of numbers) {
    const oldCount = counts.get(number) ?? 0;
    counts.set(number, oldCount + 1);
  }

  return counts;
}
```

Оператор `??` берёт правую часть только тогда, когда слева `null` или `undefined`. Если ключа ещё нет, `counts.get(number)` возвращает `undefined`, и начальным счётчиком становится `0`.

## Set

`Set` — множество уникальных значений.

```js
const seen = new Set();

seen.add(5);
seen.add(8);
seen.add(5); // повтор не добавится второй раз

console.log(seen.has(8)); // true
console.log(seen.size);   // 2

seen.delete(8);
```

### Методы Set

- `new Set()` создаёт пустое множество;
- `add(value)` добавляет значение;
- `has(value)` проверяет наличие;
- `delete(value)` удаляет значение;
- `size` хранит количество уникальных значений.

## Как выбрать структуру

| Вопрос | Структура |
| --- | --- |
| Важен порядок и доступ по позиции | `Array` |
| Набор известных свойств одной сущности | объект |
| Нужно хранить произвольные пары «ключ → значение» | `Map` |
| Нужно только быстро проверять наличие или уникальность | `Set` |

Для алгоритмических задач `Map` и `Set` особенно важны: поиск через `has` в среднем занимает постоянное время, тогда как `includes` у массива может просмотреть все элементы.

## Предскажите результат

```js
const values = new Set([2, 2, 3, 4, 4]);
values.add(3);
values.add(5);

console.log(values.size);
console.log(values.has(1));
```

<details>
<summary>Ответ</summary>

В множестве останутся `2`, `3`, `4`, `5`, поэтому `size` равен `4`. Значения `1` нет, поэтому `has(1)` вернёт `false`.

</details>

## Практика: Contains Duplicate

Используйте существующую задачу [Contains Duplicate на LeetCode](https://leetcode.com/problems/contains-duplicate/): функция получает массив и возвращает `true`, если какое-либо значение встречается повторно.

<details>
<summary>Решение с Set</summary>

```js
function containsDuplicate(numbers) {
  const seen = new Set();

  for (const number of numbers) {
    if (seen.has(number)) {
      return true;
    }

    seen.add(number);
  }

  return false;
}
```

`seen` хранит уже просмотренные числа. Если очередное число там есть, повтор найден и функция сразу возвращает `true`. Если цикл закончился, все значения были уникальны.

</details>

## Типичные ошибки

- путать `map.get(key)` и `map[key]`;
- писать `set.has[value]` вместо вызова `set.has(value)`;
- увеличивать отсутствующий счётчик и получать `NaN`;
- проверять значение через `if (object[key])`, когда допустимы `0` или `false`;
- использовать объект, когда ключи приходят из произвольных внешних данных;
- ожидать, что `Set` сохранит дубликаты.

## Проверьте себя

- [ ] Я различаю ключ и значение.
- [ ] Я могу прочитать свойство объекта точкой и квадратными скобками.
- [ ] Я знаю основные методы `Map`.
- [ ] Я знаю основные методы `Set`.
- [ ] Я могу выбрать структуру для порядка, подсчёта и уникальности.

## Источники

- [Коллекции по ключам — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections)
- [Работа с объектами — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects)

## Дальше

→ [Ошибки, отладка и тесты](../js-08-oshibki-i-otladka/)

← [Массивы и строки](../js-06-massivy-i-stroki/)
