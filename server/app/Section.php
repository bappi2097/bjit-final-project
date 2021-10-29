<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Section extends Model
{
    use SoftDeletes;
    /**
     * The attributes that should be fillable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'component_name',
        "website_type_id",
        'setting',
        'contents',
        'design',
        'is_navbar'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        "setting" => 'array',
        "contents" => 'array',
        "design" => 'array'
    ];


    /**
     * Get the websites associated with navbar.
     */
    public function navbarWebsites()
    {
        return $this->hasMany(Website::class, 'navbar_id');
    }

    /**
     * Get the section type wi the section.
     */
    public function websiteType()
    {
        return $this->belongsTo(WebsiteType::class);
    }

    /**
     * Get the pages of the section.
     */
    public function pages()
    {
        return $this->belongsToMany(Page::class)->using(PageSection::class)->withPivot('contents', 'design');
    }
}
