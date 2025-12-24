import { NextRequest, NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validations";
import { getClientIP, rateLimiters } from "@/lib/rate-limit";

// Discord webhook URL from environment
const DISCORD_WEBHOOK_URL = process.env.DISCORD_CONTACT_WEBHOOK_URL;

interface ContactFormData {
    name: string;
    email: string;
    company?: string;
    message: string;
}

async function sendToDiscord(data: ContactFormData) {
    if (!DISCORD_WEBHOOK_URL) {
        console.warn("Discord webhook URL not configured");
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
        console.error("Failed to send to Discord:", error);
        return false;
    }
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const clientIP = getClientIP(request);
        const { isLimited, remaining, resetIn } = rateLimiters.strict(clientIP);

        if (isLimited) {
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

        // Validate with Zod
        const validation = validateContactForm(body);

        if (!validation.success) {
            const errors = validation.error.errors.map(e => ({
                field: e.path.join("."),
                message: e.message,
            }));

            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: errors,
                },
                { status: 400 }
            );
        }

        const { name, email, company, message } = validation.data;

        // Send to Discord
        const sent = await sendToDiscord({ name, email, company, message });

        if (!sent) {
            console.warn("Discord notification not sent (webhook may not be configured)");
        }

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
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to process your request. Please try again." },
            { status: 500 }
        );
    }
}
