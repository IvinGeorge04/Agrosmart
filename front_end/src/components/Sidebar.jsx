import React from 'react';
import { NavLink } from 'react-router-dom';
// Import the icons from react-icons
import { 
    FiGrid, 
    FiCamera, 
    FiRss, 
    FiWind, 
    FiDroplet, 
    FiBookOpen, 
    FiAlertTriangle 
} from 'react-icons/fi';
import './Sidebar.css'; // We'll create this file for styling

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="logo-icon">🌿</span>
                <h1>AgroSmart</h1>
            </div>
            <nav className="sidebar-nav">
                {/* Each NavLink now contains an icon and a span for the text */}
                <NavLink to="/app" end>
                    <FiGrid /> <span>Dashboard</span>
                </NavLink>
                <NavLink to="/app/disease-detection">
                    <FiCamera /> <span>Disease Detection</span>
                </NavLink>
                <NavLink to="/app/news">
                    <FiRss /> <span>Agricultural News</span>
                </NavLink>
                <NavLink to="/app/weather">
                    <FiWind /> <span>Weather</span>
                </NavLink>
                <NavLink to="/app/irrigation">
                    <FiDroplet /> <span>Irrigation Helper</span>
                </NavLink>
                <NavLink to="/app/resources">
                    <FiBookOpen /> <span>Resources</span>
                </NavLink>
                <NavLink to="/app/locust-watch">
                    <FiAlertTriangle /> <span>Locust Watch</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;