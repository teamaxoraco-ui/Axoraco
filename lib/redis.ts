/**
 * @fileoverview Upstash Redis client for distributed rate limiting.
 * 
 * Setup:
 * 1. Create account at upstash.com (free tier: 10k requests/day)
 * 2. Create a Redis database
 * 3. Copy REST URL and Token to .env.local
 */

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { logger } from "@/lib/logger";

// Check if Redis is configured
const isRedisConfigured = Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

// Create Redis client (only if configured)
export const redis = isRedisConfigured
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
    : null;

/**
 * Create a rate limiter with Redis backend
 * Falls back to allowing all requests if Redis is not configured
 * 
 * @param requests - Number of requests allowed
 * @param window - Time window (e.g., "1 m" for 1 minute)
 * @param prefix - Prefix for Redis keys
 */
export function createRateLimiter(
    requests: number,
    window: `${number} ${"s" | "m" | "h" | "d"}`,
    prefix: string = "ratelimit"
) {
    if (!redis) {
        logger.warn("Redis not configured - rate limiting disabled");
        return null;
    }

    return new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(requests, window),
        prefix,
        analytics: true,
    });
}

// Pre-configured rate limiters
export const rateLimiters = {
    /**
     * Strict limiter for contact forms: 5 requests per minute
     */
    contact: redis
        ? new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(5, "1 m"),
            prefix: "ratelimit:contact",
            analytics: true,
            timeout: 1000,
        })
        : null,

    /**
     * Newsletter limiter: 3 requests per hour
     */
    newsletter: redis
        ? new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(3, "1 h"),
            prefix: "ratelimit:newsletter",
            analytics: true,
            timeout: 1000,
        })
        : null,

    /**
     * API limiter: 100 requests per minute
     */
    api: redis
        ? new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(100, "1 m"),
            prefix: "ratelimit:api",
            analytics: true,
            timeout: 1000,
        })
        : null,
};

/**
 * Check rate limit for an identifier
 * 
 * @param limiter - Rate limiter to use
 * @param identifier - Unique identifier (usually IP address)
 * @returns Object with success status and metadata
 */
export async function checkRateLimit(
    limiter: Ratelimit | null,
    identifier: string
): Promise<{
    success: boolean;
    remaining: number;
    reset: number;
    limit: number;
}> {
    // If no limiter, allow all requests
    if (!limiter) {
        return {
            success: true,
            remaining: 999,
            reset: Date.now(),
            limit: 999,
        };
    }

    const result = await limiter.limit(identifier);

    return {
        success: result.success,
        remaining: result.remaining,
        reset: result.reset,
        limit: result.limit,
    };
}

/**
 * Check if Redis is available
 */
export function isRedisAvailable(): boolean {
    return isRedisConfigured && redis !== null;
}
