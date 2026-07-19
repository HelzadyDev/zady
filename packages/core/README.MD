# Zady Core

Instale com

```
npm install @zady/core
```
```
yarn add @zady/core
```

Uma coleção de funções utilitárias simples e leves para tarefas comuns em projetos: validação de dados, formatação de texto e geração/parsing de números.

## Validação

```ts
import { isEmail, isUrl } from "@zady/core";

console.log(isEmail("jhondoe@gmail.com")); // true
console.log(isEmail("jhondoeemail.com"));  // false
console.log(isEmail("jhondoe@email.org")); // true
console.log(isEmail("@gmail.com"));        // false

console.log(isUrl("localhost:3000"));      // false
console.log(isUrl("https://npmjs.com"));   // true
console.log(isUrl("http://github.com"));   // true
console.log(isUrl("github.com"));          // false
```

## Formatação

```ts
import { toNull, notFound, brBuilder, spaceBuilder, replaceText, captalize, limitText } from "@zady/core";

console.log(toNull()); // null
asyncMethod().catch(toNull); // ignora o erro

// value: number | null
const amount = notFound(value); // number | undefined

const text = brBuilder("Olá mundo", "Isso é javascript!");
console.log(text);
// Olá mundo
// Isso é javascript!

const adm = "Rincko";
const action = "promovido";
const message = spaceBuilder("Administrador", adm, "foi", action);
console.log(message); // Administrador Rincko foi promovido

// lang.json
{
    "welcome": {
        "pt-BR": "Olá var(name), seja bem vindo à lib var(libname)",
        "en-US": "Hi var(name), welcome to var(libname) lib"
    }
}
// command.ts
import { replaceText } from "@zady/core";
import lang from "./lang";
// ...

const locale = "pt-BR";

const text = replaceText(lang.welcome[locale], {
    name: user.displayName,   // "Helzady"
    libname: lib.getName()    // "@zady/core"
});

console.log(text); // Olá Helzady, seja bem vindo à lib @zady/core

const capitalizedWord = captalize("olá mundo");
console.log(capitalizedWord); // Olá mundo

const bigText = "Introdução à lib zady/core! Uma lib com muitas funções úteis";
const limitedText = limitText(bigText, 21, "...");
console.log(limitedText); // Introdução à lib zad...
```

## Matemática

```ts
import { random, parseIntOr, parseFloatOr } from "@zady/core";

console.log(random.int(0, 10)); // 7
console.log(random.int(0, 10)); // 8
console.log(random.int(0, 10)); // 10

console.log(random.float(0, 10)); // 7.157077577891795
console.log(random.float(0, 10)); // 1.0842981808087804
console.log(random.float(0, 10)); // 6.304121080765393

console.log(parseIntOr("nan", 2));    // 2
console.log(parseFloatOr("nan", -8)); // -8
console.log(parseIntOr("29.09", 10)); // 29
console.log(parseFloatOr("0.3", 18)); // 0.3
```

## API completa

| Módulo         | Função                                              | Descrição                                                                 |
|----------------|------------------------------------------------------|----------------------------------------------------------------------------|
| `validation.ts`| `isEmail(value: string): boolean`                     | Valida se a string é um e-mail válido                                      |
| `validation.ts`| `isUrl(value: string): boolean`                       | Valida se a string é uma URL `http`/`https` válida                         |
| `text.ts`      | `captalize(text: string): string`                     | Deixa a primeira letra do texto em maiúscula                               |
| `text.ts`      | `limitText(text, max, suffix?): string`               | Limita o tamanho do texto, adicionando um sufixo ao cortar                  |
| `text.ts`      | `brBuilder(...lines: string[]): string`               | Junta linhas de texto separadas por quebra de linha (`\n`)                  |
| `text.ts`      | `spaceBuilder(...parts: string[]): string`            | Junta partes de texto por espaço, ignorando valores vazios/falsy           |
| `text.ts`      | `replaceText(text, values): string`                   | Substitui variáveis `var(nome)` pelos valores de um objeto                  |
| `number.ts`    | `random.int(min, max): number`                        | Gera um inteiro aleatório entre `min` e `max` (inclusivo)                   |
| `number.ts`    | `random.float(min, max): number`                      | Gera um decimal aleatório entre `min` e `max`                              |
| `number.ts`    | `parseIntOr(value, fallback): number`                 | Converte para inteiro ou retorna o fallback se for `NaN`                   |
| `number.ts`    | `parseFloatOr(value, fallback): number`               | Converte para float ou retorna o fallback se for `NaN`                     |
| `misc.ts`      | `toNull(): null`                                      | Retorna sempre `null` — útil como callback de limpeza/erro                 |
| `misc.ts`      | `notFound<T>(value): T \| undefined`                  | Normaliza `null`/`undefined` para `undefined`                              |

## LICENSE

### ISC © [Helzady](https://github.com/HelzadyDev)