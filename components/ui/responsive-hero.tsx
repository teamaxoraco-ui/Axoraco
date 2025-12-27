"use client"

import dynamic from "next/dynamic"
import { useMediaQuery } from "@/hooks/use-media-query"
import { HeroLite } from "./hero-lite"

const Hero = dynamic(() => import("./hero").then((mod) => mod.Hero), {
    ssr: false,
    loading: () => <HeroLite />
})

export function ResponsiveHero() {
    const isMobile = useMediaQuery("(max-width: 768px)")

    if (isMobile) {
        return <HeroLite />
    }

    return <Hero />
}
