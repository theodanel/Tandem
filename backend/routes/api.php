<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use PharIo\Manifest\AuthorElement;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Projets
Route::get('/projects/{id?}', [ProjectController::class, "index"]);
Route::get('/project/{id}', [ProjectController::class, "show"]);

// Utilisateurs
Route::get('/users', [UserController::class, "index"]);
Route::get('/user/{id}', [UserController::class, "show"]);

// Langages
Route::get('/languages', [LanguageController::class, "index"]);
Route::get('/languages/project/{id}', [LanguageController::class, "projectLanguages"]);
Route::get('/languages/user/{id}', [LanguageController::class, "userLanguages"]);

// Avatars
Route::get('/avatars', [AvatarController::class, "index"]);

// Commentaires
Route::get('/comments/{id}', [CommentController::class, 'show']);

//Authentification
Route::post('/login', [AuthController::class, "login"]);
Route::post('/register', [AuthController::class, "register"]);

// Routes protégées par authentification
Route::middleware('auth:sanctum')->group(function () {

    // Gestion de l'utilisateur
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/{id}/update', [UserController::class, "update"]);
    Route::delete('/user/{id}/delete', [UserController::class, "delete"]);
    Route::post('/logout/{id}', [AuthController::class, 'logout']);
    Route::put('/user/{id}/update/avatar', [UserController::class, "updateAvatar"]);
    
    // Gestion des projets
    Route::post('/project/store', [ProjectController::class, "store"]);
    Route::put('/project/{id}/update', [ProjectController::class, "update"]);
    Route::delete('/project/{id}/delete', [ProjectController::class, "delete"]);
    Route::put('/project/{id}/step', [ProjectController::class, "nextStep"]);
    Route::put('/project/{id}/favorite', [ProjectController::class, "favorite"]);
    Route::get('/projects/favorites/{id}', [ProjectController::class, "showFavorites"]);
    Route::put('/project/{id}/like', [ProjectController::class, "like"]);
    Route::post('/project/{id}/close', [ProjectController::class, "close"]);
    Route::put('/project/{id}/join', [ProjectController::class, "join"]);

    //Gestion des commentaires
    Route::put('/comment/{id}/update', [CommentController::class, "update"]);
    Route::delete('/comment/{id}/delete', [CommentController::class, "delete"]);
    Route::post('/comment/{id}/store', [CommentController::class, "store"]);

    //Gestion des notifications
    Route::get('/notifications/{id}/sent', [NotificationController::class, "showSent"]);
    Route::get('/notifications/{id}/received', [NotificationController::class, "showReceived"]);
    Route::post('/notification/send', [NotificationController::class, "send"]);
    Route::delete('/notification/{id}/delete', [NotificationController::class, "delete"]);
});
