<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Pour ajouter une collaboration à un projet via son ID (multiples)
     */
    public function project()
    {
        return $this->belongsToMany(Project::class, 'users_projects');
    }

    /**
     * Pour ajouter un langage à l'utilisateur via son ID (multiples)
     */
    public function language()
    {
        return $this->belongsToMany(Language::class, 'users_languages');
    }

    /**
     * Pour ajouter un projet favori à un utilisateur via son ID (multiples)
     */
    public function favorite()
    {
        return $this->belongsToMany(Project::class, 'favorites');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
