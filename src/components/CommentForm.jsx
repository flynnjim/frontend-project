import { useState } from "react";
import NavButton from "../styles/NavButton";
import { ArticleCardTypography } from "../styles/ArticleCardStyles";
import HeaderBox from "../styles/headerStyles";
import TextField from "@mui/material/TextField";
import { FormHelperText } from "@mui/material";
import { addComment } from "../../api";

const CommentForm = ({ commentFormOpen, article_id, handleNewComment }) => {
  const [usernameForm, setUsernameForm] = useState("");
  const [commentBodyForm, setCommentBodyForm] = useState("");
  const [errorSubmitting, setErrorSubmitting] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [usernameLabel, setUsernameLabel] = useState("");
  const [commentBodyLabel, setCommentBodyLabel] = useState("");
  const [successfulCommentPost, setSuccessfulCommentPost] = useState(false);

  const handleCommentBodyChange = (event) => {
    setCommentBodyLabel("");
    setSuccessfulCommentPost(false);
    setCommentBodyForm(event.target.value);
  };

  const handleUserNamechange = (event) => {
    setUsernameLabel("");
    setSuccessfulCommentPost(false);
    setUsernameForm(event.target.value);
  };

  const submitComment = () => {
    setSuccessfulCommentPost(false);
    setErrorSubmitting(false);

    if (!usernameForm && !commentBodyForm) {
      setUsernameLabel("fill in username");
      setCommentBodyLabel("fill in comment text");
    } else if (!usernameForm) {
      setUsernameLabel("fill in username");
    } else if (!commentBodyForm) {
      setCommentBodyLabel("fill in comment text");
    } else {
      setSubmitButtonDisabled(true);

      addComment(article_id, usernameForm, commentBodyForm)
        .then((response) => {
          setErrorSubmitting(false);
          setSuccessfulCommentPost(true);
          setCommentBodyForm("");
          setUsernameForm("");

          const newComment = response.data[0];
          handleNewComment(newComment)
        })
        .catch((err) => {
          setErrorSubmitting(true);
        })
        .finally(() => {
          setSubmitButtonDisabled(false);
          setTimeout(() => {
            setSuccessfulCommentPost(false);
          }, 5000);
        });
    }
  };

  if (!commentFormOpen) {
    return null;
  }
  return (
    <>
      <HeaderBox
        sx={{ display: "flex", flexDirection: "column" }}
        component="form"
        noValidate
        autoComplete="off"
      >
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
        <FormHelperText sx={{ color: "red" }}>
          {commentBodyLabel}
        </FormHelperText>

        {errorSubmitting ? (
          <ArticleCardTypography gutterBottom variant="body2" component="div">
            Error submitting form, check username is correct and try again
          </ArticleCardTypography>
        ) : null}

        {successfulCommentPost ? (
          <ArticleCardTypography gutterBottom variant="body2" component="div">
            Your comment was successfully posted
          </ArticleCardTypography>
        ) : null}
      </HeaderBox>

      <HeaderBox>
        <NavButton onClick={submitComment} disabled={submitButtonDisabled}>
          Submit comment
        </NavButton>
      </HeaderBox>
    </>
  );
};

export default CommentForm;
