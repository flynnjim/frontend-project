import { ArticleCardContent } from "../styles/ArticleCardStyles";
import { ArticleCardAction } from "../styles/ArticleCardStyles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  voteFailedMessage,
  article_id
}) => {
  const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(0, 5)
    .join(" ");

  return (
    <>
      <div className="relative w-full aspect-square">
        <img
          src={article_img_url}
          alt="Article"
          className="w-full h-full object-cover"
        />
      </div>
      <section>
        <header className="h-[30px] bg-bgcolor font-bold 3text-2xl text-left">
          {topic}
        </header>
        <header className="h-[50px] bg-bgcolor text-left">{title}</header>
      </section>

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
      <ArticleCardAction>
          <Button sx={{ backgroundColor: "#F5EEE6" }}>
            <a href={`/articles/${article_id}`}>See more details</a>
          </Button>
        </ArticleCardAction>
    </>
  );
};

export default ArticleContentComponent;
