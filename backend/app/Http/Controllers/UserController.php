<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    function index(){
        $users = User::all();
        return response()->json([
            'users'=> $users,
            "status"=> 200,
        ]) ;
    }

    function show($id){
        $user = User::findOrFail($id);
        return response()->json([
            'user'=> $user,
            "status"=> 200,
        ]) ;
    }

    public function showAuth(){
        return response()->json([
            'user' => Auth::user()
        ]);
    }


    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'pseudo' => "required|unique:users,pseudo|max:54",
            "email" => "required|email|unique:users,email",
            "password" => "required"
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur du formulaire."
            ]);
        } else{
            $user = new User;
            $user->pseudo = $request->input('pseudo');
            $user->email = $request->input('email');
            $user->password = $request->input("password");
            $user->email_verified_at = now();

            $user->save();

            return response()->json([
                'status' => 200,
                "message" => "L'utilisateur a été ajouté."
            ]);
        }
    }

    

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'newPseudo' => "required|unique:users,pseudo|max:54",
        ]);
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur du formulaire."
            ]);
        } else{
            $user = User::findOrFail($id);
            $user->pseudo = $request->input("newPseudo");
            $user->save();

            return response()->json([
                'status' => 200,
                "message" => "L'utilisateur a été ajouté."
            ]);
        }
    }

    public function delete($id){
        User::destroy($id);
        return response()->json([
            'status' => 200,
            "message" => "L'utilisateur a été supprimé."
        ]);

    }
}
