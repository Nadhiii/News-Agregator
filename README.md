# News Aggregator

A simple Node.js application that fetches and displays the latest news articles using the NewsAPI.

## Features

- Search for news by keywords
- Filter news by country
- Filter news by category
- Clean and responsive UI

## Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd news-aggregator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your NewsAPI key:
   ```
   NEWS_API_KEY=your_api_key_here
   PORT=3000
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
news-aggregator/
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── app.js               # Main app file
├── package.json         # Dependencies
├── public/              # Static files
│   └── css/            
│       └── style.css    # Your CSS file
├── views/               # Template files
│   ├── index.html       # Homepage template
│   └── results.ejs      # Results template
└── README.md            # Project documentation
```

## Dependencies

- Express.js - Web framework
- Axios - HTTP client
- EJS - Templating engine
- Dotenv - Environment variable management

## License

ISC