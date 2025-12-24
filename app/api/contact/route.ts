import { NextRequest, NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validations";
import { getClientIP, rateLimiters } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { sanitizeInput, containsSuspiciousPatterns, isHoneypotTriggered, HONEYPOT_FIELD } from "@/lib/security";

// Discord webhook URL from environment
const DISCORD_WEBHOOK_URL = process.env.DISCORD_CONTACT_WEBHOOK_URL;

interface ContactFormData {
    name: string;
    email: string;
    company?: string;
    message: string;
}

async function sendToDiscord(data: ContactFormData, clientIP: string) {
    if (!DISCORD_WEBHOOK_URL) {
        logger.warn("Discord webhook URL not configured");
        return false;
    }

    const embed = {
        title: "📬 New Contact Form Submission",
        color: 0x6366f1, // Indigo color
        fields: [
            {
                name: "👤 Name",
                value: data.name,
                inline: true,
            },
            {
                name: "📧 Email",
                value: data.email,
                inline: true,
            },
            ...(data.company
                ? [
                    {
                        name: "🏢 Company",
                        value: data.company,
                        inline: true,
                    },
                ]
                : []),
            {
                name: "💬 Message",
                value: data.message.substring(0, 1024), // Discord limit
                inline: false,
            },
            {
                name: "🌐 IP Address",
                value: clientIP,
                inline: true,
            },
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: "Axoraco Contact Form",
        },
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                embeds: [embed],
            }),
        });

        return response.ok;
    } catch (error) {
        logger.error("Failed to send to Discord", { email: data.email }, error as Error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    const startTime = Date.now();
    const clientIP = getClientIP(request);

    try {
        // Rate limiting
        const { isLimited, remaining, resetIn } = rateLimiters.strict(clientIP);

        if (isLimited) {
            logger.warn("Rate limit exceeded", { clientIP, resetIn });
            return NextResponse.json(
                {
                    error: "Too many requests. Please try again later.",
                    retryAfter: Math.ceil(resetIn / 1000),
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": Math.ceil(resetIn / 1000).toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                    },
                }
            );
        }

        const body = await request.json();

        // Honeypot check (bot detection)
        if (isHoneypotTriggered(body)) {
            logger.warn("Honeypot triggered - likely bot", { clientIP });
            // Return fake success to confuse bots
            return NextResponse.json(
                { success: true, message: "Thank you for your message!" },
                { status: 200 }
            );
        }

        // Validate with Zod
        const validation = validateContactForm(body);

        if (!validation.success) {
            const errors = validation.error.errors.map((e) => ({
                field: e.path.join("."),
                message: e.message,
            }));

            logger.info("Validation failed", { clientIP, errors });
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: errors,
                },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedData: ContactFormData = {
            name: sanitizeInput(validation.data.name, 100),
            email: sanitizeInput(validation.data.email, 254),
            company: validation.data.company ? sanitizeInput(validation.data.company, 100) : undefined,
            message: sanitizeInput(validation.data.message, 5000),
        };

        // Check for suspicious patterns (XSS attempts)
        const allInputs = `${sanitizedData.name} ${sanitizedData.message} ${sanitizedData.company || ""}`;
        if (containsSuspiciousPatterns(allInputs)) {
            logger.warn("Suspicious patterns detected", { clientIP, name: sanitizedData.name });
            return NextResponse.json(
                { error: "Invalid input detected. Please remove any special characters." },
                { status: 400 }
            );
        }

        // Send to Discord
        const sent = await sendToDiscord(sanitizedData, clientIP);

        const duration = Date.now() - startTime;
        logger.apiRequest("POST", "/api/contact", 200, duration, {
            clientIP,
            email: sanitizedData.email,
            discordSent: sent,
        });

        // Return success with rate limit info
        return NextResponse.json(
            {
                success: true,
                message: "Thank you for your message! We'll get back to you soon.",
            },
            {
                status: 200,
                headers: {
                    "X-RateLimit-Remaining": remaining.toString(),
                },
            }
        );
    } catch (error) {
        const duration = Date.now() - startTime;
        logger.error("Contact form error", { clientIP, duration }, error as Error);

        return NextResponse.json(
            { error: "Failed to process your request. Please try again." },
            { status: 500 }
        );
    }
}

/**
 * Return honeypot field name for client-side forms
 */
export async function GET() {
    return NextResponse.json({
        honeypotField: HONEYPOT_FIELD,
    });
}
