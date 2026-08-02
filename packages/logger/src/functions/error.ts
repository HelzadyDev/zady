import { colors } from "../core/colors";
import { formatMenssage } from "../core/formatter";
import { nativeConsole } from "../core/nativeConsole";
import { terminalStyle } from "../core/terminalStyle";
import { ErrorOptions } from "../core/types";
import { defaults } from "../settings/defaults";
import { exitProcess } from "../utils/process";

// Extrai o codigo de saida do processo (apenas numerico)
function getExitCode(error: unknown): unknown {
  if (error !== null && typeof error === "object" && "code" in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === "number" ? code : undefined;
  }

  return undefined;
}

// Extrai o 'code' do erro de forma segura, aceitando string ou number
function getErrorCode(error: unknown): string | number | undefined {
  if (error === null || typeof error !== "object" || !("code" in error)) {
    return undefined;
  }
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" || typeof code === "number"
    ? code
    : undefined;
}

/**
 * Exibe um erro formatado. Encerra o processo apenas quando um `code`
 * numérico (explícito em `options.code` ou vindo de `error.code`) é fornecido.
 * Se `error.code` existir (string ou number), ele é exibido no log,
 * independente de encerrar o processo ou não.
 *
 * @example
 * ```ts
 * import { logger } from "@zady/logger";
 *
 * // Sem "code": apenas loga, o processo continua normalmente
 * logger.error("Variável de ambiente ausente");
 *
 * // Com metadados extras (impressos como objeto após a mensagem)
 * logger.error("Falha ao validar payload", { userId: 123, route: "/api/users" });
 *
 * // error.code textual (ex: Node.js, Prisma): é exibido, mas NÃO encerra o processo
 * try {
 *   await fs.readFile("arquivo-inexistente.txt");
 * } catch (err) {
 *   // err.code === "ENOENT"
 *   logger.error("Arquivo não encontrado", { error: err });
 *   // Code: ENOENT
 * }
 *
 * // Com "code" numérico explícito: loga, mostra a stack e encerra o processo com esse código
 * try {
 *   throw new Error("Falha ao conectar ao banco");
 * } catch (err) {
 *   logger.error("Não foi possível conectar ao banco", {
 *     code: 1,
 *     error: err,
 *     showStack: true,
 *     timestamp: true,
 *   });
 * }
 * ```
 */
export function error(message: string, options: ErrorOptions = {}): void {
  const {
    code,
    prefix = "ERROR",
    showStack = defaults.showStack,
    timestamp = defaults.timeStamp,
    error,
    ...metadata
  } = options;

  const exitCode = typeof code === "number" ? code : getExitCode(error);

  const errorCode = getErrorCode(error);

  const customParams = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined),
  );

  // Exibe mensagen formatada
  nativeConsole.error(formatMenssage(message, prefix, colors.red, timestamp));

  if (errorCode !== undefined) {
    nativeConsole.error(
      `${colors.red}code:${terminalStyle.reset} ${errorCode}`,
    );
  }

  if (Object.keys(customParams).length > 0) {
    nativeConsole.error(customParams);
  }

  // Exibe stack trace se existir
  if (showStack && error instanceof Error) {
    nativeConsole.error(error.stack);
  }

  // Encerra o processo
  if (typeof exitCode === "number") {
    exitProcess(exitCode);
  }
}
