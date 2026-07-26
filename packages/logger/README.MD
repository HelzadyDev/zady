# Zady Logger

Instale com

```
npm install @zady/logger
```
```
yarn add @zady/logger
```

Um logger simples e poderoso para Node.js, com saídas formatadas no console, tratamento de erros e utilitários focados no desenvolvedor.

## Uso básico

```ts
import { logger } from "@zady/logger";

logger.log("Mensagem comum");
logger.info("Servidor iniciado na porta 3000");
logger.warn("Uso de memória acima do esperado");
logger.success("Deploy finalizado");
logger.error("Falha ao validar payload");
```

## Log

```ts
import { logger } from "@zady/logger";

// log() — nível padrão
logger.log("Mensagem comum");
logger.log("Mensagem com timestamp", { timestamp: true });
logger.log("Mensagem com prefixo customizado", { prefix: "CUSTOM" });

// info()
logger.info("Servidor iniciado na porta 3000");
logger.info("Cache carregado com sucesso", { timestamp: true });

// warn()
logger.warn("Variável de ambiente não definida");
logger.warn("Chave de API expirando em breve", { prefix: "API" });

// success()
logger.success("Conexão estabelecida");
logger.success("Backup concluído", { timestamp: true });
```

## Debug

`debug()` só imprime quando a variável de ambiente `DEBUG` é exatamente `"true"`.

```ts
import { logger } from "@zady/logger";

// Rode com: DEBUG=true node app.js
logger.debug("Valor calculado: 42");
```

## Erros

`error()` loga normalmente. Só encerra o processo (`process.exit`) quando um `code` é passado (explícito ou vindo de `error.code`).

```ts
import { logger } from "@zady/logger";

// Sem "code": apenas loga, o processo continua
logger.error("Variável de ambiente ausente");

// Com metadados extras (impressos como objeto após a mensagem)
logger.error("Falha ao validar payload", { userId: 123, route: "/api/users" });

// Com "code": loga, mostra a stack e encerra o processo com esse código
try {
  throw new Error("Falha ao conectar ao banco");
} catch (err) {
  logger.error("Não foi possível conectar ao banco", {
    code: 1,
    error: err,
    showStack: true,
    timestamp: true,
  });
}
```

## Divisor

```ts
import { logger } from "@zady/logger";

logger.divider();          // ──────────────────────────────────────
logger.divider("=", 20);   // ====================
logger.divider("*", 10);   // **********
```

## Timer

Mede o tempo decorrido de uma operação.

```ts
import { logger } from "@zady/logger";

const task = logger.timer("consulta ao banco");
// await db.query("SELECT ...");
task.stop("Consulta concluída");
// [26/07/2026 14:32][TIMER] Consulta concluída — 42.10ms
```

## Patch no console nativo

Substitui `console.log/warn/error/info/debug` por versões formatadas do zady.

```ts
import { logger } from "@zady/logger";

logger.patchConsole();

console.log("mensagem comum");   // agora sai formatada
console.warn("aviso");
console.error("erro");
```

Também é possível ativar só alguns métodos:

```ts
logger.patchConsole({
  log: true,
  warn: true,
  error: false,
  info: true,
  debug: true,
  requireDebugEnv: true, // console.debug só imprime com DEBUG=true
});
```

## Cores e estilos de terminal

```ts
import { colors, bgColors, terminalStyle } from "@zady/logger";

console.log(`${colors.cyan}Texto ciano${terminalStyle.reset}`);
console.log(`${bgColors.red}Fundo vermelho${terminalStyle.reset}`);
console.log(`${terminalStyle.negrito}Texto em negrito${terminalStyle.reset}`);
console.log(`${terminalStyle.sublinhado}Texto sublinhado${terminalStyle.reset}`);
```

## API completa

| Módulo         | Função/Export                                      | Descrição                                                                 |
|----------------|-----------------------------------------------------|----------------------------------------------------------------------------|
| `functions`    | `logger.log(message, options?)`                     | Log padrão (nível info), sem timestamp por padrão                          |
| `functions`    | `logger.info(message, options?)`                     | Mensagem informativa (prefixo `INFO`)                                      |
| `functions`    | `logger.warn(message, options?)`                     | Aviso (prefixo `WARN`)                                                     |
| `functions`    | `logger.success(message, options?)`                  | Mensagem de sucesso (prefixo `SUCCESS`)                                    |
| `functions`    | `logger.debug(message, options?)`                    | Log de debug, só exibido quando `DEBUG=true`                               |
| `functions`    | `logger.error(message, options?)`                    | Loga um erro; encerra o processo se `code` for informado                   |
| `functions`    | `logger.divider(char?, length?)`                     | Imprime uma linha separadora no terminal                                   |
| `functions`    | `logger.timer(label): TimerResult`                   | Mede o tempo decorrido; retorna `{ stop(label?) }`                         |
| `functions`    | `logger.patchConsole(options?)`                      | Substitui os métodos nativos do `console` por versões formatadas           |
| `core`         | `colors`                                             | Cores ANSI de texto para uso no terminal                                   |
| `core`         | `bgColors`                                           | Cores ANSI de fundo para uso no terminal                                   |
| `core`         | `terminalStyle`                                      | Estilos ANSI (reset, negrito, itálico, sublinhado, riscado)                |

### Opções comuns (`options?`)

| Campo       | Tipo      | Usado em                                   | Descrição                                  |
|-------------|-----------|---------------------------------------------|---------------------------------------------|
| `prefix`    | `string`  | todas as funções de log                     | Sobrescreve o prefixo padrão (`LOG`, `INFO`...) |
| `timestamp` | `boolean` | todas as funções de log                     | Exibe `[DD/MM/YYYY HH:mm]` antes da mensagem |
| `code`      | `number`  | `error`                                      | Código de saída do processo (`process.exit`) |
| `showStack` | `boolean` | `error`                                      | Exibe o `stack` do erro, se houver           |
| `error`     | `unknown` | `error`                                      | Objeto de erro original (`instanceof Error`) |

## LICENSE

### ISC © [Helzady](https://github.com/HelzadyDev)