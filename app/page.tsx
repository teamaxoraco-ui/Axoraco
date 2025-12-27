import { Suspense } from "react"
import { Navbar } from "@/components/ui/navbar"
import { ResponsiveHero } from "@/components/ui/responsive-hero"
import { ResponsiveServices } from "@/components/ui/responsive-services"
import { Trust } from "@/components/ui/trust"
import { Process } from "@/components/ui/process"
import { Testimonials } from "@/components/ui/testimonials"
import { CTASection } from "@/components/ui/cta-section"
import { Footer } from "@/components/ui/footer"
import { Skeleton } from "@/components/ui/skeleton"

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
      <Navbar />
      <ResponsiveHero />

      {/* Below-fold content with Suspense for better LCP */}
      <Suspense fallback={<SectionSkeleton />}>
        <ResponsiveServices />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Trust />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <CTASection />
      </Suspense>
      <Footer />
    </main>
  )
}
