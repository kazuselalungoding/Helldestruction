export interface UseFloatingCartReturn {
  isOpen: boolean;
  isAddressPickerOpen: boolean;
  selectedAddressId: number | null;
  updatingItemId: number | null;
  itemCount: number;

  cart: ReturnType<typeof import('@/stores/cartStore').useCartStore.getState>['cart'];
  total: number;
  isLoading: boolean;

  addresses: import('@/stores/addressStore').Address[];
  isAddressLoading: boolean;

  isCheckoutLoading: boolean;

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  openAddressPicker: () => void;
  closeAddressPicker: () => void;

  setSelectedAddressId: (id: number) => void;

  handleQuantityChange: (
    itemId: number,
    variantId: number,
    currentQty: number,
    nextQty: number
  ) => Promise<void>;

  handleSubmitCheckout: () => Promise<void>;
}

type FloatingCartDrawerProps = {
  isOpen: boolean;
  isLoading: boolean;
  isCheckoutLoading: boolean;
  isAddressLoading: boolean;
  isAddressPickerOpen: boolean;
  itemCount: number;
  cart: Cart | null;
  addresses: Address[];
  selectedAddressId: number | null;
  total: number;
  updatingItemId: number | null;
  onClose: () => void;
  onStartShopping: () => void;
  onOpenAddressPicker: () => void;
  onCloseAddressPicker: () => void;
  onSelectAddress: (id: number) => void;
  onSubmitCheckout: () => void;
  onQuantityChange: (
    itemId: number,
    variantId: number,
    currentQty: number,
    nextQty: number
  ) => void;
};