<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categories;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Categories::select('id', 'name', 'slug')->get();
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ], 200);
    }

    public function show($slug)
    {
        if(!$slug){
            return response()->json(['message' => 'Category slug is required'], 400);
        }

        $category = Categories::with([
            'Products:id,name,slug,image_url,price,category_id',
            'Products.ProductVariants:id,product_id,size,quantity'
        ])->where('slug', $slug)->first();
        return response()->json([
            'status' => 'success', 
            'data' => $category
        ], 200);
    }
}
