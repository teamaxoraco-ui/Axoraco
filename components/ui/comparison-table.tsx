"use client";

import { motion } from "framer-motion";
import { Check, X, Zap, Star } from "lucide-react";

interface PricingTier {
    name: string;
    price: string;
    period: string;
    description: string;
    features: { name: string; included: boolean }[];
    cta: string;
    highlighted?: boolean;
    gradient: string;
}

const tiers: PricingTier[] = [
    {
        name: "Starter",
        price: "$2,999",
        period: "/month",
        description: "Perfect for small businesses getting started with AI automation.",
        features: [
            { name: "AI Voice Agent (up to 500 calls/mo)", included: true },
            { name: "Basic CRM Integration", included: true },
            { name: "Email Support", included: true },
            { name: "Analytics Dashboard", included: true },
            { name: "Custom Voice Training", included: false },
            { name: "24/7 Priority Support", included: false },
            { name: "White-label Solutions", included: false },
        ],
        cta: "Get Started",
        gradient: "from-slate-600 to-slate-700",
    },
    {
        name: "Professional",
        price: "$7,999",
        period: "/month",
        description: "For growing companies ready to scale their automation.",
        features: [
            { name: "AI Voice Agent (up to 5,000 calls/mo)", included: true },
            { name: "Advanced CRM Integration", included: true },
            { name: "Priority Email & Chat Support", included: true },
            { name: "Advanced Analytics Dashboard", included: true },
            { name: "Custom Voice Training", included: true },
            { name: "24/7 Priority Support", included: false },
            { name: "White-label Solutions", included: false },
        ],
        cta: "Most Popular",
        highlighted: true,
        gradient: "from-indigo-600 to-purple-600",
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Tailored solutions for large organizations.",
        features: [
            { name: "Unlimited AI Voice Calls", included: true },
            { name: "Enterprise CRM Integration", included: true },
            { name: "Dedicated Account Manager", included: true },
            { name: "Custom Analytics & Reporting", included: true },
            { name: "Custom Voice Training", included: true },
            { name: "24/7 Priority Support", included: true },
            { name: "White-label Solutions", included: true },
        ],
        cta: "Contact Sales",
        gradient: "from-amber-600 to-orange-600",
    },
];

/**
 * Pricing comparison table
 */
export function ComparisonTable() {
    return (
        <section className="py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
                        <Zap className="w-4 h-4" />
                        <span>Pricing</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Choose the plan that fits your business. All plans include our core AI technology.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-3xl p-8 ${tier.highlighted
                                    ? "bg-gradient-to-b from-indigo-950/80 to-slate-900/80 border-2 border-indigo-500/50"
                                    : "bg-slate-900/60 border border-slate-800"
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-sm font-medium text-white flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                            <p className="text-slate-400 text-sm mb-6">{tier.description}</p>

                            <div className="mb-6">
                                <span className={`text-4xl font-bold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>
                                    {tier.price}
                                </span>
                                <span className="text-slate-400">{tier.period}</span>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature.name} className="flex items-start gap-3">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        ) : (
                                            <X className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                                        )}
                                        <span className={feature.included ? "text-slate-300" : "text-slate-500"}>
                                            {feature.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-full font-medium transition-all ${tier.highlighted
                                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]"
                                        : "bg-slate-800 text-white hover:bg-slate-700"
                                    }`}
                            >
                                {tier.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-slate-500 text-sm mt-8"
                >
                    All prices in USD. Web development services quoted separately based on project scope.
                </motion.p>
            </div>
        </section>
    );
}
