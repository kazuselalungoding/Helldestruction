"use client";

import CategoryStripList from "@/features/category/components/CategoryStripList";
import { useCategories } from "@/features/category/hooks/useCategories";

export default function CategoryPage() {
    const { categories, isLoading, error } = useCategories();

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-notification-100">
                        Category
                    </p>
                    <h1 className="text-[clamp(2rem,8vw,5rem)] font-black uppercase leading-none tracking-tight text-black">
                        Shop by category
                    </h1>
                </header>

                {error && (
                    <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {isLoading ? (
                    <section className="border-y border-black/10">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="py-12 sm:py-14">
                                <div className="h-12 w-2/3 animate-pulse rounded bg-black/10 sm:h-16" />
                                {index !== 3 && <div className="mt-12 border-t border-black/10 sm:mt-14" />}
                            </div>
                        ))}
                    </section>
                ) : (
                    <CategoryStripList items={categories} />
                )}
            </div>
        </main>
    );
}