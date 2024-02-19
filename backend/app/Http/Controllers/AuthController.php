<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Récupère les données de l'utilisateur connecté
     */
    public function user(Request $request)
    {
        return $request->user();
    }

    /**
     * Connecte un utilisateur enregistré
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $validator =  Validator::make($credentials, [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
 
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur du formulaire",
                'status' => "error"
            ]);
        } else if (auth()->attempt($credentials)) { // test la connection avec les données de la requêtes
            // $request->session()->regenerate();
            // connecte l'utilisateur
            $user = auth()->user();

            // le if sert juste à éviter un bug d'affichage de VSCode pour le $user->createToken()
            if ($user instanceof \App\Models\User) {
                // créé un token de connexion pour l'utilisateur connecté
                $token = $user->createToken('Tandem')->plainTextToken;

                // retourne le token et l'utilisateur + créé un cookie avec le token (jwt = json web token)
                return response()->json([
                    'token' => $token,
                    'user' => $user,
                    'message' => "Bienvenue, $user->name !",
                    'status' => 'success'
                ])->cookie('jwt', $token);
            }
        } else {
            return response()->json([
                'message' => 'Identifiants incorrects',
                'status' => 'error'
            ]);
        }
    }

    /**
     * Enregistre un nouvel utilisteur.
     */
    public function register(Request $request)
    {
        $credentials = $request->newUser;
        $validator =  Validator::make($credentials,[
            'name' => 'required|unique:users,name',
            'email' => 'email|required|unique:users,email',
            'password' => 'required|confirmed'
        ]);

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur du formulaire",
                'status' => "error"
            ]);
        } else {
            $user = User::create([
                'name' => $credentials['name'],
                'email' => $credentials['email'],
                'password' => bcrypt($credentials['password'])
            ]);

            // $request->session()->regenerate();
            // connecte l'utilisateur
            auth()->login($user);

            // le if sert juste à éviter un bug d'affichage de VSCode pour le $user->createToken()
            if ($user instanceof \App\Models\User) {
                // créé un token de connexion pour l'utilisateur connecté
                $token = $user->createToken('Tandem')->plainTextToken;

                return response()->json([
                    'token' => $token,
                    'user' => $user,
                    'status' => "success",
                    'message' => "Bienvenue, $user->name !"
                ], 201)->cookie('jwt', $token);
            }
            
        }
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();


        return response()->json([
            'message' => "Deconnexion réussie",
            'status' => 'success'
        ])->cookie('jwt', '');
    }
}
