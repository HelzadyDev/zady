import { colors } from "../core/colors"
import { formatMenssage } from "../core/formatter"
import { nativeConsole } from "../core/nativeConsole"
import { LogOptions } from "../core/types"

// log de aviso
export function warn(message: string, options: LogOptions): void {
    const {prefix = "WARN", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.yellow, timestamp))
}