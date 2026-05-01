import { colors, terminalStyle } from "#core";
import { getTimestamp } from "#utils";

// Função responsavel por montar a mensagem fatal
export function formatMenssage(
    message: string,
    prefix: string,
    color: string,
    useTimestamp: boolean
): string {
    const time = useTimestamp
    ? `${colors.gray}[${getTimestamp()}]${terminalStyle.reset}`
    : ""

    return `${time}${color}[${prefix}]${terminalStyle.reset} ${message}`
}