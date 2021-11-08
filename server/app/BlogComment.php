<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogComment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'comment', "blog_post_id", "user_id"
    ];

    /**
     * Get the user associated with the comment
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the blogs associated with the comment
     */


    public function blogPost()
    {
        return $this->belongsTo(BlogPost::class);
    }
}
