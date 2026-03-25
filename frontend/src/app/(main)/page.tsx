import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CardProduct from "@/components/ui/CardProduct";
import NewDrop from "@/features/product/components/NewDrop";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col items-center justify-center pt-4">
        <div className="w-full h-128 ">
          <img
            src="/assets/image/contoh.png"
            className="w-full h-full object-cover rounded-xl"
            alt=""
          />
        </div>
        <h1 className="text-[clamp(2rem,9vw,9rem)] md:text-[clamp(2rem,10vw,9rem)] lg:text-[clamp(2rem,10vw,9rem)] font-bagos font-bold text-primary-800 text-center leading-none">
          HELLDESTRUCTION
        </h1>
      </div>
      <NewDrop />
      {/* <CardProduct /> */}
    </div>
  );
}
