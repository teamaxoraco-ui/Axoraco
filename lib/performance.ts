import React from "react";

/**
 * @fileoverview Performance utilities for optimizing Core Web Vitals.
 */

/**
 * Lazy load a component only when it enters the viewport
 * 
 * @example
 * const HeavyComponent = lazyLoad(() => import('./HeavyComponent'));
 */
export function lazyLoad<T extends React.ComponentType<unknown>>(
    importFn: () => Promise<{ default: T }>
) {
    return React.lazy(importFn);
}

/**
 * Debounce function to limit expensive operations
 * 
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * 
 * @example
 * const debouncedSearch = debounce(search, 300);
 */
export function debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Throttle function for scroll/resize handlers
 * 
 * @param fn - Function to throttle
 * @param limit - Minimum time between calls in milliseconds
 */
export function throttle<T extends (...args: unknown[]) => void>(
    fn: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Preload critical resources
 * 
 * @param href - URL to preload
 * @param as - Resource type (script, style, image, font)
 */
export function preloadResource(href: string, as: "script" | "style" | "image" | "font"): void {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    if (as === "font") {
        link.crossOrigin = "anonymous";
    }
    document.head.appendChild(link);
}

/**
 * Prefetch page for faster navigation
 * 
 * @param href - Page URL to prefetch
 */
export function prefetchPage(href: string): void {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Detect if user is on a slow connection
 */
export function isSlowConnection(): boolean {
    if (typeof navigator === "undefined") return false;

    const connection = (navigator as Navigator & { connection?: { effectiveType: string } }).connection;
    if (!connection) return false;

    return ["slow-2g", "2g", "3g"].includes(connection.effectiveType);
}

/**
 * Critical CSS inlining helper - marks styles as critical
 * Use with caution, only for above-the-fold styles
 */
export const criticalStyles = {
    hero: `
        .hero-section {
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
    `,
    navbar: `
        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 50;
        }
    `,
};

/**
 * Image loading optimization - use native lazy loading
 */
export const imageLoadingProps = {
    lazy: {
        loading: "lazy" as const,
        decoding: "async" as const,
    },
    eager: {
        loading: "eager" as const,
        decoding: "sync" as const,
        fetchPriority: "high" as const,
    },
};
