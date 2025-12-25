/**
 * Sentry Client Configuration
 * 
 * This file configures Sentry for the browser.
 * Get your DSN from: https://sentry.io
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of transactions in dev, lower in prod

    // Session Replay
    replaysSessionSampleRate: 0.1, // Sample 10% of sessions
    replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors

    // Only enable in production
    enabled: process.env.NODE_ENV === "production",

    // Set environment
    environment: process.env.NODE_ENV,

    // Custom tags
    initialScope: {
        tags: {
            app: "axoraco",
            type: "client",
        },
    },

    // Ignore specific errors
    ignoreErrors: [
        // Browser extensions
        "top.GLOBALS",
        "ResizeObserver loop limit exceeded",
        "ResizeObserver loop completed with undelivered notifications",
        // Network errors
        "Failed to fetch",
        "NetworkError",
        "Load failed",
    ],

    // Filter breadcrumbs
    beforeBreadcrumb(breadcrumb) {
        // Don't send console breadcrumbs for info/debug
        if (breadcrumb.category === "console" && breadcrumb.level !== "error") {
            return null;
        }
        return breadcrumb;
    },

    // Add integrations
    integrations: [
        Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
});
