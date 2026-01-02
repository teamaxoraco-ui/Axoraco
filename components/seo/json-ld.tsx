import { companyInfo } from "@/lib/json-ld";

export function JsonLd() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axoraco.com";

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Axoraco",
                    "url": siteUrl,
                    "logo": `${siteUrl}/og-image.png`,
                    "description": "Axoraco merges intelligent AI Voice Bots with bespoke Web Architecture to scale your operations beyond human limits.",
                    "sameAs": [
                        companyInfo.social.twitter,
                        companyInfo.social.linkedin,
                        companyInfo.social.github,
                        companyInfo.social.instagram
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "contactType": "sales",
                        "url": `${siteUrl}/contact`
                    },
                    "offers": {
                        "@type": "AggregateOffer",
                        "priceCurrency": "USD",
                        "offerCount": "3",
                        "offers": [
                            {
                                "@type": "Offer",
                                "name": "AI Voice Bots",
                                "description": "Human-like conversational agents for appointment setting, customer support, and sales"
                            },
                            {
                                "@type": "Offer",
                                "name": "Web Development",
                                "description": "High-performance, SEO-optimized web solutions"
                            },
                            {
                                "@type": "Offer",
                                "name": "API Integration",
                                "description": "Seamless integration with robust API solutions"
                            }
                        ]
                    }
                })
            }}
        />
    );
}
