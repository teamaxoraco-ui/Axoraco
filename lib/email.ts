/**
 * @fileoverview Email service using Resend for transactional emails.
 * Provides reliable email delivery for contact form submissions.
 * 
 * Setup:
 * 1. Create account at resend.com (free tier: 3000 emails/month)
 * 2. Get API key from dashboard
 * 3. Add RESEND_API_KEY to .env.local
 * 4. Verify your domain or use onboarding@resend.dev for testing
 */

interface EmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
}

interface SendResult {
    success: boolean;
    id?: string;
    error?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.EMAIL_FROM || "Axoraco <onboarding@resend.dev>";
const TEAM_EMAIL = process.env.EMAIL_TO || "team.axoraco@gmail.com";

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
    return !!RESEND_API_KEY;
}

/**
 * Send an email using Resend API
 * 
 * @param options - Email options
 * @returns Send result with success status
 * 
 * @example
 * const result = await sendEmail({
 *   to: "user@example.com",
 *   subject: "Welcome!",
 *   html: "<h1>Hello</h1>",
 * });
 */
import { logger } from "@/lib/logger";

// ... inside sendEmail ...

export async function sendEmail(options: EmailOptions): Promise<SendResult> {
    if (!RESEND_API_KEY) {
        logger.warn("Resend API key not configured - email not sent");
        return { success: false, error: "Email service not configured" };
    }

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: options.to,
                subject: options.subject,
                html: options.html,
                text: options.text,
                reply_to: options.replyTo,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, id: data.id };
        } else {
            logger.error("Resend API error", { response: data });
            return { success: false, error: data.message || "Failed to send email" };
        }
    } catch (error) {
        logger.error("Email send error", {}, error as Error);
        return { success: false, error: "Network error sending email" };
    }
}

/**
 * Send contact form notification to team
 */
export async function sendContactNotification(data: {
    name: string;
    email: string;
    company?: string;
    message: string;
}): Promise<SendResult> {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 16px; }
        .label { font-weight: 600; color: #475569; margin-bottom: 4px; }
        .value { color: #1e293b; }
        .message { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">📬 New Contact Form Submission</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name</div>
                <div class="value">${escapeHtml(data.name)}</div>
            </div>
            <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
            </div>
            ${data.company ? `
            <div class="field">
                <div class="label">Company</div>
                <div class="value">${escapeHtml(data.company)}</div>
            </div>
            ` : ""}
            <div class="field">
                <div class="label">Message</div>
                <div class="message">${escapeHtml(data.message)}</div>
            </div>
        </div>
    </div>
</body>
</html>
    `.trim();

    const text = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}\n` : ""}
Message:
${data.message}
    `.trim();

    return sendEmail({
        to: TEAM_EMAIL,
        subject: `New Contact: ${data.name}`,
        html,
        text,
        replyTo: data.email,
    });
}

/**
 * Send auto-reply to contact form submitter
 */
export async function sendContactAutoReply(data: {
    name: string;
    email: string;
}): Promise<SendResult> {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 24px; }
        .logo { font-size: 24px; font-weight: bold; color: #6366f1; }
        .content { background: #f8fafc; padding: 24px; border-radius: 8px; }
        .cta { display: inline-block; background: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">AXORACO</div>
        </div>
        <div class="content">
            <h2>Thanks for reaching out, ${escapeHtml(data.name.split(" ")[0] || data.name)}! 👋</h2>
            <p>We've received your message and will get back to you within 24 hours.</p>
            <p>In the meantime, feel free to:</p>
            <ul>
                <li>Check out our <a href="https://axoraco.vercel.app/ai-voice" target="_blank">AI Voice Bot solutions</a></li>
                <li>Book a <a href="https://calendly.com/team-axoraco/30min" target="_blank">free strategy session</a></li>
            </ul>
            <a href="https://axoraco.vercel.app" target="_blank" class="cta">Visit Our Website</a>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 24px; text-align: center;">
            © ${new Date().getFullYear()} Axoraco. Vadodara, Gujarat, India.
        </p>
    </div>
</body>
</html>
    `.trim();

    return sendEmail({
        to: data.email,
        subject: "Thanks for contacting Axoraco! 🚀",
        html,
    });
}

/**
 * Escape HTML special characters
 */
function escapeHtml(str: string): string {
    const htmlEntities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    };
    return str.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}
