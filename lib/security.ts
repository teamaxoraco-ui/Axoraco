/**
 * @fileoverview Security utilities for input sanitization and XSS prevention.
 */

/**
 * HTML entities to escape
 */
const HTML_ENTITIES: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
};

/**
 * Escape HTML special characters to prevent XSS
 * 
 * @param input - String to sanitize
 * @returns Sanitized string safe for HTML output
 * 
 * @example
 * escapeHtml("<script>alert('xss')</script>")
 * // Returns: "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;"
 */
export function escapeHtml(input: string): string {
    return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

/**
 * Strip HTML tags from input
 * 
 * @param input - String potentially containing HTML
 * @returns String with HTML tags removed
 */
export function stripHtml(input: string): string {
    return input.replace(/<[^>]*>/g, "");
}

/**
 * Sanitize user input for safe storage and display
 * - Trims whitespace
 * - Removes null bytes
 * - Normalizes unicode
 * - Limits length
 * 
 * @param input - User input to sanitize
 * @param maxLength - Maximum allowed length (default: 10000)
 * @returns Sanitized string
 */
export function sanitizeInput(input: string, maxLength = 10000): string {
    if (typeof input !== "string") {
        return "";
    }

    return input
        // Remove null bytes
        .replace(/\0/g, "")
        // Normalize unicode
        .normalize("NFKC")
        // Trim whitespace
        .trim()
        // Limit length
        .slice(0, maxLength);
}

/**
 * Validate email format strictly
 * 
 * @param email - Email to validate
 * @returns True if email format is valid
 */
export function isValidEmail(email: string): boolean {
    // RFC 5322 compliant email regex (simplified but robust)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * Check if string contains potential script injection
 * 
 * @param input - String to check
 * @returns True if suspicious patterns detected
 */
export function containsSuspiciousPatterns(input: string): boolean {
    const lowerInput = input.toLowerCase();
    const suspiciousPatterns = [
        "<script",
        "javascript:",
        "onerror=",
        "onload=",
        "onclick=",
        "onmouseover=",
        "eval(",
        "document.cookie",
        "document.location",
        "window.location",
    ];

    return suspiciousPatterns.some((pattern) => lowerInput.includes(pattern));
}

/**
 * Honeypot field name for bot detection
 * Use this as a hidden field - if filled, it's a bot
 */
export const HONEYPOT_FIELD = "website_url_hp";

/**
 * Check if honeypot was triggered (bot detection)
 * 
 * @param formData - Form data object
 * @returns True if honeypot is filled (likely a bot)
 */
export function isHoneypotTriggered(formData: Record<string, unknown>): boolean {
    const honeypotValue = formData[HONEYPOT_FIELD];
    return typeof honeypotValue === "string" && honeypotValue.length > 0;
}

/**
 * Generate a simple CSRF token
 * Note: For production, use a proper CSRF library with session storage
 */
export function generateSimpleToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
