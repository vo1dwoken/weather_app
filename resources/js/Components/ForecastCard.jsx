import React from 'react';

const ForecastCard = ({ time, icon, temp, description, wind, rain }) => {
    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#fff',
                marginBottom: '10px', // Space between forecast cards
                display: 'inline-block', // Align horizontally
                marginRight: '10px', // Add space between cards if necessary
                width: '200px', // Adjust width of the cards
            }}
        >
            <p style={{ margin: '10px 0' }}>
                <strong>{time}</strong>
            </p>
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                style={{ width: '50px', height: '50px', margin: '0 auto' }} // Center the icon horizontally
            />
            <p style={{ margin: '10px 0' }}>
                <strong>{temp}°C</strong>
            </p>
            <p style={{ margin: '10px 0', fontSize: '14px' }}>{description}</p>
            <p style={{ margin: '10px 0', fontSize: '14px' }}>Wind: {wind} m/s</p>
            <p style={{ margin: '10px 0', fontSize: '14px' }}>Rain: {rain || 0} mm</p>
        </div>
    );
};

export default ForecastCard;
