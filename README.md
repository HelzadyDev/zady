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
import zady from "@helzady/zady"

zady.log("Mensagem de debug")
zady.info("Servidor iniciado na porta 3000")
zady.warn("Variável de ambiente não definida")
zady.success("Conexão estabelecida")
zady.error("Falha crítica", { error: new Error("stack trace aqui") })
```

Ou com destructuring:

```ts
import { log, info, warn, success, error } from "@helzady/zady"
```

---

## 🧾 Saída

```bash
[18/05/2026 14:00] [LOG]     Mensagem de debug        # cinza
[18/05/2026 14:00] [INFO]    Servidor na porta 3000   # azul
[18/05/2026 14:00] [WARN]    Variável não definida    # amarelo
[18/05/2026 14:00] [SUCCESS] Conexão estabelecida     # verde
[18/05/2026 14:00] [ERROR]   Falha crítica            # vermelho
```

---

## 📌 Funções disponíveis

| Função | Prefix | Cor | Descrição |
|---|---|---|---|
| `log(message)` | `LOG` | Cinza | Debug e mensagens de desenvolvimento |
| `info(message)` | `INFO` | Azul | Informações relevantes do sistema |
| `warn(message)` | `WARN` | Amarelo | Avisos que não encerram o processo |
| `success(message)` | `SUCCESS` | Verde | Confirmação de operações bem-sucedidas |
| `error(message, options?)` | `ERROR` | Vermelho | Erro crítico — **encerra o processo** |

---

## ⚙️ Opções da função `error`

A função `error` aceita um segundo argumento com as seguintes opções:

```ts
error("Mensagem de erro", {
  code?: number      // código de saída do processo (padrão: 1)
  prefix?: string    // prefixo customizado (padrão: "ERROR")
  showStack?: boolean // exibir stack trace (padrão: true)
  timestamp?: boolean // exibir data/hora (padrão: true)
  error?: unknown    // objeto de erro para exibir o stack
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
  })
}
```

---

## 🎨 Estilos

A lib também expõe utilitários de estilo ANSI para uso direto no terminal:

```ts
import zady from "@helzady/zady"

const { colors, bgColors, terminalStyle } = zady.style

console.log(`${colors.cyan}Texto ciano${terminalStyle.reset}`)
console.log(`${bgColors.red}Fundo vermelho${terminalStyle.reset}`)
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