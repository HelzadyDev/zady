import { colors, formatMenssage, nativeConsole } from "#core";

// Log padrão (info)
export function log(message: string): void{
    nativeConsole.log(formatMenssage(message, "LOG", colors.gray, true))
}