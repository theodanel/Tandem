<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LanguageController;
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

// API Project

Route::get('/projects', [ProjectController::class, "index"]);
Route::get('/project/{id}', [ProjectController::class, "show"]);

//----------
// API User

Route::get('/users', [UserController::class, "index"]);
Route::get('/user/{id}', [UserController::class, "show"]);
//Route::post('/users/store', [UserController::class, "store"]);

//-------------

Route::get('/projects_languages', [ProjectController::class, "index"]);
Route::get('/project_languages/{id}', [ProjectController::class, "show"]);
Route::put('/project_languages/{id}/update', [ProjectController::class, "update"]);
Route::delete('/project_languages/{id}/delete', [ProjectController::class, "delete"]);
Route::post('/projects_languages/store', [ProjectController::class, "store"]);


Route::post('/login', [AuthController::class, "login"]);
Route::post('/register', [AuthController::class, "register"]);

Route::get('/languages', [LanguageController::class, "index"]);

// Routes protégées par authentification
Route::middleware('auth:sanctum')->group(function () {
    
    // Gestion de l'utilisateur
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/{id}/update', [UserController::class, "update"]);
    Route::delete('/user/{id}/delete', [UserController::class, "delete"]);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Gestion des projets
    Route::post('/project/store', [ProjectController::class, "store"]);
    Route::put('/project/{id}/update', [ProjectController::class, "update"]);    
    Route::delete('/project/{id}/delete', [ProjectController::class, "delete"]);

});
