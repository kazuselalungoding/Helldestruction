import Navbar from "@/components/layout/Navbar";
import "../../styles/main.css";
import Footer from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main-layout">
      <Navbar color={true} />
      {children}
      <Footer/>
    </div>
  );
}
