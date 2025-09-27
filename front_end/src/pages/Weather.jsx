// (Similar structure: Form with city input, fetch from /api/weather, display results)
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('Kochi');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/api/weather?city=${city}`);
            setWeather(response.data);
        } catch (error) {
            console.error("Failed to fetch weather", error);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };
    
    // Fetch weather for default city on initial load
    useState(() => {
      fetchWeather();
    }, []);


    return (
        <div>
            <div className="page-header"><h2>Weather Conditions</h2><p>Check the weather to plan your day.</p></div>
            <div className="card">
                <form onSubmit={fetchWeather}>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city name" className="form-control" />
                    <button type="submit" className="btn btn-primary" style={{marginTop: '1rem'}} disabled={loading}>{loading ? 'Fetching...' : 'Get Weather'}</button>
                </form>
            </div>
            {weather && (
                <div className="card" style={{marginTop: '2rem'}}>
                    <h3>Weather in {weather.name}</h3>
                    <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                    <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                    <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default Weather;