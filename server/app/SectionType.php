<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;

class SectionType extends Model
{
    use Sluggable, SoftDeletes;
    /**
     * The attributes that should be fillable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
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
     * Get sections of the section type.
     */
    public function sections()
    {
        return $this->hasMany(Section::class);
    }
}
