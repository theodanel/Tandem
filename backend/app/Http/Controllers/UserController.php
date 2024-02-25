<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    //Affiche les utilisateurs
    function index(){
        $users = User::all();
        return response()->json([
            'users'=> $users,
            "status"=> 200,
        ]) ;
    }

    /**
     * Affiche un utilisateur
     */
    function show($id){
        $user = User::findOrFail($id);
        $user->languagesList = $user->languages()->get();
        $user->avatar = $user->avatar()->first()->url;
        return response()->json([
            'user'=> $user,
            "status"=> 200,
        ]) ;
    }

    /**
     * Modifie un utilisateur
     */
    public function update(Request $request, $id){
        if (auth()->user()->id == $id){
            $validator = Validator::make($request->all(),[
                'name' => "required|max:54|min:3|unique:users,name,".$id,
                'description' => "max:500",
                'discord' => "max:54",
                "github" => "max:54",
            ]);
            if($validator->fails()){
                return response()->json([
                    'status' => "error",
                    'errors' => $validator->messages(),
                    "message" => "Erreur du formulaire."
                ]);
            } else{
                $user = User::findOrFail($id);
                $user->name = $request->input("name");
                $user->description = $request->input("description");
                $user->github = $request->input("github");
                $user->discord = $request->input("discord");
                $user->languages()->sync($request->input("languages"));
                $user->save();
                
                return response()->json([
                    'status' => 200,
                    "message" => "L'utilisateur a été modifié."
                ]);
            }
        } else {
            return response()->json([
                "status" => "error",
                "message" => "Action impossible"
            ]);
        }
    }

    /**
     * Met à jour l'avatar d'un utilisateur
     */
    public function updateAvatar(Request $request, $id){
        if (auth()->user()->id == $id){

            $user = User::findOrFail($id);
            $user->avatar_id = $request->all()["avatar"];
            $user->save();
        } else {
            return response()->json([
                "status" => "error",
                "message" => "Action impossible"
            ]);
        }
    }

    /**
     * Supprime un utilisateur
     */
    public function delete($id){
        if (auth()->user()->id == $id){
            User::destroy($id);
            return response()->json([
                'status' => 200,
                "message" => "L'utilisateur a été supprimé."
            ]);
        }
    }
}
