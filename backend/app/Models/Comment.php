<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    /**
     * Pour associer un commentaire au projet via son ID (unique)
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Pour associer un commentaire à un utilisateur via son ID (unique)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
