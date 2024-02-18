<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    /**
     * Pour associer une notification à son expediteur via son ID (unique)
     */
    public function sender()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Pour associer une notification à son destinataire via son ID (unique)
     */
    public function receiver()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Pour associer une notification à son destinataire via son ID (unique)
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
