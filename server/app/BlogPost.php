<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use Sluggable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', "blog_category_id", "user_id", "summery", "contents", "image"
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
     * Get the user associated with the blog
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category associated with the blog
     */

    public function blogCategory()
    {
        return $this->belongsTo(BlogCategory::class);
    }

    /**
     * Get the comments associated with the blog
     */

    public function blogComments()
    {
        return $this->hasMany(BlogComment::class)->with("user");
    }
}
