import {
    colors,
    bgColors,
    terminalStyle,
    logger,
} from "#packages";

// ── log.ts ──────────────────────────────────────────────
logger.divider("=", 50);
console.log("log()");
logger.divider("=", 50);

logger.log("Mensagem comum");
logger.log("Mensagem com timestamp", { timestamp: true });
logger.log("Mensagem com prefixo customizado", { prefix: "CUSTOM" });

// ── info.ts ─────────────────────────────────────────────
logger.divider("=", 50);
console.log("info()");
logger.divider("=", 50);

logger.info("Servidor iniciado na porta 3000");
logger.info("Cache carregado com sucesso", { timestamp: true });
logger.info("Modo de manutenção ativo", { prefix: "MAINTENANCE" });

// ── warn.ts ─────────────────────────────────────────────
logger.divider("=", 50);
console.log("warn()");
logger.divider("=", 50);

logger.warn("Variável de ambiente não definida");
logger.warn("Uso de memória acima do esperado", { timestamp: true });
logger.warn("Chave de API expirando em breve", { prefix: "API" });

// ── success.ts ──────────────────────────────────────────
logger.divider("=", 50);
console.log("success()");
logger.divider("=", 50);

logger.success("Conexão estabelecida");
logger.success("Backup concluído", { timestamp: true });
logger.success("Deploy finalizado", { prefix: "DEPLOY" });

// ── Debug.ts ────────────────────────────────────────────
logger.divider("=", 50);
console.log("debug()  (rode com DEBUG=true para ver a saída)");
logger.divider("=", 50);

logger.debug("Valor calculado: 42");
logger.debug("Payload recebido", { timestamp: false });

// ── error.ts ────────────────────────────────────────────
logger.divider("=", 50);
console.log("error()  (sem 'code', não encerra o processo)");
logger.divider("=", 50);

logger.error("Variável de ambiente ausente");
logger.error("Falha ao validar payload", { userId: 123, route: "/api/users" });

// Com "code" o processo é encerrado — descomente para testar isoladamente:
// logger.error("Não foi possível conectar ao banco", {
//   code: 1,
//   error: new Error("timeout"),
//   showStack: true,
//   timestamp: true,
// });

// ── logger.divider.ts ──────────────────────────────────────────
console.log("\ndivider()");
logger.divider();
logger.divider("=", 20);
logger.divider("*", 10);

// ── timer.ts ────────────────────────────────────────────
logger.divider("=", 50);
console.log("timer()");
logger.divider("=", 50);

const task = logger.timer("consulta ao banco");
await new Promise((resolve) => setTimeout(resolve, 300));
task.stop("Consulta concluída");

const otherTask = logger.timer("processamento de fila");
await new Promise((resolve) => setTimeout(resolve, 150));
otherTask.stop();

// ── core/colors.ts, core/terminalStyle.ts ──────────────
logger.divider("=", 50);
console.log("colors, bgColors, terminalStyle");
logger.divider("=", 50);

console.log(`${colors.cyan}Texto ciano${terminalStyle.reset}`);
console.log(`${bgColors.red}Fundo vermelho${terminalStyle.reset}`);
console.log(`${terminalStyle.negrito}Texto em negrito${terminalStyle.reset}`);
console.log(`${terminalStyle.italico}Texto em itálico${terminalStyle.reset}`);
console.log(`${terminalStyle.sublinhado}Texto sublinhado${terminalStyle.reset}`);
console.log(`${terminalStyle.riscado}Texto riscado${terminalStyle.reset}`);

// ── patch.ts ────────────────────────────────────────────
// Por último, pois substitui os métodos globais do console.
logger.divider("=", 50);
console.log("patchConsole()");
logger.divider("=", 50);

logger.patchConsole();

console.log("mensagem comum (agora formatada)");
console.warn("aviso (agora formatado)");
console.error("erro (agora formatado)");
console.info("info (agora formatado)");
console.debug("debug (só aparece com DEBUG=true, se requireDebugEnv=true)");