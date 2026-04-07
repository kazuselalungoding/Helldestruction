import type { Address } from '@/stores/addressStore';

type FloatingCartAddressPickerProps = {
  isOpen: boolean;
  addresses: Address[];
  selectedAddressId: number | null;
  isAddressLoading: boolean;
  isCheckoutLoading: boolean;
  onClose: () => void;
  onSelectAddress: (id: number) => void;
  onSubmitCheckout: () => void;
};

export default function FloatingCartAddressPicker({
  isOpen,
  addresses,
  selectedAddressId,
  isAddressLoading,
  isCheckoutLoading,
  onClose,
  onSelectAddress,
  onSubmitCheckout,
}: FloatingCartAddressPickerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-10 bg-[#ececec] px-6 pb-6 pt-5 sm:px-9 sm:pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bagos text-4xl font-bold uppercase leading-none">Choose Address</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[#1737ff] px-3 py-1 text-xs font-medium uppercase tracking-wide transition hover:bg-[#1737ff] hover:text-white"
        >
          Back
        </button>
      </div>

      {isAddressLoading ? (
        <div className="grid h-[50vh] place-items-center text-sm uppercase tracking-wide">
          Loading addresses...
        </div>
      ) : addresses.length === 0 ? (
        <div className="grid h-[50vh] place-items-center text-center">
          <div>
            <p className="mb-3 text-xl font-semibold uppercase">No address yet</p>
            <p className="text-sm uppercase tracking-wide">Please add address in dashboard first.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="max-h-[58vh] space-y-3 overflow-y-auto pr-1">
            {addresses.map((address) => (
              <button
                key={address.id}
                type="button"
                onClick={() => onSelectAddress(address.id)}
                className={`w-full border p-4 text-left transition ${
                  selectedAddressId === address.id
                    ? 'border-[#1737ff] bg-[#1737ff] text-white'
                    : 'border-[#1737ff]/40 hover:border-[#1737ff]'
                }`}
              >
                <p className="font-semibold uppercase">{address.recipient_name}</p>
                <p className="mt-1 text-sm">
                  {address.street}, {address.city}, {address.province}, {address.postal_code}
                </p>
                <p className="mt-1 text-sm">{address.phone}</p>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onSubmitCheckout}
            disabled={!selectedAddressId || isCheckoutLoading}
            className="mt-5 block w-full rounded-full border border-[#1737ff] py-3 text-center text-[30px] font-bold uppercase leading-none transition hover:bg-[#1737ff] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCheckoutLoading ? 'Processing...' : 'Pay Now'}
          </button>
        </>
      )}
    </div>
  );
}
