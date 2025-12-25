import { generatePageMetadata, pageMetadata } from "../seo";

describe("SEO Utilities", () => {
    describe("generatePageMetadata", () => {
        it("generates metadata with title and description", () => {
            const result = generatePageMetadata({
                title: "Test Page",
                description: "Test description",
                path: "/test",
            });

            expect(result.title).toBe("Test Page | Axoraco");
            expect(result.description).toBe("Test description");
        });

        it("includes keywords when provided", () => {
            const result = generatePageMetadata({
                title: "Test",
                description: "Test",
                keywords: ["keyword1", "keyword2"],
                path: "/test",
            });

            expect(result.keywords).toEqual(["keyword1", "keyword2"]);
        });

        it("generates canonical URL from path", () => {
            const result = generatePageMetadata({
                title: "Test",
                description: "Test",
                path: "/about",
            });

            expect(result.alternates?.canonical).toContain("/about");
        });

        it("includes Open Graph metadata", () => {
            const result = generatePageMetadata({
                title: "OG Test",
                description: "OG description",
                path: "/og-test",
            });

            expect(result.openGraph?.title).toBe("OG Test | Axoraco");
            expect(result.openGraph?.description).toBe("OG description");
            expect(result.openGraph?.type).toBe("website");
        });

        it("includes Twitter card metadata", () => {
            const result = generatePageMetadata({
                title: "Twitter Test",
                description: "Twitter description",
                path: "/twitter",
            });

            expect(result.twitter?.card).toBe("summary_large_image");
            expect(result.twitter?.title).toBe("Twitter Test | Axoraco");
        });
    });

    describe("pageMetadata presets", () => {
        it("has home page metadata", () => {
            expect(pageMetadata.home).toBeDefined();
            expect(pageMetadata.home.title).toContain("AI Voice");
        });

        it("has about page metadata", () => {
            expect(pageMetadata.about).toBeDefined();
            expect(pageMetadata.about.title).toContain("About");
        });

        it("has contact page metadata", () => {
            expect(pageMetadata.contact).toBeDefined();
            expect(pageMetadata.contact.title).toContain("Contact");
        });

        it("has all required pages", () => {
            const requiredPages = ["home", "about", "contact", "aiVoice", "webDev", "solutions"];
            requiredPages.forEach((page) => {
                expect(pageMetadata[page as keyof typeof pageMetadata]).toBeDefined();
            });
        });
    });
});
