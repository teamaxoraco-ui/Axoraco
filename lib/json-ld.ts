const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axoraco.com";

export interface JsonLdData {
    organization: object;
    website: object;
    localBusiness: object;
}

export const jsonLd: JsonLdData = {
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Axoraco",
        url: siteUrl,
        logo: `${siteUrl}/icon-512.png`,
        description: "Enterprise AI Voice Bots and Web Development solutions that automate reality and elevate business.",
        foundingDate: "2023",
        founders: [
            {
                "@type": "Person",
                name: "Daksh",
            },
            {
                "@type": "Person",
                name: "Yagna",
            },
        ],
        address: {
            "@type": "PostalAddress",
            streetAddress: "123 Innovation Dr, Suite 400",
            addressLocality: "Tech City",
            addressRegion: "TC",
            postalCode: "90210",
            addressCountry: "US",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-555-123-4567",
            contactType: "customer service",
            email: "hello@axoraco.com",
            availableLanguage: ["English"],
        },
        sameAs: [
            "https://twitter.com/axoraco",
            "https://linkedin.com/company/axoraco",
            "https://github.com/axoraco",
        ],
    },
    website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Axoraco",
        url: siteUrl,
        description: "AI Voice Bots & Web Development - Automating Reality, Elevating Business",
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    },
    localBusiness: {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Axoraco",
        image: `${siteUrl}/og-image.png`,
        "@id": siteUrl,
        url: siteUrl,
        telephone: "+1-555-123-4567",
        priceRange: "$$$$",
        address: {
            "@type": "PostalAddress",
            streetAddress: "123 Innovation Dr, Suite 400",
            addressLocality: "Tech City",
            addressRegion: "TC",
            postalCode: "90210",
            addressCountry: "US",
        },
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "47",
        },
    },
};

export function getJsonLdScript() {
    return [
        JSON.stringify(jsonLd.organization),
        JSON.stringify(jsonLd.website),
        JSON.stringify(jsonLd.localBusiness),
    ];
}
