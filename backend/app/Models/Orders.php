<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = ['user_id', 'address_id','external_id', 'status', 'total_price'];
}
