import { colors, formatMenssage, nativeConsole } from "#core";

export interface PatchConsoleOptions {
  log?: boolean;
  warn?: boolean;
  error?: boolean;
  info?: boolean;
  debug?: boolean;
  requireDebugEnv?: boolean;
}

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
