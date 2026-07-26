import { colors } from "../core/colors"
import { formatMenssage } from "../core/formatter"
import { nativeConsole } from "../core/nativeConsole"
import { LogOptions } from "../core/types"

// Log padrão (info)
export function log(message: string, options: LogOptions = {}): void{
    const {prefix = "LOG", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.gray, timestamp))
}