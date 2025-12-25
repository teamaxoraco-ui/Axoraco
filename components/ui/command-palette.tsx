"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Clock, FileText, Users, Bot, Code, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    category: string;
}

const searchData: SearchResult[] = [
    { title: "Home", description: "Return to homepage", href: "/", icon: <FileText className="w-4 h-4" />, category: "Pages" },
    { title: "AI Voice Bots", description: "Intelligent voice automation", href: "/ai-voice", icon: <Bot className="w-4 h-4" />, category: "Services" },
    { title: "Web Development", description: "High-performance web apps", href: "/web-dev", icon: <Code className="w-4 h-4" />, category: "Services" },
    { title: "Solutions", description: "Case studies and capabilities", href: "/solutions", icon: <FileText className="w-4 h-4" />, category: "Pages" },
    { title: "About Us", description: "Our story and mission", href: "/about", icon: <Users className="w-4 h-4" />, category: "Pages" },
    { title: "Careers", description: "Join our team", href: "/careers", icon: <Users className="w-4 h-4" />, category: "Pages" },
    { title: "Blog", description: "Latest insights and articles", href: "/blog", icon: <FileText className="w-4 h-4" />, category: "Pages" },
    { title: "Contact", description: "Get in touch with us", href: "/contact", icon: <Mail className="w-4 h-4" />, category: "Contact" },
    { title: "Book a Strategy Call", description: "Schedule a consultation", href: "/consulting", icon: <Clock className="w-4 h-4" />, category: "Contact" },
];

/**
 * Command palette / site search modal
 * Trigger with ⌘K or Ctrl+K
 */
export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const filteredResults = query
        ? searchData.filter(
            (item) =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
        )
        : searchData;

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Open with Cmd+K or Ctrl+K
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            // Close with Escape
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input when opened, reset state when closed
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
            setSelectedIndex(0);
        }
    }, [isOpen]);
    /* eslint-enable react-hooks/set-state-in-effect */

    // Navigate results with keyboard
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
            } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
                e.preventDefault();
                router.push(filteredResults[selectedIndex].href);
                setIsOpen(false);
            }
        },
        [filteredResults, selectedIndex, router]
    );

    const handleSelect = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    // Group results by category
    const groupedResults = filteredResults.reduce((acc, result) => {
        if (!acc[result.category]) {
            acc[result.category] = [];
        }
        acc[result.category].push(result);
        return acc;
    }, {} as Record<string, SearchResult[]>);

    return (
        <>
            {/* Search trigger button */}
            <button
                onClick={() => setIsOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-slate-300 transition-colors"
            >
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-slate-700 rounded">⌘K</kbd>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[201]"
                        >
                            <div className="mx-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-black/50 overflow-hidden">
                                {/* Search input */}
                                <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-800">
                                    <Search className="w-5 h-5 text-slate-500" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={query}
                                        onChange={(e) => {
                                            setQuery(e.target.value);
                                            setSelectedIndex(0);
                                        }}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search pages, services..."
                                        className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-lg"
                                    />
                                    <kbd className="px-2 py-1 text-xs text-slate-500 bg-slate-800 rounded">ESC</kbd>
                                </div>

                                {/* Results */}
                                <div className="max-h-[400px] overflow-y-auto py-2">
                                    {filteredResults.length === 0 ? (
                                        <div className="px-4 py-8 text-center text-slate-500">
                                            No results found for &quot;{query}&quot;
                                        </div>
                                    ) : (
                                        Object.entries(groupedResults).map(([category, items]) => (
                                            <div key={category}>
                                                <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                    {category}
                                                </div>
                                                {items.map((result) => {
                                                    const globalIndex = filteredResults.indexOf(result);
                                                    const isSelected = globalIndex === selectedIndex;
                                                    return (
                                                        <button
                                                            key={result.href}
                                                            onClick={() => handleSelect(result.href)}
                                                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${isSelected ? "bg-indigo-500/20 text-white" : "text-slate-400 hover:text-white"
                                                                }`}
                                                        >
                                                            <div className={`p-2 rounded-lg ${isSelected ? "bg-indigo-500/30" : "bg-slate-800"}`}>
                                                                {result.icon}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium">{result.title}</div>
                                                                <div className="text-sm text-slate-500 truncate">{result.description}</div>
                                                            </div>
                                                            {isSelected && <ArrowRight className="w-4 h-4 text-indigo-400" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-4 py-3 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">↑↓</kbd> Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">↵</kbd> Select
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">ESC</kbd> Close
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
