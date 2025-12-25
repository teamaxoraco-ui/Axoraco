import { companyInfo, jsonLd } from "../json-ld";

describe("JSON-LD Schemas", () => {
    describe("companyInfo", () => {
        it("has company name", () => {
            expect(companyInfo.name).toBe("Axoraco");
        });

        it("has phone number", () => {
            expect(companyInfo.phone).toBeDefined();
            expect(companyInfo.phoneLink).toMatch(/^tel:/);
        });

        it("has email", () => {
            expect(companyInfo.email).toMatch(/@/);
            expect(companyInfo.emailLink).toMatch(/^mailto:/);
        });

        it("has address details", () => {
            expect(companyInfo.address.city).toBeDefined();
            expect(companyInfo.address.country).toBeDefined();
            expect(companyInfo.address.full).toBeDefined();
            expect(companyInfo.address.mapsLink).toContain("google.com/maps");
        });

        it("has social links", () => {
            expect(companyInfo.social.twitter).toContain("x.com");
            expect(companyInfo.social.linkedin).toContain("linkedin.com");
            expect(companyInfo.social.github).toContain("github.com");
            expect(companyInfo.social.instagram).toContain("instagram.com");
        });

        it("has Calendly link", () => {
            expect(companyInfo.calendly).toContain("calendly.com");
        });
    });

    describe("jsonLd schemas", () => {
        type JsonLdSchema = Record<string, unknown>;

        it("has organization schema", () => {
            const org = jsonLd.organization as JsonLdSchema;
            expect(org["@type"]).toBe("Organization");
            expect(org["@context"]).toBe("https://schema.org");
        });

        it("has website schema", () => {
            const website = jsonLd.website as JsonLdSchema;
            expect(website["@type"]).toBe("WebSite");
        });

        it("has localBusiness schema", () => {
            const business = jsonLd.localBusiness as JsonLdSchema;
            expect(business["@type"]).toBe("LocalBusiness");
        });

        it("organization has required fields", () => {
            const org = jsonLd.organization as JsonLdSchema;
            expect(org.name).toBeDefined();
            expect(org.url).toBeDefined();
        });
    });
});
