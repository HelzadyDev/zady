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
import { log, warn, error, success } from "@helzady/zady"

log("Mensagem padrão")
warn("Aviso")
error("Erro")
success("Sucesso")
```

---

## 🧾 Saída

```bash
[LOG] 01/05/2026 14:00 - Mensagem padrão
[WARN] 01/05/2026 14:00 - Aviso
[ERROR] 01/05/2026 14:00 - Erro
[SUCCESS] 01/05/2026 14:00 - Sucesso
```

---

## 📌 Funções disponíveis

```ts
log(message: string)
warn(message: string)
error(message: string)
success(message: string)
```

---

## ⚙️ Opções (quando disponíveis)

```ts
log("Mensagem", {
  timestamp: true,
  prefix: "CUSTOM"
})
```

---

## 📄 Licença

MIT
