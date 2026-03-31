<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Orders;
use App\Models\Payments;
use Illuminate\Http\Request;
use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;

class PaymentController extends Controller
{
    public function createInvoice(Request $request,$orderId){

        try{
            $order = Orders::where('user_id', $request->user()->id)
                ->findOrFail($orderId);

            $existingPayment = Payments::where('order_id', $order->id)
                ->where('status', 'pending')
                ->first();

            if ($existingPayment && $existingPayment->checkout_url) {
                return response()->json([
                    'invoice_url' => $existingPayment->checkout_url,
                    'payment' => $existingPayment,
                    'message' => 'Existing payment found'
                ]);
            }

            Configuration::setXenditKey(env('XENDIT_SECRET_KEY'));
            $invoiceApi = new InvoiceApi();

            $createInvoiceRequest = [
                'external_id' => $order->external_id,
                'amount' => $order->total_price,
                'payer_email' => $request->user()->email,
                'description' => 'Payment for order ' . $order->external_id,
            ];

            $result = $invoiceApi->createInvoice($createInvoiceRequest);

            $payment = Payments::create([
                'order_id' => $order->id,
                'xendit_id' => $result['id'],
                'payment_method' => null,
                'checkout_url' => $result['invoice_url'],
                'status' => strtolower($result['status']),
                'paid_at' => null
            ]);

            return response()->json([
                'invoice_url' => $result['invoice_url'],
                'payment' => $payment,
                'invoice' => $result,
                'message' => 'Invoice created successfully'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Failed to create invoice',
                'error' => $th->getMessage(),
                'line' => $th->getLine(),
                'file' => $th->getFile()
            ], 500);
        }
    }
}
