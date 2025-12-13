import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axoraco.com";

    const routes = [
        "",
        "/about",
        "/contact",
        "/solutions",
        "/ai-voice",
        "/web-dev",
        "/consulting",
        "/careers",
        "/blog",
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.8,
    }));
}
