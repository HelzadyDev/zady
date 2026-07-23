/**
 * Converte uma cor hexadecimal (com ou sem #, formato curto ou longo) em uma tupla RGB.
 * @example
 * ```ts
 * hexToRgb("#5865F2"); // [88, 101, 242]
 * hexToRgb("fff");     // [255, 255, 255]
 * ```
 */
export function hexToRgb(hex: string): [number, number, number] {
    const normalized = hex.replace("#", "");
    const value = normalized.length === 3
        ? normalized.split("").map((char) => char + char).join("")
        : normalized;

    const int = parseInt(value, 16);

    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}