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
     * Association des projets auxquels l'utilisateur participe (multiples)
     */
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'users_projects');
    }

    /**
     * Association des projets créés par l'utilisateur (multiples)
     */
    public function projects_created()
    {
        return $this->belongsToMany(Project::class, 'projects', 'user_id');
    }

    /**
     * Association des langages de l'utilisateur (multiples)
     */
    public function languages()
    {
        return $this->belongsToMany(Language::class, 'users_languages');
    }

    /**
     * Association des projets mis en favoris par l'utilisateur (multiples)
     */
    public function favorites()
    {
        return $this->belongsToMany(Project::class, 'favorites');
    }

    /**
     * Association des commentaires laissés par l'utilisateur (multiples)
     */
    public function comments()
    {
        return $this->belongsToMany(Comment::class);
    }

    /**
     * Association des notifications envoyées par l'utilisateur (multiples)
     */
    public function notifications_sent()
    {
        return $this->belongsToMany(Notification::class, 'notifications', 'sender_id');
    }

    /**
     * Association des notifications reçues par l'utilisateur (multiples)
     */
    public function notifications_received()
    {
        return $this->belongsToMany(Notification::class, 'notifications', 'receiver_id');
    }

    /**
     * Association de l'avatar de l'utilisateur (unique)
     */
    public function avatar()
    {
        return $this->belongsTo(Avatar::class);
    }

    /**
     * Association des projets likés par l'utilisateur (multiples)
     */
    public function likes()
    {
        return $this->belongsToMany(Project::class, 'likes');
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
