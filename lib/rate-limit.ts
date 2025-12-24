/**
 * @fileoverview Simple rate limiter for API routes.
 * Uses in-memory storage (resets on server restart).
 * For production, use Redis or Upstash.
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store (use Redis in production for multi-instance)
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limiter configuration
 */
interface RateLimitConfig {
    /** Time window in milliseconds */
    windowMs: number;
    /** Maximum requests per window */
    maxRequests: number;
}

/**
 * Default rate limit: 5 requests per minute
 */
const defaultConfig: RateLimitConfig = {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
};

/**
 * Check if a request should be rate limited
 * 
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns Object with isLimited status and remaining requests
 * 
 * @example
 * const { isLimited, remaining } = checkRateLimit(ip, { windowMs: 60000, maxRequests: 10 });
 * if (isLimited) {
 *   return Response.json({ error: "Too many requests" }, { status: 429 });
 * }
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = defaultConfig
): { isLimited: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    // Clean up old entries periodically
    if (rateLimitStore.size > 10000) {
        cleanupOldEntries();
    }

    // No existing entry or window expired
    if (!entry || now > entry.resetTime) {
        rateLimitStore.set(identifier, {
            count: 1,
            resetTime: now + config.windowMs,
        });
        return {
            isLimited: false,
            remaining: config.maxRequests - 1,
            resetIn: config.windowMs,
        };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(identifier, entry);

    const isLimited = entry.count > config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - entry.count);
    const resetIn = entry.resetTime - now;

    return { isLimited, remaining, resetIn };
}

/**
 * Clean up expired rate limit entries
 */
function cleanupOldEntries(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

/**
 * Get client IP address from request headers
 */
export function getClientIP(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    const realIP = request.headers.get("x-real-ip");
    if (realIP) {
        return realIP;
    }

    // Fallback for local development
    return "127.0.0.1";
}

/**
 * Pre-configured rate limiters for different use cases
 */
export const rateLimiters = {
    /** Strict: 5 requests per minute (contact form) */
    strict: (id: string) => checkRateLimit(id, { windowMs: 60 * 1000, maxRequests: 5 }),

    /** Standard: 20 requests per minute */
    standard: (id: string) => checkRateLimit(id, { windowMs: 60 * 1000, maxRequests: 20 }),

    /** Relaxed: 100 requests per minute */
    relaxed: (id: string) => checkRateLimit(id, { windowMs: 60 * 1000, maxRequests: 100 }),
};
