<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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


Route::get('/projects', [ProjectController::class, "index"]);
Route::get('/project/{id}', [ProjectController::class, "show"]);
Route::put('/project/{id}/update', [ProjectController::class, "update"]);
Route::delete('/project/{id]/delete', [ProjectController::class, "delete"]);
Route::post('/project/{id}/store', [ProjectController::class, "store"]);

// Route::get('/users', [UserController::class, "index"]);
// Route::get('/user/{id}', [UserController::class, "show"]);





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
