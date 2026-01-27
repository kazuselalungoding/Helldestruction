<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    protected $fillable = ['name', 'image_url','description','price','collection_id','category_id'];

    public function Collection()
    {
        return $this->belongsTo(Collection::class);
    }
    public function Categories()
    {
        return $this->belongsTo(Categories::class, 'category_id');
    }

    public function ProductVariants()
    {
        return $this->hasMany(ProductVariants::class, 'product_id');
    }
}
