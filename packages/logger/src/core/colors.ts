// Define cores ANSI para terminal

/**
 * Cores ANSI de texto para uso no terminal.
 * 
 * @exemple
 * ```ts
 * import { colors, terminalStyle } from "@zady/logger";
 * 
 * console.log(`${colors.cyan}Texto ciano${terminalStyle.reset}`);
 * ```
 */
export const colors = {
    "black": "\x1b[30m", 
    "red": "\x1b[31m",
    "green": "\x1b[32m", 
    "yellow": "\x1b[33m", 
    "blue": "\x1b[34m", 
    "magenta": "\x1b[35m",
    "cyan": "\x1b[36m",
    "white": "\x1b[37m",
    "gray": "\x1b[90m",
}

/**
 * Cores ANSI de fundo para uso no terminal.
 *
 * @example
 * ```ts
 * import { bgColors, terminalStyle } from "@zady/logger";
 *
 * console.log(`${bgColors.red}Fundo vermelho${terminalStyle.reset}`);
 * ```
 */
export const bgColors = {
    "black": "\x1b[40m",
    "red": "\x1b[41m",
    "green": "\x1b[42m",
    "yellow": "\x1b[43m",
    "blue": "\x1b[44m",
    "magenta": "\x1b[45m",
    "cyan": "\x1b[46m",
    "white": "\x1b[47m",
}