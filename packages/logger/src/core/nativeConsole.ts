/**
 * Referência às funções originais do `console`, preservadas antes de
 * qualquer patch aplicado por `patchConsole()`. Útil para logar sem
 * formatação mesmo depois do console global ter sido substituído.
 *
 * @example
 * ```ts
 * import { nativeConsole, patchConsole } from "@zady/logger";
 *
 * patchConsole();
 *
 * console.log("mensagem formatada");        // passa pelo patch
 * nativeConsole.log("mensagem sem formatação"); // console.log original
 * ```
 */
export const nativeConsole = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console),
    debug: console.debug.bind(console),
};