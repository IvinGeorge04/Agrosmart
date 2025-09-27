import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="logo-icon">🌿</span>
                <h1>AgroSmart</h1>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><NavLink to="/app" end>Dashboard</NavLink></li>
                    <li><NavLink to="/app/disease-detection">Disease Detection</NavLink></li>
                    <li><NavLink to="/app/news">Agricultural News</NavLink></li>
                    <li><NavLink to="/app/weather">Weather</NavLink></li>
                    <li><NavLink to="/app/irrigation">Irrigation Helper</NavLink></li>
                    <li><NavLink to="/app/resources">Resources</NavLink></li>
                    <li><NavLink to="/app/locust-watch">Locust Watch</NavLink></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;