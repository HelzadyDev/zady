import { colors, formatMenssage, LogOptions, nativeConsole } from "#core";

// Log padrão (info)
export function log(message: string, options: LogOptions = {}): void{
    const {prefix = "LOG", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.gray, timestamp))
}