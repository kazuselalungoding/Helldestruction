"use client";

interface ProductHeroImageProps {
  imageUrl: string;
  productName: string;
}

export default function ProductHeroImage({
  imageUrl,
  productName,
}: ProductHeroImageProps) {
  const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <div className="rounded-[36px] bg-primary-50/40 p-4 sm:p-6">
      <div className="overflow-hidden rounded-[28px] bg-white">
        <img
          src={`${STORAGE_URL}/${imageUrl}`}
          alt={productName}
          className="h-[420px] w-full object-contain sm:h-[520px] lg:h-[700px]"
        />
      </div>
    </div>
  );
}