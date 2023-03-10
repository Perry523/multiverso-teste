<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\CitiesController;
use App\Http\Controllers\StoresController;
use App\Http\Controllers\ProductsController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [UsersController::class, 'login']);
Route::post('/logout', [UsersController::class, 'logout']);
Route::post('/register', [UsersController::class, 'register']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::resource('/cities', CitiesController::class);
    Route::resource('/stores', StoresController::class);
    Route::resource('/products', ProductsController::class);
    Route::post('/products-link', [StoresController::class, 'linkProductToStore']);
    Route::get('/products-by-store', [StoresController::class, 'productsByStore']);
});
