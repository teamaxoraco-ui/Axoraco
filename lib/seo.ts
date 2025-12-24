/**
 * @fileoverview SEO utilities and centralized metadata for all pages.
 * Provides type-safe metadata generation with Open Graph and Twitter support.
 */

import type { Metadata } from "next";

/**
 * Parameters for generating page metadata.
 */
type PageMetadata = {
    /** Page title (will be suffixed with " | Axoraco") */
    title: string;
    /** Page description for SEO and social sharing */
    description: string;
    /** Optional keywords for meta tags */
    keywords?: string[];
    /** Page path (e.g., "/about", "/contact") */
    path: string;
};

/** Base site URL from environment or default */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axoraco.com";

/**
 * Generate Next.js Metadata object for a page.
 * Includes Open Graph, Twitter Cards, and canonical URL.
 * 
 * @param params - Page metadata parameters
 * @returns Next.js Metadata object
 * 
 * @example
 * export const metadata = generatePageMetadata({
 *   title: "About Us",
 *   description: "Learn about our company",
 *   keywords: ["about", "team"],
 *   path: "/about"
 * });
 */
export function generatePageMetadata({
    title,
    description,
    keywords = [],
    path,
}: PageMetadata): Metadata {
    const url = `${baseUrl}${path}`;

    return {
        title,
        description,
        keywords,
        openGraph: {
            title: `${title} | Axoraco`,
            description,
            url,
            siteName: "Axoraco",
            type: "website",
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Axoraco`,
            description,
            images: ["/og-image.png"],
        },
        alternates: {
            canonical: url,
        },
    };
}

/**
 * Pre-defined metadata for all pages.
 * Import and use in page.tsx files:
 * 
 * @example
 * import { pageMetadata } from "@/lib/seo";
 * export const metadata = pageMetadata.about;
 */
export const pageMetadata = {
    /** Home page metadata */
    home: generatePageMetadata({
        title: "AI Voice Bots & Web Development",
        description:
            "Axoraco merges intelligent AI Voice Bots with bespoke Web Architecture to scale your operations beyond human limits.",
        keywords: ["AI Voice Bots", "Web Development", "Business Automation"],
        path: "",
    }),

    /** About page metadata */
    about: generatePageMetadata({
        title: "About Us",
        description:
            "Learn about Axoraco's mission to democratize AI automation for businesses of all sizes. Architects of the automated future.",
        keywords: ["About Axoraco", "AI Company", "Automation Experts"],
        path: "/about",
    }),

    /** Contact page metadata */
    contact: generatePageMetadata({
        title: "Contact Us",
        description:
            "Get in touch with Axoraco to discuss your automation needs. Free consultation available.",
        keywords: ["Contact", "Free Consultation", "AI Automation"],
        path: "/contact",
    }),

    /** AI Voice service page metadata */
    aiVoice: generatePageMetadata({
        title: "AI Voice Bots",
        description:
            "Human-like conversational AI agents for appointments, support, and sales. 24/7 availability with natural language understanding.",
        keywords: [
            "AI Voice Bots",
            "Voice AI",
            "Conversational AI",
            "Customer Service AI",
        ],
        path: "/ai-voice",
    }),

    /** Web Development service page metadata */
    webDev: generatePageMetadata({
        title: "Web Development",
        description:
            "High-performance, SEO-optimized web architecture built for scale. Next.js, React, and enterprise-grade solutions.",
        keywords: ["Web Development", "Next.js", "React", "Enterprise Web Apps"],
        path: "/web-dev",
    }),

    /** Solutions overview page metadata */
    solutions: generatePageMetadata({
        title: "Solutions",
        description:
            "Full-stack automation solutions from AI voice agents to scalable web infrastructure.",
        keywords: ["Business Solutions", "Automation", "Enterprise Software"],
        path: "/solutions",
    }),

    /** Consulting/booking page metadata */
    consulting: generatePageMetadata({
        title: "Book a Consultation",
        description:
            "Schedule a free 30-minute strategy session with our founding team to discuss your automation roadmap.",
        keywords: ["Consultation", "Strategy Session", "Free Call"],
        path: "/consulting",
    }),

    /** Careers page metadata */
    careers: generatePageMetadata({
        title: "Careers",
        description:
            "Join the revolution. Explore career opportunities at Axoraco and help build the future of automation.",
        keywords: ["Careers", "Jobs", "AI Jobs", "Tech Careers"],
        path: "/careers",
    }),

    /** Blog page metadata */
    blog: generatePageMetadata({
        title: "Blog",
        description:
            "Insights and thoughts on AI, automation, and the future of work from the Axoraco team.",
        keywords: ["Blog", "AI Insights", "Automation News", "Tech Articles"],
        path: "/blog",
    }),

    /** Privacy policy page metadata */
    privacy: generatePageMetadata({
        title: "Privacy Policy",
        description:
            "Learn how Axoraco collects, uses, and protects your personal information.",
        keywords: ["Privacy Policy", "Data Protection", "GDPR"],
        path: "/privacy",
    }),

    /** Terms of service page metadata */
    terms: generatePageMetadata({
        title: "Terms of Service",
        description:
            "Read the terms and conditions for using Axoraco's services and website.",
        keywords: ["Terms of Service", "Legal", "Terms and Conditions"],
        path: "/terms",
    }),
};
