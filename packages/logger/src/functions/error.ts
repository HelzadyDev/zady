import { colors } from "../core/colors";
import { formatMenssage } from "../core/formatter";
import { nativeConsole } from "../core/nativeConsole";
import { ErrorOptions } from "../core/types";
import { defaults } from "../settings/defaults";
import { exitProcess } from "../utils/process";

function getErrorCode(error: unknown): unknown {
  if (error !== null && typeof error === "object" && "code" in error) {
   const code = (error as { code?: unknown }).code;
    return typeof code === "number" ? code : undefined;
  }

  return undefined;
}


/**
 * Exibe um erro formatado. Encerra o processo apenas quando um `code`
 * (explícito ou vindo de `error.code`) é fornecido.
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
 * // Com "code": loga, mostra a stack e encerra o processo com esse código
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

  const exitCode =
      typeof code === "number"
        ? code
        : getErrorCode(error);

  const customParams = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined),
  );

  // Exibe mensagen formatada
  nativeConsole.error(formatMenssage(message, prefix, colors.red, timestamp));

  if (Object.keys(customParams).length > 0) {
    nativeConsole.error(customParams);
  }

  // Exibe stack trace se existir
  if (showStack && error instanceof Error) {
    nativeConsole.error(error.stack);
  }

  // Encerra o processo
  if(typeof exitCode === "number"){
    exitProcess(exitCode);
  }
}