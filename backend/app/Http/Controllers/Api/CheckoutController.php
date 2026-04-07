<?php

namespace App\Http\Controllers\Api;

use App\Models\Addresses;
use App\Http\Controllers\Controller;
use App\Models\Carts;
use App\Models\Orders;
use App\Models\OrderItems;
use App\Models\ProductVariants;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'address_id' => 'required|exists:addresses,id',
        ]);

        $address = Addresses::where('user_id', $user->id)
            ->findOrFail($validated['address_id']);

        $cart = Carts::with('cartItems.productVariant.products')
            ->where('user_id', $user->id)
            ->first();

        if (!$cart || $cart->cartItems->isEmpty()) {
            return response()->json([
                'message' => 'Cart is empty'
            ], 400);
        }

        $total = $cart->cartItems->reduce(function ($carry, $item) {
            return $carry + ($item->quantity * (float) $item->price);
        }, 0);

        DB::beginTransaction();

        try {
            foreach ($cart->cartItems as $item) {
                $variant = ProductVariants::query()
                    ->lockForUpdate()
                    ->find($item->product_variant_id);

                if (!$variant || $variant->quantity < $item->quantity) {
                    DB::rollBack();

                    return response()->json([
                        'message' => 'Some items are out of stock or stock is insufficient'
                    ], 400);
                }
            }

            $order = Orders::create([
                'user_id' => $user->id,
                'address_id' => $address->id,
                'external_id' => 'ORDER-' . strtoupper(Str::random(10)),
                'total_price' => $total,
                'status' => 'pending'
            ]);

            foreach ($cart->cartItems as $item) {
                OrderItems::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $item->product_variant_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price
                ]);
            }


            $cart->cartItems()->delete();

            DB::commit();

            $order->load([
                'address',
                'orderItems.productVariant.products'
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Order created successfully',
                'order' => $order
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create order',
                'error' => $th->getMessage(),
                'line' => $th->getLine(),
                'file' => $th->getFile(),
            ], 500);
        }
    }
}