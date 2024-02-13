<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('/user/{id}', [UserController::class, "show"]);
Route::put('/user/{id}/update', [UserController::class, "update"]);
Route::delete('/user/{id}/delete', [UserController::class, "delete"]);
Route::post('/users/store', [UserController::class, "store"]);

//-------------





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
