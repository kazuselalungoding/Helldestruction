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
      <div className="py-16 text-center">
        <h3 className="text-xl font-semibold text-primary-900">No address yet</h3>
        <p className="mt-3 text-sm leading-7 text-primary-400">
          Add your first shipping address to continue checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {addresses.map((address, index) => {
        const isSelected = selectedAddressId === address.id;

        return (
          <div
            key={address.id}
            onClick={() => onSelectAddress?.(address.id)}
            className="group cursor-pointer"
          >
            {/* top line */}
            <div
              className={`mb-6 h-[2px] w-full transition-all duration-300 ${
                isSelected ? 'bg-neutral-500' : 'bg-primary-100'
              }`}
            />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              {/* Left */}
              <div className="flex-1">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
                    Shipping Address
                  </p>

                  {isSelected && (
                    <span className="rounded-full bg-neutral-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
                      Selected for checkout
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-semibold tracking-tight text-primary-900">
                  {address.recipient_name}
                </h3>

                <div className="mt-8 grid gap-y-6 sm:grid-cols-2 sm:gap-x-10">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                      Street
                    </p>
                    <p className="mt-2 text-base leading-8 text-primary-700">
                      {address.street}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                      City / Province
                    </p>
                    <p className="mt-2 text-base leading-8 text-primary-700">
                      {address.city}, {address.province}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                      Postal Code / Country
                    </p>
                    <p className="mt-2 text-base leading-8 text-primary-700">
                      {address.postal_code}, {address.country}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                      Phone Number
                    </p>
                    <p className="mt-2 text-base font-medium leading-8 text-neutral-600">
                      {address.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div
                className="flex flex-wrap items-center gap-3 lg:justify-end"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onEditAddress?.(address)}
                  className="rounded-full bg-primary-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(address.id)}
                  className="rounded-full bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-50"
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* divider */}
            {index !== addresses.length - 1 && (
              <div className="mt-10 h-px w-full bg-primary-100/70" />
            )}
          </div>
        );
      })}
    </div>
  );
}