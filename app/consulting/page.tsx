import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ConsultingPageClient from "./client";

export const metadata: Metadata = pageMetadata.consulting;

export default function ConsultingPage() {
    return <ConsultingPageClient />;
}
