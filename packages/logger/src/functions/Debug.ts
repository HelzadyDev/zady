import { colors } from "../core/colors";
import { formatMenssage } from "../core/formatter";
import { nativeConsole } from "../core/nativeConsole";
import { LogOptions } from "../core/types";

/**
 * Log de debug — só exibe quando a variável de ambiente `DEBUG` é exatamente `"true"`.
 *
 * @example
 * ```ts
 * import { logger } from "@zady/logger";
 *
 * // Rode com: DEBUG=true node app.js
 * logger.debug("Valor calculado: 42");
 * logger.debug("Payload recebido", { timestamp: false });
 * ```
 */
export function debug(message: string, options: LogOptions = {}): void {
    if (process.env.DEBUG !== "true") return;
    const {prefix = "DEBUG", timestamp = true} = options
    nativeConsole.debug(formatMenssage(message, prefix, colors.magenta, timestamp))
}