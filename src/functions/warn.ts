import { colors, formatMenssage, nativeConsole } from "#core";

// log de aviso
export function warn(message: string): void {
    nativeConsole.log(formatMenssage(message, "WARN", colors.yellow, true))
}