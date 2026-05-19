# Zady

Logger leve para Node.js com saída colorida no terminal.

---

## 📦 Instalação

```bash
npm install @helzady/zady
```

---

## 🚀 Uso

```ts
import zady from "@helzady/zady";

zady.log("Mensagem de debug");
zady.info("Servidor iniciado na porta 3000");
zady.warn("Variável de ambiente não definida");
zady.success("Conexão estabelecida");
zady.error("Falha crítica", { error: new Error("stack trace aqui") });
zady.debug("Valor da variável x: 42");
zady.divider();
zady.timer("query ao banco");
```

Ou com destructuring:

```ts
import { log, info, warn, success, error, debug, divider, timer } from "@helzady/zady";
```

---

## 🧾 Saída

```bash
[18/05/2026 14:00] [LOG]     Mensagem de debug
[18/05/2026 14:00] [INFO]    Servidor na porta 3000
[18/05/2026 14:00] [WARN]    Variável de ambiente não definida
[18/05/2026 14:00] [SUCCESS] Conexão estabelecida
[18/05/2026 14:00] [ERROR]   Falha crítica
[18/05/2026 14:00] [DEBUG]   Valor da variável x: 42
────────────────────────────────────────
[18/05/2026 14:00] [TIMER]   query ao banco — 42.31ms
```

> As cores e o formato dos logs são aplicados via ANSI no terminal.

---

## 📌 Funções disponíveis

| Função                       | Prefixo   | Cor      | Descrição                                          |
| ---------------------------- | --------- | -------- | -------------------------------------------------- |
| `log(message)`               | `LOG`     | Cinza    | Debug e mensagens de desenvolvimento               |
| `info(message)`              | `INFO`    | Azul     | Informações relevantes do sistema                  |
| `warn(message)`              | `WARN`    | Amarelo  | Avisos que não encerram o processo                 |
| `success(message)`           | `SUCCESS` | Verde    | Confirmação de operações bem-sucedidas             |
| `error(message, options?)`   | `ERROR`   | Vermelho | Erro crítico — **encerra o processo**              |
| `debug(message)`             | `DEBUG`   | Magenta  | Log condicional — só exibe quando `DEBUG=true`     |
| `divider(char?, length?)`    | —         | Cinza    | Linha separadora no terminal                       |
| `timer(label)`               | `TIMER`   | Ciano    | Mede o tempo de uma operação                       |

---

## ⚙️ Opções da função `error`

A função `error` aceita um segundo argumento com as seguintes opções:

```ts
error("Mensagem de erro", {
  code?: number       // código de saída do processo (padrão: 1)
  prefix?: string     // prefixo customizado (padrão: "ERROR")
  showStack?: boolean // exibir stack trace (padrão: true)
  timestamp?: boolean // exibir data/hora (padrão: true)
  error?: unknown     // objeto de erro para exibir o stack
})
```

Exemplo:

```ts
try {
  // ...
} catch (err) {
  error("Falha ao conectar ao banco", {
    code: 1,
    error: err,
    showStack: true,
  });
}
```

---

## 🐛 Debug

A função `debug` só exibe logs quando a variável de ambiente `DEBUG=true` estiver ativa:

```ts
debug("Valor da variável x: 42");
```

```bash
DEBUG=true node app.js
```

---

## ─ Divider

Imprime uma linha separadora para organizar a saída do terminal:

```ts
divider()          // ────────────────────────────────────────
divider("=", 20)   // ====================
divider("*", 10)   // **********
```

---

## ⏱ Timer

Mede o tempo de execução de uma operação:

```ts
const t = timer("query ao banco");

await db.query("SELECT ...");

t.stop("Query concluída");
// → [TIMER] Query concluída — 42.31ms

// ou sem mensagem
t.stop();
// → [TIMER] query ao banco — 42.31ms
```

---

## 🎨 Estilos

A lib também expõe utilitários de estilo ANSI para uso direto no terminal:

```ts
import zady from "@helzady/zady";

const { colors, bgColors, terminalStyle } = zady.style;

console.log(`${colors.cyan}Texto ciano${terminalStyle.reset}`);
console.log(`${bgColors.red}Fundo vermelho${terminalStyle.reset}`);
```

### `colors`

`black` · `red` · `green` · `yellow` · `blue` · `magenta` · `cyan` · `white` · `gray`

### `bgColors`

`black` · `red` · `green` · `yellow` · `blue` · `magenta` · `cyan` · `white`

### `terminalStyle`

`reset` · `negrito` · `fraco` · `italico` · `sublinhado` · `riscado`

---

## 📄 Licença

MIT — [HelzadyDev](https://github.com/HelzadyDev)