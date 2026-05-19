import { colors, terminalStyle } from "#core";

// Imprime uma linha separadora no terminal
export function divider(char: string = "─", length: number = 40): void {
    const line = char.repeat(length);
    console.log(`${colors.gray}${line}${terminalStyle.reset}`);
}