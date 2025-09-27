import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocustWatchPage = () => {
    const [locustInfo, setLocustInfo] = useState(null);

    useEffect(() => {
        const fetchInfo = async () => {
            const response = await axios.get('http://localhost:3001/api/locust-watch');
            setLocustInfo(response.data);
        };
        fetchInfo();
    }, []);

    return (
        <div>
            <div className="page-header">
                <h2>Locust Watch</h2>
                <p>Information from the FAO Desert Locust Information Service.</p>
            </div>
            <div className="card">
                <h3>Important Notice</h3>
                {locustInfo ? <p>{locustInfo.message}</p> : <p>Loading information...</p>}
                
                <h4>Farmer Alert System</h4>
                <p>
                    While real-time GPS tracking of swarms for a 3km range alert is not publicly available, farmers should stay updated by checking the official FAO maps and bulletins daily during high-risk seasons. This is the most effective way to get advance warning for your region.
                </p>

                {locustInfo && (
                    <div>
                        <a href={locustInfo.situationMapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Latest Situation Map</a>
                        <a href={locustInfo.bulletinsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{marginLeft: '1rem'}}>Read Bulletins</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocustWatchPage;