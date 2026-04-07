'use client';

import Button from '@/components/ui/Button';

interface DashboardHeaderProps {
  onLogout: () => void;
}

export default function DashboardHeader({
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-6 border-b border-primary-100 pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-600">
          Account Center
        </p>
        <h1 className="font-bagos text-4xl tracking-tight text-primary-900 sm:text-5xl">
          MY ACCOUNT
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-primary-500 sm:text-base">
          Manage your personal details, shipping addresses, and checkout
          experience in one place.
        </p>
      </div>

      <div className="w-full md:w-auto">
        <Button
          label="LOG OUT"
          type="button"
          size="medium"
          onClick={onLogout}
        />
      </div>
    </div>
  );
}