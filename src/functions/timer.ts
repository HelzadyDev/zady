import { colors, terminalStyle } from "#core";
import { getTimestamp } from "#utils";

interface TimerResult {
    stop: (label?: string) => void;
}

// Mede o tempo decorrido de uma operação
export function timer(label: string): TimerResult {
    const start = performance.now();

    return {
        stop(successLabel?: string) {
            const elapsed = (performance.now() - start).toFixed(2);
            const displayLabel = successLabel ?? label;
            const time = `${colors.gray}[${getTimestamp()}]${terminalStyle.reset}`;
            const tag = `${colors.cyan}[TIMER]${terminalStyle.reset}`;
            const duration = `${colors.cyan}${elapsed}ms${terminalStyle.reset}`;

            console.log(`${time}${tag} ${displayLabel} — ${duration}`);
        }
    };
}