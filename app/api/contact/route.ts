import { NextRequest, NextResponse } from "next/server";

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
        const body = await request.json();

        // Validate required fields
        const { name, email, company, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Send to Discord
        const sent = await sendToDiscord({ name, email, company, message });

        if (!sent) {
            console.warn("Discord notification not sent (webhook may not be configured)");
        }

        // Return success
        return NextResponse.json(
            {
                success: true,
                message: "Thank you for your message! We'll get back to you soon.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to process your request. Please try again." },
            { status: 500 }
        );
    }
}
