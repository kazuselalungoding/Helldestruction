'use client';

import { useAddressStore, type Address } from '@/stores/addressStore';

interface AddressListProps {
  onEditAddress?: (address: Address) => void;
  selectedAddressId?: number | null;
  onSelectAddress?: (id: number) => void;
}

export default function AddressList({
  onEditAddress,
  selectedAddressId,
  onSelectAddress,
}: AddressListProps) {
  const { addresses, deleteAddress, isLoading } = useAddressStore();

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this address?')) {
      await deleteAddress(id);
    }
  };

  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No addresses found. Add one to continue.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <div
          key={address.id}
          onClick={() => onSelectAddress?.(address.id)}
          className={`bg-zinc-800 p-4 rounded-lg border transition cursor-pointer ${
            selectedAddressId === address.id
              ? 'border-primary-700 ring-1 ring-primary-700'
              : 'border-zinc-700 hover:border-zinc-600'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <p className="text-white font-semibold mb-2">{address.recipient_name}</p>
              <div className="text-gray-300 text-sm space-y-1">
                <p>{address.street}</p>
                <p>{address.city}, {address.province} {address.postal_code}</p>
                <p>{address.country}</p>
                <p className="text-primary-700">{address.phone}</p>
              </div>

              {selectedAddressId === address.id && (
                <p className="text-xs text-primary-700 mt-3 font-semibold">
                  Selected for checkout
                </p>
              )}
            </div>

            <div
              className="flex gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onEditAddress?.(address)}
                className="px-3 py-1 bg-primary-700 text-white text-sm rounded hover:bg-primary-600 transition"
                disabled={isLoading}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}