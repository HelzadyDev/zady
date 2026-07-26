/**
 * Estilos ANSI de terminal (reset, negrito, itálico, sublinhado, riscado etc).
 *
 * @example
 * ```ts
 * import { terminalStyle } from "@zady/logger";
 *
 * console.log(`${terminalStyle.negrito}Texto em negrito${terminalStyle.reset}`);
 * console.log(`${terminalStyle.sublinhado}Texto sublinhado${terminalStyle.reset}`);
 * ```
 */
export const terminalStyle = {
   "reset": "\x1b[0m", // Reseta cor
   "negrito": "\x1b[1m", // Formata o texto em negrito
   "fraco": "\x1b[2m",
   "italico": "\x1b[3m",
   "sublinhado": "\x1b[4m",
   "riscado": "\x1b[9m",
}