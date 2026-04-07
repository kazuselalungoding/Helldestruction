"use client";

interface ProductInfoProps {
  name: string;
  price: number | string;
  description: string;
}

export default function ProductInfo({
  name,
  price,
  description,
}: ProductInfoProps) {
  return (
    <div>
      <h1 className="font-bagos text-5xl font-bold uppercase text-primary-900 sm:text-6xl">
        {name}
      </h1>

      <p className="mt-6 text-3xl font-semibold text-primary-900">
        Rp {Number(price).toLocaleString("id-ID")}
      </p>

      <p className="mt-6 text-sm leading-7 text-primary-600">
        {description}
      </p>
    </div>
  );
}