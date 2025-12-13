import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import CareersPageClient from "./client";

export const metadata: Metadata = pageMetadata.careers;

export default function CareersPage() {
    return <CareersPageClient />;
}
