<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\XenditWebhookController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


// Route::get('/products/search', [ProductController::class, 'search']);
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/products/new-drop', [ProductController::class, 'newDrop']);
    Route::get('/products/{slug}', [ProductController::class, 'show']);
    Route::get('/products', [ProductController::class, 'index']);
});

Route::get('/category', [CategoryController::class, 'index']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'dashboard']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cart Routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']);

    Route::get('/address', [AddressController::class, 'index']);
    Route::post('/address', [AddressController::class, 'store']);
    Route::get('/address/{id}', [AddressController::class, 'show']);
    Route::put('/address/{id}', [AddressController::class, 'update']);
    Route::delete('/address/{id}', [AddressController::class, 'remove']);

    Route::post('/checkout', [CheckoutController::class, 'checkout']);

    Route::post('/payment/{orderId}', [PaymentController::class, 'createInvoice']);
    });
    Route::post('/xendit/webhook', [XenditWebhookController::class, 'handleInvoiceWebhook']);
