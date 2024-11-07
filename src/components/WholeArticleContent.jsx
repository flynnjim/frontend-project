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
    .join(" ")
    .slice(0, -3)
    + " GMT";

  return (
    <>
      <section>
        <header className="h-[60px] bg-bgcolor text-center text-4xl sm:text-2xl md:text-3xl lg:text-4xl overflow-hidden text-ellipsis pb-10 underline text-gray-600">
          {title}
        </header>
      </section>
      <div className="flex flex-col custom:flex-row items-start gap-4">
        <section className="relative custom:w-2/5">
          <img
            src={article_img_url}
            alt="Article"
            className="w-full h-full object-cover"
          />
        </section>
        <section className="flex-1 flex flex-col items-center justify-center">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            {body}
          </p>
          <p className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pt-6 text-red-500 font-bold italic">{author}</p>
        </section>
      </div>
      <section className="flex flex-col text-left pt-5">
        <p>
            {formatDate}
        </p>
        
      </section>
      <ArticleCardContent>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <ArticleCardTypography gutterBottom variant="body2" component="div">
            Comments: {comment_count}
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
