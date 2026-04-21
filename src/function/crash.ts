export function crash(message: string): never {
    console.error(`[SECURITY] ${message}`);
    process.exit(1)
}