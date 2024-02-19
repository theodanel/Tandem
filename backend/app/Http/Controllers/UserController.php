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
                'newPseudo' => "required|max:54|unique:users,pseudo,".$id,
            ]);
            if($validator->fails()){
                return response()->json([
                    'status' => "error",
                    'errors' => $validator->messages(),
                    "message" => "Erreur du formulaire."
                ]);
            } else{
                $user = User::findOrFail($id);
                $user->pseudo = $request->input("newPseudo");
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
