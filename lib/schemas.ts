const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axoraco.com";

/**
 * FAQ Schema for AI Voice page
 */
export const aiVoiceFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is an AI Voice Bot?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "An AI Voice Bot is an intelligent conversational agent that uses natural language processing (NLP) to handle phone calls, appointments, customer support, and sales inquiries 24/7 without human intervention.",
            },
        },
        {
            "@type": "Question",
            name: "How much does AI Voice automation cost?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Our AI Voice solutions are customized based on call volume and complexity. Most clients see 70% reduction in staffing costs. Contact us for a free consultation and custom quote.",
            },
        },
        {
            "@type": "Question",
            name: "Can AI Voice Bots integrate with my CRM?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, our AI Voice Bots integrate seamlessly with popular CRMs including Salesforce, HubSpot, Zoho, and custom solutions through our API.",
            },
        },
        {
            "@type": "Question",
            name: "How long does implementation take?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Typical implementation takes 2-4 weeks depending on complexity. This includes voice training, CRM integration, and testing.",
            },
        },
    ],
};

/**
 * FAQ Schema for Web Development page
 */
export const webDevFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What technologies do you use for web development?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "We specialize in Next.js, React, TypeScript, and Tailwind CSS for high-performance, SEO-optimized web applications. We also work with Node.js, PostgreSQL, and various cloud platforms.",
            },
        },
        {
            "@type": "Question",
            name: "How long does it take to build a website?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Timeline varies by project scope. A marketing website typically takes 4-6 weeks, while complex web applications can take 3-6 months. We provide detailed timelines during our strategy session.",
            },
        },
        {
            "@type": "Question",
            name: "Do you provide ongoing maintenance?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, content updates, and 24/7 support for enterprise clients.",
            },
        },
    ],
};

/**
 * Breadcrumb schema generator
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
        })),
    };
}

/**
 * Service schema for service pages
 */
export function generateServiceSchema(service: {
    name: string;
    description: string;
    url: string;
    provider?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: service.url.startsWith("http") ? service.url : `${siteUrl}${service.url}`,
        provider: {
            "@type": "Organization",
            name: service.provider || "Axoraco",
            url: siteUrl,
        },
        areaServed: {
            "@type": "Country",
            name: "United States",
        },
    };
}
