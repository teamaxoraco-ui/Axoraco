import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactPageClient from "./client";

export const metadata: Metadata = pageMetadata.contact;

export default function ContactPage() {
    return <ContactPageClient />;
}
