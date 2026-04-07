'use client';

import type { Address } from '@/stores/addressStore';
import Button from '@/components/ui/Button';
import AddressForm from './AddressForm';
import AddressList from './AddressList';

interface DashboardAddressesSectionProps {
  showForm: boolean;
  editingAddress?: Address;
  selectedAddressId: number | null;
  onSelectAddress: (id: number) => void;
  onEditAddress: (address: Address) => void;
  onOpenForm: () => void;
  onCloseForm: () => void;
  onFormSuccess: () => void;
}

export default function DashboardAddressesSection({
  showForm,
  editingAddress,
  selectedAddressId,
  onSelectAddress,
  onEditAddress,
  onOpenForm,
  onCloseForm,
  onFormSuccess,
}: DashboardAddressesSectionProps) {
  if (!showForm) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
              Shipping Details
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-primary-900">
              Your Saved Addresses
            </h3>
          </div>

          <Button
            label="ADD NEW ADDRESS"
            onClick={onOpenForm}
            size="medium"
          />
        </div>

        <div className="rounded-[32px] bg-white">
          <AddressList
            onEditAddress={onEditAddress}
            selectedAddressId={selectedAddressId}
            onSelectAddress={onSelectAddress}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] bg-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
            Address Form
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-primary-900">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
        </div>

        <button
          onClick={onCloseForm}
          className="rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 transition hover:bg-primary-100"
        >
          Cancel
        </button>
      </div>

      <AddressForm
        address={editingAddress}
        onSuccess={onFormSuccess}
      />
    </div>
  );
}