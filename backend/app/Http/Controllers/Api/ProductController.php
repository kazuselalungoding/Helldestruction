<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Products;
use App\Models\Collection;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Products::with(['Collection:id,name,image_url', 'Categories:id,name', 'ProductVariants:id,product_id,size,quantity']);

        if($request->categories) {
            $products->whereHas('Categories', function($query) use ($request) {
                $query->where('name', $request->categories);
            });
        }

        if($request->collections) {
            $products->whereHas('Collection', function($query) use ($request) {
                $query->where('name', $request->collections);
            });
        }

        if($request->search) {
            $products->where('name', 'like', '%' . $request->search . '%');
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $products->get()
        ], 200);
    }

    public function show($id)
    {
        if (!$id) {
            return response()->json(['message' => 'Product ID is required'], 400);
        }
        if (!is_numeric($id)) {
            return response()->json(['message' => 'Product ID must be numeric'], 400);
        }

        if (!Products::find($id)) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product = Products::with(['Collection:id,name,image_url', 'Categories:id,name', 'ProductVariants:id,product_id,size,quantity'])->find($id);
        return response()->json(['status' => 'success', 'data' => $product], 200);
    }


    // public function search(Request $request)
    // {
    //     $query = $request->input('query');
    //     if (!$query) {
    //         return response()->json(['message' => 'Search query is required'], 400);
    //     }

    //     $products = Products::where('name', 'like', '%' . $query . '%')
    //         ->orWhere('description', 'like', '%' . $query . '%')
    //         ->with(['Collection', 'Categories', 'ProductVariants'])
    //         ->paginate(10);

    //     return response()->json($products);
    // }

    public function newDrop()
    {
        $latestCollection = Collection::latest()->first();

        if (!$latestCollection) {
            return response()->json(['message' => 'No collection found'], 404);
        }

        $products = Products::select([
            'id','category_id','collection_id','name','image_url','price'
        ])->with(['Categories:id,name', 'ProductVariants:id,product_id,size,quantity'])
            ->where('collection_id', $latestCollection->id)
            ->get();

        return response()->json([
            'collection' => $latestCollection,
            'products' => $products
        ]);
    }
}
