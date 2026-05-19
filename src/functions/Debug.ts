import { colors, formatMenssage } from "#core";

// Log de debug — só exibe quando DEBUG=true
export function debug(message: string): void {
    if (process.env.DEBUG !== "true") return;
    console.log(formatMenssage(message, "DEBUG", colors.magenta, true))
}