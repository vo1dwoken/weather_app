<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WeatherController;

// Home route
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Weather routes
Route::prefix('weather')->group(function () {
    Route::get('/now', [WeatherController::class, 'now'])->name('weather.now');
    Route::get('/forecast', [WeatherController::class, 'forecast'])->name('weather.forecast');
});

// Route::get('/weather/now', [WeatherController::class, 'now'])->name('weather.now');
// Route::get('/weather/forecast', [WeatherController::class, 'forecast'])->name('weather.forecast');


// Breeze routes
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
