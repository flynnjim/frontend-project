import { ArticleCardContent } from "../styles/ArticleCardStyles";
import Box from "@mui/material/Box";
import { ArticleCardTypography } from "../styles/ArticleCardStyles";
import FormHelperText from "@mui/material/FormHelperText";

const WholeArticleContent = ({
  topic,
  title,
  article_img_url,
  author,
  comment_count,
  created_at,
  currentVotes,
  voteFailed,
  voteFailedMessage,
  body,
}) => {
  const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(0, 5)
    .join(" ");

  return (
    <>
      <section>
        <header className="h-[60px] bg-bgcolor text-center text-4xl sm:text-2xl md:text-3xl lg:text-4xl overflow-hidden text-ellipsis">
          {title}
        </header>
      </section>
      <div className="flex flex-col lg:flex-row items-start gap-4 border-2 border-green-500" >
        <section className="relative lg:w-2/5">
          <img
            src={article_img_url}
            alt="Article"
            className="w-full h-full object-cover"
          />
        </section>
        <section>
          <p className="flex-1 border-2 border-green-500">{body}</p>
        </section>
      </div>
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

export default WholeArticleContent;
