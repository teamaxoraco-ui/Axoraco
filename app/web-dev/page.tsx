import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { webDevFAQ, generateServiceSchema, generateBreadcrumbSchema } from "@/lib/schemas";
import WebDevPageClient from "./client";

export const metadata: Metadata = pageMetadata.webDev;

export default function WebDevPage() {
    const serviceSchema = generateServiceSchema({
        name: "Web Development",
        description: "High-performance, SEO-optimized web solutions built with Next.js, React, and TypeScript. Enterprise-grade architecture for forward-thinking companies.",
        url: "/web-dev",
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Web Development", url: "/web-dev" },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webDevFAQ) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <WebDevPageClient />
        </>
    );
}
