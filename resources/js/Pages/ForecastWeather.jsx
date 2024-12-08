import React, { useState } from 'react';

import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import Header from '../Components/Header';
import ForecastCard from '../Components/ForecastCard';
import '../../css/ForecastWeather.css';

const ForecastWeather = ({ forecast, error }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            Inertia.get('/weather/forecast', { city });
        }
    };

    const groupByDay = (list) => {
        const days = {};
        list.forEach((entry) => {
            const date = entry.dt_txt.split(' ')[0];
            if (!days[date]) {
                days[date] = [];
            }
            days[date].push(entry);
        });
        return Object.entries(days);
    };

    const dailyForecasts = forecast ? groupByDay(forecast.list) : [];

    return (
        <div className="forecast-container">
            <Header />
            <div className="content">
                <h1>5-Day / 3-Hour Weather Forecast</h1>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        className="input"
                    />
                    <button type="submit" className="button">
                        Get Forecast
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
                {forecast && forecast.list ? (
                    <div className="forecast-cards">
                        {dailyForecasts.map(([date, entries], index) => (
                            <div key={index} className="forecast-day">
                                <div className="forecast-date">{date}</div>
                                <div className="forecast-cards-grid">
                                    {entries.map((entry, i) => (
                                        <ForecastCard
                                            key={i}
                                            time={entry.dt_txt.split(' ')[1]}
                                            icon={entry.weather[0].icon}
                                            temp={entry.main.temp}
                                            description={entry.weather[0].description}
                                            wind={entry.wind.speed}
                                            rain={entry.rain?.['3h']}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !error && <p>Enter a city to get the weather forecast.</p>
                )}
            </div>
        </div>
    );
};

export default ForecastWeather;
