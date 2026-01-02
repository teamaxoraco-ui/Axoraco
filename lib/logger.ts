/**
 * @fileoverview Structured logging utility for production.
 * Provides consistent log format with context, timestamps, and levels.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
    [key: string]: unknown;
}

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: LogContext;
    error?: {
        name: string;
        message: string;
        stack?: string | undefined;
    };
}

/**
 * Check if we're in development mode
 */
const isDev = process.env.NODE_ENV === "development";

/**
 * Format log entry as JSON for production, pretty print for dev
 */
function formatLog(entry: LogEntry): string {
    if (isDev) {
        const { timestamp, level, message, context, error } = entry;
        const levelColors = {
            debug: "\x1b[36m", // cyan
            info: "\x1b[32m",  // green
            warn: "\x1b[33m",  // yellow
            error: "\x1b[31m", // red
        };
        const reset = "\x1b[0m";
        const color = levelColors[level];

        let output = `${color}[${level.toUpperCase()}]${reset} ${timestamp} - ${message}`;
        if (context && Object.keys(context).length > 0) {
            output += `\n  Context: ${JSON.stringify(context, null, 2)}`;
        }
        if (error) {
            output += `\n  Error: ${error.name}: ${error.message}`;
            if (error.stack) {
                output += `\n  Stack: ${error.stack}`;
            }
        }
        return output;
    }

    // Production: JSON format for log aggregators
    return JSON.stringify(entry);
}

/**
 * Create a log entry
 */
function createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
): LogEntry {
    const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
    };

    if (context && Object.keys(context).length > 0) {
        entry.context = context;
    }

    if (error) {
        entry.error = {
            name: error.name,
            message: error.message,
            stack: error.stack,
        };
    }

    return entry;
}

/**
 * Structured logger with consistent formatting
 * 
 * @example
 * logger.info("User logged in", { userId: "123" });
 * logger.error("Failed to process payment", { orderId: "456" }, error);
 */
export const logger = {
    /**
     * Debug level - only in development
     */
    debug(message: string, context?: LogContext): void {
        if (isDev) {
            console.debug(formatLog(createLogEntry("debug", message, context)));
        }
    },

    /**
     * Info level - general information
     */
    info(message: string, context?: LogContext): void {
        console.info(formatLog(createLogEntry("info", message, context)));
    },

    /**
     * Warn level - potential issues
     */
    warn(message: string, context?: LogContext): void {
        console.warn(formatLog(createLogEntry("warn", message, context)));
    },

    /**
     * Error level - errors with optional Error object
     */
    error(message: string, context?: LogContext, error?: Error): void {
        console.error(formatLog(createLogEntry("error", message, context, error)));
    },

    /**
     * Log API request
     */
    apiRequest(method: string, path: string, status: number, durationMs: number, context?: LogContext): void {
        const level: LogLevel = status >= 500 ? "error" : status >= 400 ? "warn" : "info";
        console.log(formatLog(createLogEntry(level, `${method} ${path} ${status} ${durationMs}ms`, {
            method,
            path,
            status,
            durationMs,
            ...context,
        })));
    },
};

export default logger;
