import { colors, formatMenssage } from "#core";

// Log padrão (info)
export function log(message: string): void{
    console.log(formatMenssage(message, "LOG", colors.gray, true))
}