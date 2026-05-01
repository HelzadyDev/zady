# zady

Biblioteca leve para logs no Node.js com suporte a cores, prefixos, timestamp e controle de erros.

---

## 📦 Instalação

```bash
npm install zady
```

---

## 🚀 Uso básico

```ts
// Importa funções da biblioteca
import { log, warn, error, success, crash } from "@helzady/logger"

// Log padrão
log("Mensagem simples")

// Aviso
warn("Atenção")

// Erro
error("Algo deu errado")

// Sucesso
success("Operação concluída")

// Erro fatal (encerra o processo)
crash("Erro crítico")
```

---

## ⚙️ Opções do crash

```ts
crash("Erro crítico", {
  code: 1, // Código de saída do processo
  prefix: "FATAL", // Prefixo da mensagem
  showStack: true, // Mostrar stack trace
  timestamp: true, // Mostrar data/hora
  error: new Error("Detalhes do erro") // Objeto de erro
})
```

---

## 🎨 Recursos

* Logs coloridos (ANSI)
* Prefixos personalizados
* Timestamp formatado (DD/MM/YYYY HH:mm)
* Stack trace opcional
* Encerramento seguro do processo

---

## 📁 Estrutura

```
src/
 ├── core/        # Núcleo (formatter, colors, types)
 ├── functions/   # Funções principais (log, error, etc)
 ├── utils/       # Utilitários internos
 ├── config/      # Configurações padrão
 └── index.ts     # Entry point
```

---

## 📄 Licença

MIT License
