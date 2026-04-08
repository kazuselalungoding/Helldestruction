import Link from "next/link";


type size = "small" | "medium" | "large" | "full";

interface CardProductProps {
  size?: size;
  productName?: string;
  price?: number;
  isSoldOut?: boolean;
  imageUrl?: string;
  productSlug?: string;
}

const SizeMap: Record<size, string> = {
  small: "w-48 h-48",
  medium: "w-72 h-72",
  large: "w-128 h-128",
  full: "w-full max-w-[288px]",
};

export default function CardProduct({
  size = "medium",
  productName,
  price,
  isSoldOut = false,
  imageUrl,
  productSlug,
}: CardProductProps) {


  // const router = useRouter();

  // const handleClick = () => {
  //   if (isSoldOut || !productId) return;
  //   router.push(`/products/${productId}`);

  // }

  const cardContent = (
        <div
      //onClick={handleClick}
      className={`${SizeMap[size]} aspect-square border border-neutral-500 font-bagos font-bold flex flex-col ${
        !isSoldOut ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}
    >
      <div className="w-full h-14 flex justify-between items-start px-2 py-1">
        <div>
          <h6 className="text-neutral-500 text-sm leading-tight">
            {productName}
          </h6>
          <h6 className="text-primary-500 text-sm">
            Rp {price}
          </h6>
        </div>

        {isSoldOut && (
          <div className="bg-notification-50 px-2 py-1 text-md text-center">
            SOLD <br /> OUT
          </div>
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );

  if(isSoldOut || !productSlug) {
    return cardContent;
  }

  return (
    <Link href={`/products/${productSlug}`}>
      {cardContent}
    </Link>
  );
}
