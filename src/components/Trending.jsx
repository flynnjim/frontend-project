import { useState, useEffect } from "react";
import { getAllArticles } from "../../api";  
import ArticleCard from "./ArticleCard"; 

const Trending = () => {
  const [articlesData, setArticlesData] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);


  useEffect(() => {
    setIsPageLoading(true);
    getAllArticles()
      .then((articles) => {
        const topArticles = articles
          .sort((a, b) => b.votes - a.votes) 
          .slice(0, 6); 
        setArticlesData(topArticles);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  }, []);

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-lg font-semibold">Loading trending articles...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 border-4 border-green-500">
      <h2 className="text-center text-2xl font-bold mb-6">Trending Articles</h2>
      <div className="overflow-x-auto whitespace-nowrap border-4 border-green-500 p-2">
        <ul className="flex space-x-4">
          {articlesData.map((article) => (
            <li key={article.article_id} className="flex-shrink-0">
              <ArticleCard
                article_img_url={article.article_img_url}
                author={article.author}
                comment_count={article.comment_count}
                created_at={article.created_at}
                title={article.title}
                topic={article.topic}
                article_id={article.article_id}
                votes={article.votes}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Trending;
