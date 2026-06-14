import { colors, formatMenssage, nativeConsole } from "#core";

// Log de debug — só exibe quando DEBUG=true
export function debug(message: string): void {
    if (process.env.DEBUG !== "true") return;
    nativeConsole.debug(formatMenssage(message, "DEBUG", colors.magenta, true))
}