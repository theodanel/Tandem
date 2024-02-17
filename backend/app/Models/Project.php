<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * Pour associer un créateur au projet via son ID (unique)
     */
    public function creator()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Pour associer des collaborateurs au projet via leur ID (multiples)
     */
    public function collaborator()
    {
        return $this->belongsToMany(User::class, 'users_projects');
    }

    /**
     * Pour ajouter un langage à un projet via son ID (multiples)
     */
    public function language()
    {
        return $this->belongsToMany(Language::class, 'projects_languages');
    }

    /**
     * Pour ajouter un projet favori à un utilisateur via son ID (multiples)
     */
    public function favorite()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

}
