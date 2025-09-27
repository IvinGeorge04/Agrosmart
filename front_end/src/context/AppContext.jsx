import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const AppContext = createContext();

// 2. Create a "provider" component
export const AppProvider = ({ children }) => {
    // State to hold our dashboard stats
    const [stats, setStats] = useState({
        totalScans: 0, // Start with initial values from your screenshot
        healthyPlants: 0,
        issuesFound: 0,
    });
    const [newsCount, setNewsCount] = useState(10);

    // Function to update stats after a scan
    const updateScanStats = ({ isHealthy }) => {
        setStats(prevStats => ({
            totalScans: prevStats.totalScans + 1,
            healthyPlants: isHealthy ? prevStats.healthyPlants + 1 : prevStats.healthyPlants,
            issuesFound: !isHealthy ? prevStats.issuesFound + 1 : prevStats.issuesFound,
        }));
    };

    const value = {
        stats,
        newsCount,
        updateScanStats,
        setNewsCount,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// 3. Create a custom hook to easily use the context
export const useAppContext = () => {
    return useContext(AppContext);
};