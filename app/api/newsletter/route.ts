import { NextRequest, NextResponse } from "next/server";
import { getClientIP } from "@/lib/rate-limit";
import { rateLimiters, checkRateLimit, isRedisAvailable } from "@/lib/redis";
import { sanitizeInput } from "@/lib/security";

// Discord webhook URL from environment
const DISCORD_WEBHOOK_URL = process.env.DISCORD_NEWSLETTER_WEBHOOK_URL;

async function sendToDiscord(email: string) {
    if (!DISCORD_WEBHOOK_URL) {
        console.warn("Discord webhook URL not configured");
        return false;
    }

    const embed = {
        title: "📰 New Newsletter Signup",
        color: 0x22c55e, // Green color
        fields: [
            {
                name: "📧 Email",
                value: email,
                inline: false,
            },
        ],
        timestamp: new Date().toISOString(),
        footer: {
            text: "Axoraco Newsletter",
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

        if (isRedisAvailable() && rateLimiters.newsletter) {
            const rateLimitResult = await checkRateLimit(rateLimiters.newsletter, clientIP);
            if (!rateLimitResult.success) {
                return NextResponse.json(
                    {
                        error: "Too many requests. Please try again later.",
                        retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
                    },
                    {
                        status: 429,
                        headers: {
                            "Retry-After": String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000)),
                            "X-RateLimit-Limit": String(rateLimitResult.limit),
                            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
                        }
                    }
                );
            }
        }

        const body = await request.json();
        const email = sanitizeInput(body.email || "");

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Strict email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Send to Discord
        const sent = await sendToDiscord(email);

        if (!sent) {
            console.warn("Discord notification not sent (webhook may not be configured)");
        }

        // Return success
        return NextResponse.json(
            {
                success: true,
                message: "Thanks for subscribing! You'll hear from us soon.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Newsletter signup error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again." },
            { status: 500 }
        );
    }
}
