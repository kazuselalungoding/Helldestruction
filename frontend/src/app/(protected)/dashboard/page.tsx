'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useAddressStore, type Address } from '@/stores/addressStore';
import Button from '@/components/ui/Button';
import AddressForm from '@/components/AddressForm';
import AddressList from '@/components/AddressList';
import CartReview from '@/components/CartReview';

type Tab = 'addresses' | 'cart';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, checkAuth, logout } = useAuthStore();
  const { addresses, fetchAddresses } = useAddressStore();
  const { fetchCart } = useCartStore();

  const [isChecking, setIsChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('addresses');
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

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
      router.push('/login');
    }
  }, [isAuthenticated, isChecking, router]);

  useEffect(() => {
    if (isAuthenticated && !isChecking) {
      fetchAddresses();
      fetchCart();
    }
  }, [isAuthenticated, isChecking, fetchAddresses, fetchCart]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  if (isChecking) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-xl">Verifying authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-white text-xl">Redirecting to login...</div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
    setActiveTab('addresses');
  };

  const handleAddressFormSuccess = () => {
    setEditingAddress(undefined);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen w-full bg-black">
      <div className="w-full p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white font-bagos">
            DASHBOARD
          </h1>
          <Button
            label="LOGOUT"
            type="button"
            size="medium"
            onClick={handleLogout}
          />
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-lg mb-8 border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-4 font-bagos">
            WELCOME, {user.name.toUpperCase()}!
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-primary-700 font-medium">EMAIL:</span>
              <span className="text-gray-300">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-zinc-800">
          <button
            onClick={() => {
              setActiveTab('addresses');
              setEditingAddress(undefined);
              setShowForm(false);
            }}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'addresses'
                ? 'text-primary-700 border-b-2 border-primary-700'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Addresses ({addresses.length})
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'cart'
                ? 'text-primary-700 border-b-2 border-primary-700'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Cart & Checkout
          </button>
        </div>

        {activeTab === 'addresses' && (
          <div className="space-y-6">
            {!showForm ? (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    Shipping Addresses
                  </h3>
                  <Button
                    label="ADD NEW ADDRESS"
                    onClick={() => setShowForm(true)}
                    size="medium"
                  />
                </div>

                <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                  <AddressList
                    onEditAddress={handleEditAddress}
                    selectedAddressId={selectedAddressId}
                    onSelectAddress={setSelectedAddressId}
                  />
                </div>
              </>
            ) : (
              <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingAddress(undefined);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <AddressForm
                  address={editingAddress}
                  onSuccess={handleAddressFormSuccess}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Review Your Cart</h3>

            {selectedAddressId && (
              <div className="text-sm text-primary-700">
                Selected Address ID: {selectedAddressId}
              </div>
            )}

            <div className="bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-800">
              <CartReview selectedAddressId={selectedAddressId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}