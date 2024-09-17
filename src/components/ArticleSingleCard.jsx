import ArticleCard from "./ArticleCard"
import { useParams } from "react-router-dom"
import { useState, useEffect} from 'react'
import { getCurrentArticle } from "../../api"


const ArticleSingleCard = () => {
    const [currentArticle, setCurrentArticle] = useState({
    article_img_url: 'https://res.cloudinary.com/cloudinary-marketing/images/w_1540,h_1083/f_auto,q_auto/v1649725549/Web_Assets/blog/loading-645268_1280/loading-645268_1280-jpg?_i=AA',
    author: '',
    comment_count: 0,
    created_at:'',
    title: '',
    topic:'',
    article_id: ''
      });

    const {article_id} = useParams()
    
    useEffect(() => {
    getCurrentArticle(article_id)
        .then(({article}) => {
            setCurrentArticle(article)
        })
    }, [article_id])

    return (
        <ArticleCard
        article_img_url={currentArticle.article_img_url}
        author={currentArticle.author}
        comment_count={currentArticle.comment_count}
        created_at={currentArticle.created_at}
        title={currentArticle.created_at}
        topic={currentArticle.topic}
        article_id={currentArticle.article_id}
        body={currentArticle.body}
        />
    )
}

export default ArticleSingleCard