/**
 * @fileoverview Error tracking setup for Sentry.
 * 
 * Setup:
 * 1. Create account at sentry.io (free tier: 5k errors/month)
 * 2. Create a new Next.js project
 * 3. Get DSN from project settings
 * 4. Add NEXT_PUBLIC_SENTRY_DSN to .env.local
 * 5. Install: npm install @sentry/nextjs
 * 
 * This file provides a lightweight wrapper that works without Sentry installed,
 * falling back to console logging if Sentry is not configured.
 */

interface ErrorContext {
    [key: string]: unknown;
}

interface UserContext {
    id?: string;
    email?: string;
    username?: string;
}

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Check if Sentry is configured
 */
export function isSentryConfigured(): boolean {
    return !!SENTRY_DSN;
}

/**
 * Initialize error tracking (call in app layout or _app)
 * This is a lightweight version - full Sentry SDK recommended for production
 */
export function initErrorTracking(): void {
    if (!isSentryConfigured()) {
        console.info("Sentry not configured - using console logging for errors");
        return;
    }

    // Add global error handler
    if (typeof window !== "undefined") {
        window.addEventListener("error", (event) => {
            captureException(event.error, {
                source: "window.onerror",
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
            });
        });

        window.addEventListener("unhandledrejection", (event) => {
            captureException(event.reason, {
                source: "unhandledrejection",
            });
        });
    }

    console.info("Error tracking initialized");
}

/**
 * Capture an exception and report it
 * 
 * @param error - Error object to capture
 * @param context - Additional context data
 * 
 * @example
 * try {
 *   await fetchData();
 * } catch (error) {
 *   captureException(error, { userId: "123", action: "fetch_data" });
 * }
 */
export function captureException(error: Error | unknown, context?: ErrorContext): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    // Always log to console
    console.error("Error captured:", errorObj.message, context);

    if (!isSentryConfigured() || !IS_PRODUCTION) {
        return;
    }

    // Send to Sentry-compatible endpoint
    // In production, you would use the actual Sentry SDK
    const payload = {
        exception: {
            values: [{
                type: errorObj.name,
                value: errorObj.message,
                stacktrace: errorObj.stack,
            }],
        },
        tags: context,
        timestamp: new Date().toISOString(),
        platform: "javascript",
        environment: process.env.NODE_ENV,
    };

    // For now, just log - replace with actual Sentry SDK in production
    console.log("Would send to Sentry:", JSON.stringify(payload, null, 2));
}

/**
 * Capture a message (non-error event)
 * 
 * @param message - Message to capture
 * @param level - Severity level
 * @param context - Additional context
 */
export function captureMessage(
    message: string,
    level: "info" | "warning" | "error" = "info",
    context?: ErrorContext
): void {
    const logFn = level === "error" ? console.error : level === "warning" ? console.warn : console.info;
    logFn(`[${level.toUpperCase()}] ${message}`, context);

    if (!isSentryConfigured() || !IS_PRODUCTION) {
        return;
    }

    // Would send to Sentry with actual SDK
}

/**
 * Set user context for error tracking
 * 
 * @param user - User information
 */
export function setUser(user: UserContext | null): void {
    if (!isSentryConfigured()) {
        return;
    }

    // Would set Sentry user context with actual SDK
    console.log("User context set:", user);
}

/**
 * Add breadcrumb for tracing user actions
 * 
 * @param category - Breadcrumb category (e.g., "navigation", "click")
 * @param message - Description of the action
 * @param data - Additional data
 */
export function addBreadcrumb(
    category: string,
    message: string,
    data?: Record<string, unknown>
): void {
    if (!isSentryConfigured()) {
        return;
    }

    // Would add Sentry breadcrumb with actual SDK
    console.debug(`Breadcrumb [${category}]: ${message}`, data);
}

/**
 * React Error Boundary integration helper
 * Use this in your error boundary component
 */
export function captureReactError(error: Error, errorInfo: { componentStack: string }): void {
    captureException(error, {
        componentStack: errorInfo.componentStack,
        source: "react_error_boundary",
    });
}
