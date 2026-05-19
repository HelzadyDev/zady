import { colors, formatMenssage } from "#core";

export function info(message: string): void {
    console.log(formatMenssage(message, "INFO", colors.blue, true))
}