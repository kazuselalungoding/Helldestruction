<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    protected $fillable = [
        'order_id',
        'xendit_id',
        'payment_method',
        'checkout_url',
        'status',
        'paid_at'
        ];

    public function order(){
        return $this->belongsTo(Orders::class, 'order_id');
    }
}
