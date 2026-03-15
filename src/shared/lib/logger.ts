export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogMeta = Record<string, unknown> | undefined;

type LoggerOptions = {
  enabled?: boolean;
  minLevel?: LogLevel;
};

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function formatTimestamp(date: Date) {
  return date.toISOString();
}

function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return error;
}

function buildPayload(scope: string, level: LogLevel, message: string, meta?: LogMeta) {
  return {
    timestamp: formatTimestamp(new Date()),
    level,
    scope,
    message,
    ...(meta ? { meta } : null),
  };
}

function shouldLog(level: LogLevel, options?: LoggerOptions) {
  if (options?.enabled === false) {
    return false;
  }

  const minLevel = options?.minLevel ?? 'debug';
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[minLevel];
}

function writeLog(payload: ReturnType<typeof buildPayload>) {
  const prefix = `[${payload.timestamp}] [${payload.level.toUpperCase()}] [${payload.scope}] ${payload.message}`;
  const args = payload.meta ? [prefix, payload.meta] : [prefix];

  switch (payload.level) {
    case 'debug':
    case 'info':
      console.log(...args);
      break;
    case 'warn':
      console.warn(...args);
      break;
    case 'error':
      console.error(...args);
      break;
  }
}

export type AppLogger = {
  scope: string;
  debug: (message: string, meta?: LogMeta) => void;
  info: (message: string, meta?: LogMeta) => void;
  warn: (message: string, meta?: LogMeta) => void;
  error: (message: string, meta?: LogMeta) => void;
  child: (segment: string) => AppLogger;
};

export function createLogger(scope: string, options?: LoggerOptions): AppLogger {
  const log = (level: LogLevel, message: string, meta?: LogMeta) => {
    if (!shouldLog(level, options)) {
      return;
    }

    writeLog(buildPayload(scope, level, message, meta));
  };

  return {
    scope,
    debug: (message, meta) => log('debug', message, meta),
    info: (message, meta) => log('info', message, meta),
    warn: (message, meta) => log('warn', message, meta),
    error: (message, meta) => log('error', message, meta ? normalizeError(meta) as LogMeta : meta),
    child: (segment) => createLogger(`${scope}:${segment}`, options),
  };
}
