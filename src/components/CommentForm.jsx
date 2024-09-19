
import NavButton from "../styles/NavButton";
import {ArticleCardTypography} from "../styles/ArticleCardStyles";
import HeaderBox from "../styles/headerStyles";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";

const CommentForm = ({
    commentFormOpen,
    usernameForm,
    commentBodyForm,
    handleUserNamechange,
    handleCommentBodyChange,
    submitComment,
    submitButtonDisabled,
    errorSubmitting,
    successfulCommentPost,
    usernameLabel,
    commentBodyLabel
  }) => {

        if (!commentFormOpen) {
            return null
        }
        return (
            <>
                <HeaderBox sx={{display: 'flex', flexDirection: 'column'}} component="form" noValidate autoComplete="off">

                  <h1>comment form</h1>
                  <TextField
                    required
                    id="user-name-input"
                    label="user name"
                    value={usernameForm}
                    onChange={handleUserNamechange}
                  />
                  <FormHelperText sx={{ color: "red" }}>{usernameLabel}</FormHelperText>
                  <TextField
                    required
                    id="body-input"
                    label="comment text"
                    value={commentBodyForm}
                    onChange={handleCommentBodyChange}
                    multiline
                    maxRows={5}
                  />
                  <FormHelperText sx={{ color: "red" }}>{commentBodyLabel}</FormHelperText>

                  {errorSubmitting? (
                    <ArticleCardTypography gutterBottom variant="body2" component="div" >
                    Error submitting form, check username is correct and try again
                  </ArticleCardTypography>
                  ): null}

                  {successfulCommentPost? (
                    <ArticleCardTypography gutterBottom variant="body2" component="div" >
                    Your comment was successfully posted
                  </ArticleCardTypography>
                  ): null}
                </HeaderBox>

                <HeaderBox>
                  <NavButton onClick={submitComment} disabled={submitButtonDisabled}>
                 Submit comment
                </NavButton>
                </HeaderBox>
                </>

        )
      
}

export default CommentForm