"use client";

import { useCartStore } from "@/stores/cartStore";
import { useCheckoutStore } from "@/stores/checkoutStore";
import Button from "@/components/ui/Button";
import { api } from "@/lib/api";

interface CartReviewProps {
  selectedAddressId: number | null;
}

export default function CartReview({ selectedAddressId }: CartReviewProps) {
  const { cart, total, removeFromCart, isLoading } = useCartStore();
  const { checkout, isLoading: checkoutLoading } = useCheckoutStore();

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
      <div className="text-center py-8">
        <p className="text-gray-400 mb-4">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
        {cart.cart_items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-4 border-b border-zinc-700 last:border-b-0 hover:bg-zinc-700/50 transition"
          >
            <div className="flex-1">
              <h3 className="text-white font-semibold">
                {item.product_variant.products?.name}
              </h3>
              <div className="flex gap-4 mt-2 text-sm text-gray-300">
                <span>SKU: {item.product_variant.products?.id}</span>
                <span>Qty: {item.quantity}</span>
                <span className="text-primary-700 font-semibold">
                  Rp{" "}
                  {(Number(item.price) * item.quantity).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleRemoveItem(item.id)}
              className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
              disabled={isLoading}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-300">Subtotal:</span>
          <span className="text-white font-semibold">
            Rp {total.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex justify-between items-center border-t border-zinc-700 pt-4">
          <span className="text-white font-bold text-lg">Total:</span>
          <span className="text-primary-700 font-bold text-lg">
            Rp {total.toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      <Button
        label={checkoutLoading ? "PROCESSING..." : "PROCEED TO CHECKOUT"}
        onClick={handleCheckout}
        size="large"
        disabled={isLoading || checkoutLoading || !cart.cart_items.length}
      />
    </div>
  );
}
