import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import DropDown from "./DropDown";

import NotFoundPage from "./NotFoundPage";


const Articles = () => {
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
              <Typography variant="h6">
                Loading articles, please wait...
              </Typography>
            </Box>
          );
    } else {
      return (
        <>
          {noCategoryFound ? (
            <NotFoundPage />
          ) : (
            <>
              <DropDown setArticlesData={setArticlesData} setOrder={setOrder} setCommentCountSelected={setCommentCountSelected} commentCountSelected={commentCountSelected} articlesData={articlesData} setSortByChosen={setSortByChosen}/>
  
              <ul id="item-list">
                {articlesData.map((article) => (
                  <li key={article.article_id}>
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
            </>
          )}
        </>
      );
    }
  };
  
  export default Articles;
  