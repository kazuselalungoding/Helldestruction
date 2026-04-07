import { api } from '@/lib/api';

interface HandleCartQuantityChangeParams {
  itemId: number;
  variantId: number;
  currentQty: number;
  nextQty: number;
  addToCart: (variantId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
}

export const handleCartQuantityChange = async ({
  itemId,
  variantId,
  currentQty,
  nextQty,
  addToCart,
  removeFromCart,
}: HandleCartQuantityChangeParams) => {
  if (nextQty === currentQty) return;

  if (nextQty <= 0) {
    await removeFromCart(itemId);
    return;
  }

  if (nextQty > currentQty) {
    await addToCart(variantId, nextQty - currentQty);
    return;
  }

  await removeFromCart(itemId);
  await addToCart(variantId, nextQty);
};

interface CreateCheckoutPaymentParams {
  selectedAddressId: number;
  checkout: (addressId: number) => Promise<{ id: number }>;
}

export const createCheckoutPayment = async ({
  selectedAddressId,
  checkout,
}: CreateCheckoutPaymentParams) => {
  const order = await checkout(selectedAddressId);
  const res = await api.post(`/api/payment/${order.id}`);
  const invoiceUrl = res?.data?.invoice_url;

  if (!invoiceUrl) {
    throw new Error('Invoice URL not found');
  }

  return {
    order,
    invoiceUrl,
  };
};