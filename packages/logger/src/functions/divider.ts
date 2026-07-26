import { colors } from "../core/colors";
import { nativeConsole } from "../core/nativeConsole";
import { terminalStyle } from "../core/terminalStyle";

/**
 * Imprime uma linha separadora no terminal.
 *
 * @example
 * ```ts
 * import { logger } from "@zady/logger";
 *
 * logger.divider();
 * logger.divider("=", 20);
 * logger.divider("*", 10);
 * ```
 */
export function divider(char: string = "─", length: number = 40): void {
    const line = char.repeat(length);
    nativeConsole.log(`${colors.gray}${line}${terminalStyle.reset}`);
}