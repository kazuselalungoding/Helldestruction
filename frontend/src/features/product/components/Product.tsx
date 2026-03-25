import CardProduct from "@/components/ui/CardProduct"

type Product = {
  id: number;
  name: string;
  image_url: string;
  price: number;
  product_variants?: {
    quantity: number;
  }[];
};

interface ProductProps {
  products: Product[];
}

export default function Product({ products }: ProductProps) {
    return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => {
        const isSoldOut =
            product.product_variants?.every((variant) => variant.quantity === 0) || false;

        return (
          <CardProduct
            key={product.id}
            size="medium"
            productName={product.name}
            price={Number(product.price)}
            imageUrl={`http://localhost:8000/storage/${product.image_url}`}
            isSoldOut={isSoldOut}
          />
        );
      })}
    </div>
    )
}