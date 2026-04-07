"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useAddressStore } from "@/stores/addressStore";
import { usePayment } from "@/features/dashboard/hooks/usePayment";
import { useOrder } from "@/features/dashboard/hooks/useOrder";

import DashboardHeader from "@/features/dashboard/components/dashboard/DashboardHeader";
import DashboardPaymentSection from "@/features/dashboard/components/Payment/DashboardPaymentSection";
import DashboardOrderSection from "@/features/dashboard/components/Order/DashboardOrderSection";
import DashboardSummary from "@/features/dashboard/components/shared/DashboardSummary";
import DashboardTabs from "@/features/dashboard/components/shared/DashboardTabs";
import DashboardAddressesSection from "@/features/dashboard/components/Address/DashboardAddressesSection";
import DashboardCartSection from "@/features/dashboard/components/Cart/DashboardCartSection";

import useDashboardPage from "@/features/dashboard/hooks/useDashboardPage";
import type { DashboardTab } from "@/features/dashboard/types/dashboard.types";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, checkAuth, logout } = useAuthStore();
  const { addresses, fetchAddresses } = useAddressStore();
  const { cart, fetchCart } = useCartStore();

  const { payments, fetchPayments } = usePayment();
  const { orders, fetchOrders } = useOrder();

  const [isChecking, setIsChecking] = useState(true);

  const {
    activeTab,
    editingAddress,
    showForm,
    selectedAddressId,
    setSelectedAddressId,
    handleEditAddress,
    handleAddressFormSuccess,
    handleChangeTab,
    openForm,
    closeForm,
  } = useDashboardPage({ addresses });

  useEffect(() => {
    const performAuthCheck = async () => {
      setIsChecking(true);
      await checkAuth();
      setIsChecking(false);
    };

    performAuthCheck();
  }, [checkAuth]);

  useEffect(() => {
    if (!isChecking && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isChecking, router]);

  const tabFetchMap = useMemo<Record<DashboardTab, () => void>>(
    () => ({
      addresses: fetchAddresses,
      cart: fetchCart,
      payment: fetchPayments,
      order: fetchOrders,
    }),
    [fetchAddresses, fetchCart, fetchPayments, fetchOrders]
  );

  useEffect(() => {
    if (!isAuthenticated || isChecking) return;

    tabFetchMap[activeTab]?.();
  }, [activeTab, isAuthenticated, isChecking, tabFetchMap]);

  useEffect(() => {
    const handleFocus = () => {
      if (!isAuthenticated || isChecking) return;

      tabFetchMap[activeTab]?.();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [activeTab, isAuthenticated, isChecking, tabFetchMap]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <div className="text-base font-medium uppercase tracking-[0.08em] text-primary-700">
          Verifying session...
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white">
        <div className="text-base font-medium uppercase tracking-[0.08em] text-primary-700">
          Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <DashboardHeader onLogout={handleLogout} />

        <DashboardSummary
          userName={user?.name || "User"}
          userEmail={user?.email || "-"}
          addressCount={addresses.length}
          cartCount={cart?.cart_items?.length || 0}
          paymentCount={payments.length}
          selectedAddressId={selectedAddressId}
        />

        <DashboardTabs activeTab={activeTab} onChangeTab={handleChangeTab} />

        {activeTab === "addresses" && (
          <DashboardAddressesSection
            showForm={showForm}
            editingAddress={editingAddress}
            selectedAddressId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onEditAddress={handleEditAddress}
            onOpenForm={openForm}
            onCloseForm={closeForm}
            onFormSuccess={handleAddressFormSuccess}
          />
        )}

        {activeTab === "cart" && (
          <DashboardCartSection
            selectedAddressId={selectedAddressId}
            cartCount={cart?.cart_items?.length || 0}
          />
        )}

        {activeTab === "payment" && <DashboardPaymentSection />}

        {activeTab === "order" && <DashboardOrderSection />}
      </div>
    </div>
  );
}