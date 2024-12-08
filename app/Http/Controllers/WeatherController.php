<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function now(Request $request)
    {
        if ($request->city) {
            $apiKey = env('OPENWEATHER_API_KEY');
            $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
                'q' => $request->city,
                'appid' => $apiKey,
                'units' => 'metric',
            ]);

            return Inertia::render('NowWeather', [
                'weather' => $response->json(),
            ]);
        }

        return Inertia::render('NowWeather', ['weather' => null]);
    }

public function forecast(Request $request)
    {
        $apiKey = env('OPENWEATHER_API_KEY');
        $city = $request->input('city');

        if (!$city) {
            // Render the page without fetching weather if no city is entered
            return Inertia::render('ForecastWeather', [
                'forecast' => null,
                'error' => null, // No error message until city is provided
            ]);
        }

        // Call OpenWeather's 5-day/3-hour forecast API
        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'q' => $city,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);

        // Handle API response
        if ($response->successful() && $response->json('cod') === '200') {
            return Inertia::render('ForecastWeather', [
                'forecast' => $response->json(),
                'city' => $city,
                'error' => null, // No error if request is successful
            ]);
        }

        // Handle invalid city or API errors
        return Inertia::render('ForecastWeather', [
            'forecast' => null,
            'error' => 'City not found or API request failed. Please try again.',
        ]);
    }
}
