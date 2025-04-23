// Add this route after the home route
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
        params.country = 'us'; // Default to US news
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
    const articles = response.data.articles.slice(0, 10); // Get top 10 articles
    
    res.render('results', {
      articles,
      searchQuery,
      searchType: searchType.charAt(0).toUpperCase() + searchType.slice(1)
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