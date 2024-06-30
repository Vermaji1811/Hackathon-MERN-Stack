import React, { useState, useEffect } from 'react';

const API_KEY = '37f00f86a29b4a02a7013004555ffe12';
const BASE_URL = 'https://newsapi.org/v2';

const fetchNews = async (query = '') => {
  const url = query 
    ? `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}` 
    : `${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const News = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const newsData = await fetchNews();
      setArticles(newsData);
      setLoading(false);
    };
    loadNews();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newsData = await fetchNews(query);
    setArticles(newsData);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <form onSubmit={handleSearch} className="flex items-center border border-blue-500 rounded-md overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news..."
            className="p-2 border-none focus:outline-none w-40"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {articles.map((article, index) => (
            <div key={index} className="w-full border border-blue-500 p-4 rounded-md max-h-50px overflow-hidden">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover mb-4 rounded-md"
                />
              )}
              <h2 className="text-lg font-semibold mb-2 truncate">{article.title}</h2>
              <p className="text-gray-600 mb-2 truncate">{article.description}</p>
              {article.content && (
                <>
                  <p className="text-gray-600 mb-2 truncate">{article.content.split('\n')[0]}</p>
                  <p className="text-gray-600 mb-2 truncate">{article.content.split('\n')[1]}</p>
                  <p className="text-gray-600 mb-2 truncate">{article.content.split('\n')[2]}</p>
                </>
              )}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
