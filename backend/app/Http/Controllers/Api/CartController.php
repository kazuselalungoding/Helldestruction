<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItems;
use App\Models\Carts;
use App\Models\ProductVariants;
use Illuminate\Http\Request;

class CartController extends Controller
{
public function index(Request $request){
    $cart = Carts::with(['cartItems.productVariant.products'])->firstOrCreate([
        'user_id' => $request->user()->id
    ]);

    $total = $cart->cartItems->sum(function($item){
        return $item->quantity * (float) $item->price;
    });

    return response()->json([
        'cart' => $cart,
        'total' => $total
    ]);
}

    public function addToCart(Request $request){
        $request->validate([
            'product_variant_id' => 'required|exists:product_variants,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = $request->user();
        $cart = Carts::firstOrCreate(['user_id' => $user->id]);
        $variant = ProductVariants::with('products')->findOrFail($request->product_variant_id);

        if($variant->quantity < $request->quantity){
            return response()->json([
                'message' => 'Not enough stock available'
            ], 400);
        }

        $cartItem = CartItems::where('cart_id', $cart->id)
            ->where('product_variant_id', $request->product_variant_id)
            ->first();

            if($cartItem){
                $newQuantity = $cartItem->quantity + $request->quantity;

                if($variant->quantity < $newQuantity){
                    return response()->json([
                        'message' => 'Stock is not enough'
                    ], 400);
                }

                $cartItem->update(['quantity' => $newQuantity]);
            } else {
                $cartItem = CartItems::create([
                    'cart_id' => $cart->id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $request->quantity,
                    'price' => $variant->products->price
                ]);
            }

            $cart->load('cartItems.productVariant.products');

            $total = $cart->cartItems->sum(fn($item) => $item->quantity * (float) $item->price);

            return response()->json([
                'message' => 'Product added to cart successfully',
                'cart' => $cart,
                'total' => $total
            ]);
    }

    public function removeFromCart(Request $request, $id){
        $user = $request->user();
        $cart = Carts::where('user_id', $user->id)->firstOrFail();

        $cartItem = CartItems::where('cart_id', $cart->id)
            ->where('id', $id)
            ->firstOrFail();

        $cartItem->delete();
        return response()->json([
            'message' => 'Product removed from cart successfully'
        ]);
    }
}
