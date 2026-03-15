import { Platform } from 'react-native';

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

const ANSI_RESET = '[0m';
const ANSI_DIM = '[2m';
const ANSI_SCOPE_COLORS = ['[36m', '[35m', '[34m', '[32m', '[96m'];
const ANSI_LEVEL_COLORS: Record<LogLevel, string> = {
  debug: '[36m',
  info: '[32m',
  warn: '[33m',
  error: '[31m',
};
const ANSI_MESSAGE_COLORS: Record<LogLevel, string> = {
  debug: '[37m',
  info: '[97m',
  warn: '[93m',
  error: '[91m',
};

const WEB_TIMESTAMP_STYLE = 'color:#94A3B8;font-weight:500;';
const WEB_SCOPE_STYLES = [
  'color:#38BDF8;font-weight:700;',
  'color:#A78BFA;font-weight:700;',
  'color:#60A5FA;font-weight:700;',
  'color:#34D399;font-weight:700;',
  'color:#22D3EE;font-weight:700;',
];
const WEB_LEVEL_STYLES: Record<LogLevel, string> = {
  debug: 'color:#22D3EE;font-weight:800;',
  info: 'color:#4ADE80;font-weight:800;',
  warn: 'color:#FBBF24;font-weight:800;',
  error: 'color:#F87171;font-weight:800;',
};
const WEB_MESSAGE_STYLES: Record<LogLevel, string> = {
  debug: 'color:#E2E8F0;font-weight:500;',
  info: 'color:#F8FAFC;font-weight:500;',
  warn: 'color:#FEF3C7;font-weight:600;',
  error: 'color:#FEE2E2;font-weight:700;',
};

function formatTimestamp(date: Date) {
  return date.toISOString();
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function resolveScopeAnsiColor(scope: string) {
  return ANSI_SCOPE_COLORS[hashString(scope) % ANSI_SCOPE_COLORS.length];
}

function resolveScopeWebStyle(scope: string) {
  return WEB_SCOPE_STYLES[hashString(scope) % WEB_SCOPE_STYLES.length];
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

function getConsoleWriter(level: LogLevel) {
  switch (level) {
    case 'debug':
      return console.debug.bind(console);
    case 'info':
      return console.info.bind(console);
    case 'warn':
      return console.warn.bind(console);
    case 'error':
      return console.error.bind(console);
  }
}

function writeWebLog(payload: ReturnType<typeof buildPayload>) {
  const writer = getConsoleWriter(payload.level);
  const label = `%c[${payload.timestamp}] %c[${payload.level.toUpperCase()}] %c[${payload.scope}] %c${payload.message}`;
  const args = [
    label,
    WEB_TIMESTAMP_STYLE,
    WEB_LEVEL_STYLES[payload.level],
    resolveScopeWebStyle(payload.scope),
    WEB_MESSAGE_STYLES[payload.level],
  ] as unknown[];

  if (payload.meta) {
    args.push(payload.meta);
  }

  writer(...args);
}

function writeAnsiLog(payload: ReturnType<typeof buildPayload>) {
  const writer = getConsoleWriter(payload.level);
  const line = [
    `${ANSI_DIM}[${payload.timestamp}]${ANSI_RESET}`,
    `${ANSI_LEVEL_COLORS[payload.level]}[${payload.level.toUpperCase()}]${ANSI_RESET}`,
    `${resolveScopeAnsiColor(payload.scope)}[${payload.scope}]${ANSI_RESET}`,
    `${ANSI_MESSAGE_COLORS[payload.level]}${payload.message}${ANSI_RESET}`,
  ].join(' ');

  if (payload.meta) {
    writer(line, payload.meta);
    return;
  }

  writer(line);
}

function writeLog(payload: ReturnType<typeof buildPayload>) {
  if (Platform.OS === 'web') {
    writeWebLog(payload);
    return;
  }

  writeAnsiLog(payload);
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
