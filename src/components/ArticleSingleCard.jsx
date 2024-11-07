import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentArticle } from "../../api";
import NotFoundPage from "./NotFoundPage";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography, Box } from "@mui/material";
import WholeArticlePage from "./WholeArticlePage";

const ArticleSingleCard = () => {
  const [currentArticle, setCurrentArticle] = useState({
    article_img_url:
      "https://res.cloudinary.com/cloudinary-marketing/images/w_1540,h_1083/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA",
    author: "",
    comment_count: 0,
    created_at: "",
    title: "",
    topic: "",
    article_id: "",
    votes: 0,
  });

  const { article_id } = useParams();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [noArticlesFound, setNoArticlesFound] = useState(false);

  useEffect(() => {
    setIsPageLoading(true);

    getCurrentArticle(article_id)
      .then(({ article }) => {
        setNoArticlesFound(false);
        setCurrentArticle(article);
      })
      .catch((err) => {
        console.log(err);
        setNoArticlesFound(true);
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  }, [article_id]);

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center space-x-4">
        <div className="animate-spin">
          <svg className="w-8 h-8 text-gray-500" viewBox="0 0 50 50">
            <circle
              className="opacity-25"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <circle
              className="opacity-75"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="126"
              strokeDashoffset="30"
              fill="none"
            ></circle>
          </svg>
        </div>
        <span className="text-lg font-semibold">
          Loading article, please wait...
        </span>
      </div>
    );
  } else {
    return (
      <>
        {noArticlesFound ? (
          <NotFoundPage />
        ) : (
          <WholeArticlePage
            article_img_url={currentArticle.article_img_url}
            author={currentArticle.author}
            comment_count={currentArticle.comment_count}
            created_at={currentArticle.created_at}
            title={currentArticle.title}
            topic={currentArticle.topic}
            article_id={currentArticle.article_id}
            body={currentArticle.body}
            votes={currentArticle.votes}
          />
        )}
      </>
    );
  }
};

export default ArticleSingleCard;
