<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = ['user_id', 'address_id','external_id', 'status', 'total_price'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function address(){
        return $this->belongsTo(Addresses::class, 'address_id');
    }

    public function orderItems(){
        return $this->hasMany(OrderItems::class,'order_id');
    }

    public function payment(){
        return $this->hasOne(Payments::class, 'order_id');
    }
}
