// wrapper do proces.exit
export function exitProcess(code: number): never {
  process.exit(code);
}
