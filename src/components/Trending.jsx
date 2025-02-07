import { useState, useEffect } from "react";
import { getAllArticles } from "../../api";
import HorizontalCard from "./HorizontalCard";
import VerticalCard from "./VerticalCard";

const Trending = () => {
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const [mostCommentedArticles, setMostCommentedArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };

  const width = useWindowWidth();
  const isSmall = width < 768;
  const isMedium = width >= 768 && width < 1024;
  const isLarge = width >= 1024;

  useEffect(() => {
    setIsPageLoading(true);
    getAllArticles()
      .then((articles) => {
        const trending = [...articles]
          .sort((a, b) => b.votes - a.votes)

          .slice(0, 6);
        setTrendingArticles(trending);

        const recent = [...articles]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6);
        setRecentArticles(recent);

        const mostCommented = [...articles]
          .sort((a, b) => b.comment_count - a.comment_count)
          .slice(0, 6);
        setMostCommentedArticles(mostCommented);
        const categories = ["Trending", "Recent", "Most Commented"];
        const randomIndex = Math.floor(Math.random() * categories.length);
        setSelectedCategory(categories[randomIndex]);
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
        <p className="ml-4 text-lg font-semibold">Loading articles...</p>
      </div>
    );
  }

  let displayedArticles = [];
  let headerText = "";

  if (selectedCategory === "Trending") {
    displayedArticles = trendingArticles;
    headerText = "Currently Trending";
  } else if (selectedCategory === "Recent") {
    displayedArticles = recentArticles;
    headerText = "Recent Articles";
  } else if (selectedCategory === "Most Commented") {
    displayedArticles = mostCommentedArticles;
    headerText = "Most Commented";
  }

  return (
    <>
      <div className="whitespace-nowrap mt-3 text-left w-full">
        <h2 className="w-full text-xl lg:text-lg font-extrabold mt-10 mb-4 transform transition-all hover:scale-105 text-left">
          {headerText}
        </h2>
      </div>
      {!isLarge ? (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-1">
          {displayedArticles.map((article) => (
            <div key={article.article_id}>
              <HorizontalCard
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
      ) : (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-1">
          {trendingArticles.map((article) => (
            <div key={article.article_id}>
              <VerticalCard
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
      )}
    </>
  );
};

export default Trending;
