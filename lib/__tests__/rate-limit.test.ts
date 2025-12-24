import { checkRateLimit, rateLimiters } from "../rate-limit";

describe("Rate Limiter", () => {
    beforeEach(() => {
        // Reset internal state by using unique identifiers per test
    });

    describe("checkRateLimit", () => {
        it("allows first request", () => {
            const result = checkRateLimit("test-ip-1", { windowMs: 60000, maxRequests: 5 });

            expect(result.isLimited).toBe(false);
            expect(result.remaining).toBe(4); // 5 - 1 = 4 remaining
        });

        it("tracks request count", () => {
            const id = "test-ip-2";
            const config = { windowMs: 60000, maxRequests: 3 };

            // First request
            let result = checkRateLimit(id, config);
            expect(result.remaining).toBe(2);

            // Second request
            result = checkRateLimit(id, config);
            expect(result.remaining).toBe(1);

            // Third request
            result = checkRateLimit(id, config);
            expect(result.remaining).toBe(0);

            // Fourth request - should be limited
            result = checkRateLimit(id, config);
            expect(result.isLimited).toBe(true);
            expect(result.remaining).toBe(0);
        });

        it("resets after window expires", async () => {
            const id = "test-ip-3";
            const config = { windowMs: 100, maxRequests: 1 }; // 100ms window

            // Use up the limit
            checkRateLimit(id, config);
            let result = checkRateLimit(id, config);
            expect(result.isLimited).toBe(true);

            // Wait for window to expire
            await new Promise(resolve => setTimeout(resolve, 150));

            // Should be allowed again
            result = checkRateLimit(id, config);
            expect(result.isLimited).toBe(false);
        });
    });

    describe("rateLimiters presets", () => {
        it("strict limiter allows 5 requests", () => {
            const id = "strict-test-1";

            for (let i = 0; i < 5; i++) {
                const result = rateLimiters.strict(id);
                expect(result.isLimited).toBe(false);
            }

            // 6th request should be limited
            const result = rateLimiters.strict(id);
            expect(result.isLimited).toBe(true);
        });

        it("standard limiter allows 20 requests", () => {
            const id = "standard-test-1";

            for (let i = 0; i < 20; i++) {
                const result = rateLimiters.standard(id);
                expect(result.isLimited).toBe(false);
            }

            // 21st request should be limited
            const result = rateLimiters.standard(id);
            expect(result.isLimited).toBe(true);
        });
    });
});
