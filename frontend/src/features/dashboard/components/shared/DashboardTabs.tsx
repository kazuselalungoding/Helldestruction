'use client';

import type { DashboardTab } from '@/features/dashboard/types/dashboard.types';

interface DashboardTabsProps {
  activeTab: DashboardTab;
  onChangeTab: (tab: DashboardTab) => void;
}

const tabs: { id: DashboardTab; label: string }[] = [
  { id: 'addresses', label: 'Addresses' },
  { id: 'cart', label: 'Cart & Checkout' },
  { id: 'order', label: 'Order' },
];

export default function DashboardTabs({
  activeTab,
  onChangeTab,
}: DashboardTabsProps) {
  return (
    <div className="mb-8 inline-flex flex-wrap rounded-full bg-primary-50 p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChangeTab(tab.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] transition-all ${
              isActive
                ? 'bg-white text-primary-900 shadow-sm'
                : 'text-primary-500 hover:text-primary-800'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}