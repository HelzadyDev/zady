import { colors } from "../core/colors";
import { formatMenssage } from "../core/formatter";
import { nativeConsole } from "../core/nativeConsole";
import { LogOptions } from "../core/types";

// Log de debug — só exibe quando DEBUG=true
export function debug(message: string, options: LogOptions = {}): void {
    if (process.env.DEBUG !== "true") return;
    const {prefix = "DEBUG", timestamp = true} = options
    nativeConsole.debug(formatMenssage(message, prefix, colors.magenta, timestamp))
}