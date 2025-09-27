import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const Weather = () => {
    const [city, setCity] = useState('Kochi');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true); // Set to true to show loading on initial fetch
    const [error, setError] = useState(null);

    // Memoized function to fetch weather data from the backend API
    const fetchWeather = useCallback(async (searchCity) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3001/api/weather?city=${searchCity}`);
            setWeather(response.data);
        } catch (err) {
            setError(`Could not fetch weather for "${searchCity}". Please check the city name.`);
            setWeather(null);
            console.error("Failed to fetch weather", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch weather for the default city on the component's first render
    useEffect(() => {
        fetchWeather('Kochi');
    }, [fetchWeather]);

    // Handler for the form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
        }
    };

    // Generates the URL for the weather condition icon from OpenWeatherMap
    const getWeatherIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };
    
    // Dynamically adjust button style when loading
    const buttonStyle = {
        ...styles.button,
        ...(loading && styles.buttonDisabled)
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Weather Dashboard</h1>
                <p style={styles.subHeader}>Check the latest weather conditions for any city.</p>
                
                <form onSubmit={handleSearch} style={styles.form}>
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="e.g., London, Tokyo"
                        style={styles.input}
                    />
                    <button type="submit" style={buttonStyle} disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>

                <div style={styles.resultContainer}>
                    {loading && <p>Loading weather data...</p>}
                    {error && <p style={styles.errorText}>{error}</p>}
                    {weather && !loading && (
                        <div style={styles.weatherInfo}>
                            <div style={styles.mainInfo}>
                                <div>
                                    <h2 style={styles.cityName}>{weather.name}, {weather.sys.country}</h2>
                                    <p style={styles.weatherDescription}>
                                        {capitalizeFirstLetter(weather.weather[0].description)}
                                    </p>
                                </div>
                                <img 
                                    src={getWeatherIconUrl(weather.weather[0].icon)} 
                                    alt={weather.weather[0].description}
                                    style={styles.weatherIcon}
                                />
                            </div>

                            <div style={styles.temperatureContainer}>
                                <p style={styles.temperature}>{Math.round(weather.main.temp)}°C</p>
                            </div>

                            <div style={styles.detailsGrid}>
                                <div style={styles.detailBox}>
                                    <span style={styles.detailLabel}>Feels Like</span>
                                    <span style={styles.detailValue}>{Math.round(weather.main.feels_like)}°C</span>
                                </div>
                                <div style={styles.detailBox}>
                                    <span style={styles.detailLabel}>Humidity</span>
                                    <span style={styles.detailValue}>{weather.main.humidity}%</span>
                                </div>
                                <div style={styles.detailBox}>
                                    <span style={styles.detailLabel}>Wind Speed</span>
                                    <span style={styles.detailValue}>{weather.wind.speed} m/s</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- STYLES ---
// Using a "CSS-in-JS" object for styling. For more complex apps,
// consider styled-components or a separate CSS file.
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: '#f0f2f5',
        padding: '2rem',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center',
    },
    header: {
        margin: '0 0 0.5rem 0',
        fontSize: '2rem',
        fontWeight: '600',
        color: '#2c3e50',
    },
    subHeader: {
        margin: '0 0 2rem 0',
        color: '#7f8c8d',
    },
    form: {
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.5rem',
    },
    input: {
        flex: 1,
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        border: '2px solid #dfe4ea',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    },
    button: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#3498db',
        color: '#ffffff',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
    },
    buttonDisabled: {
        backgroundColor: '#a9cce3',
        cursor: 'not-allowed',
    },
    resultContainer: {
        marginTop: '1.5rem',
        minHeight: '250px', // Reserve space to prevent layout shifts
    },
    errorText: {
        color: '#e74c3c',
        fontWeight: '500',
    },
    weatherInfo: {
        textAlign: 'left',
    },
    mainInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #dfe4ea',
        paddingBottom: '1rem',
        marginBottom: '1rem',
    },
    cityName: {
        margin: 0,
        fontSize: '1.75rem',
        fontWeight: '500',
        color: '#2c3e50',
    },
    weatherDescription: {
        margin: '0.25rem 0 0 0',
        color: '#7f8c8d',
    },
    weatherIcon: {
        width: '80px',
        height: '80px',
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))', // Add a subtle shadow to the icon
    },
    temperatureContainer: {
        textAlign: 'center',
        marginBottom: '1.5rem',
    },
    temperature: {
        fontSize: '4.5rem',
        fontWeight: 'bold',
        margin: 0,
        color: '#2c3e50',
        lineHeight: 1,
    },
    detailsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        textAlign: 'center',
    },
    detailBox: {
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailLabel: {
        fontSize: '0.8rem',
        color: '#7f8c8d',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    detailValue: {
        fontSize: '1.2rem',
        color: '#2c3e50',
        fontWeight: '600',
    }
};

export default Weather;