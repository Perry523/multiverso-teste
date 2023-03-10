<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::group(['middleware' => ['web']], function () {

    Route::inertia('/login', 'login')->name('login');
});
Route::middleware('auth')->group(function () {
    Route::inertia('/', 'index');
    Route::inertia('/loja/{id}', 'loja');
});
