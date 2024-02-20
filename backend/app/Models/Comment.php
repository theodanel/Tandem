<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    /**
     * Association du projet sur lequel le commentaire été rédigé (unique)
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    /**
     * Association de l'utilisateur qui a écrit le commentaire (unique)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Association du commentaire auquel celui-ci répond (facultatif, unique)
     */
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
}
