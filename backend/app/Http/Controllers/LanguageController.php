<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LanguageController extends Controller
{
    /**
     * Affichage de tous les langages de la table
     */
    function index() {
        $languages = Language::all();
        return response()->json([
            'languages' => $languages,
            "status" => 200,
        ]);
    } 

    /**
     * Affichage des langages d'un projet
     */
    function projectLanguages($id) {
        $languages = Project::find($id)->language()->get();
        return response()->json([
            'languages' => $languages,
            "status" => 200,
        ]);
    }

    /**
     * Affichage des langages d'un utilisateur
     */
    function userLanguages($id) {
        $languages = User::find($id)->language()->get();
        return response()->json([
            'languages' => $languages,
            "status" => 200,
        ]);
    }
}
