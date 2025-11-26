const mode = (typeof import.meta !== "undefined" && (import.meta as any)?.env?.MODE) || (typeof process !== "undefined" && (process as any)?.env?.NODE_ENV) || "production";
const isDev = mode !== "production";

type Level = "debug" | "info" | "warn" | "error";

function write(level: Level, ...args: any[]) {
  if (!isDev) return;
  const prefix = "[Theme Hub]";
  switch (level) {
    case "debug":
      globalThis.console.debug(prefix, ...args);
      break;
    case "info":
      globalThis.console.info(prefix, ...args);
      break;
    case "warn":
      globalThis.console.warn(prefix, ...args);
      break;
    case "error":
      globalThis.console.error(prefix, ...args);
      break;
  }
}

export const logger = {
  debug: (...args: any[]) => write("debug", ...args),
  info: (...args: any[]) => write("info", ...args),
  warn: (...args: any[]) => write("warn", ...args),
  error: (...args: any[]) => write("error", ...args)
};

export default logger;
