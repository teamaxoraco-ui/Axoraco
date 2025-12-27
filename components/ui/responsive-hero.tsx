"use client"

import { Hero } from "@/components/ui/hero"

// Now that Hero is optimized with pure CSS animations and conditionally rendered particles,
// we can use the same rich visual component on both mobile and desktop.
// This solves the "dull" mobile experience while maintaining high performance.

export function ResponsiveHero() {
    return <Hero />
}
