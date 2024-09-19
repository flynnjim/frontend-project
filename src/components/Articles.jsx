import { Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { getAllArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import HeaderBox from "../styles/headerStyles";
import { useParams } from "react-router-dom";


const Articles = () => {
    const [articlesData, setArticlesData] = useState([{
        article_img_url: 'https://res.cloudinary.com/cloudinary-marketing/images/w_1540,h_1083/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA',
        author: '',
        comment_count: 0,
        created_at:'',
        title: '',
        topic:'',
        article_id: '',
        votes: 0
          }])

        const [isPageLoading, setIsPageLoading] = useState(true)

        const {category} = useParams()
        console.log(category);
        
        

    useEffect(() => {
        setIsPageLoading(true)
        getAllArticles(category)
        .then((articles) => {
            setArticlesData(articles)
        })
        .finally(() => {
            setIsPageLoading(false)
        })
    }, [])
    if (isPageLoading) {
        return (<h1>Page is loading....</h1>)
    }
     else {

     
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
                    article_id={article.article_id}
                    votes={article.votes}
                    />
                </li>
            )
        })}
    </ul>
    </>

    </>
    )
}}

export default Articles;