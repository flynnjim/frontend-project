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
        <p className="ml-4 text-lg font-semibold">
          Loading trending articles...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="whitespace-nowrap mt-3 text-left">
        <h2 className="text-4xl font-extrabold text-florescent-yellow mt-6 mb-4 transform transition-all hover:scale-105 text-left">
          Trending articles
        </h2>
      </div>
      <div className="overflow-x-auto whitespace-nowrap p-2 sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1100px]">
        <div className="flex space-x-4 min-w-max">
          {articlesData.map((article) => (
            <div key={article.article_id} className="w-full sm:w-[340px]">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
