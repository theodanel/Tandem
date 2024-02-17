<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    /**
     * Pour ajouter une notification à son expediteur via son ID (multiples)
     */
    public function sender()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Pour ajouter une notification à son destinataire via son ID (multiples)
     */
    public function receiver()
    {
        return $this->belongsTo(User::class);
    }
}
