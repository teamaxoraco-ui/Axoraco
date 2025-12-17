/**
 * Analytics event tracking utility
 * Provides type-safe event tracking for GA4
 */

type EventCategory = "form" | "navigation" | "engagement" | "conversion";

interface TrackEventParams {
    category: EventCategory;
    action: string;
    label?: string;
    value?: number;
}

/**
 * Track a custom event to Google Analytics
 */
export function trackEvent({ category, action, label, value }: TrackEventParams): void {
    if (typeof window === "undefined" || !window.gtag) {
        console.log("[Analytics] Event (dev mode):", { category, action, label, value });
        return;
    }

    window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
    });
}

/**
 * Pre-defined event trackers for common actions
 */
export const analytics = {
    // Form submissions
    formSubmit: (formName: string) =>
        trackEvent({ category: "form", action: "submit", label: formName }),

    formError: (formName: string, error: string) =>
        trackEvent({ category: "form", action: "error", label: `${formName}: ${error}` }),

    // CTA clicks
    ctaClick: (ctaName: string, location: string) =>
        trackEvent({ category: "conversion", action: "cta_click", label: `${ctaName} - ${location}` }),

    // Navigation
    pageView: (pagePath: string) =>
        trackEvent({ category: "navigation", action: "page_view", label: pagePath }),

    externalLink: (url: string) =>
        trackEvent({ category: "navigation", action: "external_link", label: url }),

    // Engagement
    scrollDepth: (depth: number) =>
        trackEvent({ category: "engagement", action: "scroll_depth", value: depth }),

    timeOnPage: (seconds: number) =>
        trackEvent({ category: "engagement", action: "time_on_page", value: seconds }),

    search: (query: string) =>
        trackEvent({ category: "engagement", action: "search", label: query }),

    // Service interest
    serviceInterest: (serviceName: string) =>
        trackEvent({ category: "conversion", action: "service_interest", label: serviceName }),

    // Newsletter
    newsletterSignup: () =>
        trackEvent({ category: "conversion", action: "newsletter_signup" }),

    // Contact
    contactFormSubmit: () =>
        trackEvent({ category: "conversion", action: "contact_form_submit" }),

    consultingBooking: () =>
        trackEvent({ category: "conversion", action: "consulting_booking" }),
};

/**
 * Hook to track scroll depth
 */
export function useScrollDepthTracking(): void {
    if (typeof window === "undefined") return;

    let maxDepth = 0;
    const thresholds = [25, 50, 75, 100];
    const trackedThresholds: number[] = [];

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentDepth = Math.round((window.scrollY / scrollHeight) * 100);

        if (currentDepth > maxDepth) {
            maxDepth = currentDepth;

            thresholds.forEach((threshold) => {
                if (currentDepth >= threshold && !trackedThresholds.includes(threshold)) {
                    trackedThresholds.push(threshold);
                    analytics.scrollDepth(threshold);
                }
            });
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
}

// Type declaration for gtag
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}
