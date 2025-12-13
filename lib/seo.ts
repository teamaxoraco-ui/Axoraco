import type { Metadata } from "next";

type PageMetadata = {
    title: string;
    description: string;
    keywords?: string[];
    path: string;
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axoraco.com";

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

// Pre-defined metadata for each page
export const pageMetadata = {
    home: generatePageMetadata({
        title: "AI Voice Bots & Web Development",
        description:
            "Axoraco merges intelligent AI Voice Bots with bespoke Web Architecture to scale your operations beyond human limits.",
        keywords: ["AI Voice Bots", "Web Development", "Business Automation"],
        path: "",
    }),
    about: generatePageMetadata({
        title: "About Us",
        description:
            "Learn about Axoraco's mission to democratize AI automation for businesses of all sizes. Architects of the automated future.",
        keywords: ["About Axoraco", "AI Company", "Automation Experts"],
        path: "/about",
    }),
    contact: generatePageMetadata({
        title: "Contact Us",
        description:
            "Get in touch with Axoraco to discuss your automation needs. Free consultation available.",
        keywords: ["Contact", "Free Consultation", "AI Automation"],
        path: "/contact",
    }),
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
    webDev: generatePageMetadata({
        title: "Web Development",
        description:
            "High-performance, SEO-optimized web architecture built for scale. Next.js, React, and enterprise-grade solutions.",
        keywords: ["Web Development", "Next.js", "React", "Enterprise Web Apps"],
        path: "/web-dev",
    }),
    solutions: generatePageMetadata({
        title: "Solutions",
        description:
            "Full-stack automation solutions from AI voice agents to scalable web infrastructure.",
        keywords: ["Business Solutions", "Automation", "Enterprise Software"],
        path: "/solutions",
    }),
    consulting: generatePageMetadata({
        title: "Book a Consultation",
        description:
            "Schedule a free 30-minute strategy session with our founding team to discuss your automation roadmap.",
        keywords: ["Consultation", "Strategy Session", "Free Call"],
        path: "/consulting",
    }),
    careers: generatePageMetadata({
        title: "Careers",
        description:
            "Join the revolution. Explore career opportunities at Axoraco and help build the future of automation.",
        keywords: ["Careers", "Jobs", "AI Jobs", "Tech Careers"],
        path: "/careers",
    }),
    blog: generatePageMetadata({
        title: "Blog",
        description:
            "Insights and thoughts on AI, automation, and the future of work from the Axoraco team.",
        keywords: ["Blog", "AI Insights", "Automation News", "Tech Articles"],
        path: "/blog",
    }),
};
