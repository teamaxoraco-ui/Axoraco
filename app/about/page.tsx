import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import AboutPageClient from "./client";

export const metadata: Metadata = pageMetadata.about;

export default function AboutPage() {
    return <AboutPageClient />;
}
