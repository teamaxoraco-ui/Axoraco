/**
 * Sentry Edge Configuration
 * 
 * This file configures Sentry for Edge runtime (middleware, edge functions).
 */

import * as Sentry from "@sentry/nextjs";

Sentry.init({
    ...(process.env.NEXT_PUBLIC_SENTRY_DSN ? { dsn: process.env.NEXT_PUBLIC_SENTRY_DSN } : {}),

    // Performance Monitoring
    tracesSampleRate: 1.0,

    // Only enable in production
    enabled: process.env.NODE_ENV === "production",

    // Set environment
    environment: process.env.NODE_ENV,

    // Custom tags
    initialScope: {
        tags: {
            app: "axoraco",
            type: "edge",
        },
    },
});
