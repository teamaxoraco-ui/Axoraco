import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import WebDevPageClient from "./client";

export const metadata: Metadata = pageMetadata.webDev;

export default function WebDevPage() {
    return <WebDevPageClient />;
}
