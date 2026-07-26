import { colors } from "../core/colors";
import { formatMenssage } from "../core/formatter";
import { nativeConsole } from "../core/nativeConsole";

export interface PatchConsoleOptions {
  /** Formata `console.log`. @default true */
  log?: boolean;
  /** Formata `console.warn`. @default true */
  warn?: boolean;
  /** Formata `console.error`. @default true */
  error?: boolean;
  /** Formata `console.info`. @default true */
  info?: boolean;
  /** Formata `console.debug`. @default true */
  debug?: boolean;
  /** Quando `true`, `console.debug` só imprime com `DEBUG=true`. @default false */
  requireDebugEnv?: boolean;
}


/**
 * Substitui os métodos nativos do `console` (log, warn, error, info, debug)
 * por versões formatadas do zady.
 *
 * @example
 * ```ts
 * import { logger } from "@zady/logger";
 *
 * logger.patchConsole();
 *
 * console.log("mensagem comum");
 * console.warn("aviso");
 * console.error("erro");
 * console.info("info");
 * console.debug("debug");
 * ```
 *
 * @example
 * Ativando apenas alguns métodos:
 * ```ts
 * patchConsole({
 *   log: true,
 *   warn: true,
 *   error: false,
 *   info: true,
 *   debug: true,
 *   requireDebugEnv: true,
 * });
 * ```
 */
export function patchConsole(options: PatchConsoleOptions = {}): void {
  const {
    log = true,
    warn = true,
    error = true,
    info = true,
    debug = true,
    requireDebugEnv = false,
  } = options;

  if (log) {
    console.log = (...args: unknown[]) => {
      const [first = "", ...rest] = args;
      nativeConsole.log(
        formatMenssage(String(first), "LOG", colors.gray, true), ...rest
      );
    };
  }

  if(warn) {
    console.warn = (...args: unknown[]) => {
        const [first = "", ...rest] = args;
        nativeConsole.warn(formatMenssage(String(first), "WARN", colors.yellow, true), ...rest)
    }
  }

  if (error) {
    console.error = (...args: unknown[]) => {
        const [first = "", ...rest] = args;
        nativeConsole.error(formatMenssage(String(first), "ERROR", colors.red, true), ...rest)
    }
  }
  
  if(info) {
    console.info = (...args: unknown[]) => {
        const [first = "", ...rest] = args;
        nativeConsole.info(formatMenssage(String(first), "INFO", colors.blue, true), ...rest)
    }
  }

  if(debug){
    console.debug = (...args: unknown[]) => {
        if (requireDebugEnv && process.env.DEBUG !== "true") return;
        const [first = "", ...rest] = args;
        nativeConsole.debug(formatMenssage(String(first), "DEBUG", colors.magenta, true), ...rest)
    }
  }
}