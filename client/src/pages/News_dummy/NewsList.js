import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsItem } from '.';

const NewsList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      
      const apiKey = 'c5022a2e42eb484a866abb5a7dcbc756';
      const response = await axios.get(`https://newsapi.org/v2/everything?q=mentalhealth&apiKey=${apiKey}`);
      setArticles(response.data.articles);
      console.log(response);
    };

    getArticles();
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <NewsItem
          title={article.title}
          description={article.description}
          url={article.url}
          urlToImage={article.urlToImage}
          key={article.url} // Make sure to include a unique key for each item in the list
        />
      ))}
    </div>
  );
};

export default NewsList;
