import { colors } from "../core/colors"
import { formatMenssage } from "../core/formatter"
import { nativeConsole } from "../core/nativeConsole"
import { LogOptions } from "../core/types"


/**
 * Exibe uma mensagem de sucesso (prefixo "SUCCESS" por padrão).
 *
 * @example
 * ```ts
 * import { logger } from "@zady/logger";
 *
 * logger.success("Conexão estabelecida");
 * logger.success("Backup concluído", { timestamp: true });
 * logger.success("Deploy finalizado", { prefix: "DEPLOY" });
 * ```
 */
export function success(message: string, options: LogOptions = {}): void {
    const {prefix = "SUCCESS", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.green, timestamp))
}