<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class WebsiteType extends Model
{
    use sluggable;

    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        "name", "slug", "image", "content"
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
