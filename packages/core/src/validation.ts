/**
 * Valida se uma string é um e-mail em formato válido.
 * @example
 * ```ts
 * isEmail("contato@zady.com"); // true
 * isEmail("zady-invalido"); // false
 * ``` 
 */

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}


/**
 * Valida se uma string é uma url válida com protocolo HTTP ou HTTPS.
 * @example
 * ```ts
 * isUrl("[https://google.com](https://google.com)"); // true
 * isUrl("ftp://meu-servidor"); // false
 * ```
 */
export function isUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
