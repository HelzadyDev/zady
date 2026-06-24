import { colors, ErrorOptions, formatMenssage, nativeConsole } from "#core";
import { defaults } from "#settings";
import { exitProcess } from "#utils";

function getErrorCode(error: unknown): unknown {
  if (error !== null && typeof error === "object" && "code" in error) {
   const code = (error as { code?: unknown }).code;
    return typeof code === "number" ? code : undefined;
  }

  return undefined;
}

// funcao fatal que encerra o processo
export function error(message: string, options: ErrorOptions = {}): void {
  const {
    code,
    prefix = "ERROR",
    showStack = defaults.showStack,
    timestamp = defaults.timeStamp,
    error,
    ...metadata
  } = options;

  const exitCode =
      typeof code === "number"
        ? code
        : getErrorCode(error);

  const customParams = Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== undefined),
  );

  // Exibe mensagen formatada
  nativeConsole.error(formatMenssage(message, prefix, colors.red, timestamp));

  if (Object.keys(customParams).length > 0) {
    nativeConsole.error(customParams);
  }

  // Exibe stack trace se existir
  if (showStack && error instanceof Error) {
    nativeConsole.error(error.stack);
  }

  // Encerra o processo
  if(typeof exitCode === "number"){
    exitProcess(exitCode);
  }
}
