<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItems extends Model
{
    protected $fillable = ['cart_id', 'product_variant_id', 'quantity', 'price'];

    public function cart(){
        return $this->belongsTo(Carts::class, 'cart_id');
    }

    public function productVariant(){
        return $this->belongsTo(ProductVariants::class, 'product_variant_id');
    }
}
