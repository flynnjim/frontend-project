import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../api";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import DropDown from "./DropDown";
import HorizontalCard from "./HorizontalCard";
import VerticalCard from "./VerticalCard";

import NotFoundPage from "./NotFoundPage";

const Display = () => {
  const [articlesData, setArticlesData] = useState([
    {
      article_img_url:
        "https://res.cloudinary.com/cloudinary-marketing/images/w_1540,h_1083/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA",
      author: "",
      comment_count: 0,
      created_at: "",
      title: "",
      topic: "",
      article_id: "",
      votes: 0,
    },
  ]);

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [sortByChosen, setSortByChosen] = useState("");
  const [commentCountSelected, setCommentCountSelected] = useState(false);
  const [order, setOrder] = useState("DESC");
  const [noCategoryFound, setNoCategoryFound] = useState(false);

  const { category } = useParams();

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

  const firstArray = isLarge
    ? articlesData.slice(1, 4)
    : articlesData.slice(1, 3);

  const secondArray = isLarge ? articlesData.slice(4) : articlesData.slice(3);

  useEffect(() => {
    setIsPageLoading(true);
    getAllArticles(category, sortByChosen, order)
      .then((articles) => {
        setNoCategoryFound(false);
        setArticlesData(articles);
      })
      .catch((err) => {
        setNoCategoryFound(true);
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  }, [category, sortByChosen, order]);

  if (isPageLoading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
        <Typography variant="h6">Loading articles, please wait...</Typography>
      </Box>
    );
  } else {
    return (
      <>
        {noCategoryFound ? (
          <NotFoundPage />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 md:gap-6 md:grid-cols-4 lg:grid-cols-6 bg-bgcolor ">
              <ul className="col-span-2 md:col-span-2 lg:col-span-3  md:row-span-2 divide-y divide-black-100 border-b-2 border-black-100">
                <div className="col-span-2 md:col-span-3 bg-red">
                  <li key={articlesData[0].article_id}>
                    <VerticalCard
                      article_img_url={articlesData[0].article_img_url}
                      author={articlesData[0].author}
                      comment_count={articlesData[0].comment_count}
                      created_at={articlesData[0].created_at}
                      title={articlesData[0].title}
                      topic={articlesData[0].topic}
                      article_id={articlesData[0].article_id}
                      votes={articlesData[0].votes}
                    />
                  </li>
                </div>
              </ul>

              {firstArray.map((article, i) => (
                <div
                  key={article.article_id}
                  className="row-span-2 md:row-span-1 lg:row-span-2 lg:col-span-1 divide-y divide-black-100 md:col-span-2 border-b-2 border-black-100"
                >
                  {isLarge || isSmall ? (
                    <VerticalCard
                      article_img_url={article.article_img_url}
                      author={article.author}
                      comment_count={article.comment_count}
                      created_at={article.created_at}
                      title={article.title}
                      topic={article.topic}
                      article_id={article.article_id}
                      votes={article.votes}
                      position={i}
                    />
                  ) : (
                    <HorizontalCard
                      article_img_url={article.article_img_url}
                      author={article.author}
                      comment_count={article.comment_count}
                      created_at={article.created_at}
                      title={article.title}
                      topic={article.topic}
                      article_id={article.article_id}
                      votes={article.votes}
                      position={i}
                    />
                  )}
                </div>
              ))}
              {secondArray.map((article, i) => (
                <div
                  key={article.article_id}
                  className="col-span-2 divide-y divide-black-100 border-b-2 border-black-100"
                >
                  <HorizontalCard
                    article_img_url={article.article_img_url}
                    author={article.author}
                    comment_count={article.comment_count}
                    created_at={article.created_at}
                    title={article.title}
                    topic={article.topic}
                    article_id={article.article_id}
                    votes={article.votes}
                    position={i}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </>
    );
  }
};

export default Display;
