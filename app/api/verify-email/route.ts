import { NextRequest, NextResponse } from "next/server";
import dns from "dns";
import { promisify } from "util";
import { redis } from "@/lib/redis"; // Import Redis client

const resolveMx = promisify(dns.resolveMx);

// Types for different API responses
interface VerificationResult {
    valid: boolean;
    reason: string;
    provider?: string;
    details?: {
        format: boolean;
        domain: boolean;
        mx: boolean;
        disposable: boolean;
        smtp?: boolean;
    };
}

/**
 * Fallback: Verify email via DNS MX record lookup
 */
async function verifyViaDNS(domain: string): Promise<VerificationResult> {
    try {
        const mxRecords = await resolveMx(domain);

        if (!mxRecords || mxRecords.length === 0) {
            return {
                valid: false,
                reason: "Email domain cannot receive emails (no MX records)",
                provider: "DNS",
                details: { format: true, domain: true, mx: false, disposable: false }
            } as any;
        }

        // Basic disposable check for DNS fallback
        const DISPOSABLE_DOMAINS = new Set([
            "tempmail.com", "throwaway.com", "guerrillamail.com", "10minutemail.com",
            "mailinator.com", "yopmail.com", "sharklasers.com", "trashmail.com",
            "getnada.com", "temp-mail.org", "fakeinbox.com", "dispostable.com",
            "maildrop.cc", "mohmal.com", "emailondeck.com"
        ]);

        if (DISPOSABLE_DOMAINS.has(domain)) {
            return {
                valid: false,
                reason: "Disposable email addresses are not allowed",
                provider: "DNS",
                details: { format: true, domain: true, mx: true, disposable: true }
            };
        }

        return {
            valid: true,
            reason: "Email domain verified successfully",
            provider: "DNS",
            details: { format: true, domain: true, mx: true, disposable: false }
        };

    } catch (dnsError) {
        return {
            valid: false,
            reason: "Email domain does not exist",
            provider: "DNS",
            details: { format: true, domain: false, mx: false, disposable: false }
        };
    }
}

// Timeout helper (5 seconds max)
const fetchWithTimeout = async (url: string, options: any = {}, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

/**
 * Provider 1: ZeroBounce (Fast & Reliable)
 */
async function verifyZeroBounce(email: string, apiKey: string): Promise<VerificationResult | null> {
    try {
        const res = await fetchWithTimeout(`https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`);
        const data = await res.json();

        // If error or no status, failover
        if (data.error || !data.status) {
            console.warn("ZeroBounce error:", data);
            return null;
        }

        // status: "valid", "invalid", "catch-all", "unknown", "spamtrap", "abuse", "do_not_mail"
        if (data.status === "valid" || data.status === "catch-all") {
            return {
                valid: true,
                reason: "Verified by ZeroBounce",
                provider: "ZeroBounce",
                details: { format: true, domain: true, mx: true, disposable: false, smtp: true }
            };
        }

        // If status is "unknown", don't block - failover to next provider
        if (data.status === "unknown") {
            return null;
        }

        // Otherwise it's genuinely invalid (spamtrap, invalid, etc)
        return {
            valid: false,
            reason: `Email is ${data.status}`,
            provider: "ZeroBounce",
            details: {
                format: true,
                domain: true,
                mx: data.mx_found === "true",
                disposable: false,
                smtp: false
            }
        };
    } catch (e) {
        console.warn("ZeroBounce API failed:", e);
        return null;
    }
}

/**
 * Provider 2: Abstract API
 */
async function verifyAbstract(email: string, apiKey: string): Promise<VerificationResult | null> {
    try {
        const res = await fetchWithTimeout(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`);
        const data = await res.json();

        if (data.error) throw new Error(data.error.message || "Abstract API Error");

        // "deliverable" or "catchall" are generally acceptable, "undeliverable" is not
        const isValid = data.deliverability === "DELIVERABLE" || data.deliverability === "CATCHALL";

        return {
            valid: isValid,
            reason: isValid ? "Verified by Abstract API" : "Email address does not exist",
            provider: "AbstractAPI",
            details: {
                format: data.is_valid_format.value,
                domain: true,
                mx: data.is_mx_found.value,
                disposable: data.is_disposable_email.value,
                smtp: isValid
            }
        };
    } catch (e) {
        console.warn("Abstract API failed:", e);
        return null; // Fallback to next provider
    }
}

/**
 * Provider 3: ApiLayer (Email Verification API)
 */
async function verifyApiLayer(email: string, apiKey: string): Promise<VerificationResult | null> {
    try {
        const res = await fetchWithTimeout(`https://api.apilayer.com/email_verification/check?email=${email}`, {
            headers: { "apikey": apiKey }
        });
        const data = await res.json();

        if (data.error) throw new Error(data.error);

        const isValid = data.format_valid && data.mx_found && data.smtp_check;

        return {
            valid: isValid,
            reason: isValid ? "Verified by ApiLayer" : "Email address invalid",
            provider: "ApiLayer",
            details: {
                format: data.format_valid,
                domain: true,
                mx: data.mx_found,
                disposable: data.disposable,
                smtp: data.smtp_check
            }
        };
    } catch (e) {
        console.warn("ApiLayer failed:", e);
        return null;
    }
}

/**
 * Provider 4: Hunter.io
 */
async function verifyHunter(email: string, apiKey: string): Promise<VerificationResult | null> {
    try {
        const res = await fetchWithTimeout(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`);
        const data = await res.json();

        if (data.errors) throw new Error("Hunter API Error");

        const attrs = data.data;
        const isValid = attrs.status === "valid" || attrs.status === "accept_all";

        return {
            valid: isValid,
            reason: isValid ? "Verified by Hunter.io" : "Email address invalid",
            provider: "Hunter.io",
            details: {
                format: true, // Hunter validates format implicitly
                domain: true,
                mx: attrs.mx_records,
                disposable: attrs.disposable,
                smtp: isValid
            }
        };
    } catch (e) {
        console.warn("Hunter API failed:", e);
        return null;
    }
}

export async function POST(request: NextRequest): Promise<NextResponse<VerificationResult>> {
    try {
        const { email } = await request.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json({ valid: false, reason: "Email is required" } as any, { status: 400 });
        }

        // 1. Basic format validation (Regex) - Instant
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({
                valid: false,
                reason: "Invalid email format",
                provider: "FormatCheck",
                details: { format: false, domain: false, mx: false, disposable: false }
            });
        }

        // 2. Check Cache (Redis) - Instant Check
        const cacheKey = `email-verification-v2:${email.toLowerCase()}`;
        if (redis) {
            try {
                const cachedResult = await redis.get<VerificationResult>(cacheKey);
                if (cachedResult) {
                    console.log("Using cached email verification for:", email);
                    // Return cached result with note
                    return NextResponse.json({
                        ...cachedResult,
                        provider: `${cachedResult.provider} (Cached)`
                    });
                }
            } catch (err) {
                console.warn("Redis verify error:", err);
            }
        }

        // 3. Try Providers (Optimized Order: ZeroBounce First)
        let result: VerificationResult | null = null;

        // Priority 1: ZeroBounce (Best Speed/Reliability)
        if (!result && process.env.EMAIL_VERIFY_ZEROBOUNCE_KEY) {
            result = await verifyZeroBounce(email, process.env.EMAIL_VERIFY_ZEROBOUNCE_KEY);
        }

        // Priority 2: Abstract API
        if (!result && process.env.EMAIL_VERIFY_ABSTRACT_KEY) {
            result = await verifyAbstract(email, process.env.EMAIL_VERIFY_ABSTRACT_KEY);
        }

        // Priority 3: ApiLayer
        if (!result && process.env.EMAIL_VERIFY_APILAYER_KEY) {
            result = await verifyApiLayer(email, process.env.EMAIL_VERIFY_APILAYER_KEY);
        }

        // Priority 4: Hunter.io
        if (!result && process.env.EMAIL_VERIFY_HUNTER_KEY) {
            result = await verifyHunter(email, process.env.EMAIL_VERIFY_HUNTER_KEY);
        }

        // 4. Fallback to DNS MX Record Check (Free, Always Available)
        if (!result) {
            console.log("Falling back to DNS verification for", email);
            const domain = email.split("@")[1]?.toLowerCase();
            result = await verifyViaDNS(domain || "");
        }

        // 5. Cache result if successful (Redis)
        // Cache valid results for 24 hours, invalid for 1 hour (retry sooner)
        if (redis && result && result.provider !== "DNS") {
            const ttl = result.valid ? 60 * 60 * 24 : 60 * 60;
            await redis.set(cacheKey, result, { ex: ttl });
        }

        return NextResponse.json(result);

    } catch (err) {
        console.error("Verification error:", err);
        return NextResponse.json({
            valid: false,
            reason: "Verification failed",
            provider: "Error",
        }, { status: 500 });
    }
}
