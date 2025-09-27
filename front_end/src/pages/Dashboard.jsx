import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FiCamera, FiHeart, FiAlertTriangle, FiRss } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import './Dashboard.css';

// --- Helper function to get a greeting based on the time of day ---
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
};

const Dashboard = () => {
    const { stats, newsCount } = useAppContext();

    // --- Data for the chart ---
    const chartData = [
        { name: 'Healthy', value: stats.healthyPlants, color: '#27ae60' },
        { name: 'Issues', value: stats.issuesFound, color: '#e67e22' },
    ];

    return (
        <div className="dashboard-container">
            {/* --- Dynamic Header --- */}
            <div className="dashboard-header">
                <h2>{getGreeting()}, welcome to AgroSmart</h2>
                <p>Here is your farm's summary for today.</p>
            </div>

            {/* --- Main content grid (UPDATED STRUCTURE) --- */}
            <div className="dashboard-main-grid">
                {/* --- Icon-driven Stat Cards --- */}
                <div className="stats-grid">
                    <StatCard icon={<FiCamera />} value={stats.totalScans} label="Total Scans" colorClass="blue" />
                    <StatCard icon={<FiHeart />} value={stats.healthyPlants} label="Healthy Plants" colorClass="green" />
                    <StatCard icon={<FiAlertTriangle />} value={stats.issuesFound} label="Issues Found" colorClass="orange" />
                    <StatCard icon={<FiRss />} value={newsCount} label="News Updates" colorClass="purple" />
                </div>
                
                {/* --- Data Visualization Card (MOVED HERE) --- */}
                <div className="card chart-card">
                    <h3>Plant Status Overview</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} />
                                <Tooltip cursor={{ fill: '#f8f9fa' }} />
                                <Bar dataKey="value" barSize={30} radius={[0, 8, 8, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Reusable Components for a cleaner Dashboard ---
const StatCard = ({ icon, value, label, colorClass }) => (
    <div className="stat-card">
        <div className={`stat-icon-wrapper ${colorClass}`}>
            {icon}
        </div>
        <div className="stat-info">
            <p className="stat-value">{value}</p>
            <p className="stat-label">{label}</p>
        </div>
    </div>
);

// NOTE: QuickActionLink component has been removed as it's no longer used.

export default Dashboard;