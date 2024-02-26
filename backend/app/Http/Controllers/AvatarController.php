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
        $avatars = Avatar::all()->sortBy("url");
        return response()->json([
            'avatars' => $avatars,
            "status" => 200,
        ]);
    } 

}
