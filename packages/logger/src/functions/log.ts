import { colors } from "../core/colors"
import { formatMenssage } from "../core/formatter"
import { nativeConsole } from "../core/nativeConsole"
import { LogOptions } from "../core/types"

/**
 * Log padrão (nível info). Não exibe timestamp por padrão.
 *
 * @example
 * ```ts
 * import { logger } from "@zady/logger";
 *
 * logger.log("Mensagem comum");
 * logger.log("Mensagem com timestamp", { timestamp: true });
 * logger.log("Mensagem com prefixo customizado", { prefix: "CUSTOM" });
 * ```
 */
export function log(message: string, options: LogOptions = {}): void{
    const {prefix = "LOG", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.gray, timestamp))
}