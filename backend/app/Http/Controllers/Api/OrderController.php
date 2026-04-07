<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $orders = Orders::with([
            'User:id,name',
            'Address:id,user_id,recipient_name,phone,street,city,province,postal_code,country',
            'OrderItems:id,order_id,product_variant_id,quantity,price',
            'OrderItems.productVariant:id,product_id,size,quantity',
            'OrderItems.productVariant.products:id,name,image_url,price',
            'Payment:id,order_id,payment_method,checkout_url,status,paid_at,created_at'
        ])
            ->where('user_id', $user->id)
            ->latest()
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ], 200);
    }

    public function show(Request $request, $external_id)
    {
        if (!$external_id) {
            return response()->json([
                'message' => 'Order external ID is required'
            ], 400);
        }

        $user = $request->user();

        $order = Orders::with([
            'User:id,name',
            'Address:id,user_id,recipient_name,phone,street,city,province,postal_code,country',
            'OrderItems:id,order_id,product_variant_id,quantity,price',
            'OrderItems.productVariant:id,product_id,size,quantity',
            'OrderItems.productVariant.products:id,name,image_url,price',
            'Payment:id,order_id,payment_method,checkout_url,status,paid_at,created_at'
        ])
            ->where('external_id', $external_id)
            ->where('user_id', $user->id)
            ->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $order
        ], 200);
    }
}
