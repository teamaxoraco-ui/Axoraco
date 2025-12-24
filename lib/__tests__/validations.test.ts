import { validateContactForm, validateNewsletter } from "../validations";

describe("Form Validations", () => {
    describe("validateContactForm", () => {
        it("accepts valid contact form data", () => {
            const result = validateContactForm({
                name: "John Doe",
                email: "john@example.com",
                message: "This is a test message that is long enough.",
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.name).toBe("John Doe");
                expect(result.data.email).toBe("john@example.com");
            }
        });

        it("accepts optional company field", () => {
            const result = validateContactForm({
                name: "John Doe",
                email: "john@example.com",
                company: "Acme Corp",
                message: "This is a test message.",
            });

            expect(result.success).toBe(true);
            if (result.success) {
                expect(result.data.company).toBe("Acme Corp");
            }
        });

        it("rejects invalid email", () => {
            const result = validateContactForm({
                name: "John",
                email: "not-an-email",
                message: "Test message here.",
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].path).toContain("email");
            }
        });

        it("rejects short name", () => {
            const result = validateContactForm({
                name: "J",
                email: "john@example.com",
                message: "Test message here.",
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].path).toContain("name");
            }
        });

        it("rejects short message", () => {
            const result = validateContactForm({
                name: "John",
                email: "john@example.com",
                message: "Hi",
            });

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.errors[0].path).toContain("message");
            }
        });

        it("rejects name with invalid characters", () => {
            const result = validateContactForm({
                name: "John123",
                email: "john@example.com",
                message: "Test message here.",
            });

            expect(result.success).toBe(false);
        });
    });

    describe("validateNewsletter", () => {
        it("accepts valid email", () => {
            const result = validateNewsletter({ email: "user@example.com" });
            expect(result.success).toBe(true);
        });

        it("rejects invalid email", () => {
            const result = validateNewsletter({ email: "invalid" });
            expect(result.success).toBe(false);
        });

        it("rejects empty email", () => {
            const result = validateNewsletter({ email: "" });
            expect(result.success).toBe(false);
        });
    });
});
