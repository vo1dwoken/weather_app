import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import '../../css/Home.css';
import Header from '../Components/Header';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the Weather App</h1>
            <p>Your one-stop solution for weather updates.</p>
            <nav>
                <InertiaLink href={route('weather.now')} className="nav-link">Current Weather</InertiaLink> |{' '}
                <InertiaLink href={route('weather.forecast')} className="nav-link">5-Day Forecast</InertiaLink>
            </nav>
        </div>
    );
};

export default Home;
