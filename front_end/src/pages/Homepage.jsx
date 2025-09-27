import React from 'react';
import { Link } from 'react-router-dom';
// --- UPDATED ICON IMPORTS ---
import { FiArrowRight, FiCpu, FiCloud, FiBarChart2, FiBookOpen, FiBook } from 'react-icons/fi';
import './Homepage.css';
import BlurText from '../components/BlurText'; // Assuming this component exists

const Homepage = () => {
  return (
    <div className="homepage">
      {/* --- Section 1: Hero with your custom image --- */}
      <header className="hero">
        <div className="hero-content container">
          <h1>AgroSmart</h1>
          <p>Your intelligent farming companion for better crop management and higher yields.</p>
          <Link to="/app" className="btn btn-primary">
            Get Started <FiArrowRight className="btn-icon" />
          </Link>
        </div>
      </header>

      <main>
        {/* --- SECTION UPDATED: Cards re-arranged, Smart Irrigation removed, Resources added --- */}
        <section className="how-it-works section">
          <div className="container">
            <h2>Explore Our Features</h2>
            <div className="steps-grid">
              {/* --- Feature: AI Disease Detection --- */}
              <div className="step-card">
                <div className="step-icon-wrapper"><FiCpu /></div>
                <h3>AI Disease Detection</h3>
                <p>Instantly identify crop diseases from a single image to take immediate, effective action.</p>
              </div>
              {/* --- Feature: Real-Time Weather --- */}
              <div className="step-card">
                <div className="step-icon-wrapper"><FiCloud /></div>
                <h3>Real-Time Weather</h3>
                <p>Get hyperlocal weather forecasts to plan your farming activities and protect your crops.</p>
              </div>
              {/* --- Feature: Moisture Analysis --- */}
              <div className="step-card">
                <div className="step-icon-wrapper"><FiBarChart2 /></div>
                <h3>Moisture Analysis</h3>
                <p>Monitor soil moisture levels remotely to ensure your crops get the exact hydration they need.</p>
              </div>
              {/* --- Feature: Latest News --- */}
              <div className="step-card">
                <div className="step-icon-wrapper"><FiBookOpen /></div>
                <h3>Latest News</h3>
                <p>Stay updated with the latest agricultural news, techniques, and market trends.</p>
              </div>
              {/* --- NEW FEATURE: Resources --- */}
              <div className="step-card">
                <div className="step-icon-wrapper"><FiBook /></div>
                <h3>Resources</h3>
                <p>Access a library of articles, guides, and best practices to enhance your farming knowledge.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 3: Testimonials --- */}
        <section className="testimonials section">
          <div className="container">
            <h2>Trusted by Modern Farmers</h2>
            <div className="testimonial-grid">
              <div className="testimonial-card">
                <blockquote>
                  "AgroSmart transformed how we manage our crops. Disease detection is now 95% faster, and our yield has increased by 20%."
                </blockquote>
                <cite>— Rajan Kumar, Punjab</cite>
              </div>
              <div className="testimonial-card">
                <blockquote>
                  "The weather and irrigation advice is incredibly accurate. It has helped us save water and reduce costs significantly."
                </blockquote>
                <cite>— Priya Sharma, Maharashtra</cite>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 4: Final Call to Action --- */}
        <section className="cta section">
          <div className="container">
            <h2>Ready to Grow Smarter?</h2>
            <p>Join thousands of farmers revolutionizing their work with AgroSmart.</p>
            <Link to="/app" className="btn btn-light">Go to Your Dashboard</Link>
          </div>
        </section>
      </main>

      {/* --- Section 5: Footer --- */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} AgroSmart-Krypto Code. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;