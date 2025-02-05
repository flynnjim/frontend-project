import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../api";
import ArticleCard from "./ArticleCard";
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
            <div className="">
              <div className="grid grid-cols-2 gap-2 bg-bgcolor">
                <ul className="flex flex-col col-span-2">
                  <div className="flex flex-col col-span-2">
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
                <ul className="flex flex-col">
                  <div>
                    <li key={articlesData[1].article_id}>
                      <VerticalCard
                        article_img_url={articlesData[1].article_img_url}
                        author={articlesData[1].author}
                        comment_count={articlesData[1].comment_count}
                        created_at={articlesData[1].created_at}
                        title={articlesData[1].title}
                        topic={articlesData[1].topic}
                        article_id={articlesData[1].article_id}
                        votes={articlesData[1].votes}
                      />
                    </li>
                  </div>
                </ul>
                <ul className="flex flex-col">
                  <div>
                    <li key={articlesData[2].article_id}>
                      <VerticalCard
                        article_img_url={articlesData[2].article_img_url}
                        author={articlesData[2].author}
                        comment_count={articlesData[2].comment_count}
                        created_at={articlesData[2].created_at}
                        title={articlesData[2].title}
                        topic={articlesData[2].topic}
                        article_id={articlesData[2].article_id}
                        votes={articlesData[2].votes}
                      />
                    </li>
                  </div>
                </ul>
                {/* <ul className="flex flex-col">
                  <div>
                    <li key={articlesData[2].article_id}>
                      <
                        article_img_url={articlesData[2].article_img_url}
                        author={articlesData[2].author}
                        comment_count={articlesData[2].comment_count}
                        created_at={articlesData[2].created_at}
                        title={articlesData[2].title}
                        topic={articlesData[2].topic}
                        article_id={articlesData[2].article_id}
                        votes={articlesData[2].votes}
                      />
                    </li>
                  </div>
                </ul> */}
                <ul className="flex flex-col col-span-2">
                  {articlesData.map((article) => (
                    <li key={article.article_id}>
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
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
};

export default Display;
