---
title: "6. Массивы и строки"
description: "Индексы, length, изменение массивов и основные методы массивов и строк."
---

Массив хранит упорядоченную последовательность значений. Строка хранит последовательность символов. Обе структуры поддерживают индексы и свойство `length`, поэтому многие приёмы обхода похожи.

## Создание и чтение массива

```js
const numbers = [10, 20, 30];

console.log(numbers[0]);     // 10
console.log(numbers[2]);     // 30
console.log(numbers.length); // 3
```

Индекс первого элемента — `0`. Обращение к индексу за границей возвращает `undefined`:

```js
console.log(numbers[3]); // undefined
```

## Изменение массива

`const` запрещает переназначить переменную, но не делает сам массив неизменяемым.

```js
const stack = [1, 2];

stack.push(3);       // добавляет в конец, возвращает новую длину
const last = stack.pop(); // удаляет последний элемент и возвращает его

console.log(stack); // [1, 2]
console.log(last);  // 3
```

Основные операции:

| Запись | Что делает | Меняет исходный массив |
| --- | --- | --- |
| `arr.push(value)` | добавляет в конец | да |
| `arr.pop()` | удаляет с конца | да |
| `arr.slice(start, end)` | создаёт копию участка | нет |
| `arr.includes(value)` | проверяет наличие | нет |
| `arr.indexOf(value)` | возвращает индекс или `-1` | нет |
| `arr.join(separator)` | собирает строку | нет |

`slice` берёт `start`, но не включает `end`:

```js
const values = [5, 10, 15, 20];
const middle = values.slice(1, 3);
console.log(middle); // [10, 15]
```

## Строки

```js
const word = "code";

console.log(word[0]);     // "c"
console.log(word.length); // 4
console.log(word.slice(1, 3)); // "od"
```

Строка неизменяема: отдельный символ нельзя заменить присваиванием.

```js
const word = "code";
word[0] = "n"; // строка не станет "node"
```

Чтобы получить изменённый текст, создают новую строку.

## split и join

```js
const letters = "code".split("");
console.log(letters); // ["c", "o", "d", "e"]

const word = letters.join("-");
console.log(word); // "c-o-d-e"
```

- `split(separator)` делит строку и возвращает массив;
- `join(separator)` соединяет элементы массива в строку.

Пустой разделитель `""` означает деление или соединение по отдельным символам без промежутков.

## Перебор по индексам

Индекс нужен, когда важна позиция или требуется изменить элемент массива.

```js
function doubleNumbers(numbers) {
  const result = [];

  for (let index = 0; index < numbers.length; index += 1) {
    result.push(numbers[index] * 2);
  }

  return result;
}
```

`result` — новый массив. `push` добавляет очередное удвоенное число. Исходный массив остаётся прежним.

## Сортировка чисел

```js
const numbers = [10, 2, 30];
numbers.sort((a, b) => a - b);
console.log(numbers); // [2, 10, 30]
```

Без функции `(a, b) => a - b` метод `sort` сравнивает строковые представления и поставит `10` перед `2`. Стрелочную функцию подробно запоминать пока не нужно: воспринимайте её как правило числового сравнения. `sort` изменяет исходный массив.

## Предскажите результат

```js
const values = [3, 6, 9];
const part = values.slice(0, 2);
part.push(12);

console.log(values);
console.log(part);
```

<details>
<summary>Ответ</summary>

`values` останется `[3, 6, 9]`. `slice` создал новый массив `[3, 6]`, затем `push` изменил только его: `part` станет `[3, 6, 12]`.

</details>

## Практика: Reversed Strings

Решите существующую задачу [Reversed Strings на Codewars](https://www.codewars.com/kata/5168bb5dfe9a00b126000018/javascript): функция получает строку и возвращает её символы в обратном порядке.

Сначала попробуйте цикл. Затем сравните с вариантом на методах.

<details>
<summary>Решение циклом</summary>

```js
function reverseString(text) {
  let result = "";

  for (let index = text.length - 1; index >= 0; index -= 1) {
    result += text[index];
  }

  return result;
}
```

Цикл начинается с последнего допустимого индекса `length - 1` и движется к нулю. На каждом шаге символ добавляется в новую строку.

</details>

<details>
<summary>Решение методами</summary>

```js
function reverseString(text) {
  return text.split("").reverse().join("");
}
```

`split("")` создаёт массив символов, `reverse()` меняет порядок элементов массива, `join("")` собирает новую строку.

</details>

## Типичные ошибки

- считать, что первый индекс равен `1`;
- обращаться к `array[array.length]` вместо `array[array.length - 1]`;
- ожидать, что `slice` изменит исходный массив;
- забыть, что `sort` и `reverse` изменяют массив;
- сортировать числа через `sort()` без компаратора;
- пытаться заменить символ строки по индексу.

## Проверьте себя

- [ ] Я могу создать массив и прочитать элемент по индексу.
- [ ] Я понимаю связь между `length` и последним индексом.
- [ ] Я различаю изменяющие и неизменяющие методы.
- [ ] Я могу пройти по массиву и построить новый результат.
- [ ] Я умею преобразовать строку в массив символов и обратно.

## Источник

- [Индексированные коллекции — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections)

## Дальше

→ [Объекты, Map и Set](../js-07-obekty-map-set/)

← [Функции](../js-05-funkcii/)
