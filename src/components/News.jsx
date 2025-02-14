import React, { useState } from "react";

const News = () => {
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-black   p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">React News Website</h1>
        <p className="text-gray-600">Search and browse the latest news</p>
      </header>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-l px-4 py-2 w-full max-w-md"
        />
        <button
          onClick={fetchNews}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600 w-screen h-screen">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles?.map((article, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold">{article.title}</h2>
                <p className="text-gray-600 text-sm">
                  {article.description?.substring(0, 100)}...
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 block"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;