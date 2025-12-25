import {
    sendEmail,
    sendContactNotification,
    sendContactAutoReply,
    isEmailConfigured,
} from "../email";

// Mock fetch
global.fetch = jest.fn();

describe("Email Service", () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
    });

    describe("isEmailConfigured", () => {
        it("returns false when API key not set", () => {
            expect(isEmailConfigured()).toBe(false);
        });
    });

    describe("sendEmail", () => {
        it("returns error when not configured", async () => {
            const result = await sendEmail({
                to: "test@example.com",
                subject: "Test",
                html: "<h1>Test</h1>",
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain("not configured");
        });
    });

    describe("sendContactNotification", () => {
        it("returns error when not configured", async () => {
            const result = await sendContactNotification({
                name: "John Doe",
                email: "john@example.com",
                message: "Hello world",
            });

            expect(result.success).toBe(false);
        });

        it("accepts optional company field", async () => {
            const result = await sendContactNotification({
                name: "John Doe",
                email: "john@example.com",
                company: "Acme Inc",
                message: "Hello world",
            });

            expect(result.success).toBe(false);
        });
    });

    describe("sendContactAutoReply", () => {
        it("returns error when not configured", async () => {
            const result = await sendContactAutoReply({
                name: "John Doe",
                email: "john@example.com",
            });

            expect(result.success).toBe(false);
        });
    });
});
