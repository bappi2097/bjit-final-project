<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;

class Page extends Model
{
    use Sluggable, SoftDeletes;
    /**
     * The attributes that should be fillable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'website_id', 'contents', 'design'
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
                'source' => 'title'
            ]
        ];
    }

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        "contents" => 'array',
        "design" => 'array'
    ];

    /**
     * Get the website associated with Page.
     *
     */
    public function website()
    {
        return $this->belongsTo(Website::class);
    }

    /**
     * Get the sections of the pages
     */
    public function sections()
    {
        return $this->belongsToMany(Section::class)->using(PageSection::class);
    }
}
