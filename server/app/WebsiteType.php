<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;

class WebsiteType extends Model
{
    use sluggable, SoftDeletes;

    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = [
        "name", "slug", "image", "contents"
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

    /**
     * Get sections of the website type.
     */
    public function sections()
    {
        return $this->hasMany(Section::class);
    }

    /**
     * Get the websites associated with website type.
     */
    public function websites()
    {
        return $this->hasMany(Website::class);
    }
}
