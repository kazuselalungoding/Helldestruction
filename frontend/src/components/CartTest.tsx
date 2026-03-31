'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

export function CartTest() {
  const { user } = useAuth();
  const { cart, total, isLoading, error, getCart, addToCart, removeFromCart } = useCart();

  const [productVariantId, setProductVariantId] = useState('');
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    getCart();
  }, [getCart]);

  const handleAddToCart = async () => {
    if (!productVariantId) {
      alert('Please enter product variant ID');
      return;
    }

    try {
      await addToCart(Number(productVariantId), Number(quantity));
      setProductVariantId('');
      setQuantity('1');
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    try {
      await removeFromCart(itemId);
      alert('Item removed from cart!');
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  if (!user) {
    return <div className="p-4 text-red-500">Please login first</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-primary-800">
      <h1 className="text-3xl font-bold mb-6">🛒 Cart Testing</h1>

      {/* Add to Cart Form */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 text-primary-800">
        <h2 className="text-xl font-semibold mb-4">Add to Cart</h2>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Product Variant ID"
            value={productVariantId}
            onChange={(e) => setProductVariantId(e.target.value)}
            className="border px-3 py-2 rounded w-40"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border px-3 py-2 rounded w-24"
            min="1"
          />
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Add'}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Cart Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
        <p>Total Items: {cart?.cart_items?.length || 0}</p>
        <p className="text-lg font-bold text-green-600">
          Total: Rp {total.toLocaleString('id-ID')}
        </p>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Items</h2>

        {isLoading && <div className="text-gray-500">Loading cart...</div>}

        {!isLoading && (!cart?.cart_items || cart.cart_items.length === 0) && (
          <div className="text-gray-500 text-center py-8">Cart is empty</div>
        )}

        {cart?.cart_items &&
          cart.cart_items.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div className="flex-1">
                <p className="font-semibold">{item.product_variant?.products?.name}</p>
                <p className="text-sm text-gray-600">
                  Price: Rp {item.price.toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-gray-600">
                  Subtotal: Rp {(item.quantity * item.price).toLocaleString('id-ID')}
                </p>
              </div>

              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
      </div>

      {/* Debug */}
      <div className="mt-8 bg-gray-100 p-4 rounded text-sm">
        <p className="font-semibold mb-2">Debug Info:</p>
        <pre className="text-xs overflow-auto max-h-40">
          {JSON.stringify(
            {
              user: user?.email,
              cartItems: cart?.cart_items?.length || 0,
              total,
              cart,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}