const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; // You can use any port

app.use(cors());
app.use(express.json());

// A simple test route to make sure the server is working
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});