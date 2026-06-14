export interface ErrorOptions {
  [key: string]: unknown;
  code?: number; // codigo de saida do processo
  prefix?: string; // prefixo da mensagem
  showStack?: boolean; // mostrar stack trace
  timestamp?: boolean; // mostrar data/hora
  error?: unknown; // objeto de erro
};
