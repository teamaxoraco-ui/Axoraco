import { Navbar } from "@/components/ui/navbar"
import { Hero } from "@/components/ui/hero"
import { Services } from "@/components/ui/services"
import { Trust } from "@/components/ui/trust"
import { Process } from "@/components/ui/process"
import { Testimonials } from "@/components/ui/testimonials"
import { CTASection } from "@/components/ui/cta-section"
import { Footer } from "@/components/ui/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <Services />
      <Trust />
      <Process />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
