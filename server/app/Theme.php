<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    /**
     * The attributes that should be fillable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'design'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        "design" => 'array'
    ];
}
