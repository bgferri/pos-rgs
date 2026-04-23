<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudioProfile extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'instagram',
        'footer_message',
    ];
}
