"use client"

import dynamic from "next/dynamic"
import { HeroLite } from "./hero-lite"

// Lazy load full Hero only on desktop
const HeroFull = dynamic(() => import("./hero").then(mod => ({ default: mod.Hero })), {
    ssr: false,
    loading: () => <HeroLite />,
})

/**
 * ResponsiveHero - Shows lightweight CSS-only hero on mobile for performance,
 * and full animated hero on desktop for the premium experience.
 */
export function ResponsiveHero() {
    return (
        <>
            {/* Mobile: Lightweight CSS-only hero */}
            <div className="md:hidden">
                <HeroLite />
            </div>

            {/* Desktop: Full animated hero with framer-motion */}
            <div className="hidden md:block">
                <HeroFull />
            </div>
        </>
    )
}
