import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/react';

const Header = () => {
    const { auth, csrfToken, url } = usePage().props; // Get auth and csrfToken from Inertia

    return (
        <header style={{ padding: '10px', background: '#f8f9fa' }}>
            <nav style={{ display: 'flex', alignItems: 'center' }}>
                {/* Left Side Links */}
                <div style={{ display: 'flex' }}>
                    <InertiaLink
                        href="/"
                        style={{ marginRight: '15px', color: '#007BFF', textDecoration: 'none' }}
                    >
                        Home
                    </InertiaLink>
                    <InertiaLink
                        href="/weather/now"
                        style={{ marginRight: '15px', color: '#007BFF', textDecoration: 'none' }}
                    >
                        Current Weather
                    </InertiaLink>
                    <InertiaLink
                        href="/weather/forecast"
                        style={{ color: '#007BFF', textDecoration: 'none' }}
                    >
                        5-Day Forecast
                    </InertiaLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;
