<?php

namespace App\Models;

use App\Traits\HasFilamentFileCleanup;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Collection extends Model
{
    use HasFactory, Notifiable, HasFilamentFileCleanup;

    protected $table = 'collection';

    protected $fillable = [
        'name',
        'image_url',
    ];
}
