import { colors } from "../core/colors"
import { formatMenssage } from "../core/formatter"
import { nativeConsole } from "../core/nativeConsole"
import { LogOptions } from "../core/types"

// Log de sucesso
export function success(message: string, options: LogOptions = {}): void {
    const {prefix = "SUCCESS", timestamp = false} = options
    nativeConsole.log(formatMenssage(message, prefix, colors.green, timestamp))
}