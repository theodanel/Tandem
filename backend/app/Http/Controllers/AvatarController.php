<?php

namespace App\Http\Controllers;

use App\Models\Avatar;
use Illuminate\Http\Request;

class AvatarController extends Controller
{
    /**
     * Affichage de tous les avatars de la table
     */
    function index() {
        $avatars = Avatar::all();
        return response()->json([
            'languages' => $avatars,
            "status" => 200,
        ]);
    } 

}
