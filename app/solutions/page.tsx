import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import SolutionsPageClient from "./client";

export const metadata: Metadata = pageMetadata.solutions;

export default function SolutionsPage() {
    return <SolutionsPageClient />;
}
