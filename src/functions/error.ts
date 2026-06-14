import { colors, ErrorOptions, formatMenssage, nativeConsole } from "#core";
import { defaults } from "#settings";
import { exitProcess } from "#utils";

function getErrorCode(error: unknown): unknown {
  if (error !== null && typeof error === "object" && "code" in error) {
    return (error as { code?: unknown }).code;
  }

  return undefined;
}

// funcao fatal que encerra o processo
export function error(message: string, options: ErrorOptions = {}): never {
  const {
    code,
    prefix = "ERROR",
    showStack = defaults.showStack,
    timestamp = defaults.timeStamp,
    error,
    ...metadata
  } = options;
  const errorCode = getErrorCode(error);
  const exitCode =
    typeof code === "number"
      ? code
      : typeof errorCode === "number"
        ? errorCode
        : defaults.code;
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
    console.error(error.stack);
  }

  // Encerra o processo
  exitProcess(exitCode);
}
