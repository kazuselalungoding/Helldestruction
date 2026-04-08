import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CardProduct from "@/components/ui/CardProduct";
import NewDrop from "@/features/product/components/list/NewDrop";
import CategoryShowcase from "@/features/category/components/CategoryShowcase";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center pt-4">
        <div className="w-full h-[clamp(200px,40vw,800px)] relative">
          <img
            src="/assets/image/contoh.png"
            className="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <h1 className="text-[clamp(2rem,9vw,9rem)] md:text-[clamp(2rem,10vw,9rem)] lg:text-[clamp(2rem,10vw,18rem)] font-bagos font-bold text-primary-800 text-center leading-none">
          HELLDESTRUCTION
        </h1>
      </div>
      
      <NewDrop />

      <h1 className="text-[clamp(2rem,8vw,5rem)] font-black uppercase leading-none tracking-tight text-black py-8">
        Shop by category
      </h1>

      <CategoryShowcase />
    </div>
  );
}
