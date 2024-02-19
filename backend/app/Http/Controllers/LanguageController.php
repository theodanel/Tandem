<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LanguageController extends Controller
{
    function index() {
        $languages = Language::all();
        return response()->json([
            'languages' => $languages,
            "status" => 200,
        ]);
    }


    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => "required|unique:languages,name|max:50",
            'category' => "required|min:2|max:20",
            
        ]);
        

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur dans le formulaire"
            ]);
        } else{
            $language = new Language();
            $language->name = $request->input('name');
            $language->category = $request->input('category');;
    
            $language->save();

            return response()-> json([
                'status' => 200,
                "message" => "Le projet a été ajouté."
            ]);
        }
    }
 
}
