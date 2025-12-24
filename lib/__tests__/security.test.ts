import {
    escapeHtml,
    stripHtml,
    sanitizeInput,
    isValidEmail,
    containsSuspiciousPatterns,
    isHoneypotTriggered,
    HONEYPOT_FIELD,
} from "../security";

describe("Security Utilities", () => {
    describe("escapeHtml", () => {
        it("escapes HTML special characters", () => {
            expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
            expect(escapeHtml('"test"')).toBe("&quot;test&quot;");
            expect(escapeHtml("'test'")).toBe("&#x27;test&#x27;");
            expect(escapeHtml("a & b")).toBe("a &amp; b");
        });

        it("handles normal text unchanged", () => {
            expect(escapeHtml("Hello World")).toBe("Hello World");
            expect(escapeHtml("test@example.com")).toBe("test@example.com");
        });

        it("escapes complex XSS attempts", () => {
            const xss = '<script>alert("xss")</script>';
            const escaped = escapeHtml(xss);
            expect(escaped).not.toContain("<script>");
            expect(escaped).not.toContain("</script>");
        });
    });

    describe("stripHtml", () => {
        it("removes HTML tags", () => {
            expect(stripHtml("<b>bold</b>")).toBe("bold");
            expect(stripHtml("<script>alert(1)</script>")).toBe("alert(1)");
        });

        it("handles nested tags", () => {
            expect(stripHtml("<div><p>text</p></div>")).toBe("text");
        });

        it("handles text without tags", () => {
            expect(stripHtml("plain text")).toBe("plain text");
        });
    });

    describe("sanitizeInput", () => {
        it("trims whitespace", () => {
            expect(sanitizeInput("  hello  ")).toBe("hello");
        });

        it("removes null bytes", () => {
            expect(sanitizeInput("hello\0world")).toBe("helloworld");
        });

        it("enforces max length", () => {
            const longString = "a".repeat(100);
            expect(sanitizeInput(longString, 10)).toBe("a".repeat(10));
        });

        it("handles non-string input", () => {
            expect(sanitizeInput(null as unknown as string)).toBe("");
            expect(sanitizeInput(undefined as unknown as string)).toBe("");
            expect(sanitizeInput(123 as unknown as string)).toBe("");
        });

        it("normalizes unicode", () => {
            // Composed vs decomposed characters
            const input = "café";
            const result = sanitizeInput(input);
            expect(result).toBe("café");
        });
    });

    describe("isValidEmail", () => {
        it("accepts valid emails", () => {
            expect(isValidEmail("user@example.com")).toBe(true);
            expect(isValidEmail("user.name@example.co.uk")).toBe(true);
            expect(isValidEmail("user+tag@example.com")).toBe(true);
        });

        it("rejects invalid emails", () => {
            expect(isValidEmail("invalid")).toBe(false);
            expect(isValidEmail("@example.com")).toBe(false);
            expect(isValidEmail("user@")).toBe(false);
            expect(isValidEmail("")).toBe(false);
        });

        it("rejects emails over 254 characters", () => {
            const longEmail = "a".repeat(250) + "@b.com";
            expect(isValidEmail(longEmail)).toBe(false);
        });
    });

    describe("containsSuspiciousPatterns", () => {
        it("detects script tags", () => {
            expect(containsSuspiciousPatterns("<script>alert(1)</script>")).toBe(true);
            expect(containsSuspiciousPatterns("<SCRIPT>alert(1)</SCRIPT>")).toBe(true);
        });

        it("detects javascript: urls", () => {
            expect(containsSuspiciousPatterns("javascript:alert(1)")).toBe(true);
        });

        it("detects event handlers", () => {
            expect(containsSuspiciousPatterns('<img onerror="alert(1)">')).toBe(true);
            expect(containsSuspiciousPatterns("onclick=alert")).toBe(true);
        });

        it("detects eval calls", () => {
            expect(containsSuspiciousPatterns("eval(userInput)")).toBe(true);
        });

        it("allows normal text", () => {
            expect(containsSuspiciousPatterns("Hello, I need help with my project")).toBe(false);
            expect(containsSuspiciousPatterns("Please contact me at user@example.com")).toBe(false);
        });
    });

    describe("isHoneypotTriggered", () => {
        it("returns true when honeypot is filled", () => {
            expect(isHoneypotTriggered({ [HONEYPOT_FIELD]: "spam" })).toBe(true);
        });

        it("returns false when honeypot is empty", () => {
            expect(isHoneypotTriggered({ [HONEYPOT_FIELD]: "" })).toBe(false);
        });

        it("returns false when honeypot is missing", () => {
            expect(isHoneypotTriggered({ name: "test" })).toBe(false);
        });
    });
});
