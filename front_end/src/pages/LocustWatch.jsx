import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocustWatchPage = () => {
    const [locustInfo, setLocustInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            setLoading(true);
            setError(null);
            try {
                // This fetches data from your backend API
                const response = await axios.get('http://localhost:3001/api/locust-watch');
                setLocustInfo(response.data);
            } catch (err) {
                console.error("Failed to fetch locust info:", err);
                setError("Could not retrieve the latest information. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchInfo();
    }, []);

    const renderContent = () => {
        if (loading) {
            return <p style={styles.statusText}>Loading latest information...</p>;
        }

        if (error) {
            return <p style={{...styles.statusText, ...styles.errorText}}>{error}</p>;
        }

        if (locustInfo) {
            return (
                <>
                    <p style={styles.summaryText}>{locustInfo.message}</p>
                    <p style={styles.adviceText}>
                        Farmers should stay updated by checking the official FAO maps and bulletins daily during high-risk seasons. This is the most effective way to get advance warning.
                    </p>
                    <div style={styles.linksContainer}>
                        <a href={locustInfo.situationMapUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
                            <span role="img" aria-label="map icon">🗺️</span> View Situation Map
                        </a>
                        <a href={locustInfo.bulletinsUrl} target="_blank" rel="noopener noreferrer" style={styles.link}>
                            <span role="img" aria-label="document icon">📰</span> Read Bulletins
                        </a>
                    </div>
                </>
            );
        }

        return null;
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Locust Watch</h2>
                <p style={styles.subtitle}>Information from the FAO Desert Locust Information Service.</p>
            </div>
            <div style={styles.card}>
                {renderContent()}
            </div>
        </div>
    );
};

// --- STYLES ---
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: '#f8f9fa',
        padding: '2rem',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    title: {
        margin: '0 0 0.5rem 0',
        fontSize: '2.5rem',
        fontWeight: '600',
        color: '#343a40',
    },
    subtitle: {
        margin: 0,
        fontSize: '1.1rem',
        color: '#6c757d',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.07)',
        width: '100%',
        maxWidth: '700px',
        textAlign: 'center',
    },
    statusText: {
        color: '#6c757d',
        fontSize: '1.1rem',
        padding: '2rem 0',
    },
    errorText: {
        color: '#d9534f',
    },
    summaryText: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#212529',
        marginBottom: '1.5rem',
    },
    adviceText: {
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '#495057',
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '8px',
        borderLeft: '4px solid #3498db',
        textAlign: 'left',
    },
    linksContainer: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
    },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        color: '#3498db',
        backgroundColor: '#eaf4fc',
        transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    },
};

export default LocustWatchPage;