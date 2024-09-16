import { Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getAllArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import HeaderBox from "../styles/headerStyles";


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
    <HeaderBox>
        <Typography variant="h2">Articles</Typography>
    </HeaderBox>
    
    
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