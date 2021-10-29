<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    use Sluggable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', "user_id"
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

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function blogPosts()
    {
        return $this->hasMany(BlogPost::class);
    }
}
