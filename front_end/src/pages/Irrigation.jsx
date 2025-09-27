import React, { useState } from 'react';

const Irrigation = () => {
    const [moisture, setMoisture] = useState(50);
    const [message, setMessage] = useState('Moisture level is optimal. No irrigation needed right now.');
    const [barColor, setBarColor] = useState('#2ecc71'); // Green

    const handleSubmit = (e) => {
        e.preventDefault();
        const level = parseInt(moisture);
        if (level < 30) {
            setMessage('Critical moisture level! Immediate watering required. Use the drip irrigation system to deliver water directly to the roots.');
            setBarColor('#e74c3c'); // Red
        } else if (level >= 30 && level < 60) {
            setMessage('Moisture level is optimal. No irrigation needed right now.');
            setBarColor('#2ecc71'); // Green
        } else {
            setMessage('Soil is saturated. Do not water to avoid root rot.');
            setBarColor('#3498db'); // Blue
        }
    };

    return (
        <div>
            <div className="page-header"><h2>Smart Irrigation Helper</h2><p>Enter the soil moisture percentage from your sensor to get a recommendation.</p></div>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="moisture">Soil Moisture (%)</label>
                        <input type="number" id="moisture" className="form-control" value={moisture} onChange={e => setMoisture(e.target.value)} min="0" max="100" />
                    </div>
                    <button type="submit" className="btn btn-primary">Analyze Moisture</button>
                </form>
            </div>

            <div className="card" style={{ marginTop: '2rem' }}>
                <h3>Moisture Level Visualization</h3>
                <div className="moisture-graph-container">
                    <div className="moisture-graph-bar" style={{ width: `${moisture}%`, backgroundColor: barColor }}>
                        {moisture}%
                    </div>
                </div>
                <h4 style={{ marginTop: '1.5rem' }}>Recommendation:</h4>
                <p><strong>{message}</strong></p>
            </div>
        </div>
    );
};

export default Irrigation;