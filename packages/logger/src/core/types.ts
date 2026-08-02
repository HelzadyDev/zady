export interface LogOptions {
  [key: string]: unknown;
  prefix?: string; // prefixo da mensagem
  timestamp?: boolean; // mostrar data/hora
}

export interface ErrorOptions extends LogOptions {
  code?: number; // codigo de saida do processo
  showStack?: boolean; // mostrar stack trace
  error?: unknown; // objeto de erro
};

// Tipo utilitário para erros que carregam um 'code' (Node, Axios, Prisma, Mongo, etc.)
export interface ErrorWinthCode extends Error {
  code?: string | number;
}