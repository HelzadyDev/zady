export interface ErrorOptions {
  code?: number; // código de saida do processo
  prefix?: string; // Prefixoda mensagen
  showStack?: boolean; // Mostrar stack trace
  timestamp?: boolean; // Mostar data/hora
  error?: unknown; // Objeto de erro
};
