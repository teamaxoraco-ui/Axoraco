import { redis, rateLimiters, checkRateLimit, isRedisAvailable, createRateLimiter } from "../redis";

describe("Redis Rate Limiting", () => {
    describe("isRedisAvailable", () => {
        it("returns false when not configured", () => {
            // Redis is not configured in test environment
            expect(isRedisAvailable()).toBe(false);
        });
    });

    describe("checkRateLimit", () => {
        it("allows all requests when limiter is null", async () => {
            const result = await checkRateLimit(null, "test-ip");

            expect(result.success).toBe(true);
            expect(result.remaining).toBe(999);
        });

        it("returns correct structure", async () => {
            const result = await checkRateLimit(null, "127.0.0.1");

            expect(result).toHaveProperty("success");
            expect(result).toHaveProperty("remaining");
            expect(result).toHaveProperty("reset");
            expect(result).toHaveProperty("limit");
        });
    });

    describe("rateLimiters", () => {
        it("has contact limiter (null when not configured)", () => {
            expect(rateLimiters.contact).toBe(null);
        });

        it("has newsletter limiter (null when not configured)", () => {
            expect(rateLimiters.newsletter).toBe(null);
        });

        it("has api limiter (null when not configured)", () => {
            expect(rateLimiters.api).toBe(null);
        });
    });

    describe("createRateLimiter", () => {
        it("returns null when Redis not configured", () => {
            const limiter = createRateLimiter(10, "1 m", "test");
            expect(limiter).toBe(null);
        });
    });

    describe("redis client", () => {
        it("is null when not configured", () => {
            expect(redis).toBe(null);
        });
    });
});
