import { ArticleCardContent } from "../styles/ArticleCardStyles"
import { ArticleHeader } from "../styles/ArticleCardStyles"
import Button from "@mui/material/Button"
import { ArticleCardAction } from "../styles/ArticleCardStyles"
import NavButton from "../styles/NavButton"

const ArticleCardActionComponent = ({
    body,
    article_id,
    getArticleComments,
    isLoadingComments,
    buttonDisplay,
    addVote,
    buttonVoteDisabled,
    openCommentForm
  }) => {

return(

    <>
    {body === undefined ? (
        <ArticleCardAction>
          <Button sx={{ backgroundColor: "#F5EEE6" }}>
            <a href={`/articles/${article_id}`}>See more details</a>
          </Button>
        </ArticleCardAction>
      ) : (
        <>

          <ArticleCardAction>
            <NavButton
              onClick={getArticleComments}
              disabled={isLoadingComments}
              >
              {buttonDisplay}
            </NavButton>
            <NavButton onClick={addVote} disabled={buttonVoteDisabled}>
              Vote article
            </NavButton>
            <NavButton onClick={openCommentForm} disabled={false}>
              Write Comment
            </NavButton>
          </ArticleCardAction>
                </>
      )}
      </>
    )
}

export default ArticleCardActionComponent