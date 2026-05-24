import { colors, ErrorOptions, formatMenssage } from "#core";
import { defaults } from "#settings";
import { exitProcess } from "#utils";

// função fatal que encerra o processo
export function error(message: string, options: ErrorOptions = {}): never {
  const {
    code = defaults.code,
    prefix = "ERROR",
    showStack = defaults.showStack,
    timestamp = defaults.timeStamp,
    error,
  } = options;

  // Exibe mensagen formatada
  console.error(formatMenssage(message, prefix, colors.red, timestamp));

  // Exibe stack trace se existir
  if (showStack && error instanceof Error) {
    console.error(error.stack);
  }

  // Encerra o processo
  exitProcess(code);
}
