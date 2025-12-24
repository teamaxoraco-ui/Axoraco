/**
 * @fileoverview JSON-LD structured data for SEO and rich search results.
 * Contains organization, website, and local business schemas.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axoraco.com";

/**
 * Company contact information - centralized for consistency
 */
export const companyInfo = {
    name: "Axoraco",
    phone: "+1 272 213 3651",
    phoneFormatted: "+1 (272) 213-3651",
    phoneLink: "tel:+12722133651",
    email: "team.axoraco@gmail.com",
    emailLink: "mailto:team.axoraco@gmail.com",
    address: {
        street: "Vadodara",
        city: "Gujarat",
        country: "India",
        full: "Vadodara, Gujarat, India",
        mapsLink: "https://www.google.com/maps/search/Vadodara+Gujarat+India",
    },
    social: {
        twitter: "https://x.com/teamaxoraco",
        linkedin: "https://linkedin.com/company/axoraco",
        github: "https://github.com/teamaxoraco-ui",
        instagram: "https://instagram.com/teamaxoraco",
    },
    calendly: "https://calendly.com/team-axoraco/30min",
};

export interface JsonLdData {
    organization: object;
    website: object;
    localBusiness: object;
}

export const jsonLd: JsonLdData = {
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: companyInfo.name,
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
            addressLocality: companyInfo.address.street,
            addressRegion: companyInfo.address.city,
            addressCountry: "IN",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: companyInfo.phone,
            contactType: "customer service",
            email: companyInfo.email,
            availableLanguage: ["English", "Hindi"],
        },
        sameAs: [
            companyInfo.social.twitter,
            companyInfo.social.linkedin,
            companyInfo.social.github,
            companyInfo.social.instagram,
        ],
    },
    website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: companyInfo.name,
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
        name: companyInfo.name,
        image: `${siteUrl}/og-image.png`,
        "@id": siteUrl,
        url: siteUrl,
        telephone: companyInfo.phone,
        email: companyInfo.email,
        priceRange: "$$$$",
        address: {
            "@type": "PostalAddress",
            addressLocality: companyInfo.address.street,
            addressRegion: companyInfo.address.city,
            addressCountry: "IN",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "22.3072",
            longitude: "73.1812",
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
