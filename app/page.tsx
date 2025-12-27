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
import { Skeleton } from "@/components/ui/skeleton"
import { SectionDivider } from "@/components/ui/section-divider"

// Skeleton for below-fold content
function SectionSkeleton() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-64 mx-auto mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Critical above-fold content */}
      <ResponsiveNavbar />
      <ResponsiveHero />

      {/* Services - Slate 900 */}
      <section className="relative bg-slate-900">
        <SectionDivider position="top" className="text-slate-950" />
        <Suspense fallback={<SectionSkeleton />}>
          <ResponsiveServices />
        </Suspense>
      </section>

      {/* Trust - Slate 950 */}
      <section className="relative bg-slate-950">
        <SectionDivider position="top" className="text-slate-900" />
        <Suspense fallback={<SectionSkeleton />}>
          <ResponsiveTrust />
        </Suspense>
      </section>

      {/* Process - Slate 900 */}
      <section className="relative bg-slate-900">
        <SectionDivider position="top" className="text-slate-950" />
        <Suspense fallback={<SectionSkeleton />}>
          <ResponsiveProcess />
        </Suspense>
      </section>

      {/* Testimonials - Slate 950 */}
      <section className="relative bg-slate-950">
        <SectionDivider position="top" className="text-slate-900" />
        <Suspense fallback={<SectionSkeleton />}>
          <ResponsiveTestimonials />
        </Suspense>
      </section>

      {/* CTA - Slate 900 */}
      <section className="relative bg-slate-900 pb-20">
        <SectionDivider position="top" className="text-slate-950" />
        <Suspense fallback={<SectionSkeleton />}>
          <ResponsiveCTA />
        </Suspense>
      </section>
      <Footer />
    </main>
  )
}
