<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    /**
     * Récupère les données de l'utilisateur connecté
     *  
     * @return object Données de l'utilisateur connecté
     */
    public function user()
    {
        return auth()->user();
    }

    /**
     * Connecte un utilisateur enregistré
     * 
     * @param object $request Identifiants de l'utilisateur 
     * @return response Réponse au format json
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $validator =  Validator::make($credentials, [
            'email' => 'required|exists:users,email|email',
            'password' => 'required',
        ]);
 
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur du formulaire",
                'status' => "error"
            ]);
        } else if (auth()->attempt($credentials)) { // test la connection avec les données de la requêtes

            // connecte l'utilisateur
            $user = auth()->user();

            // le if sert juste à éviter un bug d'affichage de VSCode pour le $user->createToken()
            if ($user instanceof \App\Models\User) {
                // créé un token de connexion pour l'utilisateur connecté
                $token = $user->createToken('Tandem', [$user->id])->plainTextToken;

                // retourne le token et l'utilisateur + créé un cookie avec le token (jwt = json web token)
                return response()->json([
                    'token' => $token,
                    'user' => $user,
                    'message' => "Bienvenue, $user->name !",
                    'status' => 200
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
     * Enregistre un nouvel utilisteur
     */
    public function register(Request $request)
    {
        $credentials = $request->newUser;
        $validator =  Validator::make($credentials,[
            'name' => 'required|unique:users,name|min:3|max:50',
            'email' => 'email|required|unique:users,email',
            'password' => ['required','confirmed', Password::min(8)->mixedCase()
            ->numbers()
            ->symbols()
            ->uncompromised()]
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

            // connecte l'utilisateur
            auth()->login($user);

            // le if sert juste à éviter un bug d'affichage de VSCode pour le $user->createToken()
            if ($user instanceof \App\Models\User) {
                // créé un token de connexion pour l'utilisateur connecté
                $token = $user->createToken('Tandem', [$user->id])->plainTextToken;

                return response()->json([
                    'token' => $token,
                    'user' => $user,
                    'status' => 200,
                    'message' => "Bienvenue, $user->name !"
                ], 201)->cookie('jwt', $token);
            }
            
        }
    }

    /**
     * Déconnecte un utilisateur connecté
     */
    public function logout($id)
    {
        if($id == auth()->user()->id){
            return response()->json([
                'message' => "Deconnexion réussie",
                'status' => 200
            ])->cookie('jwt', '');
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Deconnexion impossible',
            ]);
        }
    }
}
