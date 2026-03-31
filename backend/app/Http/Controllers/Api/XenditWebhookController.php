<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use App\Models\Payments;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class XenditWebhookController extends Controller
{
    public function handleInvoiceWebhook(Request $request)
    {
        $callbackToken = $request->header('X-CALLBACK-TOKEN');

        if ($callbackToken !== env('XENDIT_CALLBACK_TOKEN')) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $externalId = $request->external_id;
        $status = strtoupper($request->status);
        $paymentMethod = $request->payment_method ?? null;
        $paidAt = $request->paid_at ?? null;
        $xenditId = $request->id ?? null;

        $order = Orders::where('external_id', $externalId)->first();

        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }

        $payment = Payments::where('order_id', $order->id)->first();

        if (!$payment) {
            return response()->json([
                'message' => 'Payment record not found for this order'
            ], 404);
        }

        $payment->update([
            'xendit_id' => $xenditId ?? $payment->xendit_id,
            'payment_method' => $paymentMethod,
            'status' => strtolower($status),
            'paid_at' => $status === 'PAID'
                ? Carbon::parse($paidAt ?? now())
                : $payment->paid_at,
        ]);

        switch ($status){
            case 'PAID':
                if($order->status !== 'processing') {
                    $order->update(['status' => 'processing']);

                    foreach ($order->orderItems as $item) {
                        $variant = $item->productVariant;
                        $variant->decrement('quantity', $item->quantity);
                    }
                }

                break;
            case 'EXPIRED':
                if($order->status !== 'cancelled') {
                    $order->update(['status' => 'cancelled']);
                }
                break;
            default:
                break;
        }

        return response()->json([
            'message' => 'Webhook handled successfully',
        ]);
    }
}
