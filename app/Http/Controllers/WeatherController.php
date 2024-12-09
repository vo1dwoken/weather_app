<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    // stała z linkiem
    private const BASE_URL = "https://api.openweathermap.org/data/2.5/";

    // ta metoda zajmueję się wykonywaniem żądań do API OpenWeather
    private function fetchWeatherData(string $endpoint, array $params) // $endpoint: weather lub forecast, $params: q-nazwa miasta
    {
        $apiKey = env('OPENWEATHER_API_KEY'); // pobieranie klucza API z pliku .env
        $params['appid'] = $apiKey; // dodajemy nasz klucz do URL
        $params['units'] = 'metric'; // jednostki metryczne

        // zwracamy odpowieź
        return Http::get(self::BASE_URL . $endpoint, $params);
    }

    // metoda do pobierania aktualnej pogody
    public function now(Request $request)
    {
        $city = $request->input('city');

        if (!$city) {
            return Inertia::render('NowWeather', ['weather' => null]);
        }

        $response = $this->fetchWeatherData('weather', ['q' => $city]);

        if ($response->successful()) {
            return Inertia::render('NowWeather', ['weather' => $response->json(), 'error' => null]);
        }

        // używając Inertia renderujemy view NowWeather który jest napisany w Reacie
        return Inertia::render('NowWeather', [
            'weather' => null,
            'error' => 'City not found or API request failed. Please try again.',
        ]);
    }

    // metoda do pobierania prognozy pogody na 5 dni z podziałem na interwały 3-godzinne
    public function forecast(Request $request)
    {
        $city = $request->input('city');

        if (!$city) {
            return Inertia::render('ForecastWeather', [
                'forecast' => null,
            ]);
        }

        $response = $this->fetchWeatherData('forecast', ['q' => $city]);

        if ($response->successful() && $response->json('cod') === '200') {
            return Inertia::render('ForecastWeather', [
                'forecast' => $response->json(),
                'city' => $city,
                'error' => null,
            ]);
        }

        return Inertia::render('ForecastWeather', [
            'forecast' => null,
            'error' => 'City not found or API request failed. Please try again.',
        ]);
    }
}
