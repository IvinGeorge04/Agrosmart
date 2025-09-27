import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext'; // Import the custom hook
import './Dashboard.css'; // Import the new CSS file

const Dashboard = () => {
    // Get stats from the global context
    const { stats, newsCount } = useAppContext();

    return (
        <div>
            <div className="page-header">
                <h2>Welcome to AgroSmart</h2>
                <p>Your intelligent farming companion for better crop management.</p>
            </div>

            {/* Use dynamic values from context */}
            <div className="summary-grid">
                <div className="summary-card scans">
                    <h3>Total Scans</h3>
                    <p className="summary-value">{stats.totalScans}</p>
                </div>
                <div className="summary-card healthy">
                    <h3>Healthy Plants</h3>
                    <p className="summary-value">{stats.healthyPlants}</p>
                </div>
                <div className="summary-card issues">
                    <h3>Issues Found</h3>
                    <p className="summary-value">{stats.issuesFound}</p>
                </div>
                <div className="summary-card news">
                    <h3>News Updates</h3>
                    <p className="summary-value">{newsCount}</p>
                </div>
            </div>
            
            <div className="card quick-actions-container">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                    <Link to="/app/disease-detection" className="quick-action-link">Scan Plant</Link>
                    <Link to="/app/news" className="quick-action-link">Latest News</Link>
                    <Link to="/app/weather" className="quick-action-link">Weather</Link>
                    <Link to="/app/resources" className="quick-action-link">Resources</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;