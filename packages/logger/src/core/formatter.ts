import { getTimestamp } from "../utils/formatDate";
import { colors } from "./colors";
import { terminalStyle } from "./terminalStyle";

// Função responsavel por montar a mensagem fatal

/**
 * Monta a string final de uma mensagem de log: timestamp opcional,
 * prefixo colorido entre colchetes e a mensagem. É a função usada
 * internamente por `log`, `info`, `warn`, `success`, `debug` e `error`.
 *
 * @example
 * ```ts
 * import { formatMenssage, colors } from "@zady/logger";
 *
 * const line = formatMenssage("Servidor iniciado", "INFO", colors.blue, true);
 * console.log(line);
 * // [26/07/2026 14:32] [INFO] Servidor iniciado
 * ```
 */
export function formatMenssage(
  message: string,
  prefix: string,
  color: string,
  useTimestamp: boolean,
): string {
  const time = useTimestamp
    ? `${colors.gray}[${getTimestamp()}]${terminalStyle.reset}`
    : "";

  return `${time}${color}[${prefix}]${terminalStyle.reset} ${message}`;
}
