<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasFactory;

       /**
     * Pour ajouter un langage à un utilisateur via son ID (multiples)
     */
    public function user()
    {
        return $this->belongsToMany(Language::class, 'users_languages');
    }

       /**
     * Pour ajouter un langage à un projet via son ID (multiples)
     */
    public function project()
    {
        return $this->belongsToMany(Language::class, 'projects_languages');
    }
}
