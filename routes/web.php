<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\WeatherController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Home route
Route::get('/', function () {
    return Inertia::render('Home');
});

// Weather routes
Route::get('/weather/now', [WeatherController::class, 'now'])->name('weather.now');
Route::get('/weather/forecast', [WeatherController::class, 'forecast'])->name('weather.forecast');


Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
