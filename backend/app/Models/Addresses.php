<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Addresses extends Model
{
    protected $fillable = ['street', 'city', 'state', 'zip_code', 'country'];
}
