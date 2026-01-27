<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Categories extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
    ];

    public function Products()
    {
        return $this->hasMany(Products::class,'category_id');
    }
}
