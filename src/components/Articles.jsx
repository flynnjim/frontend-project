import { Typography } from "@mui/material"
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../api";
import ArticleCard from "./ArticleCard";

const boxStyle = { 
    flexGrow: 1,
    width: '100%',
    padding: 1,
    backgroundColor: "#9CA986",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: {xs: 'auto', sm: 20, md: 40},
    minWidth: {xs: 'auto', sm: 500, md: 1000},
    padding: {xs: 1, sm: 2, md:3},
}

const Articles = () => {
    const [articlesData, setArticlesData] = useState([])

    useEffect(() => {
        getAllArticles()
        .then((articles) => {
            setArticlesData(articles)
        })
    }, [])

    return (
    <>
    <Box sx={boxStyle}>
        <Typography variant="h2">Articles</Typography>
    </Box>
    
    <>
    <ul id="item-list" >
        {articlesData.map((article) => {
            return (
                <li  key={article.article_id}>
                    <ArticleCard
                    article_img_url={article.article_img_url}
                    author={article.author}
                    comment_count={article.comment_count}
                    created_at={article.created_at}
                    title={article.title}
                    topic={article.topic}
                    />
                </li>
            )
        })}
    </ul>
    </>

    </>
    )
}

export default Articles;