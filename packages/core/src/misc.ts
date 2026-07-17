/**
 * Retorna sempre o valor primitivo null. Útil para limpar estados ou passagens de callbacks.
 * * @example
 * ```ts
 * const resultado = toNull(); // null
 * ```
 */
export function toNull(): null {
    return null
}

/**
 * Filtra valores nulos ou indefinidos, padronizando-os estritamente para `undefined`.
 * Muito útil ao lidar com opcionais no ecossistema da discords.js.
 * * @example
 * ```ts
 * notFound(null);        // undefined
 * notFound("conteúdo");  // "conteúdo"
 * ```
 */
export function notFound<T>(value: T |null | undefined): T | undefined {
    return value ?? undefined;
}