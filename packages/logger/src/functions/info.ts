import { colors, formatMenssage, LogOptions, nativeConsole } from "#core";

export function info(message: string, options: LogOptions = {}): void {
    const {prefix = "INFO", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.blue, timestamp))
}