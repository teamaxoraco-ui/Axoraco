import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BlogPageClient from "./client";

export const metadata: Metadata = pageMetadata.blog;

export default function BlogPage() {
    return <BlogPageClient />;
}
