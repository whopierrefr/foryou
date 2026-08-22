<?php

use App\Http\Controllers\WishController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::prefix('api')->group(function () {
    Route::get('/wishes', [WishController::class, 'index']);
    Route::post('/wishes', [WishController::class, 'store']);
    Route::post('/wishes/{id}/like', [WishController::class, 'like']);
});
