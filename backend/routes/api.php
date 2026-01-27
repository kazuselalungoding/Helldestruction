<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;


Route::get('/products/search', [ProductController::class, 'search']);
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/products', [ProductController::class, 'index']);
});
