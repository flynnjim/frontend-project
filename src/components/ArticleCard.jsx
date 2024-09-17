import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NavButton from "../styles/NavButton";
import {ArticleCardTypography, ArticleCardContent, ArticleCardAction, ArticleCardContainer, ArticleHeader} from "../styles/ArticleCardStyles";
import { getComments } from "../../api";
import { useState } from "react";

const ArticleCard = ({
    article_img_url,
    author,
    comment_count,
    created_at,
    title,
    topic,
    article_id,
    body
}) => {

    const [articleComments, setArticleComments] = useState([])
    const [displayComments, setDisplayComments] = useState(false)
    const [buttonDisplay, setButtonDisplay] = useState('Display Comments')

    const getArticleComments = () => {

      getComments(article_id)
        .then((response) => {
          setArticleComments(response)
          setDisplayComments(!displayComments)
          setButtonDisplay(buttonDisplay === "Hide comments"? 'Display Comments': "Hide comments" )
        })
      
    }

      return (

    <ArticleCardContainer body={body}>
        <ArticleCardContent>
        <ArticleHeader gutterBottom variant="body2" component="div">
         Topic: {topic}
        </ArticleHeader>
        <ArticleHeader gutterBottom variant="h5" component="div">
          {title}
        </ArticleHeader>
        </ArticleCardContent>
        
      <CardMedia sx={{ aspectRatio: 1 / 1, }} image={article_img_url} />

      <ArticleCardContent >
        <Box sx={{ display: 'flex', flexWrap: 'wrap'}}>

        <ArticleCardTypography gutterBottom variant="body2" component="div" >
          written by {author}
        </ArticleCardTypography>
        <ArticleCardTypography gutterBottom variant="body2" component="div">
         Comments: {comment_count}
        </ArticleCardTypography>
        <ArticleCardTypography gutterBottom variant="body2" component="div" >
          Time created: {created_at}
        </ArticleCardTypography>
        </Box>
      </ArticleCardContent>

      {body === undefined ? (
          <ArticleCardAction>
          <Button sx={{backgroundColor: '#F5EEE6'}}>
            <a href={`/articles/${article_id}`}>See more details
            </a>
          </Button>
        </ArticleCardAction>
          )
          :
          (
            <>
              <ArticleCardContent>
                <ArticleHeader gutterBottom variant="body2" component="div">
                  {body}
                </ArticleHeader>
              </ArticleCardContent>

              <ArticleCardAction>
                <NavButton onClick={getArticleComments}>
                {buttonDisplay}
                </NavButton>
              </ArticleCardAction>

              {displayComments ? (
                <ArticleCardContent>

                <h1>ON</h1>
                </ArticleCardContent>
              ): (
                <></>
              )}
            </>
          )
      }
    </ArticleCardContainer>
    
  );
}

export default ArticleCard;