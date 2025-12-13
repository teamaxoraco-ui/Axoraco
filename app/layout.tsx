import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/analytics/google-tag-manager";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* JSON-LD Structured Data for Organization */}
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
                "https://twitter.com/axoraco",
                "https://linkedin.com/company/axoraco",
                "https://github.com/axoraco"
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
        {/* Google Tag Manager */}
        <GoogleTagManager containerId={GTM_CONTAINER_ID} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Premium Components - Available on ALL pages */}
        <ScrollProgress />
        <CustomCursor />
        <BackToTop />
        {/* GTM NoScript Fallback */}
        <GoogleTagManagerNoScript containerId={GTM_CONTAINER_ID} />
        {/* Google Analytics */}
        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
        {children}
        {/* Vercel Web Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
