import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = pageMetadata.terms;

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            <Navbar />
            <div className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Terms of Service</h1>
                    <div className="prose prose-invert prose-slate max-w-none">
                        <p className="text-slate-300 text-lg mb-8">
                            Last updated: December 2024
                        </p>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                By accessing and using Axoraco&apos;s services, you accept and agree to be bound by
                                these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                Axoraco provides AI voice automation, web development, and related technology services.
                                The specific terms of each service engagement will be outlined in separate agreements.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                All content, features, and functionality on this website are owned by Axoraco and are
                                protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                Axoraco shall not be liable for any indirect, incidental, special, consequential, or
                                punitive damages resulting from your use of or inability to use our services.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Changes to Terms</h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                We reserve the right to modify these terms at any time. We will notify users of any
                                material changes by posting the new terms on this page.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact</h2>
                            <p className="text-slate-400 leading-relaxed">
                                For questions about these Terms, contact us at{" "}
                                <a href="mailto:hello@axoraco.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                                    hello@axoraco.com
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
