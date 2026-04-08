import Navbar from "@/components/layout/Navbar";
import "../../styles/main.css";
import Footer from "@/components/layout/Footer";
import FloatingCartContainer from '@/features/cart/components/FloatingCart/FloatingCartContainer';


export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-layout">
      <Navbar color={true} fixed={true} />
      {children}
      <Footer/>
      <FloatingCartContainer />
    </div>
  );
}
