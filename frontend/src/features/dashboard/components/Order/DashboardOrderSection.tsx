'use client';

import OrderHistory from './OrderHistory';

export default function DashboardOrderSection() {
  return (
    <section className="space-y-6">
      <div className="rounded-[32px] bg-white">
        <OrderHistory />
      </div>
    </section>
  );
}