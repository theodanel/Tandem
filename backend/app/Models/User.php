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
     * Pour ajouter un commentaire à un utilisateur via son ID (multiples)
     */
    public function comments()
    {
        return $this->belongsToMany(Comment::class);
    }

    /**
     * Pour ajouter une notification envoyée à un utilisateur via son ID (multiples)
     */
    public function notifications_sent()
    {
        return $this->belongsToMany(Notification::class, 'notifications', 'sender_id');
    }

    /**
     * Pour ajouter une notification reçue à un utilisateur via son ID (multiples)
     */
    public function notifications_received()
    {
        return $this->belongsToMany(Notification::class, 'notifications', 'receiver_id');
    }

    /**
     * Pour ajouter un avatar à l'utilisateur via son ID (unique)
     */
    public function avatar()
    {
        return $this->belongsTo(Avatar::class);
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

    public function contact()
    {
        return $this->belongsToMany(User::class, 'user_contact');
    }
}
