<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TasksController;

Route::get('/', [TasksController::class, 'create'])->name('tasks.create');

Route::post('/store', [TasksController::class, 'store'])->name('tasks.store');

Route::delete('/store/{id}', [TasksController::class, 'destroy'])->name('tasks.delete');
