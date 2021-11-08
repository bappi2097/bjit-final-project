<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail, JWTSubject
{
    use Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'image'
    ];

    /**
     * The attributes that are also show.
     *
     * @var array
     */
    protected $appends = ['full_name'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function markVerified()
    {
        $this->markEmailAsVerified();
    }

    /**
     * Get the website associated with the user
     */

    public function website()
    {
        return $this->hasOne(Website::class);
    }

    /**
     * Get the website exists or not
     * 
     */

    public function hasWebsite()
    {
        return $this->website()->exists();
    }

    /**
     * Get the categories associated with the user
     */

    public function blogCategories()
    {
        return $this->hasMany(BlogCategory::class)->with(["blogPosts"]);
    }

    /**
     * Get the posts associated with the user
     */

    public function blogPosts()
    {
        return $this->hasMany(BlogPost::class)->with(["blogComments"]);
    }

    /**
     * Get the comments associated with the user
     */

    public function blogComments()
    {
        return $this->hasMany(BlogComment::class);
    }
}
