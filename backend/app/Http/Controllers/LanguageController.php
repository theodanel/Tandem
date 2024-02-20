<?php

namespace App\Http\Controllers;

use App\Models\Language;
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
}
