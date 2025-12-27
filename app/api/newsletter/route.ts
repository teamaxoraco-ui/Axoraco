import { NextRequest, NextResponse } from "next/server";
import { getClientIP } from "@/lib/rate-limit";
import { rateLimiters, checkRateLimit, isRedisAvailable } from "@/lib/redis";
import { sanitizeInput } from "@/lib/security";
import { sendToGoogleSheets, isGoogleSheetsAvailable } from "@/lib/google-sheets";
import { Resend } from "resend";

// Initialize Resend client
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

// Discord webhook URL
const DISCORD_WEBHOOK_URL = process.env.DISCORD_NEWSLETTER_WEBHOOK_URL;

// Email configuration
const EMAIL_FROM = process.env.EMAIL_FROM || "Axoraco <onboarding@resend.dev>";
const EMAIL_TO = process.env.EMAIL_TO || "team.axoraco@gmail.com";

/**
 * Send welcome email to new subscriber
 */
async function sendWelcomeEmail(email: string): Promise<boolean> {
    if (!resend) return false;

    try {
        await resend.emails.send({
            from: EMAIL_FROM,
            to: email,
            subject: "Welcome to Axoraco! 🚀",
            html: `
                <h2>You're in! 🎉</h2>
                <p>Thanks for subscribing to the Axoraco newsletter.</p>
                <p>You'll be the first to know about:</p>
                <ul>
                    <li>🤖 New AI voice bot features</li>
                    <li>💡 Industry insights & tips</li>
                    <li>🎁 Exclusive offers</li>
                </ul>
                <p>Stay tuned!</p>
                <p>Best,<br>The Axoraco Team</p>
            `,
        });
        return true;
    } catch (error) {
        console.error("Failed to send welcome email:", error);
        return false;
    }
}

/**
 * Send notification to owner about new subscriber
 */
async function sendOwnerNotification(email: string): Promise<boolean> {
    if (!resend) return false;

    try {
        await resend.emails.send({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: `📰 New Newsletter Subscriber: ${email}`,
            html: `
                <h2>New Subscriber!</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><a href="mailto:${email}">Send them a message</a></p>
            `,
        });
        return true;
    } catch (error) {
        console.error("Failed to send owner notification:", error);
        return false;
    }
}

/**
 * Send to Discord
 */
async function sendToDiscord(email: string): Promise<boolean> {
    if (!DISCORD_WEBHOOK_URL) return false;

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                embeds: [{
                    title: "📰 New Newsletter Signup",
                    color: 0x22c55e,
                    fields: [{ name: "📧 Email", value: email, inline: false }],
                    timestamp: new Date().toISOString(),
                    footer: { text: "Axoraco Newsletter" },
                }],
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
        const clientIP = getClientIP(request);

        // Rate limiting (only if Redis configured)
        if (isRedisAvailable() && rateLimiters.newsletter) {
            const rateLimitResult = await checkRateLimit(rateLimiters.newsletter, clientIP);
            if (!rateLimitResult.success) {
                return NextResponse.json(
                    { error: "Too many requests. Please try again later." },
                    { status: 429 }
                );
            }
        }

        const body = await request.json();
        const email = sanitizeInput(body.email || "").toLowerCase();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Send to all channels in parallel
        const [welcomeSent, ownerSent, discordSent, sheetsSent] = await Promise.all([
            sendWelcomeEmail(email),
            sendOwnerNotification(email),
            sendToDiscord(email),
            sendToGoogleSheets({ type: 'newsletter', email, ip: clientIP }),
        ]);

        console.log("Newsletter notifications:", { welcomeSent, ownerSent, discordSent, sheetsSent });

        return NextResponse.json(
            { success: true, message: "Thanks for subscribing! Check your email for a welcome message." },
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

export async function GET() {
    return NextResponse.json({
        resendEnabled: Boolean(resend),
        discordEnabled: Boolean(DISCORD_WEBHOOK_URL),
        googleSheetsEnabled: isGoogleSheetsAvailable(),
        redisEnabled: isRedisAvailable(),
    });
}
