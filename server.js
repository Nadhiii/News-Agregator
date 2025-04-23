require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/news', async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}`
    );
    const articles = response.data.articles.slice(0, 5);
    res.json(articles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching news');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
