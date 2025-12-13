import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AIVoicePageClient from "./client";

export const metadata: Metadata = pageMetadata.aiVoice;

export default function AIVoicePage() {
    return <AIVoicePageClient />;
}
