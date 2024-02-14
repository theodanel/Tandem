<?php

use App\Http\Controllers\AuthController;
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
Route::put('/project/{id}/update', [ProjectController::class, "update"]);
Route::delete('/project/{id}/delete', [ProjectController::class, "delete"]);
Route::post('/project/store', [ProjectController::class, "store"]);

//----------
// API User

Route::get('/users', [UserController::class, "index"]);
// Route::get('/user/auth', [UserController::class, "showAuth"]);
Route::get('/user/{id}', [UserController::class, "show"]);
Route::put('/user/{id}/update', [UserController::class, "update"]);
Route::delete('/user/{id}/delete', [UserController::class, "delete"]);
Route::post('/users/store', [UserController::class, "store"]);

//-------------

// Route::get('/users', [UserController::class, "index"]);
// Route::get('/user/{id}', [UserController::class, "show"]);



//Route::get('/authUser', [AuthController::class, "getUser"]);
Route::post('/login', [AuthController::class, "login"]);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
// })get('/user', function (Request $request) {
//     return $request->user();
});
