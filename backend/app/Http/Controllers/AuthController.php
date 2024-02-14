<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('Tandem')->plainTextToken;

            return response()->json(['token' => $token, 'user' => $user], 200)->cookie('jwt', $token);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }

    /**
     * Enregistre un nouvel utilisteur.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'email|required|unique:users,email',
            'password' => 'required|confirmed'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('Tandem')->plainTextToken;

        return response()->json(['token' => $token], 201)->cookie('jwt', $token);
    }
}
