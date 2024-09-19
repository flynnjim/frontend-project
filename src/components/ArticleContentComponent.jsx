import { ArticleCardContent } from "../styles/ArticleCardStyles";
import { ArticleHeader } from "../styles/ArticleCardStyles";
import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import { ArticleCardTypography } from "../styles/ArticleCardStyles";
import FormHelperText from "@mui/material/FormHelperText";

const ArticleContentComponent = ({
  topic,
  title,
  article_img_url,
  author,
  comment_count,
  created_at,
  currentVotes,
  voteFailed,
  voteFailedMessage
}) => {
  const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(0, 5)
    .join(" ");


  return (
    <>
      <ArticleCardContent>
        <ArticleHeader gutterBottom variant="body2" component="div">
          Topic: {topic}
        </ArticleHeader>
        <ArticleHeader gutterBottom variant="h5" component="div">
          {title}
        </ArticleHeader>
      </ArticleCardContent>

      <CardMedia sx={{ aspectRatio: 1 / 1 }} image={article_img_url} />

      <ArticleCardContent>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <ArticleCardTypography gutterBottom variant="body2" component="div">
            written by {author}
          </ArticleCardTypography>
          <ArticleCardTypography gutterBottom variant="body2" component="div">
            Comments: {comment_count}
          </ArticleCardTypography>
          <ArticleCardTypography gutterBottom variant="body2" component="div">
            Time created: {formatDate}
          </ArticleCardTypography>
          <ArticleCardTypography gutterBottom variant="body2" component="div">
            Votes: {currentVotes}
          </ArticleCardTypography>
          {voteFailed ? (
            <FormHelperText sx={{ color: "red" }}>
              {voteFailedMessage}
            </FormHelperText>
          ) : null}
        </Box>
      </ArticleCardContent>
    </>
  );
};

export default ArticleContentComponent;
