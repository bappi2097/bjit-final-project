<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Website extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "name",
        "slug",
        "logo",
        "contents",
        "design",
        "user_id",
        "website_type_id",
        "theme_id",
        "navbar_id"
    ];


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
     * Get the user who owns the website.
     *
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Get the Website Type of the website.
     *
     */
    public function websiteType()
    {
        return $this->belongsTo(WebsiteType::class);
    }

    /**
     * Get the theme of the website.
     *
     */
    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }

    /**
     * Get the navbar of the website.
     *
     */
    public function navbar()
    {
        return $this->belongsTo(Section::class, "navbar_id");
    }
}
