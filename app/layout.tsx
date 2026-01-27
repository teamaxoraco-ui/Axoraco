import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/google-tag-manager";
import { SkipToContent } from "@/components/ui/skip-to-content";
import {
  LazyCustomCursor,
  LazyScrollProgress,
  LazyBackToTop,
  LazyNavigationProgress,
  LazyCookieConsent,
} from "@/components/ui/lazy-components";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Prevent FOIT for better performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Prevent FOIT for better performance
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axoraco.com";

// Analytics IDs from environment variables
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Axoraco | AI Voice Bots & Web Development",
    template: "%s | Axoraco",
  },
  description:
    "Axoraco merges intelligent AI Voice Bots with bespoke Web Architecture to scale your operations beyond human limits. Enterprise automation for forward-thinking companies.",
  keywords: [
    "AI Voice Bots",
    "Voice AI",
    "Web Development",
    "Business Automation",
    "AI Agents",
    "Enterprise Solutions",
    "Next.js Development",
    "API Integration",
    "Customer Service AI",
    "Appointment Booking AI",
  ],
  authors: [{ name: "Axoraco", url: siteUrl }],
  creator: "Axoraco",
  publisher: "Axoraco",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Axoraco",
    title: "Axoraco | AI Voice Bots & Web Development",
    description:
      "Scale your operations with intelligent AI Voice Bots and bespoke Web Architecture. Enterprise-grade automation for forward-thinking companies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Axoraco - Automating Reality, Elevating Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axoraco | AI Voice Bots & Web Development",
    description:
      "Scale your operations with intelligent AI Voice Bots and bespoke Web Architecture.",
    images: ["/og-image.png"],
    creator: "@axoraco",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Technology",
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <meta name="google-site-verification" content="CISnLT1LUWaRjQ3R5MBzjXYcpoK3zaJQFD7IfNCHpjY" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* JSON-LD Structured Data for Organization */}
        <JsonLd />
        {/* Google Tag Manager */}
        <GoogleTagManager containerId={GTM_CONTAINER_ID} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Accessibility: Skip to main content link */}
        <SkipToContent />
        {/* Navigation Progress Indicator - Lazy loaded */}
        <LazyNavigationProgress />
        {/* Global Premium Components - Lazy loaded for performance */}
        <LazyScrollProgress />
        <LazyCustomCursor />
        <LazyBackToTop />
        {/* GTM NoScript Fallback */}
        <GoogleTagManagerNoScript containerId={GTM_CONTAINER_ID} />
        {/* Google Analytics */}
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        <div id="main-content">
          {children}
        </div>
        {/* Cookie Consent Banner - Lazy loaded */}
        <LazyCookieConsent />
      </body>
    </html>
  );
}
