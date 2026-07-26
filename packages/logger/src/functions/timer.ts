import { colors } from "../core/colors";
import { nativeConsole } from "../core/nativeConsole";
import { terminalStyle } from "../core/terminalStyle";
import { getTimestamp } from "../utils/formatDate";

export interface TimerResult {
     /** Encerra o timer e imprime o tempo decorrido. Aceita uma label opcional. */
    stop: (label?: string) => void;
}

/**
 * Mede o tempo decorrido de uma operação.
 *
 * @example
 * ```ts
 * import { logger. } from "@zady/logger";
 *
 * const task = logger.timer("consulta ao banco");
 * // await db.query("SELECT ...");
 * task.stop("Consulta concluída");
 * ```
 */
export function timer(label: string): TimerResult {
    const start = performance.now();

    return {
        stop(successLabel?: string) {
            const elapsed = (performance.now() - start).toFixed(2);
            const displayLabel = successLabel ?? label;
            const time = `${colors.gray}[${getTimestamp()}]${terminalStyle.reset}`;
            const tag = `${colors.cyan}[TIMER]${terminalStyle.reset}`;
            const duration = `${colors.cyan}${elapsed}ms${terminalStyle.reset}`;

            nativeConsole.log(`${time}${tag} ${displayLabel} — ${duration}`);
        }
    };
}