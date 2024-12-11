<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;

use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\HasMedia;
//use App\Models\Permission;

//for email verification
// use Illuminate\Auth\Events\Registered;

class User extends Authenticatable implements HasMedia
{
    // , MustVerifyEmail
    use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];

    // public function setPasswordAttribute($value)
    // {
    //     $this->attributes['password'] = bcrypt($value);
    // }

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('avatars')
            ->singleFile();
    }


    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
    //,'user_id','permission_id'
    // //
    //for email verification
    // public function verifyUserEmail($value)
    // {
    //     event(new Registered($value));
    // }
}
