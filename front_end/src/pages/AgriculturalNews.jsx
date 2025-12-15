// AgriculturalNews.jsx
import React, { useState, useEffect } from 'react'; // Corrected import line
import axios from 'axios';
import './AgriculturalNews.css'; // Import the new CSS file

const AgriculturalNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://agrosmart-7o36.onrender.com/api/news');
                // Filter out articles that don't have a title or link
                const validArticles = response.data.results.filter(
                    article => article.title && article.link
                );
                setArticles(validArticles);
            } catch (error) {
                console.error("Failed to fetch news", error);
                setError("Sorry, we couldn't load the news right now. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // Display a loading spinner
    if (loading) {
        return <div className="loading-spinner"></div>;
    }

    // Display an error message if the fetch fails
    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="news-container">
            <div className="page-header">
                <h2>Latest Agricultural News</h2>
                <p>Updates from India and around the world.</p>
            </div>
            
            <div className="news-grid">
                {articles.map(article => (
                    <div className="news-card" key={article.article_id}>
                        <img 
                            src={article.image_url || 'https://via.placeholder.com/400x200.png?text=News'} 
                            alt={article.title} 
                            className="card-image"
                        />
                        <div className="card-content">
                            <h3 className="card-title">{article.title}</h3>
                            <p className="card-description">
                                {article.description?.substring(0, 120)}...
                            </p>
                            <a 
                                href={article.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="read-more-link"
                            >
                                Read More →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgriculturalNews;    
