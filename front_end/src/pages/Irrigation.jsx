import React, { useState, useEffect } from 'react';

// An icon component for better UI (optional, but nice to have)
const Icon = ({ path, className }) => (
    <svg className={className} style={{ width: '1em', height: '1em', marginRight: '8px' }} viewBox="0 0 24 24" fill="currentColor">
        <path d={path} />
    </svg>
);

// Main Component
const Irrigation = () => {
    // --- STATE MANAGEMENT ---
    // Inputs
    const [moisture, setMoisture] = useState(45);
    const [cropType, setCropType] = useState('vegetables');
    const [soilType, setSoilType] = useState('loam');
    const [weather, setWeather] = useState('sunny');

    // Outputs
    const [recommendation, setRecommendation] = useState({
        message: '',
        action: '',
        color: '#f39c12', // Orange for initial medium state
    });

    // --- LOGIC ---
    // This useEffect hook runs whenever an input changes, making the tool interactive
    useEffect(() => {
        const calculateRecommendation = () => {
            let moist = parseInt(moisture);
            
            // --- DYNAMIC THRESHOLD CALCULATION ---
            // 1. Start with base thresholds
            let lowerThreshold = 35; // Below this is RED
            let upperThreshold = 75; // Above this is GREEN

            // 2. Adjust for Soil Type
            if (soilType === 'sandy') {
                lowerThreshold += 5; // Sandy soil dries faster, so the "low" point is reached sooner
                upperThreshold -= 5;
            } else if (soilType === 'clay') {
                lowerThreshold -= 5; // Clay holds water, so the "low" point is lower
                upperThreshold += 5;
            }

            // 3. Adjust for Crop Type
            if (cropType === 'paddy') {
                lowerThreshold = 60; // Paddy fields need to be consistently wet
                upperThreshold = 90;
            } else if (cropType === 'millets') {
                lowerThreshold -= 10; // Millets are drought-resistant
                upperThreshold -= 10;
            } else if (cropType === 'sugarcane') {
                lowerThreshold += 5; // Sugarcane has high water requirements
                upperThreshold += 5;
            }
            
            // 4. Adjust for Weather Forecast
            // Sunny weather increases evaporation, making the current moisture less effective.
            if (weather === 'sunny') {
                lowerThreshold += 5;
                upperThreshold += 5;
            }

            // --- GENERATE RECOMMENDATION ---

            // Priority 1: Override everything if rain is expected
            if (weather === 'rainy') {
                return {
                    message: `Rain is forecasted. Natural irrigation is expected.`,
                    action: 'Pause manual irrigation and conserve water. Monitor conditions after the rain.',
                    color: '#3498db', // Blue
                };
            }

            // Make sure thresholds don't go beyond 0-100 bounds
            lowerThreshold = Math.max(5, Math.min(95, lowerThreshold));
            upperThreshold = Math.max(10, Math.min(100, upperThreshold));


            // Priority 2: Check moisture levels against the new dynamic thresholds
            if (moist < lowerThreshold) {
                 const weatherContext = weather === 'sunny' ? 'especially on a hot, sunny day.' : '.';
                return {
                    message: `Low moisture for ${cropType} in ${soilType} soil, ${weatherContext}`,
                    action: 'Immediate watering required to prevent crop stress and yield loss.',
                    color: '#e74c3c', // Red for low moisture
                };
            } else if (moist >= lowerThreshold && moist < upperThreshold) {
                return {
                    message: `Medium moisture detected.`,
                    action: 'Moisture is adequate for now. Monitor closely, especially on hot days. Plan to irrigate soon.',
                    color: '#f39c12', // Orange for medium moisture
                };
            } else { // moist >= upperThreshold
                return {
                    message: 'Good moisture level.',
                    action: 'Soil has sufficient moisture. No irrigation is needed at this time.',
                    color: '#2ecc71', // Green for good moisture
                };
            }
        };

        setRecommendation(calculateRecommendation());

    }, [moisture, cropType, soilType, weather]); // Re-run when any of these dependencies change


    // --- RENDER ---
    return (
        <div>
            <div className="page-header">
                <h2>Advanced Irrigation Planner</h2>
                <p>Adjust the parameters based on your field conditions to get a smart irrigation recommendation.</p>
            </div>

            {/* INPUT PARAMETERS CARD */}
            <div className="card">
                <h3>Field Parameters</h3>
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    
                    {/* Soil Moisture */}
                    <div className="form-group">
                        <label htmlFor="moisture">Soil Moisture Sensor (%) - <strong>{moisture}%</strong></label>
                        <input type="range" id="moisture" className="form-control-range" value={moisture} onChange={e => setMoisture(e.target.value)} min="0" max="100" />
                    </div>

                    {/* Crop Type */}
                    <div className="form-group">
                        <label htmlFor="cropType">Select Crop Type</label>
                        <select id="cropType" className="form-control" value={cropType} onChange={e => setCropType(e.target.value)}>
                            <option value="vegetables">Vegetables (Tomato, Brinjal)</option>
                            <option value="grains">Grains (Wheat, Maize)</option>
                            <option value="paddy">Paddy (Rice)</option>
                            <option value="millets">Millets (Jowar, Bajra)</option>
                            <option value="sugarcane">Sugarcane</option>
                        </select>
                    </div>

                     {/* Soil Type */}
                     <div className="form-group">
                        <label htmlFor="soilType">Select Soil Type</label>
                        <select id="soilType" className="form-control" value={soilType} onChange={e => setSoilType(e.target.value)}>
                            <option value="loam">Loam (Do-mat)</option>
                            <option value="sandy">Sandy (Retili)</option>
                            <option value="clay">Clay (Chikni)</option>
                            <option value="black">Black (Kali)</option>
                        </select>
                    </div>

                    {/* Weather Forecast */}
                    <div className="form-group">
                        <label htmlFor="weather">Next 24hr Weather Forecast</label>
                        <select id="weather" className="form-control" value={weather} onChange={e => setWeather(e.target.value)}>
                            <option value="sunny">Sunny / Clear</option>
                            <option value="cloudy">Cloudy</option>
                            <option value="rainy">Rain Expected</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* ANALYSIS & RECOMMENDATION CARD */}
            <div className="card" style={{ marginTop: '2rem' }}>
                <h3>Analysis & Recommendation</h3>
                
                {/* Visualization Bar */}
                <div className="moisture-graph-container" style={{ marginBottom: '1.5rem' }}>
                    <div className="moisture-graph-bar" style={{ width: `${moisture}%`, backgroundColor: recommendation.color, transition: 'all 0.5s ease' }}>
                        {moisture}%
                    </div>
                </div>
                
                {/* Status Message */}
                <div className="alert" style={{ backgroundColor: `${recommendation.color}20`, borderLeft: `5px solid ${recommendation.color}`, padding: '1rem' }}>
                    <h4 style={{ margin: 0, color: recommendation.color }}>
                        Status: {recommendation.message}
                    </h4>
                    <p style={{ marginTop: '0.5rem', marginBottom: 0, fontSize: '1.1em' }}>
                       <strong>Recommended Action:</strong> {recommendation.action}
                    </p>
                </div>
            </div>

            {/* EDUCATIONAL SECTION */}
            <div className="card" style={{ marginTop: '2rem' }}>
                <h3>Learn About Irrigation Methods</h3>
                <p>Choosing the right method saves water, reduces costs, and improves crop yield.</p>
                <div className="irrigation-methods" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                    <div className="method-card" style={{ flex: 1, minWidth: '280px', padding: '1rem', background: '#f9f9f9', borderRadius: '5px' }}>
                        <h5>💧 Drip Irrigation (Tapka Sinchai)</h5>
                        <p>Water is applied directly to the root zone through a network of pipes and emitters. Highly efficient, saves 70% more water than flood irrigation. Best for fruit orchards, vegetables, and greenhouses.</p>
                    </div>
                    <div className="method-card" style={{ flex: 1, minWidth: '280px', padding: '1rem', background: '#f9f9f9', borderRadius: '5px' }}>
                        <h5>💦 Sprinkler Irrigation (Fawwara Sinchai)</h5>
                        <p>Water is sprayed over the crops like artificial rain. Suitable for sandy soils and uneven land where flood irrigation is not possible. Good for wheat, gram, and vegetables.</p>
                    </div>
                     <div className="method-card" style={{ flex: 1, minWidth: '280px', padding: '1rem', background: '#f9f9f9', borderRadius: '5px' }}>
                        <h5>🌊 Flood Irrigation (Baadh Sinchai)</h5>
                        <p>The traditional method of covering the entire field with water. Has very low water efficiency and can lead to soil erosion and nutrient runoff. Commonly used for paddy cultivation.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Irrigation;

