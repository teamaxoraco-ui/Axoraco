import Link from "next/link";

export function SkipToContent() {
    return (
        <Link
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:outline-none"
        >
            Skip to main content
        </Link>
    );
}
