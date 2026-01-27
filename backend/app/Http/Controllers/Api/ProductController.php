<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Products;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $products = Products::with(['Collection','Categories','ProductVariants'])->paginate(10);
        return response()->json($products);
    }

    public function show($id){
        if(!$id){
            return response()->json(['message'=>'Product ID is required'], 400);
        }
        if(!is_numeric($id)){
            return response()->json(['message'=>'Product ID must be numeric'], 400);
        }

        if(!Products::find($id)){
            return response()->json(['message'=>'Product not found'], 404);
        }
        
        $product = Products::with(['Collection','Categories','ProductVariants'])->find($id);
        return response()->json(['status'=>'success','data'=>$product], 200);
    }

    
    public function search(Request $request){
        $query = $request->input('query');
        if(!$query){
            return response()->json(['message'=>'Search query is required'], 400);
        }

        $products = Products::where('name', 'like', '%'.$query.'%')
                    ->orWhere('description', 'like', '%'.$query.'%')
                    ->with(['Collection','Categories','ProductVariants'])
                    ->paginate(10);

        return response()->json($products);
    }
    
}
