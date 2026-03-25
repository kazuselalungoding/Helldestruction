<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categories;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Categories::select('id', 'name')->get();
        return response()->json([
            'status' => 'success',
            'data' => $categories
        ], 200);
    }

    public function show($id)
    {
        if (!$id) {
            return response()->json(['message' => 'Category ID is required'], 400);
        }
        if (!is_numeric($id)) {
            return response()->json(['message' => 'Category ID must be numeric'], 400);
        }

        if (!Categories::find($id)) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category = Categories::find($id);
        return response()->json(['status' => 'success', 'data' => $category], 200);
    }
}
