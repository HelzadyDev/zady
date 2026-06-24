import { colors, formatMenssage, LogOptions, nativeConsole } from "#core";

// Log de sucesso
export function success(message: string, options: LogOptions = {}): void {
    const {prefix = "SUCCESS", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.green, timestamp))
}