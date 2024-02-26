<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    /**
     * Association de l'expediteur de la notification (unique)
     */
    public function sender()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Association du destinataire de la notification (unique)
     */
    public function receiver()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Association du projet concerné par la notification (facultatif, unique)
     */
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
