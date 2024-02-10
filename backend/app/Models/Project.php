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
    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'users_projects');
    }
}
