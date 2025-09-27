import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Create this CSS file for homepage-specific styles
import BlurText from '../components/BlurText.jsx';

const Homepage = () => {
  return (
    <div className="homepage">
      <header className="hero">
        {/*  */}
        <div className="hero-content">
        <BlurText 
  text="Welcome to AgroSmart" 
  className="welcome-heading" 
/>
          <p>Your intelligent farming companion for better crop management and higher yields.</p>
          <Link to="/app" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </header>
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            {/*  */}
            <h3>AI Disease Detection</h3>
            <p>Upload an image of a plant leaf and instantly get a diagnosis and treatment plan.</p>
          </div>
          <div className="feature-card">
            {/*  */}
            <h3>Real-Time Weather</h3>
            <p>Get accurate weather forecasts for your location to plan your farming activities.</p>
          </div>
          <div className="feature-card">
            {/*  */}
            <h3>Smart Irrigation</h3>
            <p>Monitor soil moisture and get recommendations on when and how much to water your crops.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Homepage;

// Create Homepage.css for its specific styles