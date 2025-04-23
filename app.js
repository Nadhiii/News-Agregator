require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// News route
app.get('/news', async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const searchType = req.query.type;
    
    if (!searchQuery) {
      return res.redirect('/');
    }
    
    let apiUrl = 'https://newsapi.org/v2/';
    let params = {
      apiKey: process.env.NEWS_API_KEY
    };
    
    // Set up the API URL based on search type
    switch (searchType) {
      case 'country':
        apiUrl += 'top-headlines';
        params.country = searchQuery.toLowerCase();
        break;
      case 'category':
        apiUrl += 'top-headlines';
        params.category = searchQuery.toLowerCase();
        params.country = 'us';
        break;
      case 'keyword':
      default:
        apiUrl += 'everything';
        params.q = searchQuery;
        params.sortBy = 'publishedAt';
        break;
    }
    
    // Make the API request
    const response = await axios.get(apiUrl, { params });
    const articles = response.data.articles.slice(0, 10);
    
    res.render('results', {
      articles,
      searchQuery,
      searchType: searchType.charAt(0).toUpperCase() + searchType.slice(1),
      error: null
    });
    
  } catch (error) {
    console.error('Error fetching news:', error.message);
    
    res.render('results', {
      articles: [],
      searchQuery: req.query.q,
      searchType: req.query.type.charAt(0).toUpperCase() + req.query.type.slice(1),
      error: 'Failed to fetch news. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});