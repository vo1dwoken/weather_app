import React, { useState } from 'react';

import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import Header from '../Components/Header';
import '../../css/NowWeather.css';

const NowWeather = ({ weather, error }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            Inertia.get('/weather/now', { city });
        }
    };

    return (
        <div className="weather-container">
            <Header />
            <div className="content">
                <h1>Current Weather</h1>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        className="input"
                    />
                    <button type="submit" className="button">
                        Get Weather
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
                {weather ? (
                    <div className="weather-info">
                        <h2>Weather in {weather.name}, {weather.sys.country}</h2>
                        <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                        <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                    </div>
                ) : (
                    !error && <p>Enter a city to see the current weather.</p>
                )}
            </div>
        </div>
    );
};

export default NowWeather;
