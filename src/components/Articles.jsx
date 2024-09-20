import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import HeaderBox from "../styles/headerStyles";
import { useParams } from "react-router-dom";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

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

  const { category } = useParams();

  const handleOrderChange = (event) => {
    const value = event.target.value;
    if (commentCountSelected) {
      if (value === "ASC") {
        const sortedArticles = [...articlesData].sort(
          (a, b) => b.comment_count - a.comment_count
        );
        setArticlesData(sortedArticles);
      } else {
        const sortedArticles = [...articlesData].sort(
          (a, b) => a.comment_count - b.comment_count
        );
        setArticlesData(sortedArticles);
      }
    } else {
      setOrder(value);
    }
  };

  const handleSortChange = (event) => {
    if (event.target.value == "comment_count") {
      setCommentCountSelected(true);
      const sortedArticles = [...articlesData].sort(
        (a, b) => b.comment_count - a.comment_count
      );
      setArticlesData(sortedArticles);
    } else {
      setCommentCountSelected(false);
      setSortByChosen(event.target.value);
    }
  };

  useEffect(() => {
    setIsPageLoading(true);
    getAllArticles(category, sortByChosen, order)
      .then((articles) => {
        setArticlesData(articles);
      })
      .finally(() => {
        setIsPageLoading(false);
      });
  }, [category, sortByChosen, order]);
  if (isPageLoading) {
    return <h1>Page is loading....</h1>;
  } else {
    return (
      <>
        <HeaderBox>
          <Typography variant="h2">Articles</Typography>
        </HeaderBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "green",
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormHelperText sx={{ color: "black", textAlign: "center" }}>
              Sort by
            </FormHelperText>
            <Select
              defaultValue=""
              label="Sort By"
              onChange={handleSortChange}
              sx={{
                width: "200px",
                marginLeft: "0",
              }}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"created_at"}>Date</MenuItem>
              <MenuItem value={"comment_count"}>Comments</MenuItem>
              <MenuItem value={"votes"}>Votes</MenuItem>
            </Select>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormHelperText sx={{ color: "black", textAlign: "center" }}>
              Order
            </FormHelperText>
            <Select
              defaultValue=""
              label="ascending or descending"
              onChange={handleOrderChange}
              sx={{
                width: "200px",
                marginLeft: "0",
              }}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={"ASC"}>Ascending</MenuItem>
              <MenuItem value={"DESC"}>Descending</MenuItem>
            </Select>
          </Box>
        </Box>

        <>
          <ul id="item-list">
            {articlesData.map((article) => {
              return (
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
              );
            })}
          </ul>
        </>
      </>
    );
  }
};

export default Articles;
