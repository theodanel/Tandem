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
            'users' => $users,
            "status" => 200,
        ]);
    }


    /**
     * Affiche un utilisateur
     */
    function show($id){
        $user = User::findOrFail($id);
        $user->languagesList = $user->languages()->get();
        $user->avatar = $user->avatar()->first()->url;
        return response()->json([
            'user' => $user,
            "status" => 200,
        ]);
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


    public function toggleContact($id)
    {
        $user1 = User::find(auth()->user()->id);
        $user2 = User::find($id);
        if (!$user2) {
            return response()->json(['message' => 'Utilisateur pas trouvé']);
        } else {
            $user1->contacts()->toggle($user2);
            $user2->contacts()->toggle($user1);

            return response()->json(['message' => 'Relation mise à jour']);
        }
    }

    public function showContacts($id){
        $user = User::find($id);
        $contacts = $user->contacts()->get();
        foreach($contacts as $contact){
            $avatar = $contact->avatar()->first()->url;
            $contact->avatar = $avatar;
        }
        return response()->json(['contacts' => $contacts]);
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
