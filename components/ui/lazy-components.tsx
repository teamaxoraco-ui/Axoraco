"use client";

import dynamic from "next/dynamic";

// Lazy load non-critical UI components for better performance
// These components are not needed for initial render

export const LazyCustomCursor = dynamic(
    () => import("./custom-cursor").then((mod) => mod.CustomCursor),
    { ssr: false }
);

export const LazyScrollProgress = dynamic(
    () => import("./scroll-progress").then((mod) => mod.ScrollProgress),
    { ssr: false }
);

export const LazyBackToTop = dynamic(
    () => import("./back-to-top").then((mod) => mod.BackToTop),
    { ssr: false }
);

export const LazyNavigationProgress = dynamic(
    () => import("./navigation-progress").then((mod) => mod.NavigationProgress),
    { ssr: false }
);

export const LazyCookieConsent = dynamic(
    () => import("./cookie-consent").then((mod) => mod.CookieConsent),
    { ssr: false }
);
