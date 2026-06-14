# Zady

Logger simples para Node.js com mensagens formatadas, cores ANSI, timer, debug condicional e utilitarios para melhorar a saida do console.

## Instalacao

```bash
npm install @helzady/zady
```

## Uso Rapido

```ts
import zady from "@helzady/zady";

zady.log("Mensagem comum");
zady.info("Servidor iniciado na porta 3000");
zady.warn("Variavel de ambiente nao definida");
zady.success("Conexao estabelecida");
zady.debug("Valor calculado: 42");
zady.divider();

const task = zady.timer("consulta ao banco");
// await db.query("SELECT ...");
task.stop("Consulta concluida");
```

O pacote exporta um objeto padrao com todas as funcoes disponiveis.

## Saida

```txt
[14/06/2026 10:30] [LOG] Mensagem comum
[14/06/2026 10:30] [INFO] Servidor iniciado na porta 3000
[14/06/2026 10:30] [WARN] Variavel de ambiente nao definida
[14/06/2026 10:30] [SUCCESS] Conexao estabelecida
[14/06/2026 10:30] [DEBUG] Valor calculado: 42
----------------------------------------
[14/06/2026 10:30] [TIMER] Consulta concluida - 42.31ms
```

As mensagens usam codigos ANSI para colorir a saida em terminais compativeis.

## API

| Funcao | Descricao |
| --- | --- |
| `log(message)` | Exibe uma mensagem com o prefixo `LOG`. |
| `info(message)` | Exibe uma mensagem informativa com o prefixo `INFO`. |
| `warn(message)` | Exibe um aviso com o prefixo `WARN`. |
| `success(message)` | Exibe uma confirmacao com o prefixo `SUCCESS`. |
| `debug(message)` | Exibe uma mensagem com o prefixo `DEBUG` somente quando `DEBUG=true`. |
| `error(message, options?)` | Exibe um erro formatado e encerra o processo. |
| `divider(char?, length?)` | Exibe uma linha divisoria no terminal. |
| `timer(label)` | Cria um medidor de tempo e retorna um objeto com `stop(label?)`. |
| `patchConsole(options?)` | Substitui metodos do `console` nativo por versoes formatadas. |

## Erros

`error` e uma funcao fatal: depois de imprimir a mensagem, ela encerra o processo com `process.exit`.

```ts
import zady from "@helzady/zady";

try {
  throw new Error("Falha ao conectar");
} catch (err) {
  zady.error("Nao foi possivel conectar ao banco", {
    code: 1,
    error: err,
    showStack: true,
    timestamp: true,
  });
}
```

Opcoes aceitas:

| Opcao | Tipo | Padrao | Descricao |
| --- | --- | --- | --- |
| `code` | `number` | `1` | Codigo usado ao encerrar o processo. |
| `prefix` | `string` | `"ERROR"` | Prefixo exibido na mensagem. |
| `showStack` | `boolean` | `true` | Exibe a stack quando `error` for uma instancia de `Error`. |
| `timestamp` | `boolean` | `true` | Controla a exibicao de data e hora. |
| `error` | `unknown` | `undefined` | Erro original usado para extrair stack e, quando existir, codigo. |

Campos extras tambem podem ser enviados no objeto de opcoes; eles serao impressos como metadados.

## Debug

`debug` so imprime mensagens quando a variavel de ambiente `DEBUG` esta exatamente como `true`.

```bash
DEBUG=true node app.js
```

```ts
import zady from "@helzady/zady";

zady.debug("Esse log so aparece com DEBUG=true");
```

## Timer

```ts
import zady from "@helzady/zady";

const task = zady.timer("upload");

// execute a operacao...

task.stop();
task.stop("Upload finalizado");
```

## Divider

```ts
import zady from "@helzady/zady";

zady.divider();
zady.divider("=", 20);
zady.divider("*", 10);
```

## Patch Do Console

`patchConsole` permite aplicar a formatacao do Zady aos metodos nativos do `console`.

```ts
import zady from "@helzady/zady";

zady.patchConsole();

console.log("mensagem comum");
console.warn("aviso");
console.error("erro");
console.info("info");
console.debug("debug");
```

Voce pode ativar apenas alguns metodos:

```ts
zady.patchConsole({
  log: true,
  warn: true,
  error: false,
  info: true,
  debug: true,
  requireDebugEnv: true,
});
```

| Opcao | Padrao | Descricao |
| --- | --- | --- |
| `log` | `true` | Formata `console.log`. |
| `warn` | `true` | Formata `console.warn`. |
| `error` | `true` | Formata `console.error`. |
| `info` | `true` | Formata `console.info`. |
| `debug` | `true` | Formata `console.debug`. |
| `requireDebugEnv` | `false` | Quando `true`, `console.debug` so imprime com `DEBUG=true`. |

## Estilos ANSI

O export padrao tambem inclui utilitarios de estilo em `zady.style`.

```ts
import zady from "@helzady/zady";

const { colors, bgColors, terminalStyle } = zady.style;

console.log(`${colors.cyan}Texto ciano${terminalStyle.reset}`);
console.log(`${bgColors.red}Fundo vermelho${terminalStyle.reset}`);
console.log(`${terminalStyle.negrito}Texto em negrito${terminalStyle.reset}`);
```

Valores disponiveis:

| Grupo | Chaves |
| --- | --- |
| `colors` | `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray` |
| `bgColors` | `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white` |
| `terminalStyle` | `reset`, `negrito`, `fraco`, `italico`, `sublinhado`, `riscado` |

## Desenvolvimento

```bash
npm run build
npm run check
```

Antes de publicar, o pacote espera os arquivos gerados em `build`.

## Licenca

MIT - [HelzadyDev](https://github.com/HelzadyDev)
