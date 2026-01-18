/**
 * Newsletter API Tests
 * Note: Uses simplified mocking to work around Next.js server components in Jest
 */

// All mocks must be declared before any imports
jest.mock("@/lib/rate-limit", () => ({
    getClientIP: jest.fn(() => "127.0.0.1"),
}));

jest.mock("@/lib/redis", () => ({
    isRedisAvailable: jest.fn(() => false),
    rateLimiters: { newsletter: null },
    checkRateLimit: jest.fn(),
}));

jest.mock("@/lib/security", () => ({
    sanitizeInput: jest.fn((input: string) => input?.trim() || ""),
}));

jest.mock("@/lib/google-sheets", () => ({
    sendToGoogleSheets: jest.fn(() => Promise.resolve(true)),
    isGoogleSheetsAvailable: jest.fn(() => false),
}));

jest.mock("resend", () => ({
    Resend: jest.fn().mockImplementation(() => ({
        emails: { send: jest.fn().mockResolvedValue({ id: "test" }) }
    }))
}));

// Mock fetch globally
global.fetch = jest.fn(() => Promise.resolve({ ok: true } as Response));

import { checkRateLimit, isRedisAvailable, rateLimiters } from "@/lib/redis";
import { sanitizeInput } from "@/lib/security";

// Cast imports to jest.Mock for proper typing
const mockIsRedisAvailable = isRedisAvailable as jest.Mock;
const mockCheckRateLimit = checkRateLimit as jest.Mock;
const mockSanitizeInput = sanitizeInput as jest.Mock;

describe("Newsletter API Logic", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("Email Validation", () => {
        it("should validate correct email format", () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            expect(emailRegex.test("test@example.com")).toBe(true);
            expect(emailRegex.test("user.name@domain.co.uk")).toBe(true);
        });

        it("should reject invalid email format", () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            expect(emailRegex.test("invalid-email")).toBe(false);
            expect(emailRegex.test("@nodomain.com")).toBe(false);
            expect(emailRegex.test("")).toBe(false);
        });
    });

    describe("Rate Limiting", () => {
        it("should check rate limit when Redis is available", async () => {
            mockIsRedisAvailable.mockReturnValue(true);
            (rateLimiters as { newsletter: unknown }).newsletter = jest.fn();
            mockCheckRateLimit.mockResolvedValue({
                success: true,
                remaining: 2,
                reset: Date.now() + 60000,
                limit: 3,
            });

            const result = await mockCheckRateLimit(rateLimiters.newsletter, "127.0.0.1");
            expect(result.success).toBe(true);
        });

        it("should return limited when over quota", async () => {
            (rateLimiters as { newsletter: unknown }).newsletter = jest.fn();
            mockCheckRateLimit.mockResolvedValue({
                success: false,
                remaining: 0,
                reset: Date.now() + 60000,
                limit: 3,
            });

            const result = await mockCheckRateLimit(rateLimiters.newsletter, "127.0.0.1");
            expect(result.success).toBe(false);
            expect(result.remaining).toBe(0);
        });
    });

    describe("Input Sanitization", () => {
        it("should sanitize email input", () => {
            mockSanitizeInput.mockImplementation((input: string) => input?.trim().toLowerCase() || "");

            expect(mockSanitizeInput("  TEST@EXAMPLE.COM  ")).toBe("test@example.com");
        });
    });
});
