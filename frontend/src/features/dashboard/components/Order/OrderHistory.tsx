'use client';

import { useState } from 'react';
import { useOrder } from '../../hooks/useOrder';
import OrderEmptyState from './OrderEmptyState';
import OrderHistoryCard from './OrderHistoryCard';
import OrderDetail from './OrderDetail';

export default function OrderHistory() {
  const {
    orders,
    selectedOrder,
    isLoading,
    isDetailLoading,
    error,
    fetchOrderDetail,
    clearSelectedOrder,
  } = useOrder();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleViewDetail = async (externalId: string) => {
    setSelectedOrderId(externalId);
    await fetchOrderDetail(externalId);
  };

  const handleBack = () => {
    setSelectedOrderId(null);
    clearSelectedOrder();
  };

  return (
    <div className="space-y-6">
      {!selectedOrderId && (
        <>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
              Order
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-primary-900">
              Order History
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-primary-500">
              Review your checkout records, payment progress, and completed purchases.
            </p>
          </div>

          {isLoading && (
            <div className="rounded-[28px] bg-primary-50/50 px-6 py-12 text-sm text-primary-500">
              Loading orders...
            </div>
          )}

          {error && (
            <div className="rounded-[20px] bg-red-50 px-5 py-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!isLoading && !error && orders.length === 0 && <OrderEmptyState />}

          {!isLoading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderHistoryCard
                  key={order.external_id}
                  order={order}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          )}
        </>
      )}

      {selectedOrderId && (
        <OrderDetail
          order={selectedOrder}
          isLoading={isDetailLoading}
          onBack={handleBack}
        />
      )}
    </div>
  );
}