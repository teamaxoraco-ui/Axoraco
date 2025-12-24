/**
 * @fileoverview Analytics event tracking utility for Google Analytics 4.
 * Provides type-safe event tracking with pre-defined event categories
 * and conversion tracking helpers.
 */

/**
 * Analytics event category types.
 * Used to group events for analysis in GA4.
 */
type EventCategory = "form" | "navigation" | "engagement" | "conversion";

/**
 * Parameters for tracking a custom event.
 */
interface TrackEventParams {
    /** Event category for grouping */
    category: EventCategory;
    /** Specific action being tracked */
    action: string;
    /** Optional label for additional context */
    label?: string;
    /** Optional numeric value */
    value?: number;
}

/**
 * Track a custom event to Google Analytics.
 * Falls back to console logging in development.
 * 
 * @param params - Event tracking parameters
 * 
 * @example
 * trackEvent({ category: "form", action: "submit", label: "contact-form" })
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
 * Pre-defined event trackers for common actions.
 * Use these for consistent event naming across the application.
 * 
 * @example
 * // Track form submission
 * analytics.formSubmit("contact")
 * 
 * // Track CTA click
 * analytics.ctaClick("Get Started", "hero-section")
 * 
 * // Track service page interest
 * analytics.serviceInterest("AI Voice Bots")
 */
export const analytics = {
    // =========================================================================
    // FORM EVENTS
    // =========================================================================

    /**
     * Track successful form submission.
     * @param formName - Name of the form
     */
    formSubmit: (formName: string) =>
        trackEvent({ category: "form", action: "submit", label: formName }),

    /**
     * Track form validation or submission error.
     * @param formName - Name of the form
     * @param error - Error message or type
     */
    formError: (formName: string, error: string) =>
        trackEvent({ category: "form", action: "error", label: `${formName}: ${error}` }),

    // =========================================================================
    // CONVERSION EVENTS
    // =========================================================================

    /**
     * Track CTA button clicks.
     * @param ctaName - Name of the CTA (e.g., "Get Started", "Book Demo")
     * @param location - Where the CTA is located (e.g., "hero", "footer")
     */
    ctaClick: (ctaName: string, location: string) =>
        trackEvent({ category: "conversion", action: "cta_click", label: `${ctaName} - ${location}` }),

    /**
     * Track interest in a specific service.
     * @param serviceName - Name of the service
     */
    serviceInterest: (serviceName: string) =>
        trackEvent({ category: "conversion", action: "service_interest", label: serviceName }),

    /**
     * Track newsletter signup.
     */
    newsletterSignup: () =>
        trackEvent({ category: "conversion", action: "newsletter_signup" }),

    /**
     * Track contact form submission.
     */
    contactFormSubmit: () =>
        trackEvent({ category: "conversion", action: "contact_form_submit" }),

    /**
     * Track consulting/demo booking.
     */
    consultingBooking: () =>
        trackEvent({ category: "conversion", action: "consulting_booking" }),

    // =========================================================================
    // NAVIGATION EVENTS
    // =========================================================================

    /**
     * Track page views (useful for SPAs).
     * @param pagePath - Path of the page
     */
    pageView: (pagePath: string) =>
        trackEvent({ category: "navigation", action: "page_view", label: pagePath }),

    /**
     * Track external link clicks.
     * @param url - URL of the external link
     */
    externalLink: (url: string) =>
        trackEvent({ category: "navigation", action: "external_link", label: url }),

    // =========================================================================
    // ENGAGEMENT EVENTS
    // =========================================================================

    /**
     * Track scroll depth milestones.
     * @param depth - Scroll depth percentage (25, 50, 75, 100)
     */
    scrollDepth: (depth: number) =>
        trackEvent({ category: "engagement", action: "scroll_depth", value: depth }),

    /**
     * Track time spent on page.
     * @param seconds - Time in seconds
     */
    timeOnPage: (seconds: number) =>
        trackEvent({ category: "engagement", action: "time_on_page", value: seconds }),

    /**
     * Track search queries.
     * @param query - Search query string
     */
    search: (query: string) =>
        trackEvent({ category: "engagement", action: "search", label: query }),
};

/**
 * Initialize scroll depth tracking.
 * Tracks when users scroll to 25%, 50%, 75%, and 100% of the page.
 * Should be called once on page mount.
 * 
 * @example
 * useEffect(() => {
 *   useScrollDepthTracking();
 * }, []);
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

// =============================================================================
// TYPE DECLARATIONS
// =============================================================================

/**
 * Global type declaration for Google Analytics gtag function.
 */
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}
