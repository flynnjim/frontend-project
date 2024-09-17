import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {ArticleCardTypography, ArticleCardContent, ArticleCardAction, ArticleCardContainer, ArticleHeader} from "../styles/ArticleCardStyles";

function ArticleCard({
    article_img_url,
    author,
    comment_count,
    created_at,
    title,
    topic,
    article_id,
    body
}) {
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
            <ArticleCardContent>
          <ArticleHeader gutterBottom variant="body2" component="div">
            {body}
          </ArticleHeader>
            </ArticleCardContent>
          )
      }
    </ArticleCardContainer>
  );
}

export default ArticleCard;