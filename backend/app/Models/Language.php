<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

    /**
     * Association des utilisateurs qui ont ce langage (multiples)
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'users_languages');
    }

    /**
     * Association des projets qui ont ce langage (multiples)
     */
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'projects_languages');
    }
}
