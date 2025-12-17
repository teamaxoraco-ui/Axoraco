import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { aiVoiceFAQ, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schemas";
import AIVoicePageClient from "./client";

export const metadata: Metadata = pageMetadata.aiVoice;

export default function AIVoicePage() {
    const serviceSchema = generateServiceSchema({
        name: "AI Voice Bots",
        description: "Human-like conversational agents that handle appointment setting, customer support, and sales calls 24/7. Powered by advanced NLP for natural interactions.",
        url: "/ai-voice",
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "AI Voice Bots", url: "/ai-voice" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aiVoiceFAQ) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <AIVoicePageClient />
        </>
    );
}
