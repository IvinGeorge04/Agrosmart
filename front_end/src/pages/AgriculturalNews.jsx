// (Similar structure: Use useEffect to fetch from your /api/news backend and display results)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgriculturalNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/news');
                setArticles(response.data.results);
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <div>
             <div className="page-header"><h2>Latest Agricultural News</h2><p>Updates from India and around the world.</p></div>
             {loading ? <p>Loading news...</p> : (
                <div className="dashboard-grid">
                    {articles.map(article => (
                        <div className="card" key={article.article_id}>
                            {article.image_url && <img src={article.image_url} alt={article.title} style={{width: '100%', borderRadius: '8px'}}/>}
                            <h4>{article.title}</h4>
                            <p>{article.description?.substring(0, 100)}...</p>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">Read More</a>
                        </div>
                    ))}
                </div>
             )}
        </div>
    );
};

export default AgriculturalNews;