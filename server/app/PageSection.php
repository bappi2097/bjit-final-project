<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class PageSection extends Pivot
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        "contents" => 'array',
        "design" => 'array'
    ];
}
