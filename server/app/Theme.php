<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Theme extends Model
{
    use SoftDeletes;

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

    /**
     * Get the websites associated with theme.
     */
    public function websites()
    {
        return $this->hasMany(Website::class);
    }
}
