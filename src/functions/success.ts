import { colors, formatMenssage, nativeConsole } from "#core";

// Log de sucesso
export function success(message: string): void {
    nativeConsole.log(formatMenssage(message, "SUCCESS", colors.green, true))
}