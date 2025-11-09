<?php


use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\CategoryController;

Route::get('/expenses/trends', [ExpenseController::class, 'trends']);
Route::get('/expenses/top-categories', [ExpenseController::class, 'topCategories']);
Route::get('/expenses/breakdown', [ExpenseController::class, 'overallExpenses']);
Route::apiResource('expenses', ExpenseController::class);
Route::apiResource('categories', CategoryController::class);
