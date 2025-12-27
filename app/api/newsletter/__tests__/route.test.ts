import { POST } from "../route";
import { NextRequest } from "next/server";

// Mock dependencies
jest.mock("@/lib/rate-limit", () => ({
    getClientIP: jest.fn(() => "127.0.0.1"),
}));

jest.mock("@/lib/redis", () => ({
    isRedisAvailable: jest.fn(() => false),
    rateLimiters: { newsletter: null },
    checkRateLimit: jest.fn(),
}));

jest.mock("@/lib/security", () => ({
    sanitizeInput: jest.fn((input) => input?.trim() || ""),
}));

// Mock fetch for Discord webhook
global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true } as Response)
);

describe("Newsletter API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return 400 if email is missing", async () => {
        const request = new NextRequest("http://localhost:3000/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe("Email is required");
    });

    it("should return 400 for invalid email format", async () => {
        const request = new NextRequest("http://localhost:3000/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "invalid-email" }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(400);
        expect(data.error).toBe("Invalid email format");
    });

    it("should return 200 for valid email", async () => {
        const request = new NextRequest("http://localhost:3000/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "test@example.com" }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.message).toContain("subscribing");
    });

    it("should return 429 when rate limited", async () => {
        // Enable rate limiting for this test
        const { isRedisAvailable, rateLimiters, checkRateLimit } = require("@/lib/redis");
        isRedisAvailable.mockReturnValue(true);
        rateLimiters.newsletter = {};
        checkRateLimit.mockResolvedValue({
            success: false,
            remaining: 0,
            reset: Date.now() + 60000,
            limit: 3,
        });

        const request = new NextRequest("http://localhost:3000/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "test@example.com" }),
        });

        const response = await POST(request);
        const data = await response.json();

        expect(response.status).toBe(429);
        expect(data.error).toContain("Too many requests");
        expect(response.headers.get("Retry-After")).toBeTruthy();
    });
});
