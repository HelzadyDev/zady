import { colors } from "../core/colors"
import { formatMenssage } from "../core/formatter"
import { nativeConsole } from "../core/nativeConsole"
import { LogOptions } from "../core/types"

export function info(message: string, options: LogOptions = {}): void {
    const {prefix = "INFO", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.blue, timestamp))
}