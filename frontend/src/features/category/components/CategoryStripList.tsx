import Link from "next/link";
import type { CategoryItem } from "@/features/category/types";
import TextRectangle from "@/components/ui/TextRectangle";

type CategoryStripListProps = {
  items?: CategoryItem[];
  className?: string;
};

export default function CategoryStripList({
  items = [],
  className = "",
}: CategoryStripListProps) {
  if (!items.length) {
    return (
      <div className={`border-y border-black/10 py-10 text-center text-black/60 ${className}`}>
        No categories available.
      </div>
    );
  }

  return (
    <section className={`border-y border-black/10 ${className}`}>
      {items.map((item, index) => (
        <Link
          key={item.id}
          href={`/category/${item.slug || String(item.id)}`}
          className="group block border-black/10 px-0 py-12 transition-colors duration-300 hover:bg-black/2 sm:py-14"
        >
          <div className="flex items-end justify-between gap-4">
            <TextRectangle
              variant="heading"
              uppercase
              interactive
              className="transition-transform duration-300"
            >
              {item.name}
            </TextRectangle>
            <TextRectangle
              variant="label"
              className="mb-2 hidden text-black/40 sm:block"
            >
              Explore
            </TextRectangle>
          </div>

          {index !== items.length - 1 && <div className="mt-12 border-t border-black/10 sm:mt-14" />}
        </Link>
      ))}
    </section>
  );
}
