import { colors } from "../core/colors"
import { formatMenssage } from "../core/formatter"
import { nativeConsole } from "../core/nativeConsole"
import { LogOptions } from "../core/types"

/**
 * Exibe uma mensagem informativa (prefixo "INFO" por padrão).
 *
 * @example
 * ```ts
 * import { Logger } from "@zady/logger";
 *
 * logger.info("Servidor iniciado na porta 3000");
 * logger.info("Cache carregado com sucesso", { timestamp: true });
 * logger.info("Modo de manutenção ativo", { prefix: "MAINTENANCE" });
 * ```
 */
export function info(message: string, options: LogOptions = {}): void {
    const {prefix = "INFO", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.blue, timestamp))
}