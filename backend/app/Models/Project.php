<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * Association du créateur du projet (unique)
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Association des collaborateurs du projet (multiples)
     */
    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'users_projects');
    }

    /**
     * Association des langages utilsés dans le projet (multiples)
     */
    public function languages()
    {
        return $this->belongsToMany(Language::class, 'projects_languages');
    }

    /**
     * Association des utilisateurs qui ont mis le projet en favori (multiples)
     */
    public function favorites()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    /**
     * Association des utilisateurs qui ont liké le projet (multiples)
     */
    public function likes()
    {
        return $this->belongsToMany(User::class, 'likes');
    }

    /**
     * Association des commentaires du projet (multiples)
     */
    public function comments()
    {
        return $this->hasMany((Comment::class));
    }


}
