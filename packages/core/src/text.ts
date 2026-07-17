/**
 * Transforma a primeira letra de um texto em maiúscula
 * @example
 * ```ts
 * captalise("zady bot"); // Zady bot
 * ```
 */
export function captalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Limita o tamanho de um texto, cortando-o e adicionado um sufixo caso ultrapasse o limite.
 * @example
 * ```ts
 * limitText("zady é uma lib incrivel", 10): // "zady é um..."
 * limitText("zady", 10);                    // "zady"
 * ```
 */
export function limitText(text: string, max: number, suffix = "..."): string {
return text.length > max ? text.slice(0, max).trimEnd() + suffix : text;
}

/**
 * Constrói um bloco de texto quebrando linhas automaticamente.
 * Útil para mensagens longas do bot no Discord.
 * * @example
 * ```ts
 * brBuilder("Olá!", "Seja bem-vindo ao servidor.");
 * // Retorna: "Olá!\nSeja bem-vindo ao servidor."
 * ```
 */

export function brBuilder(...lines: string[]): string {
    return lines.join("\n");
}

/**
 * Junta partes de texto ignorando valores vazios ou falsy, separando-os por espaço.
 * * @example
 * ```ts
 * spaceBuilder("Zady", "", "Core"); // "Zady Core"
 * ```
 */
export function spaceBuilder(...parts: string[]): string {
    return parts.filter(Boolean).join(" ");
}

/**
 * Substitui variáveis no padrão `var(nome)` dentro de um texto por valores de um objeto.
 * * @example
 * ```ts
 * replaceText("Olá var(user), bem-vindo!", { user: "Helzady" });
 * // Retorna: "Olá Helzady, bem-vindo!"
 * ```
 */
export function replaceText(
    text: string,
    values: Record<string, string>
): string {
    return text.replace(/var\((\w+)\)/g, (_, key) => values[key] ?? `var(${key})`)
}