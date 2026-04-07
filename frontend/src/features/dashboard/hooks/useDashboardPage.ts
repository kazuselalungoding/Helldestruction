'use client';

import { useEffect, useState } from 'react';
import type { Address } from '@/stores/addressStore';
import type { DashboardTab, UseDashboardPageReturn } from '../types/dashboard.types';

interface UseDashboardPageProps {
  addresses: Address[];
}

export default function useDashboardPage({
  addresses,
}: UseDashboardPageProps): UseDashboardPageReturn {
  const [activeTab, setActiveTab] = useState<DashboardTab>('addresses');
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
    setActiveTab('addresses');
  };

  const handleAddressFormSuccess = () => {
    setEditingAddress(undefined);
    setShowForm(false);
  };

  const handleChangeTab = (tab: DashboardTab) => {
    setActiveTab(tab);

    if (tab === 'addresses') {
      setEditingAddress(undefined);
      setShowForm(false);
    }
  };

  const openForm = () => {
    setEditingAddress(undefined);
    setShowForm(true);
    setActiveTab('addresses');
  };

  const closeForm = () => {
    setEditingAddress(undefined);
    setShowForm(false);
  };

  return {
    activeTab,
    editingAddress,
    showForm,
    selectedAddressId,
    setSelectedAddressId,
    handleEditAddress,
    handleAddressFormSuccess,
    handleChangeTab,
    openForm,
    closeForm,
  };
}