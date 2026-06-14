import { colors, formatMenssage, nativeConsole } from "#core";

export function info(message: string): void {
    nativeConsole.log(formatMenssage(message, "INFO", colors.blue, true))
}