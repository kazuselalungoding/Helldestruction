

import FloatingCartButton from "@/components/FloatingCartButton";
import Navbar from "@/components/layout/Navbar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard-layout">
      <Navbar color={false} fixed={true} />
      {children}
      {/* <FloatingCartButton /> */}
    </div>
  );
}
