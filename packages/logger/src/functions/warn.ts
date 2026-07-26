import { colors } from "../core/colors"
import { formatMenssage } from "../core/formatter"
import { nativeConsole } from "../core/nativeConsole"
import { LogOptions } from "../core/types"

/**
 * Exibe um aviso (prefixo "WARN" por padrão).
 *
 * @example
 * ```ts
 * import { logger } from "@zady/logger";
 *
 * logger.warn("Variável de ambiente não definida");
 * logger.warn("Uso de memória acima do esperado", { timestamp: true });
 * logger.warn("Chave de API expirando em breve", { prefix: "API" });
 * ```
 */
export function warn(message: string, options: LogOptions = {}): void {
    const {prefix = "WARN", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.yellow, timestamp))
}