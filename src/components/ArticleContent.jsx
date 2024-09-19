import { ArticleCardContent } from "../styles/ArticleCardStyles"
import { Box } from "@mui/material"
import { ArticleCardTypography } from "../styles/ArticleCardStyles"
import { FormHelperText } from "@mui/material";

const ArticleContent = ({
    author,
    comment_count,
    created_at,
    currentVotes,
    voteFailed,
    voteFailMessage

}) => {
    const formatDate = new Date(created_at)
    .toString()
    .split(" ")
    .slice(0, 5)
    .join(" ");
    return (

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
              {voteFailMessage}
            </FormHelperText>
          ) : null}
        </Box>
      </ArticleCardContent>

    )
}

export default ArticleContent