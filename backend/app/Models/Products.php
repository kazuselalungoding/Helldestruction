<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Products extends Model
{
    protected $fillable = ['name','slug', 'image_url','description','price','collection_id','category_id'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });

        static::updating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

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
