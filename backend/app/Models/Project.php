<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function creator()
    {
        return $this->belongsTo(User::class);
    }

    public function user()
    {
        return $this->belongsToMany(User::class, 'users_projects');
    }
}
