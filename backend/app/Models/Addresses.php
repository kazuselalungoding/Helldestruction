<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Addresses extends Model
{
    protected $fillable = ['user_id', 'recipient_name', 'street', 'city', 'province', 'postal_code', 'country', 'phone'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
