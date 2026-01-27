<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariants extends Model
{
    protected $table = 'product_variants';

    protected $fillable = ['size','quantity'];

    public function products()
    {
        return $this->belongsTo(Products::class) ;
    }
}
