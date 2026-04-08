'use client';

interface DashboardSummaryProps {
  userName: string;
  userEmail: string;
  addressCount: number;
  cartCount: number;
  orderCount: number;
  selectedAddressId: number | null;
}

export default function DashboardSummary({
  userName,
  userEmail,
  addressCount,
  cartCount,
  orderCount,
  selectedAddressId,
}: DashboardSummaryProps) {
  return (
    <section className="mb-10 grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
      <div className="rounded-[32px] bg-primary-50/30 p-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
          Welcome Back
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-primary-900 sm:text-3xl">
          {userName}
        </h2>

        <p className="mt-2 text-sm text-primary-500">{userEmail}</p>

        <div className="mt-6 h-px w-full bg-primary-100" />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[24px] bg-white/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
              Account Status
            </p>
            <p className="mt-2 text-sm font-medium text-primary-800">
              Active account
            </p>
          </div>

          <div className="rounded-[24px] bg-white/70 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
              Default Shipping
            </p>
            <p className="mt-2 text-sm font-medium text-primary-800">
              {selectedAddressId ? 'Address selected' : 'Not selected yet'}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] bg-primary-50/50 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
          Saved Addresses
        </p>

        <div className="mt-5 flex items-end justify-between">
          <h3 className="text-4xl font-bold tracking-tight text-primary-900">
            {addressCount}
          </h3>

          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-600">
            Saved
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-primary-500">
          Keep your shipping details ready for faster checkout.
        </p>
      </div>

      <div className="rounded-[32px] bg-neutral-50/50 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Cart Items
        </p>

        <div className="mt-5 flex items-end justify-between">
          <h3 className="text-4xl font-bold tracking-tight text-primary-900">
            {cartCount}
          </h3>

          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700">
            Live
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-primary-500">
          Review your selected products before proceeding to payment.
        </p>
      </div>

      <div className="rounded-[32px] bg-neutral-50/70 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Orders
        </p>

        <div className="mt-5 flex items-end justify-between">
          <h3 className="text-4xl font-bold tracking-tight text-primary-900">
            {orderCount}
          </h3>

          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700">
            History
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-primary-500">
          Keep track of your completed and pending orders.
        </p>
      </div>
    </section>
  );
}