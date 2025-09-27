const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });

// === API Routes ===

// 1. Plant Disease Detection (Kindwise API)
// app.post('/api/detect-disease', upload.single('image'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No image file provided.' });
//     }
//     try {
//         const imageBase64 = req.file.buffer.toString('base64');
//         const response = await axios.post('https://api.plant.id/v2/health_assessment', {
//             images: [imageBase64],
//             // You can add modifiers for more specific results
//             // disease_details: ["description", "treatment"],
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Api-Key': process.env.KINDWISE_API_KEY,
//             },
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error in disease detection:', error.response ? error.response.data : error.message);
//         res.status(500).json({ error: 'Failed to detect disease.' });
//     }
// });
app.post('/api/detect-disease', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided.' });
    }
    try {
        const imageBase64 = req.file.buffer.toString('base64');
        const response = await axios.post('https://api.plant.id/v2/health_assessment', {
            images: [imageBase64],
            // THIS IS THE KEY CHANGE: Request treatment details
            disease_details: ["description", "treatment", "url"],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': process.env.KINDWISE_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error in disease detection:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to detect disease.' });
    }
});

// 2. Agricultural News (Newsdata.io API)
app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&q=agriculture&language=en&country=in`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news.' });
    }
});

// 3. Weather Forecast (OpenWeatherMap API)
app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City is required.' });
    }
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        res.status(500).json({ error: 'Failed to fetch weather data.' });
    }
});

// 6. Locust Watch Data (FAO - Static Info)
// NOTE: FAO does not provide a real-time API. This route provides static links to official resources.
app.get('/api/locust-watch', (req, res) => {
    res.json({
        message: "Real-time locust tracking via a public API is not available. FAO provides the most reliable data through situation maps and bulletins on its official website.",
        situationMapUrl: "https://www.fao.org/ag/locusts/en/info/info/index.html",
        bulletinsUrl: "https://www.fao.org/ag/locusts/en/info/info/archives/index.html",
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});