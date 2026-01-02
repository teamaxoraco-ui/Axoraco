import { Suspense } from "react"
import { ResponsiveNavbar } from "@/components/ui/responsive-navbar"
import { ResponsiveHero } from "@/components/ui/responsive-hero"
import { ResponsiveServices } from "@/components/ui/responsive-services"
import {
  ResponsiveTrust,
  ResponsiveProcess,
  ResponsiveTestimonials,
  ResponsiveCTA
} from "@/components/ui/responsive-sections"
import { Footer } from "@/components/ui/footer"
import { SectionSkeleton } from "@/components/ui/skeletons"

// Skeleton for below-fold content
// Moved to components/ui/skeletons.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Critical above-fold content */}
      <ResponsiveNavbar />
      <ResponsiveHero />

      {/* Below-fold content - Hybrid mobile/desktop */}
      <Suspense fallback={<SectionSkeleton />}>
        <ResponsiveServices />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ResponsiveTrust />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ResponsiveProcess />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ResponsiveTestimonials />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <ResponsiveCTA />
      </Suspense>
      <Footer />
    </main>
  )
}
