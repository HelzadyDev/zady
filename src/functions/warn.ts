import { colors, formatMenssage, LogOptions, nativeConsole } from "#core";

// log de aviso
export function warn(message: string, options: LogOptions): void {
    const {prefix = "WARN", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.yellow, timestamp))
}