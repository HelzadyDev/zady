import { getTimestamp } from "../utils/formatDate";
import { colors } from "./colors";
import { terminalStyle } from "./terminalStyle";

// Função responsavel por montar a mensagem fatal
export function formatMenssage(
  message: string,
  prefix: string,
  color: string,
  useTimestamp: boolean,
): string {
  const time = useTimestamp
    ? `${colors.gray}[${getTimestamp()}]${terminalStyle.reset}`
    : "";

  return `${time}${color}[${prefix}]${terminalStyle.reset} ${message}`;
}
