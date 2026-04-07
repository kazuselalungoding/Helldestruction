import type { Address } from '@/stores/addressStore';

export type DashboardTab = 'addresses' | 'cart' | 'payment' | 'order';

export interface UseDashboardPageReturn {
  activeTab: DashboardTab;
  editingAddress?: Address;
  showForm: boolean;
  selectedAddressId: number | null;
  setSelectedAddressId: (id: number) => void;
  handleEditAddress: (address: Address) => void;
  handleAddressFormSuccess: () => void;
  handleChangeTab: (tab: DashboardTab) => void;
  openForm: () => void;
  closeForm: () => void;
}