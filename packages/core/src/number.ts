/**
 * Coleção de utilitários para geração de números aleatórios.
 */
export const random = {

  /**
   * Gera um número inteiro aleatório entre o mínimo e o máximo (inclusivo).
   * * @example
   * ```ts
   * random.int(1, 6); // Pode retornar 1, 2, 3, 4, 5 ou 6
   * ```
   */
  int(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Gera um número de ponto flutuante (decimal) aleatório entre o mínimo e o máximo.
   * * @example
   * ```ts
   * random.float(1.5, 5.0); // Ex: 3.4215...
   * ```
   */
  float(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  },
};

/**
 * Tenta converter um valor para inteiro. Se falhar ou for NaN, retorna o valor padrão seguro (fallback).
 * * @example
 * ```ts
 * parseIntOr("123", 0);   // 123
 * parseIntOr("abc", 99);  // 99
 * ```
 */
export function parseIntOr(value: unknown, fallback: number): number {
    const parsed = parseInt(String(value), 10);
    return Number.isNaN(parsed) ? fallback : parsed;

}

/**
 * Tenta converter um valor para float. Se falhar ou for NaN, retorna o valor padrão seguro (fallback).
 * * @example
 * ```ts
 * parseFloatOr("1.5", 0);   // 1.5
 * parseFloatOr("abc", 5.5); // 5.5
 * ```
 */
export function parseFloatOr(value: unknown, fallback: number): number {
    const parsed = parseFloat(String(value));
    return Number.isNaN(parsed) ? fallback : parsed;

}
