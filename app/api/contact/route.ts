import { NextRequest, NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validations";
import { getClientIP } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { sanitizeInput, containsSuspiciousPatterns, isHoneypotTriggered, HONEYPOT_FIELD } from "@/lib/security";
import { rateLimiters, checkRateLimit, isRedisAvailable } from "@/lib/redis";
import { saveContact, isSupabaseAvailable } from "@/lib/supabase";
import { sendToGoogleSheets, isGoogleSheetsAvailable } from "@/lib/google-sheets";
import { Resend } from "resend";

// Initialize Resend client
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

// Discord webhook URL (fallback if no email)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_CONTACT_WEBHOOK_URL;

// Email configuration
const EMAIL_FROM = process.env.EMAIL_FROM || "Axoraco <onboarding@resend.dev>";
const EMAIL_TO = process.env.EMAIL_TO || "team.axoraco@gmail.com";

interface ContactFormData {
    name: string;
    email: string;
    company?: string;
    message: string;
}

/**
 * Send contact notification via Resend email
 */
async function sendEmailNotification(data: ContactFormData): Promise<boolean> {
    if (!resend) return false;

    try {
        await resend.emails.send({
            from: EMAIL_FROM,
            to: EMAIL_TO,
            subject: `New Contact: ${data.name}`,
            html: `
                <h2>📬 New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
                <p><strong>Message:</strong></p>
                <blockquote style="border-left: 3px solid #6366f1; padding-left: 16px; margin: 16px 0;">
                    ${data.message.replace(/\n/g, "<br>")}
                </blockquote>
            `,
            replyTo: data.email,
        });

        // Send auto-reply to user
        await resend.emails.send({
            from: EMAIL_FROM,
            to: data.email,
            subject: "Thanks for contacting Axoraco! 🚀",
            html: `
                <h2>Hi ${data.name.split(" ")[0]}! 👋</h2>
                <p>Thanks for reaching out. We've received your message and will get back to you within 24 hours.</p>
                <p>In the meantime, feel free to:</p>
                <ul>
                    <li><a href="https://axoraco.vercel.app/ai-voice" target="_blank">Check out our AI Voice Bot solutions</a></li>
                    <li><a href="https://calendly.com/team-axoraco/30min" target="_blank">Book a free strategy session</a></li>
                </ul>
                <p>Best,<br>The Axoraco Team</p>
            `,
        });

        return true;
    } catch (error) {
        logger.error("Failed to send email", { email: data.email }, error as Error);
        return false;
    }
}

/**
 * Send to Discord as fallback
 */
async function sendToDiscord(data: ContactFormData, clientIP: string): Promise<boolean> {
    if (!DISCORD_WEBHOOK_URL) return false;

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                embeds: [{
                    title: "📬 New Contact Form Submission",
                    color: 0x6366f1,
                    fields: [
                        { name: "👤 Name", value: data.name, inline: true },
                        { name: "📧 Email", value: data.email, inline: true },
                        ...(data.company ? [{ name: "🏢 Company", value: data.company, inline: true }] : []),
                        { name: "💬 Message", value: data.message.substring(0, 1024), inline: false },
                        { name: "🌐 IP", value: clientIP, inline: true },
                    ],
                    timestamp: new Date().toISOString(),
                }],
            }),
        });
        return response.ok;
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    const startTime = Date.now();
    const clientIP = getClientIP(request);

    try {
        // Rate limiting with Redis (or fallback)
        const rateLimit = await checkRateLimit(rateLimiters.contact, clientIP);

        if (!rateLimit.success) {
            const resetIn = Math.ceil((rateLimit.reset - Date.now()) / 1000);
            logger.warn("Rate limit exceeded", { clientIP, remaining: rateLimit.remaining });

            return NextResponse.json(
                {
                    error: "Too many requests. Please try again later.",
                    retryAfter: resetIn,
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": resetIn.toString(),
                        "X-RateLimit-Limit": rateLimit.limit.toString(),
                        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                        "X-RateLimit-Reset": rateLimit.reset.toString(),
                    },
                }
            );
        }

        const body = await request.json();

        // Honeypot check
        if (isHoneypotTriggered(body)) {
            logger.warn("Honeypot triggered", { clientIP });
            return NextResponse.json({ success: true, message: "Thank you!" }, { status: 200 });
        }

        // Validate
        const validation = validateContactForm(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validation.error.errors.map(e => ({
                        field: e.path.join("."),
                        message: e.message,
                    })),
                },
                { status: 400 }
            );
        }

        // Sanitize
        const data: ContactFormData = {
            name: sanitizeInput(validation.data.name, 100),
            email: sanitizeInput(validation.data.email, 254),
            company: validation.data.company ? sanitizeInput(validation.data.company, 100) : undefined,
            message: sanitizeInput(validation.data.message, 5000),
        };

        // XSS check
        if (containsSuspiciousPatterns(`${data.name} ${data.message} ${data.company || ""}`)) {
            logger.warn("Suspicious patterns", { clientIP });
            return NextResponse.json(
                { error: "Invalid input detected." },
                { status: 400 }
            );
        }

        // Save to database
        const userAgent = request.headers.get("user-agent") || "unknown";
        const dbResult = await saveContact({
            ...data,
            ip_address: clientIP,
            user_agent: userAgent,
        });

        if (dbResult.success) {
            logger.info("Contact saved to database", { id: dbResult.id, clientIP });
        }

        // Send to all channels in parallel for reliability
        const [emailSent, discordSent, sheetsSent] = await Promise.all([
            resend ? sendEmailNotification(data) : Promise.resolve(false),
            sendToDiscord(data, clientIP),
            sendToGoogleSheets({ type: 'contact', ...data, ip: clientIP }),
        ]);

        logger.info("Notifications sent", { emailSent, discordSent, sheetsSent, clientIP });

        const duration = Date.now() - startTime;
        logger.apiRequest("POST", "/api/contact", 200, duration, {
            clientIP,
            emailSent: Boolean(resend),
            redisEnabled: isRedisAvailable(),
        });

        return NextResponse.json(
            { success: true, message: "Thank you for your message! We'll get back to you soon." },
            {
                status: 200,
                headers: {
                    "X-RateLimit-Remaining": rateLimit.remaining.toString(),
                },
            }
        );
    } catch (error) {
        logger.error("Contact form error", { clientIP }, error as Error);
        return NextResponse.json(
            { error: "Failed to process request." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        honeypotField: HONEYPOT_FIELD,
        redisEnabled: isRedisAvailable(),
        databaseEnabled: isSupabaseAvailable(),
        googleSheetsEnabled: isGoogleSheetsAvailable(),
    });
}
