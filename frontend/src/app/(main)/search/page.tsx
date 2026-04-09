import { Suspense } from "react";
import SearchPageClient from "@/features/search/components/SearchPageClient";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading search...</div>}>
      <SearchPageClient />
    </Suspense>
  );
}