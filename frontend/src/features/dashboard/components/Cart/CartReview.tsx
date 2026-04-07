"use client";

import Image from "next/image";
import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import { useAddressStore } from "@/stores/addressStore";
import Button from "@/components/ui/Button";
import { api } from "@/lib/api";

interface CartReviewProps {
  selectedAddressId: number | null;
}

export default function CartReview({ selectedAddressId }: CartReviewProps) {
  const { cart, total, removeFromCart, isLoading } = useCartStore();
  const { checkout, isLoading: checkoutLoading } = useCheckoutStore();
  const { addresses } = useAddressStore();

  const handleRemoveItem = async (id: number) => {
    if (confirm("Remove item from cart?")) {
      await removeFromCart(id);
    }
  };

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      alert("Please select an address first");
      return;
    }

    try {
      const order = await checkout(selectedAddressId);

      console.log("ORDER:", order);

      const res = await api.post(`/api/payment/${order.id}`);
      console.log("PAYMENT RES:", res.data);

      window.open(res.data.invoice_url, "_blank");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed");
    }
  };

  if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-semibold text-primary-900">
          Your cart is empty
        </h3>
        <p className="mt-3 text-sm leading-7 text-primary-400">
          Add products to continue with checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_0.8fr]">
      {/* LEFT - CART ITEMS */}
      <div className="space-y-8">
        {cart.cart_items.map((item, index) => {
          const product = item.product_variant.products;
          const itemTotal = Number(item.price) * item.quantity;

          return (
            <div key={item.id}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                {/* Product Info */}
                <div className="flex flex-1 gap-5">
                  <div className="relative h-32 w-28 overflow-hidden rounded-[24px]">
                    {product?.image_url ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${product.image_url}`}
                        alt={product.name}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-primary-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
                      Cart Item
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-primary-900">
                      {product?.name}
                    </h3>

                    <div className="mt-5 grid gap-y-4 sm:grid-cols-2 sm:gap-x-8">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                          Product ID
                        </p>
                        <p className="mt-2 text-sm leading-7 text-primary-700">
                          {product?.id}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                          Size
                        </p>
                        <p className="mt-2 text-sm leading-7 text-primary-700">
                          {item.product_variant.size || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                          Quantity
                        </p>
                        <p className="mt-2 text-sm leading-7 text-primary-700">
                          {item.quantity}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
                          Item Total
                        </p>
                        <p className="mt-2 text-sm font-medium leading-7 text-neutral-600">
                          Rp {itemTotal.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex sm:justify-end">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="rounded-full bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {index !== cart.cart_items.length - 1 && (
                <div className="mt-8 h-px w-full bg-primary-100/70" />
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT - ORDER SUMMARY */}
      <div className="h-fit rounded-[30px] bg-primary-50/40 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-400">
          Order Summary
        </p>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-primary-900">
          Checkout Details
        </h3>

        <div className="mt-8 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-500">Subtotal</span>
            <span className="text-base font-medium text-primary-900">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-primary-500">Shipping</span>
            <span className="text-base font-medium text-primary-900">
              Calculated later
            </span>
          </div>

          <div className="h-px w-full bg-primary-100" />

          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-primary-900">
              Total
            </span>
            <span className="text-2xl font-bold tracking-tight text-neutral-600">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>

          <div className="pt-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-400">
              Shipping Address
            </p>
            {selectedAddressId ? (
              (() => {
                const selectedAddr = addresses.find(
                  (a) => a.id === selectedAddressId,
                );
                return selectedAddr ? (
                  <div className="mt-2 space-y-1 text-sm text-primary-600">
                    <p className="font-semibold text-primary-900">
                      {selectedAddr.recipient_name}
                    </p>
                    <p>{selectedAddr.street}</p>
                    <p>
                      {selectedAddr.city}, {selectedAddr.province}{" "}
                      {selectedAddr.postal_code}
                    </p>
                    <p>{selectedAddr.country}</p>
                    <p className="text-primary-700 font-medium">
                      {selectedAddr.phone}
                    </p>
                  </div>
                ) : null;
              })()
            ) : (
              <p className="mt-2 text-sm text-red-500">No address selected</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Button
            label={checkoutLoading ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
            onClick={handleCheckout}
            size="large"
            disabled={isLoading || checkoutLoading || !cart.cart_items.length}
          />
        </div>
      </div>
    </div>
  );
}
