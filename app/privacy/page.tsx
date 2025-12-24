import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = pageMetadata.privacy;

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />
            <div className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
                    <div className="prose prose-invert prose-slate max-w-none">
                        <p className="text-slate-300 text-lg mb-8">
                            Last updated: December 2024
                        </p>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                We collect information you provide directly to us, such as when you fill out a contact form,
                                subscribe to our newsletter, or communicate with us. This may include your name, email address,
                                phone number, and any other information you choose to provide.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                We use the information we collect to provide, maintain, and improve our services,
                                communicate with you about our products and services, and comply with legal obligations.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Cookies &amp; Analytics</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                We use cookies and similar tracking technologies to track activity on our website and
                                hold certain information. We use Google Analytics and Google Tag Manager to understand
                                how visitors interact with our site.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                We implement appropriate technical and organizational measures to protect your personal
                                information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
                            <p className="text-slate-400 leading-relaxed">
                                If you have questions about this Privacy Policy, please contact us at{" "}
                                <a href="mailto:team.axoraco@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    team.axoraco@gmail.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
