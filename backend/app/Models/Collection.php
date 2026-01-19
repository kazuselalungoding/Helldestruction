<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Collection extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'collection';

    protected $fillable = [
        'name',
        'image_url',
    ];
}
