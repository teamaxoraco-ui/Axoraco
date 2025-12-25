import { trackEvent, analytics } from "../analytics";

// Mock window.gtag
const mockGtag = jest.fn();

describe("Analytics", () => {
    beforeEach(() => {
        // Reset mocks
        mockGtag.mockClear();

        // Mock window.gtag
        Object.defineProperty(global, "window", {
            value: {
                gtag: mockGtag,
            },
            writable: true,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("trackEvent", () => {
        it("calls gtag with event parameters", () => {
            trackEvent({
                category: "test",
                action: "click",
                label: "button",
            });

            expect(mockGtag).toHaveBeenCalledWith(
                "event",
                "click",
                expect.objectContaining({
                    event_category: "test",
                    event_label: "button",
                })
            );
        });

        it("includes value when provided", () => {
            trackEvent({
                category: "conversion",
                action: "purchase",
                label: "premium",
                value: 99,
            });

            expect(mockGtag).toHaveBeenCalledWith(
                "event",
                "purchase",
                expect.objectContaining({
                    value: 99,
                })
            );
        });

        it("handles missing gtag gracefully", () => {
            Object.defineProperty(global, "window", {
                value: {},
                writable: true,
            });

            // Should not throw
            expect(() => {
                trackEvent({
                    category: "test",
                    action: "test",
                });
            }).not.toThrow();
        });
    });

    describe("analytics helpers", () => {
        it("has formSubmit helper", () => {
            expect(analytics.formSubmit).toBeDefined();
            analytics.formSubmit("contact");
            expect(mockGtag).toHaveBeenCalled();
        });

        it("has ctaClick helper", () => {
            expect(analytics.ctaClick).toBeDefined();
            analytics.ctaClick("get-started", "hero");
            expect(mockGtag).toHaveBeenCalled();
        });

        it("has pageView helper", () => {
            expect(analytics.pageView).toBeDefined();
        });

        it("has socialClick helper", () => {
            expect(analytics.socialClick).toBeDefined();
        });
    });
});
