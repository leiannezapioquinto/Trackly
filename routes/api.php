<?php


use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\CategoryController;

Route::apiResource('expenses', ExpenseController::class);
Route::apiResource('categories', CategoryController::class);
