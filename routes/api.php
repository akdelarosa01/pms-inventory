<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group( function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/items', ItemController::class);
    // Route::post('/save-item', [ItemController::class,'save_item']);
    Route::post('/logout', [AuthController::class,'logout']);
});



Route::post('/login', [AuthController::class,'login']);

